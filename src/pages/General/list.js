import React, { Component, Fragment } from "react"
import logo from "../../assets/images/clients/6.png"
import FileDisplay from "../../components/custom/FileDisplay"
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
  CustomInput,
} from "reactstrap"
import DropDown from "../../common/DropDown"
import CustomSelectInput from "../../common/CustomSelectInput"

import toastr from "toastr"
import "toastr/build/toastr.min.css"
import Tooltip from "@material-ui/core/Tooltip"
import { withStyles } from "@material-ui/core/styles"
import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { generalValidation } from "../../helpers/validations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from "moment"
import { withTranslation } from "react-i18next"

import { Formik, Form, Field } from "formik"
import * as Yup from "yup"

class General extends Component {
  constructor(props) {
    super(props)
   
    this.state = {
      

      district: [{ label: "a", value: "a" }],
      taluk: [{ label: "a", value: "a" }],
     states : [{ label: "Tamil Nadu", value: "Tamil Nadu" }],

      buttonAction: false,
    }
  }

  componentDidMount() {}

  handleSubmit = values => {
    console.log(values)
    this.setState({
      buttonAction: true,
    })

    this.manageGeneral(values)
  }
  manageGeneral = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageGeneralResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      // .Create,
      MethodType.PUT,
      false,
      values,
      "",
      this.manageGeneralResponse
    )
  }
  manageGeneralResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(this.props.t("General Added Successfully"))
    }
  }
  handleCancel = () => {
    toastr.success("", this.props.t("Cancel"))
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
        this.manageGeneral(Values)
      }
    } else {
      toastr.error("", this.props.t("Document upload failed"))
    }
  }
  getAllDistict() {
    CallService(
      //district.ForAdmin,
      MethodType.POST,
      false,
      { pageNumber: 1, pageLimit: 10000 },
      "",
      this.getAllDistictResponse
    );
  }

  getAllDistictResponse = (data) => {
    if (data.result) {
      this.setState({
        districtList: data.result.map(function (a) {
          return { value: a._id, label: a.Name };
        }),
      });
    }
  };
  getAllTaluk() {
    CallService(
      //taluk.ForAdmin,
      MethodType.POST,
      false,
      { pageNumber: 1, pageLimit: 10000 },
      "",
      this.getAllTalukResponse
    );
  }

  getAllTalukResponse = (data) => {
    if (data.result) {
      this.setState({
        talukList: data.result.map(function (a) {
          return { value: a._id, label: a.Name };
        }),
      });
    }
  };
 
  render() {
    return (
      <Fragment>
        <Card className="border-0 rounded shadow">
          <CardBody className="mb-0 pb-0">
            <Formik
              initialValues={{}}
              onSubmit={this.handleSubmit}
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={generalValidation}
            >
              {({ setFieldValue, errors, values }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <Row className="px-3">
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField">
                          {this.props.t("Name")}
                        </Label>
                        <Field
                          name="name"
                          //  id="first"
                          type="text"
                          className="form-control box-border"
                        />
                        {errors.name && (
                          <div className="invalid-feedback d-block">
                            {errors.name}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField">
                          {this.props.t("Code")}
                        </Label>
                        <Field
                          name="code"
                          // id="first"
                          type="text"
                          className="form-control box-border"
                        />
                        {errors.code && (
                          <div className="invalid-feedback d-block">
                            {errors.code}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="4" sm="4" md="4" lg={4} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Logo")}
                        </Label>
                        <CustomInput
                           className="position-sticky"
                          key={"imageUrl"}
                          type="file"
                          name={"logo"}
                          onChange={event => {
                            setFieldValue("logo", event.target.files[0])
                          }}
                        />

                        {errors.logo ? (
                          <div className="invalid-feedback d-block">
                            {errors.logo}
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
                  <Col xs="2" sm="2" md="2" lg={2} className="pt-4 mt-2">
                    <FileDisplay Value={values.logo} />
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Door No")}{" "}
                        </Label>

                        <Field
                          name="doorNo"
                          // id="first"
                          type="text"
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
                          // id="first"
                          type="text"
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
                          //id="first"
                          type="text"
                          className="form-control box-border"
                        />

                        {errors.addressLine2 && (
                          <div className="invalid-feedback d-block">
                            {errors.addressLine2}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Pin Code")}
                        </Label>
                        <Field
                          name="pinCode"
                          //id="first"
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

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <DropDown
                          classNamePrefix="react-select"
                          className="react-select"
                          label={this.props.t("District")}
                          name="district"
                          isSearchable
                          options={this.state.district}
                         // options={this.state.districtList} //masterdata
                          placeholderText={""}
                          Checkbox={false}
                          Action={e => {
                            if (e) setFieldValue("district", e.value)
                          }}
                          errors={errors.district}
                        />
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <DropDown
                          classNamePrefix="react-select"
                          className="react-select"
                          name="taluk"
                          label={this.props.t("Taluk")}
                          isSearchable
                          options={this.state.taluk}
                          //options={this.state.talukList}//masterdata
                          placeholderText={""}
                          Checkbox={false}
                          Action={e => {
                            setFieldValue("taluk", e.value)
                          }}
                        />
                        {errors.taluk && (
                          <div className="invalid-feedback d-block">
                            {errors.taluk}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                      <DropDown
                          classNamePrefix="react-select"
                          className="react-select "
                          label={this.props.t("State")}
                          name="NomineeForSharesState"
                          isSearchable
                          value={this.state.states}
                          isDisabled={true}
                          Checkbox={false}
                          Action={e => {
                            setFieldValue("NomineeForSharesState", e.value)
                          }}
                          errors={errors.State}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField">
                          {this.props.t("Union")}
                        </Label>
                        <Field
                          name="union"
                          // id="first"
                          type="text"
                          className="form-control box-border"
                        />
                        {errors.union && (
                          <div className="invalid-feedback d-block">
                            {errors.union}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField">
                          {this.props.t("Contact No")}
                        </Label>
                        <Field
                          name="contactNo"
                          //  id="first"
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.contactNo && (
                          <div className="invalid-feedback d-block">
                            {errors.contactNo}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label>{this.props.t("PAN No")}</Label>
                        <Field
                          name="panNo"
                          // id="first"
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
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField">
                          {this.props.t("TAN No")}
                        </Label>
                        <Field
                          name="tanNo"
                          // id="first"
                          type="text"
                          className="form-control box-border"
                        />
                        {errors.tanNo && (
                          <div className="invalid-feedback d-block">
                            {errors.tanNo}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField">
                          {this.props.t("GSTIN No")}
                        </Label>
                        <Field
                          name="gstinNo"
                          // id="first"
                          type="text"
                          className="form-control box-border"
                        />
                        {errors.gstinNo && (
                          <div className="invalid-feedback d-block">
                            {errors.gstinNo}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
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
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
              </Fragment>
    )
  }
}

export default withTranslation()(General)
