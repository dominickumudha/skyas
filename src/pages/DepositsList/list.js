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

class DepositList extends Component {
  state = {
    buttonAction: false,
    AccountTypeList: [
      { label: "Individual", value: "Individual" },
      { label: "Joint", value: "Individual" },
      { label: "Either or Servivor", value: "Either or Servivor" },

    ],
  }
  componentDidMount() { }

  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageDeposite(values)
  }
  manageDeposite = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageDepositeResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      // .Create,
      MethodType.PUT,
      false,
      values,
      "",
      this.manageDepositeResponse
    )
  }
  manageDepositeResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success("", this.props.t("Deposite Added Successfully"))
    }
  }
  handleCancel = () => {
    toastr.success("", "cancel")
  }
  render() {
    return (

      <Fragment>
        <Container fluid className="justify-content-center form-tops pb-5">
          <Card className=" p-4 page-content mb-5">
            <CardTitle>{this.props.t("Deposits")}</CardTitle>
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




                        <Col xs="2" sm="2" md="2" lg={2} className="pl-4 mt-3">
                            <Label className="requiredField mt-1">
                              {this.props.t("Member")}
                            </Label>
                          </Col>

                          <Col xs="4" sm="4" md="4" lg={4} className="pl-4">
                            <FormGroup className="position-relative mt-1">

                              <Field
                                name="Member"
                                id="Member"
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



                          <Col xs="2" sm="2" md="2" lg={2} className="pl-4 mt-3">
                            <Label className="requiredField mt-1">
                              {this.props.t("Type")}
                            </Label>
                          </Col>
                          <Col xs="4" sm="4" md="4" lg={4} className="pl-4">
                            <FormGroup className="position-relative">
                              <DropDown
                                classNamePrefix="react-select"
                                className="react-select"
                                label=""
                                name=""
                                isSearchable
                                options={this.state.AccountTypeList}
                                placeholderText="Select Type"
                                Checkbox={false}
                                Action={e => {
                                  if (e) setFieldValue("Type", e.value)
                                }}
                                errors={errors.Type}
                              />
                            </FormGroup>
                          </Col>


                          <div className="table-responsive">
                            <Table bordered className="table table-centered table-nowrap mb-0">
                              <thead className="thead-light">
                                <tr>
                                  <th>Deposite A/C No</th>
                                  <th>Type</th>
                                  <th>Member </th>
                                  <th>Amount</th>
                                  <th>Maturity Date</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr >
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Row>
                        {/* <Row className="px-3 mt-1">
                          <Col>
                            <FormGroup className="float-right ">
                              <Button
                                className={this.state.buttonAction ? "disabled" : ""}
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
                        </Row> */}
                      </CardBody>
                    </Card>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Container>
      </Fragment>
    )
  }
}



export default withTranslation()(DepositList)
