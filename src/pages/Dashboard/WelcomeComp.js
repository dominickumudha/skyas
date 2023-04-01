import React, { Component } from "react"

import { Row, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"

import avatar1 from "../../assets/images/users/avatar-1.jpg"
import profileImg from "../../assets/images/profile-img.png"

class WelcomeComp extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <React.Fragment>
        <Card className="overflow-hidden">
          <div className="bg-soft-primary">
            <Row>
              <Col xs="7">
                <div className="text-primary p-3">
                  <h5 className="text-primary">Welcome Back !</h5>
                  <p></p>
                </div>
              </Col>
              <Col xs="5" className="align-self-end">
                <img src={profileImg} alt="" className="img-fluid" />
              </Col>
            </Row>
          </div>
          <CardBody className="pt-0">
            <Row>
              <Col sm="4">
                <div className="avatar-md profile-user-wid mb-4">
                  <img
                    src={avatar1}
                    alt=""
                    className="img-thumbnail rounded-circle"
                  />
                </div>
                <h5 className="font-size-15 text-truncate">To Do</h5>
                <p className="text-muted mb-0 text-truncate">Need to Update GSTN</p>
              </Col>

              <Col sm="8">
                <div className="pt-4">
                  <Row>
                    <Col xs="6">
                      <h5 className="font-size-15">125</h5>
                      <p className="text-muted mb-0">Societys</p>
                    </Col>
                    <Col xs="6">
                      <h5 className="font-size-15">Rs.1,25,445</h5>
                      <p className="text-muted mb-0">Revenue</p>
                    </Col>
                  </Row>
                  <div className="mt-4">
                    <Link
                      to="/society-registration"
                      className="btn btn-primary waves-effect waves-light btn-sm"
                    >
                      View More <i className="mdi mdi-arrow-right ml-1"/>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}

export default WelcomeComp
