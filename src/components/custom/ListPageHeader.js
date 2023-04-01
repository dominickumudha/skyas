import React, { Component } from "react"
import { Row, Button, Col } from "reactstrap"
import Breadcrumbs from "../Common/Breadcrumb"
import { withTranslation } from "react-i18next"
import { INVALID_CHARS } from "../../helpers/utils"
class ListPageHeader extends Component {
  constructor() {
    super()
    this.state = {
      dropdownSplitOpen: false,
      displayOptionsIsOpen: false,
    }
  }

  toggleDisplayOptions = () => {
    this.setState(prevState => ({
      displayOptionsIsOpen: !prevState.displayOptionsIsOpen,
    }))
  }
  toggleSplit = () => {
    this.setState(prevState => ({
      dropdownSplitOpen: !prevState.dropdownSplitOpen,
    }))
  }
  enterPressed = event => {
    if (INVALID_CHARS.includes(event.key)) {
      event.preventDefault()
    }
    var code = event.keyCode || event.which
    if (code === 13) {
      //13 is the enter keycode
      this.props.buttonClick()
    }
  }
  render() {
    const {
      onTextChange,
      buttonClick,
      heading,
      buttonText,
      showSearch,
      showButton,
      showBreadCrumb,
      searchValue,
    } = this.props
    return (
      <Row>
        <Col xxs="12">
          {showBreadCrumb !== false && (
            <Breadcrumbs
              title={heading.split(".")[0]}
              breadcrumbItem={heading.split(".")[heading.split(".").length - 1]}
            />
          )}
          <div className="mb-2">
            <div className="text-zero float-right mt-2">
              {showSearch === false ? (
                ""
              ) : (
                <div
                  style={{ marginTop: "-5%" }}
                  className="app-search mr-2 d-none float-left d-lg-block"
                >
                  <div className="position-relative">
                    <input
                      type="text"
                      name="keyword"
                      onKeyPress={this.enterPressed.bind(this)}
                      onChange={e => onTextChange(e)}
                      className="form-control"
                      placeholder={this.props.t("Search") + "..."}
                      value={searchValue}
                    />
                    <span className="bx bx-search-alt"></span>
                  </div>
                </div>
              )}

              {showButton === false ? (
                ""
              ) : (
                <Button
                  color="primary"
                  size="md"
                  className="float-right"
                  onClick={() => buttonClick()}
                >
                  {buttonText ? buttonText : this.props.t("Add New")}
                </Button>
              )}
            </div>
          </div>
          <span
            className="text-semi-muted float-right"
            style={{ marginTop: "-2%" }}
          >
            {this.props.searchMessage}{" "}
          </span>
        </Col>
      </Row>
    )
  }
}
export default withTranslation()(ListPageHeader)
