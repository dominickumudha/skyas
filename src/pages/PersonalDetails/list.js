import React, { Component, Fragment } from "react"
import {
  Row,
  Col,
  FormGroup,
  Button,
  Label,
  CardBody,
  Card,
  CustomInput,
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
import { PersonalDetailsValidationSchema } from "../../helpers/validations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form, Field } from "formik"

class PersonalDetails extends Component {
  state = {
    startDate: new Date(),
    buttonAction: false,
    Title: [{ label: "1", value: "1" }],
    Religion: [{ label: "1", value: "1" }],
    Area: [{ label: "1", value: "1" }],
    District: [{ label: "1", value: "1" }],
    State: [{ label: "TamilNadu", value: "TamilNadu" }],
    Gender: [
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
      { label: "Transgender", value: "Transgender" },
    ],
  }
  componentDidMount() {}

  handleSubmit = values => {
    console.log(values)
    this.setState({
      buttonAction: true,
    })
    this.managePersonalDetails(values)
  }
  managePersonalDetails = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.managePersonalDetailsResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      // .Create,
      MethodType.PUT,
      false,
      values,
      "",
      this.managePersonalDetailsResponse
    )
  }
  managePersonalDetailsResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(this.props.t("Personal Details Added Successfully"))
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
          validationSchema={PersonalDetailsValidationSchema}
        >
          {({ values, setFieldValue, errors }) => (
            <Form className="av-tooltip tooltip-label-bottom">
              <Card>
                <CardBody className="mb-0 pb-0">
                  <Row className="px-3">
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-1">
                      <FormGroup className="position-relative mt-1">
                        <DropDown
                          classNamePrefix="react-select"
                          className="react-select "
                          label={this.props.t("Title")}
                          name="Title"
                          isSearchable
                          options={this.state.Title}
                          placeholderText={""}
                          Checkbox={false}
                          Action={e => {
                            setFieldValue("Title", e.value)
                          }}
                          errors={errors.Title}
                        />
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-3 pt-4">
                        <Label className="requiredField mt-1">
                          {this.props.t("Married")}
                        </Label>
                        <input
                          type="radio"
                          id="G1"
                          name="Married"
                          value="Male"
                          className="mt-1 ml-4"
                          onChange={() => setFieldValue("Married", "Yes")}
                        />
                        <label for="G1" className="ml-2">
                          {this.props.t("Yes")}
                        </label>
                        <input
                          type="radio"
                          id="G2"
                          name="Married"
                          value="Female"
                          className="mt-1 ml-2"
                          onChange={() => setFieldValue("Married", "No")}
                        />
                        <label for="G2" className="ml-2">
                          {this.props.t("No")}
                        </label>
                        {errors.Married && (
                          <div className="invalid-feedback d-block">
                            {errors.Married}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Name")}
                        </Label>
                        <Field
                          name="Name"
                          id="Name"
                          className="form-control box-border"
                        />
                        {errors.Name && (
                          <div className="invalid-feedback d-block">
                            {errors.Name}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Father's/Husband Name")}
                        </Label>
                        <Field
                          name="FHName"
                          id="FHName"
                          className="form-control box-border"
                        />
                        {errors.FHName && (
                          <div className="invalid-feedback d-block">
                            {errors.FHName}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Date Of Birth")} (DOB)
                        </Label>
                        <DatePicker
                          name="DOB"
                          startDate={this.state.startDateTime}
                          selectsStart
                          endDate={this.state.endDateTime}
                          components={{
                            Input: CustomSelectInput,
                          }}
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          className="form-control"
                          selected={values.DOB ? new Date(values.DOB) : ""}
                          isClearable={true}
                          onChange={date => {
                            setFieldValue("DOB", date)
                          }}
                          placeholderText="Select Date"
                          dateFormat="dd/MM/yyyy"
                        />
                        {errors.DOB && (
                          <div className="invalid-feedback d-block">
                            {errors.DOB}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className=" mt-1">
                          {this.props.t("Email Id")}
                        </Label>
                        <Field
                          name="Email"
                          id="Email"
                          className="form-control box-border"
                        />
                        {errors.Email && (
                          <div className="invalid-feedback d-block">
                            {errors.Email}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-1">
                      <FormGroup className="position-relative mt-1">
                        <DropDown
                          classNamePrefix="react-select"
                          className="react-select "
                          label={this.props.t("Gender")}
                          name="Gender"
                          isSearchable
                          options={this.state.Gender}
                          placeholderText={""}
                          Checkbox={false}
                          Action={e => {
                            setFieldValue("Gender", e.value)
                          }}
                          errors={errors.Gender}
                        />
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Mobile Number")}
                        </Label>

                        <Field
                          name="MobileNo"
                          id="MobileNo"
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.MobileNo && (
                          <div className="invalid-feedback d-block">
                            {errors.MobileNo}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-1">
                      <FormGroup className="position-relative mt-1">
                        <DropDown
                          classNamePrefix="react-select"
                          className="react-select filters"
                          label={this.props.t("Religion")}
                          name="Religion"
                          isSearchable
                          options={this.state.Religion}
                          placeholderText={""}
                          Checkbox={false}
                          Action={e => {
                            setFieldValue("Religion", e.value)
                          }}
                          errors={errors.Religion}
                        />
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className=" mt-1">
                          {this.props.t("Landline Number")}
                        </Label>
                        <Field
                          name="LandlineNo"
                          id="LandlineNo"
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.LandlineNo && (
                          <div className="invalid-feedback d-block">
                            {errors.LandlineNo}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="mt-1">{this.props.t("Caste")}</Label>
                        <Field
                          name="Caste"
                          id="Caste"
                          className="form-control box-border"
                        />{" "}
                        {errors.Caste && (
                          <div className="invalid-feedback d-block">
                            {errors.Caste}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="mt-1">
                          {this.props.t("Community")}
                        </Label>

                        <Field
                          name="Community"
                          id="Community"
                          className="form-control box-border"
                        />
                        {errors.Community && (
                          <div className="invalid-feedback d-block">
                            {errors.Community}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg="6" xl="6" className="pl-4">
                      <FormGroup className="position-relative">
                        <Label className="requiredField mt-1">
                          {this.props.t("Photo")}
                        </Label>

                        <CustomInput
                           className="position-sticky"
                          key={"Photo"}
                          type="file"
                          name={"Photo"}
                          onChange={event => {
                            setFieldValue("Photo", event.target.files[0])
                          }}
                        />

                        {errors.Photo ? (
                          <div className="invalid-feedback d-block">
                            {errors.Photo}
                          </div>
                        ) : null}
                        <p className="text-semi-muted">
                          {this.props.t(
                            "Allowed formats are jpeg ,jpg and png"
                          )}
                          <br />
                          {this.props.t("File Size Must be Less Than 5 Mb")}
                        </p>
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className=" mt-1">
                          {this.props.t("Additional Details")}
                        </Label>
                        <Field
                          name="AdditionalDetails"
                          id="AdditionalDetails"
                          className="form-control box-border"
                        />
                        {errors.AdditionalDetails && (
                          <div className="invalid-feedback d-block">
                            {errors.AdditionalDetails}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Door No")}
                        </Label>
                        <Field
                          name="DoorNo"
                          id="DoorNo"
                          className="form-control box-border"
                        />
                        {errors.DoorNo && (
                          <div className="invalid-feedback d-block">
                            {errors.DoorNo}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Address Line 1")}
                        </Label>

                        <Field
                          name="AddressLine1"
                          className="form-control box-border"
                        />
                        {errors.AddressLine1 && (
                          <div className="invalid-feedback d-block">
                            {errors.AddressLine1}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                      <FormGroup className="position-relative mt-1">
                        <Label className=" mt-1">
                          {this.props.t("Address Line 2")}
                        </Label>

                        <Field
                          name="AddressLine2 "
                          className="form-control box-border"
                        />
                        {errors.AddressLine2 && (
                          <div className="invalid-feedback d-block">
                            {errors.AddressLine2}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-1">
                      <FormGroup className="position-relative mt-1">
                        <DropDown
                          classNamePrefix="react-select"
                          className="react-select "
                          label={this.props.t("Area")}
                          name="Area"
                          isSearchable
                          options={this.state.Area}
                          placeholderText={""}
                          Checkbox={false}
                          Action={e => {
                            setFieldValue("Area", e.value)
                          }}
                          errors={errors.Area}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-1">
                      <FormGroup className="position-relative mt-1">
                        <DropDown
                          classNamePrefix="react-select"
                          className="react-select "
                          label={this.props.t("District")}
                          name="District"
                          isSearchable
                          options={this.state.District}
                          placeholderText={""}
                          Checkbox={false}
                          Action={e => {
                            setFieldValue("District", e.value)
                          }}
                          errors={errors.District}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-1">
                      <FormGroup className="position-relative mt-1">
                        <DropDown
                          classNamePrefix="react-select"
                          className="react-select "
                          label={this.props.t("State")}
                          name="State"
                          isSearchable
                          value={this.state.State}
                          isDisabled={true}
                          Checkbox={false}
                          Action={e => {
                            setFieldValue("State", e.value)
                          }}
                          errors={errors.State}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                      <FormGroup className="position-relative mt-1">
                        <Label className=" mt-1">
                          {this.props.t("Pin Code")}
                        </Label>

                        <Field
                          name="Pincode"
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.Pincode && (
                          <div className="invalid-feedback d-block">
                            {errors.Pincode}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("PAN Number")}
                        </Label>

                        <Field
                          name="PANNo"
                          className="form-control box-border"
                        />
                        {errors.PANNo && (
                          <div className="invalid-feedback d-block">
                            {errors.PANNo}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Aadhaar Number")}
                        </Label>

                        <Field
                          name="AadhaarNo"
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.AadhaarNo && (
                          <div className="invalid-feedback d-block">
                            {errors.AadhaarNo}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg="6" xl="6" className="pl-4">
                      <FormGroup className="position-relative">
                        <Label className="requiredField mt-1">
                          {this.props.t("Signature")}
                        </Label>

                        <CustomInput
                           className="position-sticky"
                          key={"imageUrl"}
                          type="file"
                          name={"signature"}
                          placeholder="Choose Image"
                          onChange={event => {
                            setFieldValue("signature", event.target.files[0])
                          }}
                        />
                        {errors.signature ? (
                          <div className="invalid-feedback d-block">
                            {errors.signature}
                          </div>
                        ) : null}
                        <p className="text-semi-muted">
                          {this.props.t(
                            "Allowed formats are jpeg ,jpg and png"
                          )}
                          <br />
                          {this.props.t("File Size Must be Less Than 5 Mb")}
                        </p>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="px-3 mt-2">
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

export default withTranslation()(PersonalDetails)
