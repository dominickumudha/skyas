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
  CardTitle,
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
import { AssignValidationSchema } from "../../helpers/validations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form, Field } from "formik"
import ListPageHeader from "components/custom/ListPageHeader"

class Assign extends Component {
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
    this.manageAssign(values)
  }
  manageAssign = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageAssignResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      // .Create,
      MethodType.PUT,
      false,
      values,
      "",
      this.manageAssignResponse
    )
  }
  manageAssignResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(this.props.t("Book Assigned Successfully"))
    }
  }
  handleCancel = () => {
    toastr.success("", "cancel")
  }
  render() {
    return (
      <Fragment>
        <Container fluid className="page-content">
          <Row className="mb-4">
            <Col xxs="12">
              <Card>
                <CardBody className="mb-0 pb-0">
                  <ListPageHeader
                    heading={`${this.props.t("Home")}.${this.props.t(
                      "Assign"
                    )}`}
                    showSearch={false}
                    showButton={false}
                  />
                  <Formik
                    initialValues={{}}
                    onSubmit={this.handleSubmit}
                    validateOnBlur={false}
                    validateOnChange={false}
                    validationSchema={AssignValidationSchema}
                  >
                    {({ values, setFieldValue, errors }) => (
                      <Form className="av-tooltip tooltip-label-bottom">
                        <Row className="px-3">
                          <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                            <FormGroup className="position-relative mt-1">
                              <Label className="requiredField mt-1">
                                {this.props.t("Issued Date")}
                              </Label>
                              <DatePicker
                                selectsStart
                                components={{ Input: CustomSelectInput }}
                                className="form-control"
                                selected={
                                  values.IssuedDate
                                    ? new Date(values.IssuedDate)
                                    : ""
                                }
                                isClearable={true}
                                onChange={date => {
                                  setFieldValue("IssuedDate", date)
                                }}
                                placeholderText={this.props.t("Select Date")}
                                dateFormat="dd/MM/yyyy"
                              />
                              {errors.IssuedDate && (
                                <div className="invalid-feedback d-block">
                                  {errors.IssuedDate}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                          <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                            <FormGroup className="position-relative mt-1">
                              <Label className="requiredField mt-1">
                                {this.props.t("Due Date")}
                              </Label>
                              <DatePicker
                                selectsStart
                                components={{ Input: CustomSelectInput }}
                                className="form-control"
                                selected={
                                  values.DueDate ? new Date(values.DueDate) : ""
                                }
                                isClearable={true}
                                onChange={date => {
                                  setFieldValue("DueDate", date)
                                }}
                                placeholderText={this.props.t("Select Date")}
                                dateFormat="dd/MM/yyyy"
                              />
                              {errors.DueDate && (
                                <div className="invalid-feedback d-block">
                                  {errors.DueDate}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                          <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                            <FormGroup className="position-relative mt-1">
                              <Label className="requiredField mt-1">
                                {this.props.t("Organization")}
                              </Label>

                              <Field
                                name="Organization"
                                className="form-control box-border"
                              />
                              {errors.Organization && (
                                <div className="invalid-feedback d-block">
                                  {errors.Organization}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="px-3">
                          {" "}
                          <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                            <FormGroup className="position-relative mt-1">
                              <Label className=" mt-1">
                                {this.props.t("Member ID")}
                              </Label>

                              <Field
                                name="MemberID"
                                id="MemberID"
                                className="form-control box-border"
                              />
                              {errors.MemberID && (
                                <div className="invalid-feedback d-block">
                                  {errors.MemberID}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="px-3">
                          <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                            <center>(or)</center>
                          </Col>
                        </Row>
                        <Row className="px-3">
                          <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                            <FormGroup className="position-relative mt-1">
                              <Label className=" mt-1">
                                {this.props.t("Member")}
                              </Label>

                              <Field
                                name="Member"
                                id="Member"
                                className="form-control box-border"
                              />
                              {errors.Member && (
                                <div className="invalid-feedback d-block">
                                  {errors.Member}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="px-3 mt-1">
                          <Col>
                            <FormGroup className="float-right ">
                              <Button
                                className={
                                  this.state.buttonAction ? "disabled" : ""
                                }
                                color="primary"
                                type="submit"
                              >
                                {this.props.t("Issue")}
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
                      </Form>
                    )}
                  </Formik>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    )
  }
}

export default withTranslation()(Assign)
