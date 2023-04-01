import React, { Component, Fragment } from "react"
import DropDown from "../../common/DropDown"
import {
  Container,
  Row,
  Col,
  FormGroup,
  Button,
  Label,
  Card,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  CustomInput,
} from "reactstrap"

import toastr from "toastr"
import "toastr/build/toastr.min.css"

import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { loanApplicationValidation } from "../../helpers/validations"
import { particularsValidation } from "../../helpers/validations"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"

import { Formik, Form, Field } from "formik"
import CustomSelectInput from "../../common/CustomSelectInput"

import { withTranslation } from "react-i18next"
import { AvForm } from "availity-reactstrap-validation"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
class LoanApplication extends Component {
  constructor(props) {
    super(props)

    this.state = {
      buttonAction: false,
      isLoading: false,
      manageModal : false,
      deleteModal :false,
      pageSizeOptions: [10, 50, 100],
      pageLimit: 10,
      totalCount: 0,
      keyField: "_id",
      listRequestModel: {
        searchString: "",
        sortCondition: { _id: 1 },
        pageNumber: 1,
        pageLimit: 10,
      },

      paymentMode: [{ label: "Cash", value: "Cash" }],

      dates: [{ label: "09/08/2021", value: "09/08/2021" }],

      product: [{ label: "Bangles", value: "Bangles" }],

      loanApplication: {
        loanDate : "",
        product : "",
        netWeight : "",
        totalWeight : "",
        requestingAmount : "",
        jewelImage : "",
        sanctionedAmount : "",
        appraisalValue : "",
        deductionsIn : "",
        rateOfInterest : "",
        interestAmount : "",
        netAmountPayable : "",
        deductions : "",
        bankCharges : "",
        gst :"",
        paymentMode : "",
        date : "",
        valueDate : "",
        creditedDate : "",
        bank : "",
      },

      particulars: {
        name: "",
        quantity: "",
        description: "",
      },

      data: [
        {
          _id: 1,
          name: "rava",
          quantity: "10",
          description: "34",
        },
        {
           _id: 2,
          name: "rava",
          quantity: "10",
          description: "34",
        },
        {
          id :3,
          name: "rava",
          quantity: "10",
          description: "34",
        },
      ],
      columns: [
        {
          name: this.props.t("Serial No"),

          sortable: false,
          cell: (row, index) => index + 1,
        },
        {
          name: this.props.t("Name"),
          selector: "name",
          sortable: false,
          cell: row => <span>{row.name ? row.name : ""}</span>,
        },
        {
          name: this.props.t("Quantity"),
          selector: "quantity",
          sortable: false,
          cell: row => <span>{row.quantity ? row.quantity : ""}</span>,
        },
        {
          name: this.props.t("Description"),
          selector: "description",
          sortable: false,
          cell: row => <span>{row.description ? row.description : ""}</span>,
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
                size="sm"
                color="danger"
                className="ml-1"
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

  //Master Data date
  getAllDate() {
    CallService(
      //date.ForAdmin,
      MethodType.POST,
      false,
      { pageNumber: 1, pageLimit: 10000 },
      "",
      this.getAllDateResponse
    )
  }

  getAllDateModeResponse = data => {
    if (data.result) {
      this.setState({
        dateList: data.result.map(function (a) {
          return { value: a._id, label: a.Name }
        }),
      })
    }
  }
  // master Data date end

  //Master Data payment Mode
  getAllPaymentMode() {
    CallService(
      //paymentMode.ForAdmin,
      MethodType.POST,
      false,
      { pageNumber: 1, pageLimit: 10000 },
      "",
      this.getAllPaymentModeResponse
    )
  }

  getAllPaymentModeResponse = data => {
    if (data.result) {
      this.setState({
        paymentModeList: data.result.map(function (a) {
          return { value: a._id, label: a.Name }
        }),
      })
    }
  }
  // master Data Payment Mode end

  //Document Api
  uploadDocuments = values => {
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
        Values.jewelImage = data.result.jewelImage
        this.getAllLoanApplication(Values)
      }
    } else {
      toastr.error("", this.props.t("Document upload failed"))
    }
  }
  //  document API

  componentDidMount() {}

  //handleSubmit loan Application Start
  handleSubmitLoanApplication = values => {
    console.log(values)
    this.setState({
      buttonAction: true,
    })
    this.manageLoanApplication(values)
  }
  manageLoanApplication = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageLoanApplicationResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      // .Create,
      MethodType.PUT,
      false,
      values,
      "",
      this.manageLoanApplicationResponse
    )
  }
  manageLoanApplicationResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(this.props.t("Loan Application Added Successfully"))
    }
  }
  //handleSubmit loan Application Start

  //loan Application Handle Cancel start
  handleCancelLoanApplication = () => {
    toastr.success("", this.props.t("Cancel"))
  }
  //loan Application Handle Cancel End

  //handle Submit PARTICULARS start
  getAllParticulars() {
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
      this.getAllParticularsResponse
    )
  }
  getAllParticularsResponse = data => {
    if (data.pagination && data.result) {
      this.setState({
        isLoading: false,
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        data : data.result,
        totalCount: data.pagination.totalCount,
      })
    } else
      this.setState({
        isLoading: false,
      })
  }
  handleRowClicked = row => {
    if (row) {
      this.setState({
        particulars: row,
        manageModal: !this.state.manageModal,
      })
    }
  }
  
  addBtnClick = () => {
    this.toggleManageModal()
  }
  toggleManageModal = () => {
    this.setState({
      particulars: {},
      manageModal: !this.state.manageModal,
    })
  }

  toggleDeleteModal = row => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      particulars: row,
    })
  }
  handleSubmitParticulars = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageParticulars(values)
  }
  manageParticulars = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageParticularsResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //values._id ? .Update + values._id : .Create,
      values._id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      this.manageParticularsResponse
    )
  }
  manageParticularsResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(
        "",
        this.state.particulars._id
          ? this.props.t("Particulars Edited Successfully")
          : this.props.t("Particulars Added Successfully")
      )
      this.getAllParticulars()
    }
    this.toggleManageModal()
  }
  deleteParticulars = values => {
    toastr.success("", this.props.t("Deleted"))
    this.toggleDeleteModal()
  }

