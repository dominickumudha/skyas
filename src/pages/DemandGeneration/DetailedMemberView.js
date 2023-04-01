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
import { DetailedMemberViewValidation } from "../../helpers/validations"
import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"

class DetailedMemberView extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
      detailedMemberView: {},
      DetailedMemberViewList: [],

      keyField: "_id",
    }
  }
  componentDidMount() {
    this.getAllDetailedMemberView()
  }
  getAllDetailedMemberView() {
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
      this.getAllDetailedMemberViewResponse
    )
  }
  getAllDetailedMemberViewResponse = data => {
    if (data.pagination && data.result) {
      this.setState({
        isLoading: false,
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        DetailedMemberViewList: data.result,
        totalCount: data.pagination.totalCount,
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
            <CardTitle>
              <h4 className="mb-2 font-size-18">
                {this.props.t("Detailed Member View")}
              </h4>
            </CardTitle>
            <Table bordered className="text-center">
              <thead>
                <tr>
                  <th rowspan="2">{this.props.t("Member Number")}</th>
                  <th rowspan="2">{this.props.t("Designation")}</th>
                  <th rowspan="2">{this.props.t("Division")}</th>
                  <th rowspan="2">{this.props.t("Sub Division")}</th>
                  <th colspan="3">{this.props.t("Surety Loan")}</th>
                  <th colspan="3">{this.props.t("Festival Loan")}</th>
                  <th>{this.props.t("Deposit")}</th>
                </tr>
                <tr className="m-0 p-0">
                  <th>{this.props.t("Principal")}</th>
                  <th>{this.props.t("Interest")}</th>
                  <th>{this.props.t("Balance")}</th>
                  <th>{this.props.t("Principal")}</th>
                  <th>{this.props.t("Interest")}</th>
                  <th>{this.props.t("Balance")}</th>
                  <th>{this.props.t("Amount")}</th>
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
            </Table>{" "}
          </Card>
        </Container>
      </Fragment>
    )
  }
}

export default withTranslation()(DetailedMemberView)
