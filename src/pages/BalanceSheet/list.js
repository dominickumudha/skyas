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
import { RecoverySettingsvalidationSchema } from "../../helpers/validations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form, Field } from "formik"
import ListPageHeader from "components/custom/ListPageHeader"

class BalanceSheet extends Component {
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
                "Balance Sheet"
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
                validationSchema={RecoverySettingsvalidationSchema}
              >
                {({ setFieldValue, errors }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <Card>
                      <CardBody className="mb-0 pb-0">
                        <Row className="px-3">
                          <Col
                            xs="2"
                            sm="2"
                            md="2"
                            lg={2}
                            className="pl-4 mt-1"
                          >
                            <Label className="requiredField mt-1">
                              {this.props.t("Start Date")}
                            </Label>
                          </Col>

                          <Col xs="3" sm="3" md="3" lg={3} className="pl-4">
                            <FormGroup className="position-relative mt-1">
                              <DatePicker
                                startDate={this.state.startDateTime}
                                selectsStart
                                endDate={this.state.endDateTime}
                                components={{ Input: CustomSelectInput }}
                                className="form-control"
                                selected={this.state.startDateTime}
                                isClearable={true}
                                onChange={date => {
                                  setFieldValue("EffectiveFrom", date)
                                  if (date)
                                    this.setState(
                                      {
                                        startDateTime: date,
                                      },
                                      () => {
                                        // this.GetAllLeave();
                                      }
                                    )
                                  else
                                    this.setState(
                                      {
                                        startDateTime: "",
                                      },
                                      () => {
                                        // this.GetAllLeave();
                                      }
                                    )
                                }}
                                placeholderText={this.props.t("Select Date")}
                                dateFormat="dd/MM/yyyy"
                              />
                              {errors.PostalMiscellaneousCharge && (
                                <div className="invalid-feedback d-block">
                                  {errors.PostalMiscellaneousCharge}
                                </div>
                              )}
                            </FormGroup>
                          </Col>

                          <Col
                            xs="2"
                            sm="2"
                            md="2"
                            lg={2}
                            className="pl-4 mt-1"
                          >
                            <Label className="requiredField mt-1">
                              {this.props.t("End Date")}
                            </Label>
                          </Col>

                          <Col xs="3" sm="3" md="3" lg={3} className="pl-4">
                            <FormGroup className="position-relative mt-1">
                              <DatePicker
                                startDate={this.state.startDateTime}
                                selectsStart
                                endDate={this.state.endDateTime}
                                components={{ Input: CustomSelectInput }}
                                className="form-control"
                                selected={this.state.endDateTime}
                                isClearable={true}
                                onChange={date => {
                                  setFieldValue("EffectiveTo", date)
                                  if (date)
                                    this.setState(
                                      {
                                        endDateTime: date,
                                      },
                                      () => {
                                        // this.GetAllLeave();
                                      }
                                    )
                                  else
                                    this.setState(
                                      {
                                        endDateTime: "",
                                      },
                                      () => {
                                        // this.GetAllLeave();
                                      }
                                    )
                                }}
                                placeholderText={this.props.t("Select Date")}
                                dateFormat="dd/MM/yyyy"
                              />
                              {errors.PostalMiscellaneousCharge && (
                                <div className="invalid-feedback d-block">
                                  {errors.PostalMiscellaneousCharge}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <div className="table-responsive">
                          <Table
                            bordered
                            className="table table-centered table-nowrap mb-0"
                          >
                            <thead className="thead-light">
                              <tr>
                                <th>{this.props.t("Serial No")}</th>
                                <th>{this.props.t("Particulars")}</th>
                                <th>{this.props.t("Start Date Amount")}</th>
                                <th>{this.props.t("End Date Amount")} </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td></td>
                                <td>{this.props.t("Total")}</td>
                                <td></td>
                                <td></td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                        {/* <Row className="px-3 mt-1">
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
                        </Row> */}
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

export default withTranslation()(BalanceSheet)
