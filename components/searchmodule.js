// import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import Navbar from "react-bootstrap/Navbar";
import { Modal } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import MenuNew from "./menu";
import TypeAheadDropDown from "./TypeAheadDropDown";
import DatePicker from "react-datepicker";
import makeAnimated from "react-select/animated";
// import Select, { components } from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import React, { useState } from "react";
import Select from "react-select";
import ReferenceLinks from "./referenceLinks";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const options = [
  { value: "1", label: "1 mile" },
  { value: "5", label: "5 miles" },
  { value: "10", label: "10 miles" },
  { value: "20", label: "20 miles" },
  { value: "30", label: "30 miles" },
  { value: "50", label: "50 miles" },
];

const animatedComponents = makeAnimated();

// const Option = (props) => {
//     return (
//       <div>
//         <components.Option {...props}>
//           <input
//             type="checkbox"
//             checked={props.isSelected}
//             onChange={() => null}
//           />{" "}
//           <label>{props.label}</label>
//         </components.Option>
//       </div>
//     );
// }

export const colourOptions = [
  { value: "Single Family", label: "Single Family", color: "#00B8D9" },
  { value: "Townhouse", label: "Townhouse", color: "#0052CC" },
  { value: "Apartment Unit", label: "Apartment Unit", color: "#5243AA" },
  { value: "Condo Unit", label: "Condo Unit", color: "#FF5630" },
  { value: "Not Mentioned", label: "Not Mentioned", color: "#FF8B00" },
];

// import axios from 'axios';
// import SearchResult from './searchresult';

