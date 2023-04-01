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
  Modal,
  ModalHeader,
  ModalFooter,
} from "reactstrap"
import {
  voucherEntryValidation,
  voucherModalValidation,
} from "../../helpers/validations"
import { withTranslation } from "react-i18next"
// import { voucherEntry, level, areatype } from "../../constants/config";
import CustomSelectInput from "../../common/CustomSelectInput"
import { CallService } from "../../helpers/servicecall"
import { INVALID_CHARS } from "../../helpers/utils"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { Formik, Form, Field } from "formik"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import ListPage from "../../components/custom/ListPage"
import DropDown from "../../common/DropDown"
import ListPageHeader from "components/custom/ListPageHeader"

class VoucherEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      voucherEntry: {
        Name: "",
        FiscalYear: "",
        BudgetPeriod: "",
        IncomeAccounts: [{ IncomeAccounts: "" }],
        ExpenseAccounts: [{ ExpenseAccounts: "" }],
      },
      modelValues: {
        Description: "",
        Type: "",
        MemberNumber: "",
        AccountNumber: "",
        Payment: "",
        Reciepts: "",
      },
      PaymentMode: [
        { label: "a", value: "a" },
        { label: "b", value: "b" },
        { label: "c", value: "c" },
      ],
      VoucherEntryList: [{}, {}],
      columns: [
        {
          name: this.props.t("Serial No"),
          sortable: false,
          cell: (row, index) => index + 1,
        },
        {
          name: this.props.t("Description"),
          selector: "Description",
          sortable: false,
          cell: row => <span>{row.Description ? row.Description : ""}</span>,
        },
        {
          name: this.props.t("Type"),
          selector: "Type",
          sortable: false,
          cell: row => <span>{row.Type ? row.Type : ""}</span>,
        },
        {
          name: this.props.t("Member Number"),
          selector: "MemberNo",
          sortable: false,
          cell: row => <span>{row.MemberNo ? row.MemberNo : ""}</span>,
        },
        {
          name: this.props.t("Account Number"),
          selector: "AccountNumber",
          sortable: false,
          cell: row => (
            <span>{row.AccountNumber ? row.AccountNumber : ""}</span>
          ),
        },
        {
          name: this.props.t("Payment"),
          selector: "Payment",
          sortable: false,
          cell: row => <span>{row.Payment ? row.Payment : ""}</span>,
        },
        {
          name: this.props.t("Recipts"),
          selector: "Recipts",
          sortable: false,
          cell: row => <span>{row.Recipts ? row.Recipts : ""}</span>,
        },
      ],
    }
  }

  componentDidMount() {}
  handleRowClicked = row => {
    if (row) {
      this.setState({
        modelValues: row,
        manageModal: !this.state.manageModal,
      })
    }
  }
  handlePageChange = async page => {
    this.setState(
      {
        pageNumber: page,
        listRequestModel: {
          ...this.state.listRequestModel,
          pageNumber: page,
        },
      },
      function () {
        this.getAllVoucher()
      }
    )
  }
  handlePerRowsChange = async perPage => {
    this.setState(
      {
        pageLimit: perPage,
        pageNumber: 1,
        listRequestModel: {
          ...this.state.listRequestModel,
          pageLimit: perPage,
          pageNumber: 1,
        },
      },
      async function () {
        this.getAllVoucher()
      }
    )
  }
  handleSubmit = values => {
    console.log(values)
    this.manageVoucherEntry()
  }
  manageVoucherEntry = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageVoucherEntryResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //values._id ? .Update + values._id : .Create,
      values._id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      this.manageVoucherEntryResponse
    )
  }
  manageVoucherEntryResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(
        "",
        this.state.voucherEntry._id
          ? this.props.t("Voucher Entry Edited Successfully")
          : this.props.t("Voucher Entry Added Successfully")
      )
    }
  }
  handleSubmitModal = values => {
    console.log(values)
    this.manageModalValues()
  }
  manageModalValues = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageModalValuesResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //values._id ? .Update + values._id : .Create,
      values._id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      this.manageModalValuesResponse
    )
  }
  manageModalValuesResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      this.toggleManageModal()
      toastr.success(
        "",
        this.state.voucherEntry._id
          ? this.props.t("Voucher Entry Edited Successfully")
          : this.props.t("Voucher Entry Added Successfully")
      )
    }
  }
  handleAddBtnClick = () => {
    this.setState({
      modelValues: {
        Description: "",
        Type: "",
        MemberNumber: "",
        AccountNumber: "",
        Payment: "",
        Reciepts: "",
      },
    })
    this.toggleManageModal()
  }
  toggleManageModal = () => {
    this.setState({
      manageModal: !this.state.manageModal,
    })
  }
  render() {
    return (
      <Fragment>
        <Container fluid className="page-content">
          <Row className="mb-4">
            <Col xxs="12">
              <Card>
                <CardBody>
                  <ListPageHeader
                    heading={`${this.props.t("Home")}.${this.props.t(
                      "Voucher Entry"
                    )}`}
                    showSearch={false}
                    showButton={false}
                  />
                  <Formik
                    initialValues={this.state.voucherEntry}
                    onSubmit={this.handleSubmit}
                    validateOnBlur={false}
                    validateOnChange={false}
                    validationSchema={voucherEntryValidation}
                  >
                    {({ setFieldValue, values, errors }) => (
                      <Form className="av-tooltip tooltip-label-bottom p-3">
                        <Row className="mt-2 px-4">
                          <Col xs="6" sm="6" md="6" lg={6}>
                            <Row>
                              <Col xs="2" sm="2" md="2" lg={2}>
                                <Label className="requiredField pt-1 mt-1">
                                  {this.props.t("Date")}
                                </Label>
                              </Col>
                              <Col xs="4" sm="4" md="4" lg={4}>
                                <DatePicker
                                  selectsStart
                                  components={{ Input: CustomSelectInput }}
                                  className="form-control "
                                  selected={
                                    values.Date ? new Date(values.Date) : ""
                                  }
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
                              </Col>
                            </Row>
                          </Col>
                          <Col xs="5" sm="5" md="5" lg={5}>
                            <FormGroup className="float-sm-right  mt-1">
                              <Button
                                type="button"
                                onClick={() => {
                                  this.handleAddBtnClick()
                                }}
                                color="primary"
                              >
                                {this.props.t("Add")}
                              </Button>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Fragment>
                          <ListPage
                            columns={this.state.columns}
                            data={this.state.VoucherEntryList}
                            keyField={this.state.keyField}
                            totalCount={this.state.totalCount}
                            rowClicked={this.handleRowClicked}
                            rowsPerPageOnChange={this.handlePerRowsChange}
                            pageChange={this.handlePageChange}
                            isDataLoading={this.state.isLoading}
                            overFlowXRemoval={true}
                          />
                        </Fragment>
                        <Row className="mt-2 px-4">
                          <Col xs="6" sm="6" md="6" lg="6" xl="6">
                            <FormGroup className="position-relative mt-1">
                              <DropDown
                                classNamePrefix="react-select"
                                className="react-select "
                                label={this.props.t("Payment Mode")}
                                name="PaymentMode"
                                isSearchable
                                options={this.state.PaymentMode}
                                placeholderText={""}
                                Checkbox={false}
                                value={{
                                  label: values.PaymentMode,
                                  value: values.PaymentMode,
                                }}
                                Action={e => {
                                  setFieldValue("PaymentMode", e.value)
                                }}
                                errors={errors.PaymentMode}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs="6" sm="6" md="6" lg={6}>
                            <FormGroup className="position-relative mt-1">
                              <Label className="mt-1">
                                {this.props.t("Cheque Date")}
                              </Label>
                              <DatePicker
                                selectsStart
                                components={{ Input: CustomSelectInput }}
                                className="form-control "
                                selected={
                                  values.ChequeDate
                                    ? new Date(values.ChequeDate)
                                    : ""
                                }
                                isClearable={true}
                                onChange={date => {
                                  setFieldValue("ChequeDate", date)
                                }}
                                placeholderText={this.props.t("Select Date")}
                                dateFormat="dd/MM/yyyy"
                              />
                              {errors.ChequeDate && (
                                <div className="invalid-feedback d-block">
                                  {errors.ChequeDate}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="px-4">
                          <Col xs="6" sm="6" md="6" lg="6" xl="6">
                            <FormGroup className="position-relative mt-1">
                              <Label className="requiredField mt-1">
                                {this.props.t("Bank Name")}
                              </Label>
                              <Field
                                maxLength="150"
                                className="form-control box-border"
                                name="BankName"
                              />
                              {errors.BankName && (
                                <div className="invalid-feedback d-block">
                                  {errors.BankName}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                          <Col xs="6" sm="6" md="6" lg="6" xl="6">
                            <FormGroup className="position-relative mt-1">
                              <Label className=" mt-1">
                                {this.props.t("Remarks")}
                              </Label>
                              <Field
                                className="form-control box-border"
                                name="Remarks"
                              />
                              {errors.Remarks && (
                                <div className="invalid-feedback d-block">
                                  {errors.Remarks}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="mt-2 px-4">
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
                                    "/tentative-budgeting"
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
          <Modal
            isOpen={this.state.manageModal}
            toggle={this.toggleManageModal}
          >
            <ModalHeader toggle={this.toggleManageModal}>
              {this.state.glAccount && this.state.glAccount._id
                ? this.props.t("Edit")
                : this.props.t("Add")}
            </ModalHeader>
            <Fragment>
              <Formik
                initialValues={this.state.modelValues}
                onSubmit={this.handleSubmitModal}
                validateOnBlur={false}
                validateOnChange={false}
                validationSchema={voucherModalValidation}
              >
                {({ setFieldValue, values, errors }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <Card className="border-0 rounded shadow mb-0 ">
                      <CardBody className="pb-0">
                        <Row>
                          {" "}
                          <Col xs="12" sm="12" md="12" lg="12" xl="12">
                            <FormGroup className="position-relative mt-1">
                              <Label>{this.props.t("Description")}</Label>

                              <Field
                                name="description"
                                id="description"
                                component="textarea"
                                type="text"
                                className="form-control box-border"
                              />
                            </FormGroup>
                          </Col>
                          <Col xs="12" sm="12" md="12" lg="12" xl="12">
                            <FormGroup className="position-relative mt-1">
                              <Label className="requiredField ">
                                {this.props.t("Type")}
                              </Label>

                              <Field
                                name="Type"
                                type="text"
                                className="form-control box-border"
                              />
                              {errors.Type && (
                                <div className="invalid-feedback d-block">
                                  {errors.Type}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                          <Col xs="12" sm="12" md="12" lg="12" xl="12">
                            <FormGroup className="position-relative mt-1">
                              <Label className="requiredField ">
                                {this.props.t("Member Number")}
                              </Label>

                              <Field
                                name="MemberNumber"
                                id="MemberNumber"
                                type="text"
                                className="form-control box-border"
                              />
                              {errors.MemberNumber && (
                                <div className="invalid-feedback d-block">
                                  {errors.MemberNumber}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                          <Col xs="12" sm="12" md="12" lg="12" xl="12">
                            <FormGroup className="position-relative mt-1">
                              <Label className="requiredField ">
                                {this.props.t("Account Number")}
                              </Label>

                              <Field
                                name="AccountNumber"
                                id="AccountNumber"
                                type="text"
                                className="form-control box-border"
                              />
                              {errors.AccountNumber && (
                                <div className="invalid-feedback d-block">
                                  {errors.AccountNumber}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                          <Col xs="12" sm="12" md="12" lg="12" xl="12">
                            <FormGroup className="position-relative mt-1">
                              <Label className="requiredField ">
                                {this.props.t("Payment")}
                              </Label>

                              <Field
                                name="Payment"
                                id="Payment"
                                type="text"
                                className="form-control box-border"
                              />
                              {errors.Payment && (
                                <div className="invalid-feedback d-block">
                                  {errors.Payment}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                          <Col xs="12" sm="12" md="12" lg="12" xl="12">
                            <FormGroup className="position-relative mt-1">
                              <Label className="requiredField ">
                                {this.props.t("Recipts")}
                              </Label>

                              <Field
                                name="Recipts"
                                id="Recipts"
                                type="text"
                                className="form-control box-border"
                              />
                              {errors.Recipts && (
                                <div className="invalid-feedback d-block">
                                  {errors.Recipts}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                    <ModalFooter>
                      <FormGroup className="float-right ">
                        {this.state.glAccount && this.state.glAccount._id ? (
                          <Button
                            className={
                              this.state.buttonAction ? "disabled" : ""
                            }
                            type="submit"
                            color="primary"
                          >
                            {this.props.t("Edit")}
                          </Button>
                        ) : (
                          <Button
                            className={
                              this.state.buttonAction ? "disabled" : ""
                            }
                            type="submit"
                            color="primary"
                          >
                            {this.props.t("Add")}
                          </Button>
                        )}
                        <Button
                          className="btn singleEvent   ml-2"
                          color="danger"
                          onClick={() => this.toggleManageModal()}
                        >
                          {this.props.t("Cancel")}
                        </Button>
                      </FormGroup>
                    </ModalFooter>
                  </Form>
                )}
              </Formik>
            </Fragment>
          </Modal>
        </Container>
      </Fragment>
    )
  }
}
export default withTranslation()(VoucherEntry)
