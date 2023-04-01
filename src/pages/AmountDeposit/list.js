import React, { Component, Fragment } from "react"
import ListPageHeader from "../../components/custom/ListPageHeader"
import ListPage from "../../components/custom/ListPage"
import {
  Container,
  Input,
  Row,
  Col,
  FormGroup,
  Button,
  Label,
  CardBody,
  Card,
  CardTitle,
  Table,
  ModalFooter,
} from "reactstrap"
import DropDown from "../../common/DropDown"
import CustomSelectInput from "../../common/CustomSelectInput"
import '../../assets/scss/custom.scss'
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { amountDepositValidation } from "../../helpers/validations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form, Field } from "formik"
import { withTranslation } from "react-i18next"

class AmountDeposit extends Component {
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
  amountDeposit: {
        memberNo: "",
      amountNo: "",
        amount: "",
        date : "",
        paymentMode : "",
        total :""
      },
      paymentMode : [{label : "a" , value : "a"}],
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
  this.getAllAmountDeposit()
  
}

getAllAmountDeposit() {
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
    this.getAllAmountDepositResponse
  )
}
getAllAmountDepositResponse = data => {
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
  this.manageAmountDeposit(values)
}
manageAmountDeposit = values => {
  setTimeout(() => {
    this.setState({
      buttonAction: false,
    })
    this.manageAmountDepositResponse({ statusCode: "200" })
  }, 5000)

  CallService(
     //.create,
     MethodType.PUT,
     false,
     listRequestModel,
     "",
     this.manageAmountDepositResponse
  )}
manageAmountDepositResponse = data => {
  this.setState({
    buttonAction: false,
  })

  if (data.statusCode === StatusCodes.Success) {
    toastr.success(
      "",

      this.props.t("Amount Deposit Added Successfully")
    )
    this.getAllAmountDeposit()
  }
}
// handle Submit funciton and api
  render() {
    const INITIALVALUES = this.state.amountDeposit
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops pb-5">
          <Card className="px-4 pt-4 page-content mb-0 pb-0 mb-5">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t(
                "Amount Deposit"
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
                validationSchema={amountDepositValidation}
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
                        <Col xs="12" sm="12" md="12" lg={12} className="pr-4 mt-2 mb-4">  <div> 
                        <h4 className="mb-3 font-size-16">
                        {this.props.t("DEPOSIT DETAILS")}
                          </h4>
                    
                        </div></Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
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

                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
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
                        <Col xs="6" sm="6" md="6" lg={6}  >
                          <FormGroup className="position-relative
                          mr-2">
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
                        <Col xs="12" sm="12" md="12" lg={12} className="pr-4 mt-2 mb-2">  <div> 
                        <h3 className="mb-3 font-size-17">
                        {this.props.t("If cash, denomination details")}
                          </h3>
                    
                        </div></Col>
                        <Col xs="3" sm="3" md="3" lg={3} className="pr-4 mb-4"> 
                      </Col>
                      <Col xs="6" sm="6" md="6" lg={6} className="pr-4  mb-4"> 

                      <Table
                                Striped
                                
                                className="table table-centered table-nowrap mb-0 "
                              >
                                <thead className="thead-light text-center">
                                  <tr>
                                    <th> {this.props.t("Type")}</th>
                                    <th> {this.props.t("Count")}</th>
                                    <th>{this.props.t("Amount")}</th>
                                  
                                  </tr>
                                </thead>
                                <tbody className="text-center">
                                  <tr>
                                    <td>2000 </td>
                                    <td><Field type = "number" name="twoThousand" className="text-center text-secondary borderRemove"
                                     onChange={e => {
                                      setFieldValue(
                                        "twoThousand",
                                        e.target.value
                                      )
                                    }}/> </td>
                                    <td> {(values.twoThousand
                                        ? parseInt(values.twoThousand) * 2000
                                        : "")} </td>
                                 
                                  </tr>
                                  <tr>
                                    <td>500 </td>
                                    <td><Field type = "number" name="fiveHundred" className="text-center text-secondary borderRemove"
                                     onChange={e => {
                                      setFieldValue(
                                        "fiveHundred",
                                        e.target.value
                                      )
                                    }}/> </td>
                                    <td> {(values.fiveHundred
                                        ? parseInt(values.fiveHundred) * 500
                                        : "")} </td>
                                 
                                  </tr>
                                  <tr>
                                    <td>200 </td>
                                    <td><Field type = "number" name="twoHundred" className="text-center text-secondary borderRemove"  onChange={e => {
                                        setFieldValue(
                                          "twoHundred",
                                          e.target.value
                                        )
                                      }}/> </td>
                                    <td> {(values.twoHundred
                                        ? parseInt(values.twoHundred) * 200
                                        : "")} </td>
                                 
                                  </tr>
                                  <tr>
                                    <td>100 </td>
                                    <td><Field type = "number" name="hundred" className="borderRemove text-secondary text-center"
                                     onChange={e => {
                                      setFieldValue(
                                        "hundred",
                                        e.target.value
                                      )
                                    }}/> </td>
                                    <td> {(values.hundred
                                        ? parseInt(values.hundred) * 100
                                        : "")} </td>
                                 
                                  </tr>
                                  <tr>
                                    <td>50 </td>
                                    <td><Field type = "number" name="fifty" className="borderRemove text-secondary text-center"
                                     onChange={e => {
                                      setFieldValue(
                                        "fifty",
                                        e.target.value
                                      )
                                    }}/> </td>
                                    <td> {(values.fifty
                                        ? parseInt(values.fifty) * 50
                                        : "")} </td>
                                 
                                  </tr>
                                  <tr>
                                    <td>20 </td>
                                    <td> <Field type = "number" name="twenty" className="borderRemove text-secondary text-center"
                                     onChange={e => {
                                      setFieldValue(
                                        "twenty",
                                        e.target.value
                                      )
                                    }}/></td>
                                    <td> {(values.twenty
                                        ? parseInt(values.twenty) * 20
                                        : "")}

                                         </td>
                                 
                                  </tr>
                                  <tr>
                                    <td>10 </td>
                                    <td><Field type = "number" name="ten" className="borderRemove text-secondary text-center"
                                     onChange={e => {
                                      setFieldValue(
                                        "ten",
                                        e.target.value
                                      )
                                    }}/></td>
                                    <td>    {(values.ten
                                        ? parseInt(values.ten) * 10
                                        : "")}</td>
                                 
                                  </tr>
                                  

                                  <tr>
                             
                                    <td></td>

                                    <td>
                                      <Label className="mt-1">
                                        {this.props.t("Total")}
                                      </Label>
                                    </td>
                                    <td name="total">
                                    {`${
                                      (values.ten
                                        ? parseInt(values.ten) * 10
                                        : 0) +
                                        (values.twenty
                                          ? parseInt(values.twenty) * 20
                                          : 0) +
                                      (values.fifty
                                        ? parseInt(values.fifty) * 50
                                        : 0) +
                                      (values.hundred
                                        ? parseInt(values.hundred) * 100
                                        : 0) +
                                      (values.twoHundred
                                        ? parseInt(values.twoHundred) * 200
                                        : 0) +
                                      (values.fiveHundred
                                        ? parseInt(values.fiveHundred) * 500
                                        : 0) +
                                      (values.twoThousand
                                        ? parseInt(values.twoThousand) * 2000
                                        : 0)
                                    }`}
                                    </td>
                                  
                                  </tr>
                                </tbody>
                              </Table>
                          
                      </Col>
                      <Col xs="3" sm="3" md="3" lg={3} className="pr-4 mb-4"> 
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

export default withTranslation()(AmountDeposit)
