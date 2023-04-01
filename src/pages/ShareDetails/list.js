import React, { Component, Fragment } from "react"
import {
  Container,
  Row,
  Col,
  FormGroup,
  Button,
  Label,
  CardBody,
  Card,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap"
import DropDown from "../../common/DropDown"
import CustomSelectInput from "../../common/CustomSelectInput"
import { withTranslation } from "react-i18next"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import Tooltip from "@material-ui/core/Tooltip"
import { withStyles } from "@material-ui/core/styles"
import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { ShareDetailsvalidationSchema } from "../../helpers/validations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form, Field } from "formik"

class ShareDetails extends Component {
  state = {
    startDate: new Date(),
    buttonAction: false,
    capitalGL: [{ label: "1", value: "1" }],
  }
  componentDidMount() {}

  handleSubmit = values => {
    console.log(values)
    this.setState({
      buttonAction: true,
    })
    this.manageShareDetails(values)
  }
  manageShareDetails = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageShareDetailsResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      // .Create,
      MethodType.PUT,
      false,
      values,
      "",
      this.manageShareDetailsResponse
    )
  }
  manageShareDetailsResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(this.props.t("Share Details Added Successfully"))
    }
  }
  handleCancel = () => {
    toastr.success("", "cancel")
  }
  render() {
    return (
      <Fragment>
        <Formik
          initialValues={{}}
          onSubmit={this.handleSubmit}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={ShareDetailsvalidationSchema}
        >
          {({ values, setFieldValue, errors }) => (
            <Form className="av-tooltip tooltip-label-bottom">
              <Card>
                <CardBody className="mb-0 pb-0">
                  <Row className="px-3">
                    <Col xs="7" sm="7" md="7" lg={7} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Entrance Fees")}
                        </Label>
                        <Field
                          name="EntranceFees"
                          id="EntranceFees"
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.EntranceFees && (
                          <div className="invalid-feedback d-block">
                            {errors.EntranceFees}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="7" sm="7" md="7" lg={7} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Number of Shares")}
                        </Label>
                        <Field
                          name="NumberofShares"
                          id="NumberofShares"
                          type="number"
                          className="form-control box-border"
                        />

                        {errors.NumberofShares && (
                          <div className="invalid-feedback d-block">
                            {errors.NumberofShares}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col>
                      <Row className="mt-2">
                        <Col xs="1" sm="1" md="1" lg={1}>
                          <Button
                            className="rounded-circle mt-2"
                            outline
                            size="sm"
                            color="primary"
                          >
                            <b>i</b>
                          </Button>
                        </Col>
                        <Col>
                          <p className="pl-3 pt-1 mt-2">
                            {this.props.t("Break ups")}
                          </p>
                        </Col>
                      </Row>
                    </Col>

                    <Col xs="7" sm="7" md="7" lg={7} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Resolution Number")}
                        </Label>

                        <Field
                          name="ResolutionNumber"
                          id="ResolutionNumber"
                          className="form-control box-border"
                        />
                        {errors.ResolutionNumber && (
                          <div className="invalid-feedback d-block">
                            {errors.ResolutionNumber}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="7" sm="7" md="7" lg={7} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Resolution Date")}
                        </Label>
                        <DatePicker
                          selectsStart
                          components={{ Input: CustomSelectInput }}
                          className="form-control"
                          selected={
                            values.ResolutionDate
                              ? new Date(values.ResolutionDate)
                              : ""
                          }
                          isClearable={true}
                          onChange={date => {
                            setFieldValue("ResolutionDate", date)
                          }}
                          placeholderText={this.props.t("Select Date")}
                          dateFormat="dd/MM/yyyy"
                        />
                        {errors.ResolutionDate && (
                          <div className="invalid-feedback d-block">
                            {errors.ResolutionDate}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="px-3 mt-1">
                    <Col>
                      <FormGroup className="float-right ">
                        <Button
                          className={this.state.buttonAction ? "disabled" : ""}
                          color="primary"
                          type="submit"
                        >
                          {this.props.t("Save")}
                        </Button>
                        <Button
                          className="ml-4"
                          color="danger"
                          onClick={() => this.handleCancel()}
                        >
                          {this.props.t("Cancel")}
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Form>
          )}
        </Formik>
      </Fragment>
    )
  }
}

export default withTranslation()(ShareDetails)
