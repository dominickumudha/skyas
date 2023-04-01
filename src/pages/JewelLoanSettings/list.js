import React, { Component, Fragment } from "react"
import ListPageHeader from "../../components/custom/ListPageHeader"
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
  ModalFooter,
} from "reactstrap"

import CustomSelectInput from "../../common/CustomSelectInput"

import toastr from "toastr"
import "toastr/build/toastr.min.css"

import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { jewelLoanValidation } from "../../helpers/validations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { Formik, Form, Field } from "formik"

import { withTranslation } from "react-i18next"

class JewelLoanSettings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      startDate: new Date(),
      buttonAction: false,
      jewelLoan: {
        marketRate: "",
        netWeight: "",
        effectiveFrom: "",
        effectiveTo: "",
      },
    }
  }
//Cancel function start

handleCancel = () => {
  toastr.success("",  this.props.t("Cancel"))
}
//cancel funciton end

  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageJewelLoan(values)
  }
  manageJewelLoan = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageJewelLoanResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //.Create,
      MethodType.PUT,
      false,
      values,
      "",
      this.manageJewelLoanResponse
    )
  }
  manageJewelLoanResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success("", this.props.t("Jewel Loan Added Successfully"))
    }
  }

  render() {
    const INITIALVALUES = this.state.jewelLoan
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops pb-5">
          <Card className=" px-4 pt-4 page-content mb-5 pb-0 mt-5">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t(
                "Jewel Loan Settings"
              )}`}
              showSearch={false}
              showButton={false}
              //  match={this.props.match}
              //  onTextChange={this.searchQueryChanged}
              // buttonClick={this.addBtnClick}
              //  searchValue={this.state.listRequestModel.searchString}
            />

            <CardBody className="mt-2">
              <Formik
                initialValues={INITIALVALUES}
                validationSchema={jewelLoanValidation}
                onSubmit={this.handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
              >
                {({ errors, values, setFieldValue }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <Fragment>
                      <Row>
                        <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("Market Rate")}
                            </Label>
                            <Field
                              name="marketRate"
                              id="name"
                              type="number"
                              className="form-control box-border"
                            />
                            {errors.marketRate && (
                              <div className="invalid-feedback d-block">
                                {errors.marketRate}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("Net Weight")}
                            </Label>
                            <Field
                              name="netWeight"
                              type="number"
                              className="form-control box-border"
                            />
                            {errors.netWeight && (
                              <div className="invalid-feedback d-block">
                                {errors.netWeight}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        <Col xs="6" sm="6" md="6" lg={6} className="pr-4 mt-5">
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("Effective From")}
                            </Label>
                            <DatePicker
                              name="effectiveFrom"
                              startDate={this.state.startDateTime}
                              selectsStart
                              endDate={this.state.endDateTime}
                              components={{
                                Input: CustomSelectInput,
                              }}
                              className="form-control"
                              selected={this.state.startDateTime}
                              isClearable={true}
                              onChange={date => {
                                setFieldValue("effectiveFrom", date)
                                if (date)
                                  this.setState(
                                    {
                                      startDateTime: date,
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
                                      startDateTime: "",

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
                            {errors.effectiveFrom && (
                              <div className="invalid-feedback d-block">
                                {errors.effectiveFrom}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-5">
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("Effective To")}
                            </Label>
                            <DatePicker
                              name="effectiveTo"
                              startDate={this.state.startDateTime}
                              selectsStart
                              endDate={this.state.endDateTime}
                              components={{
                                Input: CustomSelectInput,
                              }}
                              className="form-control"
                              selected={this.state.endDateTime}
                              isClearable={true}
                              onChange={date => {
                                setFieldValue("effectiveTo", date)
                                if (date)
                                  this.setState(
                                    {
                                      endDateTime: date,
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
                                      endDateTime: "",
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
                            {errors.effectiveTo && (
                              <div className="invalid-feedback d-block">
                                {errors.effectiveTo}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <ModalFooter>
                        <div className="float-right mt-1">
                          <Button
                            type="submit"
                            color="primary"
                            className={
                              this.state.buttonAction ? "disabled" : ""
                            }
                          >
                            {this.props.t("Save")}
                          </Button>

                          <Button color="danger" className="mr-5 ml-2" onClick={this.handleCancle}>
                            {this.props.t("Cancel")}
                          </Button>
                        </div>
                      </ModalFooter>
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

export default withTranslation()(JewelLoanSettings)
