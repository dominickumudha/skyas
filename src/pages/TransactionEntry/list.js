import React, { Component, Fragment } from "react"
import ListPageHeader from "../../components/custom/ListPageHeader"
import DropDown from "../../common/DropDown"
import {
  Container,
  Row,
  Col,
  FormGroup,
  Button,
  Label,
  CardBody,
  Card,
  Table,
  ModalFooter,
} from "reactstrap"
import CustomSelectInput from "../../common/CustomSelectInput"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { transactionEntryValidation } from "../../helpers/validations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { Formik, Form, Field } from "formik"

import { withTranslation } from "react-i18next"
import { ListItemIcon } from "@material-ui/core"

class TransactionEntry extends Component {
  constructor(props) {
    super(props)

    this.state = {
      startDate: new Date(),
      buttonAction: false,
      transactionEntry: {},
      mode: [{ label: "Mode", value: "Mode" }],
    }
  }

  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageTransactionEntry(values)
  }
  //master Data start account no
  getAllMode() {
    CallService(
      //mode.ForAdmin,
      MethodType.POST,
      false,
      { pageNumber: 1, pageLimit: 10000 },
      "",
      this.getAllModeResponse
    )
  }

  getAllModeResponse = data => {
    if (data.result) {
      this.setState({
        modeList: data.result.map(function (a) {
          return { value: a._id, label: a.Name }
        }),
      })
    }
  }
  //master Data end


  render() {
    const INITIALVALUES = this.state.transactionEntry
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops pb-5">
          <Card className=" px-4 pt-4 page-content mb-5 pb-0 mt-5">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t(
                "Transaction Entry"
              )}`}
              showSearch={false}
              showButton={false}
            />

            <CardBody>
              <Formik
                initialValues={INITIALVALUES}
                validationSchema={transactionEntryValidation}
                onSubmit={this.handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
              >
                {({ errors, values, setFieldValue }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <Fragment>
                      <Row>
                        {/*Left Side col start*/}
                        <Col sm="6" md="6" lg="6" xs="6">
                          <Row xs="12" sm="12" md="12" lg={12} className="mt-3">
                            <Col xs="4" sm="4" md="4" lg={4}>
                              <FormGroup className="position-relative">
                                <DropDown
                                  label={this.props.t("Entity")}
                                  classNamePrefix="react-select"
                                  className="react-select"
                                  //  name="entityList"
                                  isSearchable
                                  value={{ label: "Member", value: "Member" }}

                                  //options={this.state.entityList}
                                  //options={this.state.entityList} // master data

                                  Checkbox={false}
                                  Action={e => {
                                    setFieldValue("entityList", e.value)
                                  }}
                                />
                                {errors.entityList && (
                                  <div className="invalid-feedback d-block pl-1">
                                    {errors.entityList}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>
                            <Col xs="4" sm="4" md="4" lg={4}>
                              <Label className="requiredField">
                                {this.props.t("Trans Type")}
                              </Label>
                              <FormGroup className="position-relative">
                                <Field
                                  type="text"
                                  //name="transType"
                                  value="Cash"
                                  className="box-border form-control"
                                />
                                {errors.transType && (
                                  <div className="invalid-feedback d-block pl-1">
                                    {errors.transType}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>
                            <Col xs="4" sm="4" md="4" lg={4}>
                              <FormGroup className="position-relative  pt-2">
                                <Label></Label>
                                <Field
                                  type="text"
                                  //name="transType2"
                                  value="Adjustment"
                                  className="box-border form-control"
                                />
                                {errors.transType2 && (
                                  <div className="invalid-feedback d-block pl-1">
                                    {errors.transType2}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>

                            <Col xs="6" sm="6" md="6" lg={6} className="mt-3">
                              <FormGroup className="position-relative">
                                <Label>{this.props.t("Member")}</Label>

                                <div className="app-search position-relative pt-0 mt-0 bg-white d-lg-block">
                                  <Field
                                    type="text"
                                    name="memberNo"
                                    // onKeyPress={this.enterPressed.bind(this)}
                                    //onChange={e => onTextChange(e)}
                                    // value={searchValue}
                                    className="box-border form-control"
                                    placeholder={this.props.t("Number") + "..."}
                                  />
                                  <span className="bx bx-search-alt"></span>
                                </div>
                                {errors.memberNo && (
                                  <div className="invalid-feedback d-block pl-1">
                                    {errors.memberNo}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>
                            <Col xs="6" sm="6" md="6" lg={6} className="mt-3">
                              <FormGroup className="position-relative  pt-4">
                                <div className="app-search position-relative pt-0 mt-0 bg-white d-lg-block">
                                  <Field
                                    type="text"
                                    name="memberName"
                                    // onKeyPress={this.enterPressed.bind(this)}
                                    //onChange={e => onTextChange(e)}
                                    // value={searchValue}
                                    className="box-border form-control"
                                    placeholder={this.props.t("Name") + "..."}
                                  />
                                  <span className="bx bx-search-alt"></span>
                                </div>
                                {errors.memberName && (
                                  <div className="invalid-feedback d-block pl-1">
                                    {errors.memberName}
                                  </div>
                                )}
                              </FormGroup>
                            </Col>
                          </Row>




                          <div className="ml-2 mr-2 mb-2 mt-3">
                            <Row style={{ height: "250px" }}>
                              <Col
                                sm="7"
                                md="7"
                                lg="7"
                                xs="7"
                                className="border border-light"
                              >

                              </Col>
                              <Col
                                sm="5"
                                md="5"
                                lg="5"
                                xs="5"
                                className="border border-light"
                              >


                              </Col>
                            </Row>
                          </div>

                          <div className="table-responsive mt-5" >
                            <Table
                              Striped

                              className="table table-centered table-nowrap mb-0 "
                            >
                              <thead className="thead-light text-center">
                                <tr>
                                  <th> {this.props.t("S.No")}</th>
                                  <th> {this.props.t("Ledger")}</th>
                                  <th>{this.props.t("A/C No")}</th>
                                  <th>{this.props.t("Amount")} </th>

                                  <th>{this.props.t("Balance")}</th>
                                </tr>
                              </thead>
                              <tbody className="text-center">
                                <tr>
                                  <td>dfg</td>
                                  <td>fgdgd </td>
                                  <td> 455 </td>
                                  <td>fgg </td>
                                  <td>5658</td>
                                </tr>
                                <tr>
                                  {" "}
                                  <td>dfg</td>
                                  <td>fgdgd </td>
                                  <td> 455 </td>
                                  <td>fgg </td>
                                  <td>5658</td>
                                </tr>

                                <tr>
                                  <td></td>
                                  <td></td>

                                  <td>
                                    <Label className="mt-1">
                                      {this.props.t("Total")}
                                    </Label>
                                  </td>
                                  <td>
                                    <Label>34,000</Label>
                                  </td>
                                  <td>
                                    <Label>4,50,000</Label>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Col>
                        {/*Left Side col end*/}

                        {/*Right Side col Start*/}
                        <Col sm="6" md="6" lg="6" xs="6">
                          <div className="border border-light p-1">
                            <h5 className="ml-2 mt-1 mb-4">{this.props.t("Transaction Details")}</h5>
                            <Row className="m-2">

                              <Col sm="6" md="6" lg="6" xs="6" >
                                <FormGroup className="position-relative ml-3">
                                  <Label className="requiredField ">
                                    {this.props.t("Date")}
                                  </Label>

                                  <DatePicker
                                    startDate={this.state.startDateTime}
                                    selectsStart
                                    endDate={this.state.endDateTime}
                                    components={{ Input: CustomSelectInput }}
                                    className="form-control"
                                    selected={this.state.transactionDate}
                                    isClearable={true}
                                    onChange={date => {
                                      setFieldValue("transactionDate", date)
                                      if (date)
                                        this.setState(
                                          {
                                            transactionDate: date,
                                            listRequestModel: {
                                              ...this.state.listRequestModel,

                                              pageNumber: 1,

                                              StartTime: parseInt(
                                                new Date(
                                                  date.setHours(0, 0, 0)
                                                ).getTime()
                                              ),
                                            },
                                          },
                                          () => {
                                            // this.GetAllLeave();
                                          }
                                        )
                                      else
                                        this.setState(
                                          {
                                            transactionDate: "",
                                            listRequestModel: {
                                              ...this.state.listRequestModel,

                                              pageNumber: 1,

                                              StartTime: "",
                                            },
                                          },
                                          () => {
                                            // this.GetAllLeave();
                                          }
                                        )
                                    }}
                                    placeholderText={this.props.t("Select Date")}
                                    dateFormat="dd/MM/yyyy"
                                  />

                                  {errors.transactionDate && (
                                    <div className="invalid-feedback d-block">
                                      {errors.transactionDate}
                                    </div>
                                  )}
                                </FormGroup>
                              </Col>
                              <Col sm="6" md="6" lg="6" xs="6" >
                                <FormGroup className="position-relative">
                                  <Label>{this.props.t("Number")}</Label>
                                  <Field type="number" name=" transactionNumber" className="box-border form-control" />
                                  {errors.transactionNumber && (
                                    <div className="invalid-feedback d-block">
                                      {errors.transactionNumber}
                                    </div>
                                  )}
                                </FormGroup>
                              </Col>

                            </Row>
                          </div>
                          <Row className="mt-2 m-2">
                            <Col sm="3" md="3" lg="3" xs="3" >
                              <FormGroup className="position-relative">
                                <Label>{this.props.t("Payment")}</Label>
                                <Field type="number" name="payment1" className="box-border form-control" />
                              </FormGroup>
                            </Col>
                            <Col sm="3" md="3" lg="3" xs="3" >
                              <FormGroup className="position-relative mt-4 pt-1">

                                <Field type="number" name="payment2" className="box-border form-control" />
                              </FormGroup>
                            </Col>
                            <Col sm="6" md="6" lg="6" xs="6" class>
                              <FormGroup className="position-relative mt-4 pt-1">

                                <Field type="number" name="payment3" className="box-border form-control" />
                              </FormGroup>
                            </Col>
                          </Row>
                          <div className="border border-light p-1 m-1">
                            <h5 className="ml-2 mt-1 mb-4">{this.props.t("Receipts")}</h5>
                            <Row className="m-2">
                              <Col sm="6" md="6" lg="6" xs="6" >
                                <FormGroup className="position-relative">

                                  <DropDown
                                    label={this.props.t("Mode")}
                                    classNamePrefix="react-select"
                                    className="react-select"
                                    name="mode"
                                    isSearchable
                                    options={this.state.mode}
                                    //options={this.state.modeList} // master data

                                    Checkbox={false}
                                    Action={e => {
                                      setFieldValue("mode", e.value)
                                    }}
                                  />
                                  {errors.mode && (
                                    <div className="invalid-feedback d-block pl-1">
                                      {errors.mode}
                                    </div>
                                  )}

                                </FormGroup>
                              </Col>
                              <Col sm="6" md="6" lg="6" xs="6" class>
                                <FormGroup className="position-relative mt-4 pt-1">
                                  <Label className="requiredField">{this.props.t("Amount")}</Label>
                                  <Field type="number" name="amount" className="box-border form-control" />
                                  {errors.amount && (
                                    <div className="invalid-feedback d-block pl-1">
                                      {errors.amount}
                                    </div>
                                  )}
                                </FormGroup>
                              </Col>
                              <Col sm="6" md="6" lg="6" xs="6" class>
                                <FormGroup className="position-relative">
                                  <Label className="requiredField">{this.props.t("Challan Date")}</Label>
                                  <DatePicker
                                    startDate={this.state.startDateTime}
                                    selectsStart
                                    endDate={this.state.endDateTime}
                                    components={{ Input: CustomSelectInput }}
                                    className="form-control"
                                    selected={this.state.challanDate}
                                    isClearable={true}
                                    onChange={date => {
                                      setFieldValue("challanDate", date)
                                      if (date)
                                        this.setState(
                                          {
                                            challanDate: date,
                                            listRequestModel: {
                                              ...this.state.listRequestModel,

                                              pageNumber: 1,

                                              StartTime: parseInt(
                                                new Date(
                                                  date.setHours(0, 0, 0)
                                                ).getTime()
                                              ),
                                            },
                                          },
                                          () => {
                                            // this.GetAllLeave();
                                          }
                                        )
                                      else
                                        this.setState(
                                          {
                                            challanDate: "",
                                            listRequestModel: {
                                              ...this.state.listRequestModel,

                                              pageNumber: 1,

                                              StartTime: "",
                                            },
                                          },
                                          () => {
                                            // this.GetAllLeave();
                                          }
                                        )
                                    }}
                                    placeholderText={this.props.t("Select Date")}
                                    dateFormat="dd/MM/yyyy"
                                  />

                                  {errors.challanDate && (
                                    <div className="invalid-feedback d-block">
                                      {errors.challanDate}
                                    </div>
                                  )}

                                </FormGroup>
                              </Col>
                              <Col sm="6" md="6" lg="6" xs="6">


                                <FormGroup className="position-relative">
                                  <Label className="requiredField">
                                    {this.props.t("Chq Date")}
                                  </Label>

                                  <DatePicker
                                    startDate={this.state.startDateTime}
                                    selectsStart
                                    endDate={this.state.endDateTime}
                                    components={{ Input: CustomSelectInput }}
                                    className="form-control"
                                    selected={this.state.chqDate}
                                    isClearable={true}
                                    onChange={date => {
                                      setFieldValue("chqDate", date)
                                      if (date)
                                        this.setState(
                                          {
                                            chqDate: date,
                                            listRequestModel: {
                                              ...this.state.listRequestModel,

                                              pageNumber: 1,

                                              StartTime: parseInt(
                                                new Date(
                                                  date.setHours(0, 0, 0)
                                                ).getTime()
                                              ),
                                            },
                                          },
                                          () => {
                                            // this.GetAllLeave();
                                          }
                                        )
                                      else
                                        this.setState(
                                          {
                                            chqDate: "",
                                            listRequestModel: {
                                              ...this.state.listRequestModel,

                                              pageNumber: 1,

                                              StartTime: "",
                                            },
                                          },
                                          () => {
                                            // this.GetAllLeave();
                                          }
                                        )
                                    }}
                                    placeholderText={this.props.t("Select Date")}
                                    dateFormat="dd/MM/yyyy"
                                  />

                                  {errors.chqDate && (
                                    <div className="invalid-feedback d-block">
                                      {errors.chqDate}
                                    </div>
                                  )}
                                </FormGroup>





                              </Col>
                              <Col sm="4" md="4" lg="4" xs="4" class>
                                <FormGroup className="position-relative">
                                  <Label>{this.props.t("Number")}</Label>
                                  <Field type="number" name="number" className="box-border form-control" />


                                  {errors.number && (
                                    <div className="invalid-feedback d-block">
                                      {errors.number}
                                    </div>
                                  )}
                                </FormGroup>
                              </Col>
                              <Col sm="4" md="4" lg="4" xs="4" class>
                                <FormGroup className="position-relative">
                                  <Label>{this.props.t("Prefix")}</Label>
                                  <Field type="number" name="prefix" className="box-border form-control" />


                                  {errors.prefix && (
                                    <div className="invalid-feedback d-block">
                                      {errors.prefix}
                                    </div>
                                  )}
                                </FormGroup>
                              </Col>

                              <Col sm="4" md="4" lg="4" xs="4" class>
                                <FormGroup className="position-relative">
                                  <Label>{this.props.t("Sr.No")}</Label>
                                  <Field type="text" name="srNo" className="box-border form-control" />

                                  {errors.srNo && (
                                    <div className="invalid-feedback d-block">
                                      {errors.srNo}
                                    </div>
                                  )}
                                </FormGroup>
                              </Col>

                              <Col sm="4" md="4" lg="4" xs="4" class>
                                <FormGroup className="position-relative">
                                  <Label>{this.props.t("Bank")}</Label>
                                  <Field type="text" name="bank" className="box-border form-control" />

                                  {errors.bank && (
                                    <div className="invalid-feedback d-block">
                                      {errors.bank}
                                    </div>
                                  )}
                                </FormGroup>
                              </Col>

                              <Col sm="8" md="8" lg="8" xs="8" class>
                                <FormGroup className="position-relative mt-4">

                                  <Field type="number" name="amount" className="box-border form-control" />
                                </FormGroup>
                              </Col>
                            </Row>
                          </div>
                          <div className="table-responsive mt-3" >
                            <Table
                              Striped

                              className="table table-centered table-nowrap mb-0 "
                            >
                              <thead className="thead-light text-center">
                                <tr>
                                  <th> {this.props.t("S.No")}</th>
                                  <th> {this.props.t("Ledger")}</th>
                                  <th>{this.props.t("Receipts")}</th>
                                  <th>{this.props.t("Payments")} </th>
                                </tr>
                              </thead>
                              <tbody className="text-center">
                                <tr >
                                  <td>dfg</td>
                                  <td>fgdgd </td>
                                  <td> 455 </td>

                                  <td>5658</td>
                                </tr>
                                <tr>
                                  {" "}
                                  <td>dfg</td>
                                  <td>fgdgd </td>
                                  <td> 455 </td>

                                  <td>5658</td>
                                </tr>

                                <tr>
                                  <td></td>


                                  <td>
                                    <Label className="mt-1">
                                      {this.props.t("Total")}
                                    </Label>
                                  </td>
                                  <td>
                                    <Label>34,000</Label>
                                  </td>
                                  <td>
                                    <Label>4,50,000</Label>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Col>

                        {/*Right Side col end*/}
                      </Row>
                    </Fragment>
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

export default withTranslation()(TransactionEntry)
