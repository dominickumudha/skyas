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
import { paymentModeValidation } from "../../helpers/validations"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"
import { AvForm } from "availity-reactstrap-validation"

import { Formik, Form, Field } from "formik"

import { withTranslation } from "react-i18next"

class PaymentMode extends Component {
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
        sortCondition: { _id: 1 },
        pageNumber: 1,
        pageLimit: 10,
      },

      paymentMode: {
        paymentMode: "",
        isActive: false,
      },
      paymentModeList: [
        {
          _id: 1,
          paymentMode: "credit card",
        },

        {
          _id: 2,
          paymentMode: "Debit Card",
        },
      ],

      columns: [
        {
          name: this.props.t("Serial No"),
          sortable: false,
          cell: (row, index) => index + 1,
        },
        {
          name: this.props.t("Payment Mode"),
          selector: "paymentMode",
          sortable: false,
          cell: row => <span>{row.paymentMode ? row.paymentMode : ""}</span>,
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
                onClick={() => this.handleRowClicked(row)}
              >
                {this.props.t("Edit")}
              </Button>
              <Button
                size="sm"
                color="danger"
                className="ml-1"
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
    this.getAllPaymentMode()
  }
  getAllPaymentMode() {
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
      this.getAllPaymentModeResponse
    )
  }
  getAllPaymentModeResponse = data => {
    if (data.pagination && data.result) {
      this.setState({
        isLoading: false,
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        paymentModeList: data.result,
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
        paymentMode: row,
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
        this.getAllPaymentMode()
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
        this.getAllPaymentMode()
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
          this.getAllPaymentMode()
        }
      }
    )
  }
  addBtnClick = () => {
    this.toggleManageModal()
  }
  toggleManageModal = () => {
    this.setState({
      paymentMode: {},
      manageModal: !this.state.manageModal,
    })
  }

  toggleDeleteModal = row => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      paymentMode: row,
    })
  }
  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.managePaymentMode(values)
  }
  managePaymentMode = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.managePaymentModeResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //values._id ? .Update + values._id : .Create,
      values._id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      this.managePaymentModeResponse
    )
  }
  managePaymentModeResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(
        "",
        this.state.paymentMode._id
          ? this.props.t("Payment Mode Edited Successfully")
          : this.props.t("Payment Mode Added Successfully")
      )
      this.getAllPaymentMode()
    }
    this.toggleManageModal()
  }
  deletePaymentMode = values => {
    toastr.success("", values, "deleted")
    this.toggleDeleteModal()
  }

  render() {
    const INITIALVALUES = this.state.paymentMode
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops">
          <Card className="m-2 px-4 pt-4">
            <ListPageHeader
                 heading={`${this.props.t("Home")}.${this.props.t(
                  "Payment Mode"
                )}`}
                match={this.props.match}
              onTextChange={this.searchQueryChanged}
              buttonClick={this.addBtnClick}
              searchValue={this.state.listRequestModel.searchString}
            />
            <ListPage
              columns={this.state.columns}
              data={this.state.paymentModeList}
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
        <Modal isOpen={this.state.deleteModal} toggle={this.toggleDeleteModal}>
          <ModalHeader toggle={this.toggleDeleteModal}>
            {this.props.t("Remove Payment Mode")}
          </ModalHeader>

          <AvForm
            onSubmit={() => this.deletePaymentMode(this.state.paymentMode._id)}
          >
            <ModalBody>
              <Fragment>
                <Row className="mb-4">
                  <Label className="av-label ml-3">
                    <h5>
                      {this.props.t(
                        "Are you sure you want to remove this Payment Mode?"
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
            {this.state.paymentMode && this.state.paymentMode._id
              ? this.props.t("Edit Payment Mode")
              : this.props.t("Add Payment Mode")}
          </ModalHeader>
          <Formik
            initialValues={INITIALVALUES}
            validationSchema={paymentModeValidation}
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
                        <Label className="requiredField mt-1">
                          {this.props.t("Payment Mode")}
                        </Label>

                        <Field className="form-control" name="paymentMode" />
                        {errors.paymentMode && (
                          <div className="invalid-feedback d-block">
                            {errors.paymentMode}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <FormGroup className="position-relative">
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
                    {this.state.paymentMode && this.state.paymentMode._id ? (
                      <Button
                        className={this.state.buttonAction ? "disabled" : ""}
                        type="submit"
                        color="primary"
                        backgroundColor="primary"
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

export default withTranslation()(PaymentMode)
