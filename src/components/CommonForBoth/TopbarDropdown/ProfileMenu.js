import React, { Component } from "react"
import PropTypes from "prop-types"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"
import { withRouter, Link } from "react-router-dom"
import { clearValuesOnLogout } from "../../../helpers/utils"

//i18n
import { withTranslation } from "react-i18next"

// users
import user1 from "../../../assets/images/users/avatar-1.jpg"

import { getItemFromLocalStorage } from "../../../helpers/utils"

class ProfileMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: false,
      name: "Admin",
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState(prevState => ({
      menu: !prevState.menu,
    }))
  }

  componentDidMount() {
    if (getItemFromLocalStorage("authUser")) {
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const obj = JSON.parse(getItemFromLocalStorage("authUser"))
        this.setState({ name: obj.displayName })
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        const obj = JSON.parse(getItemFromLocalStorage("authUser"))
        this.setState({ name: obj.username })
      }
    }
  }
  handleLogout = () => {
    this.props.history.push("/logout")
  }
  render() {
    return (
      <React.Fragment>
        <Dropdown
          isOpen={this.state.menu}
          toggle={this.toggle}
          className="d-inline-block text-white"
        >
          <DropdownToggle
            className="btn header-item waves-effect text-light"
            id="page-header-user-dropdown"
            tag="button"
          >
            <img
              className="rounded-circle header-profile-user"
              src={user1}
              alt="Header Avatar"
            />
            <span className="d-none d-xl-inline-block ml-2 mr-1">
              {this.state.name}
            </span>
            <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem tag="a" href="/profile">
              <i className="bx bx-user font-size-16 align-middle mr-1" />
              {this.props.t("Profile")}
            </DropdownItem>

            <DropdownItem tag="a" href="/change-password">
              <i className="bx bx-lock font-size-17 align-middle mr-1" />
              {this.props.t("Change Password")}
            </DropdownItem>

            <div className="dropdown-divider" />
            <Link onClick={e => this.handleLogout()} className="dropdown-item">
              <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger" />
              <span>{this.props.t("Logout")}</span>
            </Link>
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
    )
  }
}

ProfileMenu.propTypes = {
  t: PropTypes.any,
}

export default withRouter(withTranslation()(ProfileMenu))
