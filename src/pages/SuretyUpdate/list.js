import React, { Component, Fragment } from "react"
import {
  Card,
  CardBody,
  Container,
  Col,
  CustomInput,
  Row,
  Button,
  Label,
  FormGroup,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "reactstrap"
import { CallService } from "../../helpers/servicecall"

import { MethodType, StatusCodes } from "../../constants/defaultValues"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { Formik, Form, Field } from "formik"
import { withTranslation } from "react-i18next"
import { values } from "lodash"
import ListPageHeader from "components/custom/ListPageHeader"
import { SuretyUpdateValidation } from "../../helpers/validations"
class suretyUpdate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageSizeOptions: [10, 50, 100],
      pageLimit: 10,
      totalCount: 0,
      Description: "",
      keyField: "_id",
      buttonAction: false,
      update: false,

      ListRequestModel: {
        searchString: "",
        sortCondition: null,
        pageNumber: 1,
        pageLimit: 10,
      },
      suretyBoxes: {
        memberID: "",
        suretyExisting: "",
        suretyNew: "",
      },
    }
  }
  handleSubmit = values => {}

  render() {
    const initialValues = this.state.suretyBoxes
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops">
          <Card className=" px-4 pt-4 page-content mb-0 pb-0 mt-5">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t(
                "Surety Update"
              )}`}
              showSearch={false}
              showButton={false}
            />
            <CardBody>
              <Formik
                initialValues={initialValues}
                onSubmit={this.handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
                validationSchema={SuretyUpdateValidation}
              >
                {({ setFieldValue, errors }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <Row className="px-3">
                      <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                        <FormGroup className="position-relative">
                          <Label className="requiredField mt-1">
                            {this.props.t("Member ID")}
                          </Label>
                          <Field
                            name="memberID"
                            id="first"
                            type="text"
                            className="form-control box-border"
                          />
                          {errors.memberID && (
                            <div className="invalid-feedback d-block ">
                              {errors.memberID}
                            </div>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="px-3">
                      <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                        <FormGroup className="position-relative">
                          <Label className="requiredField mt-1">
                            {this.props.t("Surety Existing")}
                          </Label>
                          <Field
                            name="suretyExisting"
                            id="first"
                            type="text"
                            className="form-control box-border"
                          />
                          {errors.suretyExisting && (
                            <div className="invalid-feedback d-block ">
                              {errors.suretyExisting}
                            </div>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="px-3">
                      <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                        <FormGroup className="position-relative">
                          <Label className="requiredField mt-1">
                            {this.props.t("New Surety")}
                          </Label>
                          <Field
                            name="suretyNew"
                            id="first"
                            type="text"
                            className="form-control box-border"
                          />
                          {errors.suretyNew && (
                            <div className="invalid-feedback d-block ">
                              {errors.suretyNew}
                            </div>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <FormGroup className="float-right ">
                        <Button
                          className="btn singleEvent  mt-2 mb-3"
                          color="primary"
                          type="submit"
                        >
                          {this.props.t("Change")}
                        </Button>
                        <Button
                          className="btn singleEvent  mt-2 mb-3 ml-4"
                          color="danger"
                          onClick={() => ""}
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
        </Container>
      </Fragment>
    )
  }
}

export default withTranslation()(suretyUpdate)
