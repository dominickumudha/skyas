import React, { Component, Fragment } from "react"
import ListPageHeader from "../../components/custom/ListPageHeader"
import FileDisplay from "../../components/custom/FileDisplay"
import {
  Container,
  Row,
  Col,
  FormGroup,
  Button,
  Label,
  CardBody,
  CardTitle,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  CustomInput,
  ModalFooter,
} from "reactstrap"
import CustomSelectInput from "../../common/CustomSelectInput"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { boardofDirectorsValidation } from "../../helpers/validations"
import { Formik, Form, Field } from "formik"
import { withTranslation } from "react-i18next"
import ListPage from "../../components/custom/ListPage"
import { CallService } from "../../helpers/servicecall"
import {
  MethodType,
  StatusCodes,
  dateFormat,
} from "../../constants/defaultValues"
import logo from "../../assets/images/clients/3.png"
import { formatDate } from "../../helpers/utils"
import logo1 from "../../assets/images/clients/2.png"
import { values } from "lodash"
class BoardofDirectors extends Component {
  constructor(props) {
    super(props)
   
    
    this.state = {
   
      manageModal: false,
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

      boardofDirectors: {
        name: "",
        designation: "",
        effectiveFrom: "",
        effectiveTo: "",
        image: "",
        signature: "",
      },
      data: [
        {
          _id: 1,
          name: "xxx",
          designation: "xxx",
          effectiveFrom: "2021-09-23",
          effectiveTo: "2021-09-23",
        
 
        },
        {
          _id: 2,
          name: "ttt",
          designation: "ttt",
          effectiveFrom: "2021-03-14",
          effectiveTo: "2021-03-15",
      
        },
      ],
      columns: [
        {
          name: this.props.t("Serial No"),

          sortable: false,
          cell: (row, index) => index + 1,
        },
        {
          name: this.props.t("Name"),
          selector: "name",
          sortable: false,
          cell: row => <span>{row.name ? row.name : ""}</span>,
        },
        {
          name: this.props.t("Designation"),
          selector: "designation",
          sortable: false,
          cell: row => <span>{row.designation ? row.designation : ""}</span>,
        },
        {
          name: this.props.t("Effective From"),
          selector: "effectiveFrom",
          sortable: false,
          cell: row => (
            <span>
              {row.effectiveFrom
                ? formatDate(new Date(row.effectiveFrom), dateFormat)
                : ""}
            </span>
          ),
        },
        {
          name: this.props.t("Effective To"),
          selector: "effectiveTo",
          sortable: false,
          cell: row => (
            <span>
              {row.effectiveTo
                ? formatDate(new Date(row.effectiveTo), dateFormat)
                : ""}
            </span>
          ),
        },
        {
          name: this.props.t("Photo"),
          selector: "image",
          sortable: false,
          cell: row =>   (     <FileDisplay Value={row.image} />
          ),
         
        },
        {
          name: this.props.t("Signature"),
          selector: "signature",
          sortable: false,
          cell: row => (
            <FileDisplay Value={row.signature} />
          ),
        },
      ],
    }
  }
  componentDidMount() {
    this.getAllBoardofDirectors()
  }
  getAllBoardofDirectors() {
    this.setState({
      isLoading: false,
    })
    const { listRequestModel } = this.state
    CallService(
      //.GetAll,
      MethodType.POST,
      false,
      listRequestModel,
      "",
      this.getAllBoardofDirectorsResponse
    )
  }
  getAllBoardofDirectorsResponse = data => {
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
  handleRowClicked = row => {
    if (row) {
      this.setState({
        boardofDirectors: row,
        manageModal: !this.state.manageModal,
      })
    }
  }
  handlePageChange = async page => {
    this.setState(
      {
        pageNumber: page,
        listRequestModel: {
          ...this.state.listRequestModel,
          pageNumber: page,
        },
      },
      function () {
        this.getAllBoardofDirectors()
      }
    )
  }
  handlePerRowsChange = async perPage => {
    this.setState(
      {
        pageLimit: perPage,
        pageNumber: 1,
        listRequestModel: {
          ...this.state.listRequestModel,
          pageLimit: perPage,
          pageNumber: 1,
        },
      },
      async function () {
        this.getAllBoardofDirectors()
      }
    )
  }
  searchQueryChanged = search => {
    this.setState(
      {
        listRequestModel: {
          ...this.state.listRequestModel,
          searchString: search.target.value,
        },
      },
      function () {
        if (
          this.state.listRequestModel.searchString === "" ||
          this.state.listRequestModel.searchString.length > 2
        ) {
          this.getAllBoardofDirectors()
        }
      }
    )
  }

  addBtnClick = () => {
    this.toggleManageModal()
  }
  toggleManageModal = () => {
    this.setState({
      boardofDirectors: {},
      manageModal: !this.state.manageModal,
    })
  }
  handleSubmit = values => {
    this.setState({
      buttonAction: true,
    })
    this.manageBoardofDirectors(values)
  }
  manageBoardofDirectors = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageBoardofDirectorsResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //values._id ? .Update + values._id : .Create,
      values._id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      this.manageBoardofDirectorsResponse
    )
  }
  manageBoardofDirectorsResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(
        "",
        this.state.boardofDirectors._id
          ? this.props.t("Board of Directors Edited Successfully")
          : this.props.t("Board of Directors Added Successfully")
      )
      this.getAllBoardofDirectors()
    }
    this.toggleManageModal()
  }

  uploadDocuments(values) {
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
        Values.image = data.result.image
        Values.signature = data.result.signature
        this.manageBoardofDirectors(Values)
      }
    } else {
      toastr.error("", this.props.t("Document upload failed"))
    }
  }
  
  render() {
    const INITIALVALUES = this.state.boardofDirectors
    return (
      <Fragment>
        <Card>
         
          <CardBody>
          <ListPageHeader
                 heading=""
                
              onTextChange={this.searchQueryChanged}
              buttonClick={this.addBtnClick}
              searchValue={this.state.listRequestModel.searchString}
            />
            <ListPage
              columns={this.state.columns}
              data={this.state.data}
              keyField={this.state.keyField}
              totalCount={this.state.totalCount}
              rowClicked={this.handleRowClicked}
              rowsPerPageOnChange={this.handlePerRowsChange}
              pageChange={this.handlePageChange}
              isDataLoading={this.state.isLoading}
              overFlowXRemoval={true}
            />
          </CardBody>
        </Card>
        <Modal isOpen={this.state.manageModal} toggle={this.toggleManageModal}>
          <ModalHeader toggle={this.toggleManageModal}>
            {this.state.boardofDirectors && this.state.boardofDirectors._id
              ? this.props.t("Edit Board of Directors")
              : this.props.t("Add Board of Directors")}
          </ModalHeader>

          <Fragment>
            <Container>
              <Row className="justify-content-center ">
                <Col lg="12">
                  <Card className="border-0 rounded shadow mb-0">
                    <CardBody>
                      <Formik
                        initialValues={INITIALVALUES}
                        validationSchema={boardofDirectorsValidation}
                        onSubmit={this.handleSubmit}
                        validateOnBlur={false}
                        validateOnChange={false}
                      >
                        {({ setFieldValue, values, errors }) => (
                          <Form className="av-tooltip tooltip-label-bottom">
                            <ModalBody>
                              <Row className="mb-10">
                                <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                  <FormGroup className="position-relative">
                                    <Label className="requiredField mt-1">
                                      {this.props.t("Name")}
                                    </Label>

                                    <Field
                                      name="name"
                                      id="name"
                                      type="text"
                                      className="form-control box-border"
                                    />
                                    {errors.name && (
                                      <div className="invalid-feedback d-block">
                                        {errors.name}
                                      </div>
                                    )}
                                  </FormGroup>
                                </Col>

                                <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                  <FormGroup className="position-relative">
                                    <Label className="requiredField mt-1">
                                      {this.props.t("Designation")}
                                    </Label>

                                    <Field
                                      name="designation"
                                      id="designation"
                                      type="text"
                                      className="form-control box-border"
                                    />
                                    {errors.designation && (
                                      <div className="invalid-feedback d-block">
                                        {errors.designation}
                                      </div>
                                    )}
                                  </FormGroup>
                                </Col>

                                <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                  <FormGroup className="position-relative">
                                    <Label className="requiredField mt-1">
                                      {this.props.t("Effective From")}
                                    </Label>

                                    <DatePicker
                                    className="Position-sticky"
                                      name="effectiveFrom"
                                      startDate={this.state.startDateTime}
                                      selectsStart
                                      endDate={this.state.endDateTime}
                                      components={{
                                        Input: CustomSelectInput,
                                      }}
                                      className="form-control"
                                      selected={
                                        values.effectiveFrom
                                          ? new Date(values.effectiveFrom)
                                          : ""
                                      }
                                      isClearable={true}
                                      onChange={date => {
                                        setFieldValue("effectiveFrom", date)
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
                                      placeholderText= {this.props.t("Select Date")}
                                      dateFormat="dd/MM/yyyy"
                                    />
                                    {errors.effectiveFrom && (
                                      <div className="invalid-feedback d-block">
                                        {errors.effectiveFrom}
                                      </div>
                                    )}
                                  </FormGroup>
                                </Col>

                                <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                  <FormGroup className="position-relative">
                                    <Label className="requiredField mt-1">
                                      {this.props.t("Effective To")}
                                    </Label>
                                    <DatePicker
                                      name="effectiveTo"
                                      startDate={this.state.startDateTime}
                                      selectsStart
                                      endDate={this.state.endDateTime}
                                      components={{
                                        Input: CustomSelectInput,
                                      }}
                                      className="form-control"
                                      selected={
                                        values.effectiveTo
                                          ? new Date(values.effectiveTo)
                                          : ""
                                      }
                                      isClearable={true}
                                      onChange={date => {
                                        setFieldValue("effectiveTo", date)
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
                                      placeholderText="Select Date"
                                      dateFormat="dd/MM/yyyy"
                                    />{" "}
                                    {errors.effectiveTo && (
                                      <div className="invalid-feedback d-block">
                                        {errors.effectiveTo}
                                      </div>
                                    )}
                                  </FormGroup>
                                </Col>

                                <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                  <FormGroup className="position-relative">
                                    <Label className="requiredField mt-1">
                                      {this.props.t("Photo")}
                                    </Label>

                                    <CustomInput
                                  className="position-sticky"
                                      key={"imageUrl"}
                                      type="file"
                                      name={"image"}
                                      onChange={event => {
                                        setFieldValue(
                                          "image",
                                          event.target.files[0]
                                        )
                                      }}
                                    />

                                  
                             {errors.image && (
                              <div className="invalid-feedback d-block">
                                {errors.image}
                              </div>
                            )}
                        <p className="text-semi-muted">
                          {this.props.t(
                             "Allowed formats are jpg, jpeg and png"
                          )}
                          <br />
                          {this.props.t("File Size Must be Less Than 5 Mb")}
                        </p>
                                  </FormGroup>
                                </Col>
                                <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                  <FormGroup className="position-relative">
                                    <Label className="requiredField mt-1">
                                      {this.props.t("Signature")}
                                    </Label>

                                    <CustomInput
                                       className="position-sticky"
                                      key={"imageUrl"}
                                      type="file"
                                      name={"signature"}
                                      placeholder="Choose Image"
                                      onChange={event => {
                                        setFieldValue(
                                          "signature",
                                          event.target.files[0]
                                        )
                                      }}
                                    />
                                  {errors.signature && (
                              <div className="invalid-feedback d-block">
                                {errors.signature}
                              </div>
                            )}
                        <p className="text-semi-muted">
                          {this.props.t(
                             "Allowed formats are jpg, jpeg and png"
                          )}
                          <br />
                          {this.props.t("File Size Must be Less Than 5 Mb")}
                        </p>
                                  </FormGroup>
                                </Col>
                              </Row>
                            </ModalBody>
                            <ModalFooter>
                              <FormGroup className="float-sm-right">
                                {this.state.boardofDirectors &&
                                this.state.boardofDirectors._id ? (
                                  <Button
                                    className={
                                      this.state.buttonAction ? "disabled" : ""
                                    }
                                    type="submit"
                                    color="primary"
                                  >
                                    {this.props.t("Edit")}
                                  </Button>
                                ) : (
                                  <Button
                                    className={
                                      this.state.buttonAction ? "disabled" : ""
                                    }
                                    type="submit"
                                    color="primary"
                                  >
                                    {this.props.t("Add")}
                                  </Button>
                                )}

                                <Button
                                  onClick={() => this.toggleManageModal()}
                                  color="danger"
                                  className="ml-2"
                                >
                                  {this.props.t("Cancel")}
                                </Button>
                              </FormGroup>
                            </ModalFooter>
                          </Form>
                        )}
                      </Formik>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Fragment>
        </Modal>

      </Fragment>
    )
  }
}
export default withTranslation()(BoardofDirectors)
