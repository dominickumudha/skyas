import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { I18nextProvider } from "react-i18next"
import i18n from "../i18n"

import {
  changeLayout,
  changeTopbarTheme,
  changeLayoutWidth,
  toggleRightSidebar,
} from "../store/actions"

import HomeHeader from "../components/HorizontalLayout/HomeHeader"
import HomeFooter from "../components/HorizontalLayout/HomeFooter"
import HomeNavbar from "./HorizontalLayout/HomeNavbar"
import HomeLoginNavbar from "./HorizontalLayout/HomeLoginNavbar"

class NonAuthLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMenuOpened: false,
    }
  }

  componentDidMount() {
    if (this.props.isPreloader === true) {
      document.getElementById("preloader").style.display = "block"
      document.getElementById("status").style.display = "block"

      setTimeout(function () {
        document.getElementById("preloader").style.display = "none"
        document.getElementById("status").style.display = "none"
      }, 2500)
    } else {
      document.getElementById("preloader").style.display = "none"
      document.getElementById("status").style.display = "none"
    }

    // Scrollto 0,0
    window.scrollTo(0, 0)

    const title = this.props.location.pathname
    let currentage = title.charAt(1).toUpperCase() + title.slice(2)

    document.title = currentage
    this.props.changeLayout("horizontal")
    if (this.props.topbarTheme) {
      this.props.changeTopbarTheme(this.props.topbarTheme)
    }
    if (this.props.layoutWidth) {
      this.props.changeLayoutWidth(this.props.layoutWidth)
    }
    if (this.props.showRightSidebar) {
      this.toggleRightSidebar()
    }
  }

  /**
   * Opens the menu - mobile
   */
  openMenu = e => {
    this.setState({ isMenuOpened: !this.state.isMenuOpened })
  }
  render() {
    return (
      <React.Fragment>
        <I18nextProvider i18n={i18n}>
          <div id="preloader">
            <div id="status">
              <div className="spinner-chase"></div>
            </div>
          </div>
          <div id="layout-wrapper">
            <HomeHeader
              theme={this.props.topbarTheme}
              isMenuOpened={this.state.isMenuOpened}
              toggleRightSidebar={this.toggleRightSidebar}
              openLeftMenuCallBack={this.openMenu}
            />
            <HomeNavbar menuOpen={this.state.isMenuOpened} />

            <div className="main-content">{this.props.children}</div>
            <HomeFooter />
          </div>
        </I18nextProvider>
      </React.Fragment>
    )
  }
}

NonAuthLayout.propTypes = {
  children: PropTypes.object,
  location: PropTypes.object,
  changeLayout: PropTypes.func,
  changeLayoutWidth: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  isPreloader: PropTypes.bool,
  layoutWidth: PropTypes.string,
  topbarTheme: PropTypes.any,
  toggleRightSidebar: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    ...state.Layout,
  }
}
export default connect(mapStateToProps, {
  changeTopbarTheme,
  toggleRightSidebar,
  changeLayout,
  changeLayoutWidth,
})(withRouter(NonAuthLayout))
