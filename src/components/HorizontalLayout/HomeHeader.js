import React, { Component } from "react"
import PropTypes from "prop-types"

import { connect } from "react-redux"

import { Link } from "react-router-dom"

// Import menuDropdown
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown"


import logo from "../../assets/images/logo-light.svg"

// Redux Store
import { toggleRightSidebar } from "../../store/actions"

//i18n
import { withTranslation } from "react-i18next"

class HomeHeader extends Component {
  constructor(props) {
    super(props)
    this.state = { isSearch: false }
    this.toggleMenu = this.toggleMenu.bind(this)
    this.toggleFullscreen = this.toggleFullscreen.bind(this)
  }

  toggleMenu() {
    this.props.openLeftMenuCallBack()
  }

  toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        )
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <header id="page-topbar">
          <div className="navbar-header">
            <div className="d-flex">
              <div className="navbar-brand-box">
                <Link to="/" className="logo logo-dark">
                  <span className="logo-sm">
                    <img src={logo} alt="" height="25" />
                  </span>
                  <span className="logo-lg">
                    <img src={logo} alt="" height="60" />
                  </span>
                </Link>

                {/* <Link to="/" className="logo logo-light">
                  <span className="logo-sm">
                    <img src={logoLightSvg} alt="" height="22" />
                  </span>
                  <span className="logo-lg">
                    <img src={logoLight} alt="" height="19" />
                  </span>
                </Link> */}
              </div>

              <button
                type="button"
                className="btn btn-sm px-3 font-size-16 d-lg-none header-item waves-effect waves-light"
                data-toggle="collapse"
                onClick={this.toggleMenu}
                data-target="#topnav-menu-content"
              >
                <i className="fa fa-fw fa-bars" />
              </button>
            </div>
                    

            <div className="d-flex">
        
              <LanguageDropdown />

              <div className="dropdown d-none d-lg-inline-block ml-1">
                <button
                  type="button"
                  className="btn header-item noti-icon waves-effect"
                  onClick={this.toggleFullscreen}
                  data-toggle="fullscreen"
                >
                  <i className="bx bx-fullscreen" />
                </button>
              </div>
            </div>
          </div>
        </header>
      </React.Fragment>
    )
  }
}

HomeHeader.propTypes = {
  openLeftMenuCallBack: PropTypes.func,
  t: PropTypes.any,
  toggleRightSidebar: PropTypes.func,
}

const mapStatetoProps = state => {
  const { layoutType } = state.Layout
  return { layoutType }
}

export default connect(mapStatetoProps, { toggleRightSidebar })(
  withTranslation()(HomeHeader)
)
