import React, { Component, Fragment } from "react"
import {
  Card,
  CardBody,
  Label,
  Row,
  Col,
  FormGroup,
  Button,
  Container,
  CardTitle,
  CustomInput,
} from "reactstrap"
import { Formik, Form, Field } from "formik"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { withTranslation } from "react-i18next"
import ListPage from "../../components/custom/ListPage"
import DropDown from "../../common/DropDown"
import { DemandRecoveryValidation } from "../../helpers/validations"
import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import ListPageHeader from "components/custom/ListPageHeader"

class DemandRecovery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      buttonAction: false,
      showDetailedRecovery: false,
      pageSizeOptions: [10, 50, 100],
      pageLimit: 10,
      totalCount: 0,
      isLoadingDetailedRecovery: true,
      totalCountDetailedRecovery: 0,
      listRequestModel: {
        searchString: "",
        sortCondition: null,
        pageNumber: 1,
        pageLimit: 10,
      },
      divisionList: [{ label: "1", value: "1" }],
      monthList: [{ label: "1", value: "1" }],
      yearList: [{ label: "1", value: "1" }],
      paidAccountList: [{ label: "1", value: "1" }],
      demandRecovery: {
        Division: "",
        Month: "",
        Year: "",
        PaidAccount: "",
        AmountReceived: "",
        RecoverySheet: "",
      },
      DemandRecoveryList: [
        {
          Name: "sug",
          MemberNo: "yty",
          Demand: "ufsty",
          Recieve: "gh",
          accountGroup: "kjg",
          isActive: "sgdf",
          _id: 1,
        },
        {
          Name: "sug",
          MemberNo: "yty",
          parentGL: "ufsty",
          accountHeadName: "gh",
          accountGroup: "kjg",
          isActive: "sgdf",
          _id: 2,
        },
      ],
      detailedRecoveryList: [{}],
      columns: [
        {
          name: this.props.t("Member Number"),
          selector: "MemberNumber",
          sortable: false,
          cell: row => (
            <Row>
              <span>{row.MemberNo ? row.MemberNo : ""}</span>
              <Button
                size="sm"
                outline
                color="info"
                className="rounded-circle ml-1 px-1 py-0"
                onClick={() => this.handleDetailedrecovery(row)}
              >
                i
              </Button>
            </Row>
          ),
        },

        {
          name: this.props.t("Name"),
          selector: "Name",
          sortable: false,
          cell: row => <span>{row.Name ? row.Name : ""}</span>,
        },
        {
          name: this.props.t("Demand"),
          selector: "Demand",
          sortable: false,
          cell: row => <span>{row.Demand ? row.Demand : ""}</span>,
        },
        {
          name: this.props.t("Recieved"),
          selector: "Recieved",
          sortable: false,
          cell: row => <span>{row.Recieved ? row.Recieved : ""}</span>,
        },
        {
          name: this.props.t("Short"),
          selector: "Short",
          sortable: false,
          cell: row => <span>{row.Short ? row.Short : ""}</span>,
        },
      ],
      detailedRecoveryColumns: [
        {
          name: this.props.t("Description"),
          selector: "Description",
          sortable: false,
          cell: row => <span>{row.Description ? row.Description : ""}</span>,
        },

        {
          name: this.props.t("Recieved"),
          selector: "Recieved",
          sortable: false,
          cell: row => <span>{row.Recieved ? row.Recieved : ""}</span>,
        },
        {
          name: this.props.t("Actual"),
          selector: "Actual",
          sortable: false,
          cell: row => <span>{row.Actual ? row.Actual : ""}</span>,
        },
        {
          name: this.props.t("Excess"),
          selector: "Excess",
          sortable: false,
          cell: row => <span>{row.Excess ? row.Excess : ""}</span>,
        },
        {
          name: this.props.t("Short"),
          selector: "Short",
          sortable: false,
          cell: row => <span>{row.Short ? row.Short : ""}</span>,
        },
      ],
      keyField: "_id",
    }
  }
  componentDidMount() {
    this.getAllDemandRecovery()
    this.getAllDivision()
  }
  getAllDivision() {
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
      this.getAllDivisionResponse
    )
  }
  getAllDivisionResponse = data => {
    if (data.pagination && data.result) {
      this.setState({
        isLoading: false,
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        divisionList: data.result,
        totalCount: data.pagination.totalCount,
      })
    } else
      this.setState({
        isLoading: false,
      })
  }
  getAllDemandRecovery() {
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
      this.getAllDemandRecoveryResponse
    )
  }
  getAllDemandRecoveryResponse = data => {
    if (data.pagination && data.result) {
      this.setState({
        isLoading: false,
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        DemandRecoveryList: data.result,
        totalCount: data.pagination.totalCount,
      })
    } else
      this.setState({
        isLoading: false,
      })
  }
  getAllMemberDetailedRecovery() {
    this.setState({
      isLoadingDetailedRecovery: false,
    })
    const { listRequestModel } = this.state
    CallService(
      //.GetAll,
      MethodType.POST,
      false,
      listRequestModel,
      "",
      this.getAllDemandRecoveryResponse
    )
  }
  getAllMemberDetailedRecoveryResponse = data => {
    if (data.pagination && data.result) {
      this.setState({
        isLoading: false,
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        detailedRecoveryList: data.result,
        totalCountDetailedRecovery: data.pagination.totalCount,
      })
    } else
      this.setState({
        isLoading: false,
      })
  }
  handlePageChange = async page => {
    this.setState(
      {
        pageNumber: page,
        listRequestModel: {
          ...this.state.listRequestModel,
          pageNumber: page,
        },
      },
      function () {
        this.getAllDemandRecovery()
      }
    )
  }
  handlePerRowsChange = async perPage => {
    this.setState(
      {
        pageLimit: perPage,
        pageNumber: 1,
        listRequestModel: {
          ...this.state.listRequestModel,
          pageLimit: perPage,
          pageNumber: 1,
        },
      },
      async function () {
        this.getAllDemandRecovery()
      }
    )
  }
  handleDetailedRecoveryPageChange = async page => {
    this.setState(
      {
        pageNumber: page,
        listRequestModel: {
          ...this.state.listRequestModel,
          pageNumber: page,
        },
      },
      function () {
        this.getAllDemandRecovery()
      }
    )
  }
  handleDetailedRecoveryPerRowsChange = async perPage => {
    this.setState(
      {
        pageLimit: perPage,
        pageNumber: 1,
        listRequestModel: {
          ...this.state.listRequestModel,
          pageLimit: perPage,
          pageNumber: 1,
        },
      },
      async function () {
        this.getAllDemandRecovery()
      }
    )
  }
  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageDemandRecovery(values)
  }
  manageDemandRecovery = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageDemandRecoveryResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //values._id ? .Update + values._id : .Create,
      values._id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      this.manageDemandRecoveryResponse
    )
  }
  manageDemandRecoveryResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(
        "",
        this.state.demandRecovery._id
          ? this.props.t("Demand Recovery Edited Successfully")
          : this.props.t("Demand Recovery Added Successfully")
      )
      this.getAllDemandRecovery()
    }
  }
  handleDetailedrecovery = row => {
    this.getAllMemberDetailedRecovery()
    this.setState({ showDetailedRecovery: true })
  }
  handleCancel = () => {
    toastr.success("", "cancel")
  }
  render() {
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops">
          <Card className="m-2 p-4">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t(
                "Demand Recovery"
              )}`}
              showSearch={false}
              showButton={false}
            />
            <Formik
              initialValues={this.state.demandRecovery}
              onSubmit={this.handleSubmit}
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={DemandRecoveryValidation}
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
                              options={this.state.divisionList}
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
                              options={this.state.monthList}
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
                              label={this.props.t("Year")}
                              name="Year"
                              isSearchable
                              options={this.state.yearList}
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
                        <Col xs="6" sm="6" md="6" lg="6" xl="6">
                          <FormGroup className="position-relative mt-1">
                            <DropDown
                              classNamePrefix="react-select"
                              className="react-select "
                              label={this.props.t("Paid Account")}
                              name="PaidAccount"
                              isSearchable
                              options={this.state.paidAccountList}
                              placeholderText={""}
                              Checkbox={false}
                              value={{
                                label: values.PaidAccount,
                                value: values.PaidAccount,
                              }}
                              Action={e => {
                                setFieldValue("PaidAccount", e.value)
                              }}
                              errors={errors.PaidAccount}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg="6" xl="6">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField mt-1">
                              {this.props.t("Amount Received")}
                            </Label>

                            <Field
                              name="AmountReceived"
                              type="number"
                              className="form-control box-border"
                            />
                            {errors.AmountReceived && (
                              <div className="invalid-feedback d-block">
                                {errors.AmountReceived}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col sm="6" md="6" lg="6" xs="6">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField mt-1">
                              {this.props.t("Recovery Sheet")}
                            </Label>
                            <CustomInput
                              className="position-sticky"
                              key={"RecoverySheet"}
                              type="file"
                              name={"RecoverySheet"}
                              onChange={event => {
                                setFieldValue(
                                  `RecoverySheet`,
                                  event.target.files[0]
                                )
                              }}
                            />
                            {errors.RecoverySheet && (
                              <div className="invalid-feedback d-block">
                                {errors.RecoverySheet}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <ListPage
                        columns={this.state.columns}
                        data={this.state.DemandRecoveryList}
                        keyField={this.state.keyField}
                        totalCount={this.state.totalCount}
                        rowsPerPageOnChange={this.handlePerRowsChange}
                        pageChange={this.handlePageChange}
                        isDataLoading={this.state.isLoading}
                        overFlowXRemoval={true}
                      />
                      {this.state.showDetailedRecovery ? (
                        <Fragment>
                          <h4 className="mb-2 font-size-18 text-center">
                            {this.props.t("Member Detailed Recovery")}
                          </h4>
                          <ListPage
                            columns={this.state.detailedRecoveryColumns}
                            data={this.state.detailedRecoveryList}
                            keyField={this.state.keyField}
                            totalCount={this.state.totalCountDetailedRecovery}
                            rowsPerPageOnChange={
                              this.handleDetailedRecoveryPerRowsChange
                            }
                            pageChange={this.handleDetailedRecoveryPageChange}
                            isDataLoading={this.state.isLoadingDetailedRecovery}
                            overFlowXRemoval={true}
                          />
                        </Fragment>
                      ) : (
                        ""
                      )}
                      <Row className="mt-2 mr-2 mb-4">
                        <Col sm={12}>
                          <FormGroup className="float-sm-right  mt-1">
                            <Button type="submit" outline color="primary">
                              {this.props.t("Process")}
                            </Button>
                            <Button
                              className="ml-2"
                              type="button"
                              onClick={() => {
                                console.log(values)
                                this.handleCancel()
                              }}
                              color="danger"
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

export default withTranslation()(DemandRecovery)
