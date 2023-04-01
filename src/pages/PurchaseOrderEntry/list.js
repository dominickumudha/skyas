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
import { PurchaseOrderEntryValidation } from "../../helpers/validations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form, Field } from "formik"
import ListPageHeader from "components/custom/ListPageHeader"

class PurchaseOrderEntry extends Component {
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
                "Purchase Order Entry"
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
                validationSchema={PurchaseOrderEntryValidation}
              >
                {({ setFieldValue, errors }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <Card>
                      <CardBody className="mb-0 pb-0">
                        <Row className="px-3">
                          <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                            <FormGroup className="position-relative mt-1">
                              <DropDown
                                classNamePrefix="react-select"
                                className="react-select"
                                label={this.props.t("Vendor")}
                                name="Vendor"
                                isSearchable
                                // options={this.state.district}
                                placeholderText={""}
                                Checkbox={false}
                                Action={e => {
                                  if (e) setFieldValue("Vendor", e.value)
                                }}
                                errors={errors.Vendor}
                              />
                            </FormGroup>
                          </Col>

                          <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                            <FormGroup className="position-relative mt-1">
                              <DropDown
                                classNamePrefix="react-select"
                                className="react-select"
                                label={this.props.t("PO No")}
                                name="PoNumber"
                                isSearchable
                                // options={this.state.district}
                                placeholderText={""}
                                Checkbox={false}
                                Action={e => {
                                  if (e) setFieldValue("PoNumber", e.value)
                                }}
                                errors={errors.PoNumber}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
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

                          <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
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
                          <Col xs="11" sm="11" md="11" lg={11} className="pl-4">
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
                          <Col xs="12" sm="12" md="12" lg={12} className="pl-4">
                            <div className="table-responsive">
                              <Table
                                bordered
                                className="table table-centered table-nowrap mb-0"
                              >
                                <thead className="thead-light">
                                  <tr>
                                    <th>{this.props.t("Name")}</th>
                                    <th>{this.props.t("Qty")}</th>
                                    <th>{this.props.t("Price")}</th>
                                    <th>{this.props.t("Amount")} </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td></td>
                                    <td></td>
                                    <td>{this.props.t("Sub Total")}</td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td></td>
                                    <td></td>
                                    <td>
                                      <Row>
                                        <Label className="requiredField mt-1">
                                          {this.props.t("SGST")}
                                        </Label>
                                        <Col
                                          xs="6"
                                          sm="6"
                                          md="6"
                                          lg={3}
                                          className="pl-4"
                                        >
                                          <FormGroup className="position-relative mt-1">
                                            <Field
                                              name="SGST"
                                              id="SGST"
                                              type="text"
                                              className="form-control box-border"
                                            />
                                            {errors.SGST && (
                                              <div className="invalid-feedback d-block">
                                                {errors.SGST}
                                              </div>
                                            )}
                                          </FormGroup>
                                        </Col>
                                        <h4 className="ml-2 mt-2">%</h4>
                                      </Row>
                                      <Row>
                                        <Label className="requiredField mt-1">
                                          {this.props.t("CSGST")}
                                        </Label>
                                        <Col
                                          xs="6"
                                          sm="6"
                                          md="6"
                                          lg={3}
                                          className="pl-4"
                                        >
                                          <FormGroup className="position-relative mt-1">
                                            <Field
                                              name="CSGST"
                                              id="CSGST"
                                              type="text"
                                              className="form-control box-border"
                                            />
                                            {errors.CSGST && (
                                              <div className="invalid-feedback d-block">
                                                {errors.CSGST}
                                              </div>
                                            )}
                                          </FormGroup>
                                        </Col>
                                        <h4 className="ml-2 mt-2">%</h4>
                                      </Row>
                                    </td>
                                    <td></td>
                                  </tr>
                                </tbody>
                              </Table>
                            </div>
                          </Col>

                          <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                            <FormGroup className="position-relative mt-1">
                              <Label className="requiredField mt-1">
                                {this.props.t("PO Copy")}
                              </Label>
                              <CustomInput
                                type="file"
                                name={"PoCopy"}
                                className="form-control"
                                onChange={event => {
                                  var value = event.target.files[0]
                                  if (value) {
                                    if (!(value.size / 1024 <= 500)) {
                                      toastr.warning("", "File too large")
                                      value = ""
                                    } else if (
                                      ![
                                        "doc",
                                        "docx",
                                        "pdf",
                                        "png",
                                        "jpg",
                                        "jpeg",
                                      ].includes(
                                        value.name.toLowerCase().split(".")[
                                          value.name.toLowerCase().split(".")
                                            .length - 1
                                        ]
                                      )
                                    ) {
                                      toastr.warning(
                                        "",
                                        "File format not allowed"
                                      )
                                      value = ""
                                    }
                                  }
                                  setFieldValue("PoCopy", value)
                                }}
                              />
                              {errors.PoCopy && (
                                <div className="invalid-feedback d-block">
                                  {errors.PoCopy}
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

export default withTranslation()(PurchaseOrderEntry)
