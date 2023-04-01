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
import { StationaryValidation } from "../../helpers/validations"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import { Formik, Form, Field } from "formik"
import { withTranslation } from "react-i18next"

class Stationary extends Component {
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
      stationaryCategory: [{ label: "ONE TIME", value: "ONE TIME" },
        { label: "Regular", value: "Regular" },],

    
      stationaryList: [],

      stationary: {
        name: "",
          code: "",
          active: false,
          openingStock: "",
          cost: "",
          hsnCode: "",
          gstSlab: "",
        availableCount: "",
          
          
      },
      data: [
        {
          _id: 1,
          name: "A4 Sheet",
              code: "A4SHEET",
              active: true,
              openingStock: "25",
              cost: "250",
              hsnCode: "123456",
              gstSlap: "18",
              availableCount: "15",
          
          
        },
        {
          _id: 2,
          name: "Pen",
              code: "PEN",
              active: true,
              openingStock: "100",
              cost: "10",
              hsnCode: "654321",
              gstSlap: "12",
              availableCount: "75",
          
          
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
          name: this.props.t("Available"),
          selector: "availableCount",
          sortable: false,
          cell: row => <span>{row.availableCount? row.availableCount : ""}</span>,
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
    this.getAllStationary()
  }
  getAllStationary() {
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
      this.getAllStationary
    )
  }
  getAllStationaryResponse = data => {
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
        stationary: row,
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
        this.getAllStationary()
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
        this.getAllStationary()
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
          this.getAllStationary()
        }
      }
    )
  }
  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageStationary(values)
  }
  manageStationary = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageStationaryResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //values._id ? .Update + values._id : .Create,
      values._id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      this.manageStationaryResponse
    )
  }
  manageStationaryResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(
        "",
        this.state.stationary._id
          ? this.props.t("Stationary Edited Successfully")
          : this.props.t("Stationary Added Successfully")
      )
      this.getAllStationary()
    }
    this.toggleManageModal()
  }
  addBtnClick = () => {
    this.toggleManageModal()
  }
  toggleManageModal = () => {
    this.setState({
      stationary: {},
      manageModal: !this.state.manageModal,
    })
    }
    toggleDeleteModal = row => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      stationaryTable: row,
    })
    }
    
  deleteExpenseAccount(value) {
    toastr.success(
      "",
      `${this.props.t("Stationary Removed Successfully")}`
    )
    this.toggleDeleteModal()
  }

  render() {
    const INITIALVALUES = this.state.stationary
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops">
          <Card className="m-2 px-4 pt-4 mt-3">
            <ListPageHeader
                 heading={`${this.props.t("Home")}.${this.props.t(
                  "Stationary"
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
            {this.state.stationary && this.state.stationary._id
              ? this.props.t("Edit Stationary")
              : this.props.t("Add Stationary")}
          </ModalHeader>
          <Formik
            initialValues={INITIALVALUES}
            validationSchema={StationaryValidation}
            onSubmit={this.handleSubmit}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ errors, values, setFieldValue }) => (
              <Form className="av-tooltip tooltip-label-bottom">
                <ModalBody>
                  <Row className="mb-10">
                    <Col xss="6">
                      <FormGroup className="form-group has-float-label">
                        <Label className="requiredField">
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
                    <Col xxs="6">
                      <FormGroup className="form-group has-float-label">
                        <Label className="requiredField">
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
                    <Col xxs="6" sm="12" md="12" lg="12" xl="12">
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
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("Opening Stock")}
                            </Label>
                            <Field
                              name="openingStock"
                              id="opemingStock"
                              type="number"
                              className="form-control box-border"
                            />
                            {errors.openingStock && (
                              <div className="invalid-feedback d-block">
                                {errors.openingStock}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                      <Col xs="12" sm="12" md="12" lg="12" xl="12">
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("Cost")}
                            </Label>
                            <Field
                              name="cost"
                              id="cost"
                              type="number"
                              className="form-control box-border"
                            />
                            {errors.cost && (
                              <div className="invalid-feedback d-block">
                                {errors.cost}
                              </div>
                            )}
                          </FormGroup>
                    </Col>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("HSN Code")}
                            </Label>
                            <Field
                              name="hsnCode"
                              id="hsnCode"
                              type="text"
                              className="form-control box-border"
                            />
                            {errors.hsnCode && (
                              <div className="invalid-feedback d-block">
                                {errors.hsnCode}
                              </div>
                            )}
                          </FormGroup>
                                    </Col>
                                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("GST Slab")}
                            </Label>
                            <Field
                              name="gstSlab"
                              id="gstSlab"
                              type="number"
                              className="form-control box-border"
                            />
                            {errors.gstSlab && (
                              <div className="invalid-feedback d-block">
                                {errors.gstSlab}
                              </div>
                            )}
                          </FormGroup>
                                    </Col>
                                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("Available Count")}
                            </Label>
                            <Field
                              name="availableCount"
                              id="availableCount"
                              type="number"
                              className="form-control box-border"
                            />
                            {errors.availableCount && (
                              <div className="invalid-feedback d-block">
                                {errors.availableCount}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                    
                  </Row>
                </ModalBody>

                <ModalFooter>
                  <FormGroup className="float-sm-right">
                    {this.state.stationary &&
                    this.state.stationary._id ? (
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

export default withTranslation()(Stationary)
