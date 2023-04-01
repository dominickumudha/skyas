import React, { Component, Fragment } from "react"
import Switch from "@material-ui/core/Switch"
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

import toastr from "toastr"
import "toastr/build/toastr.min.css"

import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { roleValidation } from "../../helpers/validations"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"

import { Formik, Form, Field } from "formik"

import { withTranslation } from "react-i18next"
import { AvForm } from "availity-reactstrap-validation"

class Role extends Component {
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
        sortCondition: { _id: 1 },
        pageNumber: 1,
        pageLimit: 10,
      },

      role: {
        role: "",
        isActive: false,
      },

      data: [
        {
          _id: 1,

          role: "Manager",
          //Action: (
          //<div>
          //<Button
          //size="sm"
          // color="primary"
          //onClick={() => this.toggleManageModal()}
          //>
          // {this.props.t("Edit")}
          //</Button>

          //</div>// <Button className="ml-1"
          // size="sm"
          //color="danger"
          // onClick={() => this.toggleDeleteModal()}
          //>
          //{this.props.t("Delete")}
          //</Button>

          // </div>
          // ),
        },
        {
          _id: 2,

          role: "Asst Manager",
          //Action: (
          //   <div>
          //<Button
          //size="sm"
          //color="primary"
          //onClick={() => this.toggleManageModal()}
          //>
          //{this.props.t("Edit")}
          //</Button>
          //</div><Button className="ml-1"
          //size="sm"
          //color="danger"
          //onClick={() => this.toggleDeleteModal()}
          //>
          // {this.props.t("Delete")}
          //</Button>
          // </div>
          // ),
        },
      ],

      columns: [
        {
          name: this.props.t("Serial No"),

          sortable: false,
          cell: (row, index) => index + 1,
        },
        {
          name: this.props.t("Role"),
          selector: "role",
          sortable: false,
          cell: row => <span>{row.role ? row.role : ""}</span>,
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
  componentDidMount() {
    this.getAllRole()
  }
  getAllRole() {
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
      this.getAllRoleResponse
    )
  }
  getAllRoleResponse = data => {
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
        role: row,
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
        this.getAllRole()
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
        this.getAllRole()
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
          this.getAllRole()
        }
      }
    )
  }
  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageRole(values)
  }
  manageRole = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageRoleResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //values._id ? .Update + values._id : .Create,
      values._id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      this.manageRoleResponse
    )
  }
  manageRoleResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(
        "",
        this.state.role._id
          ? this.props.t("Role Edited Successfully")
          : this.props.t("Role Added Successfully")
      )
      this.getAllRole()
    }
    this.toggleManageModal()
  }

  deleteRole = value => {
    toastr.success("", value, "deleted")
    this.toggleDeleteModal()
  }
  addBtnClick = () => {
    this.toggleManageModal()
  }
  toggleManageModal = () => {
    this.setState({
      role: {},
      manageModal: !this.state.manageModal,
    })
  }
  toggleDeleteModal = row => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      role: row,
    })
  }
  render() {
    const INITIALVALUES = this.state.role
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops">
          <Card className="m-2 px-4 pt-4 mt-3">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t("Role")}`}
              onTextChange={this.searchQueryChanged}
              buttonClick={this.addBtnClick}
              searchValue={this.state.listRequestModel.searchString}
            />
            <ListPage
              columns={this.state.columns}
              data={this.state.data}
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
            {this.props.t("Remove Role")}
          </ModalHeader>

          <AvForm onSubmit={() => this.deleteRole(this.state.role._id)}>
            <ModalBody>
              <Fragment>
                <Row className="mb-4">
                  <Label className="av-label ml-3">
                    <h5>
                      {this.props.t(
                        "Are you sure you want to remove this Role?"
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
            {this.state.role && this.state.role._id
              ? this.props.t("Edit Role")
              : this.props.t("Add Role")}
          </ModalHeader>
          <Formik
            initialValues={INITIALVALUES}
            validationSchema={roleValidation}
            onSubmit={this.handleSubmit}
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
                          {this.props.t("Role")}
                        </Label>
                        <Field className="form-control" name="role" />
                        {errors.role && (
                          <div className="invalid-feedback d-block">
                            {errors.role}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <FormGroup className="position-relative">
                        <Row className="mb-10">
                          <Col lg="3">
                            <Label className="mt-2">
                              {this.props.t("Is Active")}
                            </Label>
                          </Col>
                          <Col lg="9">
                            <Switch
                              className="mt-1"
                              name="isActive"
                              value="Active"
                              color="primary"
                              checked={values.isActive === "Active"}
                              onChange={(event, checked) => {
                                setFieldValue(
                                  "isActive",
                                  checked ? "Active" : "Inactive"
                                )
                              }}
                            />
                             {errors.isActive && (
                          <div className="invalid-feedback d-block">
                            {errors.isActive}
                          </div>
                        )}
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                  </Row>
                </ModalBody>

                <ModalFooter>
                  <FormGroup className="float-sm-right">
                    {this.state.role && this.state.role._id ? (
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

export default withTranslation()(Role)
