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

class BookStock extends Component {
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
      bookStockList: [{}],
      columns: [
        {
          name: this.props.t("Serial No"),

          sortable: false,
          cell: (row, index) => index + 1,
        },
        {
          name: this.props.t("Reference Number"),
          selector: "ReferenceNumber",
          sortable: false,
          cell: row => (
            <span>{row.ReferenceNumber ? row.ReferenceNumber : ""}</span>
          ),
        },

        {
          name: this.props.t("Book Name"),
          selector: "BookName",
          sortable: false,
          cell: row => <span>{row.BookName ? row.BookName : ""}</span>,
        },
        {
          name: this.props.t("Author"),
          selector: "Author",
          sortable: false,
          cell: row => <span>{row.Author ? row.Author : ""}</span>,
        },
        {
          name: this.props.t("Type"),
          selector: "Type",
          sortable: false,
          cell: row => <span>{row.Type ? row.Type : ""}</span>,
        },
        {
          name: this.props.t("Quantity"),
          selector: "Quantity",
          sortable: false,
          cell: row => <span>{row.Quantity ? row.Quantity : ""}</span>,
        },
      ],
    }
  }
  componentDidMount() {
    this.getAllBookStock()
  }

  getAllBookStock() {
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
    this.getAllBookStockResponse(res)
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
      this.getAllBookStockResponse
    )
  }
  getAllBookStockResponse = data => {
    if (data.pagination && data.result) {
      this.setState({
        isLoading: false,
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        bookStockList: data.result,
        totalCount: data.pagination.totalCount,
      })
    } else
      this.setState({
        isLoading: false,
      })
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
          this.getAllBookStock()
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
        this.getAllBookStock()
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
        this.getAllBookStock()
      }
    )
  }
  handleRowClicked = row => {
    this.props.history.push(`/manage-book/${row._id}`)
  }
  toggleDeleteModal = row => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      bookStock: row,
    })
  }
  addBtnClick = () => {
    this.props.history.push("/manage-book")
  }

  deleteBookStock = value => {
    toastr.success("", this.props.t("Book Deleted Successfully"))
    this.toggleDeleteModal()
  }
  render() {
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops">
          <Card className="m-2 p-4">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t("Book Stock")}`}
              onTextChange={this.searchQueryChanged}
              showButton={false}
              searchValue={this.state.listRequestModel.searchString}
            />
            <Row className="px-4 mt-2">
              <Col>
                <FormGroup className="float-Left ">
                  <Button color="primary" onClick={() => this.addBtnClick()}>
                    {this.props.t("Create")}
                  </Button>
                  <Button className="ml-4" color="primary" onClick={() => {}}>
                    {this.props.t("Import")}
                  </Button>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="float-right ">
                  <Button color="primary" onClick={() => {}}>
                    {this.props.t("Author")}
                  </Button>
                  <Button className="ml-4" color="primary" onClick={() => {}}>
                    {this.props.t("Publisher")}
                  </Button>
                </FormGroup>
              </Col>
            </Row>
            <ListPage
              columns={this.state.columns}
              data={this.state.bookStockList}
              keyField={this.state.keyField}
              totalCount={this.state.totalCount}
              rowClicked={this.handleRowClicked}
              rowsPerPageOnChange={this.handlePerRowsChange}
              pageChange={this.handlePageChange}
              isDataLoading={this.state.isLoading}
              overFlowXRemoval={true}
              selectableRows
            />
          </Card>
        </Container>
        <Modal isOpen={this.state.deleteModal} toggle={this.toggleDeleteModal}>
          <ModalHeader toggle={this.toggleDeleteModal}>
            {this.props.t("Remove Book")}
          </ModalHeader>

          <AvForm
            onSubmit={() => this.deleteBookStock(this.state.bookStock._id)}
          >
            <ModalBody>
              <Fragment>
                <Row className="mb-4">
                  <Label className="av-label ml-3">
                    <h5>
                      {this.props.t(
                        "Are you sure you want to remove this Book?"
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

export default withTranslation()(BookStock)
