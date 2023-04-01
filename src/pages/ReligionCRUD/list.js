import React, { Component, Fragment } from "react"
import ReactDOM from "react-dom"
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
import { religionCrudValidation } from "../../helpers/validations"
import { AvForm } from "availity-reactstrap-validation"
import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import Breadcrumbs from "../../components/Common/Breadcrumb"

import { Formik, Form, Field } from "formik"
// import { withTranslation } from "react-i18next"

class religionCRUD extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonAction: false,
      isLoading: false,
      pageSizeOptions: [10, 50, 100],
      pageLimit: 10,
      totalCount: 0,
      keyField: "_id",
      rCrud: {
        name: "",
        description: "",
        userID: "",
        religion: "",
      },
      data: [
        {
          name: "sug",
          description: "yty",
          userID: "gh",
          religion: "kjg",
          _id: 1,
        },
      ],
      rCrud: {
        name: "",
        description: "",
        userID: "",
        religion: "",
      },

      listRequestModel: {
        searchString: "",
        sortCondition: null,
        pageNumber: 1,
        pageLimit: 10,
      },
      columns: [
        {
          name: this.props.t("Serial No"),
          //   selector: "SerialNo",
          sortable: false,
          cell: (row, index) => index + 1,
        },
        {
          name: this.props.t("Name"),
          selector: "name",
          sortable: false,
          cell: row => <span>{row.name ? row.name : ""}</span>,
        },
        {
          name: this.props.t("Description"),
          selector: "description",
          sortable: false,
          cell: row => <span>{row.description ? row.description : ""}</span>,
        },
        {
          name: this.props.t("User ID"),
          selector: "userID",
          sortable: false,
          cell: row => <span>{row.userID ? row.userID : ""}</span>,
        },
        {
          name: this.props.t("Religion"),
          selector: "religion",
          sortable: false,
          cell: row => <span>{row.religion ? row.religion : ""}</span>,
        },
        {
          name: this.props.t("Action"),
          selector: "action",
          sortable: false,
          cell: row => (
            <Row>
              <Button
                size="sm"
                color="primary mr-1"
                className="ml-2"
                onClick={() => this.handleRowClicked(row)}
              >
                {this.props.t("Edit")}
              </Button>
              <Button
                size="sm"
                color="danger"
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

  backBtnClick() {
    this.props.history.push("/")
  }
  componentDidMount() {
    this.getAllReligionCrud()
  }
  getAllReligionCrud() {
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
      this.getAllReligionCrudResponse
    )
  }
  getAllReligionCrudResponse = data => {
    if (data.pagination && data.result) {
      this.setState({
        isLoading: false,
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        data: data.result,
        totalCount: data.pagination.totalCount,
      })
    } else
      this.setState({
        isLoading: false,
      })
  }
  handleRowClicked = row => {
    if (row) {
      this.setState({
        rCrud: row,
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
        this.getReligionCrud()
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
        this.getAllReligionCrud()
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
          this.getAllReligionCrud()
        }
      }
    )
  }
  addBtnClick = () => {
    this.toggleManageModal()
  }
  toggleManageModal = () => {
    this.setState({
      rCrud: {},
      manageModal: !this.state.manageModal,
    })
  }

  toggleDeleteModal = row => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      rCrud: row,
    })
  }
  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageReligionCrud(values)
  }
  manageReligionCrud = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageReligionCrudResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //values._id ? .Update + values._id : .Create,
      values._id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      this.manageReligionCrudResponse
    )
  }
  manageReligionCrudResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(
        "",
        this.state.rCrud._id
          ? this.props.t("User updated successfully")
          : this.props.t("User added successfully")
      )
      this.getAllReligionCrud()
    }
    this.toggleManageModal()
  }
  deleterCrud = values => {
    toastr.success("", values, this.props.t("User Removed Successfully"))
    this.toggleDeleteModal()
  }

  render() {
    const INITIALVALUES = this.state.rCrud
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops">
          <Card className="m-2 p-4">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t(
                "General Religion"
              )}`}
              onTextChange={this.searchQueryChanged}
              buttonClick={this.addBtnClick}
              searchValue={this.state.listRequestModel.searchString}
            />
            <ListPage
              className={"cursor-pointer"}
              columns={this.state.columns}
              data={this.state.data}
              keyField={this.state.keyField}
              totalCount={this.state.totalCount}
              rowsPerPageOnChange={this.handlePerRowsChange}
              rowClicked={this.handleRowClicked}
              pageChange={this.handlePageChange}
              overFlowXRemoval={true}
              onSort={this.handleSort}
              isDataLoading={this.state.isLoading}
            />
          </Card>
        </Container>
        <Modal isOpen={this.state.deleteModal} toggle={this.toggleDeleteModal}>
          <ModalHeader toggle={this.toggleDeleteModal}>
            {this.props.t("Remove Religion Master")}
          </ModalHeader>

          <AvForm onSubmit={() => this.deleterCrud(this.state.rCrud._id)}>
            <ModalBody>
              <Fragment>
                <Row className="mb-4">
                  <Label className="av-label ml-3">
                    <h5>
                      {this.props.t(
                        "Are you sure you want to remove this Master UI?"
                      )}
                    </h5>
                  </Label>
                </Row>
              </Fragment>
            </ModalBody>

            <ModalFooter>
              <FormGroup className="float-sm-right">
                <Button color="primary" type="submit">
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
        <Modal isOpen={this.state.manageModal} toggle={this.toggleManageModal}>
          <ModalHeader toggle={this.toggleManageModal}>
            {this.state.rCrud && this.state.rCrud._id
              ? this.props.t("Edit Master UI")
              : this.props.t("Add Master UI")}
          </ModalHeader>
          <ModalBody>
            <Fragment>
              <Formik
                initialValues={INITIALVALUES}
                validationSchema={religionCrudValidation}
                onSubmit={this.handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
              >
                {({ errors, values, setFieldValue }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <ModalBody>
                      <Fragment>
                        <Row>
                          <Col lg={12}>
                            <FormGroup className="form-group has-float-label">
                              <Label className="requiredField">
                                {this.props.t("Name")}
                              </Label>

                              <Field
                                className="form-control box-border"
                                name="name"
                                id="first"
                                type="text"
                              />
                              {errors.name && (
                                <div className="invalid-feedback d-block ">
                                  {errors.name}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={12}>
                            <FormGroup className="position-relative">
                              <Label className="mt-1">
                                {this.props.t("Description")}
                              </Label>

                              <Field
                                name="description"
                                id="first"
                                component="textarea"
                                type="text"
                                className="form-control box-border"
                              />
                              {errors.description && (
                                <div className="invalid-feedback d-block ">
                                  {errors.description}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={12}>
                            <FormGroup className="form-group has-float-label">
                              <Label className="requiredField">
                                {this.props.t("User ID")}
                              </Label>

                              <Field
                                className="form-control box-border"
                                name="userID"
                              />
                              {errors.userID && (
                                <div className="invalid-feedback d-block ">
                                  {errors.userID}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={12}>
                            <FormGroup className="form-group has-float-label">
                              <Label className="requiredField">
                                {this.props.t("Religion")}
                              </Label>
                              <Field
                                className="form-control box-border"
                                name="religion"
                              />
                              {errors.religion && (
                                <div className="invalid-feedback d-block ">
                                  {errors.religion}
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
                      </Fragment>
                    </ModalBody>
                  </Form>
                )}
              </Formik>
            </Fragment>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
      </Fragment>
    )
  }
}

export default withTranslation()(religionCRUD)
