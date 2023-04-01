import React, { Component, Fragment } from "react"
import ListPageHeader from "../../components/custom/ListPageHeader"
import {
  Container,
  Row,
  Col,
  FormGroup,
  Button,
  Label,
  CardBody,
  CardTitle,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  CustomInput,
  ModalFooter,
} from "reactstrap"
import CustomSelectInput from "../../common/CustomSelectInput"
import toastr from "toastr"
import DropDown from "../../common/DropDown"
import "toastr/build/toastr.min.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { MemberRegistrationValidation } from "../../helpers/validations"
import { Formik, Form, Field } from "formik"
import { withTranslation } from "react-i18next"
import ListPage from "../../components/custom/ListPage"
import { CallService } from "../../helpers/servicecall"
import {
  MethodType,
  StatusCodes,
  dateFormat,
} from "../../constants/defaultValues"
import logo from "../../assets/images/clients/3.png"
import { formatDate } from "../../helpers/utils"
import logo1 from "../../assets/images/clients/2.png"
class MemberRegistration extends Component {
  constructor(props) {
    super(props)

    this.state = {
      signatureViewModal: false,
      imageViewModal: false,
      manageModal: false,
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
        totalCount: 0,
        cols: [],
        rows: [],
        errorMessage: null,
        columns: [
          {
            title: "Name",
            dataIndex: "name",
          },
          {
            title: "AGE",
            dataIndex: "age",
          },
        ],
        type: [
          { label: "Deposit", value: "Deposit" },
          { label: "Loan", value: "Loan" },
        ],
      },

      products: {},

      data: [
        {
          _id: 1,
          name: "xxx",
          designation: "xxx",
          effectiveFrom: "2021-09-23",
          effectiveTo: "2021-09-23",
        },
        {
          _id: 2,
          name: "ttt",
          designation: "ttt",
          effectiveFrom: "2021-03-14",
          effectiveTo: "2021-03-15",
        },
      ],
      columns: [
        {
          name: this.props.t("Member No"),
          selector: "memberno",
          sortable: false,
          cell: row => <span>{row.memberno ? row.memberno : ""}</span>,
        },
        {
          name: this.props.t("Name"),
          selector: "name",
          sortable: false,
          cell: row => <span>{row.name ? row.name : ""}</span>,
        },
        {
          name: this.props.t("Designation"),
          selector: "designation",
          sortable: false,
          cell: row => <span>{row.designation ? row.designation : ""}</span>,
        },
        {
          name: this.props.t("Gender"),
          selector: "gender",
          sortable: false,
          cell: row => <span>{row.gender ? row.gender : ""}</span>,
        },
        {
          name: this.props.t("Mobile Number"),
          selector: "mobileno",
          sortable: false,
          cell: row => <span>{row.mobileno ? row.mobileno : ""}</span>,
        },
        {
          name: this.props.t("Email Id"),
          selector: "EmailId",
          sortable: false,
          cell: row => <span>{row.EmailId ? row.EmailId : ""}</span>,
        },
      ],
    }
  }
  componentDidMount() {
    this.getAllProducts()
  }
  getAllProducts() {
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
      this.getAllProductsResponse
    )
  }
  getAllProductsResponse = data => {
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
  handleRowClicked = row => {
    if (row) {
      this.setState({
        products: row,
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
        this.getAllProducts()
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
        this.getAllProducts()
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
          this.getAllProducts()
        }
      }
    )
  }

  addBtnClick = () => {
    this.toggleManageModal()
  }
  toggleManageModal = () => {
    this.setState({
      products: {},
      manageModal: !this.state.manageModal,
    })
  }
  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageProducts(values)
  }
  manageProducts = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageProductsResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //values._id ? .Update + values._id : .Create,
      values._id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      this.manageProductsResponse
    )
  }
  manageProductsResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(
        "",
        this.state.products._id
          ? this.props.t("Products Edited Successfully")
          : this.props.t("Products Added Successfully")
      )
      this.getAllProducts()
    }
    this.toggleManageModal()
  }

  render() {
    const INITIALVALUES = this.state.products
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops">
          <Card className="px-4 pt-4 mb-0 pb-0">
            <CardBody>
              <ListPageHeader
                heading={`${this.props.t("Home")}.${this.props.t(
                  "Member Registration"
                )}`}
                showSearch={false}
                showButton={false}
              />
              <Row>
                <Col>
                  <FormGroup className="float-sm-right">
                    <Button
                      onClick={() => this.toggleManageModal()}
                      color="primary"
                      className="ml-2"
                    >
                      {this.props.t("Bulk Upload")}
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
              <ListPage
                columns={this.state.columns}
                data={this.state.data}
                keyField={this.state.keyField}
                totalCount={this.state.totalCount}
                rowClicked={this.handleRowClicked}
                rowsPerPageOnChange={this.handlePerRowsChange}
                pageChange={this.handlePageChange}
                isDataLoading={this.state.isLoading}
                overFlowXRemoval={true}
              />
            </CardBody>
          </Card>
          <Modal
            isOpen={this.state.manageModal}
            toggle={this.toggleManageModal}
          >
            <ModalHeader toggle={this.toggleManageModal}>
              {this.state.products && this.state.products._id
                ? this.props.t("Edit Members")
                : this.props.t("Add Members")}
            </ModalHeader>

            <Fragment>
              <Container>
                <Row className="justify-content-center ">
                  <Col lg="12">
                    <Card className="border-0 rounded shadow mb-0">
                      <CardBody>
                        <Formik
                          initialValues={INITIALVALUES}
                          validationSchema={MemberRegistrationValidation}
                          onSubmit={this.handleSubmit}
                          validateOnBlur={false}
                          validateOnChange={false}
                        >
                          {({ setFieldValue, values, errors }) => (
                            <Form className="av-tooltip tooltip-label-bottom">
                              <Row className="px-3 mt-2">
                                <Col
                                  xs="12"
                                  sm="12"
                                  md="12"
                                  lg={12}
                                  className="pr-4"
                                >
                                  <FormGroup className="position-relative">
                                    <Label className="requiredField mt-1">
                                      {this.props.t("Member Details")}
                                    </Label>
                                    <CustomInput
                                      key={"imageUrl"}
                                      type="file"
                                      name={"MemberDetails"}
                                      onChange={event => {
                                        setFieldValue(
                                          "MemberDetails",
                                          event.target.files[0]
                                        )
                                      }}
                                    />
                                    <p className="text-semi-muted">
                                      {this.props.t(
                                        "Allowed formats are xls & xlsx"
                                      )}
                                    </p>
                                    {errors.MemberDetails && (
                                      <div className="invalid-feedback d-block">
                                        {errors.MemberDetails}
                                      </div>
                                    )}{" "}
                                  </FormGroup>
                                </Col>
                              </Row>
                              <ModalFooter>
                                <FormGroup className="float-sm-right">
                                  {this.state.products &&
                                  this.state.products._id ? (
                                    <Button
                                      className={
                                        this.state.buttonAction
                                          ? "disabled"
                                          : ""
                                      }
                                      type="submit"
                                      color="primary"
                                    >
                                      {this.props.t("Edit")}
                                    </Button>
                                  ) : (
                                    <Button
                                      className={
                                        this.state.buttonAction
                                          ? "disabled"
                                          : ""
                                      }
                                      type="submit"
                                      color="primary"
                                    >
                                      {this.props.t("Add")}
                                    </Button>
                                  )}

                                  <Button
                                    onClick={() => this.toggleManageModal()}
                                    color="danger"
                                    className="ml-2"
                                  >
                                    {this.props.t("Cancel")}
                                  </Button>
                                </FormGroup>
                              </ModalFooter>
                            </Form>
                          )}
                        </Formik>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </Fragment>
          </Modal>
        </Container>
      </Fragment>
    )
  }
}
export default withTranslation()(MemberRegistration)
