import React, { Component, Fragment } from "react"
import {
  Container,
  Row,
  Col,
  FormGroup,
  Button,
  Label,
  CardBody,
  Card,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  CardTitle,
} from "reactstrap"
import DropDown from "../../common/DropDown"
import CustomSelectInput from "../../common/CustomSelectInput"
import { withTranslation } from "react-i18next"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import Tooltip from "@material-ui/core/Tooltip"
import { withStyles } from "@material-ui/core/styles"
import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { ReturnValidationSchema } from "../../helpers/validations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form, Field } from "formik"
import ListPage from "components/custom/ListPage"
import ListPageHeader from "components/custom/ListPageHeader"

class Return extends Component {
  state = {
    startDate: new Date(),
    buttonAction: false,
    capitalGL: [{ label: "1", value: "1" }],
    returnList: [{}],
    columns: [
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
        name: this.props.t("Issued Date"),
        selector: "IssuedDate",
        sortable: false,
        cell: row => <span>{row.IssuedDate ? row.IssuedDate : ""}</span>,
      },
      {
        name: this.props.t("Due Date"),
        selector: "DueDate",
        sortable: false,
        cell: row => <span>{row.DueDate ? row.DueDate : ""}</span>,
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
              {this.props.t("Extend")}
            </Button>
            <Button
              size="sm"
              color="danger"
              className="ml-1"
              onClick={() => this.toggleDeleteModal(row)}
            >
              {this.props.t("Remove")}
            </Button>
          </Row>
        ),
      },
    ],
  }
  componentDidMount() {}

  handleSubmit = values => {
    console.log(values)
    this.setState({
      buttonAction: true,
    })
    this.manageReturn(values)
  }
  manageReturn = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageReturnResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      // .Create,
      MethodType.PUT,
      false,
      values,
      "",
      this.manageReturnResponse
    )
  }
  manageReturnResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(this.props.t("Return Added Successfully"))
    }
  }
  handleCancel = () => {
    toastr.success("", "cancel")
  }
  render() {
    return (
      <Fragment>
        <Container fluid className="page-content">
          <Row className="mb-4">
            <Col xxs="12">
              {" "}
              <Card>
                <CardBody className="mb-0 pb-0">
                  <ListPageHeader
                    heading={`${this.props.t("Home")}.${this.props.t(
                      "Return"
                    )}`}
                    showSearch={false}
                    showButton={false}
                  />
                  <Formik
                    initialValues={{}}
                    onSubmit={this.handleSubmit}
                    validateOnBlur={false}
                    validateOnChange={false}
                    validationSchema={ReturnValidationSchema}
                  >
                    {({ values, setFieldValue, errors }) => (
                      <Form className="av-tooltip tooltip-label-bottom">
                        <Row className="px-3 mt-2">
                          <Col>
                            <FormGroup className="pl-3">
                              <Button
                                className={
                                  this.state.buttonAction ? "disabled" : ""
                                }
                                color="primary"
                                type="submit"
                              >
                                {this.props.t("Return")}
                              </Button>
                              <Button
                                className="ml-4"
                                color="danger"
                                onClick={() => this.handleCancel()}
                              >
                                {this.props.t("Clear")}
                              </Button>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="px-3">
                          <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                            <FormGroup className="position-relative mt-1">
                              <Label className="requiredField mt-1">
                                {this.props.t("Reference Number")}
                              </Label>

                              <Field
                                maxlength="250"
                                name="ReferenceNumber"
                                className="form-control box-border"
                              />
                              {errors.ReferenceNumber && (
                                <div className="invalid-feedback d-block">
                                  {errors.ReferenceNumber}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                          <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                            <FormGroup className="position-relative mt-1">
                              <Label className="requiredField mt-1">
                                {this.props.t("Author")}
                              </Label>

                              <Field
                                maxlength="300"
                                name="Author"
                                id="Author"
                                className="form-control box-border"
                              />
                              {errors.Author && (
                                <div className="invalid-feedback d-block">
                                  {errors.Author}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                          <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                            <FormGroup className="position-relative mt-1">
                              <Label className="requiredField mt-1">
                                {this.props.t("Book Name")}
                              </Label>

                              <Field
                                maxlength="200"
                                name="BookName"
                                id="BookName"
                                className="form-control box-border"
                              />
                              {errors.BookName && (
                                <div className="invalid-feedback d-block">
                                  {errors.BookName}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                          <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                            <FormGroup className="position-relative mt-1">
                              <Label className="mt-1">
                                {this.props.t("Publisher")}
                              </Label>

                              <Field
                                maxlength="300"
                                name="Publisher"
                                id="Publisher"
                                className="form-control box-border"
                              />
                              {errors.Publisher && (
                                <div className="invalid-feedback d-block">
                                  {errors.Publisher}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <center className="mt-2">
                          <FormGroup className="pl-3">
                            <Button
                              className={
                                this.state.buttonAction ? "disabled" : ""
                              }
                              color="primary"
                              type="submit"
                            >
                              {this.props.t("Check In")}
                            </Button>
                          </FormGroup>
                        </center>
                        <ListPage
                          columns={this.state.columns}
                          data={this.state.returnList}
                          keyField={this.state.keyField}
                          totalCount={this.state.totalCount}
                          rowsPerPageOnChange={this.handlePerRowsChange}
                          pageChange={this.handlePageChange}
                          isDataLoading={this.state.isLoading}
                          overFlowXRemoval={true}
                        />
                      </Form>
                    )}
                  </Formik>{" "}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    )
  }
}

export default withTranslation()(Return)
