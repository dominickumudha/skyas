import { React, Component, Fragment } from "react"
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
} from "reactstrap"
import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import Switch from "@material-ui/core/Switch"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { AvForm } from "availity-reactstrap-validation"
import { ExpenseCategoryValidation } from "../../helpers/validations"
import { Formik, Form, Field } from "formik"
import { withTranslation } from "react-i18next"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

import { render } from "@testing-library/react"

class expenseReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageSizeOptions: [10, 50, 100],
      pageLimit: 10,
      totalCount: 0,
      keyField: "_id",
      update: false,
      expenseTable: {
        Name: "",
        Description: "",
        TDSappl: "",
        TDSVal: "",
        Status: false,
      },
      listRequestModel: {
        searchString: "",
        sortCondition: null,
        pageNumber: 1,
        pageLimit: 10,
      },
      expenseTableData: [
        {
          Name: "sug",
          Description: "yty",
          TDSappl: "gh",
          TDSVal: "kjg",
          Status: "Active",
          _id: 1,
        },
        {
          Name: "asdasd",
          Description: "wqe",
          TDSappl: "rq",
          TDSVal: "paa",
          Status: "Inactive",
          _id: 2,
        },
        {
          Name: "Aravindan",
          Description: "asdasd",
          TDSappl: "awq",
          TDSVal: "avl",
          Status: "bha",
          _id: 3,
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
          name: this.props.t("Description"),
          selector: "Description",
          sortable: false,
          cell: row => <span>{row.Description ? row.Description : ""}</span>,
        },
        {
          name: this.props.t("TDS Applicable"),
          selector: "TDSappl",
          sortable: false,
          cell: row => <span>{row.TDSappl ? row.TDSappl : ""}</span>,
        },
        {
          name: this.props.t("TDS Value"),
          selector: "TDSVal",
          sortable: false,
          cell: row => <span>{row.TDSVal ? row.TDSVal : ""}</span>,
        },
        {
          name: this.props.t("Status"),
          selector: "Status",
          sortable: false,
          cell: row => <span>{row.Status ? row.Status : ""}</span>,
        },
        {
          name: this.props.t("Action"),
          selector: "Action",
          sortable: false,
          cell: row => (
            <Row>
              <Button
                size="sm"
                color="primary mr-1"
                className="ml-2"
                onClick={() => this.handleEdit(row)}
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
    this.getAllExpenseReports()
  }

  getAllExpenseReports() {
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
      this.getAllExpenseReportsResponse
    )
  }
  getAllExpenseReportsResponse = data => {
    if (data.pagination && data.result) {
      this.setState({
        isLoading: false,
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        expenseTableData: data.result,
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
        expenseTable: row,
        manageModal: !this.state.manageModal,
      })
    }
  }
  addBtnClick = () => {
    this.toggleManageModal()
  }

  toggleManageModal = () => {
    this.setState({
      expenseTable: {},
      manageModal: !this.state.manageModal,
    })
  }
  backBtnClick = () => {
    this.props.history.push("/")
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
          this.getAllExpenseReports()
        }
      }
    )
  }

  toggleDeleteModal = row => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      expenseTable: row,
    })
  }

  handleSubmit = values => {
    this.state.expenseTable && this.state.expenseTable._id
      ? toastr.success(
          "",
          `${this.props.t("Expense Category Edited Successfully")}`
        )
      : toastr.success(
          "",
          `${this.props.t("Expense Category Added Successfully")}`
        )
    this.toggleManageModal()
  }

  deleteExpenseAccount(value) {
    toastr.success(
      "",
      `${this.props.t("Expense Category Removed Successfully")}`
    )
    this.toggleDeleteModal()
  }
  render() {
    const initialvalues = this.state.expenseTable
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops">
          <Card className="m-2 p-4">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t(
                "Expense Category"
              )}`}
              onTextChange={this.searchQueryChanged}
              buttonClick={this.addBtnClick}
              searchValue={this.state.listRequestModel.searchString}
            />

            <ListPage
              className={"cursor-pointer"}
              columns={this.state.columns}
              data={this.state.expenseTableData}
              keyField={this.state.keyField}
              totalCount={this.state.totalCount}
              rowsPerPageOnChange={this.handlePerRowsChange}
              pageChange={this.handlePageChange}
              overFlowXRemoval={true}
              onSort={this.handleSort}
              isDataLoading={this.state.isLoading}
            />
          </Card>
        </Container>
        <Modal isOpen={this.state.deleteModal} toggle={this.toggleDeleteModal}>
          <ModalHeader toggle={this.toggleDeleteModal}>
            {this.props.t("Remove Expense Category")}
          </ModalHeader>

          <AvForm
            onSubmit={() =>
              this.deleteExpenseAccount(this.state.expenseTable._id)
            }
          >
            <ModalBody>
              <Fragment>
                <Row className="mb-4">
                  <Label className="av-label ml-3">
                    <h5>
                      {this.props.t(
                        "Are you sure you want to remove this Expense Category?"
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
            {this.state.expenseTable && this.state.expenseTable._id
              ? this.props.t("Edit Expense Category")
              : this.props.t("Add Expense Category")}
          </ModalHeader>
          <ModalBody>
            <Formik
              initialValues={initialvalues}
              validationSchema={ExpenseCategoryValidation}
              onSubmit={this.handleSubmit}
              validateOnBlur={false}
              validateOnChange={false}
            >
              {({ setFieldValue, values, errors }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <Row>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <FormGroup className="position-relative">
                        <Label className="requiredField mt-1">
                          {this.props.t("Name")}
                        </Label>
                        <Field
                          name="Name"
                          id="first"
                          type="text"
                          className="form-control box-border"
                        />
                        {errors.Name && (
                          <div className="invalid-feedback d-block ">
                            {errors.Name}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <FormGroup className="position-relative  mt-1">
                        <Label className="requiredField ">
                          {this.props.t("TDS Applicable")}
                        </Label>
                        <input
                          type="radio"
                          id="G1"
                          name="TDSappl"
                          value="Male"
                          className="mt-1 ml-4"
                          onChange={() => setFieldValue("TDSappl", "Yes")}
                        />
                        <label for="G1" className="ml-2">
                          {this.props.t("Yes")}
                        </label>
                        <input
                          type="radio"
                          id="G2"
                          name="TDSappl"
                          value="Female"
                          className="mt-1 ml-2"
                          onChange={() => setFieldValue("TDSappl", "No")}
                        />
                        <label for="G2" className="ml-2">
                          {this.props.t("No")}
                        </label>
                        {errors.TDSappl && (
                          <div className="invalid-feedback d-block">
                            {errors.TDSappl}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <FormGroup className="position-relative mt-1">
                        <Label>{this.props.t("Description")}</Label>

                        <Field
                          name="Description"
                          id="first"
                          component="textarea"
                          type="text"
                          className="form-control box-border"
                        />
                        {errors.Description && (
                          <div className="invalid-feedback d-block ">
                            {errors.Description}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField">
                          {this.props.t("TDS Value")}
                        </Label>
                        <Field
                          name="TDSVal"
                          id="first"
                          type="text"
                          className="form-control box-border"
                        />
                        {errors.TDSVal && (
                          <div className="invalid-feedback d-block ">
                            {errors.TDSVal}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={6} xs="12" sm="12" md="12" lg="12" xl="12">
                      <FormGroup className="position-relative mt-1">
                        <Row>
                          <Col lg="4">
                            <Label className="mt-1">
                              {this.props.t("Is Active")}
                            </Label>
                          </Col>
                          <Col lg="7">
                            <Switch
                              name="Status"
                              value="Active"
                              color="primary"
                              checked={values.Status === "Active"}
                              onChange={(event, checked) => {
                                setFieldValue(
                                  "Status",
                                  checked ? "Active" : "Inactive"
                                )
                              }}
                            />
                          </Col>
                        </Row>
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
                </Form>
              )}
            </Formik>
          </ModalBody>
        </Modal>
      </Fragment>
    )
  }
}

export default withTranslation()(expenseReport)
