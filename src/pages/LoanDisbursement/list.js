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
import { withTranslation } from "react-i18next"
import { LoanDisbursementRegisterValidation } from "../../helpers/validations"
import { values } from "lodash"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import DropDown from "../../common/DropDown"
import Switch from "@material-ui/core/Switch"
import { Rowing } from "@material-ui/icons"
import CustomSelectInput from "../../common/CustomSelectInput"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

class loanDisbursement extends Component {
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
      loanInitials: {
        date: "",
        loanNo: "",
        memberNo: "",
        name: "",
        employeeNo: "",
        loanAmt: "",
        installmentAmt: "",
        deductions: "",
        oldloanAmt: "",
        oldloanInterest: "",
        shareAmt: "",
        entranceFees: "",
        netAmt: "",
      },

      columns: [
        {
          name: this.props.t("Date"),
          selector: "date",
          sortable: false,
          cell: row => <span>{row.date ? row.date : ""}</span>,
        },
        {
          name: this.props.t("Loan No."),
          selector: "loanNo",
          sortable: false,
          cell: row => <span>{row.loanNo ? row.loanNo : ""}</span>,
        },
        {
          name: this.props.t("Member No."),
          selector: "memberNo",
          sortable: false,
          cell: row => <span>{row.memberNo ? row.memberNo : ""}</span>,
        },
        {
          name: this.props.t("Member Name"),
          selector: "name",
          sortable: false,
          cell: row => <span>{row.name ? row.name : ""}</span>,
        },
        {
          name: this.props.t("Employee No."),
          selector: "employeeNo",
          sortable: false,
          cell: row => <span>{row.employeeNo ? row.employeeNo : ""}</span>,
        },
        {
          name: this.props.t("Loan Amount"),
          selector: "loanAmt",
          sortable: false,
          cell: row => <span>{row.loanAmt ? row.loanAmt : ""}</span>,
        },
        {
          name: this.props.t("Installment Amount"),
          selector: "installmentNo",
          sortable: false,
          cell: row => (
            <span>{row.installmentAmt ? row.installmentAmt : ""}</span>
          ),
        },
        {
          name: this.props.t("Old Loan Amount"),
          selector: "oldloanAmt",
          sortable: false,
          cell: row => <span>{row.oldloanAmt ? row.oldloanAmt : ""}</span>,
        },
        {
          name: this.props.t("Old Loan Interest"),
          selector: "oldloanInterest",
          sortable: false,
          cell: row => (
            <span>{row.oldloanInterest ? row.oldloanInterest : ""}</span>
          ),
        },
        {
          name: this.props.t("Other Deductions"),
          selector: "otherDed",
          sortable: false,
          cell: row => <span>{row.otherDed ? row.otherDed : ""}</span>,
        },
        {
          name: this.props.t("Share Amount"),
          selector: "shareAmt",
          sortable: false,
          cell: row => <span>{row.shareAmt ? row.shareAmt : ""}</span>,
        },
        {
          name: this.props.t("Entrance Fees"),
          selector: "entranceFees",
          sortable: false,
          cell: row => <span>{row.entranceFees ? row.entranceFees : ""}</span>,
        },
        {
          name: this.props.t("Net Amount"),
          selector: "netAmt",
          sortable: false,
          cell: row => <span>{row.netAmt ? row.netAmt : ""}</span>,
        },
      ],
      data: [
        {
          date: "02-06-2021",
          loanNo: "asdasd",
          memberNo: "5534646",
          name: "asdasdcav dsd",
          employeeNo: "66254554",
          loanAmt: "11573",
          installmentAmt: "1153547",
          otherDed: "11632",
          oldloanAmt: "111567",
          oldloanInterest: "1163422",
          shareAmt: "1455",
          entranceFees: "10523",
          netAmt: "116744",
          _id: 1,
        },
        {
          date: "02-05-2020",
          loanNo: "55213",
          memberNo: "1153325",
          name: "aszxzasfggdfddfhgd",
          employeeNo: "482901029469",
          loanAmt: "1345456",
          installmentAmt: "1231232",
          otherDed: "34354345",
          oldloanAmt: "346436123",
          oldloanInterest: "435654",
          shareAmt: "33534653",
          entranceFees: "5663",
          netAmt: "123123",
          _id: 2,
        },
      ],
    }
  }
  addBtnClick = () => {
    this.toggleManageModal()
  }
  toggleManageModal = () => {
    this.setState({
      loanInitials: {},
      manageModal: !this.state.manageModal,
    })
  }
  toggleDeleteModal = row => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      loanInitials: row,
    })
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
          this.getAllLoanRegister()
        }
      }
    )
  }

  handleRowClicked = row => {
    if (row) {
      this.setState({
        loanInitials: row,
        manageModal: !this.state.manageModal,
      })
    }
  }
  render() {
    const initialValues = this.state.loanInitials
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops pb-5">
          <Card className="p-4 page-content mb-5">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t(
                "Loan Disbursement Register"
              )}`}
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
          <Modal
            isOpen={this.state.deleteModal}
            toggle={this.toggleDeleteModal}
          >
            <ModalHeader toggle={this.toggleDeleteModal}>
              {this.props.t("Remove The Loan Instance?")}
            </ModalHeader>
            <AvForm
              onSubmit={() => this.deleterCrud(this.state.loanInitials._id)}
            >
              <ModalBody>
                <Fragment>
                  <Row className="mb-4">
                    <Label className="av-label ml-3">
                      <h5>
                        {this.props.t(
                          "Are you sure you want to remove this Loan instance?"
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
              {this.state.loanInitials && this.state.loanInitials._id
                ? this.props.t("Edit Loan Details")
                : this.props.t("Add Loan Details")}
            </ModalHeader>
            <ModalBody>
              <Fragment>
                <Formik
                  initialValues={initialValues}
                  validationSchema={LoanDisbursementRegisterValidation}
                  onSubmit={this.handleSubmit}
                  validateOnBlur={false}
                  validateOnChange={false}
                >
                  {({ setFieldValue, errors }) => (
                    <Form className="av-tooltip tooltip-label-bottom">
                      <ModalBody>
                        <Fragment>
                          <Row className="mb-10">
                            <Col
                              xs="6"
                              sm="6"
                              md="6"
                              lg={6}
                              xl="6"
                              className="pr-4"
                            >
                              <FormGroup className="form-group has-float-label">
                                <Label className="requiredField">
                                  {this.props.t("Date")}
                                </Label>

                                <DatePicker
                                  selectsStart
                                  components={{ Input: CustomSelectInput }}
                                  className="form-control"
                                  selected={
                                    values.Date ? new Date(values.Date) : ""
                                  }
                                  isClearable={true}
                                  onChange={date => {
                                    setFieldValue("Date", date)
                                  }}
                                  placeholderText={this.props.t("Select Date")}
                                  dateFormat="dd/MM/yyyy"
                                />
                                {errors.Date && (
                                  <div className="invalid-feedback d-block ">
                                    {errors.Date}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>
                            <Col xs="6" className="pr-4">
                              <FormGroup className="form-group has-float-label">
                                <Label className="requiredField">
                                  {this.props.t("Loan No.")}
                                </Label>

                                <Field
                                  className="form-control "
                                  name="loanNo"
                                  id="first"
                                  type="text"
                                />
                                {errors.loanNo && (
                                  <div className="invalid-feedback d-block ">
                                    {errors.loanNo}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row className="mb-10">
                            <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                              <FormGroup className="form-group has-float-label">
                                <Label className="requiredField">
                                  {this.props.t("Member No.")}
                                </Label>

                                <Field
                                  className="form-control box-border"
                                  name="memberNo"
                                  id="first"
                                  type="text"
                                />
                                {errors.memberNo && (
                                  <div className="invalid-feedback d-block ">
                                    {errors.memberNo}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>
                            <Col sm="6" className="pr-4">
                              <FormGroup className="form-group has-float-label">
                                <Label className="requiredField">
                                  {this.props.t("Member Name")}
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
                          <Row className="mb-10">
                            <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                              <FormGroup className="form-group has-float-label">
                                <Label className="requiredField">
                                  {this.props.t("Employee No.")}
                                </Label>

                                <Field
                                  className="form-control box-border"
                                  name="employeeNo"
                                  id="first"
                                  type="text"
                                />
                                {errors.employeeNo && (
                                  <div className="invalid-feedback d-block ">
                                    {errors.employeeNo}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>
                            <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                              <FormGroup className="form-group has-float-label">
                                <Label className="requiredField">
                                  {this.props.t("Loan Amount")}
                                </Label>

                                <Field
                                  className="form-control box-border"
                                  name="loanAmt"
                                  id="first"
                                  type="text"
                                />
                                {errors.loanAmt && (
                                  <div className="invalid-feedback d-block ">
                                    {errors.loanAmt}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row className="mb-10">
                            <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                              <FormGroup className="form-group has-float-label">
                                <Label className="requiredField">
                                  {this.props.t("Installment Amount")}
                                </Label>

                                <Field
                                  className="form-control box-border"
                                  name="installmentAmt"
                                  id="first"
                                  type="text"
                                />
                                {errors.installmentAmt && (
                                  <div className="invalid-feedback d-block ">
                                    {errors.installmentAmt}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>
                            <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                              <FormGroup className="form-group has-float-label">
                                <Label className="requiredField">
                                  {this.props.t("Old Loan Amount")}
                                </Label>

                                <Field
                                  className="form-control box-border"
                                  name="oldloanAmt"
                                  id="first"
                                  type="text"
                                />
                                {errors.oldloanAmt && (
                                  <div className="invalid-feedback d-block ">
                                    {errors.oldloanAmt}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row className="mb-10">
                            <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                              <FormGroup className="form-group has-float-label">
                                <Label className="requiredField">
                                  {this.props.t("Old Loan Interest")}
                                </Label>

                                <Field
                                  className="form-control box-border"
                                  name="oldloanInterest"
                                  id="first"
                                  type="text"
                                />
                                {errors.oldloanInterest && (
                                  <div className="invalid-feedback d-block ">
                                    {errors.oldloanInterest}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>
                            <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                              <FormGroup className="form-group has-float-label">
                                <Label className="requiredField">
                                  {this.props.t("Other Deductions")}
                                </Label>

                                <Field
                                  className="form-control box-border"
                                  name="otherDed"
                                  id="first"
                                  type="text"
                                />
                                {errors.otherDed && (
                                  <div className="invalid-feedback d-block ">
                                    {errors.otherDed}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row className="mb-10">
                            <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                              <FormGroup className="form-group has-float-label">
                                <Label className="requiredField">
                                  {this.props.t("Share Amount")}
                                </Label>

                                <Field
                                  className="form-control box-border"
                                  name="shareAmt"
                                  id="first"
                                  type="text"
                                />
                                {errors.shareAmt && (
                                  <div className="invalid-feedback d-block ">
                                    {errors.shareAmt}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>
                            <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                              <FormGroup className="form-group has-float-label">
                                <Label className="requiredField">
                                  {this.props.t("Entrance Fees")}
                                </Label>

                                <Field
                                  className="form-control box-border"
                                  name="entranceFees"
                                  id="first"
                                  type="text"
                                />
                                {errors.entranceFees && (
                                  <div className="invalid-feedback d-block ">
                                    {errors.entranceFees}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row className="mb-10">
                            <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                              <FormGroup className="form-group has-float-label">
                                <Label className="requiredField">
                                  {this.props.t("Net Amount")}
                                </Label>

                                <Field
                                  className="form-control box-border"
                                  name="netAmt"
                                  id="first"
                                  type="text"
                                />
                                {errors.netAmt && (
                                  <div className="invalid-feedback d-block ">
                                    {errors.netAmt}
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
export default withTranslation()(loanDisbursement)
