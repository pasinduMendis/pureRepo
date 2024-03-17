import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Listingcard from "./listingcard";
import GoogleMap from "./googleMap/GoogleMap/index";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DateObject from "react-date-object";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import emitter from "../utils/EventEmitter";

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      rows: [],
      locations: [],
      temData: [],
      countArray: "",
      loading: false,
      zoomOut: false,
      isFirstTime: true,
      showNoResultsMessage: false,
    };
    // this.sendAllData = this.sendAllData.bind(this);
    this.sendAllData();
    // document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentDidMount() {
    this.setState({
      // companyValue:this.props.searchValuecompanyNameValue
    });

    if (this.state.rows.length === 0) {
      setTimeout(() => {
        this.setState({ showNoResultsMessage: true });
      }, 5000);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      // prevProps.searchValue.searchValue !== this.props.searchValue.searchValue ||
      prevProps.searchValue.selectedMinNuValueInput !==
        this.props.searchValue.selectedMinNuValueInput ||
      prevProps.searchValue.selectedMaxNuValueInput !==
        this.props.searchValue.selectedMaxNuValueInput ||
      prevProps.searchValue.selectedBedCount !==
        this.props.searchValue.selectedBedCount ||
      prevProps.searchValue.selectedBathCount !==
        this.props.searchValue.selectedBathCount ||
      prevProps.searchValue.selectedDate !==
        this.props.searchValue.selectedDate ||
      prevProps.searchValue.cats !== this.props.searchValue.cats ||
      prevProps.searchValue.dogs !== this.props.searchValue.dogs ||
      prevProps.searchValue.temp !== this.props.searchValue.temp ||
      (prevState.countArray !== this.state.countArray &&
        prevState.zoomOut !== this.state.zoomOut)
    ) {
      let isExpanded = JSON.parse(localStorage.getItem("isExpanded"));

      if (!isExpanded && this.props.searchValue.searchValue !== "") {
        this.sendAllData();
      }
    }
  }

  sendAllData(zoomOut = false, _boundCoords, _mapDto) {
    let mapDto = this.getMapDto(_mapDto);
    let alteredAddressKey = this.getAlteredAddressKey(mapDto);

    // var date = new DateObject(this.props.searchValue.selectedDate);
    this.setState({
      loading: true,
    });

    let boundCoords = this.getBoundCoords(_boundCoords);

    let latTo = boundCoords != undefined ? boundCoords.lat.start : "";
    let latFrom = boundCoords != undefined ? boundCoords.lat.end : "";
    let lngTo = boundCoords != undefined ? boundCoords.lng.end : "";
    let lngFrom = boundCoords != undefined ? boundCoords.lng.start : "";

    if (
      (!mapDto.isCityConsider &&
        mapDto.sendDataDto != undefined &&
        mapDto.sendDataDto != null) ||
      mapDto.isTextChanged
    ) {
      var data = mapDto.sendDataDto;
    } else {
      if (
        this.props.searchValue.cats !== null ||
        this.props.searchValue.dogs !== null
      ) {
        var data = JSON.stringify({
          companyName:
            localStorage.isBoundryRemoved == "false"
              ? this.props.searchValue.companyNameValue
              : "",
          email: "",
          phone: "",
          addressKey: alteredAddressKey,
          title: "",
          description: "",
          bedsMin:
            this.props.searchValue.selectedBedCount !== null
              ? parseFloat(this.props.searchValue.selectedBedCount)
              : 0,
          bedsMax: 99,
          bathsMin:
            this.props.searchValue.selectedBathCount !== null
              ? parseFloat(this.props.searchValue.selectedBathCount)
              : 0,
          bathsMax: 99,
          rentMin:
            this.props.searchValue.selectedMinNuValueInput !== null
              ? parseInt(this.props.searchValue.selectedMinNuValueInput)
              : 0,
          rentMax:
            this.props.searchValue.selectedMaxNuValueInput !== null ||
            this.props.searchValue.selectedMaxNuValueInput !== "no-max"
              ? parseInt(this.props.searchValue.selectedMaxNuValueInput)
              : "",
          startDate: "1/1/2017",
          endDate:
            this.props.searchValue.selectedDate !== ""
              ? this.props.searchValue.selectedDate
              : "",
          endDate:
            this.props.searchValue.selectedDate !== '""'
              ? this.props.searchValue.selectedDate
              : "",
          // endDate: '11/22/2023',
          cats:
            this.props.searchValue.cats === true
              ? this.props.searchValue.cats
              : "",
          dogs:
            this.props.searchValue.dogs === true
              ? this.props.searchValue.dogs
              : "",
          latTo: latTo,
          latFrom: latFrom,
          lngTo: lngTo,
          lngFrom: lngFrom,
          propertyType:
            this.props.searchValue.temp !== undefined &&
            this.props.searchValue.temp.length > 0
              ? this.props.searchValue.temp
              : "",
        });
      } else {
        var data = JSON.stringify({
          companyName: this.props.searchValue.companyNameValue,
          email: "",
          phone: "",
          addressKey: alteredAddressKey,
          title: "",
          description: "",
          bedsMin:
            this.props.searchValue.selectedBedCount !== null
              ? parseFloat(this.props.searchValue.selectedBedCount)
              : 0,
          bedsMax: 99,
          bathsMin:
            this.props.searchValue.selectedBathCount !== null
              ? parseFloat(this.props.searchValue.selectedBathCount)
              : 0,
          bathsMax: 99,
          rentMin:
            this.props.searchValue.selectedMinNuValueInput !== null
              ? parseInt(this.props.searchValue.selectedMinNuValueInput)
              : 0,
          rentMax:
            this.props.searchValue.selectedMaxNuValueInput !== null ||
            this.props.searchValue.selectedMaxNuValueInput !== "no-max"
              ? parseInt(this.props.searchValue.selectedMaxNuValueInput)
              : "",
          startDate: "1/1/2017",
          endDate:
            this.props.searchValue.selectedDate !== ""
              ? this.props.searchValue.selectedDate
              : "",
          latTo: latTo,
          latFrom: latFrom,
          lngTo: lngTo,
          lngFrom: lngFrom,
          propertyType:
            this.props.searchValue.temp !== undefined &&
            this.props.searchValue.temp.length > 0
              ? this.props.searchValue.temp
              : "",
        });
      }
    }

    axios
      .post(process.env.REACT_APP_BASE_URL + "filterAddress", data, {
        headers: { "content-type": "application/json" },
      })
      .then((response) => {
        const results = response.data;
        var listingRows = [];
        var locations = [];
        const now = new Date().getTime();
        if (results.length > 0) {
          results.forEach((listing, key) => {
            let tempObj = {
              id: key,
              lat: listing.latitude,
              lng: listing.longitude,
              dataID: listing,
            };
            let temshow = false;
            if (listing.id === this.props.searchValue.loctionIDA) {
              temshow = true;
            } else {
              temshow = false;
            }

            locations.push(tempObj);
            const listingRow = (
              <Listingcard
                key={listing.id}
                listing={listing}
                show={this.props.searchValue.loctionIDA}
                nowavailableaa={new Date(listing.dateAvailable).getTime() < now}
              />
            );
            listingRows.push(listingRow);
          });
          this.setState({
            rows: listingRows,
            locations: locations,
            temData: response.data,
            countArray: results.length,
          });
          this.setState({
            loading: false,
          });

          if (mapDto.isCityConsider) {
            localStorage.setItem("isCityConsider", true); // uses to handle componendDiUpdate() in index.js
          }
        } else {
          this.setState({
            rows: [],
            locations: [],
            temData: [],
          });
          this.setState({
            loading: false,
          });
        }

        if (mapDto.fitBounds != null) {
          mapDto.fitBounds();
        }

        if (this.state.isFirstTime) {
          this.setState({
            isFirstTime: false,
          });
          this.triggerFetchCityBoundariesEmitter();
        }
      });
  }

  getAlteredAddressKey = (mapDto) => {
    let isBoundryRemoved = localStorage.getItem("isBoundryRemoved");
    let alteredAddressKey = "";

    if (!mapDto.isCityConsider || isBoundryRemoved == "true") {
      alteredAddressKey = "";
    } else {
      if (this.props.searchValue.searchValue !== null) {
        alteredAddressKey = this.props.searchValue.searchValue;
      } else {
        alteredAddressKey = "";
      }
    }

    return alteredAddressKey;
  };

  getMapDto = (mapDto) => {
    if (mapDto == undefined) {
      mapDto = {
        isCityConsider: true,
        fitBounds: null,
      };
    }

    return mapDto;
  };

  getBoundCoords = (boundCoords) => {
    if (boundCoords != undefined) {
      return boundCoords;
    } else {
      let isBoundryRemoved = localStorage.getItem("isBoundryRemoved");
      if (isBoundryRemoved == "true") {
        return JSON.parse(
          localStorage.getItem("currentBoundWhenWithRemoveBoundryEnabled")
        );
      }
    }

    return boundCoords;
  };

  handleMapUpdates = (zoomOut, boundCoords, mapDto) => {
    this.sendAllData(zoomOut, boundCoords, mapDto);
    this.setState({
      zoomOut: zoomOut,
    });
  };

  triggerFetchCityBoundariesEmitter = () => {
    localStorage.setItem("isFetchCityBoundariesEventEmited", true);
    const addressKey = this.props.searchValue.searchValue;
    if (addressKey !== null && addressKey != "") {
      emitter.emit("fetchCityBoundariesEvent", { payload: addressKey });
    }
  };

  render() {
    return (
      <>
        <Container>
          <Row id="gMap" className="listing-results desktop">
            <Col className="results-left-col">
              <GoogleMap
                locations={this.state.locations}
                temData={this.state.temData}
                onMapUpdated={this.handleMapUpdates}
                currentCity={this.props.searchValue.searchValue}
              />
            </Col>
            <Col className="results-right-col">
              {this.state.loading === false ? (
                <>
                  {this.state.rows.length !== 0 ? (
                    <>
                      <h3 className="listing-count">
                        {this.state.countArray} Rental Listings
                      </h3>
                      <div className="listing-grid">{this.state.rows}</div>
                    </>
                  ) : (
                    <>
                      {this.state.showNoResultsMessage ? (
                        <h3
                          style={{
                            color: "#1669b4",
                            fontSize: "16px",
                            fontWeight: 700,
                            lineHeight: "32px",
                            marginTop: "30px",
                          }}
                        >
                          No properties match this search criteria
                        </h3>
                      ) : (
                        <div className="render-list">
                          <Row>
                            <Col>
                              <Skeleton
                                animation="wave"
                                variant="circular"
                                className="loadingListSkeleton"
                              ></Skeleton>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Skeleton
                                animation="wave"
                                variant="circular"
                                className="loadingSkeleton"
                              />
                            </Col>
                            <Col>
                              <Skeleton
                                animation="wave"
                                variant="circular"
                                className="loadingSkeleton"
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Skeleton
                                animation="wave"
                                variant="circular"
                                className="loadingSkeleton"
                              />
                            </Col>
                            <Col>
                              <Skeleton
                                animation="wave"
                                variant="circular"
                                className="loadingSkeleton"
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Skeleton
                                animation="wave"
                                variant="circular"
                                className="loadingSkeleton"
                              />
                            </Col>
                            <Col>
                              <Skeleton
                                animation="wave"
                                variant="circular"
                                className="loadingSkeleton"
                                // width={300}
                                // height={200}
                              />
                            </Col>
                          </Row>
                        </div>
                      )}
                    </>
                  )}
                </>
              ) : (
                <div className="render-list">
                  <Row>
                    <Col>
                      <Skeleton
                        animation="wave"
                        variant="circular"
                        className="loadingListSkeleton"
                      ></Skeleton>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Skeleton
                        animation="wave"
                        variant="circular"
                        className="loadingSkeleton"
                      />
                    </Col>
                    <Col>
                      <Skeleton
                        animation="wave"
                        variant="circular"
                        className="loadingSkeleton"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Skeleton
                        animation="wave"
                        variant="circular"
                        className="loadingSkeleton"
                      />
                    </Col>
                    <Col>
                      <Skeleton
                        animation="wave"
                        variant="circular"
                        className="loadingSkeleton"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Skeleton
                        animation="wave"
                        variant="circular"
                        className="loadingSkeleton"
                      />
                    </Col>
                    <Col>
                      <Skeleton
                        animation="wave"
                        variant="circular"
                        className="loadingSkeleton"
                        // width={300}
                        // height={200}
                      />
                    </Col>
                  </Row>
                </div>
              )}
            </Col>
          </Row>

          <Row id="gMmapMobile" className="mobile">
            <Tabs
              defaultActiveKey="list"
              id="uncontrolled-tab-example"
              className="mobile-results-tabs"
            >
              <Tab eventKey="list" title="List">
                {this.state.loading === false ? (
                  <>
                    {this.state.rows.length !== 0 ? (
                      <>
                        <h3 className="listing-count">
                          {this.state.countArray} Rental Listings
                        </h3>
                        <div className="listing-grid">{this.state.rows}</div>
                      </>
                    ) : (
                      <h3
                        style={{
                          color: "#1669b4",
                          fontSize: "16px",
                          fontWeight: 700,
                          lineHeight: "32px",
                          marginTop: "30px",
                        }}
                      >
                        No properties match this search criteria
                      </h3>
                    )}
                  </>
                ) : (
                  <div className="listing-grid">
                    <Row>
                      <Col>
                        <Skeleton
                          animation="wave"
                          variant="circular"
                          width={300}
                          height={200}
                        />
                      </Col>
                      <Col>
                        <Skeleton
                          animation="wave"
                          variant="circular"
                          width={300}
                          height={200}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Skeleton
                          animation="wave"
                          variant="circular"
                          width={300}
                          height={200}
                        />
                      </Col>
                      <Col>
                        <Skeleton
                          animation="wave"
                          variant="circular"
                          width={300}
                          height={200}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Skeleton
                          animation="wave"
                          variant="circular"
                          width={300}
                          height={200}
                        />
                      </Col>
                      <Col>
                        <Skeleton
                          animation="wave"
                          variant="circular"
                          width={300}
                          height={200}
                        />
                      </Col>
                    </Row>
                  </div>
                )}
              </Tab>

              <Tab eventKey="map" title="Map" className="google-map-mobile">
                <GoogleMap
                  locations={this.state.locations}
                  temData={this.state.temData}
                  onMapUpdated={this.handleMapUpdates}
                />
              </Tab>
            </Tabs>
          </Row>
        </Container>
      </>
    );
  }
}

export default SearchResult;
