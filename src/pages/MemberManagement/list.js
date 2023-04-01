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
class MemberManagement extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }
  render() {
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops pb-5">
          <Card className=" p-4 page-content mb-5">
            <CardTitle>{this.props.t("Member Management")}</CardTitle>
            <CardBody className="mb-0 pb-0">
              <Tabs defaultActiveKey="PersonalDetails" transition={false}>
                <Tab
                  eventKey="PersonalDetails"
                  title={this.props.t("Personal Details")}
                >
                  <PersonalDetails />
                </Tab>
                <Tab
                  eventKey="EmployeeDetails"
                  title={this.props.t("Employee Details")}
                >
                  <EmployeeDetails />
                </Tab>

                <Tab
                  eventKey="Products"
                  title={this.props.t("Bank A/C Details")}
                >
                  <BankAccDetails />
                </Tab>
                <Tab
                  eventKey="NomineeDetails"
                  title={this.props.t("Nominee Details")}
                >
                  <NomineeDetails />
                </Tab>
                <Tab
                  eventKey="ShareDetails"
                  title={this.props.t("Share Details")}
                >
                  <ShareDetails />
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </Container>
      </Fragment>
    )
  }
}

export default withTranslation()(MemberManagement)
