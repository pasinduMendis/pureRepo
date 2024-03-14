import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Modal } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import Form from "react-bootstrap/esm/Form";
import axios from "axios";
import CardDetails from "./cardDetails";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinShareButton,
  HatenaShareCount,
  LinkedinIcon,
  OKShareCount,
  PinterestShareCount,
  RedditShareCount,
  TumblrShareCount,
  VKShareCount,
  EmailShareButton,
  EmailIcon,
} from "react-share";

class Listingcard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      modalShowNew: false,
      card: false,
      val: "",
      // nowavailableaa: false
    };
  }

  componentDidMount() {
    // if(prevProps !== undefined){
    // if(prevProps.show !== this.props.show) {
    if (this.props.show) {
      // if(this.state.modalShow !== this.props.show){

      if (this.props.show === this.props.listing.id) {
        // this.setState({ modalShow: true });
        this.openModal(this.props.show, this.props.show);
      }

      // }
    }
    // }
    // }
  }

  openModal = async (e, id) => {
    var newurl =
      window.location.pathname.split("/")[1] + "/" + id + "/?locationID=" + id;
    const newUrlOne = newurl.replaceAll(", ", "-");
    const newUrlTwo = newUrlOne.replaceAll(" ", "-");
    if (window.location.pathname.split("/").length !== 2) {
      if (window.location.pathname.split("/").length === 4) {
        this.setState({ modalShow: true });
        return;
      }
      var newurl2 = "/" + window.location.pathname.split("/")[1];
      window.history.pushState({ path: newurl2 }, "", newurl2);
      window.history.pushState({ path: newurl }, "", newurl);
    } else {
      window.history.pushState({ path: newUrlTwo }, "", newUrlTwo);
      this.setState({ modalShow: true });
    }
  };
  openModalNew = (e, id) => {
    this.setState({ modalShowNew: true });
  };
  closeModal = () => {
    var newurl = "/" + window.location.pathname.split("/")[1];
    // const newUrlTwo = newUrlOne.replaceAll(" ", "-");
    // console.log("newurlListing", newurl);
    // const newUrlOne = newurl.replaceAll(" ", "-");

    window.history.pushState({ path: newurl }, "", newurl);
    this.setState({ modalShow: false });
  };
  closeModalNew = () => {
    this.setState({ modalShowNew: false });
  };

  // Function to show the modal
  displayModal = () => {
    this.setState({ card: true });
  };

  // Function to hide the modal
  hideModal = () => {
    this.setState({ card: false });
  };

  renderDogElement() {
    if (this.props.listing.dogs === "true") return <>Dogs,</>;
    return null;
  }

  renderCatElement() {
    if (this.props.listing.cats === "true") return <>Cats</>;
    return null;
  }

  renderPetElement() {
    if (
      this.props.listing.cats === "false" &&
      this.props.listing.dogs === "false"
    )
      return <>No Pets Allowed</>;
    return null;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      companyName: this.props.listing.companyName,
      email: this.props.listing.pmEmail,
      phone: this.props.listing.pmPhone,
      propertyType: this.props.listing.propertyType,
      address: this.props.listing.address,
      message: this.state.val,
    };
    // console.log(this.state.val, "Form was submitted, now the modal can be closed");
    axios
      .post(process.env.REACT_APP_BASE_URL + "userInquiryMail", data, {
        headers: { "content-type": "application/json" },
      })
      .then((response) => {
        this.setState({
          val: "",
          modalShowNew: false,
        });
        //  const results = response.data;
      });
    // handleClose();
  };

  renderSqrElement() {
    let regex = /\d/;
    if (regex.test(this.props.listing.squareFootage)) {
      return (
        <>
          | <b>{this.props.listing.squareFootage}</b> sqft
        </>
      );
    }
  }

  renderDepositElement() {
    let regex = /\d/;
    if (regex.test(this.props.listing.depositAmount)) {
      return <>$</>;
    }
  }

  render() {
    const { listing } = this.props;
    const staticURL = "https://rent.purepm.co/";

    return (
      <>
        <Card
          className="listing-card"
          key={this.props.key}
          onClick={(e) => this.openModal(e, this.props.listing.id)}
        >
          <Card.Img
            className="listing-image"
            variant="top"
            src={this.props.listing.photos[0]}
          />
          <Card.Body className="listing-body">
            <Container>
              <Row>
                <Col>
                  <Card.Title className="listing-price">
                    ${this.props.listing.rentAmount}
                  </Card.Title>
                  <Card.Text className="listing-details">
                    {this.props.listing.beds} Bed | {this.props.listing.baths}{" "}
                    Bath
                  </Card.Text>
                  {console.log(this.props.listing.title)}
                </Col>
                <Col>
                  <Card.Text className="listing-availability">
                    {this.props.nowavailableaa
                      ? "Now Available "
                      : "Available : "}{" "}
                    <b>
                      {this.props.nowavailableaa
                        ? ""
                        : this.props.listing.dateAvailable}
                    </b>
                  </Card.Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card.Text className="listing-details">
                    {this.props.listing.address}, {this.props.listing.city},{" "}
                    {this.props.listing.state}
                  </Card.Text>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>

        <Modal
          show={this.state.modalShow}
          onHide={this.closeModal}
          dialogClassName="listing-modal main-card"
          className="listing-modal-main"
        >
          <CardDetails key={listing?.id} listing={listing} />
        </Modal>

        <Modal
          show={this.state.modalShowNew}
          onHide={this.closeModalNew}
          dialogClassName="listing-modal-new"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className="error-report-head">
              <img
                src="/imagesreport.svg"
                width="20"
                height="auto"
                className="error-report-logo"
                alt="PurePM Logo"
              />
              Error Report
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="error-report-p">
            <p className="address">Auto-populate - property address</p>
            <p class="manager">Auto-populate - property manager</p>
          </Modal.Body>
          <Row className="g-0">
            <Form
              onSubmit={this.handleSubmit}
              id="myForm"
              className="error-report"
            >
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                {/* <Form.Label className="error-report-head"><img class="report-svg" src={reportIcon} alt="Report Icon" /><b>Error Report</b></Form.Label> */}
                <Form.Control
                  as="textarea"
                  className="text-box"
                  rows={3}
                  value={this.state.val}
                  onChange={(e) => this.setState({ val: e.target.value })}
                />
              </Form.Group>
              <Button
                className="send-button"
                variant="primary"
                type="submit"
                form="myForm"
              >
                Send
              </Button>
            </Form>
          </Row>
        </Modal>
      </>
    );
  }
}

export default Listingcard;
