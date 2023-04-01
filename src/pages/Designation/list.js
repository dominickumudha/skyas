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
} from "reactstrap"
import { CallService } from "../../helpers/servicecall"
import { AvForm } from "availity-reactstrap-validation"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { Formik, Form, Field } from "formik"
import { withTranslation } from "react-i18next"
import { values } from "lodash"
import ListPage from "../../components/custom/ListPage"
import { designationValidation } from "../../helpers/validations"
import ListPageHeader from "../../components/custom/ListPageHeader"
import DropDown from "../../common/DropDown"
import Switch from "@material-ui/core/Switch"

class designation extends Component {
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
      designationInitials: {
        designation: "",
        description: "",
        isActive: false,
      },
      data: [
        {
          designation: "Builder",
          description: "House builder ",
          isActive: "Active",
          _id: 1,
        },
        {
          designation: "Plastic Manufacturer",
          description: "Manufacture",
          isActive: "Inactive",
          _id: 2,
        },
      ],
      columns: [
        {
          name: this.props.t("Designation"),
          selector: "designation",
          sortable: false,
          cell: row => <span>{row.designation ? row.designation : ""}</span>,
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
                onClick={() => this.handleRowClicked(row)}
              >
                {this.props.t("Edit")}
              </Button>
              <Button
                size="sm"
                color="danger mr-1"
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
  getAllDesignations = () => {
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
      this.getAllDesignationsResponse
    )
  }
  getAllDesignationsResponse = data => {
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
  addBtnClick = () => {
    this.toggleManageModal()
  }
  handleSubmit = () => {
    this.state.designationInitials && this.state.designationInitials._id
      ? toastr.success("", `${this.props.t("Designation Edited Successfully")}`)
      : toastr.success("", `${this.props.t("Designation Added Successfully")}`)
    this.toggleManageModal()
  }
  searchQueryChanged = search => {
    this.setState(
      {
        ListRequestModel: {
          ...this.state.ListRequestModel,
          searchString: search.target.value,
        },
      },
      function () {
        if (
          this.state.ListRequestModel.searchString === "" ||
          this.state.ListRequestModel.searchString.length > 2
        ) {
          this.getAllDesignations()
        }
      }
    )
  }
  handleRowClicked = row => {
    if (row) {
      this.setState({
        designationInitials: row,
        manageModal: !this.state.manageModal,
      })
    }
  }
  toggleDeleteModal = row => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      designationInitials: row,
    })
  }
  deleteDesignation = () => {
    toastr.success("", this.props.t("Designation Removed Successfully"))
    this.toggleDeleteModal()
  }
  toggleManageModal = () => {
    this.setState({
      designationInitials: {},
      manageModal: !this.state.manageModal,
    })
  }
  render() {
    const initialValues = this.state.designationInitials
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops">
          <Card className="m-2 p-4">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t("Designation")}`}
              onTextChange={this.searchQueryChanged}
              buttonClick={this.addBtnClick}
              searchValue={this.state.ListRequestModel.searchString}
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
            {this.props.t("Remove Designation")}
          </ModalHeader>
          <AvForm
            onSubmit={() =>
              this.deleteDesignation(this.state.designationInitials._id)
            }
          >
            <ModalBody>
              <Fragment>
                <Row className="pb-4">
                  <Label className="av-label ml-3">
                    <h5>
                      {this.props.t(
                        "Are you sure you want to remove this designation?"
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
            {this.state.designationInitials &&
            this.state.designationInitials._id
              ? this.props.t("Edit Designation")
              : this.props.t("Add Designation")}
          </ModalHeader>
          <ModalBody>
            <Fragment>
              <Formik
                initialValues={initialValues}
                onSubmit={this.handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
                validationSchema={designationValidation}
              >
                {({ setFieldValue, values, errors }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <ModalBody>
                      <Fragment>
                        <Row className="px-3">
                          <Col xs="12" sm="12" md="12" lg={12} className="pr-4">
                            <FormGroup className="position-relative">
                              <Label className="requiredField mt-1">
                                {this.props.t("Designation")}
                              </Label>
                              <Field
                                name="designation"
                                id="first"
                                type="text"
                                className="form-control box-border"
                              />
                              {errors.designation && (
                                <div className="invalid-feedback d-block ">
                                  {errors.designation}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="px-3">
                          <Col xs="12" sm="12" md="12" lg={12} className="pr-4">
                            <FormGroup className="position-relative">
                              <Label className="requiredField mt-1">
                                {this.props.t("Description")}
                              </Label>
                              <Field
                                name="description"
                                id="first"
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
                        <Row className="px-3">
                          <Col lg="4" className="mt-1 pt-2">
                            <Label className="mt-1">
                              {this.props.t("Is Active")}
                            </Label>
                          </Col>
                          <Col lg="7">
                            <Switch
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
                          </Col>
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
                        </Row>
                      </Fragment>
                    </ModalBody>
                  </Form>
                )}
              </Formik>
            </Fragment>
          </ModalBody>
        </Modal>
      </Fragment>
    )
  }
}

export default withTranslation()(designation)
