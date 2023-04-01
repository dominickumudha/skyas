/**START OF GENERATED CODE**/

import React, { Component, Fragment } from "react"
import {
  Row,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Card,
  CardBody,
} from "reactstrap"
import { AvForm } from "availity-reactstrap-validation"
import { CallService } from "../../helpers/ServiceCall"
import ListPageHeader from "../../components/custom/ListPageHeader"
import { MethodType } from "../../constants/defaultValues"
// import { attribute } from "../../constants/config"
import ListPage from "../../components/custom/ListPage"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

// import { Ring } from "react-awesome-spinners"
class Attributes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonAction: false,
      isLoading: true,
      pageSizeOptions: [10, 50, 100],
      pageLimit: 10,
      totalCount: 0,
      keyField: "_id",
      AttributeList: [],
      ListRequestModel: {
        searchString: "",
        sortCondition: null,
        pageNumber: 1,
        pageLimit: 10,
      },
      columns: [
        {
          name: "Name",
          selector: "Name",
          sortable: false,
          cell: row => <span>{row.Name ? row.Name : ""}</span>,
        },
        {
          name: "Type ",
          selector: "",
          sortable: false,
          cell: row => (
            <span>{row.AttributeType ? row.AttributeType : ""}</span>
          ),
        },
        {
          name: "Action",
          selector: "action",
          sortable: false,
          cell: row => (
            <Row>
              <Button
                size="sm"
                color="danger"
                onClick={() => this.ToggleDeleteModal(row)}
              >
                Remove
              </Button>
            </Row>
          ),
        },
      ],
    }
  }

  componentDidMount() {
    this.GetAllAttributes()
  }
  GetAllAttributes() {
    this.setState({
      isLoading: true,
    })
    const { ListRequestModel } = this.state
    CallService(
      attribute.GetAll,
      MethodType.POST,
      false,
      ListRequestModel,
      "",
      this.GetAllAttributesResponse
    )
  }

  GetAllAttributesResponse = data => {
    if (data.pagination && data.result) {
      this.setState({
        isLoading: false,
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        AttributeList: data.result,
        totalCount: data.pagination.totalCount,
      })
    } else
      this.setState({
        isLoading: false,
      })
  }
  /** Handle Pagination Code Start */

  handleSort = (column, sortDirection) => {
    var sortObj = {}
    sortObj[column.selector] = sortDirection === "asc" ? 1 : -1
    this.setState(
      {
        ListRequestModel: {
          ...this.state.ListRequestModel,
          sortCondition: sortObj,
        },
      },
      function () {
        this.GetAllAttributes()
      }
    )
  }
  handlePerRowsChange = async perPage => {
    this.setState(
      {
        pageLimit: perPage,
        pageNumber: 1,
        ListRequestModel: {
          ...this.state.ListRequestModel,
          pageLimit: perPage,
          pageNumber: 1,
        },
      },
      async function () {
        this.GetAllAttributes()
      }
    )
  }

  handlePageChange = async page => {
    this.setState(
      {
        pageNumber: page,
        ListRequestModel: {
          ...this.state.ListRequestModel,
          pageNumber: page,
        },
      },
      function () {
        this.GetAllAttributes()
      }
    )
  }
  SearchQueryChanged = search => {
    this.setState(
      {
        ListRequestModel: {
          ...this.state.ListRequestModel,
          searchString: search.target.value,
        },
      },
      function () {
        if (
          this.state.ListRequestModel.searchString === "" ||
          this.state.ListRequestModel.searchString.length > 2
        ) {
          this.GetAllAttributes()
        }
      }
    )
  }
  /** Handle Pagination Code End */
  HandleRowClicked = row => {
    this.props.history.push("/attribute-manage/" + row._id)
  }

  addBtnClick = () => {
    this.props.history.push("/attribute-manage")
  }

  ToggleDeleteModal = row => {
    if (row) {
      this.setState({
        DeleteModal: !this.state.DeleteModal,
        AttributeId: row._id,
      })
    } else {
      this.setState({
        DeleteModal: !this.state.DeleteModal,
      })
    }
  }
  DeleteAttribute = id => {
    CallService(
      attribute.Delete + id,
      MethodType.DELETE,
      false,
      "",
      "",
      this.DeleteAttributeResponse
    )
  }
  DeleteAttributeResponse = data => {
    if (data.stringResult === "S200") {
      toastr.success("", "Attribute removed successfully")
      this.GetAllAttributes()
    }
  }
  render() {
    return (
      <Fragment>
        <div className="page-content">
          <div className="container-fluid">
            <Card>
              <CardBody>
                <ListPageHeader
                  heading="Home.Attributes"
                  onTextChange={this.SearchQueryChanged}
                  buttonClick={this.addBtnClick}
                  searchValue={this.state.ListRequestModel.searchString}
                />

                <ListPage
                  columns={this.state.columns}
                  data={this.state.AttributeList}
                  keyField={this.state.keyField}
                  totalCount={this.state.totalCount}
                  rowClicked={this.HandleRowClicked}
                  rowsPerPageOnChange={this.handlePerRowsChange}
                  pageChange={this.handlePageChange}
                  isDataLoading={this.state.isLoading}
                  overFlowXRemoval={true}
                />
              </CardBody>
            </Card>
            <Modal
              isOpen={this.state.DeleteModal}
              toggle={this.ToggleDeleteModal}
            >
              <ModalHeader toggle={this.ToggleDeleteModal}>
                Remove Attribute
              </ModalHeader>

              <AvForm
                onSubmit={() => this.DeleteAttribute(this.state.AttributeId)}
              >
                <ModalBody>
                  <Fragment>
                    <Row className="mb-2">
                      <Label className="av-label ml-3">
                        <h5>
                          Are you sure you want to remove this Attribute ?
                        </h5>
                      </Label>
                    </Row>
                  </Fragment>
                </ModalBody>

                <ModalFooter>
                  <FormGroup className="float-sm-right ">
                    <Button type="submit" outline color="primary">
                      Yes
                    </Button>
                    <Button
                      color="danger"
                      className="ml-2"
                      onClick={() => this.ToggleDeleteModal()}
                    >
                      No
                    </Button>
                  </FormGroup>
                </ModalFooter>
              </AvForm>
            </Modal>
          </div>
        </div>
      </Fragment>
    )
  }
}
export default Attributes
