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
import logo from "../public/images/logo.svg";
import axios from "axios";
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

class CardDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUrl: window.location.href,

      // props: this.props
    };
  }

  componentDidMount() {}

  componentDidMount() {
    const { listing } = this.props;
    const imagePromises = [];

    // Preload all images
    listing.photos.slice(1).forEach((photo) => {
      const img = new Image();
      img.src = photo;

      const promise = new Promise((resolve) => {
        img.onload = () => {
          resolve(img);
        };
      });

      imagePromises.push(promise);
    });

    // Wait for all images to load
    Promise.all(imagePromises).then((loadedImages) => {
      this.setState({
        imagesLoaded: true,
        imageElements: loadedImages,
      });
    });
  }

  openModal = (e, id) => {
    var newurl = window.location.pathname + "?locationID=" + id;
    const newUrlOne = newurl.replaceAll(" ", "-");
    window.history.pushState({ path: newUrlOne }, "", newUrlOne);
    this.setState({ modalShow: true });
  };
  openModalNew = (e, id) => {
    // var newurl = window.location.pathname + '?locationID=' + id;
    // const newUrlOne = newurl.replaceAll(" ", "-");
    // window.history.pushState({ path: newUrlOne }, '', newUrlOne);
    this.setState({ modalShowNew: true });
  };
  closeModal = () => {
    var newurl = window.location.pathname;
    const newUrlOne = newurl.replaceAll(" ", "-");
    window.history.pushState({ path: newUrlOne }, "", newUrlOne);
    this.setState({ modalShow: false });
  };
  closeModalNew = () => {
    // var newurl = window.location.pathname;
    // const newUrlOne = newurl.replaceAll(" ", "-");
    // window.history.pushState({ path: newUrlOne }, '', newUrlOne);
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

  renderSqrElementMeta() {
    let regex = /\d/;
    if (regex.test(this.props.listing.squareFootage)) {
      return `${this.props.listing.squareFootage} sqft`;
    }
  }

  renderDepositElement() {
    let regex = /\d/;
    if (regex.test(this.props.listing.depositAmount)) {
      return <>$</>;
    }
  }

  render() {
    const currentUrl = window.location.href;
    const { imagesLoaded, imageElements } = this.state;

    const { listing } = this.props;

    // const linkedinShareLink = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(currentUrl)}`;

    return (
      <>
        <title>{`${listing.address} ${listing.city} ${listing.state} ${listing.zip}`}</title>
        <meta
          name="description"
          content={`${listing.beds} br | ${
            listing.baths
          } ba ${this.renderSqrElementMeta()}`}
        />
        <meta property="og:image" content={listing.photos[0]} />

        <Row className="g-0">
          <Col lg="5" className="modal-left">
            <Modal.Header closeButton>
              <Modal.Title className="modal-logo">
                <img
                  src="./images/logo.svg"
                  width="98"
                  height="auto"
                  className="d-inline-block align-top"
                  alt="PurePM Logo"
                />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body class="modal-body-full">
              <div className="modal-body-content">
                <h3 className="modal-title">
                  <span className="price">
                    ${this.props.listing.rentAmount}{" "}
                  </span>{" "}
                  <b>{this.props.listing.beds}</b> br |{" "}
                  <b>{this.props.listing.baths}</b> ba {this.renderSqrElement()}
                </h3>
                <h3 className="modal-title mt-0">
                  {this.props.listing.address}, {this.props.listing.city},{" "}
                  {this.props.listing.state} {this.props.listing.zip}
                </h3>
                <h4 className="modal-subtitle">
                  {this.props.listing.companyName}
                </h4>

                <div className="button-column">
                  <Button
                    variant="primary"
                    type="button"
                    target="_blank"
                    className="apply-button INdropdown-button"
                    href={this.props.listing.applyUrl}
                  >
                    <b>Apply</b>
                  </Button>
                  <Button
                    variant="primary"
                    type="button"
                    target="_blank"
                    className="schedule-button"
                    href={this.props.listing.btnUrl}
                  >
                    <b>{this.props.listing.btnText}</b>
                  </Button>
                  {/* <Button variant="primary" type="button" className="" onClick={(e) => this.openModalNew(e, this.props.listing.id)}><b>Send</b></Button> */}
                  <Button
                    variant="primary"
                    type="button"
                    className="share-button"
                    onClick={this.displayModal}
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                    <b>Share</b>{" "}
                    <img
                      src="./images/share.svg"
                      className="share"
                      alt="PurePM Logo"
                    />
                  </Button>

                  <Modal
                    className="social-media-share"
                    show={this.state.card}
                    onHide={this.hideModal}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title className="share-the-property">
                        <img
                          src="./images/share.svg"
                          className="share"
                          alt="PurePM Logo"
                        />
                        Share The Property
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="social-media-item">
                      <FacebookShareButton url={this.state.currentUrl}>
                        <FacebookIcon size={40} round={true} />
                      </FacebookShareButton>

                      <LinkedinShareButton
                        className="social-media-button"
                        url={this.state.currentUrl}
                      >
                        <LinkedinIcon size={40} round={true} />
                      </LinkedinShareButton>
                      {/* <a href={linkedinShareLink} target="_blank" rel="noopener noreferrer">Share on LinkedIn</a> */}

                      <EmailShareButton
                        className="social-media-button"
                        url={this.state.currentUrl}
                      >
                        <EmailIcon size={40} round={true} />
                      </EmailShareButton>
                    </Modal.Body>
                    {/* <Modal.Footer>
                        <Button variant="secondary" onClick={this.hideModal}>
                          Close
                        </Button>
                      </Modal.Footer> */}
                  </Modal>
                </div>

                <Row className="property-details g-0">
                  <Col ls="8">
                    <p className="modal-paragraph-sm ">
                      <b>Property Type</b> {this.props.listing.propertyType}
                    </p>
                    <p className="modal-paragraph-sm">
                      <b>
                        {this.props.nowavailableaa
                          ? "Now Available"
                          : "Available"}
                      </b>{" "}
                      {this.props.nowavailableaa
                        ? ""
                        : this.props.listing.dateAvailable}
                    </p>
                    <p className="modal-paragraph-sm">
                      <b>Rent</b> ${this.props.listing.rentAmount}
                    </p>
                  </Col>
                  <Col ls="r">
                    <p className="modal-paragraph-sm">
                      <b>Deposit</b> {this.renderDepositElement()}
                      {this.props.listing.depositAmount}
                    </p>
                    <p className="modal-paragraph-sm">
                      <b>Application Fee</b> $
                      {this.props.listing.applicationFee}
                    </p>
                    <p className="modal-paragraph-sm">
                      <b>Pets</b> {this.renderDogElement()}{" "}
                      {this.renderCatElement()} {this.renderPetElement()}
                    </p>
                  </Col>
                </Row>

                <p className="modal-paragraph paragraph-title">
                  <b>{this.props.listing.title}</b>
                </p>
                <p className="modal-paragraph mt-4">
                  {this.props.listing.description}
                </p>

                <div className="report-section">
                  <Button
                    variant="primary"
                    type="button"
                    className="report-button"
                    onClick={(e) => this.openModalNew(e, this.props.listing.id)}
                  >
                    <img
                      class="report-svg"
                      src="./images/report.svg"
                      alt="Report Icon"
                    />
                    <b>Report an error on this listing</b>
                  </Button>

                  <Modal
                    show={this.state.modalShowNew}
                    onHide={this.closeModalNew}
                    dialogClassName="listing-modal-new"
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title className="error-report-head">
                        <img
                          src="./images/report.svg"
                          width="20"
                          height="auto"
                          className="error-report-logo"
                          alt="Error Report"
                        />
                        Error Report
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="error-report-p">
                      <p className="address">
                        {this.props.listing.address}, {this.props.listing.city},{" "}
                        {this.props.listing.state} {this.props.listing.zip}
                      </p>
                      <p class="manager">{this.props.listing.companyName}</p>
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
                            placeholder="Let us know what you believe to be an error."
                            as="textarea"
                            className="text-box"
                            rows={3}
                            value={this.state.val}
                            onChange={(e) =>
                              this.setState({ val: e.target.value })
                            }
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
                </div>
              </div>
            </Modal.Body>
          </Col>
          <Col lg="7" className="modal-right">
            {console.log("props", this.props)}
            <Gallery>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "100%",
                  gridGap: 12,
                  justifyItems: "stretch",
                  marginBottom: "12px",
                }}
              >
                {this.props.listing?.photos?.length === 0 && (
                  <div className="no-photo">
                    <h2 className="no-photo-txt">No Property Photos</h2>
                  </div>
                )}
                {listing.photos.length > 0 &&
                  (() => {
                    // Pre-load the first image to get its natural width and height
                    const img = new Image();
                    img.src = listing.photos[0];

                    // Calculate the desired width and height
                    const desiredWidth = 600;
                    const aspectRatio = img.height / img.width;
                    const calculatedHeight = Math.round(
                      desiredWidth * aspectRatio
                    );

                    // Clear width and height ratios for the next image
                    img.width = 0;
                    img.height = 0;

                    return (
                      <Item
                        original={listing.photos[0]}
                        thumbnail={listing.photos[0]}
                        width={desiredWidth}
                        height={calculatedHeight}
                      >
                        {({ ref, open }) => (
                          <img
                            ref={ref}
                            onClick={open}
                            src={listing.photos[0]}
                            style={{
                              borderRadius: "4px",
                            }}
                          />
                        )}
                      </Item>
                    );
                  })()}
              </div>

              {listing.photos.length > 1 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "calc(50% - 6px) calc(50% - 6px)",
                    gridGap: 12,
                    justifyItems: "stretch",
                  }}
                >
                  {listing.photos.slice(1).map((photo, index) => {
                    // You can pre-load the image to get its natural width and height
                    const img = new Image();
                    img.src = photo;

                    // Calculate the height based on a desired width (e.g., 600)
                    const desiredWidth = 600;
                    const aspectRatio = img.height / img.width;
                    const calculatedHeight = Math.round(
                      desiredWidth * aspectRatio
                    );

                    // Clear width and height ratios for the next image
                    img.width = 0;
                    img.height = 0;

                    return (
                      <Item
                        key={index}
                        original={photo}
                        thumbnail={photo}
                        width={desiredWidth}
                        height={calculatedHeight}
                      >
                        {({ ref, open }) => (
                          <img
                            ref={ref}
                            onClick={open}
                            src={photo}
                            style={{
                              borderRadius: "4px",
                            }}
                          />
                        )}
                      </Item>
                    );
                  })}
                </div>
              )}
            </Gallery>
          </Col>
        </Row>
      </>
    );
  }
}

export default CardDetails;
