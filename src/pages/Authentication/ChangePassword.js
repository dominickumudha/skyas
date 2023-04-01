/**START OF GENERATED CODE**/
import React, { Component, Fragment } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Button,
  Container,
} from "reactstrap"
import { ChangePassordValidation } from "../../helpers/validations"
import { withTranslation } from "react-i18next"
import { Link, withRouter } from "react-router-dom"
import logo from "../../assets/images/logo.svg"

import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { Formik, Form, Field } from "formik"

import DropDown from "../../common/DropDown"

class ManageArea extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {}
  handleSubmit = values => {
    alert()
  }

  render() {
    return (
      <Fragment>
        <div className="home-btn d-none d-sm-block">
          <Link to="/" className="text-dark">
            <i className="bx bx-home h2" />
          </Link>
        </div>
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="overflow-hidden mt-5">
                  <div className="bg-soft-primary">
                    <Row>
                      <Col className="col-12">
                        <div className="text-primary p-4 m-2">
                          <h5 className="text-primary">
                            {this.props.t("Employee Co-operative Societies!")}
                            {/*<p>Sign in to continue to Skote.</p>*/}
                          </h5>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div>
                      <Link to="/">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={logo}
                              alt=""
                              className="rounded-circle"
                              height="34"
                            />
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="p-2">
                      {" "}
                      <h5 className="mb-2">
                        {this.props.t("Change Password")}
                      </h5>
                      <Formik
                        initialValues={{}}
                        onSubmit={this.handleSubmit}
                        validateOnBlur={false}
                        validateOnChange={false}
                        validationSchema={ChangePassordValidation}
                      >
                        {({ setFieldValue, values, errors }) => (
                          <Form className="av-tooltip tooltip-label-bottom">
                            <Row className="pt-4">
                              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                <FormGroup className="position-relative">
                                  <Label className="requiredField">
                                    {this.props.t("OTP")}
                                  </Label>

                                  <Field
                                    maxLength="6"
                                    className="form-control box-border"
                                    name="OTP"
                                  />

                                  {errors.OTP && (
                                    <div className="invalid-feedback d-block">
                                      {errors.OTP}
                                    </div>
                                  )}
                                </FormGroup>
                              </Col>
                              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                <FormGroup className="position-relative">
                                  <Label className="requiredField">
                                    {this.props.t("New Password")}
                                  </Label>
                                  <Field
                                    maxLength="6"
                                    className="form-control"
                                    type="password"
                                    name="Password"
                                  />
                                  {errors.Password && (
                                    <div className="invalid-feedback d-block">
                                      {errors.Password}
                                    </div>
                                  )}
                                </FormGroup>
                              </Col>
                              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                <FormGroup className="position-relative">
                                  <Label className="requiredField">
                                    {this.props.t("Confirm New Password")}
                                  </Label>
                                  <Field
                                    maxLength="6"
                                    className="form-control box-border"
                                    type="password"
                                    name="ChangePassword"
                                  />
                                  {errors.ChangePassword && (
                                    <div className="invalid-feedback d-block">
                                      {errors.ChangePassword}
                                    </div>
                                  )}
                                </FormGroup>
                              </Col>
                            </Row>
                            <Col sm={12}>
                              <FormGroup className="float-sm-right">
                                <Button type="submit" outline color="primary">
                                  {this.props.t("Change Password")}
                                </Button>
                                <Button
                                  className="ml-2"
                                  type="button"
                                  onClick={() => {
                                    this.props.history.push("/")
                                  }}
                                  color="danger"
                                >
                                  {this.props.t("Back")}
                                </Button>
                              </FormGroup>
                            </Col>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Fragment>
    )
  }
}
export default withTranslation()(ManageArea)
