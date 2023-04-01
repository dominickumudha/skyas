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
import { VendorValidation } from "../../helpers/validations"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import { Formik, Form, Field } from "formik"
import { withTranslation } from "react-i18next"

class Vendor extends Component {
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
      vendorCategory: [{ label: "ONE TIME", value: "ONE TIME" },
        { label: "Regular", value: "Regular" },],

    
      vendorList: [],

      vendor: {
        name: "",
        code: "",
          address: "",
          phoneNo: "",
          gstn: "",
          vendorCategory: "",
          isActive: false,
          tdsApplicable: false,
          tdsRate: "",
      },
      data: [
        {
          _id: 1,
          name: "ABC Enterprises",
              code: "TEST",
              address: "egmore,chennai",
              phoneNo: "01234567890",
              gstn: "33DYKPK7968C1Z3",
              vendorCategory: "Eletrical",
              isActive: "Act",
              tdsApplicable: "true",
              tdsRate: "2 %",
          
          
        },
        {
          _id: 2,
          name: "XYZ Traders",
              code: "XYZ",
              address: "paris,chennai",
              phoneNo: "0987654321",
              gstn: "33DYKPK7968C1Z3",
              vendorCategory: "Food",
              isActive: "Act",
              tdsApplicable: "true",
              tdsRate: "5 %",
          

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
          cell: row => (
            <span>{row.name ? row.name : ""}</span>
          ),
        },
        {
          name: this.props.t("Vendor Code"),
          selector: "code",
          sortable: false,
          cell: row => <span>{row.code ? row.code : ""}</span>,
        },
        {
          name: this.props.t("Address"),
          selector: "address",
          sortable: false,
          cell: row => <span>{row.address ? row.address : ""}</span>,
          },
        {
          name: this.props.t("GSTN"),
          selector: "gstn",
          sortable: false,
          cell: row => <span>{row.gstn ? row.gstn : ""}</span>,
        },
        {
          name: this.props.t("Action"),
          selector: "action",
          sortable: false,
          cell: row => (
            <Row>
              <Button
                size="sm"
                className="ml-3"
                color="primary"
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
            </Row>
          ),
        },
      ],
    }
  }
  componentDidMount() {
    this.getAllVendor()
  }
  getAllVendor() {
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
      this.getAllVendor
    )
  }
  getAllVendorResponse = data => {
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
        vendor: row,
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
        this.getAllVendor()
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
        this.getAllVendor()
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
          this.getAllVendor()
        }
      }
    )
  }
  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageVendor(values)
  }
  manageVendor = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageVendorResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //values._id ? .Update + values._id : .Create,
      values._id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      this.manageVendorResponse
    )
  }
  manageVendorResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(
        "",
        this.state.vendor._id
          ? this.props.t("Vendor Edited Successfully")
          : this.props.t("Vendor Added Successfully")
      )
      this.getAllVendor()
    }
    this.toggleManageModal()
  }
  addBtnClick = () => {
    this.toggleManageModal()
  }
  toggleManageModal = () => {
    this.setState({
      vendor: {},
      manageModal: !this.state.manageModal,
    })
    }
    toggleDeleteModal = row => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      vendorTable: row,
    })
    }
    
  deleteExpenseAccount(value) {
    toastr.success(
      "",
      `${this.props.t("Vendor Removed Successfully")}`
    )
    this.toggleDeleteModal()
  }

  render() {
    const INITIALVALUES = this.state.vendor
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops">
          <Card className="m-2 px-4 pt-4 mt-3">
            <ListPageHeader
                 heading={`${this.props.t("Home")}.${this.props.t(
                  "Vendor"
                )}`}
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
             // rowClicked={this.handleRowClicked}
              rowsPerPageOnChange={this.handlePerRowsChange}
              pageChange={this.handlePageChange}
              isDataLoading={this.state.isLoading}
              overFlowXRemoval={true}
            />
          </Card>
        </Container>

        <Modal isOpen={this.state.manageModal} toggle={this.toggleManageModal}>
          <ModalHeader toggle={this.toggleManageModal}>
            {this.state.vendor && this.state.vendor._id
              ? this.props.t("Edit Vendor")
              : this.props.t("Add Vendor")}
          </ModalHeader>
          <Formik
            initialValues={INITIALVALUES}
            validationSchema={VendorValidation}
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
                          {this.props.t("Name")}
                        </Label>

                        <Field className="form-control" name="Name" />
                        {errors.name && (
                          <div className="invalid-feedback d-block">
                            {errors.name}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <FormGroup className="position-relative">
                        <Label className="requiredField mt-1">
                          {this.props.t("Code")}
                        </Label>

                        <Field className="form-control" name="Code" />
                        {errors.code && (
                          <div className="invalid-feedback d-block">
                            {errors.code}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <FormGroup className="position-relative">
                        <Label className="mt-1">
                          {this.props.t("Address")}
                        </Label>

                        <Field
                          className="form-control"
                          name="address"
                          component="textarea"
                        />
                            {errors.address && (
                          <div className="invalid-feedback d-block">
                            {errors.address}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                      <Col xs="12" sm="12" md="12" lg="12" xl="12">
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("Phone")}
                            </Label>
                            <Field
                              name="phoneno"
                              id="phoneno"
                              type="number"
                              className="form-control box-border"
                            />
                            {errors.phoneno && (
                              <div className="invalid-feedback d-block">
                                {errors.phoneno}
                              </div>
                            )}
                          </FormGroup>
                    </Col>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("GSTN No")}
                            </Label>
                            <Field
                              name="gstn"
                              id="gstn"
                              type="text"
                              className="form-control box-border"
                            />
                            {errors.gstn && (
                              <div className="invalid-feedback d-block">
                                {errors.gstn}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <FormGroup className="form-group has-float-label">
                        <Row>
                          <Col lg="4">
                            <Label className="mt-2">
                              {this.props.t("Is Active")}
                            </Label>
                          </Col>
                          <Col lg="7">
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
                    {this.state.vendor &&
                    this.state.vendor._id ? (
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

export default withTranslation()(Vendor)
