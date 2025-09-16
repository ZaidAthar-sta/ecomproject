import React from "react"
import "./Contact.css"
import contact_img from "../../assets copy/contact_img.png"
import { Container, Row, Col, Button } from "react-bootstrap"

export default function Contact() {
  return (
    <div className="contactSection pb-5">
      <div className="bg-img-heading pb-5">
        <h2 className="text-white text-center">Contact</h2>
      </div>
      <Container className="mt-5" >
        {/* <Title text1={"contact"} text2={"us"} /> */}
        <Row className="align-items-center contactContainer mt-5">
          <Col md={6} className="text-center mb-4 mb-md-0">
            <img
              src={contact_img}
              alt="Contact"
              className="img-fluid rounded shadow contactImage"
            />
          </Col>
          <Col md={6} className="contactContext">
            <h3 className="mb-3">Our Store</h3>
            <div className="address addDiv mb-3">
              <p>54709 Willms Station</p>
              <p>Suite 350, Washington, USA</p>
            </div>
            <div className="telEmail addDiv mb-4">
              <p>Tel: (415) 555-0132</p>
              <p>admin@forever.com</p>
            </div>
            <h3 className="careers mb-3">Careers at Forever</h3>
            <p className="contactLearnP mb-4">
              Learn more about our team and Job Openings.
            </p>
            <Button className="explore-btn " id="exploreJobs" variant="primary">
              Explore Jobs
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
