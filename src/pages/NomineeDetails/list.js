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
import { NomineeDetailsValidationSchema } from "../../helpers/validations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form, Field } from "formik"

class NomineeDetails extends Component {
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
    this.manageNomineeDetails(values)
  }
  manageNomineeDetails = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageNomineeDetailsResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      // .Create,
      MethodType.PUT,
      false,
      values,
      "",
      this.manageNomineeDetailsResponse
    )
  }
  manageNomineeDetailsResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(this.props.t("Nominee Details Added Successfully"))
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
          validationSchema={NomineeDetailsValidationSchema}
        >
          {({ values, setFieldValue, errors }) => (
            <Form className="av-tooltip tooltip-label-bottom">
              <Card>
                <CardBody className="mb-0 pb-0">
                  <Row className="p-3 border">
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Nominee For Shares")}
                        </Label>
                        <Field
                          name="NomineeForShares"
                          id="NomineeForShares"
                          className="form-control box-border"
                        />
                        {errors.NomineeForShares && (
                          <div className="invalid-feedback d-block">
                            {errors.NomineeForShares}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Relation")}
                        </Label>
                        <Field
                          name="NomineeForSharesRelation"
                          id="NomineeForSharesRelation"
                          className="form-control box-border"
                        />
                        {errors.NomineeForSharesRelation && (
                          <div className="invalid-feedback d-block">
                            {errors.NomineeForSharesRelation}
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
                          name="NomineeForSharesDoorNo"
                          id="NomineeForSharesDoorNo"
                          className="form-control box-border"
                        />
                        {errors.NomineeForSharesDoorNo && (
                          <div className="invalid-feedback d-block">
                            {errors.NomineeForSharesDoorNo}
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
                          name="NomineeForSharesAddressLine1"
                          className="form-control box-border"
                        />
                        {errors.NomineeForSharesAddressLine1 && (
                          <div className="invalid-feedback d-block">
                            {errors.NomineeForSharesAddressLine1}
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
                          name="NomineeForSharesAddressLine2 "
                          className="form-control box-border"
                        />
                        {errors.NomineeForSharesAddressLine2 && (
                          <div className="invalid-feedback d-block">
                            {errors.NomineeForSharesAddressLine2}
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
                          name="NomineeForSharesArea"
                          isSearchable
                          options={this.state.Area}
                          placeholderText={""}
                          Checkbox={false}
                          Action={e => {
                            setFieldValue("NomineeForSharesArea", e.value)
                          }}
                          errors={errors.NomineeForSharesArea}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-1">
                      <FormGroup className="position-relative mt-1">
                        <DropDown
                          classNamePrefix="react-select"
                          className="react-select "
                          label={this.props.t("District")}
                          name="NomineeForSharesDistrict"
                          isSearchable
                          options={this.state.District}
                          placeholderText={""}
                          Checkbox={false}
                          Action={e => {
                            setFieldValue("NomineeForSharesDistrict", e.value)
                          }}
                          errors={errors.NomineeForSharesDistrict}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-1">
                      <FormGroup className="position-relative mt-1">
                        <DropDown
                          classNamePrefix="react-select"
                          className="react-select "
                          label={this.props.t("State")}
                          name="NomineeForSharesState"
                          isSearchable
                          value={this.state.State}
                          isDisabled={true}
                          Checkbox={false}
                          Action={e => {
                            setFieldValue("NomineeForSharesState", e.value)
                          }}
                          errors={errors.State}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Pin Code")}
                        </Label>

                        <Field
                          name="NomineeForSharesPincode"
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.NomineeForSharesPincode && (
                          <div className="invalid-feedback d-block">
                            {errors.NomineeForSharesPincode}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Member ID")}
                        </Label>

                        <div className="app-search position-relative pt-0 mt-0 bg-white d-lg-block">
                          <Field
                            type="text"
                            name="NomineeForSharesMemberID"
                            // onKeyPress={this.enterPressed.bind(this)}
                            //onChange={e => onTextChange(e)}
                            className="form-control "
                            placeholder={this.props.t("Search") + "..."}
                            // value={searchValue}
                          />
                          <span className="bx bx-search-alt"></span>
                        </div>
                        {errors.NomineeForSharesMemberID && (
                          <div className="invalid-feedback d-block">
                            {errors.NomineeForSharesMemberID}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Phone Number")}
                        </Label>

                        <Field
                          name="NomineeForSharesPhoneNumber"
                          id="NomineeForSharesPhoneNumber"
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.NomineeForSharesPhoneNumber && (
                          <div className="invalid-feedback d-block">
                            {errors.NomineeForSharesPhoneNumber}
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
                          name="NomineeForSharesAadhaarNo"
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.NomineeForSharesAadhaarNo && (
                          <div className="invalid-feedback d-block">
                            {errors.NomineeForSharesAadhaarNo}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="12" sm="12" md="12" lg={12} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className=" mt-1">
                          {this.props.t("Additional Details")}
                        </Label>
                        <Field
                          name="NomineeForSharesAdditionalDetails"
                          id="NomineeForSharesAdditionalDetails"
                          component="textarea"
                          className="form-control box-border"
                        />
                        {errors.NomineeForSharesAdditionalDetails && (
                          <div className="invalid-feedback d-block">
                            {errors.NomineeForSharesAdditionalDetails}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>{" "}
                  <Row className="p-3 border mt-2">
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Nominee For Deposit")}
                        </Label>
                        <Field
                          name="NomineeForDeposit"
                          id="NomineeForDeposit"
                          className="form-control box-border"
                        />
                        {errors.NomineeForDeposit && (
                          <div className="invalid-feedback d-block">
                            {errors.NomineeForDeposit}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Relation")}
                        </Label>
                        <Field
                          name="NomineeForDepositRelation"
                          id="NomineeForDepositRelation"
                          className="form-control box-border"
                        />
                        {errors.NomineeForDepositRelation && (
                          <div className="invalid-feedback d-block">
                            {errors.NomineeForDepositRelation}
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
                          name="NomineeForDepositDoorNo"
                          id="NomineeForDepositDoorNo"
                          className="form-control box-border"
                        />
                        {errors.NomineeForDepositDoorNo && (
                          <div className="invalid-feedback d-block">
                            {errors.NomineeForDepositDoorNo}
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
                          name="NomineeForDepositAddressLine1"
                          className="form-control box-border"
                        />
                        {errors.NomineeForDepositAddressLine1 && (
                          <div className="invalid-feedback d-block">
                            {errors.NomineeForDepositAddressLine1}
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
                          name="NomineeForDepositAddressLine2 "
                          className="form-control box-border"
                        />
                        {errors.NomineeForDepositAddressLine2 && (
                          <div className="invalid-feedback d-block">
                            {errors.NomineeForDepositAddressLine2}
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
                          name="NomineeForDepositArea"
                          isSearchable
                          options={this.state.Area}
                          placeholderText={""}
                          Checkbox={false}
                          Action={e => {
                            setFieldValue("NomineeForDepositArea", e.value)
                          }}
                          errors={errors.NomineeForDepositArea}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-1">
                      <FormGroup className="position-relative mt-1">
                        <DropDown
                          classNamePrefix="react-select"
                          className="react-select "
                          label={this.props.t("District")}
                          name="NomineeForDepositDistrict"
                          isSearchable
                          options={this.state.District}
                          placeholderText={""}
                          Checkbox={false}
                          Action={e => {
                            setFieldValue("NomineeForDepositDistrict", e.value)
                          }}
                          errors={errors.NomineeForDepositDistrict}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-1">
                      <FormGroup className="position-relative mt-1">
                        <DropDown
                          classNamePrefix="react-select"
                          className="react-select "
                          label={this.props.t("State")}
                          name="NomineeForDepositState"
                          isSearchable
                          value={this.state.State}
                          isDisabled={true}
                          Checkbox={false}
                          Action={e => {
                            setFieldValue("NomineeForDepositState", e.value)
                          }}
                          errors={errors.State}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Pin Code")}
                        </Label>

                        <Field
                          name="NomineeForDepositPincode"
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.NomineeForDepositPincode && (
                          <div className="invalid-feedback d-block">
                            {errors.NomineeForDepositPincode}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Member ID")}
                        </Label>

                        <div className="app-search position-relative pt-0 mt-0 bg-white d-lg-block">
                          <Field
                            type="text"
                            name="NomineeForDepositMemberID"
                            // onKeyPress={this.enterPressed.bind(this)}
                            //onChange={e => onTextChange(e)}
                            className="form-control"
                            placeholder={this.props.t("Search") + "..."}
                            // value={searchValue}
                          />
                          <span className="bx bx-search-alt"></span>
                        </div>
                        {errors.NomineeForDepositMemberID && (
                          <div className="invalid-feedback d-block">
                            {errors.NomineeForDepositMemberID}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Phone Number")}
                        </Label>

                        <Field
                          name="NomineeForDepositPhoneNumber"
                          id="NomineeForDepositPhoneNumber"
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.NomineeForDepositPhoneNumber && (
                          <div className="invalid-feedback d-block">
                            {errors.NomineeForDepositPhoneNumber}
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
                          name="NomineeForDepositAadhaarNo"
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.NomineeForDepositAadhaarNo && (
                          <div className="invalid-feedback d-block">
                            {errors.NomineeForDepositAadhaarNo}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="12" sm="12" md="12" lg={12} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className=" mt-1">
                          {this.props.t("Additional Details")}
                        </Label>
                        <Field
                          name="NomineeForDepositAdditionalDetails"
                          id="NomineeForDepositAdditionalDetails"
                          component="textarea"
                          className="form-control box-border"
                        />
                        {errors.NomineeForDepositAdditionalDetails && (
                          <div className="invalid-feedback d-block">
                            {errors.NomineeForDepositAdditionalDetails}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>{" "}
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

export default withTranslation()(NomineeDetails)
