import React, { Component, Fragment } from "react"
import {
  Row,
  Col,
  FormGroup,
  Button,
  Label,
  CardBody,
  Card,
  Container,
  CardTitle,
} from "reactstrap"
import DropDown from "../../common/DropDown"
import CustomSelectInput from "../../common/CustomSelectInput"
import { withTranslation } from "react-i18next"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { LoanonDepositValidationSchema } from "../../helpers/validations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form, Field } from "formik"
import ListPageHeader from "components/custom/ListPageHeader"

class LoanonDeposit extends Component {
  state = {
    startDate: new Date(),
    buttonAction: false,
    paymentModeList: [{ label: "1", value: "1" }],
    accountTypeList: [{ label: "1", value: "1" }],
    typeofDepositList: [{ label: "1", value: "1" }],
    data: ["12345", "123asd", "12sda5"],
    list: [],
  }
  componentDidMount() {
    this.getAllPaymentMode()
  }
  getAllPaymentMode() {
    this.setState({
      isLoading: false,
    })
    CallService(
      //.GetAll,
      MethodType.POST,
      false,
      "",
      "",
      this.getAllPaymentModeResponse
    )
  }
  getAllPaymentModeResponse = data => {
    if (data.result) {
      this.setState({
        isLoading: false,
        paymentModeList: data.result,
      })
    } else
      this.setState({
        isLoading: false,
      })
  }
  handleSubmit = values => {
    console.log(values)
    this.setState({
      buttonAction: true,
    })
    this.manageLoanonDeposit(values)
  }
  manageLoanonDeposit = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageLoanonDepositResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      // .Create,
      MethodType.PUT,
      false,
      values,
      "",
      this.manageLoanonDepositResponse
    )
  }
  manageLoanonDepositResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(this.props.t("Loan Details Added Successfully"))
    }
  }
  handleCancel = () => {
    toastr.success("", "cancel")
  }
  onTextChange = e => {
    var queryData = []
    if (e.target.value != "") {
      this.state.data.forEach(function (person) {
        if (person.toLowerCase().indexOf(e.target.value) != -1) {
          if (queryData.length < 10) {
            queryData.push(person)
          }
        }
      })
    }
    this.setState({ list: queryData })
  }

  render() {
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops">
          <Card className="m-2 p-4">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t(
                "Loan on Deposit"
              )}`}
              showSearch={false}
              showButton={false}
            />

            <Formik
              initialValues={{}}
              onSubmit={this.handleSubmit}
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={LoanonDepositValidationSchema}
            >
              {({ values, setFieldValue, errors }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <Card>
                    <CardBody className="mb-0 pb-0">
                      <Row className="p-3 border">
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                          <FormGroup className="position-relative mt-1">
                            <Label className="mt-1">
                              {this.props.t("Account Number")}
                            </Label>
                            <div>
                              <Field
                                maxLength="16"
                                type="text"
                                name="AccountNumber"
                                onChange={e => {
                                  this.onTextChange(e)
                                }}
                                className="form-control "
                                placeholder={this.props.t("Search") + "..."}
                              />
                              {this.state.list ? (
                                <ul
                                  class="position-absolute bg-white w-100 "
                                  style={{
                                    maxHeight: "200px",
                                    overflowY: "scroll",
                                    zIndex: 1,
                                  }}
                                >
                                  {this.state.list.map(value => {
                                    return (
                                      <li
                                        className="py-2"
                                        style={{ listStyle: "none" }}
                                        onClick={() => {
                                          setFieldValue("AccountNumber", value)
                                          this.setState({
                                            list: [],
                                          })
                                        }}
                                      >
                                        {value}
                                      </li>
                                    )
                                  })}
                                </ul>
                              ) : null}
                            </div>
                            {errors.AccountNumber && (
                              <div className="invalid-feedback d-block">
                                {errors.AccountNumber}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                          <FormGroup className="position-relative mt-1">
                            <Label className="mt-1">
                              {this.props.t("Member ID")}
                            </Label>

                            <Field
                              type="text"
                              name="MemberID"
                              onChange={e => {
                                setFieldValue("MemberID", e.target.value),
                                  this.onTextChange(e)
                              }}
                              className="form-control "
                              placeholder={this.props.t("Search") + "..."}
                            />
                            {errors.MemberID && (
                              <div className="invalid-feedback d-block">
                                {errors.MemberID}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-1">
                          <FormGroup className="position-relative mt-1">
                            <DropDown
                              classNamePrefix="react-select"
                              className="react-select filters"
                              label={this.props.t("Account Type")}
                              name="AccountType"
                              isSearchable
                              isDisabled={true}
                              options={this.state.accountTypeList}
                              placeholderText={""}
                              Checkbox={false}
                              Action={e => {
                                setFieldValue("AccountType", e.value)
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-1">
                          <FormGroup className="position-relative mt-1">
                            <DropDown
                              classNamePrefix="react-select"
                              className="react-select filters"
                              label={this.props.t("Type of Deposit")}
                              name="TypeofDeposit"
                              isSearchable
                              isDisabled={true}
                              options={this.state.typeofDepositList}
                              placeholderText={""}
                              Checkbox={false}
                              Action={e => {
                                setFieldValue("TypeofDeposit", e.value)
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                          <FormGroup className="position-relative mt-1">
                            <Label className=" mt-1">
                              {this.props.t("Deposit Amount")}
                            </Label>

                            <Field
                              name="DepositAmount"
                              disabled={true}
                              className="form-control box-border "
                            />
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative mt-1">
                            <Label className=" mt-1">
                              {this.props.t("Tenure of Deposit")}{" "}
                              {this.props.t("(Months)")}
                            </Label>

                            <Field
                              name="TenureofDeposit"
                              disabled={true}
                              className="form-control box-border "
                            />
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                          <FormGroup className="position-relative mt-1">
                            <Label className=" mt-1">
                              {this.props.t("Interest Rate")}
                            </Label>

                            <Field
                              name="InterestRate"
                              disabled={true}
                              className="form-control box-border "
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="p-3 border mt-2">
                        <Col xs="12" sm="12" md="12" lg={12} className="pl-4">
                          <CardTitle>
                            {this.props.t("Loan Particulars")}
                          </CardTitle>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-2">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField mt-1">
                              {this.props.t("Applied Date")}
                            </Label>
                            <DatePicker
                              components={{ Input: CustomSelectInput }}
                              className="form-control"
                              selected={this.state.startDateTime}
                              isClearable={true}
                              onChange={date => {
                                setFieldValue("AppliedDate", date)
                              }}
                              placeholderText={this.props.t("Select Date")}
                              dateFormat="dd/MM/yyyy"
                            />
                            {errors.AppliedDate && (
                              <div className="invalid-feedback d-block">
                                {errors.AppliedDate}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-2">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField mt-1">
                              {this.props.t("Requested Amount")}
                            </Label>
                            <Field
                              name="RequestedAmount"
                              type="number"
                              className="form-control box-border"
                            />
                            {errors.RequestedAmount && (
                              <div className="invalid-feedback d-block">
                                {errors.RequestedAmount}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative mt-1">
                            <Label className="mt-1">
                              {this.props.t("Eligible Amount")}
                            </Label>
                            <Field
                              name="EligibleAmount"
                              disabled={true}
                              type="number"
                              className="form-control box-border"
                            />
                          </FormGroup>
                        </Col>

                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField mt-1">
                              {this.props.t("Tenure")}{" "}
                              {this.props.t("(Months)")}
                            </Label>
                            <Field
                              maxLength="100"
                              name="Tenure"
                              className="form-control box-border"
                            />
                            {errors.Tenure && (
                              <div className="invalid-feedback d-block">
                                {errors.Tenure}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField mt-1">
                              {this.props.t("Reason")}
                            </Label>

                            <Field
                              name="Reason"
                              maxLength="300"
                              component="textarea"
                              className="form-control box-border"
                            />
                            {errors.Reason && (
                              <div className="invalid-feedback d-block">
                                {errors.Reason}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField mt-1">
                              {this.props.t("Interest Rate")}
                            </Label>

                            <Field
                              name="LoanInterestRate"
                              type="number"
                              className="form-control box-border"
                            />
                            {errors.LoanInterestRate && (
                              <div className="invalid-feedback d-block">
                                {errors.LoanInterestRate}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField mt-1">
                              {this.props.t("Sanction Amount")}
                            </Label>

                            <Field
                              name="SanctionAmount"
                              type="number"
                              className="form-control box-border"
                            />
                            {errors.SanctionAmount && (
                              <div className="invalid-feedback d-block">
                                {errors.SanctionAmount}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="p-3 border mt-2">
                        <Col xs="12" sm="12" md="12" lg={12} className="pl-4">
                          <CardTitle>
                            {this.props.t("Payment Details")}
                          </CardTitle>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-3">
                          <FormGroup className="position-relative mt-1">
                            <DropDown
                              classNamePrefix="react-select"
                              className="react-select "
                              label={this.props.t("Payment Mode")}
                              name="PaymentMode"
                              isSearchable
                              options={this.state.paymentModeList}
                              placeholderText={""}
                              Checkbox={false}
                              Action={e => {
                                setFieldValue("PaymentMode", e.value)
                              }}
                              errors={errors.PaymentMode}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-3">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField">
                              {this.props.t("Date")}
                            </Label>
                            <DatePicker
                              components={{ Input: CustomSelectInput }}
                              className="form-control"
                              selected={this.state.startDateTime}
                              isClearable={true}
                              onChange={date => {
                                setFieldValue("Date", date)
                              }}
                              placeholderText={this.props.t("Select Date")}
                              dateFormat="dd/MM/yyyy"
                            />
                            {errors.Date && (
                              <div className="invalid-feedback d-block">
                                {errors.Date}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="px-3 mt-2">
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
          </Card>
        </Container>
      </Fragment>
    )
  }
}

export default withTranslation()(LoanonDeposit)