//Particular handleSubmit end
  render() {
    const PARTICULARS = this.state.particulars
    const LOANAPPLICATION = this.state.loanApplication

    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops pb-5">
          <Card className="m-2 px-4 pt-4 mt-3 mb-5">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t(
                "Loan Application"
              )}`}
              showButton={false}
              showSearch={false}
            />

            <Formik
              initialValues={LOANAPPLICATION}
              validationSchema={loanApplicationValidation}
              onSubmit={this.handleSubmitLoanApplication}
              validateOnBlur={false}
              validateOnChange={false}
            >
              {({ errors, values, setFieldValue }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <Row className="ml-2 mr-2">
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative">
                        <Label className="requiredField ">
                          {this.props.t("Date")}
                        </Label>

                        <DatePicker
                          isClearable={true}
                          components={{ Input: CustomSelectInput }}
                          className="form-control box-border"
                          selectsStart
                          selected={this.state.loanDate}
                          onChange={date => {
                            setFieldValue("loanDate", date)
                            if (date)
                              this.setState({
                                loanDate: date,
                              })
                            else
                              this.setState({
                                loanDate: "",
                              })
                          }}
                          placeholderText={this.props.t("Select Date")}
                          dateFormat="dd/MM/yyyy"
                        />

                        {errors.loanDate && (
                          <div className="invalid-feedback d-block">
                            {errors.loanDate}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6}>
                      <FormGroup className="position-relative">
                        <DropDown
                          classNamePrefix="react-select"
                          className="react-select requiredField"
                          label={this.props.t("Product")}
                          name=""
                          isSearchable
                          options={this.state.product}
                          //options={this.state.productList} //mastert data Payment Mode
                          placeholderText={""}
                          Checkbox={false}
                          Action={e => {
                            setFieldValue("product", e.value)
                          }}
                          errors={errors.product}
                        />
                      </FormGroup>
                    </Col>
                    
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative">
                        <Label className="requiredField">
                          {this.props.t("Net Weight")}
                          <br />
                          {this.props.t("(In................)")}
                        </Label>
                        <Field
                          name="netWeight"
                          type="number"
                          className="box-border form-control"
                        />
                        {errors.netWeight && (
                          <div className="invalid-feedback d-block pl-1">
                            {errors.netWeight}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6}>
                      <FormGroup className="position-relative">
                        <Label className="requiredField">
                          {this.props.t("Total Weight")}
                          <br />
                          {this.props.t("(In................)")}
                        </Label>
                        <Field
                          name="totalWeight"
                          type="number"
                          className="box-border form-control"
                        />
                        {errors.totalWeight && (
                          <div className="invalid-feedback d-block pl-1">
                            {errors.totalWeight}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative">
                        <Label className="requiredField">
                          {this.props.t("Requesting Amount")}
                        </Label>
                        <Field
                          name="requestingAmount"
                          type="number"
                          className="box-border form-control"
                        />
                        {errors.requestingAmount && (
                          <div className="invalid-feedback d-block pl-1">
                            {errors.requestingAmount}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6}>
                      <FormGroup className="position-relative">
                        <Label className="required-field">
                          {this.props.t("Jewel Image")}
                        </Label>
                        <CustomInput
                          className="position-sticky"
                          key={"jewelImage"}
                          type="file"
                          name={"jewelImage"}
                          onChange={event => {
                            setFieldValue("jewelImage", event.target.files[0])
                          }}
                        />

                        {errors.jewelImage ? (
                          <div className="invalid-feedback d-block">
                            {errors.jewelImage}
                          </div>
                        ) : null}
                        <p className="text-semi-muted">
                          {this.props.t(
                            "Allowed formats are jpg, jpeg and png"
                          )}
                          <br />
                          {this.props.t("File Size Must be Less Than 5 Mb")}
                        </p>
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative">
                        <Label className="requiredField">
                          {this.props.t("Sanctioned Amount")}
                        </Label>
                        <Field
                          name="sanctionedAmount"
                          type="number"
                          className="box-border form-control"
                        />
                        {errors.sanctionedAmount && (
                          <div className="invalid-feedback d-block pl-1">
                            {errors.sanctionedAmount}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6}>
                      <FormGroup className="position-relative">
                        <Label className="requiredField">
                          {this.props.t("Appraisal Value")}
                        </Label>
                        <Field
                          name="appraisalValue"
                          type="number"
                          className="box-border form-control"
                        />
                        {errors.appraisalValue && (
                          <div className="invalid-feedback d-block pl-1">
                            {errors.appraisalValue}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative">
                        <Label className="requiredField">
                          {this.props.t("Deductions")}
                          <br />
                          {this.props.t("(In................)")}
                        </Label>
                        <Field
                          name="deductionsIn"
                          type="number"
                          className="box-border form-control"
                        />
                        {errors.deductionsIn && (
                          <div className="invalid-feedback d-block pl-1">
                            {errors.deductionsIn}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    
                  </Row>
                  <div className="mb-3">
                    <ListPageHeader
                      heading=""
                      buttonClick={this.addBtnClick}
                      showSearch={false}
                    />
                    <h5 className="ml-3">{this.props.t("Particulars")}</h5>
                  </div>

                  <ListPage
                    columns={this.state.columns}
                    data={this.state.data}
                    keyField={this.state.keyField}
                    totalCount={this.state.totalCount}
                    isDataLoading={this.state.isLoading}
                    overFlowXRemoval={true}
                  />
                  <Row className="mb-10 ml-4 mt-4 mr-2">
                    <Col xs="6" sm="6" md="6" lg={6}>
                      <FormGroup className="position-relative">
                        <Label className="requiredField">
                          {this.props.t("Rate of Interest")}
                        </Label>
                        <Field
                          name="rateOfInterest"
                          type="number"
                          className="box-border form-control"
                        />
                        {errors.rateOfInterest && (
                          <div className="invalid-feedback d-block pl-1">
                            {errors.rateOfInterest}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6}>
                      <FormGroup className="position-relative">
                        <Label className="requiredField">
                          {this.props.t("Interest Amount")}
                        </Label>
                        <Field
                          name="interestAmount"
                          type="number"
                          className="box-border form-control"
                        />
                        {errors.interestAmount && (
                          <div className="invalid-feedback d-block pl-1">
                            {errors.interestAmount}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6}>
                      <FormGroup className="position-relative">
                        <Label className="requiredField">
                          {this.props.t("Net Amount Payable")}
                        </Label>
                        <Field
                          name="netAmountPayable"
                          type="number"
                          className="box-border form-control"
                        />
                        {errors.netAmountPayable && (
                          <div className="invalid-feedback d-block pl-1">
                            {errors.netAmountPayable}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6}>
                      <FormGroup className="position-relative">
                        <Label className="requiredField">
                          {this.props.t("Deductions")}
                        </Label>
                        <Field
                          name="deductions"
                          type="number"
                          className="box-border form-control"
                        />
                        {errors.deductions && (
                          <div className="invalid-feedback d-block pl-1">
                            {errors.deductions}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6}>
                      <FormGroup className="position-relative">
                        <Label className="requiredField">
                          {this.props.t("Bank Charges")}
                        </Label>
                        <Field
                          name="bankCharges"
                          type="number"
                          className="box-border form-control"
                        />
                        {errors.bankCharges && (
                          <div className="invalid-feedback d-block pl-1">
                            {errors.bankCharges}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6}>
                      <FormGroup className="position-relative">
                        <Label className="requiredField">
                          {this.props.t("GST")}
                        </Label>
                        <Field
                          name="gst"
                          type="number"
                          className="box-border form-control"
                        />
                        {errors.gst && (
                          <div className="invalid-feedback d-block pl-1">
                            {errors.gst}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6}>
                      <FormGroup className="position-relative">
                        <DropDown
                          classNamePrefix="react-select"
                          className="react-select requiredField"
                          label={this.props.t("Payment Mode")}
                          name=""
                          isSearchable
                          options={this.state.paymentMode}
                          //options={this.state.paymentModeList} //mastert data Payment Mode
                          placeholderText={""}
                          Checkbox={false}
                          Action={e => {
                            setFieldValue("paymentMode", e.value)
                          }}
                          errors={errors.paymentMode}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6}>
                      <FormGroup className="position-relative">
                        <DropDown
                          classNamePrefix="react-select"
                          className="react-select requiredField"
                          label={this.props.t("Date")}
                          name=""
                          isSearchable
                          options={this.state.dates}
                          //options={this.state.dateList} //mastert data dateList
                          placeholderText={""}
                          Checkbox={false}
                          Action={e => {
                            setFieldValue("date", e.value)
                          }}
                          errors={errors.date}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6}>
                      <FormGroup className="position-relative">
                        <Label className="requiredField ">
                          {this.props.t("Value Date")}
                        </Label>

                        <DatePicker
                          isClearable={true}
                          components={{ Input: CustomSelectInput }}
                          className="form-control box-border"
                          selectsStart
                          selected={this.state.valueDate}
                          onChange={date => {
                            setFieldValue("valueDate", date)
                            if (date)
                              this.setState({
                                valueDate: date,
                              })
                            else
                              this.setState({
                                valueDate: "",
                              })
                          }}
                          placeholderText={this.props.t("Select Date")}
                          dateFormat="dd/MM/yyyy"
                        />

                        {errors.valueDate && (
                          <div className="invalid-feedback d-block">
                            {errors.valueDate}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6}>
                      <FormGroup className="position-relative">
                        <Label className="requiredField ">
                          {this.props.t("Credited Date")}
                        </Label>

                        <DatePicker
                          isClearable={true}
                          components={{ Input: CustomSelectInput }}
                          className="form-control box-border"
                          selectsStart
                          selected={this.state.creditedDate}
                          onChange={date => {
                            setFieldValue("creditedDate", date)
                            if (date)
                              this.setState({
                                creditedDate: date,
                              })
                            else
                              this.setState({
                                creditedDate: "",
                              })
                          }}
                          placeholderText={this.props.t("Select Date")}
                          dateFormat="dd/MM/yyyy"
                        />

                        {errors.creditedDate && (
                          <div className="invalid-feedback d-block">
                            {errors.creditedDate}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6}>
                      <FormGroup className="position-relative">
                        <Label className="requiredField">
                          {this.props.t("Bank")}
                        </Label>
                        <Field
                          name="bank"
                          type="text"
                          className="box-border form-control"
                        />
                        {errors.bank && (
                          <div className="invalid-feedback d-block pl-1">
                            {errors.bank}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>

                  <ModalFooter>
                    <div className="float-right mt-1">
                      <Button
                        type="submit"
                        color="primary"
                        className={this.state.buttonAction ? "disabled" : ""}
                      >
                        {this.props.t("Proceed")}
                      </Button>

                      <Button
                        color="danger"
                        className="ml-1"
                        onClick={this.handleCancelLoanApplication}
                      >
                        {this.props.t("Cancel")}
                      </Button>
                    </div>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </Card>
        </Container>
        <Modal isOpen={this.state.deleteModal} toggle={this.toggleDeleteModal}>
          <ModalHeader toggle={this.toggleDeleteModal}>
            {this.props.t("Remove Particulars")}
          </ModalHeader>

          <AvForm

onSubmit={() => this.deleteParticulars(this.state.particulars._id)}
          >
            <ModalBody>
              <Fragment>
                <Row className="mb-4">
                  <Label className="av-label ml-3">
                    <h5>
                      {this.props.t(
                        "Are you sure you want to remove this Particulars?"
                      )}
                    </h5>
                  </Label>
                </Row>
              </Fragment>
            </ModalBody>

            <ModalFooter>
              <FormGroup className="float-sm-right ">
                <Button type="submit" color="primary">
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

        <Modal isOpen={this.state.manageModal} toggle={this.toggleManageModal}>
        <ModalHeader toggle={this.toggleManageModal}>
            {this.state.particulars && this.state.particulars._id
              ? this.props.t("Edit Particulars")
              : this.props.t("Add Particulars")}
          </ModalHeader>
          <Formik
            initialValues={PARTICULARS}
            validationSchema={particularsValidation}
            onSubmit={this.handleSubmitParticulars}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ errors, values, setFieldValue }) => (
              <Form className="av-tooltip tooltip-label-bottom">
                <ModalBody>
                  <Row className="mb-10 ml-2 mr-2">
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <FormGroup className="position-relative">
                        <Label className="requiredField mt-1">
                          {this.props.t("Name")}
                        </Label>
                        <Field
                          className="form-control"
                          name="name"
                          type="text"
                        />
                        {errors.name && (
                          <div className="invalid-feedback d-block">
                            {errors.name}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <FormGroup className="position-relative">
                        <Label className="requiredField mt-1">
                          {this.props.t("Quantity")}
                        </Label>
                        <Field
                          className="form-control"
                          name="quantity"
                          type="number"
                        />
                        {errors.quantity && (
                          <div className="invalid-feedback d-block">
                            {errors.quantity}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <FormGroup className="position-relative">
                        <Label className="mt-1">
                          {this.props.t("Description")}
                        </Label>
                        <Field
                          className="form-control"
                          name="description"
                          type="text"
                        />
                        {errors.description && (
                          <div className="invalid-feedback d-block">
                            {errors.description}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    
                  </Row>
                </ModalBody>

                <ModalFooter>
                  <FormGroup className="float-sm-right">
                    <Button
                      className={this.state.buttonAction ? "disabled" : ""}
                      type="submit"
                      color="primary"
                    >
                      {this.props.t("Save")}
                    </Button>

                    <Button
                      onClick={() => {
                        this.toggleManageModal()
                      }}
                      color="danger"
                      className="mr-3 ml-1"
                    >
                      {this.props.t("Cancel")}
                    </Button>
                  </FormGroup>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </Modal>
      </Fragment>
    )
  }
}

export default withTranslation()(LoanApplication)
