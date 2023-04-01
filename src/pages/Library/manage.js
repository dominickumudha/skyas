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
  Table,
  CardTitle,
} from "reactstrap"
import { Tabs, Tab } from "react-bootstrap"
import { CallService } from "../../helpers/servicecall"
import { AvForm } from "availity-reactstrap-validation"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import toastr from "toastr"
import FileDisplay from "../../components/custom/FileDisplay"
import "toastr/build/toastr.min.css"
import { Formik, Form, Field } from "formik"
import { withTranslation } from "react-i18next"
import { values } from "lodash"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import DropDown from "../../common/DropDown"
import Switch from "@material-ui/core/Switch"
import { Rowing } from "@material-ui/icons"
import { BookValidation } from "../../helpers/validations"

class manageLibrary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageSizeOptions: [10, 50, 100],
      pageLimit: 10,
      totalCount: 0,
      Description: "",
      keyField: "_id",
      isLoading: true,
      isPreview: false,
      buttonAction: false,
      update: false,

      ListRequestModel: {
        searchString: "",
        sortCondition: null,
        pageNumber: 1,
        pageLimit: 10,
      },
      manageInitials: {
        refNo: "",
        bookName: "",
        author: "",
        type: "",
        quantity: "",
        copyRight: "",
        edition: "",
        pages: "",
        price: "",
      },
    }
  }
  handleSubmit = () => {}
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
        Values.bookImage = data.result.bookImage
        this.manageLibraryfunc(Values)
      }
    } else {
      toastr.error("", this.props.t("Document upload failed"))
    }
  }
  manageLibraryfunc = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageLibraryfuncResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //values._id ? .Update + values._id : .Create,
      values._id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      this.manageLibraryfuncResponse
    )
  }
  manageLibraryfuncResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(
        "",
        this.state.manageInitials._id
          ? this.props.t("Book Edited Successfully")
          : this.props.t("Book Added Successfully")
      )
      this.getAllLibraryfunc()
    }
    this.toggleManageModal()
  }
  handleCancel = () => {
    this.props.history.push("/library-manage")
  }
  render() {
    const initialValues = this.state.manageInitials
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops pb-5">
          <Card className="p-4 page-content mb-5">
            <CardBody className="mb-0 pb-0">
              <CardTitle>
                <h4 className="mb-2 font-size-18">
                  {this.props.t("Manage Book")}
                </h4>
              </CardTitle>
              <Formik
                initialValues={initialValues}
                onSubmit={this.handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
                validationSchema={BookValidation}
              >
                {({ setFieldValue, values, errors }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <Row className="px-3 mt-2">
                      <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                        <FormGroup className="position-relative">
                          <Label className="requiredField mt-1">
                            {this.props.t("Book Image")}
                          </Label>
                          <CustomInput
                            key={"imageUrl"}
                            type="file"
                            name={"bookImage"}
                            onChange={event => {
                              setFieldValue("bookImage", event.target.files[0])
                            }}
                          />
                          <p className="text-semi-muted">
                            {this.props.t(
                              "Allowed formats are png, jpeg and jpg"
                            )}
                          </p>
                          {errors.bookImage && (
                            <div className="invalid-feedback d-block">
                              {errors.bookImage}
                            </div>
                          )}{" "}
                        </FormGroup>
                      </Col>
                      <Col
                        xs="6"
                        sm="6"
                        md="6"
                        lg={6}
                        className="pr-4 pt-3 mt-2"
                      >
                        <FileDisplay Value={values.bookImage} />
                      </Col>
                    </Row>
                    <Row className="px-3">
                      <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                        <FormGroup className="position-relative">
                          <Label className="requiredField mt-1">
                            {this.props.t("Book Name")}
                          </Label>
                          <Field
                            name="bookName"
                            id="first"
                            placeholder={this.props.t("Book Name")}
                            type="text"
                            className="form-control box-border"
                          />
                          {errors.bookName && (
                            <div className="invalid-feedback d-block ">
                              {errors.bookName}
                            </div>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="px-3">
                      <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                        <FormGroup className="position-relative">
                          <Label className="requiredField mt-1">
                            {this.props.t("Category")}
                          </Label>
                          <Field
                            name="Category"
                            id="first"
                            placeholder={this.props.t("Category")}
                            type="text"
                            className="form-control box-border"
                          />
                          {errors.Category && (
                            <div className="invalid-feedback d-block ">
                              {errors.Category}
                            </div>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="px-3">
                      <Col
                        xs="12"
                        sm="12"
                        md="12"
                        lg="12"
                        xl="12"
                        className="pr-4"
                      >
                        <Tabs defaultActiveKey="Information" transition={false}>
                          <Tab
                            eventKey="Information"
                            title={this.props.t("Information")}
                          ></Tab>
                          <Tab
                            eventKey="BasicInformation"
                            title={this.props.t("Basic Information")}
                          >
                            <Row className="px-3 mt-2">
                              <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                                <FormGroup className="position-relative">
                                  <Label className="requiredField mt-1">
                                    {this.props.t("Reference Number")}
                                  </Label>
                                  <Field
                                    name="refNo"
                                    id="first"
                                    type="number"
                                    className="form-control box-border"
                                  />
                                  {errors.refNo && (
                                    <div className="invalid-feedback d-block ">
                                      {errors.refNo}
                                    </div>
                                  )}
                                </FormGroup>
                              </Col>
                              <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                                <FormGroup className="position-relative">
                                  <Label className="requiredField mt-1">
                                    {this.props.t("Title")}
                                  </Label>
                                  <Field
                                    name="bookName"
                                    id="first"
                                    type="text"
                                    className="form-control box-border"
                                  />
                                  {errors.bookName && (
                                    <div className="invalid-feedback d-block ">
                                      {errors.bookName}
                                    </div>
                                  )}
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row className="px-3">
                              <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                                <FormGroup className="position-relative">
                                  <Label className="requiredField mt-1">
                                    {this.props.t("Publisher")}
                                  </Label>
                                  <Field
                                    name="publisher"
                                    id="first"
                                    type="text"
                                    className="form-control box-border"
                                  />
                                  {errors.publisher && (
                                    <div className="invalid-feedback d-block ">
                                      {errors.publisher}
                                    </div>
                                  )}
                                </FormGroup>
                              </Col>
                              <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                                <FormGroup className="position-relative">
                                  <Label className="requiredField mt-1">
                                    {this.props.t("Author")}
                                  </Label>
                                  <Field
                                    name="author"
                                    id="first"
                                    type="text"
                                    className="form-control box-border"
                                  />
                                  {errors.author && (
                                    <div className="invalid-feedback d-block ">
                                      {errors.author}
                                    </div>
                                  )}
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row className="px-3">
                              <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                                <Label className="mt-1">
                                  {this.props.t("Copy Right")}
                                </Label>
                                <Field
                                  name="copyRight"
                                  id="first"
                                  type="text"
                                  className="form-control box-border"
                                />
                              </Col>
                              <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                                <Label className="requiredField mt-1">
                                  {this.props.t("Price")}
                                </Label>
                                <Field
                                  name="price"
                                  id="first"
                                  type="number"
                                  className="form-control box-border"
                                />
                                {errors.price && (
                                  <div className="invalid-feedback d-block ">
                                    {errors.price}
                                  </div>
                                )}
                              </Col>
                            </Row>
                            <Row className="px-3">
                              <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                                <FormGroup className="position-relative">
                                  <Label className="requiredField mt-1">
                                    {this.props.t("Edition")}
                                  </Label>
                                  <Field
                                    name="edition"
                                    id="first"
                                    type="text"
                                    className="form-control box-border"
                                  />
                                  {errors.edition && (
                                    <div className="invalid-feedback d-block ">
                                      {errors.edition}
                                    </div>
                                  )}
                                </FormGroup>
                              </Col>
                              <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                                <Label className="requiredField mt-1">
                                  {this.props.t("Pages")}
                                </Label>
                                <Field
                                  name="pages"
                                  id="first"
                                  type="number"
                                  className="form-control box-border"
                                />
                                {errors.pages && (
                                  <div className="invalid-feedback d-block ">
                                    {errors.pages}
                                  </div>
                                )}
                              </Col>
                            </Row>
                          </Tab>
                        </Tabs>{" "}
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
                          onClick={() => this.handleCancel()}
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
        </Container>
      </Fragment>
    )
  }
}
export default withTranslation()(manageLibrary)
