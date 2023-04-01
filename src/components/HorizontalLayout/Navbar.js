import React, { Component } from "react"
import PropTypes from "prop-types"
import { Row, Col, Collapse } from "reactstrap"
import { Link, withRouter } from "react-router-dom"
import classname from "classnames"
import { Menu } from "../../constants/menu"
//i18n
import { withTranslation } from "react-i18next"
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu"

class Navbar extends Component {
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
                <ul className="navbar-nav ">
                  {Menu.map(m => {
                    return (
                      <li className="nav-item dropdown  ">
                        <Link
                          to={!m.subs && m.to}
                          className="nav-link dropdown-toggle arrow-none w-25"
                        >
                          <i className={m.icon}></i>{" "}
                          <span> {this.props.t(m.label)}</span>
                          {this.props.menuOpen}
                          <div className={m.subs && "arrow-down"} />
                        </Link>
                        {m.subs && (
                          <div className={classname("dropdown-menu ", {})}>
                            {m.subs.map((sm, i) => {
                              return (
                                <Link className="dropdown-item " to={sm.to}>
                                  {this.props.t(sm.label)}
                                </Link>
                              )
                            })}
                          </div>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </Collapse>
              <div className="float-right">
                <ProfileMenu />
              </div>
            </nav>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

Navbar.propTypes = {
  location: PropTypes.object,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(Navbar))
