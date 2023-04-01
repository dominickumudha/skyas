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
} from "reactstrap"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"

import toastr from "toastr"
import "toastr/build/toastr.min.css"

import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"

import { Formik, Form, Field } from "formik"
import { profileUpdateValidation } from "../../helpers/validations"
import { withTranslation } from "react-i18next"
import { AvForm } from "availity-reactstrap-validation"

class ProfileUpdate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      buttonAction: false,
      isLoading: false,
      pageSizeOptions: [10, 50, 100],
      pageLimit: 10,
      totalCount: 0,
      keyField: "_id",
      listRequestModel: {
        searchString: "",
        sortCondition: null,
        pageNumber: 1,
        pageLimit: 10,
      },
      profileUpdate: {
        name: "",
        emailId: "",
        contactNumber: "",
        address: "",
      },
      profileUpdateList: [
        {
          _id: 1,
          name: "xxxxx",
          contactNumber: "2369854245",
          emailId: "Active@gmail.com",
          address: "fgdgfgdgdggdgdg, sfsfsffsff, thiurbuvanam.",
        },
        {
          _id: 2,
          name: "jjjjj",
          contactNumber: "254245",
          emailId: "ive@gmail.com",
          address: "fgdgfgdgdggdgdg, thiurbuvanam.",
        },
        {
          _id: 3,
          name: "yyyyy",
          contactNumber: "2543535",
          emailId: "Acte@gmail.com",
          address: "sfsfsffsff, thiurbuvanam.",
        },
        {
          _id: 4,
          name: "mmyyy",
          contactNumber: "56523535",
          emailId: "vidhyaa@gmail.com",
          address: "South street, thiurbuvanam.",
        },
      ],
      columns: [
        {
          name: this.props.t("Serial No"),
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
          name: this.props.t("Email Id"),
          selector: "emailId",
          sortable: false,
          cell: row => <span>{row.emailId ? row.emailId : ""}</span>,
        },
        {
          name: this.props.t("Contact Number"),
          selector: "contactNumber",
          sortable: false,
          cell: row => (
            <span>{row.contactNumber ? row.contactNumber : ""}</span>
          ),
        },
        {
          name: this.props.t("Address"),
          selector: "address",
          sortable: false,
          cell: row => <span>{row.address ? row.address : ""}</span>,
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
                className="ml-1"
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
  componentDidMount() {
    this.getAllProfileUpdate()
  }
  getAllProfileUpdate() {
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
      this.getAllProfileUpdateResponse
    )
  }
  getAllProfileUpdateResponse = data => {
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
        this.getAllProfileUpdate()
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
        this.getAllProfileUpdate()
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
          this.getAllProfileUpdate()
        }
      }
    )
  }
  addBtnClick = () => {
    this.toggleManageModal()
  }
  toggleManageModal = () => {
    this.setState({
      profileUpdate: {},
      manageModal: !this.state.manageModal,
    })
  }
  handleRowClicked = row => {
    // console
    if (row) {
      this.setState({
        profileUpdate: row,
        manageModal: !this.state.manageModal,
      })
    }
  }
  toggleDeleteModal = row => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      profileUpdate: row,
    })
  }
  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageProfileUpdate(values)
  }
  manageProfileUpdate = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageProfileUpdateResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //values._id ? .Update + values._id : .Create,
      values._id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      this.manageProfileUpdateResponse
    )
  }
  manageProfileUpdateResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(
        "",
        this.state.profileUpdate._id
          ? this.props.t("Profile Edited Successfully")
          : this.props.t("Profile Added Successfully")
      )
      this.getAllProfileUpdate()
    }
    this.toggleManageModal()
  }

  deleteProfileUpdate = value => {
    toastr.success("", value)
    this.toggleDeleteModal()
  }
  render() {
    const INITIALVALUES = this.state.profileUpdate
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops pb-5">
          <Card className="m-2 px-4 pt-4 mt-3 mb-5">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t(
                "Profile Update"
              )}`}
              onTextChange={this.searchQueryChanged}
              buttonClick={this.addBtnClick}
              searchValue={this.state.listRequestModel.searchString}
            />
            <ListPage
              columns={this.state.columns}
              data={this.state.profileUpdateList}
              keyField={this.state.keyField}
              totalCount={this.state.totalCount}
             // rowClicked={this.handleRowClicked}
              rowsPerPageOnChange={this.handlePerRowsChange}
              pageChange={this.handlePageChange}
              isDataLoading={this.state.isLoading}
              overFlowXRemoval={true}
            />
          </Card>
        </Container>
        <Modal isOpen={this.state.deleteModal} toggle={this.toggleDeleteModal}>
          <ModalHeader toggle={this.toggleDeleteModal}>
            {this.props.t("Remove Profile")}
          </ModalHeader>

          <AvForm
            onSubmit={() =>
              this.deleteProfileUpdate(this.state.profileUpdate._id)
            }
          >
            <ModalBody>
              <Fragment>
                <Row className="mb-4">
                  <Label className="av-label ml-3">
                    <h5>
                      {this.props.t(
                        "Are you sure you want to remove this Profile?"
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
        <Modal isOpen={this.state.manageModal} toggle={this.toggleManageModal}>
          <ModalHeader toggle={this.toggleManageModal}>
            {this.state.profileUpdate && this.state.profileUpdate._id
              ? this.props.t("Edit Profile")
              : this.props.t("Add Profile")}
          </ModalHeader>
          <Formik
            initialValues={INITIALVALUES}
            onSubmit={this.handleSubmit}
            validationSchema={profileUpdateValidation}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ errors, values, setFieldValue }) => (
              <Form className="av-tooltip tooltip-label-bottom">
                <ModalBody>
                  <Row className="mb-10 ml-2 mr-2">
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <FormGroup className="position-relative">
                        <Label className="requiredField mt-1">
                          {this.props.t("Name")}
                        </Label>
                        <Field className="form-control" name="name" />
                        {errors.name && (
                          <div className="invalid-feedback d-block">
                            {errors.name}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <FormGroup className="position-relative">
                        {" "}
                        <Label className="requiredField mt-1">
                          {this.props.t("Email Id")}
                        </Label>
                        <Field
                          className="form-control"
                          name="emailId"
                          type="email"
                        />
                        {errors.emailId && (
                          <div className="invalid-feedback d-block">
                            {errors.emailId}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <FormGroup className="position-relative">
                        <Label className="requiredField mt-1">
                          {this.props.t("Contact Number")}
                        </Label>

                        <Field
                          className="form-control"
                          name="contactNumber"
                          type="number"
                        />
                        {errors.contactNumber && (
                          <div className="invalid-feedback d-block">
                            {errors.contactNumber}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <FormGroup className="position-relative">
                        <Label className="requiredField mt-1">
                          {this.props.t("Address")}
                        </Label>

                        <Field
                          className="form-control"
                          component="textarea"
                          name="address"
                        />
                        {errors.address && (
                          <div className="invalid-feedback d-block">
                            {errors.address}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                </ModalBody>

                <ModalFooter>
                  <FormGroup className="float-sm-right">
                    {this.state.profileUpdate &&
                    this.state.profileUpdate._id ? (
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
                      >
                        {this.props.t("Add")}
                      </Button>
                    )}

                    <Button
                      onClick={() => this.toggleManageModal()}
                      color="danger"
                      className="mr-3 ml-1"
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

export default withTranslation()(ProfileUpdate)
