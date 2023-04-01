import React, { Component, Fragment } from "react"
import ListPageHeader from "../../components/custom/ListPageHeader"
import DropDown from "../../common/DropDown"
import { Tabs, Tab } from "react-bootstrap"
import ListPage from "../../components/custom/ListPage"
import {
  Container,
  Row,
  Col,
  FormGroup,
  Button,
  Label,
  CardBody,
  Card,
  ModalFooter,
  CustomInput,
} from "reactstrap"

import CustomSelectInput from "../../common/CustomSelectInput"

import toastr from "toastr"
import "toastr/build/toastr.min.css"

import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { memberSettlementValidation } from "../../helpers/validations"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { Formik, Form, Field } from "formik"

import { withTranslation } from "react-i18next"

class MemberSettlement extends Component {
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
      memberSettlement: {
        member: "",
        resolutionNo: "",
        suretyMember: "",
      },
      closureType: [
        { label: "Closure", value: "Closure" },
        { label: "Expired", value: "Expired" },
      ],

      data: [
        {
          description: "description",
          amount: "56757",
          interest: "67%",
        },
        {
          description: "description",
          amount: "56757",
          interest: "67%",
        },
      ],

      columns: [
        {
          name: this.props.t("Description"),
          selector: "description",
          sortable: false,
          cell: row => <span>{row.description ? row.description : ""}</span>,
        },
        {
          name: this.props.t("Amount"),
          selector: "amount",
          sortable: false,
          cell: row => <span>{row.amount ? row.amount : ""}</span>,
        },
        {
          name: this.props.t("Interest"),
          selector: "interest",
          sortable: false,
          cell: row => <span>{row.interest ? row.interest : ""}</span>,
        },
      ],
    }
  }


  //Master Data
  getAllClosureType() {
    CallService(
      //closureType.ForAdmin,
      MethodType.POST,
      false,
      { pageNumber: 1, pageLimit: 10000 },
      "",
      this.getAllClosureTypeResponse
    )
  }

  getAllClosureTypeResponse = data => {
    if (data.result) {
      this.setState({
        closureTypeList: data.result.map(function (a) {
          return { value: a._id, label: a.Name }
        }),
      })
    }
  }
// master Data end


  //Document Api
  uploadDocuments = values => {
    this.setState({
      buttonAction: true,
      processing: true,
      values: values,
    })
    this.values = values
    let formData = new FormData()
    Object.keys(values).map(key => {
      if (typeof values[key] === "object")
        if (JSON.stringify(values[key]) === "{}") {
          return formData.append(key, values[key])
        }
      return ""
    })

    CallService(
      //.upload,
      MethodType.POST,
      false,
      formData,
      "",
      this.documentUploaded,
      true
    )
  }

  documentUploaded = data => {
    if (data.statusCode === StatusCodes.Success) {
      if (data.result) {
        var Values = this.state.values
        Values.referenceLetter = data.result.referenceLetter
        this.getAllMemberSettlement(Values)
      }
    } else {
      toastr.error("", this.props.t("Document upload failed"))
    }
  }
//  document API

//Cancel function start

handleCancel = () => {
  toastr.success("",  this.props.t("Cancel"))
}
//cancel funciton end

  componentDidMount() {
  
  }
  
  
  
  getAllAsset() {
    this.setState({
      isLoading: false,
    })
    const { listRequestModel } = this.state
    CallService(
      //.GetAll,
      MethodType.GET,
      false,
      listRequestModel,
      "",
      this.getAllAssetResponse
    )
  }
  getAllAssetResponse = data => {
    if (data.pagination && data.result) {
      this.setState({
        isLoading: false,
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        data: data.result,
        totalCount: data.pagination.totalCount,
      })
    } else
      this.setState({
        isLoading: false,
      })
  }

  getAllLiability() {
    this.setState({
      isLoading: false,
    })
    const { listRequestModel } = this.state
    CallService(
      //.GetAll,
      MethodType.GET,
      false,
      listRequestModel,
      "",
      this.getAllLiabilityResponse
    )
  }
  getAllLiabilityResponse = data => {
    if (data.pagination && data.result) {
      this.setState({
        isLoading: false,
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        data: data.result,
        totalCount: data.pagination.totalCount,
      })
    } else
      this.setState({
        isLoading: false,
      })
  }
  
  
  getAllMemberSettlement() {
    this.setState({
      isLoading: false,
    })
    const { listRequestModel } = this.state
    CallService(
      //.create,
      MethodType.PUT,
      false,
      listRequestModel,
      "",
      this.getAllMemberSettlement
    )
  }
  getAllMemberSettlementResponse = data => {
    if (data.pagination && data.result) {
      this.setState({
        isLoading: false,
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        data: data.result,
        totalCount: data.pagination.totalCount,
      })
    } else
      this.setState({
        isLoading: false,
      })
  }
 
  //handle  submit function and api
  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageMemberSettlement(values)
  }
  manageMemberSettlement = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageMemberSettlementResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //.Create,
      MethodType.PUT,
      false,
      values,
      "",
      this.manageMemberSettlementResponse
    )
  }
  manageMemberSettlementResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success("", this.props.t("Member Settlement Added Successfully"))
    }
  }
