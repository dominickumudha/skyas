import PropTypes from "prop-types"
import React, { Component } from "react"
import {
  Alert,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  FormGroup,
  Label,
  Button,
} from "reactstrap"
import { forgotValidation } from "../../helpers/validations"
import { withTranslation } from "react-i18next"
import { Formik, Form, Field } from "formik"
// Redux
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"

// availity-reactstrap-validation
import { AvField, AvForm } from "availity-reactstrap-validation"

// action
import { userForgetPassword } from "../../store/actions"

// import images
import profile from "../../assets/images/profile-img.png"
import logo from "../../assets/images/logo.svg"
import Logout from "./Logout"

class ForgetPasswordPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      forgotPassword: {},
    }

    // handleValidSubmit
    this.handleValidSubmit = this.handleValidSubmit.bind(this)
  }

  // handleValidSubmit
  handleValidSubmit(event, values) {
    //this.props.userForgetPassword(values, this.props.history)
  }
  handleLogin = () => {
    this.props.history.push("/login")
  }

  render() {
    const initialValues = this.state.forgotPassword
    return (
      <React.Fragment>
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
                      <Formik
                        initialValues={initialValues}
                        validationSchema={forgotValidation}
                        onSubmit={this.handleValidSubmit}
                        validateOnBlur={false}
                        validateOnChange={false}
                      >
                        {({ errors }) => (
                          <Form className="av-tooltip tooltip-label-bottom">
                            <FormGroup className="form-group has-float-label">
                              <Label className="mt-1">
                                {this.props.t("Email")}
                              </Label>
                              <Field
                                className="form-control"
                                type="text"
                                name="email"
                                placeholder="Enter Email"
                              />
                              {errors.email && (
                                <div className="invalid-feedback d-block  text-danger">
                                  {errors.email}
                                </div>
                              )}

                              <div className="mt-5">
                                <Row>
                                  <Col>
                                    <Button
                                      className="bg-primary col-12"
                                      type="submit"
                                    >
                                      {this.props.t("Reset")}
                                    </Button>
                                  </Col>
                                  <Col>
                                    <Button
                                      className="bg-primary col-12"
                                      onClick={this.handleLogin}
                                    >
                                      {this.props.t("Back")}
                                    </Button>
                                  </Col>
                                </Row>
                              </div>
                            </FormGroup>
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
      </React.Fragment>
    )
  }
}

{
  /*ForgetPasswordPage.propTypes = {
  forgetError: PropTypes.func,
  forgetSuccessMsg: PropTypes.func,
  history: PropTypes.object,
  userForgetPassword: PropTypes.any
}

const mapStateToProps = state => {
  const { forgetError, forgetSuccessMsg } = state.ForgetPassword
  return { forgetError, forgetSuccessMsg }
}

export default withRouter(
  connect(mapStateToProps, { userForgetPassword })(ForgetPasswordPage)
)
*/
}
export default withTranslation()(ForgetPasswordPage)
