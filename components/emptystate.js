import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

class EmptyState extends React.Component {
    render(){
    return (
        <Container className="empty-state-bg">
            <Row>
                <Col>
                <h3 className="empty-state-title">Search above to view rental listings</h3>
                
                </Col>
            </Row>
        </Container>
    );
}
};

export default EmptyState;