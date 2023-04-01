import React, { Component, Fragment } from "react"
import ListPageHeader from "../../components/custom/ListPageHeader"
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
  CardTitle,
  ModalFooter,
} from "reactstrap"
import DropDown from "../../common/DropDown"
import CustomSelectInput from "../../common/CustomSelectInput"

import toastr from "toastr"
import "toastr/build/toastr.min.css"

import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { amountWithdrawValidation } from "../../helpers/validations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { Formik, Form, Field } from "formik"

import { withTranslation } from "react-i18next"

class AmountWithdraw extends Component {
  constructor(props) {
    super(props)

    this.state = {
      startDate: new Date(),
      buttonAction: false,
      isLoading: false,
     
    
     
      keyField: "_id",
      listRequestModel: {
        searchString: "",
        sortCondition: null,
        pageNumber: 1,
        pageLimit: 10,
      },
  amountWithdraw: {
        memberNo: "",
      amountNo: "",
        amount: "",

      },
      paymentMode : [{label : "a" , value : "a"}],
      data : [
      {
        date : "12/09/2021",
        debit : "345",
        credit : "45435",
        description : "fdsfsf",
        closingBal : "3454",

      },
      
      {
        date : "12/09/2021",
        debit : "345",
        credit : "45435",
        description : "fdsfsf",
        closingBal : "3454",

      }],

      columns: [
        {
          name: this.props.t("Date"),
          selector: "date",
          sortable: false,
          cell: row => <span>{row.date? row.date : ""}</span>,
        },
        {
          name: this.props.t("Debit"),
          selector: "debit",
          sortable: false,
          cell: row => <span>{row.debit ? row.debit : ""}</span>,
        },
        {
          name: this.props.t("Credit"),
          selector: "credit",
          sortable: false,
          cell: row => <span>{row.credit ? row.credit : ""}</span>,
        },
        
        {
          name: this.props.t("Description"),
          selector: "description",
          sortable: false,
          cell: row => <span>{row.description ? row.description : ""}</span>,
        },
        {
          name: this.props.t("Closing Bal"),
          selector: "closingBal",
          sortable: false,
          cell: row => <span>{row.closingBal ? row.closingBal : ""}</span>,
        },
      ],
    }
  }

   //Master Data
   getAllPaymentMode() {
    CallService(
      //paymentMode.ForAdmin,
      MethodType.POST,
      false,
      { pageNumber: 1, pageLimit: 10000 },
      "",
      this.getAllPaymentModeResponse
    );
  }

  getAllPaymentModeResponse = (data) => {
    if (data.result) {
      this.setState({
       paymentModeList: data.result.map(function (a) {
          return { value: a._id, label: a.Name };
        }),
      });
    }
  };
//handle Cancle start
  
  handleCancel = () => {
    toastr.success("", this.props.t("Cancel"))
  }
//handle cancel end

componentDidMount() {
  this.getAllAmountWithdraw()
}

getAllAmountWithdraw() {
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
    this.getAllAmountWithdrawResponse
  )
}
getAllAmountWithdrawResponse = data => {
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
  this.manageAmountWithdraw(values)
}
manageAmountWithdraw = values => {
  setTimeout(() => {
    this.setState({
      buttonAction: false,
    })
    this.manageAmountWithdrawResponse({ statusCode: "200" })
  }, 5000)

  CallService(
     //.get,
     MethodType.GET,
     false,
     listRequestModel,
     "",
     this.manageAmountWithdrawResponse
  )}
