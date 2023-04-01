import React, { Component, Fragment } from "react"
import ListPageHeader from "../../components/custom/ListPageHeader"
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
import { employeeLeaveValidation } from "../../helpers/validations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { Formik, Form, Field } from "formik"

import { withTranslation } from "react-i18next"

class EmployeeLeave extends Component {
  constructor(props) {
    super(props)

    this.state = {
      buttonAction: false,
      isLoading: false,
      pageSizeOptions: [10, 50, 100],
      pageLimit: 10,
      totalCount: 0,
      keyField: "_id",
      
      employeeLeave: {
        name: "",
        employeeId: "",
        designation: "",
        leaveType: "",
        startDate: "",
        endDate: "",
        numberOfLeaves: "",
        reasonForLeave: "",
      },
      leaveType: [{ label: "Sick Leave", value: "Sick Leave" }],
    }
  }

  //Master Data
  getAllLeaveType() {
    CallService(
      //leaveType.ForAdmin,
      MethodType.POST,
      false,
      { pageNumber: 1, pageLimit: 10000 },
      "",
      this.getAllLeaveTypeResponse
    )
  }

  getAllLeaveTypeResponse = data => {
    if (data.result) {
      this.setState({
        leaveTypeList: data.result.map(function (a) {
          return { value: a._id, label: a.Name }
        }),
      })
    }
  }
  // master Data end

  

  //Cancel function start

  handleCancel = () => {
    toastr.success("", this.props.t("Cancel"))
  }
  //cancel funciton end
//start Api handle sunbmit

  componentDidMount() {}

  handleSubmit = values => {
    console.log(values)
    this.setState({
      buttonAction: true,
    })
    this.manageEmployeeLeave(values)
  }
  manageEmployeeLeave = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageEmployeeLeaveResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      // .Create,
      MethodType.PUT,
      false,
      values,
      "",
      this.manageEmployeeLeaveResponse
    )
  }
  manageEmployeeLeaveResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(this.props.t("Employee Leave Added Successfully"))
    }
  }// handle Submit funciton and api

  render() {
    const INITIALVALUES = this.state.employeeLeave
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops pb-5">
          <Card className=" px-4 pt-4 page-content mb-0 pb-0 mt-5 mb-5">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t("Apply Leave")}`}
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
                validationSchema={employeeLeaveValidation}
                onSubmit={this.handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
              >
                {({ errors, values, setFieldValue }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <Fragment>
                      <Row>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative">
                            <Label className="requiredField">
                              {this.props.t("Name")}
                            </Label>

                            <Field
                              type="text"
                              name="name"
                              className="box-border form-control"
                            />

                            {errors.name && (
                              <div className="invalid-feedback d-block">
                                {errors.name}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative">
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
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative">
                            <Label className="requiredField">
                              {this.props.t("Designation")}
                            </Label>

                            <Field
                              type="text"
                              name="designation"
                              className="box-border form-control"
                            />

                            {errors.designation && (
                              <div className="invalid-feedback d-block">
                                {errors.designation}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative">
                            <DropDown
                              label={this.props.t("Leave Type")}
                              classNamePrefix="react-select"
                              className="react-select"
                              name="leaveType"
                              isSearchable
                              options={this.state.leaveType}
                              //options={this.state.leaveTypeList} // master data
                              placeholderText={this.props.t("Please Select")}
                              Checkbox={false}
                              Action={e => {
                                setFieldValue("leaveType", e.value)
                              }}
                            />
                            {errors.leaveType && (
                              <div className="invalid-feedback d-block pl-1">
                                {errors.leaveType}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("Start Date")}
                            </Label>

                            <DatePicker
                              isClearable={true}
                              components={{ Input: CustomSelectInput }}
                              className="form-control box-border"
                              selectsStart
                              selected={this.state.startDate}
                              onChange={date => {
                                setFieldValue("startDate", date)
                                if (date)
                                  this.setState({
                                    startDate: date,
                                  })
                                else
                                  this.setState({
                                    startDate: "",
                                  })
                              }}
                              placeholderText={this.props.t("Select Date")}
                              dateFormat="dd/MM/yyyy"
                            />

                            {errors.startDate && (
                              <div className="invalid-feedback d-block">
                                {errors.startDate}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("End Date")}
                            </Label>

                            <DatePicker
                              isClearable={true}
                              components={{ Input: CustomSelectInput }}
                              className="form-control box-border"
                              selectsStart
                              selected={this.state.endDate}
                              onChange={date => {
                                setFieldValue("endDate", date)
                                if (date)
                                  this.setState({
                                    endDate: date,
                                  })
                                else
                                  this.setState({
                                    endDate: "",
                                  })
                              }}
                              placeholderText={this.props.t("Select Date")}
                              dateFormat="dd/MM/yyyy"
                            />

                            {errors.endDate && (
                              <div className="invalid-feedback d-block">
                                {errors.endDate}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative">
                            <Label className="requiredField">
                              {this.props.t("Number Of Leaves")}
                            </Label>

                            <Field
                              type="number"
                              name="numberOfLeaves"
                              className="box-border form-control"
                            />

                            {errors.numberOfLeaves && (
                              <div className="invalid-feedback d-block">
                                {errors.numberOfLeaves}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative">
                            <Label className="requiredField">
                              {this.props.t("Reason For Leave")}
                            </Label>

                            <Field
                              type="text"
                              name="reasonForLeave"
                              className="box-border form-control"
                            />

                            {errors.reasonForLeave && (
                              <div className="invalid-feedback d-block">
                                {errors.reasonForLeave}
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

export default withTranslation()(EmployeeLeave)
