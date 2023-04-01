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

class AddProduct extends Component {
  state = {
    buttonAction: false,
    depositList: [
      { label: "Loan", value: "Loan" },
    ],
  }
  componentDidMount() { }

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
            <CardTitle>{this.props.t("Add product (deposit type)")}</CardTitle>
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



                          <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                            <FormGroup className="position-relative">
                              <Label className="requiredField mt-1">
                                {this.props.t("Type")}
                              </Label>
                              <DropDown
                                classNamePrefix="react-select"
                                className="react-select"
                                label=""
                                name=""
                                isSearchable
                                options={this.state.depositList}
                                placeholderText="Deposit"
                                Checkbox={false}
                                Action={e => {
                                  if (e) setFieldValue("Type", e.value)
                                }}
                                errors={errors.Type}
                              />
                            </FormGroup>
                          </Col>


                          <Col xs="6" sm="6" md="6" lg={6} className="pl-4" />



                          <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                            <FormGroup className="position-relative mt-1">
                              <Label className="requiredField mt-1">
                                {this.props.t("Name")}
                              </Label>
                              <Field
                                name="Name"
                                id="Name"
                                type="text"
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
                                {this.props.t("Code")}
                              </Label>
                              <Field
                                name="Code"
                                id="Code"
                                type="text"
                                className="form-control box-border"
                              />
                              {errors.Code && (
                                <div className="invalid-feedback d-block">
                                  {errors.Code}
                                </div>
                              )}
                            </FormGroup>
                          </Col>



                          <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                            <FormGroup className="position-relative mt-1">
                              <Label className="mt-1" >
                                Deposit Configuration
                              </Label>

                            </FormGroup>
                          </Col>
                          <Col xs="6" sm="6" md="6" lg={6} className="pl-4" />

                          <Col xs="1" sm="1" md="1" lg={1} className="pl-4">
                            <Label className=" mt-3">
                              {this.props.t("Tenure Min")}
                            </Label>
                          </Col>
                          <Col xs="3" sm="3" md="3" lg={3} className="pl-4">
                            <FormGroup className="position-relative mt-1">

                              <Field
                                name="Tenuremin"
                                id="Tenuremin"
                                type="text"
                                className="form-control box-border mt-3"
                              />
                              {errors.Tenuremin && (
                                <div className="invalid-feedback d-block">
                                  {errors.Tenuremin}
                                </div>
                              )}
                            </FormGroup>
                          </Col>

                          <Col xs="2" sm="2" md="2" lg={2} className="pl-4">
                            <FormGroup className="position-relative">
                              <DropDown
                                classNamePrefix="react-select"
                                className="react-select"
                                // label={this.props.t("PO No")}
                                name="TenureMinDays"
                                isSearchable
                                // options={this.state.district}
                                placeholderText="Days"
                                Checkbox={false}
                                Action={e => {
                                  if (e) setFieldValue("TenureMinDays", e.value)
                                }}
                                errors={errors.TenureMinDays}
                              />
                            </FormGroup>
                          </Col>



                          <Col xs="1" sm="1" md="1" lg={1} className="pl-4">
                            <Label className="mt-3">
                              {this.props.t("Tenure Max")}
                            </Label>

                          </Col>
                          <Col xs="3" sm="3" md="3" lg={3} className="pl-4">
                            <FormGroup className="position-relative mt-1">

                              <Field
                                name="TenureMaxDays"
                                id="Name"
                                type="text"
                                className="form-control box-border mt-3"
                              />
                              {errors.Name && (
                                <div className="invalid-feedback d-block">
                                  {errors.Name}
                                </div>
                              )}
                            </FormGroup>
                          </Col>

                          <Col xs="2" sm="2" md="2" lg={2} className="pl-4">
                            <FormGroup className="position-relative">
                              <DropDown
                                classNamePrefix="react-select"
                                className="react-select"
                                // label={this.props.t("PO No")}
                                name="TenureMaxDays"
                                isSearchable
                                // options={this.state.district}
                                placeholderText="Days"
                                Checkbox={false}
                                Action={e => {
                                  if (e) setFieldValue("TenureMaxDays", e.value)
                                }}
                                errors={errors.TenureMaxDays}
                              />
                            </FormGroup>
                          </Col>



