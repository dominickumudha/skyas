import React, { Component, Fragment } from "react"
import {
  Container,
  Row,
  Col,
  FormGroup,
  Button,
  Label,
  Card,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  CustomInput,
} from "reactstrap"
import JoditEditor from "jodit-react"
//import RichTextEditor from "react-rte"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { CallService } from "../../helpers/servicecall"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { Formik, Form, Field } from "formik"
import { withTranslation } from "react-i18next"
import { AvForm } from "availity-reactstrap-validation"

class CMS extends Component {
  constructor(props) {
    super(props)

    this.state = {
      //value: RichTextEditor.createEmptyValue(),
      editValue: "",
      buttonAction: false,
      isLoading: false,
      isPreview: false,
      pageSizeOptions: [10, 50, 100],
      pageLimit: 10,
      totalCount: 0,
      keyField: "_id",
      cmsList: [],
      listOfImages: [""],

      listRequestModel: {
        searchString: "",
        sortCondition: null,
        pageNumber: 1,
        pageLimit: 10,
      },

      cms: {
        title: "",
        content: "",
        friendlyUrl: "",
        Image: {
          url: "",
        },
      },

      data: [
        {
          _id: 1,
          title: "Faq",
          content: "It is good",
          friendlyUrl: "fgdg/gdfg.com",
          // Action: (
          //  <div>
          //  <Button
          //  size="sm"
          // color="success"
          // onClick={() => this.toggleManageModal()}
          //>
          // {this.props.t("Update")}
          // </Button>
          // <Button
          // className="ml-1"
          //size="sm"
          // color="danger"
          // onClick={() => this.toggleDeleteModal()}
          //>
          // {this.props.t("Delete")}
          //</Button>
          // </div>
          //),
        },
        {
          _id: 2,
          title: "Contact",
          content: "good",
          friendlyUrl: "vishal.com",
        },
        
      ],
      columns: [
        {
          name: this.props.t("Serial No"),

          sortable: false,
          cell: (row, index) => index + 1,
        },
        {
          name: this.props.t("Title"),
          selector: "title",
          sortable: false,
          cell: row => <span>{row.title ? row.title : ""}</span>,
        },
        {
          name: this.props.t("Content"),
          selector: "content",
          sortable: false,
          cell: row => <span>{row.content ? row.content : ""}</span>,
        },
        {
          name: this.props.t("Friendly Url"),
          selector: "friendlyUrl",
          sortable: false,
          cell: row => <span>{row.friendlyUrl ? row.friendlyUrl : ""}</span>,
        },
        {
          name: this.props.t("Action"),
          selector: "action",
          sortable: false,
          cell: row => (
            <Row>
              <Button
                size="sm"
                color="primary"
                onClick={() => this.handleRowClicked(row)}
              >
                {this.props.t("Edit")}
              </Button>
              <Button
                size="sm"
                color="danger"
                className="ml-1"
                onClick={() => this.toggleDeleteModal(row)}
              >
                {this.props.t("Delete")}
              </Button>
            </Row>
          ),
        },
      ],
    }
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
        Values.images = data.result.images
      
        this.manageCms(Values)
      }
    } else {
      toastr.error("", this.props.t("Document upload failed"))
    }
  }
  componentDidMount() {
    this.getAllCms()
  }
  getAllCms() {
    this.setState({
      isLoading: false,
    })
    const { listRequestModel } = this.state
    CallService(
      //.GetAll,
      MethodType.POST,
      false,
      listRequestModel,
      "",
      this.getAllCms
    )
  }
  getAllCmsResponse = data => {
    if (data.pagination && data.result) {
      this.setState({
        isLoading: false,
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        cmsList: data.result,
        totalCount: data.pagination.totalCount,
      })
    } else
      this.setState({
        isLoading: false,
      })
  }
  handleRowClicked = row => {
    var prefillValues = row

    prefillValues.title = row.title
    prefillValues.friendlyUrl = row.friendlyUrl
    //prefillValues.Images = row.Images.length < 0 ? row.Images : [{}];
    prefillValues.images = row.images
    prefillValues.content = row.content
    // prefillValues.content = RichTextEditor.createValueFromString(
    //  row.content,
    //   "html"
    // )
    if (row) {
      this.setState({
        cms: prefillValues,
        // CMS: {
        //   Title: row.Title,
        //   FriendlyUrl: row.FriendlyUrl,
        //   Images: [{}],
        // },
        text: row.content,
        manageModal: !this.state.manageModal,
      })
    }
  }
  handlePageChange = async page => {
    this.setState(
      {
        pageNumber: page,
        listRequestModel: {
          ...this.state.listRequestModel,
          pageNumber: page,
        },
      },
      function () {
        this.getAllCms()
      }
    )
  }

  handlePerRowsChange = async perPage => {
    this.setState(
      {
        pageLimit: perPage,
        pageNumber: 1,
        listRequestModel: {
          ...this.state.listRequestModel,
          pageLimit: perPage,
          pageNumber: 1,
        },
      },
      async function () {
        this.getAllCms()
      }
    )
  }
  searchQueryChanged = search => {
    this.setState(
      {
        listRequestModel: {
          ...this.state.listRequestModel,
          searchString: search.target.value,
        },
      },
      function () {
        if (
          this.state.listRequestModel.searchString === "" ||
          this.state.listRequestModel.searchString.length > 2
        ) {
          this.getAllCms()
        }
      }
    )
  }
  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageCms(values)
  }
  manageCms = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageCmsResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //values._id ? .Update + values._id : .Create,
      values._id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      this.manageCmsResponse
    )
  }
  manageCmsResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(
        "",
        this.state.cms._id
          ? this.props.t("CMS Edited Successfully")
          : this.props.t("CMS Added Successfully")
      )
      this.getAllCms()
    }
    this.toggleManageModal()
  }
  deleteCMS = value => {
    toastr.success("", value, "deleted")
    this.toggleDeleteModal()
  }
  addBtnClick = () => {
    this.toggleManageModal()
  }
  toggleManageModal = () => {
    this.setState({
      cms: {
        title: "",
        content: "",
        friendlyUrl: "",
        images: [
          {
            url: "",
          },
        ],
      },
      text: "",
      defaultTemplateResult: "",
      manageModal: !this.state.manageModal,
      isPreview: false,
    })
  }
  toggleDeleteModal = row => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      cms: row,
    })
  }
  showPreview = () => {
    var templateResult = this.state.text
    templateResult = templateResult.replace(/&lt;/g, "<")
    templateResult = templateResult.replace(/&gt;/g, ">")
    this.setState({
      defaultTemplateResult: templateResult,
    })
    this.setState({
      isPreview: !this.state.isPreview,
    })
  }
  render() {
    const INITIALVALUES = this.state.cms
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops">
          <Card className="m-2 px-4 pt-4 mt-3">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t("CMS")}`}
              match={this.props.match}
              onTextChange={this.searchQueryChanged}
              buttonClick={this.addBtnClick}
              searchValue={this.state.listRequestModel.searchString}
            />
            <ListPage
              columns={this.state.columns}
              data={this.state.data}
              keyField={this.state.keyField}
              totalCount={this.state.totalCount}
              //rowClicked={this.handleRowClicked}
              rowsPerPageOnChange={this.handlePerRowsChange}
              pageChange={this.handlePageChange}
              isDataLoading={this.state.isLoading}
              overFlowXRemoval={true}
            />
          </Card>
        </Container>
        <Modal isOpen={this.state.deleteModal} toggle={this.toggleDeleteModal}>
          <ModalHeader toggle={this.toggleDeleteModal}>
            {this.props.t("Remove Content Management System")}
          </ModalHeader>

          <AvForm onSubmit={() => this.deleteCMS(this.state.cms._id)}>
            <ModalBody>
              <Fragment>
                <Row className="mb-4">
                  <Label className="av-label ml-3">
                    <h5>
                      {this.props.t(
                        "Are you sure you want to remove this CMS?"
                      )}
                    </h5>
                  </Label>
                </Row>
              </Fragment>
            </ModalBody>

            <ModalFooter>
              <FormGroup className="float-sm-right ">
                <Button type="submit" color="primary">
                  {this.props.t("Yes")}
                </Button>
                <Button
                  color="danger"
                  className="ml-2"
                  onClick={() => this.toggleDeleteModal()}
                >
                  {this.props.t("No")}
                </Button>
              </FormGroup>
            </ModalFooter>
          </AvForm>
        </Modal>
        <Modal
          isOpen={this.state.manageModal}
          toggle={this.toggleManageModal}
          size={"lg"}
        >
          <ModalHeader toggle={this.toggleManageModal}>
            {this.state.cms && this.state.cms._id
              ? this.props.t("Edit Content Management System")
              : this.props.t("Add Content Management System")}
          </ModalHeader>

          <Formik
            initialValues={INITIALVALUES}
            //validationSchema={CMSValidation}
            onSubmit={this.handleSubmit}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ errors, values, setFieldValue }) => (
              <Form className="av-tooltip tooltip-label-bottom">
                <ModalBody>
                  <Fragment>
                    <Row className="mb-10 ml-2 mr-2">
                      <Col lg="12">
                        <Label className="mt-1">{this.props.t("Title")}</Label>

                        <Field className="form-control" name="title" />
                        {/*errors.Title && (
                          <div className="invalid-feedback d-block">
                            {errors.Title}
                          </div>
                        )*/}
                      </Col>
                    </Row>
                    {this.state.text && (
                      <Row className="mb-10 mt-2 ml-2">
                        <Col xxs="12">
                          {" "}
                          <Button
                            type="button"
                            color="primary"
                            onClick={this.showPreview}
                          >
                            {this.state.isPreview
                              ? this.props.t("Edit")
                              : this.props.t("Preview")}
                          </Button>
                        </Col>
                      </Row>
                    )}
                    <Row className="mb-10 mt-2 ml-2 mr-2">
                      {this.state.isPreview ? (
                        <div
                          className="ml-3"
                          dangerouslySetInnerHTML={{
                            __html: this.state.defaultTemplateResult,
                          }}
                        ></div>
                      ) : (
                        <Col lg="12">
                          <Label className="mt-1">
                            {this.props.t("Content")}
                          </Label>

                          <JoditEditor
                            ref={this.editorRef}
                            name="content"
                            value={this.state.text}
                            onChange={newContent => {
                              this.setState({ text: newContent })
                              setFieldValue("content", newContent)
                            }}
                          />

                          {errors.content && (
                            <div className="invalid-feedback d-block">
                              {errors.content}
                            </div>
                          )}
                        </Col>
                      )}
                    </Row>
                    <Row className="mb-10 mt-2 ml-2 mr-2">
                      <Col lg="12">
                        <Label className="mt-1">
                          {this.props.t("Friendly Url")}
                        </Label>

                        <Field className="form-control" name="friendlyUrl" />
                        {/*errors.Title && (
                          <div className="invalid-feedback d-block">
                            {errors.Title}
                          </div>
                        )*/}
                      </Col>
                    </Row>
                    <Row className="mt-2 ml-2 mr-2">
                      <Col sm="7">
                        <FormGroup className="position-relative">
                          <Label className="mt-1">
                            {this.props.t("Document")}
                          </Label>
                          {this.state.listOfImages &&
                            this.state.listOfImages.map((lpd, i) => (
                              <Row>
                                <Col
                                  sm="11"
                                  md="11"
                                  lg="11"
                                  xxs="11"
                                  className="mb-2"
                                >
                                  <CustomInput
                                     className="position-sticky"
                                    key={"imageUrl"}
                                    type="file"
                                    name={"image"}
                                    onChange={event => {
                                      setFieldValue(
                                        "image",
                                        event.target.files[0]
                                      )

                                      if (event.target.value) {
                                        var listOfImages = this.state
                                          .listOfImages
                                        if (!listOfImages) {
                                          listOfImages = []
                                        }
                                        listOfImages[i] = event.target.value
                                        this.setState({
                                          listOfImages: listOfImages,
                                        })
                                        setFieldValue(
                                          "listOfImages",
                                          listOfImages
                                        )
                                      }
                                    }}
                                  />
                                  {errors.image && (
                                    <div className="invalid-feedback d-block ml-3">
                                      {errors.image}
                                    </div>
                                  )}
                                  
                                </Col>

                                <Col xxs="1" sm="1" lg="1" md="1">
                                  {i === 0 && (
                                    <Button
                                      color="primary"
                                      onClick={() => {
                                        var listOfImages = this.state
                                          .listOfImages
                                        listOfImages.push("")
                                        this.setState({
                                          listOfImages: listOfImages,
                                        })
                                      }}
                                    >
                                      +
                                    </Button>
                                  )}
                                  {i > 0 && (
                                    <Button
                                      color="primary"
                                      onClick={() => {
                                        var listOfImages = this.state
                                          .listOfImages
                                        listOfImages.splice(i, 1)
                                        this.setState({
                                          listOfImages: listOfImages,
                                        })
                                      }}
                                    >
                                      -
                                    </Button>
                                  )}
                                </Col>
                              </Row>
                            ))}
                        </FormGroup>
                      </Col>
                    </Row>
                  </Fragment>
                </ModalBody>
                <ModalFooter>
                  <FormGroup className="float-sm-right">
                    {this.state.cms && this.state.cms._id ? (
                      <Button
                        className={this.state.buttonAction ? "disabled" : ""}
                        type="submit"
                        color="primary"
                      >
                        {this.props.t("Edit")}
                      </Button>
                    ) : (
                      <Button
                        className={this.state.buttonAction ? "disabled" : ""}
                        type="submit"
                        color="primary"
                        bg="Primary"
                      >
                        {this.props.t("Add")}
                      </Button>
                    )}
                    <Button
                      onClick={() => this.toggleManageModal()}
                      color="danger"
                      className="ml-2 mr-3"
                    >
                      {this.props.t("Cancel")}
                    </Button>
                  </FormGroup>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </Modal>
      </Fragment>
    )
  }
}

export default withTranslation()(CMS)
