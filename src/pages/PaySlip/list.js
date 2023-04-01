import React, { Component, Fragment } from "react"
import {
  Row,
  Col,
  FormGroup,
  Button,
  Label,
  CardBody,
  Card,
  Container,
  CardTitle,
} from "reactstrap"
import DropDown from "../../common/DropDown"
import CustomSelectInput from "../../common/CustomSelectInput"
import { withTranslation } from "react-i18next"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form, Field } from "formik"
import ListPageHeader from "components/custom/ListPageHeader"

class PaySlip extends Component {
  state = {
    startDate: new Date(),
    buttonAction: false,
    paySlip: {
      EmployeeName: "Employee 1",
      PayPeriod: "01/01/2020",
      Designation: "31/01/2020",
      PayDate: "31/01/2020",
      DOJ: "01/01/2020",
      PfAcNumber: "DG/CCC/45678965",
      UANNumber: "874523691445556",
      Basic: "xxxx",
      Allowances: "xxxxx",
      GrossEarnings: "xxxxx",
      EPFContribution: "xxxxx",
      IncomeTax: "xxxxx",
      TotalDeductions: "xxxxx",
      Netpay: "xxxxx",
    },

    list: [],
  }
  componentDidMount() {
    this.getAllPaySlip()
  }
  getAllPaySlip() {
    this.setState({
      isLoading: false,
    })
    CallService(
      //.GetAll,
      MethodType.POST,
      false,
      "",
      "",
      this.getAllPaySlipResponse
    )
  }
  getAllPaySlipResponse = data => {
    if (data.result) {
      this.setState({
        isLoading: false,
        paySlipList: data.result,
      })
    } else
      this.setState({
        isLoading: false,
      })
  }

