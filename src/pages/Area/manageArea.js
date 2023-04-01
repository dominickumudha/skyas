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
import { AreaValidation } from "../../helpers/validations"
import { withTranslation } from "react-i18next"
// import { area, level, areatype } from "../../constants/config";
import { BASE_URL } from "../../constants/config"
import { CallService } from "../../helpers/servicecall"
import { INVALID_CHARS } from "../../helpers/utils"
import { MethodType } from "../../constants/defaultValues"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { Formik, Form, Field } from "formik"

import DropDown from "../../common/DropDown"

class ManageArea extends Component {
  constructor(props) {
    super(props)
    this.Managearea = this.Managearea.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      readMode: false,
      Level: [{ label: "District", value: "District" }],
      AreaTypes: [],
      Levels: [],
      areas: [],
      area: {},
    }
  }
  scrollToRef = ref => window.scrollTo(0, ref.offsetTop)
  componentWillMount() {
    this.GetAreaTypes()
    this.GetLevels()
    this.GetAllArea()
  }
  componentDidMount() {
    const { id } = this.props.match.params

    if (id) {
      this.GetOnearea(id)
      const params = new URLSearchParams(this.props.location.search)
      const mode = params.get("mode")
      if (mode === "read") {
        this.setState({ readMode: true })
      } else {
        this.setState({ readMode: false })
      }
    }
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeFirstTab: tab,
      })
    }
  }
  GetOnearea(id) {
    CallService(
      // area.GetOne + id,
      MethodType.GET,
      false,
      "",
      "",
      this.GetOneareaResponse
    )
  }

  GetOneareaResponse = data => {
    this.setState({
      area: data.result,
    })
  }

  GetAreaTypes() {
    CallService(
      // areatype.GetAll,
      MethodType.POST,
      false,
      { pageNumber: 1, pageLimit: 9999999999, OrderByType: "desc" },
      "",
      this.GetAreaTypesResponse
    )
  }

  GetAreaTypesResponse = data => {
    if (data.result) {
      const entityArr = []
      data.result.forEach(function (value, key) {
        var entity = { label: value.Name, value: value._id, key: key }
        entityArr.push(entity)
      })
      this.setState({
        AreaTypes: entityArr,
      })
    }
  }
  GetAllArea() {
    CallService(
      // area.GetAll,
      MethodType.POST,
      false,
      { pageNumber: 1, pageLimit: 9999999999, OrderByType: "desc" },
      "",
      this.GetAllAreaResponse
    )
  }
  GetAllAreaResponse = data => {
    if (data.result) {
      const entityArr = []
      data.result.forEach(function (value, key) {
        var entity = { label: value.Name, value: value._id, key: key }
        entityArr.push(entity)
      })
      this.setState({
        areas: entityArr,
      })
    }
  }
  GetLevels() {
    CallService(
      // level.levelnextlevel + 0,
      MethodType.GET,
      false,
      "",
      "",
      this.GetLevelsResponse
    )
  }

  GetLevelsResponse = data => {
    if (data.result) {
      const entityArr = []
      data.result.forEach(function (value, key) {
        var entity = { label: value.Name, value: value._id, key: key }
        entityArr.push(entity)
      })
      this.setState({
        Levels: entityArr,
      })
    }
  }

  handleSubmit(values) {
    this.Managearea()
  }
  Managearea() {
    this.ManageareaResponse({ statusCode: "200" })
    var dataToPass = ""
    dataToPass = this.state.area
    CallService(
      // area.Create,
      MethodType.PUT,
      false,
      dataToPass,
      "",
      this.ManageareaResponse
    )
  }

  ManageareaResponse = data => {
    if (data.statusCode === "200") {
      this.props.history.push("/area")
      toastr.success("", this.props.t("Area Added Successfully"))
    } else {
      toastr.error("", this.props.t("Something Went Wrong"))
    }
  }

  render() {
    return (
      <Fragment>
        <Container fluid className="page-content">
          <Row className="mb-4">
            <Col xxs="12">
              <Card>
                <CardBody>
                  <CardTitle>
                    <h4 className="mb-2 font-size-18">
                      {this.props.t("Area")}
                    </h4>
                  </CardTitle>
                  <Formik
                    initialValues={this.state.area}
                    onSubmit={this.handleSubmit}
                    validateOnBlur={false}
                    validateOnChange={false}
                    validationSchema={AreaValidation}
                  >
                    {({ setFieldValue, values, errors }) => (
                      <Form className="av-tooltip tooltip-label-bottom">
                        <Row>
                          <Col xs="12" sm="12" md="12" lg="12" xl="12">
                            <FormGroup className="position-relative mt-1">
                              <Label className="requiredField">
                                {this.props.t("Name")}
                              </Label>

                              <Field
                                className="form-control box-border"
                                name="name"
                                onKeyPress={event => {
                                  if (INVALID_CHARS.includes(event.key)) {
                                    event.preventDefault()
                                  }
                                }}
                                value={this.state.area.Name}
                                onChange={({ target }) => {
                                  this.setState(prevState => ({
                                    area: {
                                      ...prevState.area,
                                      Name: target !== null ? target.value : "",
                                    },
                                  })),
                                    setFieldValue("name", target.value)
                                }}
                              />

                              {errors.name && (
                                <div className="invalid-feedback d-block">
                                  {errors.name}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                          <Col xs="12" sm="12" md="12" lg="12" xl="12">
                            <FormGroup className="position-relative mt-1">
                              <Label className="requiredField">
                                {this.props.t("Short Code")}
                              </Label>
                              <Field
                                maxLength="3"
                                className="form-control box-border"
                                name="shortCode"
                                value={this.state.area.ShortCode}
                                onChange={({ target }) => {
                                  setFieldValue("shortCode", target.value),
                                    this.setState(prevState => ({
                                      area: {
                                        ...prevState.area,
                                        ShortCode:
                                          target !== null ? target.value : "",
                                      },
                                    }))
                                }}
                              />
                              {errors.shortCode && (
                                <div className="invalid-feedback d-block">
                                  {errors.shortCode}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                          <Col xs="12" sm="12" md="12" lg="12" xl="12">
                            <FormGroup className="position-relative mt-1">
                              <DropDown
                                classNamePrefix="react-select"
                                className="react-select "
                                name="Level"
                                label={this.props.t("Level")}
                                isSearchable
                                options={this.state.Level}
                                placeholderText={""}
                                Checkbox={false}
                                value={
                                  this.state.area.Level !== undefined
                                    ? this.state.area.Level._id !== undefined
                                      ? this.state.Levels.find(
                                          d =>
                                            d.value ===
                                            this.state.area.Level._id
                                        )
                                      : this.state.Levels.find(
                                          d => d.value === this.state.area.Level
                                        )
                                    : ""
                                }
                                Action={e => {
                                  setFieldValue("Level", e.value)
                                  const areas = []
                                  if (e.target)
                                    if (e.target.key === undefined)
                                      e.target.forEach(tar => {
                                        areas.push(tar.value)
                                      })
                                  this.setState(prevState => ({
                                    area: {
                                      ...prevState.area,
                                      Level: e !== null ? e.value : "",
                                    },
                                  }))
                                }}
                                errors={errors.Level}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Col sm={12}>
                          <FormGroup className="float-sm-right  mt-1">
                            <Button type="submit" outline color="primary">
                              {this.props.t("Save")}
                            </Button>
                            <Button
                              className="ml-2"
                              type="button"
                              onClick={() => {
                                this.props.history.push("/area")
                              }}
                              color="danger"
                            >
                              {this.props.t("Cancel")}
                            </Button>
                          </FormGroup>
                        </Col>
                      </Form>
                    )}
                  </Formik>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    )
  }
}
export default withTranslation()(ManageArea)
