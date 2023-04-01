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

class RecoverySettings extends Component {
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
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Postal & Miscellaneous Charge")}
                        </Label>
                        <Field
                          name="PostalMiscellaneousCharge"
                          id="PostalMiscellaneousCharge"
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.PostalMiscellaneousCharge && (
                          <div className="invalid-feedback d-block">
                            {errors.PostalMiscellaneousCharge}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Penal Charges")}
                        </Label>
                        <Field
                          name="PenalCharges"
                          id="PenalCharges"
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.PenalCharges && (
                          <div className="invalid-feedback d-block">
                            {errors.PenalCharges}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Loan Interest")}
                        </Label>

                        <Field
                          name="LoanInterest"
                          id="LoanInterest"
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.LoanInterest && (
                          <div className="invalid-feedback d-block">
                            {errors.LoanInterest}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Deposit-Savings")}
                        </Label>
                        <Field
                          name="DepositSavings"
                          id="DepositSavings"
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.DepositSavings && (
                          <div className="invalid-feedback d-block">
                            {errors.DepositSavings}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1">
                          {this.props.t("Family Welfare Fund")}
                        </Label>
                        <Field
                          name="FamilyWelfareFund"
                          id="FamilyWelfareFund"
                          type="number"
                          className="form-control box-border"
                        />{" "}
                        {errors.FamilyWelfareFund && (
                          <div className="invalid-feedback d-block">
                            {errors.FamilyWelfareFund}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative mt-1">
                        <Label className="requiredField mt-1 ">
                          {this.props.t("Loan Principal")}
                        </Label>

                        <Field
                          name="LoanPrincipal"
                          id="LoanPrincipal"
                          type="number"
                          className="form-control box-border"
                        />
                        {errors.LoanPrincipal && (
                          <div className="invalid-feedback d-block">
                            {errors.LoanPrincipal}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="px-3 mt-1">
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
                  </Row>
                </CardBody>
              </Card>
            </Form>
          )}
        </Formik>
      </Fragment>
    )
  }
}

export default withTranslation()(RecoverySettings)
