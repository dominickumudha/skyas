/**START OF GENERATED CODE**/
import React, { Component, Fragment } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Button,
  Container,
  CustomInput,
} from "reactstrap"
import { tentativeBudgetingValidation } from "../../helpers/validations"
import { withTranslation } from "react-i18next"
// import { tentativeBudgeting, level, areatype } from "../../constants/config";
import CustomSelectInput from "../../common/CustomSelectInput"
import { CallService } from "../../helpers/servicecall"
import { INVALID_CHARS } from "../../helpers/utils"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { Formik, Form, Field } from "formik"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
class ManageTentativeBudgeting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tentativeBudgeting: {
        Name: "",
        FiscalYear: "",
        BudgetPeriod: "",
        IncomeAccounts: [{ IncomeAccounts: "" }],
        ExpenseAccounts: [{ ExpenseAccounts: "" }],
      },
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params

    if (id) {
      this.getOneTentativeBudgeting(id)
    }
  }

  getOneTentativeBudgeting(id) {
    CallService(
      // tentativeBudgeting.GetOne + id,
      MethodType.GET,
      false,
      "",
      "",
      this.getOneTentativeBudgetingResponse
    )
  }

  getOneTentativeBudgetingResponse = data => {
    this.setState({
      tentativeBudgeting: data.result,
    })
  }

  handleSubmit = values => {
    console.log(values)
    this.manageTentativeBudgeting()
  }
  manageTentativeBudgeting = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageTentativeBudgetingResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //values._id ? .Update + values._id : .Create,
      values._id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      this.manageTentativeBudgetingResponse
    )
  }
  manageTentativeBudgetingResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      this.props.history.push("/tentative-budgeting")
      toastr.success(
        "",
        this.state.tentativeBudgeting._id
          ? this.props.t("Tentative Budgeting Edited Successfully")
          : this.props.t("Tentative Budgeting Added Successfully")
      )
    }
  }

  render() {
    return (
      <Fragment>
        <Container fluid className="page-content">
          <Row className="mb-4">
            <Col xxs="12">
              <Card>
                <CardBody>
                  <CardTitle>
                    <h4 className="mb-2 font-size-18">
                      {this.props.t("Tentative Budgeting")}
                    </h4>
                  </CardTitle>
                  <Formik
                    initialValues={this.state.tentativeBudgeting}
                    onSubmit={this.handleSubmit}
                    validateOnBlur={false}
                    validateOnChange={false}
                    validationSchema={tentativeBudgetingValidation}
                  >
                    {({ setFieldValue, values, errors }) => (
                      <Form className="av-tooltip tooltip-label-bottom p-3">
                        <Row>
                          <Col
                            xs="11"
                            sm="11"
                            md="11"
                            lg="11"
                            xl="11"
                            className="mt-2"
                          >
                            <FormGroup className="position-relative mt-1">
                              <Label className="requiredField mt-1">
                                {this.props.t("Name")}
                              </Label>

                              <Field
                                className="form-control box-border"
                                name="Name"
                                onKeyPress={event => {
                                  if (INVALID_CHARS.includes(event.key)) {
                                    event.preventDefault()
                                  }
                                }}
                              />

                              {errors.Name && (
                                <div className="invalid-feedback d-block">
                                  {errors.Name}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs="11" sm="11" md="11" lg={11}>
                            <FormGroup className="position-relative mt-1">
                              <Label className="requiredField mt-1">
                                {this.props.t("Fiscal Year")}
                              </Label>
                              <DatePicker
                                selectsStart
                                components={{ Input: CustomSelectInput }}
                                className="form-control "
                                selected={
                                  values.FiscalYear
                                    ? new Date(values.FiscalYear)
                                    : ""
                                }
                                isClearable={true}
                                onChange={date => {
                                  setFieldValue("FiscalYear", date)
                                }}
                                placeholderText={this.props.t("Select Date")}
                                dateFormat="dd/MM/yyyy"
                              />
                              {errors.FiscalYear && (
                                <div className="invalid-feedback d-block">
                                  {errors.FiscalYear}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          {" "}
                          <Col xs="11" sm="11" md="11" lg="11" xl="11">
                            <FormGroup className="position-relative mt-1">
                              <Label className="requiredField mt-1">
                                {this.props.t("Budget Period")}
                              </Label>
                              <Field
                                className="form-control box-border"
                                name="BudgetPeriod"
                                type="number"
                              />
                              {errors.BudgetPeriod && (
                                <div className="invalid-feedback d-block">
                                  {errors.BudgetPeriod}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs="12" sm="12" md="12" lg="12" xl="12">
                            <FormGroup className="position-relative mt-1">
                              <Label className="mt-1">
                                {this.props.t("Income Accounts")}
                              </Label>
                              {values.IncomeAccounts &&
                                values.IncomeAccounts.map((lpd, i) => (
                                  <Row>
                                    <Col
                                      sm="11"
                                      md="11"
                                      lg="11"
                                      xs="11"
                                      className="mb-2"
                                    >
                                      <CustomInput
                                        className="position-sticky"
                                        key={"IncomeAccounts"}
                                        type="file"
                                        name={"IncomeAccounts"}
                                        onChange={event => {
                                          var IncomeAccounts =
                                            values.IncomeAccounts

                                          IncomeAccounts.splice(i, 1, {
                                            IncomeAccounts:
                                              event.target.files[0],
                                          })

                                          setFieldValue(
                                            `IncomeAccounts`,
                                            IncomeAccounts
                                          )
                                        }}
                                      />
                                    </Col>
                                    <Col xxs="1" sm="1" lg="1" md="1">
                                      {i === values.IncomeAccounts.length - 1 &&
                                        i !== 0 && (
                                          <Row>
                                            <Button
                                              color="primary"
                                              onClick={() => {
                                                var IncomeAccounts =
                                                  values.IncomeAccounts
                                                IncomeAccounts.splice(i, 1)
                                                setFieldValue(
                                                  `IncomeAccounts`,
                                                  IncomeAccounts
                                                )
                                              }}
                                            >
                                              -
                                            </Button>
                                            <Button
                                              color="primary"
                                              className=" ml-2"
                                              onClick={() => {
                                                var IncomeAccounts =
                                                  values.IncomeAccounts
                                                IncomeAccounts.push("")
                                                setFieldValue(
                                                  `IncomeAccounts`,
                                                  IncomeAccounts
                                                )
                                              }}
                                            >
                                              +
                                            </Button>
                                          </Row>
                                        )}
                                      {values.IncomeAccounts.length - 1 === 0 &&
                                        i === 0 && (
                                          <Row>
                                            <Button
                                              color="primary"
                                              onClick={() => {
                                                var IncomeAccounts =
                                                  values.IncomeAccounts
                                                IncomeAccounts.push("")
                                                setFieldValue(
                                                  `IncomeAccounts`,
                                                  IncomeAccounts
                                                )
                                              }}
                                            >
                                              +
                                            </Button>
                                          </Row>
                                        )}
                                      {i !== values.IncomeAccounts.length - 1 &&
                                        i >= 0 && (
                                          <Row>
                                            <Button
                                              color="primary"
                                              onClick={() => {
                                                var IncomeAccounts =
                                                  values.IncomeAccounts
                                                IncomeAccounts.splice(i, 1)
                                                setFieldValue(
                                                  `IncomeAccounts`,
                                                  IncomeAccounts
                                                )
                                              }}
                                            >
                                              -
                                            </Button>
                                          </Row>
                                        )}
                                    </Col>
                                    {errors.IncomeAccounts && (
                                      <div className="invalid-feedback d-block ml-3">
                                        {
                                          errors.IncomeAccounts[i]
                                            .IncomeAccounts
                                        }
                                      </div>
                                    )}
                                  </Row>
                                ))}
                            </FormGroup>
                          </Col>
                        </Row>{" "}
                        <Row>
                          <Col xs="12" sm="12" md="12" lg="12" xl="12">
                            <FormGroup className="position-relative mt-1">
                              <Label className="mt-1">
                                {this.props.t("Expense Accounts")}
                              </Label>
                              {values.ExpenseAccounts &&
                                values.ExpenseAccounts.map((lpd, i) => (
                                  <Row>
                                    <Col
                                      sm="11"
                                      md="11"
                                      lg="11"
                                      xs="11"
                                      className="mb-2"
                                    >
                                      <CustomInput
                                        className="position-sticky"
                                        type="file"
                                        name={"ExpenseAccounts"}
                                        onChange={event => {
                                          var ExpenseAccounts =
                                            values.ExpenseAccounts
                                          ExpenseAccounts.splice(i, 1, {
                                            ExpenseAccounts:
                                              event.target.files[0],
                                          })
                                          setFieldValue(
                                            `ExpenseAccounts`,
                                            ExpenseAccounts
                                          )
                                        }}
                                      />
                                    </Col>

                                    <Col xxs="1" sm="1" lg="1" md="1">
                                      {i ===
                                        values.ExpenseAccounts.length - 1 &&
                                        i !== 0 && (
                                          <Row>
                                            <Button
                                              color="primary"
                                              onClick={() => {
                                                var ExpenseAccounts =
                                                  values.ExpenseAccounts
                                                ExpenseAccounts.splice(i, 1)
                                                setFieldValue(
                                                  `ExpenseAccounts`,
                                                  ExpenseAccounts
                                                )
                                              }}
                                            >
                                              -
                                            </Button>
                                            <Button
                                              color="primary"
                                              className=" ml-2"
                                              onClick={() => {
                                                var ExpenseAccounts =
                                                  values.ExpenseAccounts
                                                ExpenseAccounts.push("")
                                                setFieldValue(
                                                  `ExpenseAccounts`,
                                                  ExpenseAccounts
                                                )
                                              }}
                                            >
                                              +
                                            </Button>
                                          </Row>
                                        )}
                                      {values.ExpenseAccounts.length - 1 ===
                                        0 &&
                                        i === 0 && (
                                          <Row>
                                            <Button
                                              color="primary"
                                              onClick={() => {
                                                var ExpenseAccounts =
                                                  values.ExpenseAccounts
                                                ExpenseAccounts.push("")
                                                setFieldValue(
                                                  `ExpenseAccounts`,
                                                  ExpenseAccounts
                                                )
                                              }}
                                            >
                                              +
                                            </Button>
                                          </Row>
                                        )}
                                      {i !==
                                        values.ExpenseAccounts.length - 1 &&
                                        i >= 0 && (
                                          <Row>
                                            <Button
                                              color="primary"
                                              onClick={() => {
                                                var ExpenseAccounts =
                                                  values.ExpenseAccounts
                                                ExpenseAccounts.splice(i, 1)
                                                setFieldValue(
                                                  `ExpenseAccounts`,
                                                  ExpenseAccounts
                                                )
                                              }}
                                            >
                                              -
                                            </Button>
                                          </Row>
                                        )}
                                    </Col>
                                    {errors.ExpenseAccounts && (
                                      <div className="invalid-feedback d-block ml-3">
                                        {
                                          errors.IncomeAccounts[i]
                                            .IncomeAccounts
                                        }
                                      </div>
                                    )}
                                  </Row>
                                ))}
                            </FormGroup>
                          </Col>
                        </Row>{" "}
                        <Row className="mt-2">
                          <Col sm={12}>
                            <FormGroup className="float-sm-right  mt-1">
                              <Button type="submit" outline color="primary">
                                {this.props.t("Save")}
                              </Button>
                              <Button
                                className="ml-2"
                                type="button"
                                onClick={() => {
                                  this.props.history.push(
                                    "/tentative-budgeting"
                                  )
                                }}
                                color="danger"
                              >
                                {this.props.t("Cancel")}
                              </Button>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>
                    )}
                  </Formik>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    )
  }
}
export default withTranslation()(ManageTentativeBudgeting)