                          <Col xs="1" sm="1" md="1" lg={1} className="pl-4">
                            <Label className="mt-3">
                              {this.props.t("Deposit Type")}
                            </Label>

                          </Col>
                          <Col xs="3" sm="3" md="3" lg={3} className="pl-4">
                            <FormGroup className="position-relative mt-1">
                              <DropDown
                                classNamePrefix="react-select"
                                className="react-select"
                                label=""
                                name="DepositType"
                                isSearchable
                                // options={this.state.district}
                                placeholderText={""}
                                Checkbox={false}
                                Action={e => {
                                  if (e) setFieldValue("DepositType", e.value)
                                }}
                                errors={errors.DepositType}
                              />
                            </FormGroup>
                          </Col>



                          <Col xs="8" sm="8" md="8" lg={8} className="pl-4" />







                          <Col xs="3" sm="3" md="3" lg={3} className="pl-4">
                            <Label className=" mt-1">
                              {this.props.t("Min Amount")}
                            </Label>

                          </Col>
                          <Col xs="3" sm="3" md="6" lg={3} className="pl-4">
                            <FormGroup className="position-relative mt-1">

                              <Field
                                name="MinAmount"
                                id="Name"
                                type="text"
                                className="form-control box-border"
                              />
                              {errors.MinAmount && (
                                <div className="invalid-feedback d-block">
                                  {errors.MinAmount}
                                </div>
                              )}
                            </FormGroup>
                          </Col>






                          <Col xs="3" sm="3" md="3" lg={3} className="pl-4">
                            <Label className=" mt-1">
                              {this.props.t("Max Amount")}
                            </Label>
                          </Col>
                          <Col xs="3" sm="3" md="3" lg={3} className="pl-4">
                            <FormGroup className="position-relative mt-1">

                              <Field
                                name="Max Amount"
                                id="Name"
                                type="text"
                                className="form-control box-border"
                              />
                              {errors.MaxAmount && (
                                <div className="invalid-feedback d-block">
                                  {errors.MaxAmount}
                                </div>
                              )}
                            </FormGroup>
                          </Col>









                          <Col xs="5" sm="5" md="5" lg={3} className="pl-4 mt-3">
                            <Label className=" mt-1">
                              {this.props.t("Interest Payment frequency Allowed")}
                            </Label>

                          </Col>
                          <Col xs="3" sm="3" md="6" lg={3} className="pl-4">
                            <FormGroup className="position-relative">
                              <DropDown
                                classNamePrefix="react-select"
                                className="react-select"
                                // label={this.props.t("PO No")}
                                name="Allowed For"
                                isSearchable
                                // options={this.state.district}
                                placeholderText=""
                                Checkbox={false}
                                Action={e => {
                                  if (e) setFieldValue("AllowedFor", e.value)
                                }}
                                errors={errors.AllowedFor}
                              />
                            </FormGroup>
                          </Col>

                          <Col xs="6" sm="6" md="6" lg={6} className="pl-4" />







                          <Col xs="3" sm="3" md="3" lg={3} className="pl-4 mt-3">
                            <Label className=" mt-1">
                              {this.props.t("Allowed For")}
                            </Label>

                          </Col>
                          <Col xs="3" sm="3" md="6" lg={3} className="pl-4">
                            <FormGroup className="position-relative">
                              <DropDown
                                classNamePrefix="react-select"
                                className="react-select"
                                // label={this.props.t("PO No")}
                                name="Allowed For"
                                isSearchable
                                // options={this.state.district}
                                placeholderText=""
                                Checkbox={false}
                                Action={e => {
                                  if (e) setFieldValue("AllowedFor", e.value)
                                }}
                                errors={errors.AllowedFor}
                              />
                            </FormGroup>
                          </Col>



                          <Col xs="3" sm="3" md="3" lg={3} className="pl-4 mt-3">
                            <Label className=" mt-1">
                              {this.props.t("Rate Of Interest")}
                            </Label>
                          </Col>
                          <Col xs="3" sm="3" md="3" lg={3} className="pl-4">
                            <FormGroup className="position-relative mt-1">

