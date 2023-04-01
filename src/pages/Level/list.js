import React, { Component, Fragment } from "react"
import {
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  Row,
  Card,
  Col,
  FormGroup,
  ModalFooter,
  Button,
  Container,
} from "reactstrap"
import { Formik, Form, Field } from "formik"
import { withTranslation } from "react-i18next"
import ListPageHeader from "components/custom/ListPageHeader"
import AvForm from "availity-reactstrap-validation/lib/AvForm"
import { LevelValidation } from "../../helpers/validations"
import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import SortableTree, { toggleExpandedForAll } from "react-sortable-tree"
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline"
import EditIcon from "@material-ui/icons/Edit"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"
var treeDataRef = []

class Level extends Component {
  constructor(props) {
    super(props)
    this.state = {
      LevelId: null,
      Depatrtmentmodal: false,
      modalSmall: false,
      levelsList: [],
      levels: [],
      levelsTreeList: [],
      level: {
        Depth: null,
        Name: "",
        OrderNumber: null,
        ParentLevel: null,
        TamilName: "",
      },
      deleteRowInfo: "",
      newLevelName: null,
      question: {
        Text,
      },
      treeData: [],
      i: "",

      LevelNode: {
        Name: "",
      },
      QueryString: {
        LevelId: "",
      },
      ManageHeader: "",
      HoveringNode: null,
      AllowUpadate: false,
      mapDepartmentModalName: "",
    }
  }
  toggleSmall = () => {
    this.setState({
      modalSmall: !this.state.modalSmall,
    })
  }
  toggleDelete = () => {
    this.setState({
      deletemodal: !this.state.deletemodal,
    })
  }
  componentWillMount = () => {
    this.getAllLevels()
    this.toggleNodeExpansion(true)
  }
  getAllLevels = () => {
    let res = {
      result: [
        {
          Code: 1,
          Depth: 1,
          Name: "District",
          OrderNumber: 1,
          ParentLevel: null,
          children: [
            {
              Code: 2,
              Depth: 2,
              IsDeletable: true,
              IsDeleted: false,
              Name: "Corporation",
              OrderNumber: 1,
              ParentLevel: "5fb8da14e160760d5f9bc660",
              ParentLevelDetail: {
                _id: "5fb8da14e160760d5f9bc660",
                Name: { en: "District", ta: "மாவட்டம்" },
                Code: 1,
                Depth: 1,
                IsDeletable: false,
                IsDeleted: false,
                ParentLevel: null,
              },
              children: [],
              recursionDepth: 0,
              _id: "5fb8da82e160760d5f9bc661",
            },
            {
              _id: "5fb8dc9ee160760d5f9bc664",
              Name: "Town Panchayat",
              Code: 5,
              Depth: 2,
              OrderNumber: 2,
              IsDeletable: true,
              IsDeleted: false,
              ParentLevel: "5fb8da14e160760d5f9bc660",
              ParentLevelDetail: {
                _id: "5fb8da14e160760d5f9bc660",
                Name: { en: "District", ta: "மாவட்டம்" },
                Code: 1,
                Depth: 1,
                IsDeletable: false,
                IsDeleted: false,
                ParentLevel: null,
              },
              children: [],
              recursionDepth: 0,
            },
            {
              _id: "5fb8dc66e160760d5f9bc663",
              Name: "Union",
              Code: 4,
              Depth: 2,
              OrderNumber: 3,
              IsDeletable: true,
              IsDeleted: false,
              ParentLevel: "5fb8da14e160760d5f9bc660",
              ParentLevelDetail: {
                _id: "5fb8da14e160760d5f9bc660",
                Name: { en: "District", ta: "மாவட்டம்" },
                Code: 1,
                Depth: 1,
                IsDeletable: false,
                IsDeleted: false,
                ParentLevel: null,
              },
              children: [
                {
                  Code: 6,
                  Depth: 3,
                  IsDeletable: true,
                  IsDeleted: false,
                  Name: "Village Panchayat",
                  OrderNumber: 1,
                  ParentLevel: "5fb8dc66e160760d5f9bc663",
                  ParentLevelDetail: {
                    Code: 4,
                    Depth: 2,
                    IsDeletable: true,
                    IsDeleted: false,
                    Name: { en: "Union", ta: "ஒன்றியம்" },
                    OrderNumber: 3,
                    ParentLevel: "5fb8da14e160760d5f9bc660",
                    _id: "5fb8dc66e160760d5f9bc663",
                  },
                  children: [],
                  recursionDepth: 1,
                  _id: "5fb8dccee160760d5f9bc665",
                },
              ],
              recursionDepth: 0,
            },
            {
              _id: "5fb8dc06e160760d5f9bc662",
              Name: "Municipality",
              Code: 3,
              Depth: 2,
              OrderNumber: 4,
              IsDeletable: true,
              IsDeleted: false,
              ParentLevel: "5fb8da14e160760d5f9bc660",
              ParentLevelDetail: {
                _id: "5fb8da14e160760d5f9bc660",
                Name: { en: "District", ta: "மாவட்டம்" },
                Code: 1,
                Depth: 1,
                IsDeletable: false,
                IsDeleted: false,
                ParentLevel: null,
              },
              children: [],
              recursionDepth: 0,
            },
            {
              _id: "5fb9f39bfd25389e4a841daf",
              Name: "GCC",
              Code: 13,
              Depth: 2,
              OrderNumber: 5,
              IsDeletable: true,
              IsDeleted: false,
              ParentLevel: "5fb8da14e160760d5f9bc660",
              ParentLevelDetail: {
                _id: "5fb8da14e160760d5f9bc660",
                Name: { en: "District", ta: "மாவட்டம்" },
                Code: 1,
                Depth: 1,
                IsDeletable: false,
                IsDeleted: false,
                ParentLevel: null,
              },
              children: [],
              recursionDepth: 0,
            },
          ],
          _id: "5fb8da14e160760d5f9bc660",
        },
      ],
      errors: [],
      exception: null,
      pagination: null,
      statusCode: "200",
      stringResult: "",
      warnings: [],
    }

    this.getAllLevelsResponse(res)
    this.toggleNodeExpansion(true)
    CallService(
      // level.GetAllLevel,
      MethodType.POST,
      false,
      "",
      "",
      this.getAllLevelsResponse
    )
  }
  getAllLevelsResponse = data => {
    if (data.statusCode === "200") {
      this.setState({
        treeData: data.result,
      })
      const entityArr = []
      const entityArrTree = []
      var RefObject = this
      RefObject.IterateHoverElement(data.result)
      this.setState({
        levelsList: entityArr,
        levelsTreeList: entityArrTree,
      })
    }
  }
  IterateHoverElement = element => {
    for (var i = 0; i < element.length; i++) {
      if (element[i].ParentLevel == null) {
      }
      element[i].IsHoverElement = true
      element[i].title = element[i].title ? element[i].title : element[i].Name
      if (element[i].children) {
        this.IterateHoverElement(element[i].children)
      }
    }
  }
  addNewLevel = () => {
    if (this.AllowUpadate) {
      this.setState(prevState => ({
        LevelNodeUpdate: {
          ...prevState.LevelNodeUpdate,
          title: this.state.question.Text,
        },
      }))
      this.setState({
        modalSmall: !this.state.modalSmall,
      })
    } else {
      if (!this.state.LevelNode.children) {
        this.setState(prevState => ({
          LevelNode: {
            ...prevState.LevelNode,
            children: [],
          },
        }))
      }
      var newChildLevel = {
        ParentLevel: this.state.LevelNode._id,
        OrderNumber: this.state.LevelNode.OrderNumber + 1,
        Depth: this.state.LevelNode.children.length,
      }
      newChildLevel.title = this.state.question.Text
      var _sections = this.state.LevelNode.children
      _sections[newChildLevel.Depth] = newChildLevel
      this.setState({
        LevelNode: {
          ...this.state.LevelNode,
          sections: _sections,
        },
      })
      this.setState({
        modalSmall: !this.state.modalSmall,
      })
      this.toggleNodeExpansion(true)
    }
    this.saveLevelManage()
  }
  toggleNodeExpansion = expanded => {
    this.setState(prevState => ({
      treeData: toggleExpandedForAll({
        treeData: prevState.treeData,
        expanded,
      }),
    }))
  }
  IterateLevels = (data, ID) => {
    var foundChildAreas = data.filter(x => x.ParentLevel === ID)
    if (ID === null) {
      var constructData = {
        title: foundChildAreas[0].Name,
        id: foundChildAreas[0]._id,
        children: [],
      }
      this.state.levelsTreeList.push(constructData)
    }
    if (foundChildAreas) {
      foundChildAreas.forEach(entity => {
        this.IterateLevels(data, entity._id)
      })
    } else {
      return this.levelsTreeList
    }
  }
  editLevel = ({ node }) => {
    this.setState(prevState => ({
      LevelNode: {
        ...prevState.LevelNode,
        Name: "",
      },
    }))
    this.setState(prevState => ({
      question: {
        ...prevState.question,
        Text: node.title,
      },
    }))

    this.AllowUpadate = true
    this.setState({
      modalSmall: !this.state.modalSmall,
      ManageHeader: this.props.t("Edit Level"),
      LevelNodeUpdate: node,
    })
  }
  addNew = ({ node }) => {
    this.setState(prevState => ({
      question: {
        ...prevState.question,
        Text: "",
      },
    }))
    this.setState({
      modalSmall: !this.state.modalSmall,
      LevelNode: node,
      ManageHeader: this.props.t("Add level under"),
    })
  }
  deleteLevel(rowInfo) {
    this.deleteRowInfo = rowInfo
    this.setState({
      deletemodal: !this.state.deletemodal,
      DeleteInformation: this.props.t(
        "Are you sure you want to remove this Level?"
      ),
    })
  }
  saveLevelManage = () => {
    var self = this
    treeDataRef = []

    this.state.treeData.forEach(function (element, key) {
      element.Name = element.Name ? element.Name : element.title
      element.Depth = key + 1
      element.OrderNumber = key + 1
      treeDataRef.push(element)
      if (element.children) {
        self.IterateChildLevels(element, key + 1)
      }
    })
    treeDataRef.forEach(element => {
      delete element.children
    })
    this.setState({ treeData: treeDataRef })
    CallService(
      // level.Update,
      MethodType.PATCH,
      false,
      treeDataRef,
      "",
      this.updateLevelResponse
    )
  }
  updateLevelResponse = data => {
    if (data.statusCode === StatusCodes.Success) {
      toastr.success("", this.props.t("Level Edited Successfully"))
    } else if (data.statusCode === StatusCodes.Error) {
      toastr.error("", this.props.t("Something Went Wrong"))
    }
    this.getAllLevels()
  }
  IterateChildLevels = (element, key) => {
    for (var i = 0; i < element.children.length; i++) {
      element.children[i].OrderNumber = i + 1
      element.children[i].Depth = key + 1
      element.children[i].Name = element.children[i].title
        ? element.children[i].title
        : element.children[i].Name
      treeDataRef.push(element.children[i])
      if (element.children[i].children)
        this.IterateChildLevels(element.children[i], key + 1)
    }
  }
  deletelevelConfirmation = () => {
    this.toggleNodeExpansion(true)
    this.setState({
      deletemodal: !this.state.deletemodal,
    })
    let { node } = this.deleteRowInfo
    CallService(
      // level.Delete + node._id,
      MethodType.DELETE,
      false,
      "",
      "",
      this.deletelevelResponse
    )
  }
  deletelevelResponse = data => {
    if (data.statusCode === StatusCodes.Success) {
      toastr.success("", this.props.t("Level Deleted Successfully"))
      this.setState({
        deletemodal: !this.state.deletemodal,
      })
      this.getAllLevels()
    } else if (data.statusCode === StatusCodes.Error) {
      toastr.error("", this.props.t("Something went Wrong"))
      this.setState({
        deletemodal: !this.state.deletemodal,
      })
      this.getAllLevels()
    }
  }
  OnDragChange = () => {
    this.saveLevelManage()
  }

