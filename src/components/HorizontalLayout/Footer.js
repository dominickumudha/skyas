import React from "react"
import { Container, Row, Col } from "reactstrap"
import tnega from "../../assets/images/tnega.png"

const Footer = () => {
  return (
    <React.Fragment>
      {/* <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md={6}>{new Date().getFullYear()} .</Col>
            <Col md={6}>
              <div className="text-sm-right d-none d-sm-block">
                Design & Develop by Themesbrand
              </div>
            </Col>
          </Row>
        </Container>
      </footer> */}
      <footer className="footer footer-copyright-area footerContainer pr-0 pl-0 ">
        <Row className="footerContainer">
          <Col lg={12}>
            &copy; {new Date().getFullYear()} | All Rights Reserved | Powered by
            <a href="https://tnega.tn.gov.in" target="blank" className="ml-1">
              <img alt="tnega" src={tnega} height={25} /> TNeGA
            </a>
          </Col>
        </Row>
      </footer>
    </React.Fragment>
  )
}

export default Footer
