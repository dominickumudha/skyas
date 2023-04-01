import React, { Component, Fragment } from "react"

import ListPageHeader from "../../components/custom/ListPageHeader"
import Switch from "@material-ui/core/Switch"
import {
  Container,
  Row,
  Col,
  FormGroup,
  Button,
  Label,
  CardBody,
  Card,
  CustomInput,
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
import { addEmployeesValidation } from "../../helpers/validations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form, Field } from "formik"

class AddEmployees extends Component {
  state = {
    startDate: new Date(),
    buttonAction: false,
    role: [{ label: "1", value: "1" }],
    department: [{ label: "1", value: "1" }],
    designation: [{ label: "1", value: "1" }],
    district: [{ label: "1", value: "1" }],
    state: [{ label: "TamilNadu", value: "TamilNadu" }],
    gender: [
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
      { label: "Transgender", value: "Transgender" },
    ],
    addEmployees : {
employeeId : "",
employeeName  : "",
dob : "",
gender : "",
phoneNo : "",
emailId : "",
maritalStatus : "",
doorNo : "",
addressLine1 : "",
addressLine2 : "",
district : "",
state : "",
pinCode : "",
aadhaarNo : "",
panNo : "",
designation : "",
department : "",
location : "",
doj : "",
role : "",
isActive : "",




    }
  }

//master date Gender
  getAllGender() {
    CallService(
      //gender.ForAdmin,
      MethodType.POST,
      false,
      { pageNumber: 1, pageLimit: 10000 },
      "",
      this.getAllGenderResponse
    );
  }

  getAllGenderResponse = (data) => {
    if (data.result) {
      this.setState({
        genderList: data.result.map(function (a) {
          return { value: a._id, label: a.Name };
        }),
      });
    }
  };
// master  data end Gender 



//master date district
getAllDistrict() {
    CallService(
      //district.ForAdmin,
      MethodType.POST,
      false,
      { pageNumber: 1, pageLimit: 10000 },
      "",
      this.getAllDistrictResponse
    );
  }

  getAllDistrictResponse = (data) => {
    if (data.result) {
      this.setState({
        districtList: data.result.map(function (a) {
          return { value: a._id, label: a.Name };
        }),
      });
    }
  };
// master  data end district


//master date State
getAllState() {
    CallService(
      //state.ForAdmin,
      MethodType.POST,
      false,
      { pageNumber: 1, pageLimit: 10000 },
      "",
      this.getAllStateResponse
    );
  }

  getAllStateResponse = (data) => {
    if (data.result) {
      this.setState({
        stateList: data.result.map(function (a) {
          return { value: a._id, label: a.Name };
        }),
      });
    }
  };
// master  data end state
//master date department
getAllDepartment() {
    CallService(
      //department.ForAdmin,
      MethodType.POST,
      false,
      { pageNumber: 1, pageLimit: 10000 },
      "",
      this.getAllDepartmentResponse
    );
  }

  getAllDepartmentResponse = (data) => {
    if (data.result) {
      this.setState({
        departmentList: data.result.map(function (a) {
          return { value: a._id, label: a.Name };
        }),
      });
    }
  };
// master  data end department


//master date designation
getAllDesignation() {
    CallService(
      //designation.ForAdmin,
      MethodType.POST,
      false,
      { pageNumber: 1, pageLimit: 10000 },
      "",
      this.getAllDesignationResponse
    );
  }

  getAllDesignationResponse = (data) => {
    if (data.result) {
      this.setState({
        designationList: data.result.map(function (a) {
          return { value: a._id, label: a.Name };
        }),
      });
    }
  };
// master  data end designation


//master date Role
getAllRole() {
    CallService(
      //role.ForAdmin,
      MethodType.POST,
      false,
      { pageNumber: 1, pageLimit: 10000 },
      "",
      this.getAllRoleResponse
    );
  }

  getAllRoleResponse = (data) => {
    if (data.result) {
      this.setState({
        roleList: data.result.map(function (a) {
          return { value: a._id, label: a.Name };
        }),
      });
    }
  };
// master  data end Role
  componentDidMount() {

    const { id } = this.props.match.params

    if (id) {
      this.getOneEmployee(id)
      this.setState({
        title: this.props.t("Edit Employee"),
        updateId: id,
      })
    } else {
      this.setState({
        title: this.props.t("Add Employee"),
      })
    }
    this.getAllEmployee()
  
  }
  getOneEmployee(id) {
    CallService(
      //employee.GetOne + id,
      MethodType.GET,
      false,
      "",
      "",
      this.getOneEmployeeResponse
    )
  }

  getOneEmployeeResponse = data => {
    if (data.result) {
      this.setState({
        addEmployees : data.result,
      })
    }
  }

  getAllEmployee() {
    CallService(
      //employeeNew.GetAll,
      MethodType.GET,
      false,
      "",
      "",
      this.getAllEmployeeResponse
    )
  }
  getAllEmployeeResponse = data => {
    if (data.result) {
      this.setState({
        data : data.result.map(function (a) {
          return { value: a._id, label: a.Name }
        }),
      })
    }
  }

  handleBack = () => {
    this.props.history.push("/employees")
  }

  handleSubmit = values => {
    this.setState({
      addEmployees: values,
    })
    this.manageEmployee(values)
  }

 

  manageEmployee = values => {
    console.log(values)
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
    }, 5000)
    CallService(
      //values._id ? addEmployees.Update + values._id : addEmployees.Create,
      values._id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      this.manageEmployeeResponse
    )
  }
  manageEmployeeResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(
        "",
        this.state.addEmployees._id
          ? this.props.t("Employee Edited Successfully")
          : this.props.t("Employee Added Successfully")
      )
      this.handleBack()
    }
  }
  handleCancel = () => {
    toastr.success("", this.props.t("Cancel"))
  }
  render() {
      const INITIALVALUES = this.state.addEmployees
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops pb-5">
          <Card className="m-2 px-4 pt-4 mt-3 mb-5">
     
          <div className="mt-4"><span className="h5 ml-4">{this.state.title}</span><Button color="primary" onClick={this.handleBack} className="float-right mr-5 ml-5">{this.props.t("Back")}</Button></div>
     
            <Formik
              initialValues={INITIALVALUES}
              onSubmit={this.handleSubmit}
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={addEmployeesValidation}
            >
              {({ values, setFieldValue, errors }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <Card>
                    <CardBody className="mb-0 pb-0">
                      <Row className="px-3">
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-2">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField">
                              {this.props.t("Employee Id")}
                            </Label>
                            <Field
                              type="text"
                              name="employeeId"
                              className="box-border form-control"
                            />
                            {errors.employeeId && (
                              <div className="invalid-feedback d-block">
                                {errors.employeeId}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-2">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField">
                              {this.props.t("Employee Name")}
                            </Label>
                            <Field
                              type="text"
                              name="employeeName"
                              className="box-border form-control"
                            />
                            {errors.employeeName && (
                              <div className="invalid-feedback d-block">
                                {errors.employeeName}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField mt-1">
                              {this.props.t("Date Of Birth")} (DOB)
                            </Label>
                            <DatePicker
                              name="dob"
                              startDate={this.state.startDateTime}
                              selectsStart
                              endDate={this.state.endDateTime}
                              components={{
                                Input: CustomSelectInput,
                              }}
                              className="form-control"
                              selected={values.dob ? new Date(values.dob) : ""}
                              isClearable={true}
                              onChange={date => {
                                setFieldValue("dob", date)
                              }}
                              placeholderText="Select Date"
                              dateFormat="dd/MM/yyyy"
                            />
                            {errors.dob && (
                              <div className="invalid-feedback d-block">
                                {errors.dob}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                       

                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-1">
                          <FormGroup className="position-relative mt-1">
                            <DropDown
                              classNamePrefix="react-select"
                              className="react-select "
                              label={this.props.t("Gender")}
                              name="gender"
                              isSearchable
                             // options={this.state.genderList}  //master data
                              options={this.state.gender}
                              placeholderText={""}
                              Checkbox={false}
                              Action={e => {
                                setFieldValue("gender", e.value)
                              }}
                              errors={errors.gender}
                            />
                          </FormGroup>
                        </Col>

                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField mt-1">
                              {this.props.t("Phone Number")}
                            </Label>

                            <Field
                              name="phoneNo"
                          //    id="phoneNo"
                              type="number"
                              className="form-control box-border"
                            />
                            {errors.phoneNo && (
                              <div className="invalid-feedback d-block">
                                {errors.phoneNo}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField mt-1">
                              {this.props.t("Email Id")}
                            </Label>
                            <Field
                              name="emailId"
                              type="email"
                              //id="Email"
                              className="form-control box-border"
                            />
                            {errors.emailId && (
                              <div className="invalid-feedback d-block">
                                {errors.emailId}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-3 pt-4">
                        <Label className="requiredField mt-1">
                          {this.props.t("Marital Status")}
                        </Label>
                        <input
                          type="radio"
                     
                          name="maritalStatus"
                          value="Married"
                          className="mt-1 ml-4"
                          onChange={() => setFieldValue("maritalStatus", "Married")}
                        />
                        <label for="G1" className="ml-2">
                          {this.props.t("Married")}
                        </label>
                        <input
                          type="radio"
                         // id="G2"
                          name="maritalStatus"
                          value="UnMarried"
                          className="mt-1 ml-2"
                          onChange={() => setFieldValue("maritalStatus", "UnMarried")}
                        />
                        <label for="G2" className="ml-2">
                          {this.props.t("UnMarried")}
                        </label>
                        {errors.maritalStatus && (
                          <div className="invalid-feedback d-block">
                            {errors.maritalStatus}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField mt-1">
                              {this.props.t("Door No")}
                            </Label>
                            <Field
                              name="doorNo"
                              type="text"
                              //id="Email"
                              className="form-control box-border"
                            />
                            {errors.doorNo && (
                              <div className="invalid-feedback d-block">
                                {errors.doorNo}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField mt-1">
                              {this.props.t("Address Line 1")}
                            </Label>
                            <Field
                              name="addressLine1"
                              type="text"
                              //id="Email"
                              className="form-control box-border"
                            />
                            {errors.addressLine1 && (
                              <div className="invalid-feedback d-block">
                                {errors.addressLine1}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                    
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative mt-1">
                            <Label className="mt-1">
                              {this.props.t("Address Line 2")}
                            </Label>
                            <Field
                              name="addressLine2"
                              type="text"
                              //id="Email"
                              className="form-control box-border"
                            />
                                {errors.addressLine2 && (
                              <div className="invalid-feedback d-block">
                                {errors.addressLine2}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                    
                        
                        
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-1">
                          <FormGroup className="position-relative mt-1">
                            <DropDown
                              classNamePrefix="react-select"
                              className="react-select "
                              label={this.props.t("District")}
                              name="district"
                              isSearchable
                              //options={this.state.districtList} //master data
                              options={this.state.district}
                              placeholderText={""}
                              Checkbox={false}
                              Action={e => {
                                setFieldValue("district", e.value)
                              }}
                              errors={errors.district}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-1">
                          <FormGroup className="position-relative mt-1">
                            <DropDown
                              classNamePrefix="react-select"
                              className="react-select "
                              label={this.props.t("State")}
                              name="state"
                              isSearchable
                              //options={this.state.stateList} //master data
                              options={this.state.state}
                              placeholderText={""}
                              Checkbox={false}
                              Action={e => {
                                setFieldValue("state", e.value)
                              }}
                              errors={errors.state}
                            />
                          </FormGroup>
                        </Col>


                      
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                          <FormGroup className="position-relative mt-1">
                            <Label className=" mt-1">
                              {this.props.t("Pin Code")}
                            </Label>

                            <Field
                              name="pinCode"
                              type="number"
                              className="form-control box-border"
                            />
                            {errors.pinCode && (
                              <div className="invalid-feedback d-block">
                                {errors.pinCode}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField mt-1">
                              {this.props.t("Aadhaar Number")}
                            </Label>

                            <Field
                              name="aadhaarNo"
                              type="number"
                              className="form-control box-border"
                            />
                            {errors.aadhaarNo && (
                              <div className="invalid-feedback d-block">
                                {errors.aadhaarNo}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                       
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField mt-1">
                              {this.props.t("PAN Number")}
                            </Label>

                            <Field
                              name="panNo"
                              type="text"
                              className="form-control box-border"
                            />
                            {errors.panNo && (
                              <div className="invalid-feedback d-block">
                                {errors.panNo}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 "></Col>
                        <Col xs="6" sm="6" md="6" lg={6}>
                          <h4 className="mt-2 pt-2 pl-2 mb-4">
                            {this.props.t("Job Details")}:
                          </h4>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 "></Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-1">
                          <FormGroup className="position-relative mt-1">
                            <DropDown
                              classNamePrefix="react-select"
                              className="react-select "
                              label={this.props.t("Department")}
                              name="department"
                              isSearchable
                              //options={this.state.departmentList} //master data
                              options={this.state.department}
                              placeholderText={"Please Select"}
                              Checkbox={false}
                              Action={e => {
                                setFieldValue("department", e.value)
                              }}
                              errors={errors.department}
                            />
                          </FormGroup>
                        </Col>
                    
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-1">
                          <FormGroup className="position-relative mt-1">
                            <DropDown
                              classNamePrefix="react-select"
                              className="react-select "
                              label={this.props.t("Designation")}
                              name="designation"
                              isSearchable
                              //options={this.state.designationList} //master data
                              options={this.state.designation}
                              placeholderText={"Please Select"}
                              Checkbox={false}
                              Action={e => {
                                setFieldValue("designation", e.value)
                              }}
                              errors={errors.designation}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField mt-1">
                              {this.props.t("Location")}
                            </Label>

                            <Field
                              name="location"
                              type="text"
                              className="form-control box-border"
                            />
                            {errors.location && (
                              <div className="invalid-feedback d-block">
                                {errors.location}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField mt-1">
                              {this.props.t("Date Of Joining")} (DOJ)
                            </Label>
                            <DatePicker
                              name="doj"
                              startDate={this.state.startDateTime}
                              selectsStart
                              endDate={this.state.endDateTime}
                              components={{
                                Input: CustomSelectInput,
                              }}
                              className="form-control"
                              selected={values.doj ? new Date(values.doj) : ""}
                              isClearable={true}
                              onChange={date => {
                                setFieldValue("doj", date)
                              }}
                              placeholderText={this.props.t("Select Date")}
                              dateFormat="dd/MM/yyyy"
                            />
                            {errors.doj && (
                              <div className="invalid-feedback d-block">
                                {errors.doj}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-1">
                          <FormGroup className="position-relative mt-1">
                            <DropDown
                              classNamePrefix="react-select"
                              className="react-select "
                              label={this.props.t("Role")}
                              name="role"
                              isSearchable
                              //options={this.state.roleList} //master data
                              options={this.state.role}
                              placeholderText={"Please Select"}
                              Checkbox={false}
                              Action={e => {
                                setFieldValue("role", e.value)
                              }}
                              errors={errors.role}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-1">
                            <Label className="mt-4 pt-3 pl-1">{this.props.t("Is Active")}</Label>
                            <Switch
                              className="ml-5"
                              name="isActive"
                              value="Active"
                              color="primary"
                              checked={values.isActive === "Active"}
                              onChange={(event, checked) => {
                                setFieldValue(
                                  "isActive",
                                  checked ? "Active" : "Inactive"
                                )
                              }}
                            />
                             {errors.isActive && (
                          <div className="invalid-feedback d-block">
                            {errors.isActive}
                          </div>
                        )}
                          </Col>
                      </Row>


                      <Row className="px-3 mt-2">
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

export default withTranslation()(AddEmployees)
