import React, { Component } from 'react';
import Row from "react-bootstrap/esm/Row";
import Container from 'react-bootstrap/Container';
import { Modal } from "react-bootstrap";
import Col from 'react-bootstrap/Col';


class ReferenceLinks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        };
    }

    // Function to open the modal
    openModal = () => {
        this.setState({ showModal: true });
    }

    // Function to close the modal
    closeModal = () => {
        this.setState({ showModal: false });
    }

    render() {
        return (
            <div>

                <Modal.Body className="grid-example" >
                    <Container>
                        <Row >
                            <Col className='city-col' xs={12} md={3}>

                                <p className='state-in-america'>Alabama</p>
                                <a className='city-link' href="https://al.purepm.co/" target="_blank">Birmingham</a>
                                <a className='city-link' href="https://al.purepm.co/" target="_blank">Huntsville</a>
                                <a className='city-link' href="https://al.purepm.co/" target="_blank">Montgomery</a>
                                <a className='city-link' href="https://al.purepm.co/" target="_blank">Tuscaloosa</a>

                                <p className='state-in-america'>ARIZONA</p>
                                <a className='city-link' href="https://az.purepm.co/" target="_blank">Flagstaff</a>
                                <a className='city-link' href="https://az.purepm.co/" target="_blank">Phoenix-Scottsdale</a>

                                <p className='state-in-america'>CALIFORNIA</p>
                                <p className='state-province'>NORTHERN CALIFORNIA</p>
                                <a className='city-link' href="https://antioch.purepm.co/" target="_blank">Antioch</a>
                                <a className='city-link' href="https://chico.purepm.co/" target="_blank">Chico-Oroville</a>
                                <a className='city-link' href="https://northbay.purepm.co/" target="_blank">Petaluma</a>
                                <a className='city-link' href="https://sacramento.purepm.co/" target="_blank">Roseville</a>
                                <a className='city-link' href="https://sacramento.purepm.co/" target="_blank">Sacramento</a>
                                <a className='city-link' href="https://northbay.purepm.co/" target="_blank">San Francisco</a>
                                <a className='city-link' href="https://siliconvalley.purepm.co/" target="_blank">Santa Cruz</a>
                                <a className='city-link' href="https://northbay.purepm.co/" target="_blank">Santa Rosa</a>
                                <a className='city-link' href="https://siliconvalley.purepm.co/" target="_blank">Silicon Valley</a>
                                <a className='city-link' href="https://northbay.purepm.co/" target="_blank">Ukiah</a>




                            </Col>
                            <Col className='city-col' xs={12} md={3}>
                                <p className='state-province'>SOUTHERN CALIFORNIA</p>
                                <a className='city-link' href="https://sandiego.purepm.co/" target="_blank">Chula Vista</a>
                                <a className='city-link' href="https://www.pinnaclepmc.com/" target="_blank">Los Angeles</a>
                                <a className='city-link' href="https://orangecounty.purepm.co/" target="_blank">Orange County</a>
                                <a className='city-link' href="https://sandiego.purepm.co/" target="_blank">San Diego</a>
                                <a className='city-link' href="https://temecula.purepm.co/" target="_blank">Temecula</a>

                                <p className='state-in-america'>COLORADO</p>
                                <a className='city-link' href="https://www.co.purepm.co/" target="_blank">Denver</a>

                                <p className='state-in-america'>FLORIDA</p>
                                <a className='city-link' href="https://fl.purepm.co/" target="_blank">Bonita Springs</a>
                                <a className='city-link' href="https://fl.purepm.co/" target="_blank">Ocala</a>

                                <p className='state-in-america'>GEORGIA</p>
                                <a className='city-link' href="https://ga.purepm.co/" target="_blank">Atlanta</a>
                                <a className='city-link' href="https://ga.purepm.co/" target="_blank">Augusta</a>

                                <p className='state-in-america'>IOWA</p>
                                <a className='city-link' href="https://ne.purepm.co/" target="_blank">Missouri Valley</a>

                                <p className='state-in-america'>KANSAS</p>
                                <a className='city-link' href="https://ks.purepm.co/" target="_blank">Kansas City</a>
                                <a className='city-link' href="https://ks.purepm.co/" target="_blank">Topeka</a>




                            </Col>
                            <Col className='city-col' xs={12} md={3}>
                                <p className='state-in-america'>KENTUCKY</p>
                                <a className='city-link' href="https://ky.purepm.co/" target="_blank">Lexington</a>

                                <p className='state-in-america'>MINNESOTA</p>
                                <a className='city-link' href="https://mn.purepm.co/" target="_blank">Twin Cities</a>

                                <p className='state-in-america'>MISSOURI</p>
                                <a className='city-link' href="https://ks.purepm.co/" target="_blank">Kansas City</a>

                                <p className='state-in-america'>NEBRASKA</p>
                                <a className='city-link' href="https://ne.purepm.co/" target="_blank">Omaha</a>

                                <p className='state-in-america'>NEVADA</p>
                                <a className='city-link' href="https://nv.purepm.co/" target="_blank">Las Vegas</a>

                                <p className='state-in-america'>NEW MEXICO</p>
                                <a className='city-link' href="https://nm.purepm.co/" target="_blank">Albuquerque</a>
                                <a className='city-link' href="https://nm.purepm.co/" target="_blank">Farmington</a>

                                <p className='state-in-america'>NORTH CAROLINA</p>
                                <a className='city-link' href="https://nc.purepm.co/" target="_blank">Asheville</a>
                                <a className='city-link' href="https://nc.purepm.co/" target="_blank">Charlotte</a>


                                <p className='state-in-america'>OKLAHOMA</p>
                                <a className='city-link' href="https://www.ok.purepm.co/" target="_blank">Oklahoma City</a>

                                <p className='state-in-america'>OREGON</p>
                                <a className='city-link' href="https://or.purepm.co/" target="_blank">Portland</a>
                            </Col>
                            <Col className='city-col' xs={12} md={3}>

                                <p className='state-in-america'>SOUTH CAROLINA</p>
                                <a className='city-link' href="https://sc.purepm.co/" target="_blank">Charleston</a>
                                <a className='city-link' href="https://sc.purepm.co/" target="_blank">Columbia</a>

                                <p className='state-in-america'>TENNESSEE</p>
                                <a className='city-link' href="https://tn.purepm.co/" target="_blank">Nashville</a>

                                <p className='state-in-america'>TEXAS</p>
                                <a className='city-link' href="https://tx.purepm.co/" target="_blank">Austin</a>
                                <a className='city-link' href="https://frontlineproperty.com/" target="_blank">Dallas</a>
                                <a className='city-link' href="https://frontlineproperty.com/" target="_blank">Fort Worth</a>
                                <a className='city-link' href="https://tx.purepm.co/" target="_blank">Round Rock</a>

                                <p className='state-in-america'>WASHINGTON</p>
                                <a className='city-link' href="https://bellingham.purepm.co/" target="_blank">Bellingham</a>
                                <a className='city-link' href="https://tacoma.purepm.co/" target="_blank">Seattle</a>
                                <a className='city-link' href="https://tacoma.purepm.co/    " target="_blank">Tacoma</a>

                                <p className='state-in-america'>WISCONSIN</p>
                                <a className='city-link' href="https://mn.purepm.co/" target="_blank">Western Wisconsin</a>

                            </Col>
                        </Row>


                    </Container>
                </Modal.Body>

            </div>
        );
    }
}

export default ReferenceLinks;