  render() {
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops ">
          <Card className="m-2 px-4 pt-4 mt-3">
            <ListPageHeader
              heading={`${this.props.t("Home")}.${this.props.t("Level")}`}
              showSearch={false}
              showButton={false}
            />
            <Row className="mb-4">
              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                <div style={{ height: "450px" }}>
                  <Button
                    className="m-2"
                    outline
                    color="info"
                    onClick={this.toggleNodeExpansion.bind(this, true)}
                  >
                    {this.props.t("Expand all")}
                  </Button>
                  <Button
                    outline
                    color="success"
                    onClick={this.toggleNodeExpansion.bind(this, false)}
                  >
                    {this.props.t("Collapse all")}
                  </Button>
                  <SortableTree
                    treeData={this.state.treeData}
                    onChange={treeData => this.setState({ treeData })}
                    onMoveNode={() => this.OnDragChange()}
                    generateNodeProps={rowInfo => ({
                      buttons: [
                        <span id={rowInfo.node._id}>
                          <Button
                            className=" mr-1"
                            size="sm"
                            outline
                            color="primary"
                            onClick={() => {
                              this.addNew(rowInfo)
                            }}
                          >
                            <AddCircleOutlineIcon />
                          </Button>
                          {rowInfo.node.ParentLevel == null ? (
                            ""
                          ) : (
                            <span>
                              <span class="EditElement">
                                <Button
                                  className=" mr-1"
                                  size="sm"
                                  outline
                                  color="success"
                                  onClick={() => {
                                    this.editLevel(rowInfo)
                                  }}
                                >
                                  <EditIcon />
                                </Button>
                              </span>
                              <span class="DeleteElement">
                                <Button
                                  size="sm"
                                  outline
                                  color="danger"
                                  onClick={() => {
                                    this.deleteLevel(rowInfo)
                                  }}
                                >
                                  <DeleteOutlineIcon />
                                </Button>
                              </span>
                            </span>
                          )}
                        </span>,
                      ],
                    })}
                  />
                </div>
              </Col>
            </Row>
          </Card>
        </Container>
        <Modal isOpen={this.state.deletemodal} toggle={this.toggleDelete}>
          <ModalHeader toggle={this.toggleDelete}>
            {this.props.t("Remove Level")}
          </ModalHeader>
          <ModalBody>
            <h5>{this.state.DeleteInformation} </h5>
          </ModalBody>
          <ModalFooter>
            <FormGroup className="float-sm-right">
              <Button
                onClick={this.deletelevelConfirmation}
                type="submit"
                outline
                color="primary"
              >
                {this.props.t("Yes")}
              </Button>
              <Button
                className="ml-2"
                color="danger"
                onClick={this.toggleDelete}
              >
                {this.props.t("No")}
              </Button>
            </FormGroup>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.modalSmall} toggle={this.toggleSmall}>
          <ModalHeader toggle={this.toggleSmall}>
            {this.props.t(
              `${this.state.ManageHeader} ${this.state.LevelNode.Name}`
            )}
          </ModalHeader>
          <Fragment>
            <Formik
              initialValues={this.state.level}
              onSubmit={this.addNewLevel}
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={LevelValidation}
            >
              {({ setFieldValue, values, errors }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <Card className="border-0 rounded shadow mb-0">
                    <CardBody>
                      <Row>
                        <Col xs="12" sm="12" md="12" lg="12" xl="12">
                          <FormGroup className="position-relative">
                            <Label className="requiredField ">
                              {this.props.t("Level")}
                            </Label>
                            <Field
                              className="form-control box-border"
                              name="levelname"
                              id="levelname"
                              value={this.state.question.Text}
                              onChange={({ target }) => {
                                setFieldValue("Level", target.value),
                                  this.setState(prevState => ({
                                    question: {
                                      ...prevState.question,
                                      Text: target !== null ? target.value : "",
                                    },
                                  }))
                              }}
                              placeholder={this.props.t("Level Name")}
                            />
                            {errors.Level && (
                              <div className="invalid-feedback d-block">
                                {errors.Level}
                              </div>
                            )}
                          </FormGroup>
                        </Col>{" "}
                      </Row>
                    </CardBody>
                  </Card>
                  <ModalFooter>
                    <FormGroup className="float-right ">
                      <Button
                        className={this.state.buttonAction ? "disabled" : ""}
                        type="submit"
                        color="primary"
                      >
                        {this.props.t("Save")}
                      </Button>
                      <Button
                        className="btn singleEvent   ml-4"
                        color="danger"
                        onClick={() => this.toggleSmall()}
                      >
                        {this.props.t("Cancel")}
                      </Button>
                    </FormGroup>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </Fragment>
        </Modal>
      </Fragment>
    )
  }
}
export default withTranslation()(Level)
