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
import { ManageAreaValidation } from "../../helpers/validations"
import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import DropDown from "../../common/DropDown"

class Area extends Component {
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
      listRequestModel: {
        searchString: "",
        sortCondition: null,
        pageNumber: 1,
        pageLimit: 10,
      },
      Level: [],
      area: {
        name: "",
        tamilName: "",
        shortCode: "",
      },
      areaList: [],
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
          name: this.props.t("Level"),
          selector: "Level",
          sortable: false,
          cell: row => <span>{row.Level.Name ? row.Level.Name : ""}</span>,
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
    this.getAllArea()
    this.GetLevels()
  }

  getAllArea() {
    let res = {
      result: [
        {
          Name: "Tenkasi",
          Level: {
            Name: "District",
            Code: 1,
            Depth: 1,
            OrderNumber: 1,
            IsDeleted: false,
            _id: "5fb8da14e160760d5f9bc660",
            ParentLevel: null,
            IsDeletable: false,
            createdAt: "2020-11-21T10:09:43.398Z",
            updatedAt: "2020-11-21T10:09:43.398Z",
            id: "5fb8da14e160760d5f9bc660",
          },
          ParentArea: null,
          MainArea: null,
          AreaType: null,
          ShortCode: "TKS",
          IsDeleted: false,
          _id: "5fb8ecd01ec5c640fd94fe47",
          createdAt: "2020-11-21T10:32:48.912Z",
          updatedAt: "2020-11-21T10:32:48.912Z",
          __v: 0,
          id: "5fb8ecd01ec5c640fd94fe47",
        },
        {
          Name: "Tiruppatur",
          Level: {
            Name: "District",
            Code: 1,
            Depth: 1,
            OrderNumber: 1,
            IsDeleted: false,
            _id: "5fb8da14e160760d5f9bc660",
            ParentLevel: null,
            IsDeletable: false,
            createdAt: "2020-11-21T10:09:43.398Z",
            updatedAt: "2020-11-21T10:09:43.398Z",
            id: "5fb8da14e160760d5f9bc660",
          },
          ParentArea: null,
          MainArea: null,
          AreaType: null,
          ShortCode: "TPT",
          IsDeleted: false,
          _id: "5fb8ecd11ec5c640fd94fe48",
          createdAt: "2020-11-21T10:32:49.413Z",
          updatedAt: "2020-11-21T10:32:49.413Z",
          __v: 0,
          id: "5fb8ecd11ec5c640fd94fe48",
        },
        {
          Name: "Ranipet",
          Level: {
            Name: "District",
            Code: 1,
            Depth: 1,
            OrderNumber: 1,
            IsDeleted: false,
            _id: "5fb8da14e160760d5f9bc660",
            ParentLevel: null,
            IsDeletable: false,
            createdAt: "2020-11-21T10:09:43.398Z",
            updatedAt: "2020-11-21T10:09:43.398Z",
            id: "5fb8da14e160760d5f9bc660",
          },
          ParentArea: null,
          MainArea: null,
          AreaType: null,
          ShortCode: "RPT",
          IsDeleted: false,
          _id: "5fb8ecd11ec5c640fd94fe49",
          createdAt: "2020-11-21T10:32:49.673Z",
          updatedAt: "2020-11-21T10:32:49.673Z",
          __v: 0,
          id: "5fb8ecd11ec5c640fd94fe49",
        },
        {
          Name: "Chengalpattu",
          Level: {
            Name: "District",
            Code: 1,
            Depth: 1,
            OrderNumber: 1,
            IsDeleted: false,
            _id: "5fb8da14e160760d5f9bc660",
            ParentLevel: null,
            IsDeletable: false,
            createdAt: "2020-11-21T10:09:43.398Z",
            updatedAt: "2020-11-21T10:09:43.398Z",
            id: "5fb8da14e160760d5f9bc660",
          },
          ParentArea: null,
          MainArea: null,
          AreaType: null,
          ShortCode: "CPT",
          IsDeleted: false,
          _id: "5fb8ecd11ec5c640fd94fe4a",
          createdAt: "2020-11-21T10:32:49.852Z",
          updatedAt: "2020-11-21T10:32:49.852Z",
          __v: 0,
          id: "5fb8ecd11ec5c640fd94fe4a",
        },
        {
          Name: "Kallakkurichi",
          Level: {
            Name: "District",
            Code: 1,
            Depth: 1,
            OrderNumber: 1,
            IsDeleted: false,
            _id: "5fb8da14e160760d5f9bc660",
            ParentLevel: null,
            IsDeletable: false,
            createdAt: "2020-11-21T10:09:43.398Z",
            updatedAt: "2020-11-21T10:09:43.398Z",
            id: "5fb8da14e160760d5f9bc660",
          },
          ParentArea: null,
          MainArea: null,
          AreaType: null,
          ShortCode: "KKI",
          IsDeleted: false,
          _id: "5fb8ecd11ec5c640fd94fe4b",
          createdAt: "2020-11-21T10:32:50.069Z",
          updatedAt: "2020-11-21T10:32:50.069Z",
          __v: 0,
          id: "5fb8ecd11ec5c640fd94fe4b",
        },
        {
          Name: "Dharmapuri",
          Level: {
            Name: "District",
            Code: 1,
            Depth: 1,
            OrderNumber: 1,
            IsDeleted: false,
            _id: "5fb8da14e160760d5f9bc660",
            ParentLevel: null,
            IsDeletable: false,
            createdAt: "2020-11-21T10:09:43.398Z",
            updatedAt: "2020-11-21T10:09:43.398Z",
            id: "5fb8da14e160760d5f9bc660",
          },
          ParentArea: null,
          MainArea: null,
          AreaType: null,
          ShortCode: "DPI",
          IsDeleted: false,
          _id: "5fb8ecd21ec5c640fd94fe4c",
          createdAt: "2020-11-21T10:32:50.289Z",
          updatedAt: "2020-11-21T10:32:50.289Z",
          __v: 0,
          id: "5fb8ecd21ec5c640fd94fe4c",
        },
        {
          Name: "Kanchipuram",
          Level: {
            Name: "District",
            Code: 1,
            Depth: 1,
            OrderNumber: 1,
            IsDeleted: false,
            _id: "5fb8da14e160760d5f9bc660",
            ParentLevel: null,
            IsDeletable: false,
            createdAt: "2020-11-21T10:09:43.398Z",
            updatedAt: "2020-11-21T10:09:43.398Z",
            id: "5fb8da14e160760d5f9bc660",
          },
          ParentArea: null,
          MainArea: null,
          AreaType: null,
          ShortCode: "KPM",
          IsDeleted: false,
          _id: "5fb8ecd21ec5c640fd94fe4d",
          createdAt: "2020-11-21T10:32:50.495Z",
          updatedAt: "2020-11-21T10:32:50.495Z",
          __v: 0,
          id: "5fb8ecd21ec5c640fd94fe4d",
        },
        {
          Name: "Tiruvallur",
          Level: {
            Name: "District",
            Code: 1,
            Depth: 1,
            OrderNumber: 1,
            IsDeleted: false,
            _id: "5fb8da14e160760d5f9bc660",
            ParentLevel: null,
            IsDeletable: false,
            createdAt: "2020-11-21T10:09:43.398Z",
            updatedAt: "2020-11-21T10:09:43.398Z",
            id: "5fb8da14e160760d5f9bc660",
          },
          ParentArea: null,
          MainArea: null,
          AreaType: null,
          ShortCode: "TLR",
          IsDeleted: false,
          _id: "5fb8ecd21ec5c640fd94fe4e",
          createdAt: "2020-11-21T10:32:50.720Z",
          updatedAt: "2020-11-21T10:32:50.720Z",
          __v: 0,
          id: "5fb8ecd21ec5c640fd94fe4e",
        },
        {
          Name: "Cuddalore",
          Level: {
            Name: "District",
            Code: 1,
            Depth: 1,
            OrderNumber: 1,
            IsDeleted: false,
            _id: "5fb8da14e160760d5f9bc660",
            ParentLevel: null,
            IsDeletable: false,
            createdAt: "2020-11-21T10:09:43.398Z",
            updatedAt: "2020-11-21T10:09:43.398Z",
            id: "5fb8da14e160760d5f9bc660",
          },
          ParentArea: null,
          MainArea: null,
          AreaType: null,
          ShortCode: "CUD",
          IsDeleted: false,
          _id: "5fb8ecd21ec5c640fd94fe4f",
          createdAt: "2020-11-21T10:32:50.912Z",
          updatedAt: "2020-11-21T10:32:50.912Z",
          __v: 0,
          id: "5fb8ecd21ec5c640fd94fe4f",
        },
        {
          Name: "Viluppuram",
          Level: {
            Name: "District",
            Code: 1,
            Depth: 1,
            OrderNumber: 1,
            IsDeleted: false,
            _id: "5fb8da14e160760d5f9bc660",
            ParentLevel: null,
            IsDeletable: false,
            createdAt: "2020-11-21T10:09:43.398Z",
            updatedAt: "2020-11-21T10:09:43.398Z",
            id: "5fb8da14e160760d5f9bc660",
          },
          ParentArea: null,
          MainArea: null,
          AreaType: null,
          ShortCode: "VPM",
          IsDeleted: false,
          _id: "5fb8ecd31ec5c640fd94fe50",
          createdAt: "2020-11-21T10:32:51.117Z",
          updatedAt: "2020-11-21T10:32:51.117Z",
          __v: 0,
          id: "5fb8ecd31ec5c640fd94fe50",
        },
      ],
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
    this.getAllAreaResponse(res)
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
      this.getAllAreaResponse
    )
  }
  getAllAreaResponse = data => {
    if (data.pagination && data.result) {
      this.setState({
        isLoading: false,
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        areaList: data.result,
        totalCount: data.pagination.totalCount,
      })
    } else
      this.setState({
        isLoading: false,
      })
  }
  GetLevels() {
    let res = {
      result: [
        {
          Name: "District",
          Code: 1,
          Depth: 1,
          OrderNumber: 1,
          IsDeleted: false,
          _id: "5fb8da14e160760d5f9bc660",
          ParentLevel: null,
          IsDeletable: false,
          createdAt: "2020-11-21T10:09:43.398Z",
          updatedAt: "2020-11-21T10:09:43.398Z",
          id: "5fb8da14e160760d5f9bc660",
        },
      ],
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
    this.GetLevelsResponse(res)
    CallService(
      // level.levelnextlevel + 0,
      MethodType.GET,
      false,
      "",
      "",
      this.GetLevelsResponse
    )
  }

  GetLevelsResponse = data => {
    if (data.result) {
      const entityArr = []
      data.result.forEach(function (value, key) {
        var entity = { label: value.Name, value: value._id, key: key }
        entityArr.push(entity)
      })
      this.setState({
        Level: entityArr,
      })
    }
  }

  handleRowClicked = row => {
    this.props.history.push("/areamanage/" + row._id + "/" + row._id)
  }

  handleEdit = row => {
    console.log(row)
    if (row) {
      this.setState({
        area: row,
        manageModal: !this.state.manageModal,
      })
    }
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
          this.getAllArea()
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
        this.getAllArea()
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
        this.getAllArea()
      }
    )
  }

  toggleDeleteModal = row => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      area: row,
    })
  }
  addBtnClick = () => {
    this.props.history.push("/managearea")
  }
  toggleManageModal = () => {
    this.setState({
      area: {},
      manageModal: !this.state.manageModal,
    })
  }
  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageArea(values)
  }
  manageArea = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageAreaResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //values._id ? .Update + values._id : .Create,
      values._id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      this.manageAreaResponse
    )
  }
  manageAreaResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(
        "",
        this.state.area._id
          ? this.props.t("Area Edited Successfully")
          : this.props.t("Area Added Successfully")
      )
      this.getAllArea()
    }
    this.toggleManageModal()
  }
  deleteArea = value => {
    toastr.success("", this.props.t("Area Deleted Successfully"))
    this.toggleDeleteModal()
  }
  render() {
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops">
          <Card className="m-2 p-4">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t("Area")}`}
              onTextChange={this.searchQueryChanged}
              buttonClick={this.addBtnClick}
              searchValue={this.state.listRequestModel.searchString}
            />
            <ListPage
              columns={this.state.columns}
              data={this.state.areaList}
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
            {this.props.t("Remove Area")}
          </ModalHeader>

          <AvForm onSubmit={() => this.deleteArea(this.state.area._id)}>
            <ModalBody>
              <Fragment>
                <Row className="mb-4">
                  <Label className="av-label ml-3">
                    <h5>
                      {this.props.t(
                        "Are you sure you want to remove this Area?"
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

        <Modal isOpen={this.state.manageModal} toggle={this.toggleManageModal}>
          <ModalHeader toggle={this.toggleManageModal}>
            {this.state.area && this.state.area._id
              ? this.props.t("Edit Area")
              : this.props.t("Add Area")}
          </ModalHeader>
          <Fragment>
            <Formik
              initialValues={this.state.area}
              onSubmit={this.handleSubmit}
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={ManageAreaValidation}
            >
              {({ setFieldValue, values, errors }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <Card className="border-0 rounded shadow mb-0">
                    <CardBody className="pb-0">
                      <Row>
                        <Col xs="12" sm="12" md="12" lg="12" xl="12">
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("Name")}
                            </Label>

                            <Field
                              name="Name"
                              id="name"
                              type="text"
                              className="form-control box-border"
                            />
                            {errors.Name && (
                              <div className="invalid-feedback d-block">
                                {errors.Name}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="12" sm="12" md="12" lg="12" xl="12">
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("Short Code")}
                            </Label>

                            <Field
                              name="ShortCode"
                              id="ShortCode"
                              type="text"
                              className="form-control box-border"
                            />
                            {errors.ShortCode && (
                              <div className="invalid-feedback d-block">
                                {errors.ShortCode}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                  <ModalFooter>
                    <FormGroup className="float-right ">
                      <Button
                        className={this.state.buttonAction ? "disabled" : ""}
                        type="submit"
                        color="primary"
                      >
                        {this.props.t("Edit")}
                      </Button>

                      <Button
                        className="btn singleEvent   ml-4"
                        color="danger"
                        onClick={() => this.toggleManageModal()}
                      >
                        {this.props.t("Cancel")}
                      </Button>
                    </FormGroup>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </Fragment>
        </Modal>
      </Fragment>
    )
  }
}

export default withTranslation()(Area)
