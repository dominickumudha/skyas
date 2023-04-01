import React, { Component } from "react"
import PropTypes from "prop-types"
import { Row, Col, Collapse } from "reactstrap"
import { Link, withRouter } from "react-router-dom"
import classname from "classnames"
import { clearValuesOnLogout } from "../../helpers/utils"

//i18n
import { withTranslation } from "react-i18next"

class HomeLoginNavbar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    let matchingMenuItem = null
    const ul = document.getElementById("navigation")
    const items = ul.getElementsByTagName("a")
    for (let i = 0; i < items.length; ++i) {
      if (this.props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem)
    }
  }

  activateParentDropdown = item => {
    item.classList.add("active")
    const parent = item.parentElement
    if (parent) {
      parent.classList.add("active") // li
      const parent2 = parent.parentElement
      parent2.classList.add("active") // li
      const parent3 = parent2.parentElement
      if (parent3) {
        parent3.classList.add("active") // li
        const parent4 = parent3.parentElement
        if (parent4) {
          parent4.classList.add("active") // li
          const parent5 = parent4.parentElement
          if (parent5) {
            parent5.classList.add("active") // li
            const parent6 = parent5.parentElement
            if (parent6) {
              parent6.classList.add("active") // li
            }
          }
        }
      }
    }
    return false
  }
  handleCMS = () => {
    this.props.history.push("/cms")
  }
  handleArea = () => {
    this.props.history.push("/area")
  }
  handleLogout = () => {
    clearValuesOnLogout()
    this.props.history.push("/")
  }
  handleLevel = () => {
    this.props.history.push("/level")
  }
  handleAssetCategory = () => {
    this.props.history.push("/asset-category")
  }
  handleEmployeeDepartment = () => {
    this.props.history.push("/employee-department")
  }
  handleGLAccounts = () => {
    this.props.history.push("/gl-accounts")
  }
  handleSocietySetting = () => {
    this.props.history.push("/society-setting")
  }
  handleExpenseCategory = () => {
    this.props.history.push("/expense-report")
  }
  handleGLAccountsGroup = () => {
    this.props.history.push("/accounts-group")
  }
  handleJewelLoanSetting = () => {
    this.props.history.push("/jewel-loan-setting")
  }
  handlePaymentMode = () => {
    this.props.history.push("/payment-mode")
  }
  handleProfileUpdate = () => {
    this.props.history.push("/profile-update")
  }
  handleReligionCRUD = () => {
    this.props.history.push("/religion-crud")
  }
  handleRole = () => {
    this.props.history.push("/role")
  }
  handleSocietyRegistration = () => {
    this.props.history.push("/society-registration")
  }
  handleDashboard = () => {
    this.props.history.push("/dashboard")
  }
  render() {
    return (
      <React.Fragment>
        <div className="topnav">
          <div className="container-fluid">
            <nav
              className="navbar navbar-light navbar-expand-lg topnav-menu"
              id="navigation"
            >
              <Collapse
                isOpen={this.props.menuOpen}
                className="navbar-collapse"
                id="topnav-menu-content"
              >
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle arrow-none"
                      onClick={e => {
                        {
                          this.handleDashboard()
                        }
                        e.preventDefault()
                        this.setState({ isDashboard: !this.state.isDashboard })
                      }}
                    >
                      <i className="fas fa-cogs mr-2" />
                      {this.props.t("Dashboard")}
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle arrow-none">
                      <i className="fas fa-cogs mr-2" />
                      {this.props.t("System Setting")} {this.props.menuOpen}
                      <div className="arrow-down" />
                    </Link>
                    <div className={classname("dropdown-menu", {})}>
                      <Link
                        className="dropdown-item"
                        onClick={e => {
                          {
                            this.handleCMS()
                          }
                          e.preventDefault()
                          this.setState({
                            isDashboard: !this.state.isDashboard,
                          })
                        }}
                      >
                        {this.props.t("CMS")}
                      </Link>
                    </div>
                  </li>

                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle arrow-none">
                      <i className="fas fa-cogs mr-2" />
                      {this.props.t("Master Setting")} {this.props.menuOpen}
                      <div className="arrow-down" />
                    </Link>
                    <div className={classname("dropdown-menu", {})}>
                      <Link
                        className="dropdown-item"
                        onClick={e => {
                          {
                            this.handleLevel()
                          }
                          e.preventDefault()
                          this.setState({
                            isDashboard: !this.state.isDashboard,
                          })
                        }}
                      >
                        {this.props.t("Level")}
                      </Link>
                      <Link
                        className="dropdown-item"
                        onClick={e => {
                          {
                            this.handleArea()
                          }
                          e.preventDefault()
                          this.setState({
                            isDashboard: !this.state.isDashboard,
                          })
                        }}
                      >
                        {this.props.t("Area")}
                      </Link>
                      <Link
                        className="dropdown-item"
                        onClick={e => {
                          {
                            this.handleRole()
                          }
                          e.preventDefault()
                          this.setState({
                            isDashboard: !this.state.isDashboard,
                          })
                        }}
                      >
                        {this.props.t("Role")}
                      </Link>
                      <Link
                        className="dropdown-item"
                        onClick={e => {
                          {
                            this.handleGLAccounts()
                          }
                          e.preventDefault()
                          this.setState({
                            isDashboard: !this.state.isDashboard,
                          })
                        }}
                      >
                        {this.props.t("GL Accounts")}
                      </Link>
                      <Link
                        className="dropdown-item"
                        onClick={e => {
                          {
                            this.handleGLAccountsGroup()
                          }
                          e.preventDefault()
                          this.setState({
                            isDashboard: !this.state.isDashboard,
                          })
                        }}
                      >
                        {this.props.t("Gl Accounts Group")}
                      </Link>
                      <Link
                        className="dropdown-item"
                        onClick={e => {
                          {
                            this.handlePaymentMode()
                          }
                          e.preventDefault()
                          this.setState({
                            isDashboard: !this.state.isDashboard,
                          })
                        }}
                      >
                        {this.props.t("Payment Mode")}
                      </Link>
                    </div>
                  </li>

                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle arrow-none">
                      <i className="fas fa-pager mr-2" />
                      {this.props.t("Pages")} <div className="arrow-down" />
                    </Link>
                    <div
                      className={classname(
                        "dropdown-menu mega-dropdown-menu dropdown-menu-left dropdown-mega-menu-xl"
                      )}
                    >
                      <Row>
                        <Col lg={4}>
                          <div>
                            <Link
                              className="dropdown-item"
                              onClick={e => {
                                {
                                  this.handleAssetCategory()
                                }
                                e.preventDefault()
                                this.setState({
                                  isDashboard: !this.state.isDashboard,
                                })
                              }}
                            >
                              {this.props.t("Asset Category")}
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={e => {
                                {
                                  this.handleSocietySetting()
                                }
                                e.preventDefault()
                                this.setState({
                                  isDashboard: !this.state.isDashboard,
                                })
                              }}
                            >
                              {this.props.t("Society Setting")}
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={e => {
                                {
                                  this.handleEmployeeDepartment()
                                }
                                e.preventDefault()
                                this.setState({
                                  isDashboard: !this.state.isDashboard,
                                })
                              }}
                            >
                              {this.props.t("Employee Department")}
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={e => {
                                {
                                  this.handleExpenseCategory()
                                }
                                e.preventDefault()
                                this.setState({
                                  isDashboard: !this.state.isDashboard,
                                })
                              }}
                            >
                              {this.props.t("Expense Category")}
                            </Link>
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div>
                            <Link
                              className="dropdown-item"
                              onClick={e => {
                                {
                                  this.handleJewelLoanSetting()
                                }
                                e.preventDefault()
                                this.setState({
                                  isDashboard: !this.state.isDashboard,
                                })
                              }}
                            >
                              {this.props.t("Jewel Loan Settings")}
                            </Link>

                            <Link
                              className="dropdown-item"
                              onClick={e => {
                                {
                                  this.handleProfileUpdate()
                                }
                                e.preventDefault()
                                this.setState({
                                  isDashboard: !this.state.isDashboard,
                                })
                              }}
                            >
                              {this.props.t("Profile Update")}
                            </Link>
                            <Link
                              className="dropdown-item"
                              onClick={e => {
                                {
                                  this.handleReligionCRUD()
                                }
                                e.preventDefault()
                                this.setState({
                                  isDashboard: !this.state.isDashboard,
                                })
                              }}
                            >
                              {this.props.t("Religion Crud")}
                            </Link>

                            <Link
                              className="dropdown-item"
                              onClick={e => {
                                {
                                  this.handleSocietyRegistration()
                                }
                                e.preventDefault()
                                this.setState({
                                  isDashboard: !this.state.isDashboard,
                                })
                              }}
                            >
                              {this.props.t("Society Registration")}
                            </Link>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </li>
                  <li className="nav-item dropdownml-5 pl-5">
                    <Link
                      className="nav-link dropdown-toggle arrow-none ml-5 pl-5"
                      onClick={e => {
                        {
                          this.handleLogout()
                        }

                        this.setState({ isDashboard: !this.state.isDashboard })
                      }}
                    >
                      <i className="fas fa-sign-out-alt mr-2" />
                      {this.props.t("Logout")} {this.props.menuOpen}
                    </Link>
                  </li>
                </ul>
              </Collapse>
            </nav>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

HomeLoginNavbar.propTypes = {
  location: PropTypes.object,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(HomeLoginNavbar))
