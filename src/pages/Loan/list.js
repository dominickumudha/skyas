import React, { Component, Fragment } from "react"
import {
  Card,
  CardBody,
  Row,
  Col,
  FormGroup,
  Button,
  Container,
  CardTitle,
  Table,
  Label,
} from "reactstrap"
import { Tabs, Tab } from "react-bootstrap"
import { Formik, Form, Field } from "formik"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { withTranslation } from "react-i18next"
import DropDown from "../../common/DropDown"
import { LoanValidation } from "../../helpers/validations"
import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import CustomSelectInput from "../../common/CustomSelectInput"
import ListPageHeader from "components/custom/ListPageHeader"

class Loan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      manageModal: false,
      deleteModal: false,
      isLoading: true,
      buttonAction: false,
      pageSizeOptions: [10, 50, 100],
      pageLimit: 10,
      totalCount: 0,

      listRequestModel: {
        searchString: "",
        sortCondition: null,
        pageNumber: 1,
        pageLimit: 10,
      },
      Division: [{ label: "1", value: "1" }],
      SubDivision: [{ label: "1", value: "1" }],
      Year: [{ label: "1", value: "1" }],
      Month: [{ label: "1", value: "1" }],
      loan: {
        Division: "",
        SubDivision: "",
        Year: "",
        Month: "",
      },
      LoanList: [],

      keyField: "_id",
    }
  }
  componentDidMount() {
    this.getAllLoan()
  }
  getAllLoan() {
    this.setState({
      isLoading: false,
    })
    const { listRequestModel } = this.state
    CallService(
      //.GetAll,
      MethodType.POST,
      false,
      listRequestModel,
      "",
      this.getAllLoanResponse
    )
  }
  getAllLoanResponse = data => {
    if (data.pagination && data.result) {
      this.setState({
        isLoading: false,
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        LoanList: data.result,
        totalCount: data.pagination.totalCount,
      })
    } else
      this.setState({
        isLoading: false,
      })
  }
  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageLoan(values)
  }
  manageLoan = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageLoanResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //values._id ? .Update + values._id : .Create,
      values._id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      this.manageLoanResponse
    )
  }
  manageLoanResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success("", this.props.t("Loan Added Successfully"))
      this.getAllLoan()
    }
  }
  handleCancel = () => {
    toastr.success("", this.props.t("Cancel"))
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
              heading={`${this.props.t("Home")}.${this.props.t("Loan")}`}
              showSearch={false}
              showButton={false}
            />
            <Formik
              initialValues={this.state.loan}
              onSubmit={this.handleSubmit}
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={LoanValidation}
            >
              {({ setFieldValue, values, errors }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <Card className="border-0 rounded shadow mb-0 ">
                    <CardBody className="pb-0">
                      <Row>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField mt-1">
                              {this.props.t("Member")}
                            </Label>
                            <div>
                              <Field
                                maxLength="16"
                                type="text"
                                name="Member"
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
                                          setFieldValue("Member", value)
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
                            {errors.Member && (
                              <div className="invalid-feedback d-block">
                                {errors.Member}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col
                          xs="6"
                          sm="6"
                          md="6"
                          lg="6"
                          xl="6"
                          className="pl-4 "
                        >
                          <FormGroup className="position-relative mt-1">
                            <DropDown
                              classNamePrefix="react-select"
                              className="react-select requiredField"
                              label={this.props.t("Product")}
                              name="Product"
                              isSearchable
                              options={this.state.Product}
                              placeholderText={""}
                              Checkbox={false}
                              value={{
                                label: values.Product,
                                value: values.Product,
                              }}
                              Action={e => {
                                setFieldValue("Product", e.value)
                              }}
                              errors={errors.Product}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className=" pl-4 ">
                        <Col xs="12" sm="12" md="12" lg={12} className="border">
                          <Tabs defaultActiveKey="Applicant" transition={false}>
                            <Tab
                              eventKey="Applicant"
                              title={this.props.t("Applicant")}
                            >
                              <Row>
                                <Col
                                  xs="6"
                                  sm="6"
                                  md="6"
                                  lg={6}
                                  className="pl-4"
                                >
                                  <FormGroup className="position-relative mt-1">
                                    <Label className="requiredField mt-1">
                                      {this.props.t("Net Pay")}
                                    </Label>
                                    <Field
                                      name="NetPay"
                                      type="number"
                                      className="form-control box-border"
                                    />
                                    {errors.NetPay && (
                                      <div className="invalid-feedback d-block">
                                        {errors.NetPay}
                                      </div>
                                    )}
                                  </FormGroup>
                                </Col>
                                <Col
                                  xs="6"
                                  sm="6"
                                  md="6"
                                  lg={6}
                                  className="pl-4"
                                >
                                  <FormGroup className="position-relative mt-1">
                                    <Label className="requiredField mt-1">
                                      {this.props.t("DRO")}
                                    </Label>
                                    <Field
                                      name="DRO"
                                      className="form-control box-border"
                                    />
                                    {errors.DRO && (
                                      <div className="invalid-feedback d-block">
                                        {errors.DRO}
                                      </div>
                                    )}
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col
                                  xs="12"
                                  sm="12"
                                  md="12"
                                  lg={12}
                                  className="pl-4"
                                >
                                  <FormGroup className="position-relative mt-1">
                                    <Label className="requiredField mt-1">
                                      {this.props.t("Ledger")}
                                    </Label>
                                    <Table bordered className="text-center">
                                      <thead>
                                        <tr className="m-0 p-0">
                                          <th>
                                            {this.props.t("Account Number")}
                                          </th>
                                          <th>{this.props.t("Type")}</th>
                                          <th>{this.props.t("Date")}</th>
                                          <th>{this.props.t("Amount")}</th>
                                          <th>{this.props.t("Outstanding")}</th>
                                          <th>{this.props.t("Interest")}</th>
                                          <th>{this.props.t("Overdue")}</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                        </tr>
                                      </tbody>
                                    </Table>
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col
                                  xs="12"
                                  sm="12"
                                  md="12"
                                  lg={12}
                                  className="pl-4"
                                >
                                  <CardTitle>
                                    {this.props.t("Loan Particulars")}
                                  </CardTitle>
                                </Col>
                                <Col
                                  xs="6"
                                  sm="6"
                                  md="6"
                                  lg={6}
                                  className="pl-4 mt-2"
                                >
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
                                      placeholderText={this.props.t(
                                        "Select Date"
                                      )}
                                      dateFormat="dd/MM/yyyy"
                                    />
                                    {errors.AppliedDate && (
                                      <div className="invalid-feedback d-block">
                                        {errors.AppliedDate}
                                      </div>
                                    )}
                                  </FormGroup>
                                </Col>
                                <Col
                                  xs="6"
                                  sm="6"
                                  md="6"
                                  lg={6}
                                  className="pl-4 mt-2"
                                >
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

                                <Col
                                  xs="6"
                                  sm="6"
                                  md="6"
                                  lg={6}
                                  className="pl-4"
                                >
                                  <FormGroup className="position-relative mt-1">
                                    <Label className="requiredField mt-1">
                                      {this.props.t("Eligible Amount")}
                                    </Label>
                                    <Field
                                      name="EligibleAmount"
                                      disabled={true}
                                      type="number"
                                      className="form-control box-border"
                                    />
                                    {errors.EligibleAmount && (
                                      <div className="invalid-feedback d-block">
                                        {errors.EligibleAmount}
                                      </div>
                                    )}
                                  </FormGroup>
                                </Col>

                                <Col
                                  xs="6"
                                  sm="6"
                                  md="6"
                                  lg={6}
                                  className="pl-4"
                                >
                                  <FormGroup className="position-relative mt-1">
                                    <Label className="requiredField mt-1">
                                      {this.props.t("Tenure")}
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

                                <Col
                                  xs="6"
                                  sm="6"
                                  md="6"
                                  lg={6}
                                  className="pl-4 "
                                >
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
                                <Col
                                  xs="6"
                                  sm="6"
                                  md="6"
                                  lg={6}
                                  className="pl-4 "
                                >
                                  <FormGroup className="position-relative mt-1">
                                    <Label className=" mt-1">
                                      {this.props.t("Eligible")}
                                    </Label>

                                    <Field
                                      name="Eligible"
                                      className="form-control box-border"
                                    />
                                  </FormGroup>
                                </Col>

                                <Col
                                  xs="6"
                                  sm="6"
                                  md="6"
                                  lg={6}
                                  className="pl-4 "
                                >
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
                              <Row>
                                <Col
                                  xs="12"
                                  sm="12"
                                  md="12"
                                  lg={12}
                                  className="pl-4"
                                >
                                  <CardTitle>
                                    {this.props.t("Repayment Schedule")}
                                  </CardTitle>
                                </Col>
                                <Col></Col>
                                <Col xs="8" sm="8" md="8" lg={8}>
                                  {" "}
                                  <Table bordered className="text-center">
                                    <thead>
                                      <tr>
                                        <th rowspan="2">
                                          {this.props.t("Months")}
                                        </th>
                                        <th colSpan="2">
                                          {this.props.t("Monthly Payment")}
                                        </th>
                                      </tr>
                                      <tr>
                                        <th>
                                          {this.props.t("Principal Amount")}
                                        </th>
                                        <th>
                                          {this.props.t("Interest Amount")}
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                      </tr>
                                    </tbody>
                                    <tfoot>
                                      <tr className="m-0 p-0">
                                        <th>{this.props.t("Total")}</th>
                                        <th></th>
                                        <th></th>
                                      </tr>
                                    </tfoot>
                                  </Table>
                                </Col>
                                <Col></Col>
                              </Row>
                              <Row>
                                <Col
                                  xs="12"
                                  sm="12"
                                  md="12"
                                  lg={12}
                                  className="pl-4"
                                >
                                  <CardTitle>
                                    {this.props.t("Payment Details")}
                                  </CardTitle>
                                </Col>
                                <Col
                                  xs="6"
                                  sm="6"
                                  md="6"
                                  lg={6}
                                  className="pl-4 mt-3"
                                >
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
                                <Col
                                  xs="6"
                                  sm="6"
                                  md="6"
                                  lg={6}
                                  className="pl-4 mt-3"
                                >
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
                                      placeholderText={this.props.t(
                                        "Select Date"
                                      )}
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
                            </Tab>
                            <Tab
                              eventKey="Surety"
                              title={this.props.t("Surety")}
                            ></Tab>
                          </Tabs>
                        </Col>
                      </Row>
                      <Row className="px-3 my-2 py-3">
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

export default withTranslation()(Loan)
