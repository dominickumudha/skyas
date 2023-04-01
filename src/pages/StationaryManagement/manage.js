/**START OF GENERATED CODE**/
import React, { Component, Fragment } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Button,
  Container,
  CustomInput,
} from "reactstrap"
import { StationaryManagementValidation } from "../../helpers/validations"
import { withTranslation } from "react-i18next"
// import { stationaryManagement, level, areatype } from "../../constants/config";
import CustomSelectInput from "../../common/CustomSelectInput"
import { CallService } from "../../helpers/servicecall"
import { INVALID_CHARS } from "../../helpers/utils"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { Formik, Form, Field } from "formik"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Switch from "@material-ui/core/Switch"
import DropDown from "../../common/DropDown"

class ManageStationaryManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stationaryManagement: {
        Name: "",
        AvailableCount: "",
        Active: "Inactive",
        Code: "",
        Cost: "",
        GSTSlab: "",
        HSNCode: "",
        OpeningStock: "",
      },
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params

    if (id) {
      this.getOneStationaryManagement(id)
    }
  }

  getOneStationaryManagement(id) {
    CallService(
      // stationaryManagement.GetOne + id,
      MethodType.GET,
      false,
      "",
      "",
      this.getOneStationaryManagementResponse
    )
  }

  getOneStationaryManagementResponse = data => {
    this.setState({
      stationaryManagement: data.result,
    })
  }

  handleSubmit = values => {
    console.log(values)
    this.manageStationaryManagement()
  }
  manageStationaryManagement = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageStationaryManagementResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //values._id ? .Update + values._id : .Create,
      values._id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      this.manageStationaryManagementResponse
    )
  }
  manageStationaryManagementResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      this.props.history.push("/stationary-management")
      toastr.success(
        "",
        this.state.stationaryManagement._id
          ? this.props.t("Stationary Management Edited Successfully")
          : this.props.t("Stationary Management Added Successfully")
      )
    }
  }

  render() {
    return (
      <Fragment>
        <Container fluid className="page-content">
          <Row className="mb-4">
            <Col xxs="6">
              <Card>
                <CardBody>
                  <CardTitle>
                    <h4 className="mb-2 font-size-18">
                      {this.props.t("Stationary Management")}
                    </h4>
                  </CardTitle>
                  <Formik
                    initialValues={this.state.stationaryManagement}
                    onSubmit={this.handleSubmit}
                    validateOnBlur={false}
                    validateOnChange={false}
                    validationSchema={StationaryManagementValidation}
                  >
                    {({ setFieldValue, values, errors }) => (
                      <Form className="av-tooltip tooltip-label-bottom p-3">
                        <Row className="mt-2">
                          <Col xs="6" sm="6" md="6" lg="6" xl="6">
                            <FormGroup className="position-relative mt-1">
                              <Label className="requiredField">
                                {this.props.t("Name")}
                              </Label>

                              <Field
                                maxLength="200"
                                className="form-control box-border"
                                name="Name"
                                onKeyPress={event => {
                                  if (INVALID_CHARS.includes(event.key)) {
                                    event.preventDefault()
                                  }
                                }}
                              />

                              {errors.Name && (
                                <div className="invalid-feedback d-block">
                                  {errors.Name}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                          <Col xs="6" sm="6" md="6" lg="6" xl="6">
                            <FormGroup className="position-relative mt-1">
                              <Label className="requiredField">
                                {this.props.t("Code")}
                              </Label>

                              <Field
                                maxLength="50"
                                className="form-control box-border"
                                name="Code"
                                onKeyPress={event => {
                                  if (INVALID_CHARS.includes(event.key)) {
                                    event.preventDefault()
                                  }
                                }}
                              />

                              {errors.Code && (
                                <div className="invalid-feedback d-block">
                                  {errors.Code}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs="6" sm="6" md="6" lg="6" xl="6">
                            <FormGroup className="form-group has-float-label mt-1">
                              <Row>
                                <Col lg="4" className="mt-1 pt-2">
                                  <Label>{this.props.t("Active")}</Label>
                                </Col>
                                <Col lg="7">
                                  <Switch
                                    name="Active"
                                    value="Active"
                                    color="primary"
                                    checked={values.Active === "Active"}
                                    onChange={(event, checked) => {
                                      setFieldValue(
                                        "Active",
                                        checked ? "Active" : "Inactive"
                                      )
                                    }}
                                  />
                                </Col>
                              </Row>
                            </FormGroup>
                          </Col>

                          <Col xs="6" sm="6" md="6" lg="6" xl="6">
                            <FormGroup className="position-relative mt-1">
                              <Label className="mt-1">
                                {this.props.t("Opening Stock")}
                              </Label>

                              <Field
                                className="form-control box-border"
                                name="OpeningStock"
                                onKeyPress={event => {
                                  if (INVALID_CHARS.includes(event.key)) {
                                    event.preventDefault()
                                  }
                                }}
                              />

                              {errors.OpeningStock && (
                                <div className="invalid-feedback d-block">
                                  {errors.OpeningStock}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs="6" sm="6" md="6" lg="6" xl="6">
                            <FormGroup className="position-relative mt-1">
                              <Label className="requiredField">
                                {this.props.t("Cost")}
                              </Label>

                              <Field
                                className="form-control box-border"
                                name="Cost"
                                type="number"
                                onKeyPress={event => {
                                  if (INVALID_CHARS.includes(event.key)) {
                                    event.preventDefault()
                                  }
                                }}
                              />

                              {errors.Cost && (
                                <div className="invalid-feedback d-block">
                                  {errors.Cost}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                          <Col xs="6" sm="6" md="6" lg="6" xl="6">
                            <FormGroup className="position-relative mt-1">
                              <Label className="requiredField">
                                {this.props.t("HSN Code")}
                              </Label>

                              <Field
                                className="form-control box-border"
                                name="HSNCode"
                                type="number"
                                onKeyPress={event => {
                                  if (INVALID_CHARS.includes(event.key)) {
                                    event.preventDefault()
                                  }
                                }}
                              />

                              {errors.HSNCode && (
                                <div className="invalid-feedback d-block">
                                  {errors.HSNCode}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs="6" sm="6" md="6" lg="6" xl="6">
                            <FormGroup className="position-relative mt-1">
                              <Label className="requiredField">
                                {this.props.t("GST Slab")}
                              </Label>

                              <Field
                                className="form-control box-border"
                                name="GSTSlab"
                                type="number"
                                onKeyPress={event => {
                                  if (INVALID_CHARS.includes(event.key)) {
                                    event.preventDefault()
                                  }
                                }}
                              />

                              {errors.GSTSlab && (
                                <div className="invalid-feedback d-block">
                                  {errors.GSTSlab}
                                </div>
                              )}
                            </FormGroup>
                          </Col>

                          <Col xs="6" sm="6" md="6" lg="6" xl="6">
                            <FormGroup className="position-relative mt-1">
                              <Label className="requiredField">
                                {this.props.t("Available Count")}
                              </Label>

                              <Field
                                className="form-control box-border"
                                name="AvailableCount"
                                type="number"
                                onKeyPress={event => {
                                  if (INVALID_CHARS.includes(event.key)) {
                                    event.preventDefault()
                                  }
                                }}
                              />

                              {errors.AvailableCount && (
                                <div className="invalid-feedback d-block">
                                  {errors.AvailableCount}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row className="mt-2">
                          <Col sm={12}>
                            <FormGroup className="float-sm-right  mt-1">
                              <Button type="submit" outline color="primary">
                                {this.props.t("Save")}
                              </Button>
                              <Button
                                className="ml-2"
                                type="button"
                                onClick={() => {
                                  this.props.history.push(
                                    "/stationary-management"
                                  )
                                }}
                                color="danger"
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
export default withTranslation()(ManageStationaryManagement)
