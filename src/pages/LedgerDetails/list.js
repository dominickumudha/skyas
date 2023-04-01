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
  Table
} from "reactstrap"
import CustomSelectInput from "../../common/CustomSelectInput"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { ledgerDetailsValidation } from "../../helpers/validations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Formik, Form, Field } from "formik"
import { withTranslation } from "react-i18next"

class LedgerDetails extends Component {
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
      ledgerDetails: {},
      type: [{ label: "a", value: "a" }],
      data: [
        {
          date: "45",
          transNo: "454545",
          memberNo: "45",
          tokenNo: "455",
          name: "vidhyaa",
          comp: "dsf",
          cheque: "fgdg",
          payments: "4545",
          receipts: "fgdg",

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
          name: this.props.t("Trans No"),
          selector: "transNo",
          sortable: false,
          cell: row => <span>{row.transNo ? row.transNo : ""}</span>,
        },
        {
          name: this.props.t("Member No"),
          selector: "memberNo",
          sortable: false,
          cell: row => <span>{row.memberNo ? row.memberNo : ""}</span>,
        },
        {
          name: this.props.t("Token No"),
          selector: "tokenNo",
          sortable: false,
          cell: row => <span>{row.tokenNo ? row.tokenNo : ""}</span>,
        },
        {
          name: this.props.t("Name"),
          selector: "name",
          sortable: false,
          cell: row => <span>{row.name ? row.name : ""}</span>,
        },

        {
          name: this.props.t("Comp"),
          selector: "comp",
          sortable: false,
          cell: row => <span>{row.comp ? row.comp : ""}</span>,
        },

        {
          name: this.props.t("Cheque"),
          selector: "cheque",
          sortable: false,
          cell: row => <span>{row.cheque ? row.cheque : ""}</span>,
        },

        {
          name: this.props.t("Payments"),
          selector: "payments",
          sortable: false,
          cell: row => <span>{row.payments ? row.payments : ""}</span>,
        },
        {
          name: this.props.t("Receipts"),
          selector: "receipts",
          sortable: false,
          cell: row => <span>{row.receipts ? row.receipts : ""}</span>,
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
  getAllType() {
    CallService(
      //type.ForAdmin,
      MethodType.POST,
      false,
      { pageNumber: 1, pageLimit: 10000 },
      "",
      this.getAllTypeResponse
    )
  }

  getAllTypeResponse = data => {
    if (data.result) {
      this.setState({
        typeList: data.result.map(function (a) {
          return { value: a._id, label: a.Name }
        }),
      })
    }
  }
  //master Data end

  ///handle Submit start

  handleSubmit = values => {
    e.preventDefault()
    console.log(values)
    this.setState({
      buttonAction: true,
    })
  }
  //handle submit end

  render() {
    const INITIALVALUES = this.state.ledgerDetails
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops pb-5">
          <Card className=" px-4 pt-4 page-content mb-0 pb-0 mt-5 mb-5">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t(
                "Ledger Details"
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
                validationSchema={ledgerDetailsValidation}
                onSubmit={this.handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
              >
                {({ errors, values, setFieldValue }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <Fragment>
                      <Row>
                        <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("From")}
                            </Label>

                            <DatePicker
                              startDate={this.state.startDateTime}
                              selectsStart
                              endDate={this.state.endDateTime}
                              components={{ Input: CustomSelectInput }}
                              className="form-control"
                              selected={this.state.startDateTime}
                              isClearable={true}
                              onChange={date => {
                                setFieldValue("from", date)
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

                            {errors.from && (
                              <div className="invalid-feedback d-block">
                                {errors.from}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pr-4">
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("To")}
                            </Label>
                            <DatePicker
                              startDate={this.state.startDateTime}
                              selectsStart
                              endDate={this.state.endDateTime}
                              components={{ Input: CustomSelectInput }}
                              className="form-control"
                              selected={this.state.endDateTime}
                              isClearable={true}
                              onChange={date => {
                                setFieldValue("to", date)
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
                            {errors.to && (
                              <div className="invalid-feedback d-block">
                                {errors.to}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="1" sm="1" md="1" lg={1}>
                          <FormGroup className="position-relative">
                            <Label className="requiredField">
                              {this.props.t("Ledger")}
                            </Label>
                            <Field
                              type="text"
                              name="ledgerbox1"
                              className="box-border form-control"
                            />
                          </FormGroup>
                        </Col>
                        <Col xs="1" sm="1" md="1" lg={1} className="mt-2 pt-2">
                          <FormGroup className="position-relative">
                            <Field
                              type="text"
                              name="ledgerbox2"
                              className="box-border form-control"
                            />
                          </FormGroup>
                        </Col>{" "}
                        <Col xs="4" sm="4" md="4" lg={4} className="mt-2 pt-2">
                          <FormGroup className="position-relative">
                            <Field
                              type="text"
                              name="ledgerbox3"
                              className="box-border form-control"
                            />
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative">
                            <DropDown
                              label={this.props.t("Type")}
                              classNamePrefix="react-select"
                              className="react-select"
                              name="type"
                              isSearchable
                              options={this.state.type}
                              //options={this.state.typeList} // master data

                              Checkbox={false}
                              Action={e => {
                                setFieldValue("type", e.value)
                              }}
                            />
                            {errors.type && (
                              <div className="invalid-feedback d-block pl-1">
                                {errors.type}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <div className="table-responsive mt-3">
                        <Table Striped className="table table-centered table-nowrap mb-0 ">
                          <thead className="thead-light">
                            <tr>
                              <th> {this.props.t("Date")}</th>
                              <th> {this.props.t("Trans No")}</th>
                              <th>{this.props.t("Member No")}</th>
                              <th>{this.props.t("Token No")} </th>
                              <th>{this.props.t("Name")} </th>
                              <th>{this.props.t("Comp")} </th>
                              <th>{this.props.t("Cheque")} </th>
                              <th>{this.props.t("Payments")} </th>
                              <th>{this.props.t("Receipts")} </th>

                              <th>{this.props.t("Balance")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              {" "}
                              <td> 3/4/2021</td>
                              <td> 454</td>
                              <td>454</td>
                              <td>4554</td>
                              <td>gfgdg </td>
                              <td>dfg</td>
                              <td>fgdgd </td>
                              <td> 455 </td>
                              <td>fgg </td>
                              <td>5658</td>
                            </tr>
                            <tr>
                              {" "}
                              <td> 3/4/2021</td>
                              <td> 454</td>
                              <td>454</td>
                              <td>4554</td>
                              <td>gfgdg </td>
                              <td>dfg</td>
                              <td>fgdgd </td>
                              <td> 455 </td>
                              <td>fgg </td>
                              <td>5658</td>
                            </tr>

                            <tr >
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td>
                                <Label className="mt-1">
                                  {this.props.t("Total")}
                                </Label>
                              </td>
                              <td><Label>34,000</Label></td>
                              <td><Label>4,50,000</Label></td>
                              <td><Label>35,000</Label></td>
                            </tr>
                            <tr >
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td>
                                <Label className="mt-1">
                                  {this.props.t("Closing/Opening")}
                                </Label>
                              </td>
                              <td><Label>45,000</Label></td>
                              <td><Label>3,50,000</Label></td>
                              <td><Label>5000</Label></td>
                            </tr>
                            <tr >
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td>
                                <Label className="mt-1">
                                  {this.props.t("Grand Total")}
                                </Label>
                              </td>
                              <td><Label>9,00,000</Label></td>
                              <td><Label>45,000</Label></td>
                              <td><Label>6,000</Label></td>
                            </tr>
                          </tbody>
                       </Table>
                      </div>
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

export default withTranslation()(LedgerDetails)
