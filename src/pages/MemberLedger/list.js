import React, { Component, Fragment } from "react"
import ListPageHeader from "../../components/custom/ListPageHeader"
import ListPage from "../../components/custom/ListPage"
import DropDown from "../../common/DropDown"
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
  ModalFooter,
} from "reactstrap"

import CustomSelectInput from "../../common/CustomSelectInput"

import toastr from "toastr"
import "toastr/build/toastr.min.css"

import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { memberLedgerValidation } from "../../helpers/validations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { Formik, Form, Field } from "formik"

import { withTranslation } from "react-i18next"

class MemberLedger extends Component {
  constructor(props) {
    super(props)

    this.state = {
      startDate: new Date(),
      buttonAction: false,
      isLoading: false,
      pageSizeOptions: [10, 50, 100],
      pageLimit: 10,
      totalCount: 0,
      keyField: "_id",
      listRequestModel: {
        searchString: "",
        sortCondition: null,
        pageNumber: 1,
        pageLimit: 10,
      },
      memberLedger: {
        memberId: "",
        emloyeeNo: "",
      },

      division: [{ label: "a", value: "a" }],
     loan :  [
      
        {
          loanName: "aaa",
          accountNo: "444",
          date: "23/5/2021",
          amount: "43,454",
          roi: "545g",
          tenure: "gdgd",
          interestAmount: "900",
          outStandingAmount: "34004",
        },
        
        {
          loanName: "aaa",
          accountNo: "444",
          date: "23/5/2021",
          amount: "43,454",
          roi: "545g",
          tenure: "gdgd",
          interestAmount: "900",
          outStandingAmount: "34004",
        },
      ],
      loanColumns: [
        {
          name: this.props.t("Loan Name"),
          selector: "loanName",
          sortable: false,
          cell: row => <span>{row.loanName ? row.loanName : ""}</span>,
        },
        {
          name: this.props.t("Account No"),
          selector: "accountNo",
          sortable: false,
          cell: row => <span>{row.accountNo ? row.accountNo : ""}</span>,
        },
        {
          name: this.props.t("Date"),
          selector: "date",
          sortable: false,
          cell: row => <span>{row.date ? row.date : ""}</span>,
        },
        {
          name: this.props.t("Amount"),
          selector: "amount",
          sortable: false,
          cell: row => <span>{row.amount ? row.amount : ""}</span>,
        },
        {
          name: this.props.t("ROI"),
          selector: "roi",
          sortable: false,
          cell: row => <span>{row.roi ? row.roi : ""}</span>,
        },
        {
          name: this.props.t("Tenure"),
          selector: "tenure",
          sortable: false,
          cell: row => <span>{row.tenure ? row.tenure : ""}</span>,
        },
        {
          name: this.props.t("Interest Amount"),
          selector: "interestAmount",
          sortable: false,
          cell: row => (
            <span>{row.interestAmount ? row.interestAmount : ""}</span>
          ),
        },
        {
          name: this.props.t("Outstanding Amount"),
          selector: "outStandingAmount",
          sortable: false,
          cell: row => (
            <span>{row.outStandingAmount ? row.outStandingAmount : ""}</span>
          ),
        },
      ],
      deposits : [
         {
          accountNo : "45",
        date : "23/6/2021",
        roi : "gfg",
        tenure : "fgdfg",
        maturityDate : "10/09/2020",
        paymentFrequency :"545"
      }
      ],
      depositsColumns: [
        {
          name: this.props.t("Account No"),
          selector: "accountNo",
          sortable: false,
          cell: row => <span>{row.accountNo ? row.accountNo : ""}</span>,
        },
        {
          name: this.props.t("Date"),
          selector: "date",
          sortable: false,
          cell: row => <span>{row.date ? row.date : ""}</span>,
        },
        {
          name: this.props.t("ROI"),
          selector: "roi",
          sortable: false,
          cell: row => <span>{row.roi ? row.roi : ""}</span>,
        },
        {
          name: this.props.t("Tenure"),
          selector: "tenure",
          sortable: false,
          cell: row => <span>{row.tenure ? row.tenure : ""}</span>,
        },
        {
          name: this.props.t("Maturity Date"),
          selector: "maturityDate",
          sortable: false,
          cell: row => <span>{row.maturityDate ? row.maturityDate : ""}</span>,
        },
        {
          name: this.props.t("Payment Frequency"),
          selector: "paymentFrequency",
          sortable: false,
          cell: row => <span>{row.paymentFrequency ? row.paymentFrequency : ""}</span>,
        },
      ],
    }
  }
  //master Data start
  getAllDivision() {
    CallService(
      //Division.ForAdmin,
      MethodType.POST,
      false,
      { pageNumber: 1, pageLimit: 10000 },
      "",
      this.getAllDivisionResponse
    )
  }