                              <Field
                                name="RateOfInterest"
                                id="Name"
                                type="text"
                                className="form-control box-border"
                              />
                              {errors.RateOfInterest && (
                                <div className="invalid-feedback d-block">
                                  {errors.RateOfInterest}
                                </div>
                              )}
                            </FormGroup>
                          </Col>




                          <Col xs="3" sm="3" md="3" lg={3} className="pl-4">
                            <Label className=" mt-1">
                              {this.props.t("Foreclosure Interest")}
                            </Label>
                          </Col>
                          <Col xs="3" sm="3" md="3" lg={3} className="pl-4">
                            <FormGroup className="position-relative mt-1">
                              <Field
                                name="ForeclosureInterest"
                                id="Name"
                                type="text"
                                className="form-control box-border"
                              />
                              {errors.ForeclosureInterest && (
                                <div className="invalid-feedback d-block">
                                  {errors.ForeclosureInterest}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                          <Col xs="3" sm="3" md="3" lg={3} className="pl-4 mt-3">
                            <Label className=" mt-1">
                              {this.props.t("Interest Calculation")}
                            </Label>

                          </Col>
                          <Col xs="3" sm="3" md="6" lg={3} className="pl-4">
                            <FormGroup className="position-relative">
                              <DropDown
                                classNamePrefix="react-select"
                                className="react-select"
                                // label={this.props.t("PO No")}
                                name="InterestCalculation"
                                isSearchable
                                // options={this.state.district}
                                placeholderText=""
                                Checkbox={false}
                                Action={e => {
                                  if (e) setFieldValue("InterestCalculation", e.value)
                                }}
                                errors={errors.InterestCalculation}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs="4" sm="4" md="4" lg={4} className="pl-4">
                            <Label className=" mt-3">
                              {this.props.t("Interest Payment GL Account")}
                            </Label>

                          </Col>
                          <Col xs="5" sm="5" md="5" lg={5} className="pl-4">
                            <FormGroup className="position-relative">
                              <DropDown
                                classNamePrefix="react-select"
                                className="react-select"
                                label=""
                                name="InterestPaymentGLAccount"
                                isSearchable
                                // options={this.state.district}
                                placeholderText={""}
                                Checkbox={false}
                                Action={e => {
                                  if (e) setFieldValue("InterestPaymentGLAccount", e.value)
                                }}
                                errors={errors.InterestPaymentGLAccount}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs="3" sm="3" md="3" lg={3} className="pl-4" />
                          <Col xs="4" sm="4" md="4" lg={4} className="pl-4">
                            <Label className=" mt-3">
                              {this.props.t("Foreclosure Interest GL Account")}
                            </Label>

                          </Col>
                          <Col xs="5" sm="5" md="5" lg={5} className="pl-4">
                            <FormGroup className="position-relative">
                              <DropDown
                                classNamePrefix="react-select"
                                className="react-select"
                                label=""
                                name="ForeclosureInterestGLAccount"
                                isSearchable
                                // options={this.state.district}
                                placeholderText={""}
                                Checkbox={false}
                                Action={e => {
                                  if (e) setFieldValue("ForeclosureInterestGLAccount", e.value)
                                }}
                                errors={errors.ForeclosureInterestGLAccount}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs="3" sm="3" md="3" lg={3} className="pl-4" />
                        </Row>


                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField mt-1">
                              {this.props.t("Conditions to be followed")}
                            </Label>
                            <textarea
                              name="Eligibility"
                              id="ConditionsToBeFollowed"
                              type="textarea"
                              className="form-control"
                            />
                            {errors.ConditionsToBeFollowed && (
                              <div className="invalid-feedback d-block">
                                {errors.ConditionsToBeFollowed}
                              </div>
                            )}
                          </FormGroup>
                        </Col>




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
            </CardBody>
          </Card>
        </Container>
      </Fragment>
    )
  }
}



export default withTranslation()(AddProduct)
