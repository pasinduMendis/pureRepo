import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MarkerStyled from './MarkerStyled';
import MarkerInGroupStyled from './MarkerInGroupStyled';
import Spy from '../Spy';
import { Modal } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import logo from '../../images/logo.svg';
import Carousel from 'react-bootstrap/Carousel';
import dog from '../../images/dog.svg';
import cat from '../../images/cat.svg';
import Button from 'react-bootstrap/Button';
import CardDetails from '../../cardDetails';


class Marker extends Component {
  // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    inGroup: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      modalShow: false
    };
  }

  openModal = () => {
    this.setState({ modalShow: true });
  };

  closeModal = () => {
    this.setState({ modalShow: false });
  };


  renderDogElement() {
    if (this.props.data.dogs === 'true')
      return <img
        src={dog}
        width="40"
        height="auto"
        className="d-inline-block align-top mr-20px"
        alt="dog"
      />;
    return null;
  }

  renderCatElement() {
    if (this.props.data.cats === 'true')
      return <img
        src={cat}
        width="40"
        height="auto"
        className="d-inline-block align-top mr-20px"
        alt="cat"
      />;
    return null;
  }

  renderPetElement() {
    if (this.props.data.cats === 'false' && this.props.data.dogs === 'false')
      return <div className="modal-paragraph-sm"><b>No Pets Allowed</b></div>;
    return null;
  }


  renderSqrElement() {

    let regex = /\d/;
    if (regex.test(this.props.data.squareFootage)) {
      return <>/ {this.props.data.squareFootage} sqft</>;
    }
  }

  renderDepositElement() {

    let regex = /\d/;
    if (regex.test(this.props.data.depositAmount)) {
      return <>$</>;
    }
  }

  componentDidMount() {
    // console.log('propspopup', this.props.data)
  }


  render() {
    const { data } = this.props;
    // const staticURL = 'https://rent.purepm.co/';

    return (
      <div>
        {this.props.inGroup
          ? <MarkerInGroupStyled>
            <Spy scale="0.55" />
          </MarkerInGroupStyled>
          : <MarkerStyled onClick={this.openModal} >
            <div className="tooltiptext" onClick={this.openModal}>
              <Container>
                <Row>
                  <Col className="padding-0"><img className='toolTipImage' src={this.props.data.photos[0]} width="100%" alt="preview" /></Col>
                  <Col className="preview-column-right">
                    <h5 className="listing-preview-price">${this.props.data.rentAmount}</h5>
                    <h6 className="listing-preview-details">{this.props.data.beds} Bed | {this.props.data.baths} Bath</h6>
                  </Col>
                </Row>
              </Container>

            </div>
            <Spy scale="0.55" />
          </MarkerStyled>}
        <Modal show={this.state.modalShow} onHide={this.closeModal} dialogClassName="listing-modal">
          <CardDetails
            key={data.id}
            listing={data}
          />
          {/* <Modal.Header closeButton>
                <Modal.Title className="modal-logo"><img
                      src={logo}
                      width="136"
                      height="auto"
                      className="d-inline-block align-top"
                      alt="PurePM Logo"
                    /></Modal.Title>
                    
                </Modal.Header>
                <Modal.Body class="modal-body-full">
                  
                <Carousel fade>
                        
                        {this.props.data.photos.map(photo => (  
                              <Carousel.Item>
                              <img
                                className="d-block w-100"
                                src={photo}
                                alt="slides"
                              />
                            </Carousel.Item>
                        ))}  

                        </Carousel>
                        <div className="modal-body-content">
                        <Row>
                          <Col>
                          <h3 className="modal-title mt-4">${this.props.data.rentAmount} / {this.props.data.beds} br / {this.props.data.baths} ba { this.renderSqrElement() }</h3>
                            <h4 className="modal-subtitle">{this.props.data.title}</h4>
                          </Col>
                          <Col className="button-column">

                          <Button variant="primary" type="button" target="_blank" className="apply-button INdropdown-button" href={this.props.data.applyUrl}>Apply</Button>
                          <Button variant="primary" type="button" target="_blank" className="schedule-button INdropdown-button" href={this.props.data.btnUrl}>{this.props.data.btnText}</Button>

                          </Col>
                        </Row>
                        <p className="modal-paragraph mt-4">{this.props.data.description}</p>
                        <hr></hr>
                        <p className="modal-paragraph-sm"><b>Property Type</b> {this.props.data.propertyType}</p>
                        <hr></hr>
                        <p className="modal-paragraph-sm"><b>Address</b> {this.props.data.address}, {this.props.data.city}, {this.props.data.state} {this.props.data.zip}</p>
                        <hr></hr>
                        <p className="modal-paragraph-sm"><b>Available</b> {this.props.data.dateAvailable}</p>
                        <hr></hr>
                        <p className="modal-paragraph-sm"><b>Rent</b> ${this.props.data.rentAmount}</p>
                        <hr></hr>
                        <p className="modal-paragraph-sm"><b>Deposit</b> {this.renderDepositElement()}{this.props.data.depositAmount}</p>
                        <hr></hr>
                        <p className="modal-paragraph-sm"><b>Listing Agent</b> {this.props.data.companyName}</p>
                        <hr></hr>
                        <p className="modal-paragraph-sm"><b>Application Fee</b> ${this.props.data.applicationFee}</p>
                        <hr></hr>
                        <Col className="modal-icons">

                        { this.renderDogElement() }

                        { this.renderCatElement() }

                        { this.renderPetElement() }
                        
                        </Col>
                        
                      </div>
                </Modal.Body>      */}
        </Modal>
      </div>
    );
  }
}

Marker.propTypes = {
  inGroup: PropTypes.bool,
};

export default Marker;
