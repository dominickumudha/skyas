import React, { Component, Fragment } from "react"
import DropDown from "../../common/DropDown"
import {
  Container,
  Row,
  Col,
  FormGroup,
  Button,
  Label,
  Card,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  CustomInput,
} from "reactstrap"

import toastr from "toastr"
import "toastr/build/toastr.min.css"

import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import { stockEntryValidation } from "../../helpers/validations"
import { addStockEntryValidation } from "../../helpers/validations"
import ListPage from "../../components/custom/ListPage"
import ListPageHeader from "../../components/custom/ListPageHeader"

import { Formik, Form, Field } from "formik"
import CustomSelectInput from "../../common/CustomSelectInput"

import { withTranslation } from "react-i18next"
import { AvForm } from "availity-reactstrap-validation"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
class StockEntry extends Component {
  constructor(props) {
    super(props)

    this.state = {
      buttonAction: false,
      isLoading: false,
      pageSizeOptions: [10, 50, 100],
      pageLimit: 10,
      totalCount: 0,
      keyField: "_id",
      listRequestModel: {
        searchString: "",
        sortCondition: { _id: 1 },
        pageNumber: 1,
        pageLimit: 10,
      },
      vendor: [{ label: "vendor", value: "vendor" }],
      poNo: [{ label: "poNo", value: "poNo" }],

      stockEntry: {
        date: "",
        poNo: "",
        vendor: "",
        deliveryOn: "",
        deliveryChallan: "",
      },

      addStockEntry: {
        item: "",
        available: "",
        quantityToBeAdded: "",
        total: "",
      },

      data: [
        {
          item: "rava",
          available: "10",
          quantityToBeAdded: "34",
          total: "450",
        },
      ],

      columns: [
        {
          name: this.props.t("Serial No"),

          sortable: false,
          cell: (row, index) => index + 1,
        },
        {
          name: this.props.t("Item"),
          selector: "item",
          sortable: false,
          cell: row => <span>{row.item ? row.item : ""}</span>,
        },
        {
          name: this.props.t("Available"),
          selector: "available",
          sortable: false,
          cell: row => <span>{row.available ? row.available : ""}</span>,
        },
        {
          name: this.props.t("Quantity To Be Added"),
          selector: "quantityToBeAdded",
          sortable: false,
          cell: row => (
            <span>{row.quantityToBeAdded ? row.quantityToBeAdded : ""}</span>
          ),
        },
        {
          name: this.props.t("Total"),
          selector: "total",
          sortable: false,
          cell: row => <span>{row.total ? row.total : ""}</span>,
        },
      ],
    }
  }

  //Master Data paymentBY
  getAllVendor() {
    CallService(
      //vendor.ForAdmin,
      MethodType.POST,
      false,
      { pageNumber: 1, pageLimit: 10000 },
      "",
      this.getAllVendorResponse
    )
  }

  getAllVendorResponse = data => {
    if (data.result) {
      this.setState({
        vendorList: data.result.map(function (a) {
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
        Values.deliveryChallan = data.result.deliveryChallan
        this.getAllStockEntry(Values)
      }
    } else {
      toastr.error("", this.props.t("Document upload failed"))
    }
  }
//  document API

  componentDidMount() {
  }
  //handleSubmit stock Entry Start
  handleSubmitStockEntry = values => {
    console.log(values)
    this.setState({
      buttonAction: true,
    })
    this.manageStockEntry(values)
  }
  manageStockEntry = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageStockEntryResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      // .Create,
      MethodType.PUT,
      false,
      values,
      "",
      this.manageStockEntryResponse
    )
  }
  manageStockEntryResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(this.props.t("Stock Entry Added Successfully"))
    }
  } 
//handleSubmit stock Entry Start

