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

class Products extends Component {
  state = {
    buttonAction: false,
  }
  componentDidMount() {}

  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageRecoverySettings(values)
  }
  manageRecoverySettings = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageRecoverySettingsResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      // .Create,
      MethodType.PUT,
      false,
      values,
      "",
      this.manageRecoverySettingsResponse
    )
  }
  manageRecoverySettingsResponse = data => {
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
  render() {
    return (
      <Fragment>
        <Card className=" p-4 page-content mb-5">
          <CardBody className="mb-0 pb-0">
            <Formik
              initialValues={{}}
              onSubmit={this.handleSubmit}
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={RecoverySettingsvalidationSchema}
            >
              {({ setFieldValue, errors }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <Card>
                    <CardBody className="mb-0 pb-0">
                      <Row className="px-3">
                        <Col xs="10" sm="10" md="10" lg={10} className="pl-4" />
                        <Button
                          className={this.state.buttonAction ? "disabled" : ""}
                          color="primary"
                          type="submit"
                        >
                          {this.props.t("Add")}
                        </Button>
                      </Row>
                      <div className="table-responsive">
                        <Table
                          bordered
                          className="table table-centered table-nowrap mb-0"
                        >
                          <thead className="thead-light">
                            <tr>
                              <th>{this.props.t("Type")}</th>
                              <th>{this.props.t("Name")}</th>
                              <th>{this.props.t("Action")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{this.props.t("Deposit")}</td>
                              <td>{this.props.t("Thrift Deposit")}</td>
                              <td>
                                <FormGroup>
                                  <Button
                                    className={
                                      this.state.buttonAction ? "disabled" : ""
                                    }
                                    color="primary"
                                    type="submit"
                                  >
                                    {this.props.t("Configure")}
                                  </Button>
                                  <Button
                                    className="ml-4"
                                    color="danger"
                                    // onClick={() => this.handleCancel()}
                                  >
                                    {this.props.t("Delete")}
                                  </Button>
                                </FormGroup>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                      <Row className="px-3 mt-1">
                        <Col>
                          <FormGroup className="float-right ">
                            <Button
                              className={
                                this.state.buttonAction ? "disabled" : ""
                              }
                              color="primary"
                              type="submit"
                            >
                              {this.props.t("Save")}
                            </Button>
                            <Button
                              className="ml-4"
                              color="danger"
                              onClick={() => this.handleCancel()}
                            >
                              {this.props.t("Cancel")}
                            </Button>
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Fragment>
    )
  }
}

export default withTranslation()(Products)
