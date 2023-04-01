import React, { Component, Fragment } from "react"
import ListPageHeader from "../../components/custom/ListPageHeader"
import DropDown from "../../common/DropDown"
import { Tabs, Tab, FormLabel } from "react-bootstrap"
import ListPage from "../../components/custom/ListPage"
import {
  Container,
  Row,
  Col,
  FormGroup,
  Button,
  Label,
  CardBody,
  Card,
  ModalFooter,
  CustomInput,
} from "reactstrap"

import CustomSelectInput from "../../common/CustomSelectInput"

import toastr from "toastr"
import "toastr/build/toastr.min.css"

import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { invoicePaymentValidation } from "../../helpers/validations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { Formik, Form, Field } from "formik"

import { withTranslation } from "react-i18next"

class InvoicePayment extends Component {
  constructor(props) {
    super(props)

    this.state = {
      startDate: new Date(),
      buttonAction: false,
      isLoading: false,
      listRequestModel: {
        searchString: "",
        sortCondition: null,
        pageNumber: 1,
        pageLimit: 10,
      },
      invoicePayment: {
     vendor : "",
     date : "",
    poNo : "",
  phoneNo : "",
amountToBePaid : "",
invoiceCopy : "",
paymentAmount : "",
tdsApplicable : "",
paymentBy : "",
tdsAmount : "",
bankName : "",
chequeDate : "",
refNo : "",
chequeNo :"",

 },
      vendor: [
        { label: "C", value: "C" },
      
      ],
      paymentBy: [
        { label: "GC A/C", value: "GC A/C" },
        { label: "Cheque", value: "Cheque" },
        { label: "Cash", value: "Cash" },
        { label: "Fund Transfer", value: "Fund Transfer" },
      
      ],

    }
  }

  //Master Data paymentBY
  getAllPaymentBy() {
    CallService(
      //paymentBy.ForAdmin,
      MethodType.POST,
      false,
      { pageNumber: 1, pageLimit: 10000 },
      "",
      this.getAllPaymentByResponse
    )
  }

  getAllPaymentByResponse = data => {
    if (data.result) {
      this.setState({
        paymentByList: data.result.map(function (a) {
          return { value: a._id, label: a.Name }
        }),
      })
    }
  }
// master Data end

  //Master Data
  getAllVendor() {
    CallService(
      //Vendor.ForAdmin,
      MethodType.POST,
      false,
      { pageNumber: 1, pageLimit: 10000 },
      "",
      this.getAllVendorResponse
    )
  }

  getAllVendorResponse = data => {
    if (data.result) {
      this.setState({
        vendorList: data.result.map(function (a) {
          return { value: a._id, label: a.Name }
        }),
      })
    }
  }
// master Data end


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
        Values.itemImage = data.result.itemImage
        this.getAllInvoicePayment(Values)
      }
    } else {
      toastr.error("", this.props.t("Document upload failed"))
    }
  }
//  document API

//Cancel function start

handleCancel = () => {
  toastr.success("",  this.props.t("Cancel"))
}
//cancel funciton end

  componentDidMount() {
    this.getAllInvoicePayment()
  }
  getAllInvoicePayment() {
    this.setState({
      isLoading: false,
    })
    const { listRequestModel } = this.state
    CallService(
      //.GetAll,
      MethodType.GET,
      false,
      listRequestModel,
      "",
      this.getAllInvoicePaymentResponse
    )
  }
  getAllInvoicePaymentResponse = data => {
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
  
 

  
 
  //handle  submit function and api
  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageInvoicePayment(values)
  }
  manageInvoicePayment = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageInvoicePaymentResponse({ statusCode: "200" })
    }, 5000)

    CallService(
       //.create,
       MethodType.GET,
       false,
       listRequestModel,
       "",
       this.manageInvoicePaymentResponse
    )}
  manageInvoicePaymentResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(
        "",

        this.props.t("Invoice Payment Added Successfully")
      )
      this.getAllInvoicePayment()
    }
  }
