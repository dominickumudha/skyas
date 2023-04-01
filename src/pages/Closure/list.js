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
  CardTitle,
  CustomInput,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
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
import { RecoverySettingsvalidationSchema } from "../../helpers/validations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form, Field } from "formik"
import ListPageHeader from "components/custom/ListPageHeader"

class Closure extends Component {
  state = {
    buttonAction: false,
    manageModal: false,
  }
  componentDidMount() {}

  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageClosure(values)
  }
  manageClosure = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageClosureResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      // .Create,
      MethodType.PUT,
      false,
      values,
      "",
      this.manageClosureResponse
    )
  }
  manageClosureResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success("", this.props.t("Recovery Settings Added Successfully"))
    }
  }
  handleCancel = () => {
    toastr.success("", "cancel")
  }
  toggleManageModal = () => {
    this.setState({
      FeedBack: {},
      manageModal: !this.state.manageModal,
    })
  }
  render() {
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops pb-5">
          <Card className=" p-4 page-content mb-5">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t("Closure")}`}
              showSearch={false}
              showButton={false}
            />
            <CardBody className="mb-0 pb-0">
              <Card>
                <CardBody className="mb-0 pb-0">
                  <Row className="px-3">
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <Button
                        className="ml-4 btn-lg btn-closure"
                        color="primary"
                        onClick={() =>
                          this.setState({
                            closureType: "Transfer",
                          })
                        }
                      >
                        {this.props.t("Transfer")}
                      </Button>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <Button
                        className="ml-4 btn-lg btn-closure"
                        color="primary"
                        onClick={() =>
                          this.setState({
                            closureType: "Promotion",
                          })
                        }
                      >
                        {this.props.t("Promotion")}
                      </Button>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-4">
                      <Button
                        className="ml-4 btn-lg btn-closure"
                        color="primary"
                        style={{ width: "20px" }}
                        onClick={() =>
                          this.setState({
                            closureType: "Death",
                          })
                        }
                      >
                        {this.props.t("Death")}
                      </Button>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-4">
                      <Button
                        className="ml-4 btn-lg btn-closure"
                        color="primary"
                        onClick={() =>
                          this.setState({
                            closureType: "Retirement",
                          })
                        }
                      >
                        {this.props.t("Retirement")}
                      </Button>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-4">
                      <Button
                        className="ml-4 btn-lg btn-closure"
                        color="primary"
                        onClick={() =>
                          this.setState({
                            closureType: "Removal",
                          })
                        }
                      >
                        {this.props.t("Removal")}
                      </Button>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4 mt-4">
                      <Button
                        className="ml-4 btn-lg btn-closure"
                        color="primary"
                        onClick={() =>
                          this.setState({
                            closureType: "Other",
                          })
                        }
                      >
                        {this.props.t("Other")}
                      </Button>
                    </Col>
                  </Row>

                  <Row className="px-3 mt-1">
                    <Col>
                      <FormGroup className="float-right ">
                        <Button
                          className={this.state.buttonAction ? "disabled" : ""}
                          onClick={() => this.toggleManageModal()}
                          color="primary"
                        >
                          {this.props.t("Select")}
                        </Button>
                        <Button
                          className="ml-4"
                          color="danger"
                          onClick={() => this.handleCancel()}
                        >
                          {this.props.t("Close")}
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </CardBody>
          </Card>
        </Container>

        <Modal
          isOpen={this.state.manageModal}
          toggle={this.toggleManageModal}
          size="lg"
        >
          <ModalHeader toggle={this.toggleManageModal}>
            {this.props.t("Employee Detail")}
          </ModalHeader>
          <Fragment>
            <Formik
              initialValues={this.state.FeedBack}
              onSubmit={this.handleSubmit}
              validateOnBlur={false}
              validateOnChange={false}
              // validationSchema={GLAccountsValidation}
            >
              {({ setFieldValue, values, errors }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <Card className="border-0 rounded shadow mb-0 ">
                    <CardBody className="pb-0">
                      <Row>
                        <Col xs="5" sm="5" md="5" lg="5" xl="5">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField mt-1 ">
                              {this.props.t("Employee Name")}
                            </Label>
                            <Field
                              name="name"
                              id="name"
                              type="text"
                              className="form-control box-border"
                            />
                            {errors.name && (
                              <div className="invalid-feedback d-block">
                                {errors.name}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        <Col xs="5" sm="5" md="5" lg="5" xl="5">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField mt-1 ">
                              {this.props.t("Employee Id")}
                            </Label>
                            <Field
                              name="id"
                              id="id"
                              type="text"
                              className="form-control box-border"
                            />
                            {errors.name && (
                              <div className="invalid-feedback d-block">
                                {errors.name}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        <Col
                          xs="2"
                          sm="2"
                          md="2"
                          lg="2"
                          xl="2"
                          className="mt-4"
                        >
                          <Button
                            className="ml-2"
                            color="primary"
                            // onClick={()}
                          >
                            {this.props.t("Search")}
                          </Button>
                        </Col>
                      </Row>

                      <div className="table-responsive">
                        <Table className="table table-centered table-nowrap mb-0">
                          <thead className="thead-light">
                            <tr>
                              <th>{this.props.t("Employee Id")}</th>
                              <th>{this.props.t("Employee Name")}</th>
                              <th>{this.props.t("Join Date")}</th>
                              <th className="text-right">
                                {this.props.t("Action")}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>Employee 1</td>
                              <td>11/11/2000</td>

                              <td>
                                <FormGroup className="float-right ">
                                  <Button
                                    className={
                                      this.state.buttonAction ? "disabled" : ""
                                    }
                                    color="primary"
                                    type="submit"
                                  >
                                    {this.props.t("Transfer")}
                                  </Button>
                                </FormGroup>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </CardBody>
                  </Card>
                  <ModalFooter>
                    <FormGroup className="float-right ">
                      <Button
                        className={this.state.buttonAction ? "disabled" : ""}
                        type="submit"
                        color="primary"
                      >
                        {this.props.t("Save")}
                      </Button>

                      <Button
                        className="btn singleEvent   ml-2"
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

export default withTranslation()(Closure)
