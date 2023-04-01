import React, { Component, Fragment } from "react"
import {
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
  Col,
  FormGroup,
  ModalFooter,
  Button,
  Container,
} from "reactstrap"
import { Formik, Form, Field } from "formik"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { withTranslation } from "react-i18next"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import DropDown from "../../common/DropDown"
import CustomSelectInput from "../../common/CustomSelectInput"
import { GLAccountsValidation } from "../../helpers/validations"
import { AvForm } from "availity-reactstrap-validation"
import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import Switch from "@material-ui/core/Switch"
import Rating from "react-rating"

class Feedback extends Component {
  constructor(props) {
    super(props)
    this.state = {
      manageModal: false,
      deleteModal: false,
      isLoading: true,
      buttonAction: false,
      pageSizeOptions: [10, 50, 100],
      pageLimit: 10,
      totalCount: 0,
      Ratingvalue: 0,
      ServiceTypeList: [
        { label: "Deposit", value: "Deposit" },
        { label: "EMI", value: "EMI" },
      ],
      accountsGroup: [
        { label: "a", value: "a" },
        { label: "b", value: "b" },
        { label: "c", value: "c" },
      ],
      listRequestModel: {
        searchString: "",
        sortCondition: null,
        pageNumber: 1,
        pageLimit: 10,
      },
      FeedBack: {
        name: "",
        description: "",
        parentGL: "",
        accountHeadName: "",
        accountGroup: "",
        isActive: false,
      },
      FeedBackList: [
        {
          name: "sug",
          description: "yty",
          parentGL: "ufsty",
          accountHeadName: "gh",
          accountGroup: "kjg",
          isActive: "sgdf",
          _id: 1,
        },
        {
          name: "sug",
          description: "yty",
          parentGL: "ufsty",
          accountHeadName: "gh",
          accountGroup: "kjg",
          isActive: "sgdf",
          _id: 2,
        },
      ],
      columns: [
        {
          name: this.props.t("Serial No"),
          selector: "S.No",
          sortable: false,
          cell: row => <span>{row.sortOrder ? row.sortOrder : ""}</span>,
        },

        {
          name: this.props.t("Name"),
          selector: "Name",
          sortable: false,
          cell: row => <span>{row.name ? row.name : ""}</span>,
        },
        {
          name: this.props.t("Member/Employee"),
          selector: "Member",
          sortable: false,
          cell: row => <span>{row.Member ? row.Member : ""}</span>,
        },
        {
          name: this.props.t("Service Type"),
          selector: "ServiceType",
          sortable: false,
          cell: row => <span>{row.Service ? row.Service : ""}</span>,
        },
        {
          name: this.props.t("Rating"),
          selector: "Rating",
          sortable: false,
          cell: row => <span>{row.Rating ? row.Rating : ""}</span>,
        },
        {
          name: this.props.t("Feedback"),
          selector: "isActive",
          sortable: false,
          cell: row => <span>{row.Feedback ? row.Feedback : ""}</span>,
        },
      ],
      keyField: "_id",
    }
  }
  componentDidMount() {
    this.getAllFeedback()
  }
  getAllFeedback() {
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
      this.getAllFeedbackResponse
    )
  }
  getAllFeedbackResponse = data => {
    if (data.pagination && data.result) {
      this.setState({
        isLoading: false,
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        FeedBackList: data.result,
        totalCount: data.pagination.totalCount,
      })
    } else
      this.setState({
        isLoading: false,
      })
  }
  handleEdit = row => {
    if (row) {
      this.setState({
        FeedBack: row,
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
        this.getAllFeedback()
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
        this.getAllFeedback()
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
          this.getAllFeedback()
        }
      }
    )
  }
  toggleDeleteModal = row => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      FeedBack: row,
    })
  }
  addBtnClick = () => {
    this.toggleManageModal()
  }
  toggleManageModal = () => {
    this.setState({
      FeedBack: {},
      manageModal: !this.state.manageModal,
    })
  }
  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageFeedback(values)
  }
  manageFeedback = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageFeedbackResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //values._id ? .Update + values._id : .Create,
      values._id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      this.manageFeedbackResponse
    )
  }
  manageFeedbackResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success("", this.props.t("Feedback Added Successfully"))
      this.getAllFeedback()
    }
    this.toggleManageModal()
  }
  deleteGLAccount = value => {
    toastr.success("", value, "deleted")
    this.toggleDeleteModal()
  }

  render() {
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops">
          <Card className="m-2 p-4">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t(
                "Feedback and Rating"
              )}`}
              onTextChange={this.searchQueryChanged}
              buttonClick={this.addBtnClick}
              searchValue={this.state.listRequestModel.searchString}
            />
            <ListPage
              columns={this.state.columns}
              data={this.state.FeedBackList}
              keyField={this.state.keyField}
              totalCount={this.state.totalCount}
              rowsPerPageOnChange={this.handlePerRowsChange}
              pageChange={this.handlePageChange}
              isDataLoading={this.state.isLoading}
              overFlowXRemoval={true}
            />
          </Card>
        </Container>

        <Modal
          isOpen={this.state.manageModal}
          toggle={this.toggleManageModal}
          size="lg"
        >
          <ModalHeader toggle={this.toggleManageModal}>
            {this.props.t("Add Feedback and Rating")}
          </ModalHeader>
          <Fragment>
            <Formik
              initialValues={this.state.FeedBack}
              onSubmit={this.handleSubmit}
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={GLAccountsValidation}
            >
              {({ setFieldValue, values, errors }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <Card className="border-0 rounded shadow mb-0 ">
                    <CardBody className="pb-0">
                      <Row>
                        <Col xs="12" sm="12" md="12" lg="12" xl="12">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField ">
                              {this.props.t("Name")}
                            </Label>

                            <Field
                              name="name"
                              id="name"
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

                        <Col xs="12" sm="12" md="12" lg="12" xl="12">
                          <Label className="requiredField mt-1">
                            {this.props.t("Member/Employee")}
                          </Label>
                          <FormGroup className="position-relative ml-3">
                            <Row>
                              <input
                                type="radio"
                                id="G1"
                                name="Type"
                                value="Memeber"
                                className="mt-1 ml-2"
                                onChange={() =>
                                  setFieldValue("Gender", "Memeber")
                                }
                              />
                              <label for="G1" className="ml-2">
                                {this.props.t("Member")}
                              </label>
                              <input
                                type="radio"
                                id="G2"
                                name="Type"
                                value="Employee"
                                className="mt-1 ml-2"
                                onChange={() =>
                                  setFieldValue("Gender", "Employee")
                                }
                              />

                              <label for="G2" className="ml-2">
                                {this.props.t("Employee")}
                              </label>
                            </Row>
                            {errors.Gender && (
                              <div className="invalid-feedback d-block">
                                {errors.Gender}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        <Col xs="12" sm="12" md="12" lg="12" xl="12">
                          <FormGroup className="position-relative mt-1">
                            <DropDown
                              classNamePrefix="react-select"
                              className="react-select "
                              name="Service Type"
                              label={this.props.t("Service Type")}
                              isSearchable
                              options={this.state.ServiceTypeList}
                              placeholderText={""}
                              Checkbox={false}
                              Action={e => {
                                setFieldValue("ServiceType", e.value)
                              }}
                              errors={errors.ServiceType}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs="12" sm="12" md="12" lg="12" xl="12">
                          <FormGroup className="position-relative mt-1">
                            <Row>
                              <Col>
                                <Label className="requiredField ">
                                  {this.props.t("Rating")}
                                </Label>
                              </Col>
                            </Row>
                            <Rating
                              {...this.props}
                              className="ml-2"
                              initialRating={this.state.Ratingvalue}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs="12" sm="12" md="12" lg="12" xl="12">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField ">
                              {this.props.t("Feedback")}
                            </Label>
                            <Field
                              name="Feedback"
                              id="Feedback"
                              type="text"
                              component="textarea"
                              className="form-control box-border"
                            />
                            {errors.Feedback && (
                              <div className="invalid-feedback d-block">
                                {errors.Feedback}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                  <ModalFooter>
                    <FormGroup className="float-right ">
                      <Button
                        className={this.state.buttonAction ? "disabled" : ""}
                        type="submit"
                        color="primary"
                      >
                        {this.props.t("Save")}
                      </Button>

                      <Button
                        className="btn singleEvent   ml-2"
                        color="danger"
                        onClick={() => this.toggleManageModal()}
                      >
                        {this.props.t("Cancel")}
                      </Button>
                    </FormGroup>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </Fragment>
        </Modal>
      </Fragment>
    )
  }
}

export default withTranslation()(Feedback)