// handle Submit funciton and api

  render() {
    const INITIALVALUES = this.state.invoicePayment
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops pb-5">
          <Card className=" px-4 pt-4 page-content mb-0 pb-0 mt-5 mb-5">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t(
                "Invoice Payment"
              )}`}
              showSearch={false}
              showButton={false}
              //  match={this.props.match}
              //  onTextChange={this.searchQueryChanged}
              // buttonClick={this.addBtnClick}
              //  searchValue={this.state.listRequestModel.searchString}
            />

            <CardBody>
              <Formik
                initialValues={INITIALVALUES}
                validationSchema={invoicePaymentValidation}
                onSubmit={this.handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
              >
                {({ errors, values, setFieldValue }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <Fragment>
                      <Row>
                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative">
                            <DropDown
                              label={this.props.t("Vendor")}
                              classNamePrefix="react-select"
                              className="react-select"
                              name="vendor"
                              isSearchable
                              options={this.state.vendor}
                              //options={this.state.vendorList} // master data
                              placeholderText={this.props.t("Please Select")}
                              Checkbox={false}
                              Action={e => {
                                setFieldValue("vendor", e.value)
                              }}
                            />
                            {errors.vendor && (
                              <div className="invalid-feedback d-block pl-1">
                                {errors.vendor}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
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
                              selected={this.state.date}
                              onChange={date => {
                                setFieldValue("date", date)
                                if (date)
                                  this.setState({
                                    date: date,
                                  })
                                else
                                  this.setState({
                                    date: "",
                                  })
                              }}
                              placeholderText={this.props.t("Select Date")}
                              dateFormat="dd/MM/yyyy"
                            />

                            {errors.date && (
                              <div className="invalid-feedback d-block">
                                {errors.date}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        <Col xs="6" sm="6" md="6" lg={6} >
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("PO No")}
                            </Label>

                            <Field
                              type="text"
                              name="poNo"
                              className="box-border form-control"
                            />

                            {errors.poNo && (
                              <div className="invalid-feedback d-block">
                                {errors.poNo}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("Phone No")}
                            </Label>

                            <Field
                              type="Number"
                              name="phoneNo"
                              className="box-border form-control"
                            />

                            {errors.phoneNo && (
                              <div className="invalid-feedback d-block">
                                {errors.phoneNo}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        
                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("Amount To Be Paid")}
                            </Label>

                            <Field
                              type="Number"
                              name="amountToBePaid"
                              className="box-border form-control"
                            />

                            {errors.amountToBePaid && (
                              <div className="invalid-feedback d-block">
                                {errors.amountToBePaid}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative">
                            <Label>
                              {this.props.t("Invoice Copy")}
                            </Label>
                            <CustomInput
                               className="position-sticky"
                              key={"imageUrl"}
                              type={"file"}
                              name={"invoiceCopy"}
                              onChange={event => {
                                setFieldValue(
                                  "invoiceCopy",
                                  event.target.files[0]
                                )
                              }}
                            />

                            {errors.invoiceCopy ? (
                              <div className="invalid-feedback d-block">
                                {errors.invoiceCopy}
                              </div>
                            ) : null}
                            <p className="text-semi-muted">
                              {this.props.t(
                                "Allowed formats are jpeg, jpg, png and pdf"
                              )}
                                <br />
                          {this.props.t("File Size Must be Less Than 5 Mb")}
                            </p>
                          </FormGroup>
                        </Col>

                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("Paying Amount")}
                            </Label>

                            <Field
                              type="Number"
                              name="payingAmount"
                              className="box-border form-control"
                            />

                            {errors.payingAmount && (
                              <div className="invalid-feedback d-block">
                                {errors.payingAmount}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        


                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("TDS Applicable")}
                            </Label>

                            <Field
                              type="text"
                              name="tdsApplicable"
                              className="box-border form-control"
                            
                            />

                            {errors.tdsApplicable && (
                              <div className="invalid-feedback d-block">
                                {errors.tdsApplicable}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pb-5 mb-5">
                          <FormGroup className="position-relative">
                            <DropDown
                              label={this.props.t("Payment By")}
                              classNamePrefix="react-select"
                              className="react-select"
                              name="paymentBy"
                              isSearchable
                              options={this.state.paymentBy}
                              //options={this.state.paymentByList} // master data
                              placeholderText={this.props.t("Please Select")}
                              Checkbox={false}
                              Action={e => {
                                setFieldValue("paymentBy", e.value)
                              }}
                            />
                            {errors.paymentBy && (
                              <div className="invalid-feedback d-block pl-1">
                                {errors.paymentBy}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        


                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 pb-5 mb-5">
                          <FormGroup className="position-relative">
                            <Label>
                              {this.props.t("TDS Amount")}(%)
                            </Label>

                            <Field
                              type="number"
                              name="tdsAmount"
                              className="box-border form-control"
                            
                            />

                            {errors.tdsAmount && (
                              <div className="invalid-feedback d-block">
                                {errors.tdsAmount}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="mt-5">
                          <FormGroup className="position-relative">
                            <Label>
                              {this.props.t("Bank Name")}
                            </Label>

                            <Field
                              type="text"
                              name="bankName"
                              className="box-border form-control"
                            
                            />

                            {errors.bankName && (
                              <div className="invalid-feedback d-block">
                                {errors.bankName}
                              </div>
                            )}
                          </FormGroup>
                        </Col>


                        <Col xs="6" sm="6" md="6" lg={6} className="mt-5 pl-4">
                          <FormGroup className="position-relative">
                            <Label>
                              {this.props.t("Cheque Date")}
                            </Label>

                            <DatePicker
                              isClearable={true}
                              components={{ Input: CustomSelectInput }}
                              className="form-control box-border"
                              selectsStart
                              selected={this.state.chequeDate}
                              onChange={date => {
                                setFieldValue("chequeDate", date)
                                if (date)
                                  this.setState({
                                    chequeDate: date,
                                  })
                                else
                                  this.setState({
                                    chequeDate: "",
                                  })
                              }}
                              placeholderText={this.props.t("Select Date")}
                              dateFormat="dd/MM/yyyy"
                            />

                            {errors.chequeDate && (
                              <div className="invalid-feedback d-block">
                                {errors.chequeDate}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                      
                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative">
                            <Label>
                              {this.props.t("Ref No")}
                            </Label>

                            <Field
                              type="text"
                              name="refNo"
                              className="box-border form-control"
                            />

                            {errors.refNo && (
                              <div className="invalid-feedback d-block">
                                {errors.refNo}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative">
                            <Label>
                              {this.props.t("Cheque No")}
                            </Label>

                            <Field
                              type="text"
                              name="chequeNo"
                              className="box-border form-control"
                            />

                            {errors.chequeNo && (
                              <div className="invalid-feedback d-block">
                                {errors.chequeNo}
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
                            className={
                              this.state.buttonAction ? "disabled" : ""
                            }
                          >
                            {this.props.t("Save")}
                          </Button>

                          <Button
                            color="danger"
                            className="mr-5 ml-2"
                            onClick={this.handleCancel}
                          >
                            {this.props.t("Cancel")}
                          </Button>
                        </div>
                      </ModalFooter>
                    </Fragment>
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

export default withTranslation()(InvoicePayment)