manageAmountWithdrawResponse = data => {
  this.setState({
    buttonAction: false,
  })

  if (data.statusCode === StatusCodes.Success) {
    toastr.success(
      "",

      this.props.t("Amount Withdraw Added Successfully")
    )
    this.getAllAmountWithdraw()
  }
}
// handle Submit funciton and api
  render() {
    const INITIALVALUES = this.state.amountWithdraw
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops pb-5">
          <Card className="px-4 pt-4 page-content mb-0 pb-0 mb-5">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t(
                "Amount Withdraw"
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
                validationSchema={amountWithdrawValidation}
                onSubmit={this.handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
              >
                {({ errors, values, setFieldValue }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <Fragment>
                      <Row>
                        <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                          <FormGroup className="position-relative">
                            <Label>
                              {this.props.t("Member No")}
                            </Label>
                            <div className="app-search position-relative pt-0 mt-0 bg-white d-lg-block">
                              <Field
                                type="text"
                                name="memberNo"
                                // onKeyPress={this.enterPressed.bind(this)}
                                //onChange={e => onTextChange(e)}
                                // value={searchValue}
                                className="box-border form-control"
                                placeholder={this.props.t("Search") + "..."}
                              />
                              <span className="bx bx-search-alt"></span>
                            </div>
                            {errors.memberNo && (
                              <div className="invalid-feedback d-block">
                                {errors.memberNo}
                              </div>
                            )}        </FormGroup>
                        </Col>

                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                          <FormGroup className="position-relative">
                            <Label>
                              {this.props.t("Account No")}
                            </Label>
                            <div className="app-search position-relative pt-0 mt-0 bg-white d-lg-block">
                              <Field
                                type="text"
                                name="accountNo"
                                // onKeyPress={this.enterPressed.bind(this)}
                                //onChange={e => onTextChange(e)}
                                // value={searchValue}
                                className="box-border form-control"
                                placeholder={this.props.t("Search") + "..."}
                              />
                              <span className="bx bx-search-alt"></span>
                            </div>
                            {errors.accountNo && (
                              <div className="invalid-feedback d-block">
                                {errors.accountNo}
                              </div>
                            )}  
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pr-4 pl-4 mt-2"></Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pr-4 pl-4 mt-2">
                          <Label> 
                          <h4 className="mt-2 pt-2">
                            {this.props.t("Available Balance")} : {this.state.amountWithdraw.availableBalance}
                          </h4> </Label>
                         
                        </Col>
                       
                      </Row>
                      <div className ="mt-2">
                 
                          
                        <h4 className="mt-2 pt-2 pr-4 page-content">
                        {this.props.t("Available Transaction Details")}   
                          </h4>
                        
                      
                                             <ListPage

                                             pagination="empty"
                                             
                                columns={this.state.columns}
                                data={this.state.data}
                                keyField={this.state.keyField}
                                totalCount={this.state.totalCount}
                                // rowClicked={this.handleRowClicked}
                                
                                isDataLoading={this.state.isLoading}
                                overFlowXRemoval={true}
                              />
                              </div>
                              <Row>
                             
                        <Col xs="12" sm="12" md="12" lg={12} className="pr-4 mt-1"> 
                        <h4 className="mt-2 pt-2 page-content">
                        {this.props.t("WithDrawal Details")}   
                          </h4>
                        
                    
                    </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-0">
                          <FormGroup className="position-relative">
                            <Label className="requiredField">
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
                            )}        </FormGroup>
                        </Col>

                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-0">
                          <FormGroup className="position-relative">
                            <Label className="requiredField">
                              {this.props.t("Amount")}
                            </Label>
                            
                              <Field
                                type="number"
                                name="amount"
                                
                                className="box-border form-control"
                              
                              />
                           
                           
                            {errors.amount && (
                              <div className="invalid-feedback d-block">
                                {errors.amount}
                              </div>
                            )}  
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="mt-4 pl-4">
                          <FormGroup className="position-relative">
                           
                            <DropDown
                              label={this.props.t("Payment Mode")}
                              classNamePrefix="react-select"
                              className="react-select"
                              name="paymentMode"
                              isSearchable
                              options={this.state.paymentMode}
                              //options={this.state.paymentModeList} // master data
                              placeholderText={this.props.t("Please Select")}
                              Checkbox={false}
                              Action={e => {
                                setFieldValue("paymentMode", e.value)
                              }}
                            />
                            
                             
                           
                           
                            {errors.paymentMode && (
                              <div className="invalid-feedback d-block">
                                {errors.paymentMode}
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

                          <Button color="danger"  className="mr-5 ml-2" onClick={this.handleCancel}>
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

export default withTranslation()(AmountWithdraw)
