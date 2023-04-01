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
import { shareSettingvalidationSchema } from "../../helpers/validations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from "moment"

import { Formik, Form, Field } from "formik"
import { withTranslation } from "react-i18next"

class ShareSetting extends Component {
  state = {
    buttonAction: false,
    startDate: new Date(),
    capitalGL: [{ label: "1", value: "1" }],
  }
  componentDidMount() {}

  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageShareSetting(values)
  }
  manageShareSetting = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageShareSettingResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      // .Create,
      MethodType.PUT,
      false,
      values,
      "",
      this.manageShareSettingResponse
    )
  }
  manageShareSettingResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(this.props.t("Share Setting Added Successfully"))
    }
  }
  render() {
    return (
      <Fragment>
        <Card className="border-0 rounded shadow ">
          <CardBody className="mb-0 pb-0">
            <Formik
              initialValues={{}}
              onSubmit={this.handleSubmit}
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={shareSettingvalidationSchema}
            >
              {({ setFieldValue, errors }) => (
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
                            if (date) {
                              setFieldValue("EffectiveFrom", date)
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
                            } else
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
                            if (date) {
                              setFieldValue("EffectiveTo", date)
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
                            } else
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
                          {this.props.t("Value of One Share")}
                        </Label>

                        <Field
                          name="ValueOfOneShare"
                          id="ValueOfOneShare"
                          type="text"
                          className="form-control box-border"
                        />

                        {errors.ValueOfOneShare && (
                          <div className="invalid-feedback d-block">
                            {errors.ValueOfOneShare}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Authorized Share Capital")}
                        </Label>

                        <Field
                          name="AuthorizedShareCapital"
                          id="AuthorizedShareCapital"
                          type="text"
                          className="form-control box-border"
                        />

                        {errors.AuthorizedShareCapital && (
                          <div className="invalid-feedback d-block">
                            {errors.AuthorizedShareCapital}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <DropDown
                          classNamePrefix="react-select"
                          className="react-select requiredField"
                          label={this.props.t("Capital GL Account")}
                          name=""
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

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-2 pt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Has Entrance Fee")}
                        </Label>
                        <input
                          type="radio"
                          id="G1"
                          name="HasEntranceFee"
                          value="Male"
                          className="mt-1 ml-4"
                          onChange={() =>
                            setFieldValue("HasEntranceFee", "Yes")
                          }
                        />
                        <label for="G1" className="ml-2">
                          {this.props.t("Yes")}
                        </label>
                        <input
                          type="radio"
                          id="G2"
                          name="HasEntranceFee"
                          value="Female"
                          className="mt-1 ml-2"
                          onChange={() => setFieldValue("HasEntranceFee", "No")}
                        />
                        <label for="G2" className="ml-2">
                          {this.props.t("No")}
                        </label>
                        {errors.HasEntranceFee && (
                          <div className="invalid-feedback d-block">
                            {errors.HasEntranceFee}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Entrance Fee for Each Share")}
                        </Label>

                        <Field
                          name="EntranceFeeForEachShare"
                          id="EntranceFeeForEachShare"
                          type="text"
                          className="form-control box-border"
                        />

                        {errors.EntranceFeeForEachShare && (
                          <div className="invalid-feedback d-block">
                            {errors.EntranceFeeForEachShare}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Maximum Entrance Fee")}
                        </Label>

                        <Field
                          name="MaximumEntranceFee"
                          id="MaximumEntranceFee"
                          type="text"
                          className="form-control box-border"
                        />

                        {errors.MaximumEntranceFee && (
                          <div className="invalid-feedback d-block">
                            {errors.MaximumEntranceFee}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="12" sm="12" md="12" lg={12} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t(
                            "Percentage of Allowed Share Paid Up Capital"
                          )}
                        </Label>

                        <Field
                          name="PercentageOfAllowedSharePaidUpCapital"
                          id="PercentageOfAllowedSharePaidUpCapital"
                          type="text"
                          className="form-control box-border"
                        />
                        {errors.PercentageOfAllowedSharePaidUpCapital && (
                          <div className="invalid-feedback d-block">
                            {errors.PercentageOfAllowedSharePaidUpCapital}
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

export default withTranslation()(ShareSetting)
