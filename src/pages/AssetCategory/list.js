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

} from "reactstrap"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { assetCategoryValidation } from "../../helpers/validations"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form, Field } from "formik"
import { withTranslation } from "react-i18next"

class AssetCategory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      buttonAction: false,
      isLoading: false,
      pageSizeOptions: [10, 50, 100],
      pageLimit: 10,
      totalCount: 0,
      keyField: "_id",
      manageModal: false,
      deleteModal: false,

      listRequestModel: {
        searchString: "",
        sortCondition: null,
        pageNumber: 1,
        pageLimit: 10,
      },

      assetCategory: {
        categoryName: "",
        descripton: "",
        isActive: false,
      },
      assetCategoryList: [
        {
          _id: 1,
          categoryName: "xxxxx",
          description: "good Description",
          isActive: "Act",
        },
        {
          _id: 2,
          categoryName: "uu",
          description: "Description",
          isActive: "Act",
        },
      ],
      columns: [
        {
          name: this.props.t("Serial No"),

          sortable: false,
          cell: (row, index) => index + 1,
        },
        {
          name: this.props.t("Category Name"),
          selector: "categoryName",
          sortable: false,
          cell: row => <span>{row.categoryName ? row.categoryName : ""}</span>,
        },
        {
          name: this.props.t("Description"),
          selector: "description",
          sortable: false,
          cell: row => <span>{row.description ? row.description : ""}</span>,
        },
        {
          name: this.props.t("Status"),
          selector: "isActive",
          sortable: false,
          cell: row => <span>{row.isActive ? row.isActive : ""}</span>,
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
                className="ml-3"
                onClick={() => this.handleRowClicked(row)}
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
    this.getAllAssetCategory()
  }
  getAllAssetCategory() {
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
      this.getAllAssetCategoryResponse
    )
  }
  getAllAssetCategoryResponse = data => {
    if (data.pagination && data.result) {
      this.setState({
        isLoading: false,
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        assetCategoryList: data.result,
        totalCount: data.pagination.totalCount,
      })
    } else
      this.setState({
        isLoading: false,
      })
  }
  handleRowClicked = row => {
    if (row) {
      this.setState({
        assetCategory: row,
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
        this.getAllAssetCategory()
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
        this.getAllAssetCategory()
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
          this.getAllAssetCategory()
        }
      }
    )
  }
  addBtnClick = () => {
    this.toggleManageModal()
  }
  toggleManageModal = () => {
    this.setState({
      assetCategory: {},
      manageModal: !this.state.manageModal,
    })
  }

  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageAssetCategory(values)
  }
  manageAssetCategory = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageAssetCategoryResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //values._id ? .Update + values._id : .Create,
      values._id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      this.manageAssetCategoryResponse
    )
  }
  manageAssetCategoryResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(
        "",
        this.state.assetCategory._id
          ? this.props.t("Asset Category Edited Successfully")
          : this.props.t("Asset Category Added Successfully")
      )
      this.getAllAssetCategory()
    }
    this.toggleManageModal()
  }

  render() {
    const INITIALVALUES = this.state.assetCategory

    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops">
          <Card className="m-2 px-4 pt-4 mt-3">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t(
                "Asset Category"
              )}`}
              match={this.props.match}
              onTextChange={this.searchQueryChanged}
              buttonClick={this.addBtnClick}
              searchValue={this.state.listRequestModel.searchString}
            />
            <ListPage
              columns={this.state.columns}
              data={this.state.assetCategoryList}
              keyField={this.state.keyField}
              totalCount={this.state.totalCount}
              //rowClicked={this.handleRowClicked}
              rowsPerPageOnChange={this.handlePerRowsChange}
              pageChange={this.handlePageChange}
              isDataLoading={this.state.isLoading}
              overFlowXRemoval={true}
            />
          </Card>
        </Container>
        <Modal isOpen={this.state.manageModal} toggle={this.toggleManageModal}>
          <ModalHeader toggle={this.toggleManageModal}>
            {this.state.assetCategory && this.state.assetCategory._id
              ? this.props.t("Edit Category")
              : this.props.t("Add Category")}
          </ModalHeader>
          <Formik
            initialValues={INITIALVALUES}
            validationSchema={assetCategoryValidation}
            onSubmit={this.handleSubmit}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ errors, values, setFieldValue }) => (
              <Form className="av-tooltip tooltip-label-bottom">
                <ModalBody>
                  <Row className="mb-10 ml-2 mr-2">
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <FormGroup className="position-relative">
                        <Label className="requiredField">
                          {this.props.t("Category Name")}
                        </Label>

                        <Field className="form-control" name="categoryName" />
                        {errors.categoryName && (
                          <div className="invalid-feedback d-block">
                            {errors.categoryName}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <FormGroup className="position-relative">
                        <Label>{this.props.t("Description")}</Label>

                        <Field
                          className="form-control"
                          name="description"
                          component="textarea"
                        />
                          {errors.description && (
                          <div className="invalid-feedback d-block">
                            {errors.description}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <FormGroup className="form-group has-float-label">
                        <Row>
                          <Col lg="3">
                            <Label className="mt-2">
                              {this.props.t("Is Active")}
                            </Label>
                          </Col>
                          <Col lg="9">
                          <Switch
                              className="mt-1"
                              name="isActive"
                              value="Active"
                              color="primary"
                              checked={values.isActive === "Active"}
                              onChange={(event, checked) => {
                                setFieldValue(
                                  "isActive",
                                  checked ? "Active" : "Inactive"
                                )
                              }}
                            />
                             {errors.isActive && (
                          <div className="invalid-feedback d-block">
                            {errors.isActive}
                            </div>
                             )}
                          
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                  </Row>
                </ModalBody>

                <ModalFooter>
                  <FormGroup className="float-sm-right">
                    {this.state.assetCategory &&
                    this.state.assetCategory._id ? (
                      <Button
                        className={this.state.buttonAction ? "disabled" : ""}
                        type="submit"
                        color="primary"
                      >
                        {this.props.t("Edit")}
                      </Button>
                    ) : (
                      <Button
                        className={this.state.buttonAction ? "disabled" : ""}
                        type="submit"
                        color="primary"
                      >
                        {this.props.t("Add")}
                      </Button>
                    )}

                    <Button
                      onClick={() => this.toggleManageModal()}
                      color="danger"
                      className="mr-3 ml-1"
                    >
                      {this.props.t("Cancel")}
                    </Button>
                  </FormGroup>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </Modal>
      </Fragment>
    )
  }
}

export default withTranslation()(AssetCategory)
