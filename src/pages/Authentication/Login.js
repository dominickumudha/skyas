import React, { Component } from "react"
import PropTypes from "prop-types"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  FormGroup,
  Label,
  Button,
} from "reactstrap"
import { loginValidation } from "../../helpers/validations"
//import { AvField, AvForm } from "availity-reactstrap-validation"
import { apiError, loginUser, socialLogin } from "../../store/actions"
import logo from "../../assets/images/logo.svg"
import { Formik, Form, Field } from "formik"
// Redux
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { withTranslation } from "react-i18next"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
//Social Media Imports
//import { GoogleLogin } from "react-google-login"
// import TwitterLogin from "react-twitter-auth"
//import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"
//Import config
//import { facebook, google } from "../../config"
// availity-reactstrap-validation
// actions
// import images
//import profile from "../../assets/images/profile-img.png"
import { setItemOnLocalStorage } from "../../helpers/utils"

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,

      login: {
        userName: "",
        password: "",
      },
    }
  }
  handleValidSubmit = values => {
    this.props.loginUser(values, this.props.history)
    if (values.userName === "admin" && values.password === "123456") {
      delete values.password
      setItemOnLocalStorage("authUser", JSON.stringify(values))
      this.props.history.push("/")
    } else {
      toastr.error("", "Incorrect UserName / Passsword")
    }
  }

  // handleValidSubmit
  // handleValidSubmit(event, values) {
  // this.props.loginUser(values, this.props.history)
  // delete values.password
  //setItemOnLocalStorage("authUser", JSON.stringify(values))
  //}

  componentDidMount() {
    this.props.apiError("")
  }

  /*signIn = (res, type) => {
    const { socialLogin } = this.props
    if (type === "google" && res) {
      const postData = {
        name: res.profileObj.name,
        email: res.profileObj.email,
        token: res.tokenObj.access_token,
        idToken: res.tokenId,
      }
      socialLogin(postData, this.props.history, type)
    } else if (type === "facebook" && res) {
      const postData = {
        name: res.name,
        email: res.email,
        token: res.accessToken,
        idToken: res.tokenId,
      }
      socialLogin(postData, this.props.history, type)
    }
  }*/

  //handleGoogleLoginResponse
  // googleResponse = response => {
  // this.signIn(response, "google")
  //}

  //handleTwitterLoginResponse
  //twitterResponse = () => {}

  //handleFacebookLoginResponse
  //facebookResponse = response => {
  //  this.signIn(response, "facebook")
  //}

  render() {
    const initialValues = this.state.login
    return (
      <React.Fragment>
        <div className="home-btn d-none d-sm-block">
          <Link to="/" className="text-dark">
            <i className="bx bx-home h2" />
          </Link>
        </div>
        <div className="account-pages my-5 pt-sm-5 ">
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
                          </h5>
                          {/*<p>Sign in to continue to Skote.</p>*/}
                        </div>
                      </Col>
                      {/*<Col className="col-5 align-self-end">
                        <img src={profile} alt="" className="img-fluid" />
    </Col>*/}
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
                        validationSchema={loginValidation}
                        onSubmit={this.handleValidSubmit}
                        validateOnBlur={false}
                        validateOnChange={false}
                      >
                        {({ errors }) => (
                          <Form className="av-tooltip tooltip-label-bottom">
                            <FormGroup className="form-group has-float-label">
                              <Label>{this.props.t("Username")}</Label>
                              <Field
                                type="text"
                                autoFocus
                                className="form-control"
                                name="userName"
                              />
                              {errors.userName && (
                                <div className="invalid-feedback d-block text-danger">
                                  {errors.userName}
                                </div>
                              )}
                            </FormGroup>
                            <FormGroup className="form-group has-float-label">
                              <Label className="mt-1">
                                {this.props.t("Password")}
                              </Label>
                              <Field
                                className="form-control"
                                type="password"
                                name="password"
                              />
                              {errors.password && (
                                <div className="invalid-feedback d-block  text-danger">
                                  {errors.password}
                                </div>
                              )}
                            </FormGroup>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customControlInline"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customControlInline"
                              >
                                {this.props.t("Remember me")}
                              </label>
                            </div>

                            <div className="mt-3">
                              <Button
                                className="btn-block bg-primary"
                                type="submit"
                              >
                                {this.props.t("Login")}
                              </Button>
                            </div>

                            <br />

                            <div className="text-right">
                              <Link
                                to="/forgot-password"
                                className="text-muted"
                              >
                                <i className="mdi mdi-lock mr-1" />
                                {this.props.t("Forget  your Password?")}
                              </Link>
                            </div>
                          </Form>
                        )}
                      </Formik>

                      {/* <div className="mt-4 text-center">
                          <h5 className="font-size-14 mb-3">Sign in with</h5>

                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <FacebookLogin
                                appId={facebook.APP_ID}
                                autoLoad={false}
                                callback={this.facebookResponse}
                                render={renderProps => (
                                  <Link
                                    to={""}
                                    className="social-list-item bg-primary text-white border-primary"
                                    // onClick={renderProps.onClick}
                                  >
                                    <i className="mdi mdi-facebook" />
                                  </Link>
                                )}
                              />
                            </li>
                            <li className="list-inline-item">
                              <GoogleLogin
                                clientId={google.CLIENT_ID}
                                render={renderProps => (
                                  <Link
                                    to={""}
                                    className="social-list-item bg-danger text-white border-danger"
                                    // onClick={renderProps.onClick}
                                  >
                                    <i className="mdi mdi-google" />
                                  </Link>
                                )}
                                onSuccess={this.googleResponse}
                                onFailure={() => {}}
                              />
                            </li>
                          </ul>
                        </div>*/}
                    </div>
                  </CardBody>
                </Card>
                {/*<div className="mt-5 text-center">
                  <p>
                    Don't have an account ?{" "}
                    <Link
                      to="register"
                      className="font-weight-medium text-primary"
                    >
                      {" "}
                      Signup now{" "}
                    </Link>{" "}
                  </p>
                  <p>
                    © {new Date().getFullYear()} Skote. Crafted with{" "}
                    <i className="mdi mdi-heart text-danger" /> by Themesbrand
                  </p>
                      </div>*/}
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

Login.propTypes = {
  apiError: PropTypes.any,
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func,
}

const mapStateToProps = state => {
  const { error } = state.Login
  return { error }
}

export default withTranslation()(
  withRouter(
    connect(mapStateToProps, { loginUser, apiError, socialLogin })(Login)
  )
)
