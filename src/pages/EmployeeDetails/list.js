import React, { Component, Fragment } from "react"
import {
  Container,
  Row,
  Col,
  FormGroup,
  Button,
  Label,
  CardBody,
  Card,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  CardTitle,
  
} from "reactstrap"
import DropDown from "../../common/DropDown"
import CustomSelectInput from "../../common/CustomSelectInput"
import { withTranslation } from "react-i18next"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import Tooltip from "@material-ui/core/Tooltip"
import { withStyles } from "@material-ui/core/styles"
import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { employeeDetailValidation } from "../../helpers/validations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form, Field } from "formik"

class EmployeeDetail extends Component {
  state = {
  
    buttonAction: false,
    division :[{label : "a", value : "a"}],
    subDivision : [{label : "a", value : "a"}],

  }
  componentDidMount() {}

  handleSubmit = values => {
    console.log(values)
    this.setState({
      buttonAction: true,
    })
    this.manageEmployeeDetail(values)
  }
  manageEmployeeDetail = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageEmployeeDetailResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      // .Create,
      MethodType.PUT,
      false,
      values,
      "",
      this.manageEmployeeDetailResponse
    )
  }
  manageEmployeeDetailResponse = data => {
     this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(this.props.t("Employee Detail Added Successfully"))
    }
  }
  handleCancel = () => {
    toastr.success("", "Cancel")
  }
   
  render() {
    return (
      <Fragment>
        <Formik
          initialValues={{}}
          onSubmit={this.handleSubmit}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={employeeDetailValidation}
        >
          {({ setFieldValue, errors }) => (
            <Form className="av-tooltip tooltip-label-bottom">
              <Card>
                <CardBody className="mb-0 pb-0">
                  <Row className="px-3">
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Employee Code")}
                        </Label>
                        <Field type="text" name="employeeCode"
                        className="form-control box-border" />
                        
                        {errors.employeeCode && (
                          <div className="invalid-feedback d-block">
                            {errors.employeeCode}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Designation")}
                        </Label>
                        <Field type="text" name="designation" className="form-control box-border" />
                        {errors.designation && (
                          <div className="invalid-feedback d-block">
                            {errors.designation}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("DOJ")}
                        </Label>

                        <DatePicker
                        isClearable={true}
                         components={{ Input: CustomSelectInput }}
                         className="form-control box-border"
                         selectsStart

                  selected={this.state.doj}
                onChange={date => {
                  setFieldValue("doj", date)
                  if (date)
                    this.setState(
                      {
                doj : date
                      })
                      else
                      this.setState(
                        {
                        doj : ""
                        })
                    }}
                
                    
                
                  placeholderText = {this.props.t("Select Date")}
                  dateFormat ="dd/MM/yyyy"
                 />
                       
                        {errors.doj && (
                          <div className="invalid-feedback d-block">
                            {errors.doj}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("DRO")}
                        </Label>
                        <DatePicker
                        isClearable={true}
                         components={{ Input: CustomSelectInput }}
                         className="form-control box-border"
                         selectsStart

                  selected={this.state.dro}
                onChange={date => {
                  setFieldValue("dro", date)
                  if (date)
                    this.setState(
                      {
                dro : date
                      })
                      else
                      this.setState(
                        {
                          dro : ""
                        })
                    }}
                
                    
                
                  placeholderText = {this.props.t("Select Date")}
                  dateFormat="dd/MM/yyyy"
                 />
                        
                        
                        {errors.dro && (
                          <div className="invalid-feedback d-block">
                            {errors.dro}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        

                        <DropDown
                          classNamePrefix="react-select"
                          className="form-control box-border"
                          className="react-select "
                          label={this.props.t("Division")}
                          name="division"
                          isSearchable
                          options={this.state.division}
                          placeholderText={""}
                          Checkbox={false}
                          Action={e => {
                            setFieldValue("division", e.value)
                          }}
                          errors={errors.division}
                        />
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                      
                      <DropDown
                          classNamePrefix="react-select"
                          className="react-select"
                          className="form-control box-border"
                          label={this.props.t("Sub Division")}
                          name="subDivision"
                          isSearchable
                          options={this.state.subDivision}
                          placeholderText={""}
                          Checkbox={false}
                          Action={e => {
                            setFieldValue("subDivision", e.value)
                          }}
                          errors={errors.subDivision}
                        />
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                       
                        <Label className="requiredField mt-1">
                          {this.props.t("Pay Date")}
                        </Label>
                        <DatePicker
                        isClearable={true}
                         components={{ Input: CustomSelectInput }}
                         className="form-control box-border"
                         selectsStart

                  selected={this.state.payDate}
                onChange={date => {
                  setFieldValue("payDate", date)
                  if (date)
                    this.setState(
                      {
                payDate : date
                      })
                      else
                      this.setState(
                        {
                        payDate : ""
                        })
                    }}
                
                    
                
                  placeholderText = {this.props.t("Select Date")}
                  dateFormat="dd/MM/yyyy"
                 />
                        {errors.payDate && (
                          <div className="invalid-feedback d-block">
                            {errors.payDate}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Date of Confirmation")}
                        </Label>

                        <DatePicker
                        isClearable={true}
                         components={{ Input: CustomSelectInput }}
                         className="form-control box-border"
                         selectsStart

                  selected={this.state.dateOfConfirmation}
                onChange={date => {
                  setFieldValue("dateOfConfirmation", date)
                  if (date)
                    this.setState(
                      {
                dateOfConfirmation: date
                      })
                      else
                      this.setState(
                        {
                          dateOfConfirmation : ""
                        })
                    }}
                
                     
                
                  placeholderText = {this.props.t("Select Date")}
                  dateFormat="dd/MM/yyyy"
                 />{errors.dateOfConfirmation && (
                          <div className="invalid-feedback d-block">
                            {errors.dateOfConfirmation}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    </Row>
                  
                 
               
                    <Card className="mt-2" >
                    <div className="ml-4" ><h4>{this.props.t("Salary Details")}</h4></div>
       <CardBody className="border border-muted m-3 mt-1">          
<Row>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Basic")}
                        </Label>
                        <Field
                          name="basic"
                          
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.basic && (
                          <div className="invalid-feedback d-block">
                            {errors.basic}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("D.A")}
                        </Label>
                        <Field
                          name="dA"
                          
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.dA && (
                          <div className="invalid-feedback d-block">
                            {errors.dA}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-1">
                      <FormGroup className="position-relative mt-1">
                      <Label className="requiredField mt-1">
                          {this.props.t("E.A")}
                        </Label>
                        <Field
                          name="eA"
                          
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.eA && (
                          <div className="invalid-feedback d-block">
                            {errors.eA}
                          </div>
                        )}

                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Other Allowances")}
                        </Label>

                        <Field
                          name="otherAllowances"
                          
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.otherAllowances && (
                          <div className="invalid-feedback d-block">
                            {errors.otherAllowances}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                 
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-1">
                      <FormGroup className="position-relative mt-1">
                      <Label className="requiredField mt-1">
                          {this.props.t("Total Pay")}
                        </Label>
                        <Field
                          name="totalPay"
                          
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.totalPay && (
                          <div className="invalid-feedback d-block">
                            {errors.totalPay}
                          </div>
                        )}

                      </FormGroup>
                    </Col>
                  
                
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Net Pay")}
                        </Label>

                        <Field
                          name="netPay"
                          
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.netPay && (
                          <div className="invalid-feedback d-block">
                            {errors.netPay}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    
                  
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Deductions")}
                        </Label>

                        <Field
                          name="deductions"
                          
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.deductions && (
                          <div className="invalid-feedback d-block">
                            {errors.deductions}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
               
               
                  </Row>
                  </CardBody> 
                  </Card>
               
                  <Row className="px-3 mt-1">
                    <Col>
                      <FormGroup className="float-right ">
                        <Button
                          className={this.state.buttonAction ? "disabled" : ""}
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
      </Fragment>
    )
  }
}

export default withTranslation()(EmployeeDetail)
