import React, { Component, Fragment } from "react"
import {
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
  Col,
  FormGroup,
  ModalFooter,
  Button,
  Container,
} from "reactstrap"
import { Formik, Form, Field } from "formik"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { withTranslation } from "react-i18next"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import DropDown from "../../common/DropDown"
import CustomSelectInput from "../../common/CustomSelectInput"
import { DepositListValidationSchema } from "../../helpers/validations"
import { AvForm } from "availity-reactstrap-validation"
import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import Switch from "@material-ui/core/Switch"

class DepositList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      manageModal: false,
      deleteModal: false,
      isLoading: false,
      buttonAction: false,
      pageSizeOptions: [10, 50, 100],
      pageLimit: 10,
      totalCount: 0,
      parentGL: [
        { label: "a", value: "a" },
        { label: "b", value: "b" },
        { label: "c", value: "c" },
      ],
      accountsGroup: [
        { label: "a", value: "a" },
        { label: "b", value: "b" },
        { label: "c", value: "c" },
      ],
      listRequestModel: {
        searchString: "",
        sortCondition: null,
        pageNumber: 1,
        pageLimit: 10,
      },
      deposits: {
        name: "",
        description: "",
        parentGL: "",
        accountHeadName: "",
        accountGroup: "",
        isActive: false,
      },
      DepositsList: [{}],
      columns: [
        {
          name: this.props.t("Deposit Account Number"),
          selector: "DepositAccountNo",
          sortable: false,
          cell: row => (
            <span>{row.DepositAccountNo ? row.DepositAccountNo : ""}</span>
          ),
        },

        {
          name: this.props.t("Type"),
          selector: "Type",
          sortable: false,
          cell: row => <span>{row.Type ? row.Type : ""}</span>,
        },
        {
          name: this.props.t("Member ID"),
          selector: "MemberID",
          sortable: false,
          cell: row => <span>{row.MemberID ? row.MemberID : ""}</span>,
        },
        {
          name: this.props.t("Amount"),
          selector: "Amount",
          sortable: false,
          cell: row => <span>{row.Amount ? row.Amount : ""}</span>,
        },
        {
          name: this.props.t("Maturity Date"),
          selector: "MaturityDate",
          sortable: false,
          cell: row => <span>{row.MaturityDate ? row.MaturityDate : ""}</span>,
        },
      ],
      keyField: "_id",
    }
  }
  componentDidMount() {}
  getAllDeposits() {
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
      this.getAllDepositsResponse
    )
  }
  getAllDepositsResponse = data => {
    if (data.pagination && data.result) {
      this.setState({
        isLoading: false,
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        DepositsList: data.result,
        totalCount: data.pagination.totalCount,
      })
    } else
      this.setState({
        isLoading: false,
      })
  }
  handleEdit = row => {
    if (row) {
      this.setState({
        deposits: row,
        manageModal: !this.state.manageModal,
      })
    }
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
        this.getAllDeposits()
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
        this.getAllDeposits()
      }
    )
  }
  onTextChange = search => {
    console.log(search)
    this.setState(
      {
        listRequestModel: {
          ...this.state.listRequestModel,
          searchString: search.target.value,
        },
      },
      function () {
        if (
          this.state.listRequestModel.searchString === "" ||
          this.state.listRequestModel.searchString.length > 2
        ) {
          this.getAllDeposits()
        }
      }
    )
  }
  onTypeChange = search => {
    this.setState(
      {
        listRequestModel: {
          ...this.state.listRequestModel,
          searchString: search.target.value,
        },
      },
      function () {
        this.getAllDeposits()
      }
    )
  }
  render() {
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops">
          <Card className="m-2 p-4">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t(
                "Deposits List"
              )}`}
              showSearch={false}
              showButton={false}
            />
            <Formik
              initialValues={{}}
              onSubmit={this.handleSubmit}
              validateOnBlur={false}
              validateOnChange={true}
              validationSchema={DepositListValidationSchema}
            >
              {({ values, setFieldValue, errors }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <Row className="px-3">
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 ">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Member ID")}
                        </Label>

                        <Field
                          type="text"
                          name="MemberID"
                          onChange={e => {
                            setFieldValue("MemberID", e.target.value),
                              this.onTextChange(e)
                          }}
                          className="form-control "
                          placeholder={this.props.t("Search") + "..."}
                        />
                        {errors.MemberID && (
                          <div className="invalid-feedback d-block">
                            {errors.MemberID}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
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
                          Action={e => this.onTypeChange(e)}
                          errors={errors.Title}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>{" "}
            <ListPage
              columns={this.state.columns}
              data={this.state.DepositsList}
              keyField={this.state.keyField}
              totalCount={this.state.totalCount}
              rowsPerPageOnChange={this.handlePerRowsChange}
              pageChange={this.handlePageChange}
              isDataLoading={this.state.isLoading}
              overFlowXRemoval={true}
            />
          </Card>
        </Container>
      </Fragment>
    )
  }
}

export default withTranslation()(DepositList)
