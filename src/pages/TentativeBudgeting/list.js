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
import { withTranslation } from "react-i18next"
import ListPageHeader from "components/custom/ListPageHeader"
import ListPage from "components/custom/ListPage"
import AvForm from "availity-reactstrap-validation/lib/AvForm"
import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import DropDown from "../../common/DropDown"

class TentativeBudgeting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deleteModal: false,
      isLoading: false,
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
      tentativeBudgetingList: [{}],
      columns: [
        {
          name: this.props.t("Serial No"),

          sortable: false,
          cell: (row, index) => index + 1,
        },
        {
          name: this.props.t("Name"),
          selector: "Name",
          sortable: false,
          cell: row => <span>{row.Name ? row.Name : ""}</span>,
        },

        {
          name: this.props.t("Fiscal Year"),
          selector: "FiscalYear",
          sortable: false,
          cell: row => <span>{row.FiscalYear ? row.FiscalYear : ""}</span>,
        },
        {
          name: this.props.t("Budget Period"),
          selector: "BudgetPeriod",
          sortable: false,
          cell: row => <span>{row.BudgetPeriod ? row.BudgetPeriod : ""}</span>,
        },
        {
          name: this.props.t("Income Accounts"),
          selector: "IncomeAccounts",
          sortable: false,
          cell: row => (
            <span>{row.IncomeAccounts ? row.IncomeAccounts : ""}</span>
          ),
        },
        {
          name: this.props.t("Expense Accounts"),
          selector: "ExpenseAccounts",
          sortable: false,
          cell: row => (
            <span>{row.ExpenseAccounts ? row.ExpenseAccounts : ""}</span>
          ),
        },
        {
          name: this.props.t("Action"),
          selector: "action",
          sortable: false,
          cell: row => (
            <Row>
              <Button
                size="sm"
                color="primary mr-1"
                onClick={() => this.handleEdit(row)}
              >
                {this.props.t("Edit")}
              </Button>
              <Button
                size="sm"
                color="danger"
                onClick={() => this.toggleDeleteModal(row)}
              >
                {this.props.t("Delete")}
              </Button>
            </Row>
          ),
        },
      ],
    }
  }
  componentDidMount() {
    this.getAllTentativeBudgeting()
  }

  getAllTentativeBudgeting() {
    let res = {
      result: [{ _id: 1 }],
      exception: null,
      pagination: {
        pageNumber: 1,
        pageLimit: 10,
        skipCount: 0,
        totalCount: 38,
      },
      stringResult: "",
      statusCode: "200",
      errors: [],
      warnings: [],
    }
    this.getAllTentativeBudgetingResponse(res)
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
      this.getAllTentativeBudgetingResponse
    )
  }
  getAllTentativeBudgetingResponse = data => {
    if (data.pagination && data.result) {
      this.setState({
        isLoading: false,
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        tentativeBudgetingList: data.result,
        totalCount: data.pagination.totalCount,
      })
    } else
      this.setState({
        isLoading: false,
      })
  }
  handleRowClicked = row => {
    this.props.history.push("/manage-tentative-budgeting")
  }
  searchQueryChanged = search => {
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
          this.getAllTentativeBudgeting()
        }
      }
    )
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
        this.getAllTentativeBudgeting()
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
        this.getAllTentativeBudgeting()
      }
    )
  }
  handleEdit = row => {
    this.props.history.push(`/manage-tentative-budgeting/${row._id}`)
  }
  toggleDeleteModal = row => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      tentativeBudgeting: row,
    })
  }
  addBtnClick = () => {
    this.props.history.push("/manage-tentative-budgeting")
  }

  deleteTentativeBudgeting = value => {
    toastr.success("", this.props.t("Tentative Budgeting Deleted Successfully"))
    this.toggleDeleteModal()
  }
  render() {
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops">
          <Card className="m-2 p-4">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t(
                "Tentative Budgeting"
              )}`}
              onTextChange={this.searchQueryChanged}
              buttonClick={this.addBtnClick}
              searchValue={this.state.listRequestModel.searchString}
            />
            <ListPage
              columns={this.state.columns}
              data={this.state.tentativeBudgetingList}
              keyField={this.state.keyField}
              totalCount={this.state.totalCount}
              rowClicked={this.handleRowClicked}
              rowsPerPageOnChange={this.handlePerRowsChange}
              pageChange={this.handlePageChange}
              isDataLoading={this.state.isLoading}
              overFlowXRemoval={true}
            />
          </Card>
        </Container>
        <Modal isOpen={this.state.deleteModal} toggle={this.toggleDeleteModal}>
          <ModalHeader toggle={this.toggleDeleteModal}>
            {this.props.t("Remove Tentative Budgeting")}
          </ModalHeader>

          <AvForm
            onSubmit={() =>
              this.deleteTentativeBudgeting(this.state.tentativeBudgeting._id)
            }
          >
            <ModalBody>
              <Fragment>
                <Row className="mb-4">
                  <Label className="av-label ml-3">
                    <h5>
                      {this.props.t(
                        "Are you sure you want to remove this Tentative Budgeting?"
                      )}
                    </h5>
                  </Label>
                </Row>
              </Fragment>
            </ModalBody>

            <ModalFooter>
              <FormGroup className="float-sm-right ">
                <Button type="submit" color="primary">
                  {this.props.t("Yes")}
                </Button>
                <Button
                  color="danger"
                  className="ml-2"
                  onClick={() => this.toggleDeleteModal()}
                >
                  {this.props.t("No")}
                </Button>
              </FormGroup>
            </ModalFooter>
          </AvForm>
        </Modal>
      </Fragment>
    )
  }
}

export default withTranslation()(TentativeBudgeting)