// handle Submit funciton and api

  render() {
    const INITIALVALUES = this.state.memberSettlement
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops pb-5">
          <Card className=" px-4 pt-4 page-content mb-0 pb-0 mt-5 mb-5">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t(
                "Member Settlement"
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
                validationSchema={memberSettlementValidation}
                onSubmit={this.handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
              >
                {({ errors, values, setFieldValue }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <Fragment>
                      <Row>
                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative">
                            <DropDown
                              label={this.props.t("Closure Type")}
                              classNamePrefix="react-select"
                              className="react-select"
                              name="closureType"
                              isSearchable
                              options={this.state.closureType}
                              //options={this.state.closureType} // master data
                              placeholderText={this.props.t("Resign/Retirement")}
                              Checkbox={false}
                              Action={e => {
                                setFieldValue("closureType", e.value)
                              }}
                            />
                            {errors.closureType && (
                              <div className="invalid-feedback d-block pl-1">
                                {errors.closureType}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("Apply Date")}
                            </Label>

                            <DatePicker
                              isClearable={true}
                              components={{ Input: CustomSelectInput }}
                              className="form-control box-border"
                              selectsStart
                              selected={this.state.applyDate}
                              onChange={date => {
                                setFieldValue("applyDate", date)
                                if (date)
                                  this.setState({
                                    applyDate: date,
                                  })
                                else
                                  this.setState({
                                    applyDate: "",
                                  })
                              }}
                              placeholderText={this.props.t("Select Date")}
                              dateFormat="dd/MM/yyyy"
                            />

                            {errors.applyDate && (
                              <div className="invalid-feedback d-block">
                                {errors.applyDate}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4"></Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("Member")}
                            </Label>
                            <div className="app-search position-relative pt-0 mt-0 bg-white d-lg-block">
                              <Field
                                type="text"
                                name="member"
                                // onKeyPress={this.enterPressed.bind(this)}
                                //onChange={e => onTextChange(e)}
                                // value={searchValue}
                                className="box-border form-control"
                                placeholder={this.props.t("Search") + "..."}
                              />
                              <span className="bx bx-search-alt"></span>
                            </div>
                            {errors.member && (
                              <div className="invalid-feedback d-block">
                                {errors.member}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        <Col xs="6" sm="6" md="6" lg={6}>
                          <FormGroup className="position-relative">
                            <Label className="required-field">
                              {this.props.t("Reference Letter")}
                            </Label>
                            <CustomInput
                               className="position-sticky"
                              key={"imageUrl"}
                              type="file"
                              name={"referenceLetter"}
                              onChange={event => {
                                setFieldValue(
                                  "referenceLetter",
                                  event.target.files[0]
                                )
                              }}
                            />

                            {errors.referenceLetter ? (
                              <div className="invalid-feedback d-block">
                                {errors.referenceLetter}
                              </div>
                            ) : null}
                            <p className="text-semi-muted">
                              {this.props.t(
                                "Allowed formats are doc,docx and pdf"
                              )}
                                <br />
                          {this.props.t("File Size Must be Less Than 5 Mb")}
                            </p>
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("Expired Date")}
                            </Label>

                            <DatePicker
                              isClearable={true}
                              components={{ Input: CustomSelectInput }}
                              className="form-control box-border"
                              selectsStart
                              selected={this.state.expiredDate}
                              onChange={date => {
                                setFieldValue("expiredDate", date)
                                if (date)
                                  this.setState({
                                    expiredDate: date,
                                  })
                                else
                                  this.setState({
                                    expiredDate: "",
                                  })
                              }}
                              placeholderText={this.props.t("Select Date")}
                              dateFormat="dd/MM/yyyy"
                            />

                            {errors.expiredDate && (
                              <div className="invalid-feedback d-block">
                                {errors.expiredDate}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6}>
                          <h4 className="mt-2 pt-2">
                            {this.props.t("Surety Details")}:
                          </h4>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("Resolution No")}
                            </Label>

                            <Field
                              type="text"
                              name="resolutionNo"
                              className="box-border form-control"
                            />

                            {errors.resolutionNo && (
                              <div className="invalid-feedback d-block">
                                {errors.resolutionNo}
                              </div>
                            )}
                          </FormGroup>
                        </Col>

                        <Col xs="4" sm="4" md="4" lg={4} className="pt-3">
                          <FormGroup className="position-relative mt-1">
                            <Label className="requiredField mt-1">
                              {this.props.t("Surety Member")}
                            </Label>
                            <Field
                              name="suretyMember"
                              //id="suretyMember"
                              type="text"
                              className="form-control box-border"
                            />

                            {errors.suretyMember && (
                              <div className="invalid-feedback d-block">
                                {errors.suretyMember}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                        <Col className="mt-2 pt-3">
                          <Row>
                            <Col xs="1" sm="1" md="1" lg={1}>
                              <Button
                                className="rounded-circle mt-2"
                                outline
                                size="sm"
                                color="primary"
                              >
                                <b>i</b>
                              </Button>
                            </Col>{" "}
                            <Col>
                              <p className="pt-1 mt-2 pl-4">
                                {this.props.t("Break ups")}
                              </p>
                            </Col>
                          </Row>
                        </Col>

                        <Col xs="6" sm="6" md="6" lg={6} className="pl-4 pt-4">
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("Resolution Date")}
                            </Label>

                            <DatePicker
                              isClearable={true}
                              components={{ Input: CustomSelectInput }}
                              className="form-control box-border"
                              selectsStart
                              selected={this.state.resolutionDate}
                              onChange={date => {
                                setFieldValue("resolutionDate", date)
                                if (date)
                                  this.setState({
                                    resolutionDate: date,
                                  })
                                else
                                  this.setState({
                                    resolutionDate: "",
                                  })
                              }}
                              placeholderText={this.props.t("Select Date")}
                              dateFormat="dd/MM/yyyy"
                            />

                            {errors.resolutionDate && (
                              <div className="invalid-feedback d-block">
                                {errors.resolutionDate}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Tabs
                        defaultActiveKey="member"
                        transition={false}
                        className="mt-4"
                      >
                        <Tab eventKey="member" title={this.props.t("Member")}>
                          <Row>
                            <Col sm="6" lg="6" md="6" xs="6">
                              <div className="text-center mt-5">
                                <h4>{this.props.t("Asset")}</h4>
                              </div>
                              <ListPage
                              pagination = "empty"
                                columns={this.state.columns}
                                data={this.state.data}
                               // keyField={this.state.keyField}
                               // totalCount={this.state.totalCount}
                                // rowClicked={this.handleRowClicked}
                                //rowsPerPageOnChange={this.handlePerRowsChange}
                               // pageChange={this.handlePageChange}
                                isDataLoading={this.state.isLoading}
                                overFlowXRemoval={true}
                              />
                            </Col>
                            <Col sm="6" lg="6" md="6" xs="6">
                              <div className="text-center mt-5">
                                <h4>{this.props.t("Liability")}</h4>
                              </div>
                              <ListPage
                              pagination="empty"
                                columns={this.state.columns}
                                data={this.state.data}
                                keyField={this.state.keyField}
                                totalCount={this.state.totalCount}
                                // rowClicked={this.handleRowClicked}
                                rowsPerPageOnChange={this.handlePerRowsChange}
                                pageChange={this.handlePageChange}
                                isDataLoading={this.state.isLoading}
                                overFlowXRemoval={true}
                              />
                            </Col>
                          </Row>
                        </Tab>
                        <Tab
                          eventKey="surety"
                          title={this.props.t("Surety")}
                        ></Tab>
                      </Tabs>
                      <ModalFooter>
                        <div className="float-right mt-1">
                          <Button
                            type="submit"
                            color="primary"
                            className={
                              this.state.buttonAction ? "disabled" : ""
                            }
                          >
                            {this.props.t("Change")}
                          </Button>

                          <Button
                            color="danger"
                            className="mr-5 ml-2"
                            onClick={this.handleCancel}
                          >
                            {this.props.t("Cancel")}
                          </Button>
                        </div>
                      </ModalFooter>
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

export default withTranslation()(MemberSettlement)
