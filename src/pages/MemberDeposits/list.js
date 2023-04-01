import React, { Component, Fragment } from "react"
import {
  Container,
  Row,
  Col,
  FormGroup,
  Button,
  Label,
  CardBody,
  Card,
  CardTitle,
  CustomInput,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap"
import DropDown from "../../components/custom/DropDown"
import CustomSelectInput from "../../common/CustomSelectInput"
import { withTranslation } from "react-i18next"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import Tooltip from "@material-ui/core/Tooltip"
import { withStyles } from "@material-ui/core/styles"
import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { DepositValidation } from "../../helpers/validations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form, Field } from "formik"
import ListPageHeader from "components/custom/ListPageHeader"

class Deposits extends Component {
  state = {
    buttonAction: false,
    AccountTypeList: [
      { label: "Individual", value: "Individual" },
      { label: "Joint", value: "Individual" },
      { label: "Either or Servivor", value: "Either or Servivor" },
    ],
  }
  componentDidMount() {}

  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageDeposite(values)
  }
  manageDeposite = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageDepositeResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      // .Create,
      MethodType.PUT,
      false,
      values,
      "",
      this.manageDepositeResponse
    )
  }
  manageDepositeResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success("", this.props.t("Deposite Added Successfully"))
    }
  }
  handleCancel = () => {
    toastr.success("", "cancel")
  }
  render() {
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops pb-5">
          <Card className=" p-4 page-content mb-5">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t("Deposits")}`}
              showSearch={false}
              showButton={false}
            />
            <CardBody className="mb-0 pb-0">
              <Formik
                initialValues={{}}
                onSubmit={this.handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
                validationSchema={DepositValidation}
              >
                {({ values, setFieldValue, errors }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <Card>
                      <CardBody className="mb-0 pb-0">
                        <Row className="px-3">
                          <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                            <FormGroup className="position-relative">
                              <DropDown
                                classNamePrefix="react-select"
                                className="react-select"
                                label={this.props.t("Type")}
                                name=""
                                isSearchable
                                options={this.state.AccountTypeList}
                                placeholderText={this.props.t("Select Type")}
                                Checkbox={false}
                                Action={e => {
                                  if (e) setFieldValue("Type", e.value)
                                }}
                                errors={errors.Type}
                              />
                            </FormGroup>
                          </Col>

                          <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                            <FormGroup className="position-relative">
                              <DropDown
                                classNamePrefix="react-select"
                                className="react-select"
                                label={this.props.t("Account Type")}
                                name=""
                                isSearchable
                                options={this.state.depositList}
                                // placeholderText="indiual"
                                Checkbox={false}
                                Action={e => {
                                  if (e) setFieldValue("AccountType", e.value)
                                }}
                                errors={errors.Type}
                              />
                            </FormGroup>
                          </Col>
                          <Col
                            xs="6"
                            sm="6"
                            md="6"
                            lg={6}
                            className="pl-4 mt-3"
                          >
                            <Label className="requiredField mt-1">
                              {this.props.t("Member")}
                            </Label>

                            <FormGroup className="position-relative mt-1">
                              <Field
                                name="Member"
                                id="Member"
                                type="text"
                                className="form-control box-border"
                              />
                              {errors.Member && (
                                <div className="invalid-feedback d-block">
                                  {errors.Member}
                                </div>
                              )}
                            </FormGroup>
                          </Col>

                          <Col
                            xs="6"
                            sm="6"
                            md="6"
                            lg={6}
                            className="pl-4 mt-3"
                          >
                            <Label className="requiredField mt-1">
                              {this.props.t("Amount")}
                            </Label>

                            <FormGroup className="position-relative mt-1">
                              <Field
                                name="Amount"
                                id="Amount"
                                type="text"
                                className="form-control box-border"
                              />
                              {errors.Amount && (
                                <div className="invalid-feedback d-block">
                                  {errors.Amount}
                                </div>
                              )}
                            </FormGroup>
                          </Col>

                          <Col
                            xs="6"
                            sm="6"
                            md="6"
                            lg={6}
                            className="pl-4 mt-3"
                          >
                            <Label className="requiredField mt-1">
                              {this.props.t("Account Number")}
                            </Label>

                            <FormGroup className="position-relative mt-1">
                              <Field
                                name="AccountNumber"
                                id="AccountNumber"
                                type="text"
                                className="form-control box-border"
                              />
                              {errors.AccountNumber && (
                                <div className="invalid-feedback d-block">
                                  {errors.AccountNumber}
                                </div>
                              )}
                            </FormGroup>
                          </Col>

                          <Col
                            xs="6"
                            sm="6"
                            md="6"
                            lg={6}
                            className="pl-4 mt-3"
                          >
                            <Label className="requiredField mt-1">
                              {this.props.t("Tenure")} {this.props.t("(Days)")}
                            </Label>

                            <FormGroup className="position-relative mt-1">
                              <Field
                                name="TenureDays"
                                id="TenureDays"
                                type="text"
                                className="form-control box-border"
                              />
                              {errors.TenureDays && (
                                <div className="invalid-feedback d-block">
                                  {errors.TenureDays}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                          <Col
                            xs="6"
                            sm="6"
                            md="6"
                            lg={6}
                            className="pl-4 mt-3"
                          >
                            <Label className="requiredField mt-1">
                              {this.props.t("Date")}
                            </Label>

                            <FormGroup className="position-relative mt-1">
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
                                <div className="invalid-feedback d-block">
                                  {errors.Date}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                          <Col
                            xs="6"
                            sm="6"
                            md="6"
                            lg={6}
                            className="pl-4 mt-3"
                          >
                            <Label className="requiredField mt-1">
                              {this.props.t("Maturity Date")}
                            </Label>

                            <FormGroup className="position-relative mt-1">
                              <DatePicker
                                selectsStart
                                components={{ Input: CustomSelectInput }}
                                className="form-control"
                                selected={
                                  values.MaturityDate
                                    ? new Date(values.MaturityDate)
                                    : ""
                                }
                                isClearable={true}
                                onChange={date => {
                                  setFieldValue("MaturityDate", date)
                                }}
                                placeholderText={this.props.t("Select Date")}
                                dateFormat="dd/MM/yyyy"
                              />
                              {errors.MaturityDate && (
                                <div className="invalid-feedback d-block">
                                  {errors.MaturityDate}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                          <Col
                            xs="6"
                            sm="6"
                            md="6"
                            lg={6}
                            className="pl-4 mt-3"
                          >
                            <Label className="requiredField mt-1">
                              {this.props.t("Interest Rate")}
                            </Label>

                            <FormGroup className="position-relative mt-1">
                              <Field
                                name="InterestRate"
                                id="InterestRate"
                                type="text"
                                className="form-control box-border"
                              />
                              {errors.InterestRate && (
                                <div className="invalid-feedback d-block">
                                  {errors.InterestRate}
                                </div>
                              )}
                            </FormGroup>
                          </Col>

                          <Col
                            xs="6"
                            sm="6"
                            md="6"
                            lg={6}
                            className="pl-4 mt-3"
                          >
                            <FormGroup className="position-relative mt-1">
                              <DropDown
                                classNamePrefix="react-select"
                                className="react-select"
                                label={this.props.t(
                                  "Interest Payment Frequency"
                                )}
                                name="Allowed For"
                                isSearchable
                                // options={this.state.district}
                                // placeholderText="Employee"
                                Checkbox={false}
                                Action={e => {
                                  if (e)
                                    setFieldValue(
                                      "InterestPaymentFrequency",
                                      e.value
                                    )
                                }}
                                errors={errors.InterestPaymentFrequency}
                              />
                            </FormGroup>
                          </Col>
                          <Col
                            xs="6"
                            sm="6"
                            md="6"
                            lg={6}
                            className="pl-4 mt-3"
                          >
                            <Label className="requiredField mt-1">
                              {this.props.t("Interest Amount")}
                            </Label>

                            <FormGroup className="position-relative mt-1">
                              <Field
                                name="InterestAmount"
                                id="InterestAmount"
                                type="text"
                                className="form-control box-border"
                              />
                              {errors.InterestAmount && (
                                <div className="invalid-feedback d-block">
                                  {errors.InterestAmount}
                                </div>
                              )}
                            </FormGroup>
                          </Col>

                          <Col
                            xs="6"
                            sm="6"
                            md="6"
                            lg={6}
                            className="pl-4 mt-3"
                          >
                            <Label className="requiredField mt-1">
                              {this.props.t("Door No")}
                            </Label>

                            <FormGroup className="position-relative mt-1">
                              <Field
                                name="DoorNo"
                                id="DoorNo"
                                type="text"
                                className="form-control box-border"
                              />
                              {errors.DoorNo && (
                                <div className="invalid-feedback d-block">
                                  {errors.DoorNo}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                          <Col
                            xs="6"
                            sm="6"
                            md="6"
                            lg={6}
                            className="pl-4 mt-3"
                          >
                            <Label className="requiredField mt-1">
                              {this.props.t("Name")}
                            </Label>

                            <FormGroup className="position-relative mt-1">
                              <Field
                                name="Name"
                                id="Name"
                                type="text"
                                className="form-control box-border"
                              />
                              {errors.Name && (
                                <div className="invalid-feedback d-block">
                                  {errors.Name}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                          <Col
                            xs="6"
                            sm="6"
                            md="6"
                            lg={6}
                            className="pl-4 mt-3"
                          >
                            <Label className="requiredField mt-1">
                              {this.props.t("Address Line 1")}
                            </Label>

                            <FormGroup className="position-relative mt-1">
                              <Field
                                name="AddressLineOne"
                                id="AddressLineOne"
                                type="text"
                                className="form-control box-border"
                              />
                              {errors.AddressLineOne && (
                                <div className="invalid-feedback d-block">
                                  {errors.AddressLineOne}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                          <Col
                            xs="6"
                            sm="6"
                            md="6"
                            lg={6}
                            className="pl-4 mt-3"
                          >
                            <Label className=" mt-1">
                              {this.props.t("Address Line 2")}
                            </Label>

                            <FormGroup className="position-relative mt-1">
                              <Field
                                name="AddressLineTwo"
                                id="AddressLineTwo"
                                type="text"
                                className="form-control box-border"
                              />
                            </FormGroup>
                          </Col>
                          <Col
                            xs="6"
                            sm="6"
                            md="6"
                            lg={6}
                            className="pl-4 mt-3"
                          >
                            <FormGroup className="position-relative mt-1">
                              <DropDown
                                classNamePrefix="react-select"
                                className="react-select"
                                label={this.props.t("Area")}
                                name="Area"
                                isSearchable
                                // options={this.state.district}
                                // placeholderText="Employee"
                                Checkbox={false}
                                Action={e => {
                                  if (e) setFieldValue("Area", e.value)
                                }}
                                errors={errors.Area}
                              />
                            </FormGroup>
                          </Col>
                          <Col
                            xs="6"
                            sm="6"
                            md="6"
                            lg={6}
                            className="pl-4 mt-3"
                          >
                            <FormGroup className="position-relative mt-1">
                              <DropDown
                                classNamePrefix="react-select"
                                className="react-select"
                                label={this.props.t("District")}
                                name="District"
                                isSearchable
                                // options={this.state.district}
                                // placeholderText="Employee"
                                Checkbox={false}
                                Action={e => {
                                  if (e) setFieldValue("District", e.value)
                                }}
                                errors={errors.District}
                              />
                            </FormGroup>
                          </Col>
                          <Col
                            xs="6"
                            sm="6"
                            md="6"
                            lg={6}
                            className="pl-4 mt-3"
                          >
                            <FormGroup className="position-relative mt-1">
                              <DropDown
                                classNamePrefix="react-select"
                                className="react-select"
                                label={this.props.t("State")}
                                name="State"
                                isSearchable
                                // options={this.state.district}
                                // placeholderText="Employee"
                                Checkbox={false}
                                Action={e => {
                                  if (e) setFieldValue("State", e.value)
                                }}
                                errors={errors.State}
                              />
                            </FormGroup>
                          </Col>
                          <Col
                            xs="6"
                            sm="6"
                            md="6"
                            lg={6}
                            className="pl-4 mt-3"
                          >
                            <Label className="requiredField mt-1">
                              {this.props.t("Pincode")}
                            </Label>

                            <FormGroup className="position-relative mt-1">
                              <Field
                                name="Pincode"
                                id="Pincode"
                                type="text"
                                className="form-control box-border"
                              />
                              {errors.Pincode && (
                                <div className="invalid-feedback d-block">
                                  {errors.Pincode}
                                </div>
                              )}
                            </FormGroup>
                          </Col>

                          <Col
                            xs="12"
                            sm="12"
                            md="12"
                            lg={12}
                            className="pl-4 mt-3"
                          >
                            <Label className="requiredField mt-1">
                              {this.props.t("Interest Payment Schedule")}
                            </Label>
                            <div className="table-responsive">
                              <Table
                                bordered
                                className="table table-centered table-nowrap mb-0"
                              >
                                <thead className="thead-light">
                                  <tr>
                                    <th>{this.props.t("Date")}</th>
                                    <th>
                                      {this.props.t("Interest To be Paid")}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>{this.props.t("Total Interest")}</td>
                                    <td></td>
                                  </tr>
                                </tbody>
                              </Table>
                            </div>
                          </Col>
                        </Row>
                        <Row className="px-3 mt-3">
                          <Col>
                            <FormGroup className="float-right ">
                              <Button
                                className={
                                  this.state.buttonAction ? "disabled" : ""
                                }
                                color="primary"
                                type="submit"
                              >
                                {this.props.t("Save")}
                              </Button>
                              <Button
                                className="ml-4"
                                color="danger"
                                onClick={() => this.handleCancel()}
                              >
                                {this.props.t("Cancel")}
                              </Button>
                            </FormGroup>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Container>
      </Fragment>
    )
  }
}

export default withTranslation()(Deposits)
