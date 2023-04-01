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
import { dividendSettingvalidationSchema } from "../../helpers/validations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form, Field } from "formik"

class DividendSetting extends Component {
  state = {
    startDate: new Date(),
    buttonAction: false,
    capitalGL: [{ label: "1", value: "1" }],
  }
  componentDidMount() {}

  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageDividendSetting(values)
  }
  manageDividendSetting = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageDividendSettingResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      // .Create,
      MethodType.PUT,
      false,
      values,
      "",
      this.manageDividendSettingResponse
    )
  }
  manageDividendSettingResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(this.props.t("Dividend Setting Added Successfully"))
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
          validationSchema={dividendSettingvalidationSchema}
        >
          {({ setFieldValue, errors }) => (
            <Form className="av-tooltip tooltip-label-bottom">
              <Card>
                <CardBody className="mb-0 pb-0">
                  <Row className="px-3">
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Effective From")}
                        </Label>
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
                                  ListRequestModel: {
                                    ...this.state.ListRequestModel,

                                    pageNumber: 1,

                                    StartTime: parseInt(
                                      new Date(date.setHours(0, 0, 0)).getTime()
                                    ),
                                  },
                                },
                                () => {
                                  // this.GetAllLeave();
                                }
                              )
                            else
                              this.setState(
                                {
                                  startDateTime: "",
                                  ListRequestModel: {
                                    ...this.state.ListRequestModel,

                                    pageNumber: 1,

                                    StartTime: "",
                                  },
                                },
                                () => {
                                  // this.GetAllLeave();
                                }
                              )
                          }}
                          placeholderText={this.props.t("Select Date")}
                          dateFormat="dd/MM/yyyy"
                        />
                        {errors.EffectiveFrom && (
                          <div className="invalid-feedback d-block">
                            {errors.EffectiveFrom}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Effective To")}
                        </Label>
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
                                  ListRequestModel: {
                                    ...this.state.ListRequestModel,

                                    pageNumber: 1,

                                    StartTime: parseInt(
                                      new Date(date.setHours(0, 0, 0)).getTime()
                                    ),
                                  },
                                },
                                () => {
                                  // this.GetAllLeave();
                                }
                              )
                            else
                              this.setState(
                                {
                                  endDateTime: "",
                                  ListRequestModel: {
                                    ...this.state.ListRequestModel,

                                    pageNumber: 1,

                                    StartTime: "",
                                  },
                                },
                                () => {
                                  // this.GetAllLeave();
                                }
                              )
                          }}
                          placeholderText={this.props.t("Select Date")}
                          dateFormat="dd/MM/yyyy"
                        />
                        {errors.EffectiveTo && (
                          <div className="invalid-feedback d-block">
                            {errors.EffectiveTo}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Dividend Percentage")}
                        </Label>
                        <Field
                          name="DividendPercentage"
                          id="DividendPercentage"
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.DividendPercentage && (
                          <div className="invalid-feedback d-block">
                            {errors.DividendPercentage}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Reserve Funds Percentage")}
                        </Label>
                        <Field
                          name="ReserveFundsPercentage"
                          id="ReserveFundsPercentage"
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.ReserveFundsPercentage && (
                          <div className="invalid-feedback d-block">
                            {errors.ReserveFundsPercentage}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Co-op Research & Development Fund ")}
                          (%)
                        </Label>

                        <Field
                          name="ResearchDevelopmentFund"
                          id="ResearchDevelopmentFund"
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.ResearchDevelopmentFund && (
                          <div className="invalid-feedback d-block">
                            {errors.ResearchDevelopmentFund}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Co-op Education Fund ")}(%)
                        </Label>
                        <Field
                          name="EducationFund"
                          id="EducationFund"
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.EducationFund && (
                          <div className="invalid-feedback d-block">
                            {errors.EducationFund}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Bad & Doubtful Reserve Fund ")}
                          (%)
                        </Label>
                        <Field
                          name="BadDoubtfulReserveFund"
                          id="BadDoubtfulReserveFund"
                          type="number"
                          className="form-control box-border"
                        />{" "}
                        {errors.BadDoubtfulReserveFund && (
                          <div className="invalid-feedback d-block">
                            {errors.BadDoubtfulReserveFund}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Common Good Fund ")}(%)
                        </Label>

                        <Field
                          name="CommonGoodFund"
                          id="CommonGoodFund"
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.CommonGoodFund && (
                          <div className="invalid-feedback d-block">
                            {errors.CommonGoodFund}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Building Fund ")}(%)
                        </Label>
                        <Field
                          name="BuildingFund"
                          id="BuildingFund"
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.BuildingFund && (
                          <div className="invalid-feedback d-block">
                            {errors.BuildingFund}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Honorarium ")}(%)
                        </Label>
                        <Field
                          name="Honorarium"
                          id="Honorarium"
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.Honorarium && (
                          <div className="invalid-feedback d-block">
                            {errors.Honorarium}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-1">
                      <FormGroup className="position-relative mt-1">
                        <DropDown
                          classNamePrefix="react-select"
                          className="react-select "
                          label={this.props.t("Capital GL Account")}
                          name="CapitalGLAccount"
                          isSearchable
                          options={this.state.capitalGL}
                          placeholderText={""}
                          Checkbox={false}
                          Action={e => {
                            setFieldValue("CapitalGLAccount", e.value)
                          }}
                          errors={errors.CapitalGLAccount}
                        />
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Bonus ")}(%)
                        </Label>

                        <Field
                          name="Bonus"
                          id="Bonus"
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.Bonus && (
                          <div className="invalid-feedback d-block">
                            {errors.Bonus}
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

export default withTranslation()(DividendSetting)
