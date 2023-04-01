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
import FileDisplay from "../../components/custom/FileDisplay"
import "toastr/build/toastr.min.css"
import { Formik, Form, Field } from "formik"
import { structureValidation } from "../../helpers/validations"
import { withTranslation } from "react-i18next"
import { values } from "lodash"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import { Rowing } from "@material-ui/icons"

class salaryStucture extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageSizeOptions: [10, 50, 100],
      pageLimit: 10,
      totalCount: 0,
      Description: "",
      keyField: "_id",
      isLoading: false,
      isPreview: false,
      buttonAction: false,
      update: false,

      ListRequestModel: {
        searchString: "",
        sortCondition: null,
        pageNumber: 1,
        pageLimit: 10,
      },
      salaryInitials: {
        empCode: "",
        division: "",
        subDiv: "",
        month: "",
        basic: "",
        ea: "",
        da: "",
        othAllo: "",
        deductions: "",
        totPay: "",
        netPay: "",
      },
      columns: [
        {
          name: this.props.t("Employee Code"),
          selector: "empCode",
          sortable: false,
          cell: row => <span>{row.empCode ? row.empCode : ""}</span>,
        },
        {
          name: this.props.t("Division"),
          selector: "division",
          sortable: false,
          cell: row => <span>{row.division ? row.division : ""}</span>,
        },
        {
          name: this.props.t("Sub Division"),
          selector: "subDiv",
          sortable: false,
          cell: row => <span>{row.subDiv ? row.subDiv : ""}</span>,
        },
        {
          name: this.props.t("Month"),
          selector: "month",
          sortable: false,
          cell: row => <span>{row.month ? row.month : ""}</span>,
        },
        {
          name: this.props.t("Basic"),
          selector: "basic",
          sortable: false,
          cell: row => <span>{row.basic ? row.basic : ""}</span>,
        },
        {
          name: this.props.t("E.A"),
          selector: "ea",
          sortable: false,
          cell: row => <span>{row.ea ? row.ea : ""}</span>,
        },
        {
          name: this.props.t("D.A"),
          selector: "da",
          sortable: false,
          cell: row => <span>{row.da ? row.da : ""}</span>,
        },
        {
          name: this.props.t("Other Allowances"),
          selector: "othAllo",
          sortable: false,
          cell: row => <span>{row.othAllo ? row.othAllo : ""}</span>,
        },
        {
          name: this.props.t("Deductions"),
          selector: "deductions",
          sortable: false,
          cell: row => <span>{row.deductions ? row.deductions : ""}</span>,
        },
        {
          name: this.props.t("Total Pay"),
          selector: "totPay",
          sortable: false,
          cell: row => <span>{row.totPay ? row.totPay : ""}</span>,
        },
        {
          name: this.props.t("Net Pay"),
          selector: "netPay",
          sortable: false,
          cell: row => <span>{row.netPay ? row.netPay : ""}</span>,
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
      data: [
        {
          empCode: "1152355",
          division: "a",
          subDiv: "5",
          month: "03",
          basic: "22010",
          ea: "1102",
          da: "1114",
          othAllo: "200",
          deductions: "105",
          totPay: "25016",
          netPay: "25016",
          _id: 1,
        },
      ],
    }
  }
  handleSubmit = values => {
    this.state.salaryInitials && this.state.salaryInitials._id
      ? toastr.success(
          "",
          `${this.props.t("Salary Structure Edited Successfully")}`
        )
      : toastr.success(
          "",
          `${this.props.t("Salary Structure Added Successfully")}`
        )
    this.toggleManageModal()
  }
  addBtnClick = () => {
    this.toggleManageModal()
  }
  toggleManageModal = row => {
    this.setState({
      salaryInitials: {},
      manageModal: !this.state.manageModal,
    })
  }
  toggleDeleteModal = row => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      salaryInitials: row,
    })
  }
  deleteSalary(value) {
    toastr.success(
      "",
      `${this.props.t("Salary Structure Removed Successfully")}`
    )
    this.toggleDeleteModal()
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
          this.getAllSalary()
        }
      }
    )
  }
  handleRowClicked = row => {
    if (row) {
      this.setState({
        salaryInitials: row,
        manageModal: !this.state.manageModal,
      })
    }
  }
  render() {
    const initialValues = this.state.salaryInitials
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops pb-5">
          <Card className="p-4 page-content mb-5">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t(
                "Employee Salary Details"
              )}`}
              onTextChange={this.searchQueryChanged}
              buttonClick={this.addBtnClick}
              searchValue={this.state.ListRequestModel.searchString}
            />
            <Row className="mb-10">
              <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                <FormGroup className="position-relative">
                  <Label className="required-field ">
                    {this.props.t("Salary Details")}
                  </Label>
                  <CustomInput
                    key={"imageUrl"}
                    type="file"
                    name={"salaryDetailsDocument"}
                    onChange={event => {
                      setFieldValue(
                        "salaryDetailsDocument",
                        event.target.files[0]
                      )
                    }}
                  />
                </FormGroup>
              </Col>
              <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                <FormGroup className="position-relative">
                  <Label className="required-field ">
                    {this.props.t("Update To Employees")}
                  </Label>
                  <CustomInput
                    key={"imageUrl"}
                    type="file"
                    name={"updateEmployees"}
                    onChange={event => {
                      setFieldValue("updateEmployees", event.target.files[0])
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
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
          <Modal
            isOpen={this.state.deleteModal}
            toggle={this.toggleDeleteModal}
          >
            <ModalHeader toggle={this.toggleDeleteModal}>
              {this.props.t("Remove Salary Structure")}
            </ModalHeader>
            <AvForm
              onSubmit={() => this.deleteSalary(this.state.salaryInitials._id)}
            >
              <ModalBody>
                <Fragment>
                  <Row className="mb-4">
                    <Label className="av-label ml-3">
                      <h5>
                        {this.props.t(
                          "Are you sure you want to remove this salary structure?"
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
          <Modal
            isOpen={this.state.manageModal}
            size="lg"
            toggle={this.toggleManageModal}
          >
            <ModalHeader toggle={this.toggleManageModal}>
              {this.state.salaryInitials && this.state.salaryInitials._id
                ? this.props.t("Edit Salary Structure")
                : this.props.t("Add Salary Structure")}
            </ModalHeader>
            <ModalBody>
              <Fragment>
                <Formik
                  initialValues={initialValues}
                  validationSchema={structureValidation}
                  onSubmit={this.handleSubmit}
                  validateOnBlur={false}
                  validateOnChange={false}
                >
                  {({ setFieldValue, errors }) => (
                    <Form className="av-tooltip tooltip-label-bottom">
                      <ModalBody>
                        <Fragment>
                          <Row className="mb-10">
                            <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                              <FormGroup className="form-group has-float-label">
                                <Label className="requiredField">
                                  {this.props.t("Emp. Code")}
                                </Label>

                                <Field
                                  className="form-control box-border"
                                  name="empCode"
                                  id="first"
                                  type="number"
                                />
                                {errors.empCode && (
                                  <div className="invalid-feedback d-block ">
                                    {errors.empCode}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>

                            <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                              <FormGroup className="form-group has-float-label">
                                <Label className="requiredField">
                                  {this.props.t("Division")}
                                </Label>

                                <Field
                                  className="form-control box-border"
                                  name="division"
                                  id="first"
                                  type="text"
                                />
                                {errors.division && (
                                  <div className="invalid-feedback d-block ">
                                    {errors.division}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row className="mb-10">
                            <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                              <FormGroup className="form-group has-float-label">
                                <Label className="requiredField">
                                  {this.props.t("Sub Division")}
                                </Label>

                                <Field
                                  className="form-control box-border"
                                  name="subDiv"
                                  id="first"
                                  type="text"
                                />
                                {errors.subDiv && (
                                  <div className="invalid-feedback d-block ">
                                    {errors.subDiv}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>

                            <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                              <FormGroup className="form-group has-float-label">
                                <Label className="requiredField">
                                  {this.props.t("Month")}
                                </Label>

                                <Field
                                  className="form-control box-border"
                                  name="month"
                                  id="first"
                                  type="text"
                                />
                                {errors.month && (
                                  <div className="invalid-feedback d-block ">
                                    {errors.month}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row className="mb-10">
                            <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                              <FormGroup className="form-group has-float-label">
                                <Label className="requiredField">
                                  {this.props.t("Basic")}
                                </Label>

                                <Field
                                  className="form-control box-border"
                                  name="basic"
                                  id="first"
                                  type="number"
                                />
                                {errors.basic && (
                                  <div className="invalid-feedback d-block ">
                                    {errors.basic}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>

                            <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                              <FormGroup className="form-group has-float-label">
                                <Label className="requiredField">
                                  {this.props.t("E.A")}
                                </Label>

                                <Field
                                  className="form-control box-border"
                                  name="ea"
                                  id="first"
                                  type="number"
                                />
                                {errors.ea && (
                                  <div className="invalid-feedback d-block ">
                                    {errors.ea}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row className="mb-10">
                            <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                              <FormGroup className="form-group has-float-label">
                                <Label className="requiredField">
                                  {this.props.t("D.A")}
                                </Label>

                                <Field
                                  className="form-control box-border"
                                  name="da"
                                  id="first"
                                  type="number"
                                />
                                {errors.da && (
                                  <div className="invalid-feedback d-block ">
                                    {errors.da}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>

                            <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                              <FormGroup className="form-group has-float-label">
                                <Label className="requiredField">
                                  {this.props.t("Other Allowances")}
                                </Label>

                                <Field
                                  className="form-control box-border"
                                  name="othAllo"
                                  id="first"
                                  type="text"
                                />
                                {errors.othAllo && (
                                  <div className="invalid-feedback d-block ">
                                    {errors.othAllo}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row className="mb-10">
                            <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                              <FormGroup className="form-group has-float-label">
                                <Label className="requiredField">
                                  {this.props.t("Deductions")}
                                </Label>

                                <Field
                                  className="form-control box-border"
                                  name="deductions"
                                  id="first"
                                  type="number"
                                />
                                {errors.deductions && (
                                  <div className="invalid-feedback d-block ">
                                    {errors.deductions}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>

                            <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                              <FormGroup className="form-group has-float-label">
                                <Label className="requiredField">
                                  {this.props.t("Total Pay")}
                                </Label>

                                <Field
                                  className="form-control box-border"
                                  name="totPay"
                                  id="first"
                                  type="number"
                                />
                                {errors.totPay && (
                                  <div className="invalid-feedback d-block ">
                                    {errors.totPay}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row className="mb-10">
                            <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                              <FormGroup className="form-group has-float-label">
                                <Label className="requiredField">
                                  {this.props.t("Net Pay")}
                                </Label>

                                <Field
                                  className="form-control box-border"
                                  name="netPay"
                                  id="first"
                                  type="number"
                                />
                                {errors.netPay && (
                                  <div className="invalid-feedback d-block ">
                                    {errors.netPay}
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
          </Modal>
        </Container>
      </Fragment>
    )
  }
}
export default withTranslation()(salaryStucture)
