import React, { Component, Fragment } from "react"
import {
  Container,
  Row,
  Col,
  FormGroup,
  ModalFooter,
  Button,
  Label,
  CardBody,
  Card,
} from "reactstrap"
import DropDown from "../../common/DropDown"
import CustomSelectInput from "../../common/CustomSelectInput"
import { workFlowValidation } from "../../helpers/validations"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form, Field } from "formik"
import { withTranslation } from "react-i18next"
import { MethodType, StatusCodes } from "../../constants/defaultValues"

class WorkFlow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transactionFlow: [
        { label: "Marker", value: "Marker" },
        { label: "Marker & Checker", value: "Marker & Checker" },
      ],
      checker: [
        { label: "Marker", value: "Marker" },
        { label: "Marker & Checker", value: "Marker & Checker" },
      ],
      marker: [
        { label: "Marker", value: "Marker" },
        { label: "Marker & Checker", value: "Marker & Checker" },
      ],

      workFlow: {
        transactionFlow: "",
        marker: "",
        checker: "",
      },
    }
  }
  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageWorkFlow(values)
  }
  manageWorkFlow = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageWorkFlowResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //values._id ? .Update + values._id : .Create,
      values._id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      this.manageWorkFlowResponse
    )
  }
  manageWorkFlowResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success("", this.props.t("Work Flow Added Successfully"))
    }
  }
  getAllTransactionFlow() {
    CallService(
      //transactionFlow.ForAdmin,
      MethodType.POST,
      false,
      { pageNumber: 1, pageLimit: 10000 },
      "",
      this.getAllTransactionFlowResponse
    );
  }

  getAllTransactionFlowResponse = (data) => {
    if (data.result) {
      this.setState({
        transactionFlowList: data.result.map(function (a) {
          return { value: a._id, label: a.Name };
        }),
      });
    }
  };
  
  getAllMarker() {
    CallService(
      //marker.ForAdmin,
      MethodType.POST,
      false,
      { pageNumber: 1, pageLimit: 10000 },
      "",
      this.getAllMarkerResponse
    );
  }

  getAllMarkerResponse = (data) => {
    if (data.result) {
      this.setState({
        markerList: data.result.map(function (a) {
          return { value: a._id, label: a.Name };
        }),
      });
    }
  };
  
  getAllChecker() {
    CallService(
      //checker.ForAdmin,
      MethodType.POST,
      false,
      { pageNumber: 1, pageLimit: 10000 },
      "",
      this.getAllCheckerResponse
    );
  }

  getAllCheckerResponse = (data) => {
    if (data.result) {
      this.setState({
        checkerList: data.result.map(function (a) {
          return { value: a._id, label: a.Name };
        }),
      });
    }
  };
  

  render() {
    const INITIALVALUES = this.state.workFlow
    return (
      <Fragment>
        <Card>
          <CardBody>
            <Formik
              initialValues={INITIALVALUES}
              validationSchema={workFlowValidation}
              onSubmit={this.handleSubmit}
              validateOnBlur={false}
              validateOnChange={false}
            >
              {({ setFieldValue, values, errors }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <Row>
                    <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                      <FormGroup className="position-relative">
                        <DropDown
                          label={this.props.t("Transaction Flow")}
                          classNamePrefix="react-select"
                          className="react-select"
                          name="transactionFlow"
                          isSearchable
                          options={this.state.transactionFlow}
                          //options={this.state.transactionFlow} // master data
                          placeholderText={""}
                          Checkbox={false}
                          Action={e => {
                            setFieldValue("transactionFlow", e.value)
                          }}
                        />
                        {errors.transactionFlow && (
                          <div className="invalid-feedback d-block pl-1">
                            {errors.transactionFlow}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative">
                        <DropDown
                          classNamePrefix="react-select"
                          className="react-select"
                          label={this.props.t("Marker")}
                          name="marker"
                          isSearchable
                          options={this.state.marker}
                          //options={this.state.markerList} //master data
                          placeholderText={""}
                          Checkbox={false}
                          Action={e => {
                            setFieldValue("marker", e.value)
                          }}
                        />

                        {errors.marker && (
                          <div className="invalid-feedback d-block pl-1">
                            {errors.marker}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pr-4"></Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative">
                        <DropDown
                          classNamePrefix="react-select"
                          className="react-select"
                          label={this.props.t("Checker")}
                          isMulti={true}
                          name="checker"
                          isClearable={true}
                          isSearchable
                          options={this.state.checker}
                          //options={this.state.checkerList} //Master data
                          placeholderText={""}
                          Checkbox={false}
                          Action={e => {
                            setFieldValue(
                              "checker",
                              e
                                ? e.map(v => {
                                    return v.value
                                  })
                                : ""
                            )
                          }}
                        />
                        {errors.checker && (
                          <div className="invalid-feedback d-block pl-1">
                            {errors.checker}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                      <FormGroup className="position-relative">
                        <Label className="requiredField">
                          {this.props.t("Effective From")}
                        </Label>
                        <DatePicker
                          startDate={this.state.startDateTime}
                          selectsStart
                          name="effectiveFrom"
                          endDate={this.state.endDateTime}
                          components={{ Input: CustomSelectInput }}
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
                                      new Date(date.setHours(0, 0, 0)).getTime()
                                    ),
                                  },
                                },
                                () => {}
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
                                () => {}
                              )
                          }}
                          placeholderText={this.props.t("Select Date")}
                          dateFormat="dd/MM/yyyy"
                        />

                        {errors.effectiveFrom && (
                          <div className="invalid-feedback d-block pl-1">
                            {errors.effectiveFrom}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative">
                        <Label className="requiredField ">
                          {this.props.t("Effective To")}
                        </Label>
                        <DatePicker
                          name="effectiveTo"
                          startDate={this.state.startDateTime}
                          selectsStart
                          endDate={this.state.endDateTime}
                          components={{ Input: CustomSelectInput }}
                          className="form-control "
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
                                      new Date(date.setHours(0, 0, 0)).getTime()
                                    ),
                                  },
                                },
                                () => {}
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
                                () => {}
                              )
                          }}
                          placeholderText={this.props.t("Select Date")}
                          dateFormat="dd/MM/yyyy"
                        />
                        {errors.effectiveTo && (
                          <div className="invalid-feedback d-block pl-1">
                            {errors.effectiveTo}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>

                  <ModalFooter>
                    <div className="float-right mt-2">
                      <Button
                        type="submit"
                        color="primary"
                        className={this.state.buttonAction ? "disabled" : ""}
                      >
                        {this.props.t("Add")}
                      </Button>

                      <Button color="danger" className="mr-5 ml-2">
                        {this.props.t("Cancel")}
                      </Button>
                    </div>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Fragment>
    )
  }
}
export default withTranslation()(WorkFlow)