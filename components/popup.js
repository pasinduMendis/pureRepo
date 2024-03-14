import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Card } from "react-bootstrap";

class Popup extends React.Component {
  render() {
    return <Card className="listing-card" key={this.props.listing.id}></Card>;
  }
}

export default Popup;