  render() {
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops">
          <Card className="m-2 p-4">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t("Pay Slip")}`}
              showSearch={false}
              showButton={false}
            />

            <Formik
              initialValues={this.state.paySlip}
              validateOnBlur={false}
              validateOnChange={false}
            >
              {({ values, setFieldValue, errors }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <Card>
                    <CardBody className="mb-0 pb-0">
                      <Row className="p-3 border pl-4">
                        <Col xs="12" sm="12" md="12" lg={12}>
                          <CardTitle className="pb-3 ">
                            {this.props.t("Employee Pay Summary")}
                          </CardTitle>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative mt-1">
                            <Row>
                              <Col xs="5" sm="5" md="5" lg={5}>
                                <Label className="mt-1">
                                  {this.props.t("Employee Name")}
                                </Label>{" "}
                              </Col>{" "}
                              <Col xs="2" sm="2" md="2" lg={2}>
                                <Label>:</Label>
                              </Col>
                              <Col xs="5" sm="5" md="5" lg={5}>
                                <Label className="ml-2">
                                  {values.EmployeeName}
                                </Label>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative mt-1">
                            <Row>
                              <Col xs="5" sm="5" md="5" lg={5}>
                                <Label className="mt-1">
                                  {this.props.t("Pay Period")}
                                </Label>{" "}
                              </Col>{" "}
                              <Col xs="2" sm="2" md="2" lg={2}>
                                <Label>:</Label>
                              </Col>
                              <Col xs="5" sm="5" md="5" lg={5}>
                                <Label className="ml-2">
                                  {values.PayPeriod}
                                </Label>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative mt-1">
                            <Row>
                              <Col xs="5" sm="5" md="5" lg={5}>
                                <Label className="mt-1">
                                  {this.props.t("Designation")}
                                </Label>{" "}
                              </Col>{" "}
                              <Col xs="2" sm="2" md="2" lg={2}>
                                <Label>:</Label>
                              </Col>
                              <Col xs="5" sm="5" md="5" lg={5}>
                                <Label className="ml-2">
                                  {values.Designation}
                                </Label>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative mt-1">
                            <Row>
                              <Col xs="5" sm="5" md="5" lg={5}>
                                <Label className="mt-1">
                                  {this.props.t("Pay Date")}
                                </Label>{" "}
                              </Col>{" "}
                              <Col xs="2" sm="2" md="2" lg={2}>
                                <Label>:</Label>
                              </Col>
                              <Col xs="5" sm="5" md="5" lg={5}>
                                <Label className="ml-2">{values.PayDate}</Label>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative mt-1">
                            <Row>
                              <Col xs="5" sm="5" md="5" lg={5}>
                                <Label className="mt-1">
                                  {this.props.t("DOJ")}
                                </Label>{" "}
                              </Col>{" "}
                              <Col xs="2" sm="2" md="2" lg={2}>
                                <Label>:</Label>
                              </Col>
                              <Col xs="5" sm="5" md="5" lg={5}>
                                <Label className="ml-2">{values.DOJ}</Label>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative mt-1">
                            <Row>
                              <Col xs="5" sm="5" md="5" lg={5}>
                                <Label className="mt-1">
                                  {this.props.t("PF A/C Number")}
                                </Label>{" "}
                              </Col>{" "}
                              <Col xs="2" sm="2" md="2" lg={2}>
                                <Label>:</Label>
                              </Col>
                              <Col xs="5" sm="5" md="5" lg={5}>
                                <Label className="ml-2">
                                  {values.PfAcNumber}
                                </Label>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative mt-1">
                            <Row>
                              <Col xs="5" sm="5" md="5" lg={5}>
                                <Label className="mt-1">
                                  {this.props.t("UAN Number")}
                                </Label>{" "}
                              </Col>{" "}
                              <Col xs="2" sm="2" md="2" lg={2}>
                                <Label>:</Label>
                              </Col>
                              <Col xs="5" sm="5" md="5" lg={5}>
                                <Label className="ml-2">
                                  {values.UANNumber}
                                </Label>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="p-3 border mt-2 pl-4">
                        <Col xs="6" sm="6" md="6" lg={6}>
                          <Row>
                            <Col xs="12" sm="12" md="12" lg={12}>
                              <FormGroup className="position-relative mt-1">
                                <Row>
                                  <Col xs="7" sm="7" md="7" lg={7}>
                                    <CardTitle>
                                      {this.props.t("Earnings")}
                                    </CardTitle>
                                  </Col>{" "}
                                  <Col
                                    xs="5"
                                    sm="5"
                                    md="5"
                                    lg={5}
                                    className="pl-2"
                                  >
                                    <CardTitle>
                                      {this.props.t("Amount")}
                                    </CardTitle>
                                  </Col>
                                </Row>
                              </FormGroup>
                            </Col>

                            <Col xs="12" sm="12" md="12" lg={12}>
                              <FormGroup className="position-relative mt-1">
                                <Row>
                                  <Col xs="5" sm="5" md="5" lg={5}>
                                    <Label className="mt-1">
                                      {this.props.t("Basic")}
                                    </Label>{" "}
                                  </Col>{" "}
                                  <Col xs="2" sm="2" md="2" lg={2}>
                                    <Label>:</Label>
                                  </Col>
                                  <Col xs="5" sm="5" md="5" lg={5}>
                                    <Label className="ml-2">
                                      {values.Basic}
                                    </Label>
                                  </Col>
                                </Row>
                              </FormGroup>
                            </Col>
                            <Col xs="12" sm="12" md="12" lg={12}>
                              <FormGroup className="position-relative mt-1">
                                <Row>
                                  <Col xs="5" sm="5" md="5" lg={5}>
                                    <Label className="mt-1">
                                      {this.props.t("Allowances")}
                                    </Label>{" "}
                                  </Col>{" "}
                                  <Col xs="2" sm="2" md="2" lg={2}>
                                    <Label>:</Label>
                                  </Col>
                                  <Col xs="5" sm="5" md="5" lg={5}>
                                    <Label className="ml-2">
                                      {values.Allowances}
                                    </Label>
                                  </Col>
                                </Row>
                              </FormGroup>
                            </Col>
                            <Col xs="12" sm="12" md="12" lg={12}>
                              <FormGroup className="position-relative mt-1">
                                <Row>
                                  <Col xs="5" sm="5" md="5" lg={5}>
                                    <Label className="mt-1">
                                      {this.props.t("Gross Earnings")}
                                    </Label>{" "}
                                  </Col>{" "}
                                  <Col xs="2" sm="2" md="2" lg={2}>
                                    <Label>:</Label>
                                  </Col>
                                  <Col xs="5" sm="5" md="5" lg={5}>
                                    <Label className="ml-2">
                                      {values.GrossEarnings}
                                    </Label>
                                  </Col>
                                </Row>
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row className="p-3 border mt-2 pl-4">
                        <Col xs="6" sm="6" md="6" lg={6}>
                          <Row>
                            <Col xs="12" sm="12" md="12" lg={12}>
                              <FormGroup className="position-relative mt-1">
                                <Row>
                                  <Col xs="7" sm="7" md="7" lg={7}>
                                    <CardTitle>
                                      {this.props.t("Deductions")}
                                    </CardTitle>
                                  </Col>{" "}
                                  <Col xs="5" sm="5" md="5" lg={5}>
                                    <CardTitle>
                                      {this.props.t("Amount")}
                                    </CardTitle>
                                  </Col>
                                </Row>
                              </FormGroup>
                            </Col>

                            <Col xs="12" sm="12" md="12" lg={12}>
                              <FormGroup className="position-relative mt-1">
                                <Row>
                                  <Col xs="5" sm="5" md="5" lg={5}>
                                    <Label className="mt-1">
                                      {this.props.t("EPF Contribution")}
                                    </Label>{" "}
                                  </Col>{" "}
                                  <Col xs="2" sm="2" md="2" lg={2}>
                                    <Label>:</Label>
                                  </Col>
                                  <Col xs="5" sm="5" md="5" lg={5}>
                                    <Label className="ml-2">
                                      {values.EPFContribution}
                                    </Label>
                                  </Col>
                                </Row>
                              </FormGroup>
                            </Col>
                            <Col xs="12" sm="12" md="12" lg={12}>
                              <FormGroup className="position-relative mt-1">
                                <Row>
                                  <Col xs="5" sm="5" md="5" lg={5}>
                                    <Label className="mt-1">
                                      {this.props.t("Income Tax")}
                                    </Label>{" "}
                                  </Col>{" "}
                                  <Col xs="2" sm="2" md="2" lg={2}>
                                    <Label>:</Label>
                                  </Col>
                                  <Col xs="5" sm="5" md="5" lg={5}>
                                    <Label className="ml-2">
                                      {values.IncomeTax}
                                    </Label>
                                  </Col>
                                </Row>
                              </FormGroup>
                            </Col>
                            <Col xs="12" sm="12" md="12" lg={12}>
                              <FormGroup className="position-relative mt-1">
                                <Row>
                                  <Col xs="5" sm="5" md="5" lg={5}>
                                    <Label className="mt-1">
                                      {this.props.t("Total Deductions")}
                                    </Label>{" "}
                                  </Col>{" "}
                                  <Col xs="2" sm="2" md="2" lg={2}>
                                    <Label>:</Label>
                                  </Col>
                                  <Col xs="5" sm="5" md="5" lg={5}>
                                    <Label className="ml-2">
                                      {values.TotalDeductions}
                                    </Label>
                                  </Col>
                                </Row>
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row className="pt-3 border mt-2 mb-3 pl-4 ">
                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative mt-1 pb-0">
                            <Row>
                              <Col xs="5" sm="5" md="5" lg={5}>
                                <Label className="mt-1">
                                  {this.props.t("Netpay")}
                                </Label>{" "}
                              </Col>{" "}
                              <Col xs="2" sm="2" md="2" lg={2}>
                                <Label>:</Label>
                              </Col>
                              <Col xs="5" sm="5" md="5" lg={5}>
                                <Label className="ml-2">{values.Netpay}</Label>
                              </Col>
                            </Row>
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

export default withTranslation()(PaySlip)
