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
import ListPageHeader from "../../components/custom/ListPageHeader"
import DropDown from "../../common/DropDown"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import CustomSelectInput from "../../common/CustomSelectInput"

class quotationsPage extends Component {
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
      initials: {
        date: "",
        quotationNum: "",
        vendor: "",
        amount: "",
        qty: "",
        price: "",
        sgst: "",
        cgst: "",
      },
      vendor: [
        { label: "Vendor1", value: "Vendor1" },
        { label: "Vendor2", value: "Vendor2" },
        { label: "Vendor3", value: "Vendor3" },
      ],
      data: [
        {
          quotationNum: "asdasd",
          amount: "420",
          vendor: "Visa",
          _id: 1,
        },
        {
          quotationNum: "1234",
          amount: "619",
          vendor: "MasterCard",
          _id: 2,
        },
      ],
      columns: [
        {
          name: this.props.t("Quotation Number"),
          selector: "quotationNum",
          sortable: false,
          cell: row => <span>{row.quotationNum ? row.quotationNum : ""}</span>,
        },
        {
          name: this.props.t("Vendor"),
          selector: "vendor",
          sortable: false,
          cell: row => <span>{row.vendor ? row.vendor : ""}</span>,
        },
        {
          name: this.props.t("Amount"),
          selector: "amount",
          sortable: false,
          cell: row => <span>{row.amount ? row.amount : ""}</span>,
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
  addBtnClick = () => {
    this.props.history.push("/manage-quotations")
  }
  handleSubmit = () => {
    this.state.initials && this.state.initials._id
      ? toastr.success("", `${this.props.t("Quotation Edited Successfully")}`)
      : toastr.success("", `${this.props.t("Quotation Added Successfully")}`)
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
          this.getAllQuotations()
        }
      }
    )
  }
  handleRowClicked = row => {
    if (row) {
      this.props.history.push(`/manage-quotations/${row._id}`)
    }
  }
  toggleManageModal = () => {
    this.setState({
      initials: {},
      manageModal: !this.state.manageModal,
    })
  }
  toggleDeleteModal = row => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      initials: row,
    })
  }
  deleteExpenses = () => {
    toastr.success("", this.props.t("User Removed Successfully"))
    this.toggleDeleteModal()
  }

  render() {
    const initialValues = this.state.initials
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops">
          <Card className="m-2 p-4">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t("Quotations")}`}
              onTextChange={this.searchQueryChanged}
              buttonClick={this.addBtnClick}
              searchValue={this.state.ListRequestModel.searchString}
            />{" "}
            <Formik
              initialValues={{}}
              onSubmit={this.handleSubmit}
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={""}
            >
              {({ setFieldValue, errors }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <Row className="px-3">
                    <Col xs="4" sm="4" md="4" lg={4} className="pr-4">
                      <FormGroup className="position-relative">
                        <DropDown
                          classNamePrefix="react-select"
                          className="react-select"
                          label={this.props.t("Vendor")}
                          name="vendor"
                          isSearchable
                          options={this.state.vendor}
                          placeholderText={""}
                          Action={e => {
                            if (e) setFieldValue("TenureMinDays", e.value)
                          }}
                          Checkbox={false}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="4" sm="4" md="4" lg={4} className="pr-4">
                      <FormGroup className="position-relative">
                        <Label className=" mt-1">{this.props.t("From")}</Label>
                        <DatePicker
                          isClearable={true}
                          components={{ Input: CustomSelectInput }}
                          className="form-control box-border"
                          selectsStart
                          selected={values.From ? new Date(values.From) : ""}
                          onChange={date => {
                            if (date) setFieldValue("From", date)
                          }}
                          placeholderText={this.props.t("Select Date")}
                          dateFormat="dd/MM/yyyy"
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="4" sm="4" md="4" lg={4} className="pr-4">
                      <FormGroup className="position-relative">
                        <Label className=" mt-1">{this.props.t("To")}</Label>
                        <DatePicker
                          isClearable={true}
                          components={{ Input: CustomSelectInput }}
                          className="form-control box-border"
                          selectsStart
                          selected={values.to ? new Date(values.to) : ""}
                          onChange={date => {
                            if (date) setFieldValue("to", date)
                          }}
                          placeholderText={this.props.t("Select Date")}
                          dateFormat="dd/MM/yyyy"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>{" "}
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
            {this.props.t("Remove Quotation")}
          </ModalHeader>
          <AvForm onSubmit={() => this.deleteExpenses(this.state.initials._id)}>
            <ModalBody>
              <Fragment>
                <Row className="mb-4">
                  <Label className="av-label ml-3">
                    <h5>
                      {this.props.t(
                        "Are you sure you want to remove this quotation?"
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
      </Fragment>
    )
  }
}
export default withTranslation()(quotationsPage)
