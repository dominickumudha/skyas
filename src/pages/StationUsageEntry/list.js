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
  CardTitle,
  CustomInput,
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
import { StationaryUsageEntryValidation } from "../../helpers/validations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form, Field } from "formik"
import ListPageHeader from "components/custom/ListPageHeader"

class StationUsageEntry extends Component {
  state = {
    buttonAction: false,
  }
  componentDidMount() {}

  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageRecoverySettings(values)
  }
  manageRecoverySettings = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageRecoverySettingsResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      // .Create,
      MethodType.PUT,
      false,
      values,
      "",
      this.manageRecoverySettingsResponse
    )
  }
  manageRecoverySettingsResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success("", this.props.t("Recovery Settings Added Successfully"))
    }
  }
  handleCancel = () => {
    toastr.success("", "cancel")
  }
  render() {
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops pb-5">
          <Card className=" p-4 page-content mb-5">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t(
                "Stationery Usage Entry"
              )}`}
              showSearch={false}
              showButton={false}
            />

            <CardBody className="mb-0 pb-0">
              <Formik
                initialValues={{}}
                onSubmit={this.handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
                validationSchema={StationaryUsageEntryValidation}
              >
                {({ setFieldValue, errors }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <Card>
                      <CardBody className="mb-0 pb-0">
                        <Row className="px-3">
                          <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                            <FormGroup className="position-relative mt-1">
                              <Label className="requiredField mt-1">
                                {this.props.t("Date")}
                              </Label>
                              <Field
                                name="Date"
                                id="Date"
                                type="text"
                                className="form-control box-border"
                              />
                              {errors.Date && (
                                <div className="invalid-feedback d-block">
                                  {errors.Date}
                                </div>
                              )}
                            </FormGroup>
                          </Col>

                          <Col xs="6" sm="6" md="6" lg={6} className="pl-4" />

                          <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                            <FormGroup className="position-relative mt-1">
                              <Label className=" mt-1">
                                {this.props.t("Item Details")}
                              </Label>
                            </FormGroup>
                          </Col>
                          <Col xs="5" sm="5" md="5" lg={5} className="pl-4">
                            <FormGroup className="float-right ">
                              <Button
                                className={
                                  this.state.buttonAction ? "disabled" : ""
                                }
                                color="primary"
                                type="submit"
                              >
                                {this.props.t("Add Item")}
                              </Button>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="px-3">
                          <Col xs="12" sm="12" md="12" lg={12} className="pl-4">
                            <div className="table-responsive">
                              <Table
                                bordered
                                className="table table-centered table-nowrap mb-0"
                              >
                                <thead className="thead-light">
                                  <tr>
                                    <th>{this.props.t("Available")}</th>
                                    <th>
                                      {this.props.t("Quantity to be added")}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td></td>
                                    <td></td>
                                  </tr>
                                </tbody>
                              </Table>
                            </div>
                          </Col>
                        </Row>
                        <Row className="px-3">
                          <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                            <FormGroup className="position-relative mt-1">
                              <Label className=" mt-1">
                                {this.props.t("Reason")}
                              </Label>
                              <Field
                                name="Reason"
                                id="Reason"
                                component="textarea"
                                className="form-control"
                              />
                              {errors.Reason && (
                                <div className="invalid-feedback d-block">
                                  {errors.Reason}
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
            </CardBody>
          </Card>
        </Container>
      </Fragment>
    )
  }
}

export default withTranslation()(StationUsageEntry)
