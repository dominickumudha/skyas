import React, { Component, Fragment } from "react"
import ListPageHeader from "../../components/custom/ListPageHeader"
import ListPage from "../../components/custom/ListPage"
import DropDown from "../../common/DropDown"
import {
  CustomInput,
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
import { procurementManagementValidation } from "../../helpers/validations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { Formik, Form, Field } from "formik"

import { withTranslation } from "react-i18next"

class ProcurementManagement extends Component {
  constructor(props) {
    super(props)

    this.state = {
      startDate: new Date(),
      buttonAction: false,
    
      procurementManagement: {
     assetName : "",
     category : "",
     assetSerialNo : "",
     assetCost : "",
     datePurchased : "",
     qty : "",
     vendor : "",
     price : "",
     image : "",

      },

    }
  }


  //doucment Upload image 
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
        Values.image = data.result.image
    
        this.manageProcurementManagement(Values)
      }
    } else {
      toastr.error("", this.props.t("Document upload failed"))
    }
  }
  


  //end document image


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
  this.manageProcurementManagement(values)
}
manageProcurementManagement = values => {
  setTimeout(() => {
    this.setState({
      buttonAction: false,
    })
    this.manageProcurementManagementResponse({ statusCode: "200" })
  }, 5000)
  CallService(
    //.Create,
    MethodType.PUT,
    false,
    values,
    "",
    this.manageProcurementManagementResponse
  )
}
manageProcurementManagementResponse = data => {
  this.setState({
    buttonAction: false,
  })

  if (data.statusCode === StatusCodes.Success) {
    toastr.success("", this.props.t("Procurement Management Added Successfully"))
  }
}
//handle Submit end
  render() {
    const INITIALVALUES = this.state.procurementManagement
    return (
      <Fragment >
        <Container fluid className="justify-content-center form-tops pb-5">
          <Card className=" px-4 pt-4 page-content mb-0 pb-0 mt-5 mb-5">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t(
                "Procurement Management"
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
                validationSchema={procurementManagementValidation}
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
                            <Label className="requiredField">{this.props.t("Asset Name")}</Label>
                        <Field type="text" name="assetName" className="box-border form-control" />
                            {errors.assetName && (
                              <div className="invalid-feedback d-block">
                                {errors.assetName}
                              </div>
                            )}
            
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative">
                            <Label className="requiredField">{this.props.t("Category")}</Label>
                        <Field type="text" name="category" className="box-border form-control" />
                            {errors.category && (
                              <div className="invalid-feedback d-block">
                                {errors.category}
                              </div>
                            )}
            
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative">
                            <Label className="requiredField">{this.props.t("Asset Serial No")}</Label>
                        <Field type="text" name="assetSerialNo" className="box-border form-control" />
                            {errors.assetSerialNo && (
                              <div className="invalid-feedback d-block">
                                {errors.assetSerialNo}
                              </div>
                            )}
            
                          </FormGroup>
                        </Col>
                        
                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative">
                            <Label className="requiredField">{this.props.t("Asset Cost")}</Label>
                        <Field type="number" name="assetCost" className="box-border form-control" />
                            {errors.assetCost && (
                              <div className="invalid-feedback d-block">
                                {errors.assetCost}
                              </div>
                            )}
            
                          </FormGroup>
                        </Col>

                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative">
                            <Label className="requiredField">{this.props.t("Date Purchased")}</Label>
                        
                            <DatePicker
                              isClearable={true}
                              components={{ Input: CustomSelectInput }}
                              className="form-control box-border"
                              selectsStart
                              selected={this.state.datePurchased}
                              onChange={date => {
                                setFieldValue("datePurchased", date)
                                if (date)
                                  this.setState({
                                    datePurchased: date,
                                  })
                                else
                                  this.setState({
                                    datePurchased: "",
                                  })
                              }}
                              placeholderText={this.props.t("Select Date")}
                              dateFormat="dd/MM/yyyy"
                            />
                            {errors.datePurchased && (
                              <div className="invalid-feedback d-block">
                                {errors.datePurchased}
                              </div>
                            )}
            
                          </FormGroup>
                        </Col>
                          

                          
                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative">
                            <Label className="requiredField">{this.props.t("Qty")}</Label>
                        <Field type="number" name="qty" className="box-border form-control" />
                            {errors.qty && (
                              <div className="invalid-feedback d-block">
                                {errors.qty}
                              </div>
                            )}
            
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative">
                            <Label className="requiredField">{this.props.t("Vendor")}</Label>
                        <Field type="text" name="vendor" className="box-border form-control" />
                            {errors.vendor && (
                              <div className="invalid-feedback d-block">
                                {errors.vendor}
                              </div>
                            )}
            
                          </FormGroup>
                        </Col>
            

                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative">
                            <Label className="requiredField">{this.props.t("Price")}</Label>
                        <Field type="number" name="price" className="box-border form-control" />
                            {errors.price && (
                              <div className="invalid-feedback d-block">
                                {errors.price}
                              </div>
                            )}
            
                          </FormGroup>
                        </Col>

                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative">
                            <Label>{this.props.t("Item Image")}</Label>
                            <CustomInput
                               className="position-sticky"
                          key={"image"}
                          type="file"
                          name={"image"}
                          onChange={event => {
                            setFieldValue("image", event.target.files[0])
                          }}
                        />
                             {errors.image && (
                              <div className="invalid-feedback d-block">
                                {errors.image}
                              </div>
                            )}
                        <p className="text-semi-muted">
                          {this.props.t(
                             "Allowed formats are jpg, jpeg and png"
                          )}
                          <br />
                          {this.props.t("File Size Must be Less Than 5 Mb")}
                        </p>
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

export default withTranslation()(ProcurementManagement)