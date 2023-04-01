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
import { ApproveLeaveValidation } from "../../helpers/validations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form, Field } from "formik"
import ListPageHeader from "components/custom/ListPageHeader"

class LeaveApprove extends Component {
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
                "Approval for Leave"
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
                validationSchema={ApproveLeaveValidation}
              >
                {({ setFieldValue, errors }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <Card>
                      <CardBody className="mb-0 pb-0">
                        <Row className="px-3">
                          <Col xs="6" sm="6" md="6" lg={6}>
                            <FormGroup className="position-relative mt-1">
                              <Label className="requiredField mt-1">
                                {this.props.t("Employee ID")}
                              </Label>
                              <Field
                                name="EmployeeID"
                                id="EmployeeID"
                                type="text"
                                className="form-control box-border"
                              />
                              {errors.EmployeeID && (
                                <div className="invalid-feedback d-block">
                                  {errors.EmployeeID}
                                </div>
                              )}
                            </FormGroup>
                          </Col>

                          <Col xs="6" sm="6" md="6" lg={6} className="pl-4" />

                          <Col xs="6" sm="6" md="6" lg={6}>
                            <FormGroup className="position-relative mt-1">
                              <Label className="requiredField mt-1">
                                {this.props.t("Designation")}
                              </Label>

                              <Field
                                name="Designation"
                                id="Designation"
                                type="text"
                                className="form-control box-border"
                              />
                              {errors.Designation && (
                                <div className="invalid-feedback d-block">
                                  {errors.Designation}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                          <Col xs="6" sm="6" md="6" lg={6} className="pl-4 " />
                          <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                            {" "}
                            <Button
                              className={
                                this.state.buttonAction ? "disabled" : ""
                              }
                              color="primary"
                              type="submit"
                            >
                              {this.props.t("Check In")}
                            </Button>
                          </Col>
                        </Row>
                        <Row className="px-4 mt-2">
                          <div className="table-responsive">
                            <Table className="table table-centered table-nowrap mb-0">
                              <thead className="thead-light">
                                <tr>
                                  <th>{this.props.t("Serial No")}</th>
                                  <th>{this.props.t("Employee ID")}</th>
                                  <th>{this.props.t("Name")}</th>
                                  <th>{this.props.t("Designation")}</th>
                                  <th>{this.props.t("Start Date")}</th>
                                  <th>{this.props.t("End Date")}</th>
                                  <th>{this.props.t("Action")}</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>1</td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td>
                                    <FormGroup className="float-right ">
                                      <Button
                                        className={
                                          this.state.buttonAction
                                            ? "disabled"
                                            : ""
                                        }
                                        color="primary"
                                        type="submit"
                                      >
                                        <span className="avatar-title">
                                          <i
                                            className={
                                              "bx bx-check font-size-24"
                                            }
                                          />
                                        </span>
                                      </Button>
                                      <Button
                                        className="ml-4"
                                        color="danger"
                                        // onClick={() => this.handleCancel()}
                                      >
                                        <span className="">
                                          <i
                                            className={"bx bx-x font-size-24"}
                                          />
                                        </span>
                                      </Button>
                                    </FormGroup>
                                    {/* 
                                  <Button
                                    type="button"
                                    color="primary"
                                    size="sm"
                                    className="btn-rounded waves-effect waves-light"
                                    // onClick={this.togglemodal}
                                    onClick={this.toggleModal}
                                  >
                                    <span className="avatar-title">
                                      <i
                                        className={
                                          "bx bx-copy-alt font-size-24"
                                        }
                                      />
                                    </span>
                                  </Button> */}
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
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
                                {this.props.t("Approve")}
                              </Button>
                              <Button
                                className="ml-4"
                                color="danger"
                                onClick={() => this.handleCancel()}
                              >
                                {this.props.t("Close")}
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

export default withTranslation()(LeaveApprove)
