import React, { Component, Fragment } from 'react';
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
  ModalHeader
} from "reactstrap";
import DropDown from "../../common/DropDown";
import CustomSelectInput from "../../common/CustomSelectInput";

import toastr from "toastr";
import "toastr/build/toastr.min.css";
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import { CallService } from '../../helpers/servicecall';
import { MethodType } from '../../constants/defaultValues';
import { recoverysettingvalidationSchema } from '../../helpers/validations';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";


import { Formik, Form, Field } from "formik";
import * as Yup from "yup";



class RecoverySetting extends Component {
  state = {
    startDate: new Date(),
    ListOfProductForDisplay: [""],
  }
  componentDidMount() {

  }



  handleSubmit = (values, errors) => {

  }



  render() {

    return (
      <Fragment>



        <Container>
          <Row className="justify-content-center form-tops"

          >
            <Col lg="10">
              <Card className="border-0 rounded shadow mb-3">
                <CardBody className="p-5">

                  <div className="contact-top text-center">
                    <h4 className="contact-title">Sociaty Recovery Setting</h4>
                  </div>



                  <Formik
                    initialValues={{}}
                    onSubmit={this.handleSubmit}
                    validateOnBlur={false}
                    validateOnChange={false}
                    validationSchema={recoverysettingvalidationSchema}
                  >
                    {({ setFieldValue, errors }) => (
                      <Form className="av-tooltip tooltip-label-bottom">
                        <Row className="mt-4">


                          <Col lg={10} className="mt-5">
                            <FormGroup className="position-relative">
                              <Row>
                                <Col lg="6">
                                  <Label className="requiredField mt-1">Postal & Miscellaneous Charge</Label>
                                </Col>
                                <Col lg="6">
                                  <Field
                                    name="PostalMiscellaneousCharge<"
                                    id="first"
                                    type="number"
                                    className="form-control box-border"
                                  />
                                  {errors.PostalMiscellaneousCharge && (
                                  <div className="invalid-feedback d-block">
                                    {errors.PostalMiscellaneousCharge}
                                  </div>
                                )}
                                </Col>
                                
                              </Row>
                            </FormGroup>
                          </Col>





                          <Col lg={10} className="mt-1">
                            <FormGroup className="position-relative">
                              <Row>
                                <Col lg="6">
                                  <Label className="requiredField mt-1">Penal Charges</Label>
                                </Col>
                                <Col lg="6">
                                  <Field
                                    name="PenalCharges"
                                    id="first"
                                    type="number"
                                    className="form-control box-border"
                                  />
                                  {errors.PenalCharges && (
                                  <div className="invalid-feedback d-block">
                                    {errors.PenalCharges}
                                  </div>
                                )}
                                </Col>
                                
                              </Row>
                            </FormGroup>
                          </Col>




                          <Col lg={10} className="mt-1">
                            <FormGroup className="position-relative">
                              <Row>
                                <Col lg="6">
                                  <Label className="requiredField mt-1">Loan Interest</Label>
                                </Col>
                                <Col lg="6">
                                  <Field
                                    name="LoanInterest"
                                    id="first"
                                    type="number"
                                    className="form-control box-border"
                                  />
                                  {errors.LoanInterest && (
                                  <div className="invalid-feedback d-block">
                                    {errors.LoanInterest}
                                  </div>
                                )}
                                </Col>
                                
                              </Row>
                            </FormGroup>
                          </Col>




                          <Col lg={10} className="mt-1">
                            <FormGroup className="position-relative">
                              <Row>
                                <Col lg="6">
                                  <Label className="requiredField mt-1">Deposit-Savings</Label>
                                </Col>
                                <Col lg="6">
                                  <Field
                                    name="DepositSavings"
                                    id="first"
                                    type="number"
                                    className="form-control box-border"
                                  />
                                  {errors.DepositSavings && (
                                  <div className="invalid-feedback d-block">
                                    {errors.DepositSavings}
                                  </div>
                                )}
                                </Col>
                                
                              </Row>
                            </FormGroup>
                          </Col>



                          <Col lg={10} className="mt-1">
                            <FormGroup className="position-relative">
                              <Row>
                                <Col lg="6">
                                  <Label className="requiredField mt-1">Family Welfare Fund</Label>
                                </Col>
                                <Col lg="6">
                                  <Field
                                    name="FamilyWelfareFund"
                                    id="first"
                                    type="number"
                                    className="form-control box-border"
                                  />
                                  {errors.FamilyWelfareFund && (
                                  <div className="invalid-feedback d-block">
                                    {errors.FamilyWelfareFund}
                                  </div>
                                )}
                                </Col>
                                
                              </Row>
                            </FormGroup>
                          </Col>






                          <Col lg={10} className="mt-1">
                            <FormGroup className="position-relative">
                              <Row>
                                <Col lg="6">
                                  <Label className="requiredField mt-1">Loan Principal</Label>
                                </Col>
                                <Col lg="6">
                                  <Field
                                    name="LoanPrincipal"
                                    id="first"
                                    type="number"
                                    className="form-control box-border"
                                  />
                                   {errors.LoanPrincipal && (
                                  <div className="invalid-feedback d-block">
                                    {errors.LoanPrincipal}
                                  </div>
                                )}
                                </Col>
                              </Row>
                            </FormGroup>
                          </Col>


                        </Row>
                        <center>

                          <Button className='btn singleEvent  mt-2 mb-3' color="primary" type="submit">Save</Button>
                          <Button className='btn singleEvent  mt-2 mb-3 ml-4' color="primary" >Cancel</Button>


                        </center>

                      </Form>
                    )}
                  </Formik>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>





      </Fragment>


    );
  }
}

export default RecoverySetting;