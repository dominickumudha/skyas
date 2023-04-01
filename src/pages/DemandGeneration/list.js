import React, { Component, Fragment } from "react"
import {
  Card,
  CardBody,
  Row,
  Col,
  FormGroup,
  Button,
  Container,
  CardTitle,
  Table,
} from "reactstrap"
import { Formik, Form, Field } from "formik"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { withTranslation } from "react-i18next"
import DropDown from "../../common/DropDown"
import { DemandGenertionValidation } from "../../helpers/validations"
import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"

class DemandGenertion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      manageModal: false,
      deleteModal: false,
      isLoading: true,
      buttonAction: false,
      pageSizeOptions: [10, 50, 100],
      pageLimit: 10,
      totalCount: 0,

      listRequestModel: {
        searchString: "",
        sortCondition: null,
        pageNumber: 1,
        pageLimit: 10,
      },
      Division: [{ label: "1", value: "1" }],
      SubDivision: [{ label: "1", value: "1" }],
      Year: [{ label: "1", value: "1" }],
      Month: [{ label: "1", value: "1" }],
      demandGenertion: {
        Division: "",
        SubDivision: "",
        Year: "",
        Month: "",
      },
      DemandGenertionList: [],

      keyField: "_id",
    }
  }
  componentDidMount() {
    this.getAllDemandGenertion()
  }
  getAllDemandGenertion() {
    this.setState({
      isLoading: false,
    })
    const { listRequestModel } = this.state
    CallService(
      //.GetAll,
      MethodType.POST,
      false,
      listRequestModel,
      "",
      this.getAllDemandGenertionResponse
    )
  }
  getAllDemandGenertionResponse = data => {
    if (data.pagination && data.result) {
      this.setState({
        isLoading: false,
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        DemandGenertionList: data.result,
        totalCount: data.pagination.totalCount,
      })
    } else
      this.setState({
        isLoading: false,
      })
  }
  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageDemandGenertion(values)
  }
  manageDemandGenertion = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageDemandGenertionResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //values._id ? .Update + values._id : .Create,
      values._id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      this.manageDemandGenertionResponse
    )
  }
  manageDemandGenertionResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(
        "",
        this.state.demandGenertion._id
          ? this.props.t("Demand Generation Edited Successfully")
          : this.props.t("Demand Generation Added Successfully")
      )
      this.getAllDemandGenertion()
    }
  }

  manageDemandGenertionPdf = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageDemandGenertionPdfResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //values._id ? .Update + values._id : .Create,
      MethodType.PUT,
      false,
      values,
      "",
      this.manageDemandGenertionPdfResponse
    )
  }
  manageDemandGenertionPdfResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success("", this.props.t("PDF Show"))
      this.getAllDemandGenertion()
    }
  }

  manageDemandGenertionExcel = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageDemandGenertionExcelResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //values._id ? .Update + values._id : .Create,
      MethodType.PUT,
      false,
      values,
      "",
      this.manageDemandGenertionExcelResponse
    )
  }
  manageDemandGenertionExcelResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success("", this.props.t("Excel Show"))
      this.getAllDemandGenertion()
    }
  }

  render() {
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops">
          <Card className="m-2 p-4">
            <CardTitle>
              <h4 className="mb-2 font-size-18">
                {this.props.t("Demand Generation")}
              </h4>
            </CardTitle>
            <Formik
              initialValues={this.state.demandGenertion}
              onSubmit={this.handleSubmit}
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={DemandGenertionValidation}
            >
              {({ setFieldValue, values, errors }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <Card className="border-0 rounded shadow mb-0 ">
                    <CardBody className="pb-0">
                      <Row>
                        <Col xs="6" sm="6" md="6" lg="6" xl="6">
                          <FormGroup className="position-relative mt-1">
                            <DropDown
                              classNamePrefix="react-select"
                              className="react-select "
                              label={this.props.t("Division")}
                              name="Division"
                              isSearchable
                              options={this.state.Division}
                              placeholderText={""}
                              Checkbox={false}
                              value={{
                                label: values.Division,
                                value: values.Division,
                              }}
                              Action={e => {
                                setFieldValue("Division", e.value)
                              }}
                              errors={errors.Division}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg="6" xl="6">
                          <FormGroup className="position-relative mt-1">
                            <DropDown
                              classNamePrefix="react-select"
                              className="react-select "
                              label={this.props.t("Month")}
                              name="Month"
                              isSearchable
                              options={this.state.Month}
                              placeholderText={""}
                              Checkbox={false}
                              value={{
                                label: values.Month,
                                value: values.Month,
                              }}
                              Action={e => {
                                setFieldValue("Month", e.value)
                              }}
                              errors={errors.Month}
                            />
                          </FormGroup>
                        </Col>{" "}
                        <Col xs="6" sm="6" md="6" lg="6" xl="6">
                          <FormGroup className="position-relative mt-1">
                            <DropDown
                              classNamePrefix="react-select"
                              className="react-select "
                              label={this.props.t("Sub Division")}
                              name="SubDivision"
                              isSearchable
                              options={this.state.SubDivision}
                              placeholderText={""}
                              Checkbox={false}
                              value={{
                                label: values.SubDivision,
                                value: values.SubDivision,
                              }}
                              Action={e => {
                                setFieldValue("SubDivision", e.value)
                              }}
                              errors={errors.SubDivision}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg="6" xl="6">
                          <FormGroup className="position-relative mt-1">
                            <DropDown
                              classNamePrefix="react-select"
                              className="react-select "
                              label={this.props.t("Year")}
                              name="Year"
                              isSearchable
                              options={this.state.Year}
                              placeholderText={""}
                              Checkbox={false}
                              value={{
                                label: values.Year,
                                value: values.Year,
                              }}
                              Action={e => {
                                setFieldValue("Year", e.value)
                              }}
                              errors={errors.Year}
                            />
                          </FormGroup>
                        </Col>{" "}
                      </Row>
                      <Row className="mt-2 mr-2 mb-4">
                        <Col sm={6}>
                          <FormGroup className="float-sm-right  ">
                            <Button type="submit" outline color="primary">
                              {this.props.t("Generate")}
                            </Button>
                          </FormGroup>
                        </Col>
                        <Col sm={6}>
                          <FormGroup className="float-sm-right">
                            <Button
                              className="ml-2"
                              type="button"
                              onClick={() => {
                                this.manageDemandGenertionPdf()
                              }}
                              outline
                              color="success"
                            >
                              {this.props.t("PDF")}
                            </Button>
                            <Button
                              className="ml-2"
                              type="button"
                              onClick={() => {
                                this.manageDemandGenertionExcel()
                              }}
                              outline
                              color="success"
                            >
                              {this.props.t("Excel")}
                            </Button>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Table bordered className="text-center">
                        <thead>
                          <tr>
                            <th rowspan="2">{this.props.t("Member Number")}</th>
                            <th rowspan="2">{this.props.t("Member Name")}</th>
                            <th rowspan="2">{this.props.t("Emp Code")}</th>
                            <th rowspan="2">{this.props.t("Thrift")}</th>
                            <th colspan="2">{this.props.t("Loan")}</th>
                            <th>{this.props.t("Deposit")}</th>
                            <th rowspan="2">{this.props.t("Arrear Demand")}</th>
                            <th rowspan="2">
                              {this.props.t("OD Interest Name")}
                            </th>
                            <th rowspan="2">{this.props.t("SRF")}</th>
                            <th rowspan="2">{this.props.t("Total")}</th>
                          </tr>
                          <tr className="m-0 p-0">
                            <th>{this.props.t("Principal")}</th>
                            <th>{this.props.t("Interest")}</th>
                            <th>{this.props.t("Principal")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>
                      </Table>
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

export default withTranslation()(DemandGenertion)