const SearchModule = ({
  onSearchChange,
  handleChangeRedioBtn,
  handleChangeRedioBtnBat,
  handleOndateChange,
  selectedValue,
  searchValue,
  selectedValueInput,
  selectedMinNuValueInput,
  selectedMaxNuValueInput,
  onSearchMaxNuChange,
  onSearchMinNuChange,
  onButtonclick,
  selectedBedCount,
  onButtonclickBedAndBath,
  onButtonclickDate,
  dropdownClose,
  dropdownOpen,
  dropdownCloseOne,
  dropdownOpenOne,
  dropdownCloseTwo,
  dropdownOpenTwo,
  dropdownCloseTree,
  dropdownOpenTree,
  handleChangeRedioBtnDogs,
  selecteddogs,
  handleChangeRedioBtnCats,
  selectedCats,
  onButtonclickPets,
  navCloseModal,
  navmodalShow,
  navopenModal,
  mobileSubmit,
  selectedBathCount,
  handleClickOutside,
  onSearchBluur,
  arrayIndex,
  onCloseButtonclick,
  handleBackspace,
  onTextChange,
  handleDropdownToggleaaa,
  onTextBlur,
  selectedDatetemp,
  dropdownCloseTreeAA,
  dropdownOpenTreeAA,
  handleChangeTypes,
  handleChangeAllTypes,
  selectedTpyeAll,
  selectedTpyeHometype1,
  selectedTpyeHometype2,
  selectedTpyeHometype3,
  selectedTpyeHometype4,
  onButtonclickType,
  allChecked,
  renderList,
  dropdownOpenFour,
  dropdownCloseFour,
  handleDistancePress,
  dropdownCloseDistance,
  dropdownOpenDistance,
  onDistanceChange,
  selectedDistnaceInput,
  onDistanceCloseButtonclick,
}) => {
  var searchMinPrice = [
    "0",
    "200",
    "400",
    "600",
    "800",
    "1000",
    "1200",
    "1400",
    "1600",
    "1800",
  ];
  var searchMaxPrice = [
    "400",
    "600",
    "800",
    "1000",
    "1200",
    "1400",
    "1600",
    "1800",
    "2000",
    "2500",
    "3000",
    "3500",
    "4000",
    "4500",
    "No max",
  ];
  var distanceList = ["1", "5", "10", "20", "30", "50"];

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="search-module">
      <Form>
        <Row className="desktop desktop-filterbar">
          <Col className="col-auto">
            <TypeAheadDropDown
              iteams={arrayIndex}
              defaultSelected={selectedValueInput}
              onTextChange={onSearchChange}
              onTextBlur={onTextBlur}
              className="search-bar"
            />
            {/* <Typeahead
                        id="basic-typeahead-single"
                        labelKey="name"
                        onChange={onSearchChange}
                        onKeyDown={handleBackspace}
                        options={(arrayIndex) ? arrayIndex : []}
                        newSelectionPrefix="Add a new item: "
                        renderMenu={(results, menuProps) => (
                            <MenuNew results={arrayIndex} menuProps={menuProps}></MenuNew>
                        )}
                        placeholder="Search Address, City, State, Zip Code"
                        selected={(selectedValueInput) ? selectedValueInput : []}
                        defaultSelected={(selectedValueInput) ? selectedValueInput : []}
                    /> */}
          </Col>

          <Col className="col-auto">
            <Dropdown
              className="d-inline"
              show={dropdownCloseDistance}
              onToggle={dropdownOpenDistance}
            >
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic-distance"
                className="dropdown_btn"
              >
                Distance
              </Dropdown.Toggle>
              <Dropdown.Menu className="distance-dropdown">
                <Container>
                  <Form.Text className="dropdown-title">
                    Select the Distance
                  </Form.Text>
                  <Row>
                    <Col>
                      <Typeahead
                        id="basic-typeahead-distance"
                        labelKey="distnacekey"
                        onChange={onDistanceChange}
                        options={distanceList}
                        placeholder=""
                        selected={
                          selectedDistnaceInput ? selectedDistnaceInput : []
                        }
                        minLength={0}
                        defaultSelected={
                          selectedDistnaceInput ? selectedDistnaceInput : []
                        }
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col>
                      <Button
                        variant="primary"
                        type="button"
                        className="INdropdown-button"
                        onClick={handleDistancePress}
                      >
                        Apply
                      </Button>
                      <Button
                        variant="secondary"
                        type="button"
                        className="INdropdown-button-close"
                        onClick={onDistanceCloseButtonclick}
                      >
                        Close
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col className="col-auto">
            <Dropdown
              className="d-inline"
              show={dropdownClose}
              onToggle={dropdownOpen}
            >
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic1"
                className="dropdown_btn"
              >
                Price
              </Dropdown.Toggle>

              <Dropdown.Menu className="price-dropdown">
                <Container>
                  <Form.Text className="dropdown-title">Price Range</Form.Text>
                  <Row>
                    <Col>
                      {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Control type="number" value={selectedMinNuValueInput} onChange={onSearchMinNuChange} name="minNumber" placeholder="Min" />    
                                            </Form.Group>	 */}

                      <Typeahead
                        id="basic-typeahead-price"
                        labelKey="ssss"
                        onChange={onSearchMinNuChange}
                        options={searchMinPrice}
                        placeholder="Min"
                        selected={
                          selectedMinNuValueInput ? selectedMinNuValueInput : []
                        }
                        minLength={0}
                        defaultSelected={
                          selectedMinNuValueInput ? selectedMinNuValueInput : []
                        }
                      />
                    </Col>
                    <Col>
                      {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Control type="number" value={selectedMaxNuValueInput} onChange={onSearchMaxNuChange} name="maxNumber" placeholder="Max" />    
                                            </Form.Group> */}

                      <Typeahead
                        id="basic-typeahead-price"
                        labelKey="ssss"
                        onChange={onSearchMaxNuChange}
                        options={searchMaxPrice}
                        placeholder="Max"
                        selected={
                          selectedMaxNuValueInput ? selectedMaxNuValueInput : []
                        }
                        minLength={0}
                        className="max-value-dropdown"
                        defaultSelected={
                          selectedMaxNuValueInput ? selectedMaxNuValueInput : []
                        }
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col>
                      <Button
                        variant="primary"
                        type="button"
                        className="INdropdown-button"
                        onClick={onButtonclick}
                      >
                        Apply
                      </Button>
                      <Button
                        variant="secondary"
                        type="button"
                        className="INdropdown-button-close"
                        onClick={onCloseButtonclick}
                      >
                        Close
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col className="col-auto">
            <Dropdown
              className="d-inline"
              show={dropdownCloseOne}
              onToggle={dropdownOpenOne}
            >
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic2"
                className="dropdown_btn"
                name="bedandbaths"
              >
                Beds & Baths
              </Dropdown.Toggle>

              <Dropdown.Menu className="bb-dropdown">
                <Container>
                  <Row>
                    <Form.Text className="dropdown-title">Bedrooms</Form.Text>

                    <div key="inline-radio3" className="mb-3">
                      <Form.Check
                        inline
                        label="Any"
                        name="group1"
                        type="radio"
                        value="0"
                        id="inline-radio-1"
                        checked={selectedBedCount === "0"}
                        onChange={handleChangeRedioBtn}
                      />
                      <Form.Check
                        inline
                        label="1+"
                        name="group1"
                        type="radio"
                        value="0.9"
                        id="inline-radio-2"
                        checked={selectedBedCount === "0.9"}
                        onChange={handleChangeRedioBtn}
                      />
                      <Form.Check
                        inline
                        label="2+"
                        name="group1"
                        type="radio"
                        value="1.9"
                        id="inline-radio-3"
                        checked={selectedBedCount === "1.9"}
                        onChange={handleChangeRedioBtn}
                      />
                      <Form.Check
                        inline
                        label="3+"
                        name="group1"
                        type="radio"
                        value="2.9"
                        id="inline-radio-4"
                        checked={selectedBedCount === "2.9"}
                        onChange={handleChangeRedioBtn}
                      />
                      <Form.Check
                        inline
                        label="4+"
                        name="group1"
                        type="radio"
                        value="3.9"
                        id="inline-radio-5"
                        checked={selectedBedCount === "3.9"}
                        onChange={handleChangeRedioBtn}
                      />
                    </div>

                    <Form.Text className="dropdown-title">Bathrooms</Form.Text>

                    <div key="inline-radio4" className="mb-3">
                      <Form.Check
                        inline
                        label="Any"
                        name="groupBathrooms1"
                        value="0"
                        type="radio"
                        id="inline-radio7"
                        onChange={handleChangeRedioBtnBat}
                        checked={selectedBathCount === "0"}
                      />
                      <Form.Check
                        inline
                        label="1+"
                        value="0.9"
                        name="groupBathrooms1"
                        type="radio"
                        id="inline-radio2"
                        onChange={handleChangeRedioBtnBat}
                        checked={selectedBathCount === "0.9"}
                      />
                      <Form.Check
                        inline
                        label="2+"
                        value="1.9"
                        name="groupBathrooms1"
                        type="radio"
                        id="inline-radio3"
                        onChange={handleChangeRedioBtnBat}
                        checked={selectedBathCount === "1.9"}
                      />
                      <Form.Check
                        inline
                        label="3+"
                        value="2.9"
                        name="groupBathrooms1"
                        type="radio"
                        id="inline-radio4"
                        onChange={handleChangeRedioBtnBat}
                        checked={selectedBathCount === "2.9"}
                      />
                      <Form.Check
                        inline
                        label="4+"
                        value="3.9"
                        name="groupBathrooms1"
                        type="radio"
                        id="inline-radio5"
                        onChange={handleChangeRedioBtnBat}
                        checked={selectedBathCount === "3.9"}
                      />
                    </div>
                  </Row>
                  <Row style={{ marginTop: "16px" }}>
                    <Col>
                      <Button
                        variant="primary"
                        type="button"
                        className="INdropdown-button"
                        onClick={onButtonclickBedAndBath}
                      >
                        Apply
                      </Button>
                      <Button
                        variant="secondary"
                        type="button"
                        className="INdropdown-button-close"
                        onClick={onCloseButtonclick}
                      >
                        Close
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col className="col-auto">
            <Dropdown
              className="d-inline"
              show={dropdownCloseTreeAA}
              onToggle={dropdownOpenTreeAA}
            >
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic4-one"
                className="dropdown_btn dropdown-toggle btn btn-success"
                name="typeP"
              >
                Home Type
              </Dropdown.Toggle>
              <Dropdown.Menu className="dogscats-dropdown">
                <Container>
                  <Row>
                    <Form.Text className="dropdown-title">Home Type</Form.Text>
                    <div className="home-types">
                      <div>
                        <input
                          type="checkbox"
                          name="checkAll"
                          checked={allChecked}
                          onChange={handleChangeAllTypes}
                        />
                        Check All
                      </div>
                      {renderList}
                    </div>
                  </Row>
                  <Row style={{ marginTop: "16px" }}>
                    <Col>
                      <Button
                        variant="primary"
                        type="button"
                        className="INdropdown-button"
                        onClick={onButtonclickType}
                      >
                        Apply
                      </Button>
                      <Button
                        variant="secondary"
                        type="button"
                        className="INdropdown-button-close"
                        onClick={onCloseButtonclick}
                      >
                        Close
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col className="col-auto">
            <Dropdown
              className="d-inline"
              show={dropdownCloseTwo}
              onToggle={dropdownOpenTwo}
            >
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic3"
                className="dropdown_btn"
                name="moveIDate"
              >
                Move-In Date
              </Dropdown.Toggle>

              <Dropdown.Menu className="date-dropdown">
                <Container>
                  <Row>
                    <Form.Group controlId="doj1">
                      <Form.Text className="dropdown-title">
                        Select Date
                      </Form.Text>
                      <p className="dropdown-description">
                        Select a date to view listings available on or before
                        this date.
                      </p>
                      <DatePicker
                        selected={selectedDatetemp}
                        onChange={(date) => handleOndateChange(date)}
                        minDate={new Date("2000-01-01")}
                        maxDate={new Date("2999-01-01")}
                        onKeyDown={(e) => e.preventDefault()}
                        dateFormat="MM|dd|yyyy"
                        className="date-picker"
                        calendarClassName="calendar-icon"
                      />
                      {/* <Form.Control 
                                            type="date" 
                                            name="doj1" 
                                            defaultValue={selectedValue} 
                                            placeholder="Move-In Date" 
                                            onChange={handleOndateChange}
                                            style={{marginBottom:"16px"}}
                                            max="2999-01-02"
                                            min="2000-01-02"
                                            onKeyDown={e => e.preventDefault()}
                                            
                                            
                                            /> */}
                    </Form.Group>
                  </Row>
                  <Row style={{ marginTop: "16px" }}>
                    <Col>
                      <Button
                        variant="primary"
                        type="button"
                        className="INdropdown-button"
                        onClick={onButtonclickDate}
                      >
                        Apply
                      </Button>
                      <Button
                        variant="secondary"
                        type="button"
                        className="INdropdown-button-close"
                        onClick={onCloseButtonclick}
                      >
                        Close
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col className="col-auto">
            <Dropdown
              className="d-inline"
              show={dropdownCloseTree}
              onToggle={dropdownOpenTree}
            >
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic4"
                className="dropdown_btn"
                name="petA"
              >
                Pets
              </Dropdown.Toggle>
              <Dropdown.Menu className="dogscats-dropdown">
                <Container>
                  <Row>
                    <Col className="catsdogs-toggles">
                      <BootstrapSwitchButton
                        onlabel="Allows Dogs"
                        offlabel="Allows Dogs"
                        onChange={handleChangeRedioBtnDogs}
                        checked={selecteddogs === true}
                      />
                      <div style={{ padding: "8px" }}></div>
                      <BootstrapSwitchButton
                        onlabel="Allows Cats"
                        offlabel="Allows Cats"
                        onChange={handleChangeRedioBtnCats}
                        checked={selectedCats === true}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "16px" }}>
                    <Col>
                      <Button
                        variant="primary"
                        type="button"
                        className="INdropdown-button"
                        onClick={onButtonclickPets}
                      >
                        Apply
                      </Button>
                      <Button
                        variant="secondary"
                        type="button"
                        className="INdropdown-button-close"
                        onClick={onCloseButtonclick}
                      >
                        Close
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Form>

      <Row className="mobile">
        <Col className="mobile-logo col-4">
          <Navbar.Brand href="https://www.purepm.co/">
            <img
              src="/imageslogo.svg"
              width="90"
              height="auto"
              className="d-inline-block align-top"
              alt="PurePM Logo"
            />
          </Navbar.Brand>
        </Col>
        {/* <Col className="col-6">
                    <TypeAheadDropDown iteams={arrayIndex} defaultSelected={selectedValueInput} onTextChange={onSearchChange} className="search-bar" />
                </Col> */}

        <Navbar.Brand
          className="location-col col-4 flex-center"
          onClick={handleShowModal}
        >
          <Button className="location-button">PURE Locations</Button>
        </Navbar.Brand>

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

        <Col className="hamburger-menu col-4">
          <img
            src="/imageshamburger.svg"
            width="30"
            height="auto"
            className="d-inline-block align-center"
            alt="Menu Icon"
            onClick={navopenModal}
          />

          <Modal
            show={navmodalShow}
            onHide={navCloseModal}
            dialogClassName="listing-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title className="modal-logo">Filters</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Form.Text className="dropdown-title">Distance</Form.Text>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Typeahead
                      id="basic-typeahead-distance"
                      labelKey="distnacekey"
                      onChange={onDistanceChange}
                      options={distanceList}
                      placeholder=""
                      selected={
                        selectedDistnaceInput ? selectedDistnaceInput : []
                      }
                      minLength={0}
                      defaultSelected={
                        selectedDistnaceInput ? selectedDistnaceInput : []
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Form.Text className="dropdown-title">Price Range</Form.Text>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Typeahead
                      id="basic-typeahead-price"
                      labelKey="ssss"
                      onChange={onSearchMinNuChange}
                      options={searchMinPrice}
                      placeholder="Min"
                      selected={
                        selectedMinNuValueInput ? selectedMinNuValueInput : []
                      }
                      minLength={0}
                      defaultSelected={
                        selectedMinNuValueInput ? selectedMinNuValueInput : []
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Typeahead
                      id="basic-typeahead-price"
                      labelKey="ssss"
                      onChange={onSearchMaxNuChange}
                      options={searchMaxPrice}
                      placeholder="Max"
                      selected={
                        selectedMaxNuValueInput ? selectedMaxNuValueInput : []
                      }
                      minLength={0}
                      defaultSelected={
                        selectedMaxNuValueInput ? selectedMaxNuValueInput : []
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Form.Text className="dropdown-title">Bedrooms</Form.Text>

                <div key="inline-radio1" className="mb-3">
                  <Form.Check
                    inline
                    label="Any"
                    name="group1"
                    type="radio"
                    value="0"
                    id="inline-radio-1"
                    onChange={handleChangeRedioBtn}
                    checked={selectedBedCount === "0"}
                  />
                  <Form.Check
                    inline
                    label="1+"
                    name="group2"
                    type="radio"
                    value="0.9"
                    id="inline-radio-2"
                    onChange={handleChangeRedioBtn}
                    checked={selectedBedCount === "0.9"}
                  />
                  <Form.Check
                    inline
                    label="2+"
                    name="group1"
                    type="radio"
                    value="1.9"
                    id="inline-radio-3"
                    onChange={handleChangeRedioBtn}
                    checked={selectedBedCount === "1.9"}
                  />
                  <Form.Check
                    inline
                    label="3+"
                    name="group12"
                    type="radio"
                    value="2.9"
                    id="inline-radio-4"
                    onChange={handleChangeRedioBtn}
                    checked={selectedBedCount === "2.9"}
                  />
                  <Form.Check
                    inline
                    label="4+"
                    name="group11"
                    type="radio"
                    value="3.9"
                    id="inline-radio-5"
                    onChange={handleChangeRedioBtn}
                    checked={selectedBedCount === "3.9"}
                  />
                </div>

                <Form.Text className="dropdown-title">Bathrooms</Form.Text>

                <div key="inline-radio2" className="mb-3">
                  <Form.Check
                    inline
                    label="Any"
                    name="groupBathrooms1"
                    value="0"
                    type="radio"
                    id="inline-radio7"
                    onChange={handleChangeRedioBtnBat}
                    checked={selectedBathCount === "0"}
                  />
                  <Form.Check
                    inline
                    label="1+"
                    value="0.9"
                    name="groupBathrooms1"
                    type="radio"
                    id="inline-radio2"
                    onChange={handleChangeRedioBtnBat}
                    checked={selectedBathCount === "0.9"}
                  />
                  <Form.Check
                    inline
                    label="2+"
                    value="1.9"
                    name="groupBathrooms1"
                    type="radio"
                    id="inline-radio3"
                    onChange={handleChangeRedioBtnBat}
                    checked={selectedBathCount === "1.9"}
                  />
                  <Form.Check
                    inline
                    label="3+"
                    value="2.9"
                    name="groupBathrooms1"
                    type="radio"
                    id="inline-radio4"
                    onChange={handleChangeRedioBtnBat}
                    checked={selectedBathCount === "2.9"}
                  />
                  <Form.Check
                    inline
                    label="4+"
                    value="3.9"
                    name="groupBathrooms1"
                    type="radio"
                    id="inline-radio5"
                    onChange={handleChangeRedioBtnBat}
                    checked={selectedBathCount === "3.9"}
                  />
                </div>
              </Row>
              <Row>
                <Form.Text className="dropdown-title">Home Type</Form.Text>
                <div className="home-types">
                  <div>
                    <input
                      type="checkbox"
                      name="checkAll"
                      checked={allChecked}
                      onChange={handleChangeAllTypes}
                    />
                    Check All
                  </div>
                  <div className="home-type-mobile">{renderList}</div>
                </div>
              </Row>
              <Row>
                <Form.Group controlId="doj2">
                  <Form.Text className="dropdown-title">Select Date</Form.Text>
                  <p className="dropdown-description">
                    Select a date to view listings available on or before this
                    date.
                  </p>
                  <Form.Control
                    type="date"
                    name="doj1"
                    defaultValue={selectedValue}
                    placeholder="Move-In Date"
                    onChange={handleOndateChange}
                    style={{ marginBottom: "16px" }}
                    max="2999-01-01"
                    min="2000-01-01"
                    onKeyDown={(e) => e.preventDefault()}
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Text className="dropdown-title">Dogs & Cats</Form.Text>
                <Col className="catsdogs-toggles">
                  <BootstrapSwitchButton
                    onlabel="Dogs"
                    offlabel="Dogs"
                    onChange={handleChangeRedioBtnDogs}
                    checked={selecteddogs === true}
                  />
                  <div style={{ padding: "8px" }}></div>
                  <BootstrapSwitchButton
                    onlabel="Cats"
                    offlabel="Cats"
                    onChange={handleChangeRedioBtnCats}
                    checked={selectedCats === true}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <Button
                    variant="primary"
                    type="button"
                    className="INdropdown-button"
                    onClick={mobileSubmit}
                    style={{ marginTop: "30px" }}
                  >
                    Apply
                  </Button>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
      <Col className="col-12 search-bar-mobile">
        <TypeAheadDropDown
          iteams={arrayIndex}
          defaultSelected={selectedValueInput}
          onTextChange={onSearchChange}
          className="search-bar"
        />
      </Col>
    </Container>
  );
};

export default SearchModule;