//stock Entry Handle Cancel start
  handleCancelStockEntry = () => {
    toastr.success("", this.props.t("Cancel"))
  }
  //stock Entry Handle Cancel End
  
  //handle Submit Add StockEntry start
  handleSubmitAddStockEntry = values => {
    console.log(values)
    this.setState({
      buttonAction: true,
    })
    this.manageAddStockEntry(values)
  }
  manageAddStockEntry = values => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      })
      this.manageAddStockEntryResponse({ statusCode: "200" })
    }, 5000)
    CallService(
      //.create
   MethodType.PUT,
      false,
      values,
      "",
      this.manageAddStockEntryResponse
    )
  }
  manageAddStockEntryResponse = data => {
    this.setState({
      buttonAction: false,
    })

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(
        "",
     this.props.t("New Stock Added Successfully")
      )
  
    }
    this.toggleManageModal()
  }
  addBtnClick = () => {
    this.toggleManageModal()
  }
  toggleManageModal = () => {
    this.setState({
      stockEntry: {},
      manageModal: !this.state.manageModal,
    })
  }

  
  render() {
    const ADDSTOCKENTRY = this.state.addStockEntry
    const STOCKENTRY = this.state.stockEntry

    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops pb-5">
          <Card className="m-2 px-4 pt-4 mt-3 mb-5">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t("Stock Entry")}`}
              showButton={false}
              showSearch={false}
            />

            <Formik
              initialValues={STOCKENTRY}
              validationSchema={stockEntryValidation}
              onSubmit={this.handleSubmitStockEntry}
              validateOnBlur={false}
              validateOnChange={false}
            >
              {({ errors, values, setFieldValue }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <Row className="mb-10 ml-2 mr-2">
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative">
                        <Label className="requiredField ">
                          {this.props.t("Date")}
                        </Label>

                        <DatePicker
                          isClearable={true}
                          components={{ Input: CustomSelectInput }}
                          className="form-control box-border"
                          selectsStart
                          selected={this.state.date}
                          onChange={date => {
                            setFieldValue("date", date)
                            if (date)
                              this.setState({
                                date: date,
                              })
                            else
                              this.setState({
                                date: "",
                              })
                          }}
                          placeholderText={this.props.t("Select Date")}
                          dateFormat="dd/MM/yyyy"
                        />

                        {errors.date && (
                          <div className="invalid-feedback d-block">
                            {errors.date}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6}>
                      <FormGroup className="position-relative">
                      <DropDown
                          label={this.props.t("PO No")}
                          classNamePrefix="react-select"
                          className="react-select"
                          name="poNo"
                          isSearchable
                          options={this.state.poNo}
                         
                          placeholderText={this.props.t("Please Select")}
                          Checkbox={false}
                          Action={e => {
                            setFieldValue("poNo", e.value)
                          }}
                        />
                        {errors.poNo&& (
                          <div className="invalid-feedback d-block pl-1">
                            {errors.poNo}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6} className="pl-4">
                      <FormGroup className="position-relative">
                        <DropDown
                          label={this.props.t("Vendor")}
                          classNamePrefix="react-select"
                          className="react-select"
                          name="vendor"
                          isSearchable
                          options={this.state.vendor}
                          //options={this.state.vendorList} // master data
                          placeholderText={this.props.t("Please Select")}
                          Checkbox={false}
                          Action={e => {
                            setFieldValue("vendor", e.value)
                          }}
                        />
                        {errors.vendor && (
                          <div className="invalid-feedback d-block pl-1">
                            {errors.vendor}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg={6}>
                      <FormGroup className="position-relative">
                        <Label className="requiredField ">
                          {this.props.t("Delivery On")}
                        </Label>

                        <DatePicker
                          isClearable={true}
                          components={{ Input: CustomSelectInput }}
                          className="form-control box-border"
                          selectsStart
                          selected={this.state.deliveryOn}
                          onChange={date => {
                            setFieldValue("deliveryOn", date)
                            if (date)
                              this.setState({
                                deliveryOn: date,
                              })
                            else
                              this.setState({
                                deliveryOn: "",
                              })
                          }}
                          placeholderText={this.props.t("Select Date")}
                          dateFormat="dd/MM/yyyy"
                        />

                        {errors.deliveryOn && (
                          <div className="invalid-feedback d-block">
                            {errors.deliveryOn}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <div   className="mb-3">                  <ListPageHeader
                    heading=""
                    buttonClick={this.addBtnClick}
                    showSearch={false}
                  
                  />
</div>

                  <ListPage
                    columns={this.state.columns}
                    data={this.state.data}
                    keyField={this.state.keyField}
                    totalCount={this.state.totalCount}
             
                    isDataLoading={this.state.isLoading}
                    overFlowXRemoval={true}
                  />
                   <Row className="mb-10 ml-4 mt-4 mr-2">
                    <Col xs="6" sm="6" md="6" lg={6} className="mb-5">
                      <FormGroup className="position-relative">
                        <Label className="required-field">
                          {this.props.t("Delivery Challan")}
                        </Label>
                        <CustomInput
                          className="position-sticky"
                          key={"imageUrl"}
                          type="file"
                          name={"deliveryChallan"}
                          onChange={event => {
                            setFieldValue(
                              "deliveryChallan",
                              event.target.files[0]
                            )
                          }}
                        />

                        {errors.deliveryChallan ? (
                          <div className="invalid-feedback d-block">
                            {errors.deliveryChallan}
                          </div>
                        ) : null}
                        <p className="text-semi-muted">
                          {this.props.t("Allowed formats are jpg, jpeg and png")}
                          <br />
                          {this.props.t("File Size Must be Less Than 5 Mb")}
                        </p>
                      </FormGroup>
                    </Col>
                  </Row>

                  <ModalFooter>
                    <div className="float-right mt-1">
                      <Button
                        type="submit"
                        color="primary"
                        className={this.state.buttonAction ? "disabled" : ""}
                      >
                        {this.props.t("Save")}
                      </Button>

                      <Button
                        color="danger"
                        className="ml-1"
                        onClick={this.handleCancelStockEntry}
                      >
                        {this.props.t("Cancel")}
                      </Button>
                    </div>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </Card>
        </Container>

        <Modal isOpen={this.state.manageModal} toggle={this.toggleManageModal}>
          <ModalHeader toggle={this.toggleManageModal}>
            {this.props.t("Add Stock Entry")}
          </ModalHeader>
          <Formik
            initialValues={ADDSTOCKENTRY}
            validationSchema={addStockEntryValidation}
            onSubmit={this.handleSubmitAddStockEntry}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ errors, values, setFieldValue }) => (
              <Form className="av-tooltip tooltip-label-bottom">
                <ModalBody>
                  <Row className="mb-10 ml-2 mr-2">
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <FormGroup className="position-relative">
                        <Label className="requiredField mt-1">
                          {this.props.t("Item")}
                        </Label>
                        <Field
                          className="form-control"
                          name="item"
                          type="text"
                        />
                        {errors.item && (
                          <div className="invalid-feedback d-block">
                            {errors.item}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <FormGroup className="position-relative">
                        <Label className="requiredField mt-1">
                          {this.props.t("Available")}
                        </Label>
                        <Field
                          className="form-control"
                          name="available"
                          type="text"
                        />
                        {errors.available && (
                          <div className="invalid-feedback d-block">
                            {errors.available}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <FormGroup className="position-relative">
                        <Label className="requiredField mt-1">
                          {this.props.t("Quantity To Be Added")}
                        </Label>
                        <Field
                          className="form-control"
                          name="quantityToBeAdded"
                          type="number"
                        />
                        {errors.quantityToBeAdded && (
                          <div className="invalid-feedback d-block">
                            {errors.quantityToBeAdded}
                          </div>
                        )}
                      </FormGroup>
                    </Col>

                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <FormGroup className="position-relative">
                        <Label className="requiredField mt-1">
                          {this.props.t("Total")}
                        </Label>
                        <Field
                          className="form-control"
                          name="total"
                          type="text"
                        />
                        {errors.total && (
                          <div className="invalid-feedback d-block">
                            {errors.total}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                </ModalBody>

                <ModalFooter>
                  <FormGroup className="float-sm-right">
                    <Button
                      className={this.state.buttonAction ? "disabled" : ""}
                      type="submit"
                      color="primary"
                    >
                      {this.props.t("Save")}
                    </Button>

                    <Button
                      onClick={() => {
                        this.toggleManageModal()
                      }}
                      color="danger"
                      className="mr-3 ml-1"
                    >
                      {this.props.t("Cancel")}
                    </Button>
                  </FormGroup>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </Modal>
      </Fragment>
    )
  }
}

export default withTranslation()(StockEntry)
