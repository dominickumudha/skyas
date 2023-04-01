import React, { Component, Fragment } from "react"
import { withTranslation } from "react-i18next"
import {
  Card,
  CardBody,
  Col,
  Row,
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormGroup,
  Label,
  Container,
} from "reactstrap"
import { bankDeetsValidation } from "../../helpers/validations"
import { AvForm } from "availity-reactstrap-validation"
import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import Breadcrumbs from "../../components/Common/Breadcrumb"

import { Formik, Form, Field } from "formik"
import { values } from "lodash"

class BankAccDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonAction: false,
      isLoading: false,
      pageSizeOptions: [10, 50, 100],
      pageLimit: 10,
      totalCount: 0,
      keyField: "_id",
      fieldsInDet: {
        name: "",
        ifsc: "",
        micr: "",
        acNo: "",
        branch: "",
      },
      listRequestModel: {
        searchString: "",
        sortCondition: null,
        pageNumber: 1,
        pageLimit: 10,
      },
    }
  }
  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageBankDetails(values)
  }

  manageBankDetails = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageBankDetailsResponse({ statusCode: "200" })
    }, 1000)
    CallService(
      // .Create,
      MethodType.PUT,
      false,
      values,
      "",
      this.manageBankDetailsResponse()
    )
  }

  manageBankDetailsResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(this.props.t("Account Added Successfully"))
    }
  }
  render() {
    const initialValues = this.state.fieldsInDet
    return (
      <Fragment>
        <Card className="border-0 rounded shadow">
          <CardBody className="mb-0 pb-0">
            <Formik
              initialValues={initialValues}
              onSubmit={this.handleSubmit}
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={bankDeetsValidation}
            >
              {({ setFieldValues, errors }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <Row className="px-3">
                    <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                      <FormGroup className="position-relative">
                        <Label className="requiredField">
                          {this.props.t("Bank Name")}
                        </Label>
                        <Field
                          name="name"
                          id="first"
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
                    <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                      <FormGroup className="position-relative">
                        <Label className="requiredField">
                          {this.props.t("IFSC Code")}
                        </Label>
                        <Field
                          name="ifsc"
                          id="first"
                          type="text"
                          className="form-control box-border"
                        />
                        {errors.ifsc && (
                          <div className="invalid-feedback d-block">
                            {errors.ifsc}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="px-3">
                    <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                      <FormGroup className="position-relative">
                        <Label className="requiredField">
                          {this.props.t("Bank Account Number")}
                        </Label>
                        <Field
                          name="acNo"
                          id="first"
                          type="text"
                          className="form-control box-border"
                        />
                        {errors.acNo && (
                          <div className="invalid-feedback d-block">
                            {errors.acNo}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                      <FormGroup className="position-relative">
                        <Label className="requiredField">
                          {this.props.t("MICR Code")}
                        </Label>
                        <Field
                          name="micr"
                          id="first"
                          type="text"
                          className="form-control box-border"
                        />
                        {errors.micr && (
                          <div className="invalid-feedback d-block">
                            {errors.micr}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="px-3">
                    <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                      <FormGroup className="position-relative">
                        <Label className="requiredField">
                          {this.props.t("Bank Branch")}
                        </Label>
                        <Field
                          name="branch"
                          id="first"
                          type="text"
                          className="form-control box-border"
                        />
                        {errors.branch && (
                          <div className="invalid-feedback d-block">
                            {errors.branch}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Col xs="12" sm="12" md="12" lg="12" xl="12">
                    <FormGroup className="float-right ">
                      <Button
                        className="btn singleEvent  mt-2 mb-3"
                        color="primary"
                        type="submit"
                      >
                        {this.props.t("Save")}
                      </Button>
                      <Button
                        className="btn singleEvent  mt-2 mb-3 ml-4"
                        color="danger"
                        onClick={() => this.toggleManageModal()}
                      >
                        {this.props.t("Cancel")}
                      </Button>
                    </FormGroup>
                  </Col>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Fragment>
    )
  }
}

export default withTranslation()(BankAccDetails)
