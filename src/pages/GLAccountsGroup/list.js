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
import Switch from "@material-ui/core/Switch"
import { withTranslation } from "react-i18next"
import ListPageHeader from "components/custom/ListPageHeader"
import ListPage from "components/custom/ListPage"
import AvForm from "availity-reactstrap-validation/lib/AvForm"
import { AccountsGroupValidation } from "../../helpers/validations"
import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
class AccountsGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      manageModal: false,
      deleteModal: false,
      isLoading: false,
      buttonAction: false,
      pageSizeOptions: [10, 50, 100],
      pageLimit: 10,
      totalCount: 0,
      listRequestModel: {
        searchString: "",
        sortCondition: null,
        pageNumber: 1,
        pageLimit: 10,
      },
      accountsGroup: {
        name: "",
        description: "",
        isActive: false,
      },
      accountsGroupList: [
        {
          name: "sug",
          description: "yty",
          isActive: "sgdf",
          _id: 1,
        },
        {
          name: "sug",
          description: "yty",
          isActive: "Active",
          _id: 2,
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
          name: this.props.t("Description"),
          selector: "description",
          sortable: false,
          cell: row => <span>{row.description ? row.description : ""}</span>,
        },
        {
          name: this.props.t("Status"),
          selector: "isActive",
          sortable: false,
          cell: row => <span>{row.isActive ? row.isActive : ""}</span>,
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
                onClick={() => this.handleEdit(row)}
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
  componentDidMount() {
    this.getAllAccountsGroup()
  }
  getAllAccountsGroup() {
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
      this.getAllAccountsGroupResponse
    )
  }
  getAllAccountsGroupResponse = data => {
    if (data.pagination && data.result) {
      this.setState({
        isLoading: false,
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        accountsGroupList: data.result,
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
        accountsGroup: row,
        manageModal: !this.state.manageModal,
      })
    }
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
          this.getAllAccountsGroup()
        }
      }
    )
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
        this.getAllAccountsGroup()
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
        this.getAllAccountsGroup()
      }
    )
  }

  toggleDeleteModal = row => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      accountsGroup: row,
    })
  }
  addBtnClick = () => {
    this.toggleManageModal()
  }
  toggleManageModal = () => {
    this.setState({
      accountsGroup: {},
      manageModal: !this.state.manageModal,
    })
  }
  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageAccountsGroup(values)
  }
  manageAccountsGroup = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageAccountsGroupResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //values._id ? .Update + values._id : .Create,
      values._id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      this.manageAccountsGroupResponse
    )
  }
  manageAccountsGroupResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(
        "",
        this.state.accountsGroup._id
          ? this.props.t("Account Group  Edited Successfully")
          : this.props.t("Account Group Added Successfully")
      )
      this.getAllAccountsGroup()
    }
    this.toggleManageModal()
  }
  deleteAccountsGroup = value => {
    toastr.success("", value)
    this.toggleDeleteModal()
  }
  render() {
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops">
          <Card className="m-2 p-4">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t(
                "Accounts Group"
              )}`}
              onTextChange={this.searchQueryChanged}
              buttonClick={this.addBtnClick}
              searchValue={this.state.listRequestModel.searchString}
            />
            <ListPage
              columns={this.state.columns}
              data={this.state.accountsGroupList}
              keyField={this.state.keyField}
              totalCount={this.state.totalCount}
              rowsPerPageOnChange={this.handlePerRowsChange}
              pageChange={this.handlePageChange}
              isDataLoading={this.state.isLoading}
              overFlowXRemoval={true}
            />
          </Card>
        </Container>
        <Modal isOpen={this.state.deleteModal} toggle={this.toggleDeleteModal}>
          <ModalHeader toggle={this.toggleDeleteModal}>
            {this.props.t("Remove Account Group")}
          </ModalHeader>

          <AvForm
            onSubmit={() =>
              this.deleteAccountsGroup(this.state.accountsGroup._id)
            }
          >
            <ModalBody>
              <Fragment>
                <Row className="mb-4">
                  <Label className="av-label ml-3">
                    <h5>
                      {this.props.t(
                        "Are you sure you want to remove this Accounts Group?"
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
            {this.state.accountsGroup && this.state.accountsGroup._id
              ? this.props.t("Edit Accounts Group")
              : this.props.t("Add Accounts Group")}
          </ModalHeader>
          <Fragment>
            <Formik
              initialValues={this.state.accountsGroup}
              onSubmit={this.handleSubmit}
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={AccountsGroupValidation}
            >
              {({ setFieldValue, values, errors }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <Card className="border-0 rounded shadow mb-0 ">
                    <CardBody className="pb-0">
                      <Row>
                        <Col xs="12" sm="12" md="12" lg="12" xl="12">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField ">
                              {this.props.t("Account Group Name")}
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
                          <FormGroup className="position-relative mt-1">
                            <Label>{this.props.t("Description")}</Label>

                            <Field
                              name="description"
                              id="description"
                              component="textarea"
                              type="text"
                              className="form-control box-border"
                            />
                          </FormGroup>
                        </Col>

                        <Col xs="12" sm="12" md="12" lg="12" xl="12">
                          <FormGroup className="form-group has-float-label mt-1">
                            <Row>
                              <Col lg="4" className="mt-1 pt-2">
                                <Label>{this.props.t("Is Active")}</Label>
                              </Col>
                              <Col>
                                <Switch
                                  name="isActive"
                                  value="Active"
                                  color="primary"
                                  checked={values.isActive === "Active"}
                                  onChange={(event, checked) => {
                                    setFieldValue(
                                      "IsActive",
                                      checked ? "Active" : "Inactive"
                                    )
                                  }}
                                />
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                  <ModalFooter>
                    {" "}
                    <FormGroup className="float-right ">
                      {this.state.accountsGroup &&
                      this.state.accountsGroup._id ? (
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

export default withTranslation()(AccountsGroup)
