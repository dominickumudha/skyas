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

} from "reactstrap"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { vendorCategoryValidation } from "../../helpers/validations"
import { AvForm } from "availity-reactstrap-validation"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form, Field } from "formik"
import { withTranslation } from "react-i18next"

class VendorCategory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      buttonAction: false,
      isLoading: false,
      pageSizeOptions: [10, 50, 100],
      pageLimit: 10,
      totalCount: 0,
      keyField: "_id",
      manageModal: false,
      deleteModal: false,

      listRequestModel: {
        searchString: "",
        sortCondition: null,
        pageNumber: 1,
        pageLimit: 10,
      },

      vendorCategory: {
        Name: "",
        Code: "",
        isActive: false,
      },
      vendorCategoryList: [
        {
          _id: 1,
          Name: "Agaram Traders",
          Code: "ATS",
          isActive: "Act",
        },
        {
          _id: 2,
          Name: "ADK Enterprises",
          Code: "ADKE",
          isActive: "Act",
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
          selector: "Name",
          sortable: false,
          cell: row => <span>{row.Name ? row.Name : ""}</span>,
        },
        {
          name: this.props.t("Code"),
          selector: "Code",
          sortable: false,
          cell: row => <span>{row.Code ? row.Code : ""}</span>,
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
                color="primary"
                className="ml-3"
                onClick={() => this.handleRowClicked(row)}
              >
                {this.props.t("Edit")}
              </Button>
              
              <Button
                size="sm"
                color="danger"
                className="ml-2"
                onClick={() => this.toggleDeleteModal(row)}
              >
                {this.props.t("Delete")}
              </Button>
              {row.IsActive === true ? (
                <Button
                  size="sm"
                  outline
                  color="danger"
                  className="ml-2"
                  onClick={() => this.toggleDeactivate(row, "Deactivate")}
                >
                  Deactivate
                </Button>
              ) : (
                <Button
                  size="sm"
                  outline
                  color="success"
                  className="ml-2"
                  onClick={() => this.toggleDeactivate(row, "Activate")}
                >
                  Activate
                </Button>
              )}
            </Row>
          ),
        },
      ],
    }
  }
  componentDidMount() {
    this.getAllVendorCategory()
  }
  getAllVendorCategory() {
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
      this.getAllVendorCategoryResponse
    )
  }
  getAllVendorCategoryResponse = data => {
    if (data.pagination && data.result) {
      this.setState({
        isLoading: false,
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        vendorCategoryList: data.result,
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
        vendorCategory: row,
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
        this.getAllVendorCategory()
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
        this.getAllVendorCategory()
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
          this.getAllVendorCategory()
        }
      }
    )
  }
  addBtnClick = () => {
    this.toggleManageModal()
  }
  toggleManageModal = () => {
    this.setState({
      vendorCategory: {},
      manageModal: !this.state.manageModal,
    })
  }
  toggleDeleteModal = row => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      vendorCategory: row,
    })
  }

  toggleDeactivate(row, action) {
    this.setState({
      statusaction: action,
    });
    var status;
    if (action === "Activate") status = true;
    else status = false;
    // CallService(
    //   Name.StatusChange,
    //   // MethodType.POST,
    //   false,
    //   { Code: row._id, IsActive: status },
    //   "",
    //   this.toggleDeactivateResponse
    // );
  }
  toggleDeactivateResponse = (data) => {
    if (data.statusCode === StatusCodes.Success) {
      if (this.state.statusaction === "Deactivate") {
        toastr.success("", "Officer Deactivated successfully", {
          positionClass: "toast-top-center",
        });
        this.GetAllVendorCategory();
      } else {
        toastr.success("", "Vendor activated successfully", {
          positionClass: "toast-top-center",
        });
        this.GetAllVendorCategory();
      }
    } else {
      toastr.error("", "Something Went Wrong", {
        positionClass: "toast-top-center",
      });
    }
  };

  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageVendorCategory(values)
  }
  manageVendorCategory = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageVendorCategoryResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //values._id ? .Update + values._id : .Create,
      values._id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      this.manageVendorCategoryResponse
    )
  }
  manageVendorCategoryResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(
        "",
        this.state.vendorCategory._id
          ? this.props.t("Vendor Category Edited Successfully")
          : this.props.t("Vendor Category Added Successfully")
      )
      this.getAllVendorCategory()
    }
    this.toggleManageModal()
  }
  deleteVendorCategory = value => {
    toastr.success("", value, "deleted")
    this.toggleDeleteModal()
  }

  render() {
    const INITIALVALUES = this.state.vendorCategory

    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops">
          <Card className="m-2 px-4 pt-4 mt-3">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t(
                "Vendor Category"
              )}`}
              match={this.props.match}
              onTextChange={this.searchQueryChanged}
              buttonClick={this.addBtnClick}
              searchValue={this.state.listRequestModel.searchString}
            />
            <ListPage
              columns={this.state.columns}
              data={this.state.vendorCategoryList}
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
            {this.props.t("Remove Vendor Category")}
          </ModalHeader>

          <AvForm
            onSubmit={() => this.deleteVendorCategory(this.state.vendorCategory._id)}
          >
            <ModalBody>
              <Fragment>
                <Row className="mb-4">
                  <Label className="av-label ml-3">
                    <h5>
                      {this.props.t(
                        "Are you sure you want to remove this Vendor Category?"
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
            {this.state.vendorCategory && this.state.vendorCategory._id
              ? this.props.t("Edit Category")
              : this.props.t("Add Category")}
          </ModalHeader>
          <Formik
            initialValues={INITIALVALUES}
            validationSchema={vendorCategoryValidation}
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
                        <Label className="requiredField">
                          {this.props.t("Name")}
                        </Label>

                        <Field className="form-control" name="categoryName" />
                        {errors.categoryName && (
                          <div className="invalid-feedback d-block">
                            {errors.categoryName}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <FormGroup className="position-relative">
                        <Label>{this.props.t("Code")}</Label>

                        <Field
                          className="form-control"
                          name="code"
                          component="text"
                        />
                          {errors.code && (
                          <div className="invalid-feedback d-block">
                            {errors.code}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <FormGroup className="form-group has-float-label">
                        <Row>
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
                    {this.state.vendorCategory &&
                    this.state.vendorCategory._id ? (
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

export default withTranslation()(VendorCategory)
