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
import { AvForm } from "availity-reactstrap-validation"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { Formik, Form, Field } from "formik"
import { withTranslation } from "react-i18next"
import { expenseValidation } from "../../helpers/validations"
import { values } from "lodash"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import DropDown from "../../common/DropDown"

class expenses extends Component {
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
      expenseAdd: {
        date: "",
        amount: "",
        vendor: "",
        custName: "",
        expenseCategory: "",
        expenseAcc: "",
        invoiceAmt: "",
        paymentMode: "",
      },
      paymentMode: [
        { label: "CreditCard", value: "Credit Card" },
        { label: "DebitCard", value: "Debit Card" },
        { label: "NetBanking", value: "Net Banking" },
      ],
      vendor: [
        { label: "Vendor1", value: "Vendor1" },
        { label: "Vendor2", value: "Vendor2" },
        { label: "Vendor3", value: "Vendor3" },
      ],
      expenseAccount: [
        { label: "Account1", value: "Account1" },
        { label: "Account2", value: "Account2" },
        { label: "Account3", value: "Account3" },
      ],
      data: [
        {
          date: "26-05-2021",
          expenseAcc: "asdqq23132",
          amount: "2233",
          paymentMode: "CreditCard",
          vendor: "Visa",
          custName: "Ry",
          invoiceAmt: "42069",
          expenseCategory: "1120",
          _id: 1,
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
          name: this.props.t("Expense Account"),
          selector: "expenseAcc",
          sortable: false,
          cell: row => <span>{row.expenseAcc ? row.expenseAcc : ""}</span>,
        },
        {
          name: this.props.t("Amount"),
          selector: "amount",
          sortable: false,
          cell: row => <span>{row.amount ? row.amount : ""}</span>,
        },
        
        {
          name: this.props.t("Vendor"),
          selector: "vendor",
          sortable: false,
          cell: row => <span>{row.vendor ? row.vendor : ""}</span>,
        },
        {
          name: this.props.t("Customer Name"),
          selector: "custName",
          sortable: false,
          cell: row => <span>{row.custName ? row.custName : ""}</span>,
        },
        {
          name: this.props.t("Invoice Amount"),
          selector: "invoiceAmt",
          sortable: false,
          cell: row => <span>{row.invoiceAmt ? row.invoiceAmt : ""}</span>,
        },
        {
          name: this.props.t("Expense Category"),
          selector: "expenseCategory",
          sortable: false,
          cell: row => (
            <span>{row.expenseCategory ? row.expenseCategory : ""}</span>
          ),
        },
        {
          name: this.props.t("Action"),
          selector: "action",
          sortable: false,
          cell: row => (
            <Row>
              <Button
                size="sm"
                color="primary"
                onClick={() => this.handleRowClicked(row)}
              >
                {this.props.t("Edit")}
              </Button>
              <Button
              className="ml-1"
                size="sm"
                color="danger"
                onClick={() => this.toggleDeleteModal(row)}
              >
                {this.props.t("Delete")}
              </Button>
            </Row>
          ),
        },
      ],
    }
  }

  getAllExpenses = () => {
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
      this.getAllExpensesResponse
    )
  }
  getAllExpensesResponse = data => {
    if (data.pagination && data.result) {
      this.setState({
        isLoading: false,
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        data: data.result,
        totalCount: data.pagination.totalCount,
      })
    } else
      this.setState({
        isLoading: false,
      })
  }
  addBtnClick = () => {
    this.toggleManageModal()
  }

  toggleManageModal = () => {
    this.setState({
      expenseAdd: {},
      manageModal: !this.state.manageModal,
    })
  }

  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageExpenses(values)
  }
  handleRowClicked = row => {
    if (row) {
      this.setState({
        expenseAdd: row,
        manageModal: !this.state.manageModal,
      })
    }
  }

  toggleDeleteModal = row => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      expenseAdd: row,
    })
  }
  searchQueryChanged = search => {
    this.setState(
      {
        ListRequestModel: {
          ...this.state.ListRequestModel,
          searchString: search.target.value,
        },
      },
      function () {
        if (
          this.state.ListRequestModel.searchString === "" ||
          this.state.ListRequestModel.searchString.length > 2
        ) {
          this.getAllExpenses()
        }
      }
    )
  }
  deleteExpenses = values => {
    toastr.success("", this.props.t("Expense Removed Successfully"))
    this.toggleDeleteModal()
  }
  uploadDocuments(values) {
    this.setState({
      buttonAction: true,
      processing: true,
      values: values,
    })

    this.values = values
    let formData = new FormData()
    Object.keys(values).map(key => {
      if (typeof values[key] === "object")
        if (JSON.stringify(values[key]) === "{}") {
          return formData.append(key, values[key])
        }
      return ""
    })

    CallService(
      //.upload,
      MethodType.POST,
      false,
      formData,
      "",
      this.documentUploaded,
      true
    )
  }
  documentUploaded = data => {
    if (data.statusCode === StatusCodes.Success) {
      if (data.result) {
        var Values = this.state.values
        Values.logo = data.result.logo
        this.manageExpenses(Values)
      }
    } else {
      toastr.error("", this.props.t("Document upload failed"))
    }
  }

  manageExpenses = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageExpensesResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //values._id ? .Update + values._id : .Create,
      values._id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      this.manageExpensesResponse
    )
  }
  manageExpensesResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(
        "",
        this.state.expenseAdd._id
          ? this.props.t("Expenses Edited successfully")
          : this.props.t("Expenses Added successfully")
      )
      this.getAllExpenses()
    }
    this.toggleManageModal()
  }
  render() {
    const initialValues = this.state.expenseAdd
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops">
          <Card className=" m-2 p-4">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t("Expenses")}`}
              onTextChange={this.searchQueryChanged}
              buttonClick={this.addBtnClick}
              searchValue={this.state.ListRequestModel.searchString}
            />
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
          </Card>
        </Container>
        <Modal isOpen={this.state.deleteModal} toggle={this.toggleDeleteModal}>
          <ModalHeader toggle={this.toggleDeleteModal}>
            {this.props.t("Remove Expenses")}
          </ModalHeader>
          <AvForm
            onSubmit={() => this.deleteExpenses(this.state.expenseAdd._id)}
          >
            <ModalBody>
              <Fragment>
                <Row className="mb-4">
                  <Label className="av-label ml-3">
                    <h5>
                      {this.props.t(
                        "Are you sure you want to remove this Expense?"
                      )}
                    </h5>
                  </Label>
                </Row>
              </Fragment>
            </ModalBody>

            <ModalFooter>
              <FormGroup className="float-sm-right">
                <Button color="primary" type="submit">
                  {this.props.t("Yes")}
                </Button>
                <Button
                  color="danger"
                  className="ml-2"
                  onClick={() => this.toggleDeleteModal()}
                >
                  {this.props.t("No")}
                </Button>
              </FormGroup>
            </ModalFooter>
          </AvForm>
        </Modal>
        <Modal
          isOpen={this.state.manageModal}
          size="lg"
          toggle={this.toggleManageModal}
        >
          <ModalHeader toggle={this.toggleManageModal}>
            {this.state.expenseAdd && this.state.expenseAdd._id
              ? this.props.t("Edit Expense")
              : this.props.t("Add Expense")}
          </ModalHeader>
          <ModalBody>
            <Fragment>
              <Formik
                initialValues={initialValues}
                onSubmit={this.handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
                validationSchema={expenseValidation}
              >
                {({ setFieldValue, errors }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <ModalBody>
                      <Fragment>
                        <Row className="px-3">
                          <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                            <FormGroup className="position-relative">
                              <Label className="requiredField mt-1">
                                {this.props.t("Date")}
                              </Label>
                              <Field
                                name="date"
                                id="first"
                                type="date"
                                className="form-control box-border"
                              />
                              {errors.date && (
                                <div className="invalid-feedback d-block ">
                                  {errors.date}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                          <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                            <FormGroup className="position-relative mt-1">
                              <DropDown
                                classNamePrefix="react-select"
                                className="react-select"
                                label={this.props.t("Expense Account")}
                                name="expenseAccount"
                                isSearchable
                                options={this.state.expenseAccount}
                                placeholderText={""}
                                Checkbox={false}
                                Action={e => {
                                  if (e)
                                    setFieldValue("expenseAccount", e.value)
                                }}
                                errors={errors.expenseAccount}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="px-3">
                          <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                            <FormGroup className="position-relative">
                              <Label className="requiredField mt-1">
                                {this.props.t("Amount")}
                              </Label>
                              <Field
                                name="amount"
                                id="first"
                                type="number"
                                className="form-control box-border"
                              />
                              {errors.amount && (
                                <div className="invalid-feedback d-block ">
                                  {errors.amount}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                          <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                            <FormGroup className="position-relative mt-1">
                              <DropDown
                                classNamePrefix="react-select"
                                className="react-select"
                                label={this.props.t("Paid Through")}
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
                        <Row className="px-3">
                          <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                            <FormGroup className="position-relative mt-1">
                              <DropDown
                                classNamePrefix="react-select"
                                className="react-select"
                                label={this.props.t("Vendor")}
                                name="vendor"
                                isSearchable
                                options={this.state.vendor}
                                placeholderText={""}
                                Checkbox={false}
                                Action={e => {
                                  if (e) setFieldValue("vendor", e.value)
                                }}
                                errors={errors.vendor}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                            <FormGroup className="position-relative mt-1">
                              <Label className="requiredField mt-1">
                                {this.props.t("Invoice")}
                              </Label>
                              <Field
                                name="invoiceAmt"
                                id="first"
                                type="text"
                                className="form-control box-border"
                              />
                              {errors.invoiceAmt && (
                                <div className="invalid-feedback d-block ">
                                  {errors.invoiceAmt}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="px-3">
                          <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                            <Label className="requiredField mt-1">
                              {this.props.t("Customer Name")}
                            </Label>
                            <Field
                              name="custName"
                              id="first"
                              type="text"
                              className="form-control box-border"
                            />
                            {errors.custName && (
                              <div className="invalid-feedback d-block ">
                                {errors.custName}
                              </div>
                            )}
                          </Col>
                          <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                            <Label className="requiredField mt-1">
                              {this.props.t("SGST")}
                            </Label>
                            <Field
                              name="sgst"
                              id="first"
                              type="number"
                              className="form-control box-border"
                            />
                            {errors.sgst && (
                              <div className="invalid-feedback d-block ">
                                {errors.sgst}
                              </div>
                            )}
                          </Col>
                        </Row>
                        <Row className="px-3">
                          <Col cs="6" sm="6" md="6" lg={6} className="pr-4">
                            <FormGroup className="position-relative mt-1">
                              <DropDown
                                classNamePrefix="react-select"
                                className="react-select"
                                label={this.props.t("Expense Category")}
                                name="expenseCategory"
                                isSearchable
                                options={this.state.expenseCategory}
                                placeholderText={""}
                                Checkbox={false}
                                Action={e => {
                                  if (e)
                                    setFieldValue("expenseCategory", e.value)
                                }}
                                errors={errors.expenseCategory}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                            <Label className="requiredField mt-1">
                              {this.props.t("CGST")}
                            </Label>
                            <Field
                              name="cgst"
                              id="first"
                              type="number"
                              className="form-control box-border"
                            />
                            {errors.cgst && (
                              <div className="invalid-feedback d-block ">
                                {errors.cgst}
                              </div>
                            )}
                          </Col>
                        </Row>
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
                      </Fragment>
                    </ModalBody>
                  </Form>
                )}
              </Formik>
            </Fragment>
          </ModalBody>
        </Modal>
      </Fragment>
    )
  }
}

export default withTranslation()(expenses)
