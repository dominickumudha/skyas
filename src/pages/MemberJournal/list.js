import React, { Component, Fragment } from "react"
import {
  Container,
  CardBody,
  CardTitle,
  Card,
  Row,
  FormGroup,
  Col,
  Label,
  Table,
  Button,
} from "reactstrap"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { CallService } from "../../helpers/servicecall"
import { MethodType } from "../../constants/defaultValues"
import { withTranslation } from "react-i18next"
import { Formik, Form, Field } from "formik"
import DropDown from "common/DropDown"
import DatePicker from "react-datepicker"
import CustomSelectInput from "../../common/CustomSelectInput"
import { MemberJournalValidationSchema } from "../../helpers/validations"
import { Fields } from "redux-form"
import ListPageHeader from "components/custom/ListPageHeader"

class MemberJournal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Title: [
        { label: "Cash", value: "Cash" },
        { label: "b", value: "b" },
        { label: "c", value: "c" },
      ],
      PaymentMode: [
        { label: "Cash", value: "Cash" },
        { label: "b", value: "b" },
        { label: "c", value: "c" },
      ],
    }
  }
  handleSubmit = values => {
    alert()
  }
  render() {
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops ">
          <Card className=" p-4 page-content ">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t(
                "Member Journal"
              )}`}
              showSearch={false}
              showButton={false}
            />
            <Formik
              initialValues={{}}
              onSubmit={this.handleSubmit}
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={MemberJournalValidationSchema}
            >
              {({ values, setFieldValue, errors }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <Card>
                    <CardBody className="mb-0 pb-0">
                      <Row className="px-3">
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-1">
                          <FormGroup className="position-relative mt-1">
                            <DropDown
                              classNamePrefix="react-select"
                              className="react-select "
                              label={this.props.t("Title")}
                              name="Title"
                              isSearchable
                              options={this.state.Title}
                              placeholderText={""}
                              Checkbox={false}
                              Action={e => {
                                setFieldValue("Title", e.value)
                              }}
                              errors={errors.Title}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField mt-1">
                              {this.props.t("Date")}
                            </Label>
                            <DatePicker
                              components={{ Input: CustomSelectInput }}
                              className="form-control"
                              selected={this.state.startDateTime}
                              isClearable={true}
                              onChange={date => {
                                setFieldValue("Date1", date)
                              }}
                              placeholderText={this.props.t("Select Date")}
                              dateFormat="dd/MM/yyyy"
                            />
                            {errors.Date1 && (
                              <div className="invalid-feedback d-block">
                                {errors.Date1}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField mt-1">
                              {this.props.t("Member ID")}
                            </Label>

                            <Field
                              type="text"
                              name="MemberID"
                              // onKeyPress={this.enterPressed.bind(this)}
                              //onChange={e => onTextChange(e)}
                              className="form-control "
                              placeholder={this.props.t("Search") + "..."}
                              // value={searchValue}
                            />
                            {errors.MemberID && (
                              <div className="invalid-feedback d-block">
                                {errors.MemberID}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative mt-1">
                            <Label className="mt-1">
                              {this.props.t("Number")}
                            </Label>
                            <Field
                              name="Number"
                              id="Number"
                              type="number"
                              className="form-control box-border"
                            />
                            {errors.Number && (
                              <div className="invalid-feedback d-block">
                                {errors.Number}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="12" sm="12" md="12" lg={12} className="pl-4">
                          <FormGroup className="position-relative ">
                            <Label className=" mt-1">
                              {this.props.t("Item Details")}
                            </Label>
                            <Table striped bordered>
                              <thead>
                                <tr>
                                  <th>{this.props.t("Description")}</th>
                                  <th>{this.props.t("Amount")}</th>
                                  <th>{this.props.t("Account Number")}</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td contenteditable="true"> </td>
                                  <td contenteditable="true"> </td>
                                  <td contenteditable="true"> </td>
                                </tr>
                              </tbody>
                            </Table>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="px-3 mt-4">
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-1">
                          <FormGroup className="position-relative mt-1">
                            <DropDown
                              classNamePrefix="react-select"
                              className="react-select "
                              label={this.props.t("Payment Mode")}
                              name="PaymentMode"
                              isSearchable
                              options={this.state.PaymentMode}
                              placeholderText={""}
                              Checkbox={false}
                              Action={e => {
                                setFieldValue("PaymentMode", e.value)
                              }}
                              errors={errors.PaymentMode}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField mt-1">
                              {this.props.t("Amount")}
                            </Label>
                            <Field
                              name="Amount"
                              id="Amount"
                              type="Amount"
                              className="form-control box-border"
                            />
                            {errors.Amount && (
                              <div className="invalid-feedback d-block">
                                {errors.Amount}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField mt-1">
                              {this.props.t("Date")}
                            </Label>
                            <DatePicker
                              components={{ Input: CustomSelectInput }}
                              className="form-control"
                              selected={this.state.startDateTime}
                              isClearable={true}
                              onChange={date => {
                                setFieldValue("Date2", date)
                              }}
                              placeholderText={this.props.t("Select Date")}
                              dateFormat="dd/MM/yyyy"
                            />
                            {errors.Date2 && (
                              <div className="invalid-feedback d-block">
                                {errors.Date2}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField mt-1">
                              {this.props.t("Reference Number")}
                            </Label>

                            <Field
                              name="ReferenceNumber"
                              className="form-control box-border"
                            />
                            {errors.ReferenceNumber && (
                              <div className="invalid-feedback d-block">
                                {errors.ReferenceNumber}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col
                          xs="8"
                          sm="8"
                          md="8"
                          lg="8"
                          xl="8"
                          className="pl-4 "
                        >
                          <FormGroup className="position-relative">
                            <Label>{this.props.t("Remarks")}</Label>

                            <Field
                              className="form-control"
                              name="Remarks"
                              component="textarea"
                            />
                            {errors.Remarks && (
                              <div className="invalid-feedback d-block">
                                {errors.Remarks}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="12" sm="12" md="12" lg={12} className="pl-4">
                          <FormGroup className="position-relative ">
                            <Label className=" mt-1">
                              {this.props.t("If Cash Payment")}
                            </Label>
                            <Table bordered className="text-center">
                              <thead>
                                <tr>
                                  <th>50</th>
                                  <th>100</th>
                                  <th>200</th>
                                  <th>500</th>
                                  <th>2000</th>
                                  <th>{this.props.t("Amount")}</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td contenteditable="true">
                                    <Field
                                      name="Fifty"
                                      type="number"
                                      className="form-control border-0"
                                      onChange={e => {
                                        setFieldValue("Fifty", e.target.value)
                                      }}
                                    />
                                  </td>
                                  <td contenteditable="true">
                                    <Field
                                      name="Hundred"
                                      type="number"
                                      className="form-control border-0"
                                      onChange={e => {
                                        setFieldValue("Hundred", e.target.value)
                                      }}
                                    />
                                  </td>
                                  <td contenteditable="true">
                                    <Field
                                      name="TwoHundred"
                                      type="number"
                                      className="form-control border-0"
                                      onChange={e => {
                                        setFieldValue(
                                          "TwoHundred",
                                          e.target.value
                                        )
                                      }}
                                    />
                                  </td>
                                  <td contenteditable="true">
                                    <Field
                                      name="FiveHundred"
                                      type="number"
                                      className="form-control border-0"
                                      onChange={e => {
                                        setFieldValue(
                                          "FiveHundred",
                                          e.target.value
                                        )
                                      }}
                                    />
                                  </td>
                                  <td contenteditable="true">
                                    <Field
                                      name="TwoThousand"
                                      type="number"
                                      className="form-control border-0"
                                      onChange={e => {
                                        setFieldValue(
                                          "TwoThousand",
                                          e.target.value
                                        )
                                      }}
                                    />
                                  </td>

                                  <td>
                                    {" "}
                                    {`${
                                      (values.Fifty
                                        ? parseInt(values.Fifty) * 50
                                        : 0) +
                                      (values.Hundred
                                        ? parseInt(values.Hundred) * 100
                                        : 0) +
                                      (values.TwoHundred
                                        ? parseInt(values.TwoHundred) * 200
                                        : 0) +
                                      (values.FiveHundred
                                        ? parseInt(values.FiveHundred) * 500
                                        : 0) +
                                      (values.TwoThousand
                                        ? parseInt(values.TwoThousand) * 2000
                                        : 0)
                                    }`}
                                  </td>
                                </tr>
                              </tbody>
                              <tfoot>
                                <th colSpan="5" className="text-right">
                                  {this.props.t("Total Amount")}
                                </th>
                                <th>
                                  {" "}
                                  {`${
                                    (values.Fifty
                                      ? parseInt(values.Fifty) * 50
                                      : 0) +
                                    (values.Hundred
                                      ? parseInt(values.Hundred) * 100
                                      : 0) +
                                    (values.TwoHundred
                                      ? parseInt(values.TwoHundred) * 200
                                      : 0) +
                                    (values.FiveHundred
                                      ? parseInt(values.FiveHundred) * 500
                                      : 0) +
                                    (values.TwoThousand
                                      ? parseInt(values.TwoThousand) * 2000
                                      : 0)
                                  }`}
                                </th>
                              </tfoot>
                            </Table>
                            {errors.IfCashPayment && (
                              <div className="invalid-feedback d-block">
                                {errors.IfCashPayment}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="px-3 mt-2">
                        <Col>
                          <FormGroup className="float-right ">
                            <Button
                              className={
                                this.state.buttonAction ? "disabled" : ""
                              }
                              color="primary"
                              type="submit"
                              onClick={() => console.log(values, errors)}
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
          </Card>
        </Container>
      </Fragment>
    )
  }
}

export default withTranslation()(MemberJournal)
