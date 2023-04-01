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

class Asset extends Component {
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
      assetList: [{}],
      columns: [
        {
          name: this.props.t("Name"),
          selector: "Name",
          sortable: false,
          cell: row => <span>{row.Name ? row.Name : ""}</span>,
        },

        {
          name: this.props.t("Code"),
          selector: "Code",
          sortable: false,
          cell: row => <span>{row.Code ? row.Code : ""}</span>,
        },

        {
          name: this.props.t("Active"),
          selector: "Active",
          sortable: false,
          cell: row => <span>{row.Active ? row.Active : ""}</span>,
        },

        {
          name: this.props.t("Available Count"),
          selector: "AvailableCount",
          sortable: false,
          cell: row => (
            <span>{row.AvailableCount ? row.AvailableCount : ""}</span>
          ),
        },

        {
          name: this.props.t("Cost"),
          selector: "Cost",
          sortable: false,
          cell: row => <span>{row.Cost ? row.Cost : ""}</span>,
        },

        {
          name: this.props.t("Action"),
          selector: "action",
          sortable: false,
          cell: row => (
            <Row>
              <Button
                size="sm"
                color="primary mr-1 my-1"
                onClick={() => this.handleEdit(row)}
              >
                {this.props.t("Edit")}
              </Button>
              <Button
                size="sm"
                color="danger mr-1 my-1"
                onClick={() => this.toggleDeleteModal(row)}
              >
                {this.props.t("Delete")}
              </Button>
              <Button
                size="sm"
                color="success my-1"
                onClick={() => this.ActivateAsset(row)}
              >
                {this.props.t("Activate")}
              </Button>
            </Row>
          ),
        },
      ],
    }
  }
  componentDidMount() {
    this.getAllAsset()
  }

  getAllAsset() {
    let res = {
      result: [{}],
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
    this.getAllAssetResponse(res)
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
      this.getAllAssetResponse
    )
  }
  getAllAssetResponse = data => {
    if (data.pagination && data.result) {
      this.setState({
        isLoading: false,
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        assetList: data.result,
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
          this.getAllAsset()
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
        this.getAllAsset()
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
        this.getAllAsset()
      }
    )
  }

  toggleDeleteModal = row => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      asset: row,
    })
  }
  handleEdit = row => {
    this.props.history.push(`/manage-asset/${row._id}`)
  }
  addBtnClick = () => {
    this.props.history.push("/manage-asset")
  }
  ActivateAsset = row => {
    toastr.success("", this.props.t("Asset Activated Successfully"))
  }
  deleteAsset = value => {
    toastr.success("", this.props.t("Asset Deleted Successfully"))
    this.toggleDeleteModal()
  }
  render() {
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops">
          <Card className="m-2 p-4">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t("Asset")}`}
              onTextChange={this.searchQueryChanged}
              buttonClick={this.addBtnClick}
              searchValue={this.state.listRequestModel.searchString}
            />
            <ListPage
              columns={this.state.columns}
              data={this.state.assetList}
              keyField={this.state.keyField}
              totalCount={this.state.totalCount}
              rowsPerPageOnChange={this.handlePerRowsChange}
              pageChange={this.handlePageChange}
              isDataLoading={this.state.isLoading}
              overFlowXRemoval={true}
            />
          </Card>
        </Container>
        <Modal isOpen={this.state.deleteModal} toggle={this.toggleDeleteModal}>
          <ModalHeader toggle={this.toggleDeleteModal}>
            {this.props.t("Remove Asset")}
          </ModalHeader>

          <AvForm onSubmit={() => this.deleteAsset(this.state.asset._id)}>
            <ModalBody>
              <Fragment>
                <Row className="mb-4">
                  <Label className="av-label ml-3">
                    <h5>
                      {this.props.t(
                        "Are you sure you want to remove this Asset?"
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

export default withTranslation()(Asset)
