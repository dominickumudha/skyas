import React, { Component, Fragment } from "react"
import Switch from "@material-ui/core/Switch"
import {
  Container,
  Row,
  Col,
  FormGroup,
  Button,
  Label,
  Card,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  CustomInput,
} from "reactstrap"

import toastr from "toastr"
import "toastr/build/toastr.min.css"

import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { roleValidation } from "../../helpers/validations"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"

import { Formik, Form, Field } from "formik"

import { withTranslation } from "react-i18next"
import { AvForm } from "availity-reactstrap-validation"

class Employees extends Component {
  constructor(props) {
    super(props)
       this.state = {
      buttonAction: false,
      isLoading: false,
      pageSizeOptions: [10, 50, 100],
      pageLimit: 10,
      totalCount: 0,
      keyField: "_id",
      listRequestModel: {
        searchString: "",
        sortCondition: null,
        pageNumber: 1,
        pageLimit: 10,
      },

      data: [
        {
          employeeId: "1",
          employeeName: "vidhyaa",
          phoneNumber: "8956321478",
          emailId: "vihtyaa@gmail.com",
          department: "bsc comp",
          designation: "gdg",
          status: "Active",
        },
        {
          _id : "1",
          employeeId: "1",
          employeeName: "vidhyaa",
          phoneNumber: "8956321478",
          emailId: "vihtyaa@gmail.com",
          department: "bsc comp",
          designation: "gdg",
          status: "Active",
        },
      ],

      columns: [
        {
          name: this.props.t("Serial No"),

          sortable: false,
          cell: (row, index) => index + 1,
        },
        {
          name: this.props.t("Employee Name"),
          selector: "employeeName",
          sortable: false,
          cell: row => <span>{row.employeeName ? row.employeeName : ""}</span>,
        },

        {
          name: this.props.t("Employee Id"),
          selector: "employeeId",
          sortable: false,
          cell: row => <span>{row.employeeId ? row.employeeId : ""}</span>,
        },

        {
          name: this.props.t("Phone Number"),
          selector: "phoneNumber",
          sortable: false,
          cell: row => <span>{row.phoneNumber ? row.phoneNumber : ""}</span>,
        },

        {
          name: this.props.t("Email Id"),
          selector: "emailId",
          sortable: false,
          cell: row => <span>{row.emailId ? row.emailId : ""}</span>,
        },

        {
          name: this.props.t("Department"),
          selector: "department",
          sortable: false,
          cell: row => <span>{row.department ? row.department : ""}</span>,
        },

        {
          name: this.props.t("Designation"),
          selector: "designation",
          sortable: false,
          cell: row => <span>{row.designation ? row.designation : ""}</span>,
        },

        {
          name: this.props.t("Status"),
          selector: "status",
          sortable: false,
          cell: row => <span>{row.status ? row.status : ""}</span>,
        },
        {
          name: this.props.t("Action"),
          selector: "action",
          sortable: false,
          cell: row => (
            <Row>
              <Button
                size="sm"
                color="primary"
                onClick={() => this.handleRowClicked()}
              >
                {this.props.t("Edit")}
              </Button>
            </Row>
          ),
        },
      ],
    }
  }
  componentDidMount() {
    this.getAllEmployee()
  }
  getAllEmployee() {
    this.setState({
      isLoading: false,
    })
    const { values } = this.state
    CallService(
      //projectNew.GetAll,
      MethodType.POST,
      false,
      values,
      "",
      this.getAllEmployeeResponse
    )
  }

  getAllEmployeeResponse = data => {
    if (data.pagination && data.result) {
      this.setState({
        isLoading: false,
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
      data: data.result,
        totalCount: data.pagination.totalCount,
      })
    } else
      this.setState({
        isLoading: false,
      })
  }

  handleSort = (column, sortDirection) => {
    var sortObj = {}
    sortObj[column.selector] = sortDirection === "asc" ? 1 : -1
    this.setState(
      {
        listRequestModel: {
          ...this.state.listRequestModel,
          sortCondition: sortObj,
        },
      },
      function () {
        this.getAllEmployee()
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
        this.getAllEmployee()
      }
    )
  }
  handleRowClicked = row => {
    this.props.history.push("/add-employees/" + row._id)
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
        this.getAllEmployee()
      }
    )
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
          this.getAllEmployee()
        }
      }
    )
  }
  addBtnClick = () => {
    this.props.history.push("/add-employees")
  }


  render() {

    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops">
          <Card className="m-2 px-4 pt-4 mt-3">
                    <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t("Employees")}`}
             // onTextChange={this.searchQueryChanged}
             // buttonClick={this.addBtnClick}
              //searchValue={this.state.listRequestModel.searchString}
              showSearch = {false}
              showButton = {false}
            />
            <div className="text-right">          
            <Button color="primary" onClick={this.addBtnClick} className="mr-2">{this.props.t("Add New")}</Button>  <Button  color="primary">{this.props.t("Import")}</Button>
            </div>

            <ListPage
              columns={this.state.columns}
              data={this.state.data}
              keyField={this.state.keyField}
              totalCount={this.state.totalCount}
              // rowClicked={this.handleRowClicked}
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

export default withTranslation()(Employees)
