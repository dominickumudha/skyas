import React, { Component, Fragment } from "react"
import ListPageHeader from "../../components/custom/ListPageHeader"
import ListPage from "../../components/custom/ListPage"
import DropDown from "../../common/DropDown"
import {
  Container,
  Row,
  Col,
  FormGroup,
 
  Label,
  CardBody,
  Card,

} from "reactstrap"

import CustomSelectInput from "../../common/CustomSelectInput"

import toastr from "toastr"
import "toastr/build/toastr.min.css"

import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { generalLedgerValidation } from "../../helpers/validations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { Formik, Form, Field } from "formik"

import { withTranslation } from "react-i18next"

class GeneralLedger extends Component {
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
      generalLedger : {
        accountNo : "",
        accountGroup : ""
      },

      accountNo: [{ label: "a", value: "a" }],
      accountGroup: [{ label: "a", value: "a" }],

  data: [
        {
          date: "45",
          particulars: "fund",
          payment: "9000",
          receipt: "hjfgh",
          balance: "2020",
        },
      ],
      columns: [
        {
          name: this.props.t("Date"),
          selector: "date",
          sortable: false,
          cell: row => <span>{row.date ? row.date : ""}</span>,
        },
        {
          name: this.props.t("Particulars"),
          selector: "particulars",
          sortable: false,
          cell: row => <span>{row.particulars ? row.particulars : ""}</span>,
        },
        {
          name: this.props.t("Payment"),
          selector: "payment",
          sortable: false,
          cell: row => <span>{row.payment ? row.payment : ""}</span>,
        },
        {
          name: this.props.t("Receipt"),
          selector: "receipt",
          sortable: false,
          cell: row => <span>{row.receipt ? row.receipt : ""}</span>,
        },
        {
          name: this.props.t("Balance"),
          selector: "balance",
          sortable: false,
          cell: row => <span>{row.balance ? row.balance : ""}</span>,
        },
     
      ],
    }
  }
  //master Data start account no
  getAllAccountNo() {
    CallService(
      //accountNo.ForAdmin,
      MethodType.POST,
      false,
      { pageNumber: 1, pageLimit: 10000 },
      "",
      this.getAllAccountNoResponse
    )
  }

  getAllAccountNoResponse = data => {
    if (data.result) {
      this.setState({
        accountNoList: data.result.map(function (a) {
          return { value: a._id, label: a.Name }
        }),
      })
    }
  }
  //master Data end

  
  //master Data start Account Group
  getAllAccountGroup() {
    CallService(
      //accountGroup.ForAdmin,
      MethodType.POST,
      false,
      { pageNumber: 1, pageLimit: 10000 },
      "",
      this.getAllAccountGroupResponse
    )
  }

  getAllAccountGroupResponse = data => {
    if (data.result) {
      this.setState({
        accountGroupList: data.result.map(function (a) {
          return { value: a._id, label: a.Name }
        }),
      })
    }
  }
  //master Data end
  ///handle Submit start
 
  handleSubmit = values => {
    e.preventDefault();
    console.log(values)
    this.setState({
      buttonAction: true,
    })

  }
  //handle submit end

  
  render() {
    const INITIALVALUES = this.state.generalLedger
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops pb-5">
          <Card className=" px-4 pt-4 page-content mb-0 pb-0 mt-5 mb-5">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t(
                "General Ledger"
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
                validationSchema={generalLedgerValidation}
                onSubmit={this.handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
              >
                {({ errors, values, setFieldValue }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <Fragment>
                      <Row>
                        <Col xs="3" sm="3" md="3" lg={3} className="pr-4">
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("Period")}
                            </Label>

                            <DatePicker
                              startDate={this.state.startDateTime}
                              selectsStart
                              name="startDate"
                              endDate={this.state.endDateTime}
                              components={{ Input: CustomSelectInput }}
                              className="form-control"
                              selected={this.state.startDateTime}
                              isClearable={true}
                              onChange={date => {
                                setFieldValue("startDate", date)
                                if (date)
                                  this.setState(
                                    {
                                      startDateTime: date,
                                      listRequestModel: {
                                        ...this.state.listRequestModel,

                                        pageNumber: 1,

                                        StartTime: parseInt(
                                          new Date(
                                            date.setHours(0, 0, 0)
                                          ).getTime()
                                        ),
                                      },
                                    },
                                    () => {
                                      // this.GetAllLeave();
                                    }
                                  )
                                else
                                  this.setState(
                                    {
                                      startDateTime: "",
                                      listRequestModel: {
                                        ...this.state.listRequestModel,

                                        pageNumber: 1,

                                        StartTime: "",
                                      },
                                    },
                                    () => {
                                      // this.GetAllLeave();
                                    }
                                  )
                              }}
                              placeholderText={this.props.t("Select Date")}
                              dateFormat="dd/MM/yyyy"
                            />

                            {errors.startDate && (
                              <div className="invalid-feedback d-block">
                                {errors.startDate}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="3" sm="3" md="3" lg={3} className="pr-4">
                          <FormGroup className="position-relative mt-4 pt-1">
                            <DatePicker
                              startDate={this.state.startDateTime}
                              selectsStart
                              endDate={this.state.endDateTime}
                              components={{ Input: CustomSelectInput }}
                              className="form-control"
                              selected={this.state.endDateTime}
                              isClearable={true}
                              onChange={date => {
                                setFieldValue("endDate", date)
                                if (date)
                                  this.setState(
                                    {
                                      endDateTime: date,
                                      listRequestModel: {
                                        ...this.state.listRequestModel,

                                        pageNumber: 1,

                                        StartTime: parseInt(
                                          new Date(
                                            date.setHours(0, 0, 0)
                                          ).getTime()
                                        ),
                                      },
                                    },
                                    () => {
                                      // this.GetAllLeave();
                                    }
                                  )
                                else
                                  this.setState(
                                    {
                                      endDateTime: "",
                                      listRequestModel: {
                                        ...this.state.listRequestModel,

                                        pageNumber: 1,

                                        StartTime: "",
                                      },
                                    },
                                    () => {
                                      // this.GetAllLeave();
                                    }
                                  )
                              }}
                              placeholderText={this.props.t("Select Date")}
                              dateFormat="dd/MM/yyyy"
                            />
                            {errors.endDate && (
                              <div className="invalid-feedback d-block">
                                {errors.endDate}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative">
                            <DropDown
                              label={this.props.t("Account Group")}
                              classNamePrefix="react-select"
                              className="react-select"
                              name="accountGroup"
                              isSearchable
                              options={this.state.accountGroup}
                              //options={this.state.accountGroupList} // master data

                             
                              Checkbox={false}
                              Action={e => {
                                setFieldValue("accountGroup", e.value)
                              }}
                            />
                            {errors.accountGroup && (
                              <div className="invalid-feedback d-block pl-1">
                                {errors.accountGroup}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative">
                            <DropDown
                              label={this.props.t("Account No")}
                              classNamePrefix="react-select"
                              className="react-select"
                              name="accountNo"
                              isSearchable
                              options={this.state.accountNo}
                              //options={this.state.accountNoList} // master data

                              Checkbox={false}
                              Action={e => {
                                setFieldValue("accountNo", e.value)
                              }}
                            />
                            {errors.accountNo && (
                              <div className="invalid-feedback d-block pl-1">
                                {errors.accountNo}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>

                      <ListPage
                      pagination="empty"
                        columns={this.state.columns}
                        data={this.state.data}
                        keyField={this.state.keyField}
                        totalCount={this.state.totalCount}
                        // rowClicked={this.handleRowClicked}
                       // rowsPerPageOnChange={this.handlePerRowsChange}
                       // pageChange={this.handlePageChange}
                        isDataLoading={this.state.isLoading}
                        overFlowXRemoval={true}
                      />
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

export default withTranslation()(GeneralLedger)
