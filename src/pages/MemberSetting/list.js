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

import toastr from "toastr"
import "toastr/build/toastr.min.css"
import Tooltip from "@material-ui/core/Tooltip"
import { withStyles } from "@material-ui/core/styles"
import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { membersettingvalidationSchema } from "../../helpers/validations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from "moment"
import { withTranslation } from "react-i18next"

import { Formik, Form, Field } from "formik"
import * as Yup from "yup"

class MemberSetting extends Component {
  state = {
    allowReadmissiononPaymentof: [
      { label: "a", value: "a" },
      { label: "b", value: "b" },
      { label: "c", value: "c" },
    ],
    buttonAction: false,
    startDate: new Date(),
    listOfProductForDisplay: [""],
  }

  componentDidMount() {}

  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageMemberSetting(values)
  }
  manageMemberSetting = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageMemberSettingResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      // .Create,
      MethodType.PUT,
      false,
      values,
      "",
      this.manageMemberSettingResponse
    )
  }
  manageMemberSettingResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(this.props.t("Member Setting Added Successfully"))
    }
  }
  handleCancel = () => {
    toastr.success("", "cancel")
  }
  render() {
    return (
      <Fragment>
        <Card className="border-0 rounded shadow">
          <CardBody className="mb-0 pb-0">
            <Formik
              initialValues={{}}
              onSubmit={this.handleSubmit}
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={membersettingvalidationSchema}
            >
              {({ setFieldValue, errors, values }) => (
                <Form className="av-tooltip tooltip-label-bottom">
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
                            setFieldValue("effectiveFrom", date)
                            if (date)
                              this.setState(
                                {
                                  startDateTime: date,
                                  listRequestModel: {
                                    ...this.state.listRequestModel,

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
                                  listRequestModel: {
                                    ...this.state.listRequestModel,

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
                        {errors.effectiveFrom && (
                          <div className="invalid-feedback d-block">
                            {errors.effectiveFrom}
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
                            setFieldValue("effectiveTo", date)
                            if (date)
                              this.setState(
                                {
                                  endDateTime: date,
                                  listRequestModel: {
                                    ...this.state.listRequestModel,

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
                                  listRequestModel: {
                                    ...this.state.listRequestModel,

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
                        {errors.effectiveTo && (
                          <div className="invalid-feedback d-block">
                            {errors.effectiveTo}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Minimum Service Period for Admission")}
                          (In Months)
                        </Label>
                        <Field
                          name="minimumServicePeriodForAdmission"
                          id="minimumServicePeriodForAdmission"
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.minimumServicePeriodForAdmission && (
                          <div className="invalid-feedback d-block">
                            {errors.minimumServicePeriodForAdmission}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t(
                            "Readmission can be Allowed After Period"
                          )}{" "}
                          (In Months)
                        </Label>

                        <Field
                          name="readmissionCanBeAllowedAfterPeriod"
                          id="readmissionCanBeAllowedAfterPeriod"
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.readmissionCanBeAllowedAfterPeriod && (
                          <div className="invalid-feedback d-block">
                            {errors.readmissionCanBeAllowedAfterPeriod}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-1">
                      <FormGroup className="position-relative mt-1">
                        <DropDown
                          classNamePrefix="react-select"
                          className="react-select  "
                          label={this.props.t(
                            "Allow Readmission on Payment of"
                          )}
                          name="allowReadmissiononPaymentof"
                          isMulti={true}
                          isSearchable
                          options={this.state.allowReadmissiononPaymentof}
                          placeholderText={""}
                          Checkbox={false}
                          Action={e => {
                            setFieldValue(
                              "allowReadmissiononPaymentof",
                              e
                                ? e.map(v => {
                                    return v.value
                                  })
                                : ""
                            )
                          }}
                          errors={errors.allowReadmissiononPaymentof}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Penalty Fees for Readmission")}
                        </Label>
                        <Field
                          name="penaltyFeesForReadmission"
                          id="penaltyFeesForReadmission"
                          type="number"
                          className="form-control box-border"
                        />

                        {errors.penaltyFeesForReadmission && (
                          <div className="invalid-feedback d-block">
                            {errors.penaltyFeesForReadmission}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Minimum Shares to Buy")}
                        </Label>
                        <Field
                          name="minimumSharesToBuy"
                          id="minimumSharesToBuy"
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.minimumSharesToBuy && (
                          <div className="invalid-feedback d-block">
                            {errors.minimumSharesToBuy}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Maximum Shares can Buy")}
                        </Label>
                        <Field
                          name="maximumSharesCanBuy"
                          id="maximumSharesCanBuy"
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.maximumSharesCanBuy && (
                          <div className="invalid-feedback d-block">
                            {errors.maximumSharesCanBuy}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="12" sm="12" md="12" lg={12} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Maximum Borrowing Power")}
                        </Label>

                        <Field
                          name="maximumBorrowingPower"
                          id="maximumBorrowingPower"
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.maximumBorrowingPower && (
                          <div className="invalid-feedback d-block">
                            {errors.maximumBorrowingPower}
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
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Fragment>
    )
  }
}

export default withTranslation()(MemberSetting)
