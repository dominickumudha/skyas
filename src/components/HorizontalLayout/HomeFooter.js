import React from "react"
import { Container, Row, Col } from "reactstrap"

import tnega from "../../assets/images/tnega.png"

const HomeFooter = () => {
  return (
    <React.Fragment>
      <footer className="footer pr-0 pl-0">
        <Container fluid={true} className="footerContainer">
          {/* <Row>
            <Col lg={4} md={6}>
              <h2></h2>
            </Col>
            <Col md={6}>
              <div className="text-sm-right d-none d-sm-block">
                Design & Develop by Themesbrand
              </div>
            </Col>
          </Row> */}
          <Row className="footer-copyright-area">
            <Col lg={12}>
              &copy; {new Date().getFullYear()} | All Rights Reserved | Powered
              by
              <a href="https://tnega.tn.gov.in" target="blank" className="ml-1">
                <img alt="tnega" src={tnega} height={25} /> TNeGA
              </a>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default HomeFooter
