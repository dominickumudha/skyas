import React, { Component, Fragment } from "react"
import {
  Card,
  CardBody,
  Container,
  Col,
  CustomInput,
  Row,
  Button,
  Label,
  FormGroup,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "reactstrap"
import { CallService } from "../../helpers/servicecall"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import DropDown from "../../common/DropDown"
import { DepositInterestDisbursementValidation } from "../../helpers/validations"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { Formik, Form, Field } from "formik"
import { withTranslation } from "react-i18next"
import { values } from "lodash"
import CustomSelectInput from "../../common/CustomSelectInput"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

class depositDisbursement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageSizeOptions: [10, 50, 100],
      pageLimit: 10,
      totalCount: 0,
      Description: "",
      keyField: "_id",
      buttonAction: false,
      update: false,

      ListRequestModel: {
        searchString: "",
        sortCondition: null,
        pageNumber: 1,
        pageLimit: 10,
      },
      paymentMode: [
        { label: "CreditCard", value: "Credit Card" },
        { label: "DebitCard", value: "Debit Card" },
        { label: "NetBanking", value: "Net Banking" },
      ],
      disbursementsInterest: {
        acNo: "",
        type: "",
        date: "",
        ROI: "",
        amt: "",
        maturityDate: "",
        maturityAmt: "",
        interestAmt: "",
        paymentFreq: "",
      },
      data: [
        {
          date: "25-05-21",
          InterestPaid: "69000",
          total: "69000",
          Amount: "10000",
        },
      ],
      columns: [
        {
          name: this.props.t("Date"),
          selector: "date",
          sortable: false,
          cell: row => <span>{row.date ? row.date : ""}</span>,
        },
        {
          name: this.props.t("Interest Paid"),
          selector: "InterestPaid",
          sortable: false,
          cell: row => <span>{row.InterestPaid ? row.InterestPaid : ""}</span>,
        },
        {
          name: this.props.t("Interest Paid(total)"),
          selector: "total",
          sortable: false,
          cell: row => <span>{row.total ? row.total : ""}</span>,
        },
        {
          name: this.props.t("Amount"),
          selector: "Amount",
          sortable: false,
          cell: row => <span>{row.Amount ? row.Amount : ""}</span>,
        },
      ],
    }
  }
  handleSubmit = values => {}
  render() {
    const initialValues = this.state.disbursementsInterest
    return (
      <Fragment>
        <Container className="justify-content-center form-tops">
          <Card className=" m-2 p-4">
            <CardBody className="mt-2">
              <ListPageHeader
                heading={`${this.props.t("Home")}.${this.props.t(
                  "Deposit Interest Disbursement"
                )}`}
                showSearch={false}
                showButton={false}
                //  match={this.props.match}
                //  onTextChange={this.searchQueryChanged}
                // buttonClick={this.addBtnClick}
                //  searchValue={this.state.listRequestModel.searchString}
              />
              <Formik
                initialValues={initialValues}
                onSubmit={this.handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
                validationSchema={DepositInterestDisbursementValidation}
              >
                {({ values, setFieldValue, errors }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <Row className="px-3">
                      <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                        <FormGroup className="position-relative">
                          <Label className="mt-1">
                            {this.props.t("Deposit Account Number")}
                          </Label>
                          <Field
                            name="DepositAccountNumber"
                            id="first"
                            type="search"
                            className="form-control box-border"
                          />
                          {errors.DepositAccountNumber && (
                            <div className="invalid-feedback d-block ">
                              {errors.DepositAccountNumber}
                            </div>
                          )}
                        </FormGroup>
                      </Col>

                      <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                        <FormGroup className="position-relative">
                          <Label className="mt-1">
                            {this.props.t("Member ID")}
                          </Label>
                          <Field
                            name="memberID"
                            id="first"
                            type="search"
                            className="form-control box-border"
                          />
                          {errors.memberID && (
                            <div className="invalid-feedback d-block ">
                              {errors.memberID}
                            </div>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row className="px-3">
                      <Col xs="4" sm="4" md="4" lg={4} className="pr-4">
                        <FormGroup className="position-relative">
                          <Label className="requiredField mt-1">
                            {this.props.t("Account Number")}
                          </Label>
                          <Field
                            name="acNo"
                            id="number"
                            type="number"
                            className="form-control box-border"
                          />
                          {errors.acNo && (
                            <div className="invalid-feedback d-block ">
                              {errors.acNo}
                            </div>
                          )}
                        </FormGroup>
                      </Col>
                      <Col xs="4" sm="4" md="4" lg={4} className="pr-4">
                        <FormGroup className="position-relative">
                          <Label className="requiredField mt-1">
                            {this.props.t("Type")}
                          </Label>
                          <Field
                            name="type"
                            id="first"
                            type="text"
                            className="form-control box-border"
                          />
                          {errors.type && (
                            <div className="invalid-feedback d-block ">
                              {errors.type}
                            </div>
                          )}
                        </FormGroup>
                      </Col>
                      <Col xs="4" sm="4" md="4" lg={4} className="pr-4">
                        <FormGroup className="position-relative">
                          <Label className="requiredField mt-1">
                            {this.props.t("Date")}
                          </Label>
                          <DatePicker
                            selectsStart
                            components={{ Input: CustomSelectInput }}
                            className="form-control"
                            selected={values.Date ? new Date(values.Date) : ""}
                            isClearable={true}
                            onChange={date => {
                              setFieldValue("Date", date)
                            }}
                            placeholderText={this.props.t("Select Date")}
                            dateFormat="dd/MM/yyyy"
                          />
                          {errors.Date && (
                            <div className="invalid-feedback d-block ">
                              {errors.Date}
                            </div>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="px-3">
                      <Col xs="4" sm="4" md="4" lg={4} className="pr-4">
                        <FormGroup className="position-relative">
                          <Label className="requiredField mt-1">
                            {this.props.t("Amount")}
                          </Label>
                          <Field
                            name="amt"
                            id="first"
                            type="text"
                            className="form-control box-border"
                          />
                          {errors.amt && (
                            <div className="invalid-feedback d-block ">
                              {errors.amt}
                            </div>
                          )}
                        </FormGroup>
                      </Col>
                      <Col xs="4" sm="4" md="4" lg={4} className="pr-4">
                        <FormGroup className="position-relative">
                          <Label className="requiredField mt-1">
                            {this.props.t("ROI")}
                          </Label>
                          <Field
                            name="ROI"
                            id="first"
                            type="text"
                            className="form-control box-border"
                          />
                          {errors.ROI && (
                            <div className="invalid-feedback d-block ">
                              {errors.ROI}
                            </div>
                          )}
                        </FormGroup>
                      </Col>
                      <Col xs="4" sm="4" md="4" lg={4} className="pr-4">
                        <FormGroup className="position-relative">
                          <Label className="requiredField mt-1">
                            {this.props.t("Maturity Date")}
                          </Label>
                          <DatePicker
                            selectsStart
                            components={{ Input: CustomSelectInput }}
                            className="form-control"
                            selected={
                              values.maturityDate
                                ? new Date(values.maturityDate)
                                : ""
                            }
                            isClearable={true}
                            onChange={date => {
                              setFieldValue("maturityDate", date)
                            }}
                            placeholderText={this.props.t("Select Date")}
                            dateFormat="dd/MM/yyyy"
                          />
                          {errors.maturityDate && (
                            <div className="invalid-feedback d-block ">
                              {errors.maturityDate}
                            </div>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="px-3">
                      <Col xs="4" sm="4" md="4" lg={4} className="pr-4">
                        <FormGroup className="position-relative">
                          <Label className="requiredField mt-1">
                            {this.props.t("Maturity Amount")}
                          </Label>
                          <Field
                            name="maturityAmt"
                            id="first"
                            type="number"
                            className="form-control box-border"
                          />
                          {errors.maturityAmt && (
                            <div className="invalid-feedback d-block ">
                              {errors.maturityAmt}
                            </div>
                          )}
                        </FormGroup>
                      </Col>
                      <Col xs="4" sm="4" md="4" lg={4} className="pr-4">
                        <FormGroup className="position-relative">
                          <Label className="requiredField mt-1">
                            {this.props.t("Interest Amount")}
                          </Label>
                          <Field
                            name="interestAmt"
                            id="first"
                            type="number"
                            className="form-control box-border"
                          />
                          {errors.interestAmt && (
                            <div className="invalid-feedback d-block ">
                              {errors.interestAmt}
                            </div>
                          )}
                        </FormGroup>
                      </Col>
                      <Col xs="4" sm="4" md="4" lg={4} className="pr-4">
                        <FormGroup className="position-relative">
                          <Label className="requiredField mt-1">
                            {this.props.t("Payment Frequency")}
                          </Label>
                          <Field
                            name="paymentFreq"
                            id="first"
                            type="text"
                            className="form-control box-border"
                          />
                          {errors.paymentFreq && (
                            <div className="invalid-feedback d-block ">
                              {errors.paymentFreq}
                            </div>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="px-3">
                      <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                        <FormGroup className="position-relative">
                          <Label className="requiredField mt-1">
                            {this.props.t("Interest to be paid")}
                          </Label>
                          <Field
                            name="interestPaid"
                            id="number"
                            type="number"
                            className="form-control box-border"
                          />
                          {errors.interestPaid && (
                            <div className="invalid-feedback d-block ">
                              {errors.interestPaid}
                            </div>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="px-3">
                      <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                        <FormGroup className="position-relative mt-1">
                          <DropDown
                            classNamePrefix="react-select"
                            className="react-select"
                            label={this.props.t("Payment Mode")}
                            name="paymentMode"
                            isSearchable
                            options={this.state.paymentMode}
                            placeholderText={""}
                            Checkbox={false}
                            Action={e => {
                              if (e) setFieldValue("paymentMode", e.value)
                            }}
                            errors={errors.paymentMode}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <ListPage
                      className={"cursor-pointer"}
                      columns={this.state.columns}
                      data={this.state.data}
                      keyField={this.state.keyField}
                      totalCount={this.state.totalCount}
                      rowsPerPageOnChange={this.handlePerRowsChange}
                      rowClicked={this.handleRowClicked}
                      pageChange={this.handlePageChange}
                      overFlowXRemoval={true}
                      onSort={this.handleSort}
                      isDataLoading={this.state.isLoading}
                    />
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <FormGroup className="float-right ">
                        <Button
                          className="btn singleEvent  mt-2 mb-3"
                          color="primary"
                          type="submit"
                        >
                          {this.props.t("Save")}
                        </Button>
                        <Button
                          className="btn singleEvent  mt-2 mb-3 ml-4"
                          color="danger"
                          onClick={() => this.toggleManageModal()}
                        >
                          {this.props.t("Cancel")}
                        </Button>
                      </FormGroup>
                    </Col>
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
export default withTranslation()(depositDisbursement)
