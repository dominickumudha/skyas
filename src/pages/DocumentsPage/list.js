import React, { Component, Fragment } from "react"
import {
  Card,
  CardBody,
  Container,
  Col,
  CustomInput,
  Row,
  Button,
  Label,
  FormGroup,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "reactstrap"
import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import Link from "@material-ui/core/Link"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { AvForm } from "availity-reactstrap-validation"
import { DocumentValidationSchema } from "../../helpers/validations"
import { Formik, Form, Field } from "formik"
import { withTranslation } from "react-i18next"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

import { render } from "@testing-library/react"

class Documents extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageSizeOptions: [10, 50, 100],
      pageLimit: 10,
      totalCount: 0,
      Description: "",
      keyField: "_id",
      buttonAction: false,
      update: false,

      ListRequestModel: {
        searchString: "",
        sortCondition: null,
        pageNumber: 1,
        pageLimit: 10,
      },
      actualDocuments: {
        proposalDoc: "",
        certifiedBL: "",
        registrationCert: "",
      },
    }
  }
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
        Values.Photo = data.result.Photo
        this.manageDocumentShare(Values)
      }
    } else {
      toastr.error("", this.props.t("Document upload failed"))
    }
  }

  handleCancel = () => {
    this.setState({
      buttonAction: false,
    })
    toastr.success("", this.props.t("Cancel"))
  }

  manageDocumentShare = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageDocumentShareResponse({ statusCode: "200" })
    }, 1000)
    CallService(
      // .Create,
      MethodType.PUT,
      false,
      values,
      "",
      this.manageDocumentShareResponse()
    )
  }

  manageDocumentShareResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(this.props.t("Document Added Successfully"))
    } else toastr.error("", this.props.t("Something Went Wrong"))
  }

  render() {
    return (
      <Fragment>
        <Card className="border-0 rounded shadow">
          <CardBody className="mb-0 pb-0">
            <Formik
              initialValues={this.state.actualDocuments}
              onSubmit={this.uploadDocuments}
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={DocumentValidationSchema}
            >
              {({ setFieldValue, errors }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <Row className="px-3">
                    <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                      <FormGroup className="position-relative">
                        <Label className="required-field ">
                          {this.props.t("Proposal Document")}
                        </Label>
                        <CustomInput
                          key={"imageUrl"}
                          type="file"
                          name={"proposalDocument"}
                          onChange={event => {
                            setFieldValue(
                              "proposalDocument",
                              event.target.files[0]
                            )
                          }}
                        />

                        {errors.proposalDocument ? (
                          <div className="invalid-feedback d-block">
                            {errors.proposalDocument}
                          </div>
                        ) : null}
                        <p className="text-semi-muted">
                          {this.props.t("Allowed formats are doc,docx and pdf")}
                        </p>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="px-3">
                    <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                      <FormGroup className="absolute-position">
                        <Label className="required-field ">
                          {this.props.t("Certified-By-Law")}
                        </Label>
                        <CustomInput
                          key={"imageUrl"}
                          type="file"
                          name={"certifiedByLaw"}
                          onChange={event => {
                            setFieldValue(
                              "certifiedByLaw",
                              event.target.files[0]
                            )
                          }}
                        />

                        {errors.certifiedByLaw ? (
                          <div className="invalid-feedback d-block">
                            {errors.certifiedByLaw}
                          </div>
                        ) : null}
                        <p className="text-semi-muted">
                          {this.props.t("Allowed formats are doc,docx and pdf")}
                        </p>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="px-3">
                    <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                      <FormGroup className="absolute-position">
                        <Label className="required-field ">
                          {this.props.t("Registration Certificate")}
                        </Label>
                        <CustomInput
                          key={"imageUrl"}
                          type="file"
                          name={"registrationCertificate"}
                          onChange={event => {
                            setFieldValue(
                              "registrationCertificate",
                              event.target.files[0]
                            )
                          }}
                        />

                        {errors.registrationCertificate ? (
                          <div className="invalid-feedback d-block">
                            {errors.registrationCertificate}
                          </div>
                        ) : null}
                        <p className="text-semi-muted">
                          {this.props.t("Allowed formats are doc,docx and pdf")}
                        </p>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="mb-10">
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
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

export default withTranslation()(Documents)
