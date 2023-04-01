import React, { Component, Fragment } from "react"
import { Container, CardBody, CardTitle, Card } from "reactstrap"
import { Tabs, Tab } from "react-bootstrap"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { CallService } from "../../helpers/servicecall"
import { MethodType } from "../../constants/defaultValues"
import { withTranslation } from "react-i18next"
import PersonalDetails from "../PersonalDetails/list"
import BankAccDetails from "../BankAccDetails/list"
import EmployeeDetails from "../EmployeeDetails/list"
import ShareDetails from "../ShareDetails/list"
import NomineeDetails from "../NomineeDetails/list"

import ShareSetting from "../ShareSetting/list"
import MemberSetting from "../MemberSetting/list"
import DividendSetting from "../DividendSettings/list"
import Documents from "../DocumentsPage/list"
import General from "../General/list"
import Products from "../products/list"
import RecoverySettings from "../RecoverySettings/list"

class SocietyRegistration extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops pb-5">
          <Card className=" p-4 page-content mb-5">
            <CardTitle>{this.props.t("SOCIETY REGISTRATION")}</CardTitle>
            <CardBody className="mb-0 pb-0">
              <Tabs defaultActiveKey="General" transition={false}>
                <Tab eventKey="General" title={this.props.t("General")}>
                  <General />
                </Tab>
                <Tab eventKey="Documents" title={this.props.t("Documents")}>
                  <Documents />
                </Tab>
                <Tab eventKey="Products" title={this.props.t("Products")}>
                  <Products />
                </Tab>
                <Tab
                  eventKey="ShareSetting"
                  title={this.props.t("Share Settings")}
                >
                  <ShareSetting />
                </Tab>

                <Tab
                  eventKey="MemberSettings"
                  title={this.props.t("Member Settings")}
                >
                  <MemberSetting />
                </Tab>
                <Tab
                  eventKey="DividendSettings"
                  title={this.props.t("Dividend Settings")}
                >
                  <DividendSetting />
                </Tab>
                <Tab
                  eventKey="RecoverySettings"
                  title={this.props.t("Recovery Settings")}
                >
                  <RecoverySettings />
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </Container>
      </Fragment>
    )
  }
}

export default withTranslation()(SocietyRegistration)
