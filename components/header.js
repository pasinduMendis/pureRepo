import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import ReferenceLinks from "./referenceLinks";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container-fluid d-none d-sm-block header-logo-desktop">
      <Navbar bg="white" className="navbar-center">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand>
            <a href="https://www.purepm.co/">
              <img
                src="./images/logo.svg"
                width="98"
                height="auto"
                className="d-inline-block align-top logo-desk"
                alt="PurePM Logo"
              />
            </a>
          </Navbar.Brand>

          <Navbar.Brand className="flex-end" onClick={handleShowModal}>
            <Button className="location-button">PURE Locations</Button>
          </Navbar.Brand>
        </Container>

        <Modal
          show={showModal}
          onHide={handleCloseModal}
          size="xl"
          backdrop="false"
          className="referencelinks-dropdown"
        >
          {/* <Modal.Header closeButton>
              <Modal.Title><p className='location-title'>Locations</p></Modal.Title>
            </Modal.Header> */}

          <Modal.Body>
            <ReferenceLinks />
          </Modal.Body>
        </Modal>
      </Navbar>
    </div>
  );
};

export default Header;
