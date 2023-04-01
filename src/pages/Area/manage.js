/**START OF GENERATED CODE**/
import React, { Component, Fragment } from "react"
import { NavLink } from "react-router-dom"
import produce from "immer"
import {
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  Col,
  Row,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Card,
  CardBody,
  Table,
  Container,
} from "reactstrap"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline"
import EditIcon from "@material-ui/icons/Edit"
import { Formik, Form, Field } from "formik"

import { AvForm } from "availity-reactstrap-validation"
import { ManageAreaValidation } from "../../helpers/validations"

import { withTranslation } from "react-i18next"
//import "react-md/dist/react-md.indigo-purple.min.css";
import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
// import { area, level } from "../../../../constants/config"
import CloudUploadIcon from "@material-ui/icons/CloudUpload"
import { INVALID_CHARS } from "../../helpers/utils"
//var splitedLevel = [];
//var levelResponse = {};
class AreaManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      LevelName: "",
      mapDepartmentModalName: "",
      Depatrtmentmodal: false,
      BulkArea: null,
      BulkData: [],
      BreadcrumbData: [],
      AreaName: "",
      dropdownBasicOpen: false,
      levels: [],
      areaIdDepartmentMapping: null,
      Parentarea: {
        Name: "",
        Level: {
          Name: "",
        },
      },
      DistrictDetail: {
        Name: "",
        Level: {
          Name: "",
        },
      },
      DeleteModal: false,
      area: {
        Name: "",
        Level: null,
        ParentArea: null,
        AreaType: null,
      },
      modal: false,
      Bulkmodal: false,
      ListRequestModel: {
        pageNumber: 1,
        pageLimit: 999999,
      },
      QueryString: {
        areaid: null,
      },
      AreaByLevelList: [],
      AreaUnmappedLevelList: [],
      AreaTypes: [],
      deleteArea: {
        Name: "",
        Level: {
          Name: "",
        },
      },
    }
    this.toggle = this.toggle.bind(this)
    this.toggleBulk = this.toggleBulk.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleBulkSubmit = this.handleBulkSubmit.bind(this)
    this.toggleDelete = this.toggleDelete.bind(this)
  }
  toggleBasic = () => {
    this.setState(prevState => ({
      dropdownBasicOpen: !prevState.dropdownBasicOpen,
    }))
  }
  getChildAreaList = area => {
    this.setState(prevState => ({
      QueryString: { ...prevState.QueryString, parentarea: area._id },
    }))
    this.props.history.push(
      "/areamanage/" + area._id + "/" + this.state.QueryString.areaid
    )
  }
  GetAreaList() {
    let res = {
      result: [
        {
          Level: {
            Name: "Union",
            Code: 4,
            Depth: 2,
            OrderNumber: 3,
            IsDeleted: false,
            _id: "5fb8dc66e160760d5f9bc663",
            ParentLevel: "5fb8da14e160760d5f9bc660",
            IsDeletable: true,
            createdAt: "2020-11-21T10:09:43.405Z",
            updatedAt: "2020-11-22T04:39:01.496Z",
            id: "5fb8dc66e160760d5f9bc663",
          },
          Areas: [
            {
              Name: "KADAYANALLUR",
              Level: {
                Name: "Union",
                Code: 4,
                Depth: 2,
                OrderNumber: 3,
                IsDeleted: false,
                _id: "5fb8dc66e160760d5f9bc663",
                ParentLevel: "5fb8da14e160760d5f9bc660",
                IsDeletable: true,
                createdAt: "2020-11-21T10:09:43.405Z",
                updatedAt: "2020-11-22T04:39:01.496Z",
                id: "5fb8dc66e160760d5f9bc663",
              },
              ParentArea: "5fb8ecd01ec5c640fd94fe47",
              MainArea: "5fb8ecd01ec5c640fd94fe47",
              AreaType: null,
              ShortCode: null,
              IsDeleted: false,
              _id: "5fb8f362cdb051436b1251d5",
              createdAt: "2020-11-21T11:00:50.875Z",
              updatedAt: "2020-11-21T11:00:50.875Z",
              __v: 0,
              ParentLevel: "$MainLevel",
              id: "5fb8f362cdb051436b1251d5",
            },
            {
              Name: "KEELAPAVOOR",
              Level: {
                Name: "Union",
                Code: 4,
                Depth: 2,
                OrderNumber: 3,
                IsDeleted: false,
                _id: "5fb8dc66e160760d5f9bc663",
                ParentLevel: "5fb8da14e160760d5f9bc660",
                IsDeletable: true,
                createdAt: "2020-11-21T10:09:43.405Z",
                updatedAt: "2020-11-22T04:39:01.496Z",
                id: "5fb8dc66e160760d5f9bc663",
              },
              ParentArea: "5fb8ecd01ec5c640fd94fe47",
              MainArea: "5fb8ecd01ec5c640fd94fe47",
              AreaType: null,
              ShortCode: null,
              IsDeleted: false,
              _id: "5fb8f362cdb051436b1251d3",
              createdAt: "2020-11-21T11:00:50.346Z",
              updatedAt: "2020-11-21T11:00:50.346Z",
              __v: 0,
              ParentLevel: "$MainLevel",
              id: "5fb8f362cdb051436b1251d3",
            },
            {
              Name: "KURUVIKULAM",
              Level: {
                Name: "Union",
                Code: 4,
                Depth: 2,
                OrderNumber: 3,
                IsDeleted: false,
                _id: "5fb8dc66e160760d5f9bc663",
                ParentLevel: "5fb8da14e160760d5f9bc660",
                IsDeletable: true,
                createdAt: "2020-11-21T10:09:43.405Z",
                updatedAt: "2020-11-22T04:39:01.496Z",
                id: "5fb8dc66e160760d5f9bc663",
              },
              ParentArea: "5fb8ecd01ec5c640fd94fe47",
              MainArea: "5fb8ecd01ec5c640fd94fe47",
              AreaType: null,
              ShortCode: null,
              IsDeleted: false,
              _id: "5fb8f35ccdb051436b1251bd",
              createdAt: "2020-11-21T11:00:44.261Z",
              updatedAt: "2020-11-21T11:00:44.261Z",
              __v: 0,
              ParentLevel: "$MainLevel",
              id: "5fb8f35ccdb051436b1251bd",
            },
            {
              Name: "MELANEELITHANALLUR",
              Level: {
                Name: "Union",
                Code: 4,
                Depth: 2,
                OrderNumber: 3,
                IsDeleted: false,
                _id: "5fb8dc66e160760d5f9bc663",
                ParentLevel: "5fb8da14e160760d5f9bc660",
                IsDeletable: true,
                createdAt: "2020-11-21T10:09:43.405Z",
                updatedAt: "2020-11-22T04:39:01.496Z",
                id: "5fb8dc66e160760d5f9bc663",
              },
              ParentArea: "5fb8ecd01ec5c640fd94fe47",
              MainArea: "5fb8ecd01ec5c640fd94fe47",
              AreaType: null,
              ShortCode: null,
              IsDeleted: false,
              _id: "5fb8f35bcdb051436b1251bb",
              createdAt: "2020-11-21T11:00:43.733Z",
              updatedAt: "2020-11-21T11:00:43.733Z",
              __v: 0,
              ParentLevel: "$MainLevel",
              id: "5fb8f35bcdb051436b1251bb",
            },
            {
              Name: "SANKARANKOIL",
              Level: {
                Name: "Union",
                Code: 4,
                Depth: 2,
                OrderNumber: 3,
                IsDeleted: false,
                _id: "5fb8dc66e160760d5f9bc663",
                ParentLevel: "5fb8da14e160760d5f9bc660",
                IsDeletable: true,
                createdAt: "2020-11-21T10:09:43.405Z",
                updatedAt: "2020-11-22T04:39:01.496Z",
                id: "5fb8dc66e160760d5f9bc663",
              },
              ParentArea: "5fb8ecd01ec5c640fd94fe47",
              MainArea: "5fb8ecd01ec5c640fd94fe47",
              AreaType: null,
              ShortCode: null,
              IsDeleted: false,
              _id: "5fb8f35ccdb051436b1251bf",
              createdAt: "2020-11-21T11:00:44.832Z",
              updatedAt: "2020-11-21T11:00:44.832Z",
              __v: 0,
              ParentLevel: "$MainLevel",
              id: "5fb8f35ccdb051436b1251bf",
            },
            {
              Name: "SHENCOTTAI",
              Level: {
                Name: "Union",
                Code: 4,
                Depth: 2,
                OrderNumber: 3,
                IsDeleted: false,
                _id: "5fb8dc66e160760d5f9bc663",
                ParentLevel: "5fb8da14e160760d5f9bc660",
                IsDeletable: true,
                createdAt: "2020-11-21T10:09:43.405Z",
                updatedAt: "2020-11-22T04:39:01.496Z",
                id: "5fb8dc66e160760d5f9bc663",
              },
              ParentArea: "5fb8ecd01ec5c640fd94fe47",
              MainArea: "5fb8ecd01ec5c640fd94fe47",
              AreaType: null,
              ShortCode: null,
              IsDeleted: false,
              _id: "5fb8f363cdb051436b1251d7",
              createdAt: "2020-11-21T11:00:51.571Z",
              updatedAt: "2020-11-21T11:00:51.571Z",
              __v: 0,
              ParentLevel: "$MainLevel",
              id: "5fb8f363cdb051436b1251d7",
            },
            {
              Name: "TENKASI",
              Level: {
                Name: "Union",
                Code: 4,
                Depth: 2,
                OrderNumber: 3,
                IsDeleted: false,
                _id: "5fb8dc66e160760d5f9bc663",
                ParentLevel: "5fb8da14e160760d5f9bc660",
                IsDeletable: true,
                createdAt: "2020-11-21T10:09:43.405Z",
                updatedAt: "2020-11-22T04:39:01.496Z",
                id: "5fb8dc66e160760d5f9bc663",
              },
              ParentArea: "5fb8ecd01ec5c640fd94fe47",
              MainArea: "5fb8ecd01ec5c640fd94fe47",
              AreaType: null,
              ShortCode: null,
              IsDeleted: false,
              _id: "5fb8f364cdb051436b1251d9",
              createdAt: "2020-11-21T11:00:52.113Z",
              updatedAt: "2020-11-21T11:00:52.113Z",
              __v: 0,
              ParentLevel: "$MainLevel",
              id: "5fb8f364cdb051436b1251d9",
            },
            {
              Name: "VASUDEVANALLUR",
              Level: {
                Name: "Union",
                Code: 4,
                Depth: 2,
                OrderNumber: 3,
                IsDeleted: false,
                _id: "5fb8dc66e160760d5f9bc663",
                ParentLevel: "5fb8da14e160760d5f9bc660",
                IsDeletable: true,
                createdAt: "2020-11-21T10:09:43.405Z",
                updatedAt: "2020-11-22T04:39:01.496Z",
                id: "5fb8dc66e160760d5f9bc663",
              },
              ParentArea: "5fb8ecd01ec5c640fd94fe47",
              MainArea: "5fb8ecd01ec5c640fd94fe47",
              AreaType: null,
              ShortCode: null,
              IsDeleted: false,
              _id: "5fb8f364cdb051436b1251db",
              createdAt: "2020-11-21T11:00:52.610Z",
              updatedAt: "2020-11-21T11:00:52.610Z",
              __v: 0,
              ParentLevel: "$MainLevel",
              id: "5fb8f364cdb051436b1251db",
            },
          ],
        },
      ],
      exception: null,
      pagination: null,
      stringResult: "",
      statusCode: "200",
      errors: [],
      warnings: [],
    }
    this.GetAreaListResponse(res)
    CallService(
      //   area.Areanextlevels + this.state.QueryString.parentarea,
      MethodType.GET,
      false,
      "",
      "",
      this.GetAreaListResponse
    )
  }
  GetAreaListResponse = data => {
    // var result = [];
    if (data.statusCode === StatusCodes.Success) {
      if (data.result.length > 0) {
        for (var i = 0; i < data.result.length; i++) {
          data.result[i].Level.IsAdministratorHeaderHover = false
          for (var j = 0; j < data.result[i].Areas.length; j++) {
            data.result[i].Areas[j].IsAdministratorHover = false
          }
        }
      }
      this.setState({ AreaByLevelList: data.result })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.match.params.parentarea !== prevProps.match.params.parentarea
    ) {
      this.setState({ QueryString: this.props.match.params }, () => {
        this.GetAreaList()

        this.GetParentarea(this.state.QueryString.parentarea)
        this.getAreaDetail(this.state.QueryString.parentarea)
      })
      // or any other logic..
    }
  }

  /**Handle Page Mount Start**/

  componentDidMount() {
    //this.state.QueryString = this.props.match.params;
    this.setState({ QueryString: this.props.match.params }, () => {
      if (this.state.QueryString) {
        this.getAllLevels()
        this.GetAreaList()
        this.GetParentarea(this.state.QueryString.parentarea)
        this.getAreaDetail(this.state.QueryString.parentarea)
        this.getDistrictDetail(this.state.QueryString.areaid)
      }
    })
  }
  getDistrictDetail(id) {
    let res = {
      result: [
        {
          Level: {
            Name: "Union",
            Code: 4,
            Depth: 2,
            OrderNumber: 3,
            IsDeleted: false,
            _id: "5fb8dc66e160760d5f9bc663",
            ParentLevel: "5fb8da14e160760d5f9bc660",
            IsDeletable: true,
            createdAt: "2020-11-21T10:09:43.405Z",
            updatedAt: "2020-11-22T04:39:01.496Z",
            id: "5fb8dc66e160760d5f9bc663",
          },
          Areas: [
            {
              Name: "KADAYANALLUR",
              Level: {
                Name: "Union",
                Code: 4,
                Depth: 2,
                OrderNumber: 3,
                IsDeleted: false,
                _id: "5fb8dc66e160760d5f9bc663",
                ParentLevel: "5fb8da14e160760d5f9bc660",
                IsDeletable: true,
                createdAt: "2020-11-21T10:09:43.405Z",
                updatedAt: "2020-11-22T04:39:01.496Z",
                id: "5fb8dc66e160760d5f9bc663",
              },
              ParentArea: "5fb8ecd01ec5c640fd94fe47",
              MainArea: "5fb8ecd01ec5c640fd94fe47",
              AreaType: null,
              ShortCode: null,
              IsDeleted: false,
              _id: "5fb8f362cdb051436b1251d5",
              createdAt: "2020-11-21T11:00:50.875Z",
              updatedAt: "2020-11-21T11:00:50.875Z",
              __v: 0,
              ParentLevel: "$MainLevel",
              id: "5fb8f362cdb051436b1251d5",
            },
            {
              Name: "KEELAPAVOOR",
              Level: {
                Name: "Union",
                Code: 4,
                Depth: 2,
                OrderNumber: 3,
                IsDeleted: false,
                _id: "5fb8dc66e160760d5f9bc663",
                ParentLevel: "5fb8da14e160760d5f9bc660",
                IsDeletable: true,
                createdAt: "2020-11-21T10:09:43.405Z",
                updatedAt: "2020-11-22T04:39:01.496Z",
                id: "5fb8dc66e160760d5f9bc663",
              },
              ParentArea: "5fb8ecd01ec5c640fd94fe47",
              MainArea: "5fb8ecd01ec5c640fd94fe47",
              AreaType: null,
              ShortCode: null,
              IsDeleted: false,
              _id: "5fb8f362cdb051436b1251d3",
              createdAt: "2020-11-21T11:00:50.346Z",
              updatedAt: "2020-11-21T11:00:50.346Z",
              __v: 0,
              ParentLevel: "$MainLevel",
              id: "5fb8f362cdb051436b1251d3",
            },
            {
              Name: "KURUVIKULAM",
              Level: {
                Name: "Union",
                Code: 4,
                Depth: 2,
                OrderNumber: 3,
                IsDeleted: false,
                _id: "5fb8dc66e160760d5f9bc663",
                ParentLevel: "5fb8da14e160760d5f9bc660",
                IsDeletable: true,
                createdAt: "2020-11-21T10:09:43.405Z",
                updatedAt: "2020-11-22T04:39:01.496Z",
                id: "5fb8dc66e160760d5f9bc663",
              },
              ParentArea: "5fb8ecd01ec5c640fd94fe47",
              MainArea: "5fb8ecd01ec5c640fd94fe47",
              AreaType: null,
              ShortCode: null,
              IsDeleted: false,
              _id: "5fb8f35ccdb051436b1251bd",
              createdAt: "2020-11-21T11:00:44.261Z",
              updatedAt: "2020-11-21T11:00:44.261Z",
              __v: 0,
              ParentLevel: "$MainLevel",
              id: "5fb8f35ccdb051436b1251bd",
            },
            {
              Name: "MELANEELITHANALLUR",
              Level: {
                Name: "Union",
                Code: 4,
                Depth: 2,
                OrderNumber: 3,
                IsDeleted: false,
                _id: "5fb8dc66e160760d5f9bc663",
                ParentLevel: "5fb8da14e160760d5f9bc660",
                IsDeletable: true,
                createdAt: "2020-11-21T10:09:43.405Z",
                updatedAt: "2020-11-22T04:39:01.496Z",
                id: "5fb8dc66e160760d5f9bc663",
              },
              ParentArea: "5fb8ecd01ec5c640fd94fe47",
              MainArea: "5fb8ecd01ec5c640fd94fe47",
              AreaType: null,
              ShortCode: null,
              IsDeleted: false,
              _id: "5fb8f35bcdb051436b1251bb",
              createdAt: "2020-11-21T11:00:43.733Z",
              updatedAt: "2020-11-21T11:00:43.733Z",
              __v: 0,
              ParentLevel: "$MainLevel",
              id: "5fb8f35bcdb051436b1251bb",
            },
            {
              Name: "SANKARANKOIL",
              Level: {
                Name: "Union",
                Code: 4,
                Depth: 2,
                OrderNumber: 3,
                IsDeleted: false,
                _id: "5fb8dc66e160760d5f9bc663",
                ParentLevel: "5fb8da14e160760d5f9bc660",
                IsDeletable: true,
                createdAt: "2020-11-21T10:09:43.405Z",
                updatedAt: "2020-11-22T04:39:01.496Z",
                id: "5fb8dc66e160760d5f9bc663",
              },
              ParentArea: "5fb8ecd01ec5c640fd94fe47",
              MainArea: "5fb8ecd01ec5c640fd94fe47",
              AreaType: null,
              ShortCode: null,
              IsDeleted: false,
              _id: "5fb8f35ccdb051436b1251bf",
              createdAt: "2020-11-21T11:00:44.832Z",
              updatedAt: "2020-11-21T11:00:44.832Z",
              __v: 0,
              ParentLevel: "$MainLevel",
              id: "5fb8f35ccdb051436b1251bf",
            },
            {
              Name: "SHENCOTTAI",
              Level: {
                Name: "Union",
                Code: 4,
                Depth: 2,
                OrderNumber: 3,
                IsDeleted: false,
                _id: "5fb8dc66e160760d5f9bc663",
                ParentLevel: "5fb8da14e160760d5f9bc660",
                IsDeletable: true,
                createdAt: "2020-11-21T10:09:43.405Z",
                updatedAt: "2020-11-22T04:39:01.496Z",
                id: "5fb8dc66e160760d5f9bc663",
              },
              ParentArea: "5fb8ecd01ec5c640fd94fe47",
              MainArea: "5fb8ecd01ec5c640fd94fe47",
              AreaType: null,
              ShortCode: null,
              IsDeleted: false,
              _id: "5fb8f363cdb051436b1251d7",
              createdAt: "2020-11-21T11:00:51.571Z",
              updatedAt: "2020-11-21T11:00:51.571Z",
              __v: 0,
              ParentLevel: "$MainLevel",
              id: "5fb8f363cdb051436b1251d7",
            },
            {
              Name: "TENKASI",
              Level: {
                Name: "Union",
                Code: 4,
                Depth: 2,
                OrderNumber: 3,
                IsDeleted: false,
                _id: "5fb8dc66e160760d5f9bc663",
                ParentLevel: "5fb8da14e160760d5f9bc660",
                IsDeletable: true,
                createdAt: "2020-11-21T10:09:43.405Z",
                updatedAt: "2020-11-22T04:39:01.496Z",
                id: "5fb8dc66e160760d5f9bc663",
              },
              ParentArea: "5fb8ecd01ec5c640fd94fe47",
              MainArea: "5fb8ecd01ec5c640fd94fe47",
              AreaType: null,
              ShortCode: null,
              IsDeleted: false,
              _id: "5fb8f364cdb051436b1251d9",
              createdAt: "2020-11-21T11:00:52.113Z",
              updatedAt: "2020-11-21T11:00:52.113Z",
              __v: 0,
              ParentLevel: "$MainLevel",
              id: "5fb8f364cdb051436b1251d9",
            },
            {
              Name: "VASUDEVANALLUR",
              Level: {
                Name: "Union",
                Code: 4,
                Depth: 2,
                OrderNumber: 3,
                IsDeleted: false,
                _id: "5fb8dc66e160760d5f9bc663",
                ParentLevel: "5fb8da14e160760d5f9bc660",
                IsDeletable: true,
                createdAt: "2020-11-21T10:09:43.405Z",
                updatedAt: "2020-11-22T04:39:01.496Z",
                id: "5fb8dc66e160760d5f9bc663",
              },
              ParentArea: "5fb8ecd01ec5c640fd94fe47",
              MainArea: "5fb8ecd01ec5c640fd94fe47",
              AreaType: null,
              ShortCode: null,
              IsDeleted: false,
              _id: "5fb8f364cdb051436b1251db",
              createdAt: "2020-11-21T11:00:52.610Z",
              updatedAt: "2020-11-21T11:00:52.610Z",
              __v: 0,
              ParentLevel: "$MainLevel",
              id: "5fb8f364cdb051436b1251db",
            },
          ],
        },
      ],
      exception: null,
      pagination: null,
      stringResult: "",
      statusCode: "200",
      errors: [],
      warnings: [],
    }
    this.getDistrictDetailResponse(res)
    CallService(
      //   area.GetOne + id,
      MethodType.GET,
      false,
      "",
      "",
      this.getDistrictDetailResponse
    )
  }
  getDistrictDetailResponse = data => {
    return this.setState({
      DistrictDetail: data.result,
    })
  }
  GetParentarea(id) {
    let res = {
      result: {
        Name: "Tenkasi",
        Level: {
          Name: "District",
          Code: 1,
          Depth: 1,
          OrderNumber: 1,
          IsDeleted: false,
          _id: "5fb8da14e160760d5f9bc660",
          ParentLevel: null,
          IsDeletable: false,
          createdAt: "2020-11-21T10:09:43.398Z",
          updatedAt: "2020-11-21T10:09:43.398Z",
          id: "5fb8da14e160760d5f9bc660",
        },
        ParentArea: null,
        MainArea: null,
        AreaType: null,
        ShortCode: "TKS",
        IsDeleted: false,
        _id: "5fb8ecd01ec5c640fd94fe47",
        createdAt: "2020-11-21T10:32:48.912Z",
        updatedAt: "2020-11-21T10:32:48.912Z",
        __v: 0,
        id: "5fb8ecd01ec5c640fd94fe47",
      },
      exception: null,
      pagination: null,
      stringResult: "",
      statusCode: "200",
      errors: [],
      warnings: [],
    }
    this.GetParentareaResponse(res)
    CallService(
      //   area.GetOne + id,
      MethodType.GET,
      false,
      "",
      "",
      this.GetParentareaResponse
    )
  }
  hoveringPosting(i, j) {
    const nextState = produce(this.state.AreaByLevelList, draftState => {
      draftState[i].Level.IsAdministratorHover = false
      for (var k = 0; k < draftState[i].Areas.length; k++) {
        draftState[i].Areas[k].IsAdministratorHover = false
      }
      draftState[i].Areas[j].IsAdministratorHover = true
    })

    this.setState({
      AreaByLevelList: nextState,
    })
  }
  HeaderhoveringPosting(i) {
    const nextState = produce(this.state.AreaByLevelList, draftState => {
      draftState[i].Level.IsAdministratorHover = true
    })

    this.setState({
      AreaByLevelList: nextState,
    })
  }
  HeaderleavingPosting(i) {
    const nextState = produce(this.state.AreaByLevelList, draftState => {
      draftState[i].Level.IsAdministratorHover = false
    })

    this.setState({
      AreaByLevelList: nextState,
    })
  }
  leavingPosting(i, j) {
    const nextState = produce(this.state.AreaByLevelList, draftState => {
      for (var k = 0; k < draftState[i].Areas.length; k++) {
        draftState[i].Level.IsAdministratorHover = false
        draftState[i].Areas[k].IsAdministratorHover = false
      }
      draftState[i].Areas[j].IsAdministratorHover = false
    })

    this.setState({
      AreaByLevelList: nextState,
    })
  }
  GetParentareaResponse = data => {
    if (data.result) {
      this.setState({
        Parentarea: data.result,
      })
      this.getAllLevels(data.result.Level.Code)
    }
  }
  GetOnearea(id) {
    let res = {
      result: {
        Name: "KADAYANALLUR",
        Level: {
          Name: "Union",
          Code: 4,
          Depth: 2,
          OrderNumber: 3,
          IsDeleted: false,
          _id: "5fb8dc66e160760d5f9bc663",
          ParentLevel: "5fb8da14e160760d5f9bc660",
          IsDeletable: true,
          createdAt: "2020-11-21T10:09:43.405Z",
          updatedAt: "2020-11-22T04:39:01.496Z",
          id: "5fb8dc66e160760d5f9bc663",
        },
        ParentArea: "5fb8ecd01ec5c640fd94fe47",
        MainArea: "5fb8ecd01ec5c640fd94fe47",
        AreaType: null,
        ShortCode: null,
        IsDeleted: false,
        _id: "5fb8f362cdb051436b1251d5",
        createdAt: "2020-11-21T11:00:50.875Z",
        updatedAt: "2020-11-21T11:00:50.875Z",
        __v: 0,
        ParentLevel: "$MainLevel",
        id: "5fb8f362cdb051436b1251d5",
      },

      exception: null,
      pagination: null,
      stringResult: "",
      statusCode: "200",
      errors: [],
      warnings: [],
    }
    this.GetOneareaResponse(res)
    CallService(
      //   area.GetOne + id,
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
    if (data.result.Level.Name) {
      this.setState({
        LevelName: data.result.Level.Name,
      })
    }
    this.setState({
      modal: !this.state.modal,
    })
  }
  getAreaDetail(id) {
    let res = {
      result: [
        {
          Name: "Tenkasi",
          Level: {
            Name: "District",
            Code: 1,
            Depth: 1,
            OrderNumber: 1,
            IsDeleted: false,
            _id: "5fb8da14e160760d5f9bc660",
            ParentLevel: null,
            IsDeletable: false,
            createdAt: "2020-11-21T10:09:43.398Z",
            updatedAt: "2020-11-21T10:09:43.398Z",
            id: "5fb8da14e160760d5f9bc660",
          },
          ParentArea: null,
          MainArea: null,
          AreaType: null,
          ShortCode: "TKS",
          IsDeleted: false,
          _id: "5fb8ecd01ec5c640fd94fe47",
          createdAt: "2020-11-21T10:32:48.912Z",
          updatedAt: "2020-11-21T10:32:48.912Z",
          __v: 0,
          id: "5fb8ecd01ec5c640fd94fe47",
        },
      ],
      exception: null,
      pagination: null,
      stringResult: "",
      statusCode: "200",
      errors: [],
      warnings: [],
    }
    this.getAreaDetailResponse(res)
    CallService(
      //   area.GetPopulatedAreaDetail + id,
      MethodType.GET,
      false,
      "",
      "",
      this.getAreaDetailResponse
    )
  }

  getAreaDetailResponse = data => {
    this.setState({
      BreadcrumbData: [],
    })
    this.setState({
      BreadcrumbData: data.result,
    })
  }

  addLevel(level) {
    var Level = {
      Level: {},
      Areas: [],
    }
    Level.Level = level
    this.setState(prevState => ({
      AreaByLevelList: [...prevState.AreaByLevelList, Level],
    }))
    var array = [...this.state.AreaUnmappedLevelList]
    for (var i = 0; i < array.length; i++) {
      if (array[i]._id === level._id) {
        array.splice(i, 1)
      }
    }
    this.setState({ AreaUnmappedLevelList: array })
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    })
  }
  toggleBulk() {
    this.setState({
      Bulkmodal: !this.state.Bulkmodal,
    })
  }

  handleBulkSubmit(event, errors) {
    var str = this.state.area.Name
    var res = str.split("\n")
    var BulkAreaJSON = {}
    var bulkArea = []
    for (var i = 0; i < res.length; i++) {
      BulkAreaJSON.Name = res[i]
      BulkAreaJSON.Level = this.state.BulkArea.Level
      BulkAreaJSON.ParentArea = this.state.BulkArea.ParentArea
      bulkArea.push(BulkAreaJSON)
      BulkAreaJSON = {}
    }
    this.setState({
      BulkData: bulkArea,
    })
    this.bulkUploadArea()
  }
  handleSubmit(event, errors) {
    this.Managearea()
  }
  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeFirstTab: tab,
      })
    }
  }
  scrollToRef = ref => window.scrollTo(0, ref.offsetTop)
  bulkUploadArea() {
    this.bulkUploadAreaResponse({ statusCode: "200" })
    if (this.state.area._id) {
      CallService(
        // area.Update + this.state.area._id,
        MethodType.PATCH,
        false,
        this.state.BulkData,
        "",
        this.bulkUploadAreaResponse
      )
    } else {
      CallService(
        // area.BulkCreate,
        MethodType.PUT,
        false,
        this.state.BulkData,
        "",
        this.bulkUploadAreaResponse
      )
    }
  }
  bulkUploadAreaResponse = data => {
    if (data.statusCode === StatusCodes.Success) {
      this.GetAreaList()
      this.toggleBulk()
      toastr.success("", this.props.t("Area Edited Successfully"))
    } else {
      toastr.error("", this.props.t("forms.Something Went Wrong"))
    }
  }
  Managearea = () => {
    this.ManageareaResponse({ statusCode: "200" })
    if (this.state.area._id) {
      CallService(
        // area.Update + this.state.area._id,
        MethodType.PATCH,
        false,
        this.state.area,
        "",
        this.ManageareaResponse
      )
    } else {
      CallService(
        // area.Create,
        MethodType.PUT,
        false,
        this.state.area,
        "",
        this.ManageareaResponse
      )
    }
  }
  ManageareaResponse = data => {
    if (data.statusCode === StatusCodes.Success && !data.result) {
      this.GetAreaList()
      this.toggle()
      toastr.success("", this.props.t("Area Edited Successfully"))
    } else if (data.result) {
      this.GetAreaList()
      this.toggle()
      toastr.success("", this.props.t("Area Added Successfully"))
    } else {
      toastr.error("", this.props.t("Something Went Wrong"))
    }
  }
  addLevelArea = level => {
    // this.state.area = {};
    this.setState({ area: {} })
    this.setState(prevState => ({
      area: { ...prevState.area, Level: level.Level._id },
      LevelName: level.Level.Name,
    }))
    this.setState(prevState => ({
      area: {
        ...prevState.area,
        ParentArea: this.state.QueryString.parentarea,
        MainArea: this.state.QueryString.areaid,
      },
    }))
    this.toggle()
  }
  getAllLevels(id) {
    if (id) {
      let res = {
        result: [
          {
            Name: "Corporation",
            Code: 2,
            Depth: 2,
            OrderNumber: 1,
            IsDeleted: false,
            _id: "5fb8da82e160760d5f9bc661",
            ParentLevel: "5fb8da14e160760d5f9bc660",
            IsDeletable: true,
            createdAt: "2020-11-21T10:09:43.398Z",
            updatedAt: "2021-05-10T07:14:03.655Z",
            id: "5fb8da82e160760d5f9bc661",
          },
          {
            Name: "Town Panchayat",
            Code: 5,
            Depth: 2,
            OrderNumber: 2,
            IsDeleted: false,
            _id: "5fb8dc9ee160760d5f9bc664",
            ParentLevel: "5fb8da14e160760d5f9bc660",
            IsDeletable: true,
            createdAt: "2020-11-21T10:09:43.405Z",
            updatedAt: "2021-05-10T07:14:03.659Z",
            id: "5fb8dc9ee160760d5f9bc664",
          },

          {
            Name: "Municipality",
            Code: 3,
            Depth: 2,
            OrderNumber: 4,
            IsDeleted: false,
            _id: "5fb8dc06e160760d5f9bc662",
            ParentLevel: "5fb8da14e160760d5f9bc660",
            IsDeletable: true,
            createdAt: "2020-11-21T10:09:43.398Z",
            updatedAt: "2020-11-22T04:39:01.505Z",
            id: "5fb8dc06e160760d5f9bc662",
          },
          {
            Name: "GCC",
            Code: 13,
            Depth: 2,
            OrderNumber: 5,
            IsDeleted: false,
            _id: "5fb9f39bfd25389e4a841daf",
            ParentLevel: "5fb8da14e160760d5f9bc660",
            IsDeletable: true,
            createdAt: "2020-11-22T05:14:03.758Z",
            updatedAt: "2020-11-22T05:14:03.758Z",
            __v: 0,
            id: "5fb9f39bfd25389e4a841daf",
          },
        ],
        exception: null,
        pagination: null,
        stringResult: "",
        statusCode: "200",
        errors: [],
        warnings: [],
      }
      this.getAllLevelsResponse(res)
      CallService(
        // level.levelnextlevel + id,
        MethodType.GET,
        true,
        "",
        "",
        this.getAllLevelsResponse
      )
    }
  }
  addBulkLevelArea(level) {
    //  this.state.BulkArea = {};
    // this.state.area = {};
    this.setState({ area: {}, BulkArea: {} })
    this.setState(prevState => ({
      BulkArea: { ...prevState.BulkArea, Level: level.Level._id },
      LevelName: level.Level.Name,
    }))
    this.setState(prevState => ({
      BulkArea: {
        ...prevState.BulkArea,
        ParentArea: this.state.QueryString.parentarea,
        MainArea: this.state.QueryString.areaid,
      },
    }))
    this.toggleBulk()
  }
  getAllLevelsResponse = data => {
    var result = []
    this.setState({
      levels: [],
    })
    if (data.statusCode === StatusCodes.Success) {
      this.setState({
        levels: data.result,
      })
    }

    data.result.map(x => {
      let item = this.state.AreaByLevelList.filter(
        a => x._id.toString() === a.Level._id.toString()
      )
      if (!item.length) {
        return result.push(x)
      }
      return ""
    })
    this.setState({
      AreaUnmappedLevelList: result,
    })
  }
  toggleDelete = rowId => {
    if (rowId._id) {
      this.setState({
        DeleteModal: !this.state.DeleteModal,
        deleteRowId: rowId._id,
        deleteArea: rowId,
      })
    } else {
      this.setState({
        DeleteModal: !this.state.DeleteModal,
      })
    }
  }
  DeleteArea() {
    CallService(
      //   area.Delete + this.state.deleteRowId,
      MethodType.DELETE,
      true,
      "",
      "",
      this.DeleteAreaResponse
    )
  }
  DeleteAreaResponse = data => {
    toastr.success("", this.props.t("Area Delete Successfully"))
    this.toggleDelete("")
    this.GetAreaList()
  }

  render() {
    return (
      <Fragment>
        <Container fluid className=" page-content">
          <Card className=" px-4 pt-4">
            <Row>
              <Col xs="12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0 font-size-18">
                    {
                      <span>
                        {this.props.t(
                          `${this.state.Parentarea.Name} ${this.state.Parentarea.Level.Name}`
                        )}
                      </span>
                    }
                  </h4>
                  <div className="page-title-right">
                    <Breadcrumb listClassName="m-0">
                      <BreadcrumbItem>
                        <NavLink to="/dashboard">
                          {this.props.t("Home")}
                        </NavLink>
                      </BreadcrumbItem>
                      <BreadcrumbItem>
                        <NavLink to="/area">{this.props.t("Area")}</NavLink>
                      </BreadcrumbItem>
                      {this.state.BreadcrumbData.map((Breadcrumb, index) => {
                        return (
                          <BreadcrumbItem>
                            <NavLink
                              to={
                                "areamanage/" +
                                Breadcrumb._id +
                                "/" +
                                this.state.QueryString.areaid
                              }
                            >
                              {this.props.t(
                                `${Breadcrumb.Name} ${Breadcrumb.Level.Name}`
                              )}
                            </NavLink>
                          </BreadcrumbItem>
                        )
                      })}
                    </Breadcrumb>
                  </div>
                </div>
              </Col>
              <Col xs="10"></Col>
              <Col>
                {this.state.AreaUnmappedLevelList.length !== 0 ? (
                  <Dropdown
                    isOpen={this.state.dropdownBasicOpen}
                    toggle={this.toggleBasic}
                    className=""
                  >
                    <DropdownToggle caret color="primary" outline>
                      {this.props.t("Level")}
                      <div className="arrow-down" />
                    </DropdownToggle>
                    <DropdownMenu>
                      {this.state.AreaUnmappedLevelList.map(level => {
                        return (
                          <DropdownItem
                            onClick={() => this.addLevel(level)}
                            key={level._id}
                          >
                            {this.props.t(`${level.Name}`)}
                          </DropdownItem>
                        )
                      })}
                    </DropdownMenu>
                  </Dropdown>
                ) : null}
              </Col>
            </Row>{" "}
            <Row>
              <Col xs="12">
                <Card>
                  <CardBody>
                    <Row>
                      {this.state.AreaByLevelList.map((level, index) => {
                        return (
                          <Col className="mt-1" xs="6">
                            <Card>
                              <CardBody>
                                <Table>
                                  <tbody>
                                    <tr
                                      onMouseEnter={() =>
                                        this.HeaderhoveringPosting(index)
                                      }
                                      onMouseLeave={() =>
                                        this.HeaderleavingPosting(index)
                                      }
                                      key={index.toString()}
                                    >
                                      <th scope="row" className="border-0">
                                        <div className="mt-1">#</div>
                                      </th>
                                      <th
                                        scope="row"
                                        className="cursor-pointer border-0"
                                        key={level.Level._id}
                                      >
                                        <div className="mt-1">
                                          {this.props.t(`${level.Level.Name}`)}
                                        </div>
                                      </th>
                                      <th className="border-0 w-50">
                                        {level.Level.IsAdministratorHover ? (
                                          <span>
                                            <Button
                                              onClick={() =>
                                                this.addBulkLevelArea(level)
                                              }
                                              size="sm"
                                              type="submit"
                                              color="success"
                                            >
                                              <CloudUploadIcon />
                                            </Button>
                                            <Button
                                              title={level.Level.Name}
                                              className="float-right"
                                              onClick={() =>
                                                this.addLevelArea(level)
                                              }
                                              type="submit"
                                              color="success"
                                            >
                                              {this.props.t("Add")}{" "}
                                              {this.props.t(
                                                `${level.Level.Name}`
                                              )}
                                            </Button>
                                          </span>
                                        ) : null}
                                      </th>
                                    </tr>

                                    {level.Areas.map((area, i) => {
                                      return (
                                        <tr key={i.toString()}>
                                          <td>{i + 1}</td>
                                          <td
                                            onMouseEnter={() =>
                                              this.hoveringPosting(index, i)
                                            }
                                            onMouseLeave={() =>
                                              this.leavingPosting(index, i)
                                            }
                                            onClick={() =>
                                              this.getChildAreaList(area)
                                            }
                                            key={area._id}
                                            className="cursor-pointer"
                                          >
                                            {area.Name}
                                          </td>
                                          <td
                                            className="cursor-pointer"
                                            onMouseEnter={() =>
                                              this.hoveringPosting(index, i)
                                            }
                                            onMouseLeave={() =>
                                              this.leavingPosting(index, i)
                                            }
                                          >
                                            {area.IsAdministratorHover ? (
                                              <div>
                                                <div
                                                  onClick={() =>
                                                    this.toggleDelete(area)
                                                  }
                                                  color="danger"
                                                  className="float-right"
                                                >
                                                  <DeleteOutlineIcon />
                                                </div>
                                                <div
                                                  onClick={() =>
                                                    this.GetOnearea(area._id)
                                                  }
                                                  className="float-right"
                                                >
                                                  <EditIcon />
                                                </div>
                                              </div>
                                            ) : null}
                                          </td>
                                        </tr>
                                      )
                                    })}
                                  </tbody>
                                </Table>
                              </CardBody>
                            </Card>
                          </Col>
                        )
                      })}
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Card>{" "}
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>
              {this.state.BreadcrumbData.map((Breadcrumb, index) => {
                return this.props.t(
                  `${Breadcrumb.Name} ${Breadcrumb.Level.Name}`
                )
              })}{" "}
              <span>
                {this.props.t(
                  `${this.state.Parentarea.Name} ${this.state.Parentarea.Level.Name}`
                )}
              </span>
            </ModalHeader>

            <Formik
              initialValues={this.state.area}
              onSubmit={this.handleSubmit}
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={ManageAreaValidation}
            >
              {({ setFieldValue, values, errors }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <ModalBody>
                    <Row>
                      <Col sm="12" hidden={false}>
                        <FormGroup>
                          <Label className="requiredField">
                            {this.props.t(`${this.state.LevelName}`)}{" "}
                            {this.props.t("Name")}
                          </Label>
                          <Field
                            className="form-control"
                            type="text"
                            name="Name"
                            value={this.state.area.Name}
                            onKeyPress={event => {
                              if (INVALID_CHARS.includes(event.key)) {
                                event.preventDefault()
                              }
                            }}
                            onChange={({ target }) => {
                              setFieldValue("name", target.value)
                              this.setState(prevState => ({
                                area: {
                                  ...prevState.area,
                                  Name: target !== null ? target.value : "",
                                },
                              }))
                            }}
                          />

                          {errors.name && (
                            <div className="invalid-feedback d-block">
                              {errors.name}
                            </div>
                          )}
                        </FormGroup>
                      </Col>{" "}
                      <Col
                        key="5da6b59f760b2d0e7fd764c1"
                        sm="12"
                        hidden={false}
                      ></Col>
                    </Row>
                  </ModalBody>

                  <ModalFooter>
                    <FormGroup className="float-sm-right">
                      <Button type="submit" outline color="primary">
                        {this.props.t("Save")}
                      </Button>
                      <Button
                        className="form-second-btn ml-2"
                        color="danger"
                        onClick={this.toggle}
                      >
                        {this.props.t("Cancel")}
                      </Button>
                    </FormGroup>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </Modal>
          <Modal isOpen={this.state.Bulkmodal} toggle={this.toggleBulk}>
            <ModalHeader toggle={this.toggleBulk}>
              {this.state.BreadcrumbData.map((Breadcrumb, index) => {
                return this.props.t(
                  `${Breadcrumb.Name} ${Breadcrumb.Level.Name}`
                )
              })}{" "}
              <span>
                {this.props.t(
                  `${this.state.Parentarea.Name} ${this.state.Parentarea.Level.Name}`
                )}
              </span>
            </ModalHeader>

            <Formik
              initialValues={this.state.area}
              onSubmit={this.handleBulkSubmit}
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={ManageAreaValidation}
            >
              {({ setFieldValue, values, errors }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <ModalBody>
                    <Fragment>
                      <Row>
                        <Col sm="12" hidden={false}>
                          <FormGroup>
                            <Label className="requiredField">
                              {this.props.t(`${this.state.LevelName}`)}{" "}
                              {this.props.t("Name")}
                            </Label>
                            <Field
                              className="form-control"
                              component="textarea"
                              type="text"
                              name="name"
                              value={this.state.area.Name}
                              onChange={({ target }) => {
                                setFieldValue("name", target.value)
                                this.setState(prevState => ({
                                  area: {
                                    ...prevState.area,
                                    Name: target !== null ? target.value : "",
                                  },
                                }))
                              }}
                            ></Field>

                            {errors.name && (
                              <div className="invalid-feedback d-block">
                                {errors.name}
                              </div>
                            )}
                          </FormGroup>
                        </Col>{" "}
                      </Row>
                    </Fragment>
                  </ModalBody>

                  <ModalFooter>
                    <FormGroup className="float-sm-right">
                      <Button type="submit" outline color="primary">
                        {this.props.t("Save")}
                      </Button>
                      <Button
                        className="form-second-btn ml-2"
                        color="danger"
                        onClick={this.toggleBulk}
                      >
                        {this.props.t("Cancel")}
                      </Button>
                    </FormGroup>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </Modal>
          <Modal
            size="lg"
            isOpen={this.state.DeleteModal}
            toggle={this.toggleDelete}
          >
            <ModalHeader toggle={this.toggleDelete}>
              {this.props.t("Remove Area")}
            </ModalHeader>

            <AvForm>
              <ModalBody>
                <Label className="av-label">
                  <br></br>
                  <h5>
                    {this.props.t("Are you sure you want to remove this ")}
                    {this.state.deleteArea.Name}{" "}
                    {this.state.deleteArea.Level.Name}?
                  </h5>
                </Label>
              </ModalBody>
              <ModalFooter>
                <FormGroup className="float-sm-right">
                  <Button
                    type="submit"
                    color="primary"
                    onClick={() => this.DeleteArea(this.state.deleteRowId)}
                  >
                    {this.props.t("Yes")}
                  </Button>
                  <Button
                    className="ml-2"
                    color="danger"
                    onClick={() => this.toggleDelete("")}
                  >
                    {this.props.t("No")}
                  </Button>
                </FormGroup>
              </ModalFooter>
            </AvForm>
          </Modal>
        </Container>
      </Fragment>
    )
  }
  /**Handle Render End**/
}
export default withTranslation()(AreaManage)

/**END OF GENERATED CODE**/
