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
  Table,
  ModalBody,
  CardTitle,
} from "reactstrap"
import { CallService } from "../../helpers/servicecall"
import { AvForm } from "availity-reactstrap-validation"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import {
  QuotationValidation,
  QuotationModalValidation,
} from "../../helpers/validations"
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
      tableValues: [],
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
    }
  }
  addBtnClick = () => {
    this.toggleManageModal()
  }
  handleSubmit = () => {
    this.props.history.push("/quotations-page")
    this.state.initials && this.state.initials._id
      ? toastr.success("", `${this.props.t("Quotation Edited Successfully")}`)
      : toastr.success("", `${this.props.t("Quotation Added Successfully")}`)
  }
  handleRowClicked = row => {
    if (row) {
      this.setState({
        initials: row,
        manageModal: !this.state.manageModal,
      })
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
  handleCancel = () => {}
  handleModalSubmit = values => {
    values.Amount = values.Quantity * values.Price
    values._id = 1
    this.state.tableValues.push(values)
    this.toggleManageModal()
  }
  render() {
    const initialValues = this.state.initials
    let SubTotal = 0
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops">
          <Card className="m-2 p-4">
            <CardTitle>
              <h4 className="mb-2 font-size-18 ">
                {this.props.t("Quotations")}
              </h4>
            </CardTitle>
            <Formik
              initialValues={initialValues}
              onSubmit={this.handleSubmit}
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={QuotationValidation}
            >
              {({ values, setFieldValue, errors }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <CardBody>
                    <Fragment>
                      <Row className="px-3 mt-1">
                        <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                          <FormGroup className="position-relative">
                            <DropDown
                              classNamePrefix="react-select"
                              className="react-select"
                              label={this.props.t("Vendor")}
                              name="vendor"
                              isSearchable
                              options={this.state.vendor}
                              placeholderText={""}
                              Checkbox={false}
                              Action={e => {
                                if (e) setFieldValue("vendor", e.value)
                              }}
                              errors={errors.vendor}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                          <Label className="requiredField mt-1">
                            {this.props.t("Quotation Number")}
                          </Label>

                          <Field
                            name="quotationNum"
                            id="first"
                            type="text"
                            className="form-control box-border"
                          />
                          {errors.quotationNum && (
                            <div className="invalid-feedback d-block ">
                              {errors.quotationNum}
                            </div>
                          )}
                        </Col>
                      </Row>
                      <Row className="px-3">
                        <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                          <Label className="requiredField mt-1">
                            {this.props.t("Date")}
                          </Label>
                          <DatePicker
                            isClearable={true}
                            components={{ Input: CustomSelectInput }}
                            className="form-control box-border"
                            selectsStart
                            selected={values.Date ? new Date(values.Date) : ""}
                            onChange={date => {
                              if (date) setFieldValue("Date", date)
                            }}
                            placeholderText={this.props.t("Select Date")}
                            dateFormat="dd/MM/yyyy"
                          />
                          {errors.Date && (
                            <div className="invalid-feedback d-block ">
                              {errors.Date}
                            </div>
                          )}
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                          <FormGroup className="float-right ">
                            <Button
                              className="btn singleEvent  mt-2 mb-3"
                              color="primary"
                              onClick={() => this.addBtnClick()}
                            >
                              {this.props.t("Add")}
                            </Button>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="px-3">
                        <div
                          style={{
                            maxHeight: "500px",
                            width: "100%",
                            overflowY: "auto",
                            padding: "10px",
                          }}
                        >
                          <Table striped bordered hover>
                            <thead style={{ fontSize: "13px" }}>
                              <tr className="text-center">
                                <th>{this.props.t("Name")}</th>
                                <th> {this.props.t("Quantity")}</th>
                                <th> {this.props.t("Price")}</th>
                                <th>{this.props.t("Amount")}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.tableValues
                                ? this.state.tableValues.map(data => {
                                    SubTotal = SubTotal + parseInt(data.Amount)
                                    return (
                                      <tr
                                        className="tablerow text-center "
                                        onClick={() =>
                                          this.handleRowClicked(data)
                                        }
                                      >
                                        <td>{data.Name}</td>
                                        <td>{data.Quantity}</td>
                                        <td>{data.Price}</td>
                                        <td>{data.Amount}</td>
                                      </tr>
                                    )
                                  })
                                : ""}
                            </tbody>
                            <tfoot>
                              {" "}
                              <tr>
                                <th colSpan="3" className="text-right p-2">
                                  {this.props.t("Sub Total")}
                                </th>

                                <td className="tablerow text-center">
                                  {SubTotal}
                                </td>
                              </tr>
                              <tr>
                                <th colSpan="3" className="pr-3">
                                  <Row>
                                    <Col>
                                      <Label className="requiredField mt-1 float-right">
                                        {this.props.t("SGST")}
                                      </Label>
                                    </Col>
                                    <Col xs="1" sm="1" md="1" lg="1">
                                      <Field
                                        name="SGST"
                                        type="number"
                                        className="form-control box-border float-right"
                                      />
                                      {errors.SGST && (
                                        <div className="invalid-feedback d-block ">
                                          {errors.SGST}
                                        </div>
                                      )}
                                    </Col>{" "}
                                    %
                                  </Row>

                                  <Row className="mt-1">
                                    <Col>
                                      <Label className="requiredField mt-1 float-right">
                                        {this.props.t("CGST")}
                                      </Label>
                                    </Col>
                                    <Col xs="1" sm="1" md="1" lg="1">
                                      <Field
                                        name="CGST"
                                        type="number"
                                        className="form-control box-border"
                                      />

                                      {errors.CGST && (
                                        <div className="invalid-feedback d-block ">
                                          {errors.CGST}
                                        </div>
                                      )}
                                    </Col>
                                    %
                                  </Row>
                                </th>{" "}
                                <td className="text-center">
                                  <Row>
                                    <Col>
                                      {values.SGST
                                        ? (SubTotal * parseInt(values.SGST)) /
                                          100
                                        : ""}
                                    </Col>
                                  </Row>
                                  <Row className=" mt-2">
                                    <Col>
                                      {values.CGST
                                        ? (SubTotal * parseInt(values.CGST)) /
                                          100
                                        : ""}
                                    </Col>
                                  </Row>
                                </td>{" "}
                              </tr>
                              <tr>
                                <th colSpan="3" className="text-right p-2">
                                  {this.props.t("Total")}
                                </th>
                                <td></td>
                              </tr>
                            </tfoot>
                          </Table>
                        </div>
                      </Row>
                      <Row className="px-3">
                        <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                          <Label className="requiredField mt-1">
                            {this.props.t("Quotation Copy")}
                          </Label>
                          <CustomInput
                            key={"imageUrl"}
                            type="file"
                            name={"quotationCopy"}
                            onChange={event => {
                              setFieldValue(
                                "quotationCopy",
                                event.target.files[0]
                              )
                            }}
                          />

                          {errors.quotationCopy ? (
                            <div className="invalid-feedback d-block">
                              {errors.quotationCopy}
                            </div>
                          ) : null}
                          <p className="text-semi-muted">
                            {this.props.t(
                              "Allowed formats are doc,docx and pdf"
                            )}
                          </p>
                        </Col>
                      </Row>{" "}
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
                            onClick={() => this.handleCancel()}
                          >
                            {this.props.t("Cancel")}
                          </Button>
                        </FormGroup>
                      </Col>
                    </Fragment>
                  </CardBody>
                </Form>
              )}
            </Formik>
            <Modal
              isOpen={this.state.manageModal}
              toggle={this.toggleManageModal}
            >
              <ModalHeader toggle={this.toggleManageModal}>
                {this.state.initials && this.state.initials._id
                  ? this.props.t("Edit Quotations")
                  : this.props.t("Add Quotations")}
              </ModalHeader>
              <ModalBody>
                <Fragment>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={this.handleModalSubmit}
                    validateOnBlur={false}
                    validateOnChange={false}
                    validationSchema={QuotationModalValidation}
                  >
                    {({ setFieldValue, errors }) => (
                      <Form className="av-tooltip tooltip-label-bottom">
                        <ModalBody>
                          <Fragment>
                            <Row>
                              <Col xs="12" sm="12" md="12" lg={12}>
                                <Label className="requiredField ">
                                  {this.props.t("Name")}
                                </Label>

                                <Field
                                  name="Name"
                                  type="text"
                                  className="form-control box-border"
                                />
                                {errors.Name && (
                                  <div className="invalid-feedback d-block ">
                                    {errors.Name}
                                  </div>
                                )}
                              </Col>
                            </Row>
                            <Row>
                              <Col
                                xs="12"
                                sm="12"
                                md="12"
                                lg={12}
                                className="mt-1"
                              >
                                <Label className="requiredField mt-1">
                                  {this.props.t("Quantity")}
                                </Label>

                                <Field
                                  name="Quantity"
                                  type="number"
                                  className="form-control box-border"
                                />
                                {errors.Quantity && (
                                  <div className="invalid-feedback d-block ">
                                    {errors.Quantity}
                                  </div>
                                )}
                              </Col>
                            </Row>

                            <Row>
                              <Col
                                xs="12"
                                sm="12"
                                md="12"
                                lg={12}
                                className="mt-1"
                              >
                                <Label className="requiredField mt-1">
                                  {this.props.t("Price")}
                                </Label>

                                <Field
                                  name="Price"
                                  type="number"
                                  className="form-control box-border"
                                />
                                {errors.Price && (
                                  <div className="invalid-feedback d-block ">
                                    {errors.Price}
                                  </div>
                                )}
                              </Col>
                            </Row>
                          </Fragment>
                        </ModalBody>
                        <ModalFooter>
                          <Col xs="12" sm="12" md="12" lg="12" xl="12">
                            <FormGroup className="float-right mb-0 pb-0">
                              <Button color="primary" type="submit">
                                {this.props.t("Save")}
                              </Button>
                              <Button
                                className="btn singleEvent  ml-4"
                                color="danger"
                                onClick={() => this.toggleManageModal()}
                              >
                                {this.props.t("Cancel")}
                              </Button>
                            </FormGroup>
                          </Col>
                        </ModalFooter>
                      </Form>
                    )}
                  </Formik>
                </Fragment>
              </ModalBody>
            </Modal>
          </Card>
        </Container>
      </Fragment>
    )
  }
}
export default withTranslation()(quotationsPage)
