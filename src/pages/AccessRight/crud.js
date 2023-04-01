import React, { Component, Fragment } from "react";
// import { Col } from "../../components/Common/CustomBootstrap";
import { Formik, Form, Field } from "formik";
import {
  Row,
  Col,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Card,
  CardBody,
} from "reactstrap";
import { CallService } from "../../helpers/servicecall"
import { MethodType, StatusCodes } from "../../constants/defaultValues";
// import {  } from "../../constants/config";
import ListPage from "../../components/custom/ListPage";
// import { QuickAccessValidation } from "../../helpers/validations";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import ListPageHeader from "../../components/custom/ListPageHeader";
import CustomSelectInput from "../../components/Common/CustomSelectInput";
import DropDown from "../../components/custom/DropDown";
import { INVALID_CHARS, INVALID_CHARS_REGEX } from "../../helpers/utils";
class Access extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonAction: false,
      isLoading: false,
      pageSizeOptions: [10, 50, 100],
      pageLimit: 10,
      totalCount: 0,
      keyField: "_id",
      QuickAccesss: [],
      ListRequestModel: {
        searchString: "",
        sortCondition: null,
        pageNumber: 1,
        pageLimit: 10,
      },
      QuickAccess: {
        Name: "",
        Description: "",
        Rank: 0,
      },
      AccesssList: [],
      columns: [],
      RoleList: [{}],
    };
  }

  componentDidMount() {
    
  }

  createCheck = (e, row, index) => {

    this.setState({
      IsCreateCheck: e.target.checked
    })
  }
  readCheck = (e) => {

    this.setState({
      IsReadCheck: e.target.checked
    })
  }
  updateCheck = (e) => {

    this.setState({
      IsUpdateCheck: e.target.checked
    })
  }
  deleteCheck = (e) => {

    this.setState({
      IsDeleteCheck: e.target.checked
    })
  }
  DocumentUploadCheck = (e) => {

    this.setState({
      IsDocumentUploadCheck: e.target.checked
    })
  }
  ApprovalProcessCheck = (e) => {

    this.setState({
      ISApprovalProcessCheckCheck: e.target.checked
    })
  }

  // GetAllAccess() {
  //   this.setState({
  //     isLoading: true,
  //   });
  //   const { ListRequestModel } = this.state;
  //   CallService(
  //     access_right.GetAll,
  //     MethodType.GET,
  //     false,
  //     ListRequestModel,
  //     "",
  //     this.GetAllAccessResponse
  //   );
  // }

  // GetAllAccessResponse = (data) => {
  //   if (data.result) {
  //     var AccessList = data.result;

  //     this.setState({
  //       AccessList: AccessList,
  //       isLoading: false,
  //     });
  //   } else
  //     this.setState({
  //       isLoading: false,
  //     });
  // };
  GetAllCaseStatus() {
    CallService(
      casestatus.GetAll,
      MethodType.GET,
      false,
      "",
      "",
      this.GetAllCaseStatusResponse
    );
  }

  GetAllCaseStatusResponse = (data) => {
    if (data.result) {
      this.setState({
        CaseStatusList: data.result.map(function (a) {
          return { value: a._id, label: a.Name };
        }),
      });
    }
  };
  GetRoleAccess(id) {
    CallService(
      role_access_right.GetAll,
      MethodType.POST,
      false,
      { Role: id },
      "",
      this.GetRoleAccessResponse
    );
  }

  GetRoleAccessResponse = (data) => {
    if (data.pagination && data.result) {

      this.setState({
        isLoading: false,
        totalPage: data.pagination.totalCount / data.pagination.pageLimit,
        RoleAccessList: data.result,
        totalCount: data.pagination.totalCount,
      });
    } else
      this.setState({
        isLoading: false,
      });
  };
  GetAllRole() {
    this.setState({
      isLoading: false,
    });

    CallService(
      roles.GetAll,
      MethodType.GET,
      false,
      "",
      "",
      this.GetAllRoleResponse
    );
  }

  GetAllRoleResponse = (data) => {
    if (data.result)
      this.setState({
        RoleList: data.result.map(function (a) {
          return { value: a._id, label: a.Name };
        }),
      });
  };
  handleSubmit = (values) => {
    values.Rank = parseInt(values.Rank);
    if (!this.state.buttonAction) {
      this.setState({
        buttonAction: true,
      });
      this.manageQuickAccess(values);
    }
  };
  handleSort = (column, sortDirection) => {
    var sortObj = {};
    sortObj[column.selector] = sortDirection === "asc" ? 1 : -1;
    this.setState(
      {
        ListRequestModel: {
          ...this.state.ListRequestModel,
          sortCondition: sortObj,
        },
      },
      function () {
        this.GetAllQuickAccess();
      }
    );
  };
  handlePerRowsChange = async (perPage) => {
    this.setState(
      {
        pageLimit: perPage,
        pageNumber: 1,
        ListRequestModel: {
          ...this.state.ListRequestModel,
          pageLimit: perPage,
          pageNumber: 1,
        },
      },
      async function () {
        this.GetAllQuickAccess();
      }
    );
  };

  HandleRowClicked = (row) => {

    if (row) {
      this.setState({
        QuickAccess: row,
        manageModal: !this.state.manageModal,
      });
    }
  };
  handlePageChange = async (page) => {
    this.setState(
      {
        pageNumber: page,
        ListRequestModel: {
          ...this.state.ListRequestModel,
          pageNumber: page,
        },
      },
      function () {
        this.GetAllQuickAccess();
      }
    );
  };
  SearchQueryChanged = (search) => {
    this.setState(
      {
        ListRequestModel: {
          ...this.state.ListRequestModel,
          searchString: search.target.value,
        },
      },
      function () {
        if (
          this.state.ListRequestModel.searchString === "" ||
          this.state.ListRequestModel.searchString.length > 2
        ) {
          this.GetAllQuickAccess();
        }
      }
    );
  };

  toggleDeleteModal = (row) => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      Access: row,
    });
  };
  addBtnClick = () => {
    this.toggleManageModal();
  };
  toggleManageModal = () => {
    this.setState({
      QuickAccess: {},
      manageModal: !this.state.manageModal,
    });
  };

  deleteAccess = (id) => {
    CallService(
      quickAccess.Delete + id,
      MethodType.DELETE,
      false,
      "",
      "",
      this.deleteAccessResponse
    );
  };

  deleteAccessResponse = (data) => {
    this.setState({
      buttonAction: false,
    });
    this.toggleDeleteModal();
    if (data.statusCode === StatusCodes.Success) {
      toastr.success("", " Access Deleted Successfully", { positionClass: 'toast-top-center' });
      this.GetAllQuickAccess();
    }
  };
  manageQuickAccess = (values) => {
    setTimeout(() => {
      this.setState({
        buttonAction: false,
      });
    }, 2000);
    CallService(
      values._id ? quickAccess.Update + values._id : quickAccess.Create,
      values._id ? MethodType.PATCH : MethodType.PUT,
      false,
      values,
      "",
      this.manageQuickAccessResponse
    );
  };
  manageQuickAccessResponse = (data) => {
    this.setState({
      buttonAction: false,
    });

    if (data.statusCode === StatusCodes.Success) {
      toastr.success(
        "",
        this.state.QuickAccess._id
          ? "Quick Access Updated Successfully"
          : "Quick Access Created Successfully",
        { positionClass: 'toast-top-center' }
      );
      this.GetAllQuickAccess();
    }
    this.toggleManageModal();
  };
  casePageRedirect = (caseFilter) => {
    this.props.history.push("/case/" + caseFilter._id);
  }
  UpdateRoleAccess = () => {
    this.setState({
      isLoading: false
    })
    var addedRoleAccess = this.state.addedRoleAccess;
    var removedRoleAccess = this.state.removedRoleAccess;
    if (addedRoleAccess) {
      addedRoleAccess.map(rl => {
        return this.RoleAccessCreate(rl);
      })
    }
    if (removedRoleAccess) {
      removedRoleAccess.map(rl => {
        return this.RoleAccessUpdate(rl);
      })
    }
    setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, 5000);
  }
  RoleAccessCreate = (RoleAccess) => {
    CallService(
      role_access_right.Create,
      MethodType.PUT,
      false,
      RoleAccess,
      "",
      this.GetRoleAccessUpdateResponse
    );
  }
  RoleAccessUpdate = (RoleAccess) => {
    if (RoleAccess)
      CallService(
        role_access_right.Update + RoleAccess,
        MethodType.PATCH,
        false,
        {},
        "",
        this.GetRoleAccessUpdateResponse
      );
  }
  GetRoleAccessUpdateResponse = (data) => {
  }
  render() {
    const initialValues = this.state.QuickAccess;
    const { AccessList } = this.state;
    var columns = this.state.columns;
    columns = [{
      name: "Module",
      selector: "module",
      sortable: false,
      cell: (row) => <span className={"title"}>{row ? row.Module : ""}</span>,
    }];
    AccessList && AccessList.map(al => {
      return columns.findIndex(c => c.name === al.Access) === -1 && columns.push({
        name: al.Access,
        selector: al.Access,
        sortable: false,
        cell: (row, index) => {
          var currentAccess = this.state.AccessList.find(acl => acl.Module === row.Module && acl.Access === al.Access);
          return currentAccess && <div className=" custom-checkbox custom-control-right" >
            <input
              type="checkbox"
              checked={this.state.RoleAccessList && this.state.RoleAccessList.findIndex(rl => rl.Role === this.state.SelectedRole && rl.AccessRight === currentAccess._id) !== -1}
              onChange={(e) => {
                if (this.state.SelectedRole) {
                  var role_access_right = this.state.RoleAccessList;
                  var position = role_access_right.findIndex(rl => rl.Role === this.state.SelectedRole && rl.AccessRight === currentAccess._id);
                  if (e.target.checked) {
                    if (!role_access_right) {
                      role_access_right = [];
                    }
                    var addedRoleAccess = this.state.addedRoleAccess;
                    if (!addedRoleAccess) {
                      addedRoleAccess = [];
                    }
                    if (position === -1)
                      addedRoleAccess.push({ Role: this.state.SelectedRole, AccessRight: currentAccess._id });
                    role_access_right.push({ Role: this.state.SelectedRole, AccessRight: currentAccess._id });
                    this.setState({ RoleAccessList: role_access_right, addedRoleAccess: addedRoleAccess });
                  }
                  else {
                    if (!role_access_right) {
                      role_access_right = [];
                    }
                    var removedRoleAccess = this.state.removedRoleAccess;
                    if (!removedRoleAccess) {
                      removedRoleAccess = [];
                    }
                    if (position !== -1) {
                      removedRoleAccess.push(role_access_right[position] && role_access_right[position]._id)
                      role_access_right.splice(position, 1);
                    }
                    this.setState({ RoleAccessList: role_access_right, removedRoleAccess: removedRoleAccess });
                  }
                }
                else
                  toastr.warning("", "Please select role to proceed", { positionClass: 'toast-top-center' });
              }}
            />
          </div >
        },
      });
    })
    return (
      <Fragment>
        <div className="page-content">
          <div className="container-fluid">
            <Card>
              <CardBody>
                <ListPageHeader
                  heading="Home.Access"
                  onTextChange={this.SearchQueryChanged}
                  buttonClick={this.addBtnClick}
                  searchValue={this.state.ListRequestModel.searchString}
                  showButton={false}
                  showSearch={false}
                />

                <Fragment>
                  <Row>
                    <Col xxs="4">
                      <FormGroup className="error-l-100">
                        <DropDown
                          className="react-select"
                          classNamePrefix="react-select"
                          label="Role"
                          name="Role"
                          colSplit={12}

                          MobcolSplit={12}
                          options={this.state.RoleList}
                          value={
                            this.state.SelectedRole &&
                            (typeof this.state.SelectedRole === "string"
                              ? this.state.RoleList.find(
                                (r) => r.value === this.state.SelectedRole
                              )
                              : this.state.RoleList.find(
                                (r) => r.value === this.state.SelectedRole._id
                              ))
                          }

                          Action={(entity) => {
                            if (entity) {
                              this.GetRoleAccess(entity.value)
                              this.setState({
                                SelectedRole: entity.value
                              })
                            }

                          }}

                        /></FormGroup>
                    </Col>


                  </Row>
                </Fragment>
                <ListPage
                  columns={columns}
                  data={this.state.AccessList && [...new Set(this.state.AccessList.map(obj => obj.Module))].map(Module => { return this.state.AccessList.find(obj => obj.Module === Module) })}
                  keyField={this.state.keyField}
                  totalCount={this.state.totalCount}
                  // rowClicked={this.HandleRowClicked}
                  rowsPerPageOnChange={this.handlePerRowsChange}
                  pageChange={this.handlePageChange}
                  isDataLoading={this.state.isLoading}
                  overFlowXRemoval={true}
                />
                {this.state.SelectedRole &&
                  <Button color="primary" style={{ float: "right" }} onClick={this.UpdateRoleAccess}>
                    Update
                </Button>
                }
              </CardBody>



            </Card>


            <Modal
              isOpen={this.state.manageModal}
              toggle={this.toggleManageModal}
            >
              <ModalHeader toggle={this.toggleManageModal}>
                {this.state.Access && this.state.Access._id
                  ? "Update  Access"
                  : "Create  Access"}
              </ModalHeader>
              <Formik
                initialValues={initialValues}
                // validationSchema={QuickAccessValidation}
                onSubmit={this.handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
              >
                {({ errors, values, setFieldValue }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <ModalBody>
                      <Fragment>
                        <Row className="mb-10">
                          <Col xxs="12">
                            <FormGroup className="form-group has-float-label">
                              <Label>Name</Label>
                              <Field className="form-control" name="Name"
                                onKeyPress={(event) => {
                                  if (INVALID_CHARS.includes(event.key)) {
                                    event.preventDefault();
                                  }
                                }}
                                onBlur={(event) => {
                                  event.target.value = event.target.value && event.target.value.replace(INVALID_CHARS_REGEX, '');
                                  setFieldValue("Name", event.target.value);
                                }} />
                              {errors.Name && (
                                <div className="invalid-feedback d-block">
                                  {errors.Name}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                          <Col xxs="12">
                            <FormGroup className="form-group has-float-label">
                              <DropDown
                                label="Court"
                                components={{ Input: CustomSelectInput }}
                                className="react-select"
                                classNamePrefix="react-select"
                                name="Court"
                                options={this.state.CourtList}
                                value={
                                  values.Court &&
                                  (typeof values.Court === "string"
                                    ? this.state.CourtList.find(
                                      (r) => r.value === values.Court
                                    )
                                    : this.state.CourtList.find(
                                      (r) => r.value === values.Court._id
                                    ))
                                }
                                isClearable="true"
                                ClearAction={() => {
                                  this.setState({
                                    values: {
                                      Court: null,
                                    },
                                  });
                                }}
                                Action={(entity) => {
                                  var result = this.state.QuickAccess;
                                  result.Court = entity ? entity.value : entity;
                                  setFieldValue("Court", entity ? entity.value : "");
                                  this.setState(
                                    {
                                      QuickAccess: result,
                                    });
                                }}
                              />
                            </FormGroup>
                          </Col>
                          <Col xxs="12">
                            <FormGroup className="form-group has-float-label">
                              <DropDown
                                label="Case Type"
                                components={{ Input: CustomSelectInput }}
                                className="react-select"
                                classNamePrefix="react-select"
                                name="CaseType"
                                options={this.state.CaseTypeList}
                                value={
                                  values.CaseType &&
                                  (typeof values.CaseType === "string"
                                    ? this.state.CaseTypeList.find(
                                      (r) => r.value === values.CaseType
                                    )
                                    : this.state.CaseTypeList.find(
                                      (r) => r.value === values.CaseType._id
                                    ))
                                }
                                isClearable="true"
                                ClearAction={() => {
                                  this.setState({
                                    values: {
                                      CaseType: null,
                                    },
                                  });
                                }}
                                Action={(entity) => {
                                  var result = this.state.QuickAccess;
                                  result.CaseType = entity ? entity.value : entity;
                                  setFieldValue("CaseType", entity ? entity.value : "");
                                  this.setState(
                                    {
                                      QuickAccess: result,
                                    });
                                }}
                              />
                            </FormGroup>
                          </Col>
                          <Col xxs="12">
                            <FormGroup className="form-group has-float-label">
                              <DropDown
                                label="Case Status"
                                components={{ Input: CustomSelectInput }}
                                className="react-select"
                                classNamePrefix="react-select"
                                name="CaseStatus"
                                options={this.state.CaseStatusList}
                                value={
                                  values.CaseStatus &&
                                  (typeof values.CaseStatus === "string"
                                    ? this.state.CaseStatusList.find(
                                      (r) => r.value === values.CaseStatus
                                    )
                                    : this.state.CaseStatusList.find(
                                      (r) => r.value === values.CaseStatus._id
                                    ))
                                }
                                isClearable="true"
                                ClearAction={() => {
                                  this.setState({
                                    values: {
                                      CaseStatus: null,
                                    },
                                  });
                                }}
                                Action={(entity) => {
                                  var result = this.state.QuickAccess;
                                  result.CaseStatus = entity ? entity.value : entity;
                                  setFieldValue("CaseStatus", entity ? entity.value : "");
                                  this.setState(
                                    {
                                      QuickAccess: result,
                                    });
                                }}
                              />
                            </FormGroup>
                          </Col>
                          <Col xxs="12">
                            <FormGroup className="form-group has-float-label">
                              <DropDown
                                label="Counter Affidavit"
                                components={{ Input: CustomSelectInput }}
                                className="react-select"
                                classNamePrefix="react-select"
                                name="CounterAffidavit"
                                options={this.state.CounterAffidavitList}
                                value={
                                  values.CounterAffidavit &&
                                  (typeof values.CounterAffidavit === "string"
                                    ? this.state.CounterAffidavitList.find(
                                      (r) => r.value === values.CounterAffidavit
                                    )
                                    : this.state.CounterAffidavitList.find(
                                      (r) => r.value === values.CounterAffidavit._id
                                    ))
                                }
                                isClearable="true"
                                ClearAction={() => {
                                  this.setState({
                                    values: {
                                      CounterAffidavit: null,
                                    },
                                  });
                                }}
                                Action={(entity) => {
                                  var result = this.state.QuickAccess;
                                  result.CounterAffidavit = entity ? entity.value : entity;
                                  setFieldValue("CounterAffidavit", entity ? entity.value : "");
                                  this.setState(
                                    {
                                      QuickAccess: result,
                                    });
                                }}
                              />
                            </FormGroup>
                          </Col>
                          <Col xxs="12">
                            <FormGroup className="form-group has-float-label">
                              <DropDown
                                label="Days"
                                components={{ Input: CustomSelectInput }}
                                className="react-select"
                                classNamePrefix="react-select"
                                name="Day"
                                options={this.state.DayList}
                                value={
                                  values.Day &&
                                  (typeof values.Day === "string"
                                    ? this.state.DayList.find(
                                      (r) => r.value === values.Day
                                    )
                                    : this.state.DayList.find(
                                      (r) => r.value === values.Day._id
                                    ))
                                }
                                isClearable="true"
                                ClearAction={() => {
                                  this.setState({
                                    values: {
                                      Day: null,
                                    },
                                  });
                                }}
                                Action={(entity) => {
                                  var result = this.state.QuickAccess;
                                  result.Day = entity ? entity.value : entity;
                                  setFieldValue("Day", entity ? entity.value : "");
                                  this.setState(
                                    {
                                      QuickAccess: result,
                                    });
                                }}
                              />
                            </FormGroup>
                          </Col>
                          <Col xxs="12">
                            <FormGroup className="form-group has-float-label">
                              <div className=" custom-checkbox custom-control-right">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="customCheck4"
                                  onChange={(e) => {
                                    var result = this.state.QuickAccess;
                                    result.Compilance = e.target.checked;
                                    setFieldValue("Compilance", result.Compilance);
                                    this.setState(
                                      {
                                        Compilance: e.target.checked,
                                        QuickAccess: result,
                                      }
                                    );
                                  }}
                                />
                                <br></br>
                                <br></br>
                                <label
                                  className="custom-control-label"
                                  htmlFor="customCheck4"
                                >
                                  Compilance
                        </label>
                              </div>
                            </FormGroup>
                          </Col>
                          <Col xxs="12">
                            <FormGroup className="form-group has-float-label">
                              <div className=" custom-checkbox custom-control-right">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="customCheck3"
                                  onChange={(e) => {
                                    var result = this.state.QuickAccess;
                                    result.IsDelayedReplies = e.target.checked;
                                    setFieldValue("IsDelayedReplies", result.IsDelayedReplies);
                                    this.setState(
                                      {
                                        IsDelayedReplies: e.target.checked,
                                        QuickAccess: result,
                                      }
                                    );
                                  }}
                                />
                                <br></br>
                                <br></br>
                                <label
                                  className="custom-control-label"
                                  htmlFor="customCheck3"
                                >
                                  Delayed Replies
                        </label>
                              </div>
                            </FormGroup>
                          </Col>
                          <Col xxs="12">
                            <FormGroup className="form-group has-float-label">
                              <div className=" custom-checkbox custom-control-right">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="customCheck4"
                                  onChange={(e) => {
                                    var result = this.state.QuickAccess;
                                    result.IsPendingActions = e.target.checked;
                                    setFieldValue("IsPendingActions", result.IsPendingActions);
                                    this.setState(
                                      {
                                        IsPendingActions: e.target.checked,
                                        QuickAccess: result,
                                      }
                                    );
                                  }}
                                />
                                <br></br>
                                <br></br>
                                <label
                                  className="custom-control-label"
                                  htmlFor="customCheck4"
                                >
                                  Pending Actions
                        </label>
                              </div>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Fragment>
                    </ModalBody>

                    <ModalFooter>
                      <FormGroup className="float-sm-right ">
                        {this.state.QuickAccess._id ? (
                          <Button
                            className={
                              this.state.buttonAction ? "disabled" : ""
                            }
                            type="submit"
                            outline
                            color="primary"
                          >
                            Update
                          </Button>
                        ) : (
                            <Button
                              className={
                                this.state.buttonAction ? "disabled" : ""
                              }
                              type="submit"
                              outline
                              color="primary"
                            >
                              Create
                            </Button>
                          )}

                        <Button
                          color="danger"
                          className="ml-2"
                          onClick={() => this.toggleManageModal()}
                        >
                          Cancel
                        </Button>
                      </FormGroup>
                    </ModalFooter>
                  </Form>
                )}
              </Formik>
            </Modal>
          </div>
        </div>
      </Fragment >
    );
  }
}
export default Access;