  getAllDivisionResponse = data => {
    if (data.result) {
      this.setState({
        divisionList: data.result.map(function (a) {
          return { value: a._id, label: a.Name }
        }),
      })
    }
  }
//master Data end

///handle Submit start 
  handleSubmit = () => {
  }
  //handle submit end

  /*manageMemberLedger = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageMemberLedgerResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //.Create,
      MethodType.PUT,
      false,
      values,
      "",
      this.manageMemberLedgerResponse
    )
  }
  manageMemberLedgerResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success("", this.props.t("Member Ledger Added Successfully"))
    }
  }*/

  render() {
    const INITIALVALUES = this.state.memberLedger
    return (
      <Fragment >
        <Container fluid className="justify-content-center form-tops pb-5">
          <Card className=" px-4 pt-4 page-content mb-0 pb-0 mt-5 mb-5">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t(
                "Member Ledger"
              )}`}
              showSearch={false}
              showButton={false}
              //  match={this.props.match}
              //  onTextChange={this.searchQueryChanged}
              // buttonClick={this.addBtnClick}
              //  searchValue={this.state.listRequestModel.searchString}
            />

            <CardBody>
              <Formik
                initialValues={INITIALVALUES}
                validationSchema={memberLedgerValidation}
                onSubmit={this.handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
              >
                {({ errors, values, setFieldValue }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <Fragment>
                      <div className="mb-5">
                      <h4 className="pt-2">
                            {this.props.t("Select Filters")}:
                          </h4>
                      </div>
                      <Row>
                        <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("Member ID")}
                            </Label>
                            <div className="app-search position-relative pt-0 mt-0 bg-white d-lg-block">
                              <Field
                                type="text"
                                name="memberId"
                                // onKeyPress={this.enterPressed.bind(this)}
                                //onChange={e => onTextChange(e)}
                                // value={searchValue}
                                className="box-border form-control"
                                placeholder={this.props.t("Search") + "..."}
                              />
                              <span className="bx bx-search-alt"></span>
                            </div>
                            {errors.memberId && (
                              <div className="invalid-feedback d-block">
                                {errors.memberId}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("Employee No")}
                            </Label>
                            <div className="app-search position-relative pt-0 mt-0 bg-white d-lg-block">
                              <Field
                                type="text"
                                name="employeeNo"
                                // onKeyPress={this.enterPressed.bind(this)}
                                //onChange={e => onTextChange(e)}
                                // value={searchValue}
                                className="box-border form-control"
                                placeholder={this.props.t("Search") + "..."}
                              />
                              <span className="bx bx-search-alt"></span>
                            </div>
                            {errors.employeeNo && (
                              <div className="invalid-feedback d-block">
                                {errors.employeeNo}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative">
                            <DropDown
                              label={this.props.t("Division")}
                              classNamePrefix="react-select"
                              className="react-select"
                              name="division"
                              isSearchable
                              options={this.state.division}
                              //options={this.state.divisionList} // master data

                              Checkbox={false}
                              Action={e => {
                                setFieldValue("division", e.value)
                              }}
                            />
                            {errors.division && (
                              <div className="invalid-feedback d-block pl-1">
                                {errors.division}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <div className="mb-3 mt-5">
                        
                      <h4 className="pt-2">
                            {this.props.t("Loans")}:
                          </h4>
                      </div>
                      <ListPage
                        columns={this.state.loanColumns}
                        data={this.state.loan}
                        keyField={this.state.keyField}
                        totalCount={this.state.totalCount}
                        // rowClicked={this.handleRowClicked}
                        rowsPerPageOnChange={this.handlePerRowsChange}
                        pageChange={this.handlePageChange}
                        isDataLoading={this.state.isLoading}
                        overFlowXRemoval={true}
                      />

                      <div className="mb-3 mt-5">
                        
                      <h4 className="mt-2 pt-2">
                            {this.props.t("Deposits")}:
                          </h4>
                      </div>
                      <ListPage
                        columns={this.state.depositsColumns}
                        data={this.state.deposits}
                        keyField={this.state.keyField}
                        totalCount={this.state.totalCount}
                        // rowClicked={this.handleRowClicked}
                        rowsPerPageOnChange={this.handlePerRowsChange}
                        pageChange={this.handlePageChange}
                        isDataLoading={this.state.isLoading}
                        overFlowXRemoval={true}
                      />
                      {/*<ModalFooter>
                        <div className="float-right mt-1 mb-5">
                          <Button
                            type="submit"
                            color="primary"
                            className={
                              this.state.buttonAction ? "disabled" : ""
                            }
                          >
                            {this.props.t("Save")}
                          </Button>

                          <Button color="danger" className="mr-5 ml-2">
                            {this.props.t("Cancel")}
                          </Button>
                        </div>
                          </ModalFooter>*/}
                    </Fragment>
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

export default withTranslation()(MemberLedger)
