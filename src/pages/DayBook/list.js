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
  Label,
} from "reactstrap"
import { Formik, Form, Field } from "formik"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { withTranslation } from "react-i18next"
import DropDown from "../../common/DropDown"
import { DayBookValidation } from "../../helpers/validations"
import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import CustomSelectInput from "common/CustomSelectInput"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import ListPageHeader from "components/custom/ListPageHeader"
class DayBook extends Component {
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
      dayBook: {
        Division: "",
        SubDivision: "",
        Year: "",
        Month: "",
      },
      DayBookList: [],

      keyField: "_id",
    }
  }
  componentDidMount() {
    this.getAllDayBook()
  }
  getAllDayBook() {
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
      this.getAllDayBookResponse
    )
  }
  getAllDayBookResponse = data => {
    if (data.pagination && data.result) {
      this.setState({
        isLoading: false,
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        DayBookList: data.result,
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
    this.manageDayBook(values)
  }
  manageDayBook = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageDayBookResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //values._id ? .Update + values._id : .Create,
      values._id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      this.manageDayBookResponse
    )
  }
  manageDayBookResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(
        "",
        this.state.dayBook._id
          ? this.props.t("Demand Generation Edited Successfully")
          : this.props.t("Demand Generation Added Successfully")
      )
      this.getAllDayBook()
    }
  }
  render() {
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops">
          <Card className="m-2 p-4">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t("Day Book")}`}
              showSearch={false}
              showButton={false}
            />
            <Formik
              initialValues={this.state.dayBook}
              onSubmit={this.handleSubmit}
              validateOnBlur={false}
              validateOnChange={true}
              validationSchema={DayBookValidation}
            >
              {({ setFieldValue, values, errors }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <Card className="border-0 rounded shadow mb-0 ">
                    <CardBody className="pb-0">
                      <Row>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField mt-1">
                              {this.props.t("From")}
                            </Label>
                            <DatePicker
                              selectsStart
                              components={{ Input: CustomSelectInput }}
                              className="form-control"
                              selected={
                                values.From ? new Date(values.From) : ""
                              }
                              isClearable={true}
                              onChange={date => {
                                setFieldValue("From", date)
                              }}
                              placeholderText={this.props.t("Select Date")}
                              dateFormat="dd/MM/yyyy"
                            />
                            {errors.From && (
                              <div className="invalid-feedback d-block">
                                {errors.From}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>

                      <Table bordered className="text-center">
                        <thead>
                          <tr>
                            <th colspan="3">
                              {this.props.t("Transaction Details")}
                            </th>
                            <th colspan="4">
                              {this.props.t("Member Details")}
                            </th>
                            <th colspan="2">{this.props.t("Reciepts")}</th>
                            <th colspan="2">{this.props.t("Payments")}</th>
                          </tr>
                          <tr className="m-0 p-0">
                            <th>{this.props.t("Date")}</th>
                            <th>{this.props.t("No")}</th>
                            <th>{this.props.t("Particulars")}</th>
                            <th>{this.props.t("Type")}</th>
                            <th>{this.props.t("Code")}</th>
                            <th>{this.props.t("Name")}</th>
                            <th>{this.props.t("Account")}</th>
                            <th>{this.props.t("Cash")}</th>
                            <th>{this.props.t("Adjust")}</th>
                            <th>{this.props.t("Cash")}</th>
                            <th>{this.props.t("Adjust")}</th>
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
                        <tfoot>
                          <tr>
                            <th colspan="7" className="text-right">
                              {this.props.t("Total")}
                            </th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                          </tr>
                          <tr>
                            <th colspan="7" className="text-right">
                              {this.props.t("Opening Balance/Closing Balance")}
                            </th>
                            <th colspan="2"></th>
                            <th colspan="2"></th>
                          </tr>
                          <tr>
                            <th colspan="7" className="text-right">
                              {this.props.t("Grand Total")}
                            </th>
                            <th colspan="2"></th>
                            <th colspan="2"></th>
                          </tr>
                        </tfoot>
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

export default withTranslation()(DayBook)
