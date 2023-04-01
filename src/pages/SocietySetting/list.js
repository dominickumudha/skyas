import React, { Component, Fragment } from "react"
import { Container, CardBody, CardTitle, Card } from "reactstrap"
import { Tabs, Tab } from "react-bootstrap"
import ListPageHeader from "../../components/custom/ListPageHeader"
import { withTranslation } from "react-i18next"
import WorkFlow from "pages/WorkFlow/list"
import BoardofDirectors from "pages/BoardofDirectors/list"

class SocietySetting extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }
  render() {
    return (
      <Fragment>
        <Container fluid className="justify-content-center form-tops pb-5">
          <Card className=" px-4 pt-4  mb-0 pb-0 mb-5">
           
            <ListPageHeader
                heading={`${this.props.t("Home")}.${this.props.t("Society Settings")}`}
              showSearch = {false}
              showButton = {false}
            //  match={this.props.match}
            //  onTextChange={this.searchQueryChanged}
             // buttonClick={this.addBtnClick}
            //  searchValue={this.state.listRequestModel.searchString}
            />
            <CardBody>
              <Tabs defaultActiveKey="BoardofDirectors" transition={false}>
                <Tab
                  eventKey="BoardofDirectors"
                  title={this.props.t("Board of Directors")}
                >
                  <BoardofDirectors />
                </Tab>
                <Tab
                  eventKey="WorkFlowSettings"
                  title={this.props.t("Work Flow Settings")}
                >
                  <WorkFlow />
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </Container>
      </Fragment>
    )
  }
}

export default withTranslation()(SocietySetting)
