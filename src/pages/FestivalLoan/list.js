import React, { Component, Fragment } from "react"
import ListPageHeader from "../../components/custom/ListPageHeader"
import ListPage from "../../components/custom/ListPage"
import DropDown from "../../common/DropDown"
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
} from "reactstrap"

import CustomSelectInput from "../../common/CustomSelectInput"

import toastr from "toastr"
import "toastr/build/toastr.min.css"

import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { festivalLoanValidation } from "../../helpers/validations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { Formik, Form, Field } from "formik"

import { withTranslation } from "react-i18next"

class FestivalLoan extends Component {
  constructor(props) {
    super(props)

    this.state = {
      startDate: new Date(),
      buttonAction: false,
      
     festivalLoan: {
       date: "",
        festivalName: "",
        amount : "",
        tenure : "",
        member : "",
        roi : "",
        sanctionedAmount : "",
        interest : "",
        installmentAmount : "",
        month : "",
        paymentMode : "",
        paymentDate : "",
        bank: "",
      },

      paymentMode: [{ label: "a", value: "a" }],
      paymentDate: [{ label: "02/23/2021", value: "02/23/2021" }],
    }
  }


  //master Data payment Mode start
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
//master Data payment Mode end


 //master Data payment date start
 getAllPaymentDate() {
  CallService(
    //paymentDate.ForAdmin,
    MethodType.POST,
    false,
    { pageNumber: 1, pageLimit: 10000 },
    "",
    this.getAllPaymentDateResponse
  )
}

getAllPaymentDateResponse = data => {
  if (data.result) {
    this.setState({
     paymentDateList: data.result.map(function (a) {
        return { value: a._id, label: a.Name }
      }),
    })
  }
}
//master Data  payment date end

//Cancel function start

handleCancel = () => {
  toastr.success("", this.props.t("Cancel"))
}
//cancel funciton end

///handle Submit start 
  
handleSubmit = values => {
  this.setState({
    buttonAction: true,
  })
  this.manageFestivalLoan(values)
}
manageFestivalLoan = values => {
  setTimeout(() => {
    this.setState({
      buttonAction: false,
    })
    this.manageFestivalLoanResponse({ statusCode: "200" })
  }, 5000)
  CallService(
    //.Create,
    MethodType.PUT,
    false,
    values,
    "",
    this.manageFestivalLoanResponse
  )
}
manageFestivalLoanResponse = data => {
  this.setState({
    buttonAction: false,
  })

  if (data.statusCode === StatusCodes.Success) {
    toastr.success("", this.props.t("Festival Loan Added Successfully"))
  }
}
//handle Submit end
  render() {
    const INITIALVALUES = this.state.festivalLoan
    return (
      <Fragment >
        <Container fluid className="justify-content-center form-tops pb-5">
          <Card className=" px-4 pt-4 page-content mb-0 pb-0 mt-5 mb-5">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t(
                "Festival Loan"
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
                validationSchema={festivalLoanValidation}
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
                            <Label className="requiredField">{this.props.t("Date")}</Label>
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
                        

                          
            
                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative">
                            <Label className="requiredField">
                              {this.props.t("Festival Name")}</Label>
                            <Field  type="text" name="festivalName" className="box-border form-control"/>
                            {errors.festivalName && (
                              <div className="invalid-feedback d-block pl-1">
                                {errors.festivalName}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative">
                            <Label className="requiredField">
                              {this.props.t("Amount")}</Label>
                            <Field  type="number" name="amount" className="box-border form-control"/>
                            {errors.amount && (
                              <div className="invalid-feedback d-block pl-1">
                                {errors.amount}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative">
                            <Label className="requiredField">
                              {this.props.t("Tenure")}</Label>
                            <Field  type="number" name="tenure" className="box-border form-control"/>
                            {errors.tenure && (
                              <div className="invalid-feedback d-block pl-1">
                                {errors.tenure}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                   
                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative">
                            <Label>
                              {this.props.t("Member")}</Label>
                            <Field  type="text" name="member" className="box-border form-control"/>
                            {errors.member && (
                              <div className="invalid-feedback d-block pl-1">
                                {errors.member}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative">
                            <Label className="requiredField">
                              {this.props.t("ROI")}</Label>
                            <Field  type="text" name="roi" className="box-border form-control"/>
                            {errors.roi && (
                              <div className="invalid-feedback d-block pl-1">
                                {errors.roi}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        
                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative">
                            <Label className="requiredField">
                              {this.props.t("Sanctioned Amount")}</Label>
                            <Field  type="number" name="sanctionedAmount" className="box-border form-control"/>
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
                              {this.props.t("Interest")}</Label>
                            <Field  type="number" name="interest" className="box-border form-control"/>
                            {errors.interest && (
                              <div className="invalid-feedback d-block pl-1">
                                {errors.interest}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        </Row>
                       
           <div>
                        <h4 className="mt-2 pt-2 mb-5">
                            {this.props.t("Installment Details")}:
                          </h4>
                          </div>
                          <Row >
                          <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative">
                            <Label className="requiredField">
                              {this.props.t("Installment Amount")}</Label>
                            <Field  type="number" name="installmentAmount" className="box-border form-control"/>
                            {errors.installmentAmount && (
                              <div className="invalid-feedback d-block pl-1">
                                {errors.installmentAmount}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative">
                            <Label className="requiredField">
                              {this.props.t("Month")}</Label>
                            <Field  type="number" name="month" className="box-border form-control"/>
                            {errors.month && (
                              <div className="invalid-feedback d-block pl-1">
                                {errors.month}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        </Row>
                        <div>
                        <h4 className="mt-2 pt-2 mb-5">
                            {this.props.t("Payment Details")}:
                          </h4>
                          </div>
           <Row className="mt-2">
                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative">
                            <DropDown
                              label={this.props.t("Payment Mode")}
                              classNamePrefix="react-select"
                              className="react-select"
                              name="paymentMode"
                              isSearchable
                              options={this.state.paymentMode}
                              //options={this.state.paymentModeList} // master data

                              Checkbox={false}
                              Action={e => {
                                setFieldValue("paymentMode", e.value)
                              }}
                            />
                            {errors.paymentMode && (
                              <div className="invalid-feedback d-block pl-1">
                                {errors.paymentMode}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        
                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative">
                            <DropDown
                              label={this.props.t("Date")}
                              classNamePrefix="react-select"
                              className="react-select"
                              name="paymentDate"
                              isSearchable
                              options={this.state.paymentDate}
                              //options={this.state.paymentDateList} // master data

                              Checkbox={false}
                              Action={e => {
                                setFieldValue("paymentDate", e.value)
                              }}
                            />
                            {errors.paymentDate && (
                              <div className="invalid-feedback d-block pl-1">
                                {errors.paymentDate}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        
                        <Col xs="6" sm="6" md="6" lg={6} className="mb-3">
                          <FormGroup className="position-relative">
                           <Label className="requiredField">{this.props.t("Bank")}</Label>
                           <Field type="text" name="bank" className="box-border form-control"/>
                            {errors.bank && (
                              <div className="invalid-feedback d-block pl-1">
                                {errors.bank}
                              </div>
                            )}
                          </FormGroup>
                        </Col>                     
                      </Row>
                      <ModalFooter>
                        <div className="float-right mt-1 mb-5">
                          <Button
                            type="submit"
                            color="primary"
                            className={
                              this.state.buttonAction ? "disabled" : ""
                            }
                          >
                            {this.props.t("Save")}
                          </Button>

                          <Button color="danger" className="mr-5 ml-2" onClick={this.handleCancel}>
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

export default withTranslation()(FestivalLoan)
