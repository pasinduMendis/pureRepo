/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from "react";
import "./App.css";
import Header from "./header";
import EmptyState from "./emptystate";
import SearchModule from "./searchmodule";
import SearchResult from "./searchresult";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import DateObject from "react-date-object";
import data from "./data.json";
import ReactJsAlert from "reactjs-alert";
import moment from "moment";
import LoadingOverlay from "react-loading-overlay";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import EventProvider from "../utils/EventProvider";
import emitter from "../utils/EventEmitter";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyNameValue: "",
      active: <EmptyState />,
      searchValue: "",
      searchValuenew: [],
      searchValueOld: "",
      selectedDate: "2015-04-14",
      selectedMinNuValueInput: 0,
      selectedMinNuValueInputnew: [],
      selectedMaxNuValueInput: 0,
      selectedMaxNuValueInputnew: [],
      selectedBedCount: 0,
      selectedBathCount: 0,
      cats: false,
      dogs: false,
      propertyType: [],
      dropdownClose: false,
      dropdownCloseOne: false,
      dropdownCloseTwo: false,
      dropdownCloseTree: false,
      dropdownCloseTreeAA: false,
      swlat: "",
      swlon: "",
      nelat: "",
      nelon: "",
      error: false,
      errorMas: "",
      tempValue: "",
      selectedDatetemp: "",
      isActive: false,
      loctionIDA: "",
      temp: [],
      tempAA: [],
      selectedTpyeAll: "",
      selectedTpyeHometype1: false,
      selectedTpyeHometype2: false,
      selectedTpyeHometype3: false,
      selectedTpyeHometype4: false,
      selectedTpyeHometype5: false,
      allChecked: true,
      list: [
        { id: 1, name: "Single Family", isChecked: true },
        { id: 2, name: "Townhouse", isChecked: true },
        { id: 3, name: "Apartment Unit", isChecked: true },
        { id: 3, name: "Condo Unit", isChecked: true },
        { id: 3, name: "Not Mentioned", isChecked: true },
      ],
      selectedDistnaceInput: 0,
      selectedDistnaceInputnew: 0,
      prevselectedDistnaceInput: 0,
      dropdownCloseDistance: false,
    };
    this.handleOndateChange = this.handleOndateChange.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    localStorage.setItem("isExpanded", JSON.stringify(false)); // uses to handle componendDiUpdate() in index.js
    localStorage.setItem("isBoundryRemoved", false); // uses to handle boundryRemove feature in index.js
  }

  replaceLastDashWithComma(city) {
    // Find the index of the last occurrence of '-'
    var lastDashIndex = city.lastIndexOf(" ");

    // Check if a dash is found
    if (lastDashIndex !== -1) {
      // Replace the last dash with ', '
      var resultCity =
        city.substring(0, lastDashIndex) +
        ", " +
        city.substring(lastDashIndex + 1);

      return resultCity;
    } else {
      // If no dash is found, return the original string
      return city;
    }
  }

  componentDidMount() {
    const path = window.location.pathname;
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    const tempcity = path.split("/")[1].replaceAll(" ", ",");
    // const containsCompany = tempcity.includes('Office');
    // const containsCompany = /Office|Property|Falls|Estates|LLC/.test(tempcity);
    const containsCompany = /Office|Property|Falls|Estates|LLC/i.test(tempcity);

    let cityOne = tempcity.replaceAll("-", " ");

    let city = "";
    let company = "";
    var lastCommaIndex = null;

    cityOne = this.replaceLastDashWithComma(cityOne);

    if (containsCompany) {
      company =
        cityOne.split(",").length > 2 ? cityOne.replace(",", "") : cityOne;

      lastCommaIndex = company.lastIndexOf(",");
      company =
        lastCommaIndex > 1
          ? company.substring(0, lastCommaIndex) +
            company.substring(lastCommaIndex + 1)
          : company;
    } else {
      city = cityOne.split(",").length > 2 ? cityOne.replace(",", "") : cityOne;
    }

    const date = params.get("date");
    const locationID = params.get("locationID");
    const min = params.get("pricemin");
    const max = params.get("pricemax");
    const beds = params.get("beds");
    const baths = params.get("baths");
    const dogs = params.get("dogs");
    const cats = params.get("cats");
    const dateNew = new Date();
    // if (city === "no current location") {
    //   <EmptyState />
    // }
    this.setState(
      {
        companyNameValue: company,
        searchValue:
          city === "all" || city === "no current location" ? "" : city,
        tempValue: city,
        searchValuenew: city ? [city] : [],
        selectedDate: date ? date : "",
        selectedMinNuValueInput: min,
        selectedMinNuValueInputnew: min ? [min] : [],
        selectedMaxNuValueInput: max,
        selectedMaxNuValueInputnew: max ? [max] : [],
        selectedBedCount: beds,
        selectedBathCount: baths,
        dogs: dogs === "true" ? true : false,
        cats: cats === "true" ? true : false,
        navmodalShow: false,
        arrayIndex: [],
        selectedDatetemp: dateNew,
        loctionIDA: locationID ? locationID : null,
        isItFromonSearchChange: false,
      },
      () => {}
    );
    document.getElementById("main-div") &&
      document
        .getElementById("main-div")
        .addEventListener("click", this.handleClickOutside);
    document.getElementById("main-divhedar") &&
      document
        .getElementById("main-divhedar")
        .addEventListener("click", this.handleClickOutsidehedare);
    this.getAllindex();
  }

  componentDidUpdate(prevProps, prevState) {
    // if the current page changes, or the search term changes.
    if (
      prevState.searchValue !== this.state.searchValue ||
      prevState.selectedDate !== this.state.selectedDate
    ) {
      // if (this.state.tempValue === "no current location") {
      //   if (this.state.searchValue === "") {
      //     <EmptyState />
      //   } else {
      //     this.setState({ active: <SearchResult searchValue={this.state} /> })
      //   }
      // } else {
      //   this.setState({ active: <SearchResult searchValue={this.state} /> })
      // }
      this.setState({ active: <SearchResult searchValue={this.state} /> });
    }
  }

  componentWillUnmount() {
    document.getElementById("main-div") &&
      document
        .getElementById("main-div")
        .removeEventListener("mousedown", this.handleClickOutside);
    document.getElementById("main-divhedar") &&
      document
        .getElementById("main-divhedar")
        .removeEventListener("mousedown", this.handleClickOutsidehedare);
  }

  getAllindex() {
    axios
      .get(process.env.REACT_APP_BASE_URL + "getAllIndex", {
        headers: { "content-type": "application/json" },
      })
      .then((response) => {
        let returnArrayIndex = [];
        if (response) {
          response.data.forEach((element) => {
            if (
              !returnArrayIndex.includes(element.city + ", " + element.state)
            ) {
              returnArrayIndex.push(element.city + ", " + element.state);
            }
            if (!returnArrayIndex.includes(element.address)) {
              returnArrayIndex.push(element.address);
            }
            if (!returnArrayIndex.includes(element.zip)) {
              returnArrayIndex.push(element.zip);
            }
            if (!returnArrayIndex.includes(element.stateFullName)) {
              returnArrayIndex.push(element.stateFullName);
            }
          });
        }
        this.setState({
          arrayIndex: returnArrayIndex,
        });
      });
  }

  renderList = () => {
    return this.state.list.map((item) => (
      <div key={item.id}>
        <input
          key={item.id}
          type="checkbox"
          name={item.name}
          value={item.name}
          checked={item.isChecked}
          onChange={this.handleChangeAllTypes}
        />
        <label>{item.name}</label>
      </div>
    ));
  };

  onSearchChange = (event, changeBtn) => {
    this.setState({
      selectedDistnaceInputnew: [],
      selectedDistnaceInput: 0,
      isItFromonSearchChange: true,
    });
    this.setItemToLocalStorage("isExpanded", false); //uses to handle mapExpand feature
    this.setItemToLocalStorage("isCityConsider", true); // uses to handle componendDiUpdate() in index.js
    this.setItemToLocalStorage("isBoundryRemoved", false); //uses to handle remove boundry feature
    this.setItemToLocalStorage("enableRemoveBoundry", true); // uses to handle componendDiUpdate() in index.js

    if (event === "current_location") {
      this.setState({
        isActive: true,
      });
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var latitudele = position.coords.latitude;
          var longitudele = position.coords.longitude;
          axios
            .get(
              "https://maps.googleapis.com/maps/api/geocode/json?address=" +
                latitudele +
                "," +
                longitudele +
                "&key=" +
                "AIzaSyCGrAFYT6K85SUYIW7C1MVD7dXHm3islmQ"
            )
            .then((response) => {
              // var total2 = response.data.results[0].address_components[3].long_name;

              var filterCity =
                response.data.results[0].address_components.filter((result) =>
                  result.types.includes("locality")
                );
              var filterState =
                response.data.results[0].address_components.filter((result) =>
                  result.types.includes("administrative_area_level_1")
                );

              var total2 =
                filterCity[0].long_name + ", " + filterState[0].short_name;

              var myStringtest = total2.replaceAll(",", "");
              var myString = myStringtest.replace(/\s+/g, "-");
              this.setState({
                isActive: false,
                searchValue: total2,
                searchValuenew: [total2],
                swlat: "",
                swlon: "",
                nelat: "",
                nelon: "",
              });
              this.setUrl(myString);
            });
        },
        (err) => {
          this.setState({
            isLoggedIn: false,
            error: true,
            errorMas: "Error obteniendo localización: " + err.message,
          });
        }
      );
    } else {
      var myStringtesta = event.replaceAll(",", "");
      this.setState(
        {
          searchValuenew: [],
          searchValue: event,
          swlat: "",
          swlon: "",
          nelat: "",
          nelon: "",
        },
        () => {
          this.setUrl(myStringtesta);
        }
      );
    }
  };

  setUrl(searchTest) {
    if (searchTest !== undefined) {
      if (
        this.state.searchValue !== "" &&
        this.state.selectedMinNuValueInput !== "" &&
        this.state.selectedMaxNuValueInput !== ""
      ) {
        // eslint-disable-next-line
        var newurl =
          window.location.origin +
          "/" +
          searchTest +
          '/?pricemax=null&pricemin=null&beds=null&baths=null&date=""';
        const newUrlOne = newurl.replaceAll(", ", "-");
        const newUrlTwo = newUrlOne.replaceAll(" ", "-");
        window.history.pushState({ path: newUrlTwo }, "", newUrlTwo);
        // dispatch(push(newurl));
      } else if (searchTest !== "") {
        // eslint-disable-next-line
        var newurl = window.location.origin + "/" + searchTest;
        const newUrlOne = newurl.replaceAll(", ", "-");
        const newUrlTwo = newUrlOne.replaceAll(" ", "-");
        window.history.pushState({ path: newUrlTwo }, "", newUrlTwo);
      } else {
        // eslint-disable-next-line
        var newurl =
          window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname;
        const newUrlOne = newurl.replaceAll(", ", "-");
        const newUrlTwo = newUrlOne.replaceAll(" ", "-");
        window.history.pushState({ path: newUrlTwo }, "", newUrlTwo);
      }
      // this.setState({
      //   searchValue: searchTest.replaceAll(" ", ", ")
      // })
      if (this.state.searchValue === "") {
        <EmptyState />;
      } else {
        this.triggerOnSeachChangeEmitter();
        // if(this.state.isItFromonSearchChange){
        //     this.triggerOnSeachChangeEmitter();
        // }else{
        // this.setState({ active: <SearchResult searchValue={this.state} /> })
        // }
      }
    } else {
      // eslint-disable-next-line
      var newurl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname;
      const newUrlOne = newurl.replaceAll(", ", "-");
      const newUrlTwo = newUrlOne.replaceAll(" ", "-");
      window.history.pushState({ path: newUrlTwo }, "", newUrlTwo);

      this.setState({
        searchValue: searchTest,
      });
      if (this.state.searchValue === "") {
        <EmptyState />;
      } else {
        // this.sendAllData();
        // if(this.state.isItFromonSearchChange){
        //     this.triggerOnSeachChangeEmitter();
        // }else{
        //   this.setState({ active: <SearchResult searchValue={this.state} /> })
        // }

        this.triggerOnSeachChangeEmitter();
      }
    }
  }

  sendAllData() {
    var date = new DateObject(this.state.selectedDate);
    this.setState({
      loading: true,
    });
    if (this.state.cats !== null || this.state.dogs !== null) {
      var data = JSON.stringify({
        companyName: "",
        email: "",
        phone: "",
        propertyType: "",
        addressKey:
          this.state.searchValue !== null ? this.state.searchValue : "",
        title: "",
        description: "",
        bedsMin:
          this.state.selectedBedCount !== null
            ? parseFloat(this.state.selectedBedCount)
            : 0,
        bedsMax: 99,
        bathsMin:
          this.state.selectedBathCount !== null
            ? parseFloat(this.state.selectedBathCount)
            : 0,
        bathsMax: 99,
        rentMin:
          this.state.selectedMinNuValueInput !== null
            ? parseInt(this.state.selectedMinNuValueInput)
            : 0,
        rentMax:
          this.state.selectedMaxNuValueInput !== null
            ? parseInt(this.state.selectedMaxNuValueInput)
            : "",
        startDate: "1/1/2017",
        endDate:
          this.state.selectedDate !== "" ? date.format("MM/DD/YYYY") : "",
        cats: this.state.cats !== null ? this.state.cats : false,
        dogs: this.state.dogs !== null ? this.state.dogs : false,
        propertyType: this.state.temp.length > 0 ? this.state.temp : "",
      });
    } else {
      var data = JSON.stringify({
        companyName: "",
        email: "",
        phone: "",
        propertyType: "",
        addressKey:
          this.state.searchValue !== null ? this.state.searchValue : "",
        title: "",
        description: "",
        bedsMin:
          this.state.selectedBedCount !== null
            ? parseFloat(this.state.selectedBedCount)
            : 0,
        bedsMax: 99,
        bathsMin:
          this.state.selectedBathCount !== null
            ? parseFloat(this.state.selectedBathCount)
            : 0,
        bathsMax: 99,
        rentMin:
          this.state.selectedMinNuValueInput !== null
            ? parseInt(this.state.selectedMinNuValueInput)
            : 0,
        rentMax:
          this.state.selectedMaxNuValueInput !== null
            ? parseInt(this.state.selectedMaxNuValueInput)
            : "",
        startDate: "1/1/2017",
        endDate:
          this.state.selectedDate !== "" ? date.format("MM/DD/YYYY") : "",
        propertyType: this.state.temp.length > 0 ? this.state.temp : "",
      });
    }

    axios
      .post(process.env.REACT_APP_BASE_URL + "filterAddress", data, {
        headers: { "content-type": "application/json" },
      })
      .then((response) => {
        this.setState({ active: <SearchResult searchValue={response.data} /> });
      });
  }

  onSearchBluur = (event) => {
    if (
      this.state.searchValue !== "" &&
      this.state.selectedMinNuValueInput !== "" &&
      this.state.selectedMaxNuValueInput !== ""
    ) {
      // eslint-disable-next-line
      var newurl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?searchText=" +
        event.target.value +
        '/pricemax=null&pricemin=null&beds=null&baths=null&date=""';
      window.history.pushState({ path: newurl }, "", newurl);
    } else if (event.state.searchValue !== "") {
      // eslint-disable-next-line
      var newurl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?searchText=" +
        event.target.value;
      window.history.pushState({ path: newurl }, "", newurl);
    } else {
      // eslint-disable-next-line
      var newurl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname;
      window.history.pushState({ path: newurl }, "", newurl);
    }
    // this.setState({
    //   searchValue: event.target.value
    // })
    if (this.state.searchValue === "") {
      <EmptyState />;
    } else {
      // this.sendAllData();
    }
  };

  onloadData(city) {
    if (city === "") {
      <EmptyState />;
    } else {
      // this.sendAllData();
      // this.setState({ active: <SearchResult searchValue={city} /> })
    }
  }

  handleChangeRedioBtn = (event) => {
    this.setState({
      selectedBedCount: event.target.value,
    });
  };

  handleChangeRedioBtnBat = (event) => {
    this.setState({
      selectedBathCount: event.target.value,
    });
  };

  handleOndateChange(value) {
    // this.setState({
    //   selectedDate: event.target.value,
    // })
    // console.log(new Date(), 'assssssss');
    var date = new DateObject(value);
    var newValue = date.format("MM/DD/YYYY");
    this.setState({
      selectedDate: newValue,
      selectedDatetemp: value,
    });
  }

  onSearchMaxNuChange = (event) => {
    this.setState({
      selectedMaxNuValueInput: event[0],
      selectedMaxNuValueInputnew: event,
    });
  };

  onSearchMinNuChange = (event) => {
    this.setState({
      selectedMinNuValueInput: event[0],
      selectedMinNuValueInputnew: event,
    });
  };

  onDistanceChange = (event) => {
    this.setState({
      selectedDistnaceInput: event[0],
      selectedDistnaceInputnew: event,
    });
  };

  onDistanceCloseButtonclick = (event) => {
    this.setState({
      dropdownCloseTree: false,
      dropdownCloseTwo: false,
      dropdownCloseOne: false,
      dropdownClose: false,
      dropdownCloseTreeAA: false,
      dropdownCloseDistance: false,
    });
  };

  handleChangeRedioBtnDogs = (event) => {
    this.setState({
      dogs: event,
    });
  };

  // handleChangeTypes = (event) => {

  //   let temp = []
  //   event.forEach((item)=>{
  //        temp.push(item.value);
  //   });
  //   console.log('aaaaa', temp);
  //   this.setState({
  //     propertyType: temp
  //   })

  // }

  // handleChangeAllTypes = (event) => {
  //   console.log('propertyTypeaaaaaaaaaa,', event);
  //   let tempArray = [];

  //   this.state.selectedTpyeHometype1 = event.target.checked;
  //   this.state.selectedTpyeHometype2 = event.target.checked;
  //   this.state.selectedTpyeHometype3 = event.target.checked;
  //   this.state.selectedTpyeHometype4 = event.target.checked;
  //   this.state.selectedTpyeHometype5 = event.target.checked;
  //   if(event.target.checked){
  //     this.state.selectedTpyeAll = 'all';
  //     this.state.dropdownOpenTreeAA =
  //     tempArray =[
  //       'home type 1','home type 2','home type 3','home type 4'
  //     ];
  //   }else{
  //     this.state.selectedTpyeAll = '';
  //     tempArray =[];
  //   }
  //   this.state.temp = tempArray;
  // }

  handleChangeAllTypes = (e) => {
    let itemName = e.target.name;
    let checked = e.target.checked;
    this.setState((prevState) => {
      let { list, allChecked } = prevState;
      if (itemName === "checkAll") {
        allChecked = checked;
        this.setState({
          tempAA: list.map((item) => ({ ...item, isChecked: checked })),
        });
        list = list.map((item) => ({ ...item, isChecked: checked }));
      } else {
        this.setState({
          tempAA: list.map((item) =>
            item.name === itemName ? { ...item, isChecked: checked } : item
          ),
        });
        list = list.map((item) =>
          item.name === itemName ? { ...item, isChecked: checked } : item
        );
        allChecked = list.every((item) => item.isChecked);
      }

      return { list, allChecked };
    });
  };

  handleChangeTypes = (event) => {
    // this.setState({
    //   selectedBathCount: event.target.value
    // })
    // this.state.temp.push(event.target.value);
    // event.target.value.forEach((item)=>{
    //   this.state.temp.push(item);
    // });
    // console.log('aaaaa', this.state.temp);
  };

  handleChangeRedioBtnCats = (event) => {
    this.setState({
      cats: event,
    });
  };

  handleClickOutside(event) {
    // if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
    // alert("You clicked outside of me!");
    this.setState({
      dropdownCloseTree: false,
      dropdownCloseTwo: false,
      dropdownCloseOne: false,
      dropdownClose: false,
    });
    // }
  }

  onCloseButtonclick = (event) => {
    this.setState({
      dropdownCloseTree: false,
      dropdownCloseTwo: false,
      dropdownCloseOne: false,
      dropdownClose: false,
      dropdownCloseTreeAA: false,
    });
  };

  maxMinDoneButton = (event) => {
    if (event) {
      if (this.state.searchValue !== "") {
        // eslint-disable-next-line
        var newurl =
          window.location.protocol +
          "//" +
          window.location.host +
          "/" +
          this.state.searchValue +
          "/?pricemax=" +
          this.state.selectedMaxNuValueInput +
          "&&pricemin=" +
          this.state.selectedMinNuValueInput;
        const newUrlOne = newurl.replaceAll(" ", "-");
        window.history.pushState({ path: newUrlOne }, "", newUrlOne);
        this.setState({
          dropdownClose: false,
        });
      } else {
        // eslint-disable-next-line
        var newurl =
          window.location.protocol +
          "//" +
          window.location.host +
          "/?pricemax=" +
          this.state.selectedMaxNuValueInput +
          "&&pricemin=" +
          this.state.selectedMinNuValueInput;
        const newUrlOne = newurl.replaceAll(" ", "-");
        window.history.pushState({ path: newUrlOne }, "", newUrlOne);
        this.setState({
          dropdownClose: false,
        });
      }

      if (this.state.searchValue === "") {
        <EmptyState />;
      } else {
        if (
          this.state.selectedDistnaceInput != undefined &&
          this.state.selectedDistnaceInput != 0
        ) {
          this.triggerDistanceExpandEmitter();
        } else {
          this.setItemToLocalStorage("isExpanded", false); // uses to handle componendDiUpdate() in index.js
          this.setState({ active: <SearchResult searchValue={this.state} /> });
        }
      }
    }
  };

  onButtonclickBedAndBath = (event) => {
    if (event) {
      if (this.state.searchValue !== "") {
        this.setState({
          dropdownCloseOne: false,
        });

        var newurl =
          window.location.protocol +
          "//" +
          window.location.host +
          "/" +
          this.state.searchValue +
          "/?pricemax=" +
          this.state.selectedMaxNuValueInput +
          "&pricemin=" +
          this.state.selectedMinNuValueInput +
          "&beds=" +
          this.state.selectedBedCount +
          "&baths=" +
          this.state.selectedBathCount;
        const newUrlOne = newurl.replaceAll(" ", "-");
        window.history.pushState({ path: newUrlOne }, "", newUrlOne);
      } else {
        this.setState({
          dropdownCloseOne: false,
        });
        // eslint-disable-next-line
        var newurl =
          window.location.protocol +
          "//" +
          window.location.host +
          "/?pricemax=" +
          this.state.selectedMaxNuValueInput +
          "&pricemin=" +
          this.state.selectedMinNuValueInput +
          "&beds=" +
          this.state.selectedBedCount +
          "&baths=" +
          this.state.selectedBathCount;
        const newUrlOne = newurl.replaceAll(" ", "-");
        window.history.pushState({ path: newUrlOne }, "", newUrlOne);
      }
    }
    if (this.state.searchValue === "") {
      <EmptyState />;
    } else {
      if (
        this.state.selectedDistnaceInput != undefined &&
        this.state.selectedDistnaceInput != 0
      ) {
        this.triggerDistanceExpandEmitter();
      } else {
        this.setItemToLocalStorage("isExpanded", false); // uses to handle componendDiUpdate() in index.js
        this.setState({ active: <SearchResult searchValue={this.state} /> });
      }
    }
  };

  onButtonclickDate = (event) => {
    if (event) {
      if (this.state.searchValue !== "") {
        this.setState({
          dropdownCloseTwo: false,
        });
        // eslint-disable-next-line
        var newurl =
          window.location.protocol +
          "//" +
          window.location.host +
          "/" +
          this.state.searchValue +
          "/?pricemax=" +
          this.state.selectedMaxNuValueInput +
          "&pricemin=" +
          this.state.selectedMinNuValueInput +
          "&beds=" +
          this.state.selectedBedCount +
          "&baths=" +
          this.state.selectedBathCount +
          "&date=" +
          this.state.selectedDate;
        const newUrlOne = newurl.replaceAll(" ", "-");
        window.history.pushState({ path: newUrlOne }, "", newUrlOne);
      } else {
        this.setState({
          dropdownCloseTwo: false,
        });
        // eslint-disable-next-line
        var newurl =
          window.location.protocol +
          "//" +
          window.location.host +
          "/?pricemax=" +
          this.state.selectedMaxNuValueInput +
          "&pricemin=" +
          this.state.selectedMinNuValueInput +
          "&beds=" +
          this.state.selectedBedCount +
          "&baths=" +
          this.state.selectedBathCount +
          "&date=" +
          this.state.selectedDate;
        const newUrlOne = newurl.replaceAll(" ", "-");
        window.history.pushState({ path: newUrlOne }, "", newUrlOne);
      }
    }
    if (this.state.searchValue === "") {
      <EmptyState />;
    } else {
      if (
        this.state.selectedDistnaceInput != undefined &&
        this.state.selectedDistnaceInput != 0
      ) {
        this.triggerDistanceExpandEmitter();
      } else {
        this.setItemToLocalStorage("isExpanded", false); // uses to handle componendDiUpdate() in index.js
        this.setState({ active: <SearchResult searchValue={this.state} /> });
      }
    }
  };

  onButtonclickPet = (event) => {
    if (event) {
      if (this.state.searchValue !== "") {
        this.setState({
          dropdownCloseTree: false,
        });
        // eslint-disable-next-line
        var newurl =
          window.location.protocol +
          "//" +
          window.location.host +
          "/" +
          this.state.searchValue +
          "/?pricemax=" +
          this.state.selectedMaxNuValueInput +
          "&pricemin=" +
          this.state.selectedMinNuValueInput +
          "&beds=" +
          this.state.selectedBedCount +
          "&baths=" +
          this.state.selectedBathCount +
          "&date=" +
          this.state.selectedDate +
          "&cats=" +
          this.state.cats +
          "&dogs=" +
          this.state.dogs;
        const newUrlOne = newurl.replaceAll(" ", "-");
        window.history.pushState({ path: newUrlOne }, "", newUrlOne);
      } else {
        this.setState({
          dropdownCloseTree: false,
        });
        // eslint-disable-next-line
        var newurl =
          window.location.protocol +
          "//" +
          window.location.host +
          "/?pricemax=" +
          this.state.selectedMaxNuValueInput +
          "&pricemin=" +
          this.state.selectedMinNuValueInput +
          "&beds=" +
          this.state.selectedBedCount +
          "&baths=" +
          this.state.selectedBathCount +
          "&date=" +
          this.state.selectedDate +
          "&cats=" +
          this.state.cats +
          "&dogs=" +
          this.state.dogs;
        const newUrlOne = newurl.replaceAll(" ", "-");
        window.history.pushState({ path: newUrlOne }, "", newUrlOne);
      }
    }
    if (this.state.searchValue === "") {
      <EmptyState />;
    } else {
      if (
        this.state.selectedDistnaceInput != undefined &&
        this.state.selectedDistnaceInput != 0
      ) {
        this.triggerDistanceExpandEmitter();
      } else {
        this.setItemToLocalStorage("isExpanded", false); // uses to handle componendDiUpdate() in index.js
        this.setState({ active: <SearchResult searchValue={this.state} /> });
      }
    }
  };

  onButtonclickType = (event) => {
    this.state.temp = [];
    if (this.state.allChecked) {
      let tempArray = [
        "Single Family",
        "Townhouse",
        "Apartment Unit",
        "Condo Unit",
        "Not Mentioned",
      ];
      tempArray.forEach((item) => {
        this.state.temp.push(item);
      });
      // this.sendAllData();
    } else {
      this.state.tempAA.forEach((item) => {
        if (item.isChecked) {
          this.state.temp.push(item.name);
        }
      });
      // this.sendAllData();
    }
    if (this.state.searchValue === "") {
      <EmptyState />;
    } else {
      if (
        this.state.selectedDistnaceInput != undefined &&
        this.state.selectedDistnaceInput != 0
      ) {
        this.triggerDistanceExpandEmitter();
      } else {
        this.setItemToLocalStorage("isExpanded", false); // uses to handle componendDiUpdate() in index.js
        this.setState({ active: <SearchResult searchValue={this.state} /> });
      }
    }
    if (event) {
      if (this.state.searchValue !== "") {
        this.setState({
          dropdownCloseTreeAA: false,
        });

        // eslint-disable-next-line
        var newurl =
          window.location.protocol +
          "//" +
          window.location.host +
          "/" +
          this.state.searchValue +
          "/?pricemax=" +
          this.state.selectedMaxNuValueInput +
          "&pricemin=" +
          this.state.selectedMinNuValueInput +
          "&beds=" +
          this.state.selectedBedCount +
          "&baths=" +
          this.state.selectedBathCount +
          "&date=" +
          this.state.selectedDate +
          "&cats=" +
          this.state.cats +
          "&dogs=" +
          this.state.dogs;
        const newUrlOne = newurl.replaceAll(", ", "-");
        const newUrlTwo = newUrlOne.replaceAll(" ", "-");
        window.history.pushState({ path: newUrlTwo }, "", newUrlTwo);
      } else {
        this.setState({
          dropdownCloseTreeAA: false,
        });
        // eslint-disable-next-line
        var newurl =
          window.location.protocol +
          "//" +
          window.location.host +
          "/?pricemax=" +
          this.state.selectedMaxNuValueInput +
          "&pricemin=" +
          this.state.selectedMinNuValueInput +
          "&beds=" +
          this.state.selectedBedCount +
          "&baths=" +
          this.state.selectedBathCount +
          "&date=" +
          this.state.selectedDate +
          "&cats=" +
          this.state.cats +
          "&dogs=" +
          this.state.dogs;
        const newUrlOne = newurl.replaceAll(", ", "-");
        const newUrlTwo = newUrlOne.replaceAll(" ", "-");
        window.history.pushState({ path: newUrlTwo }, "", newUrlTwo);
      }
    }
  };

  dropdownOpen = (event) => {
    if (event === true) {
      this.setState({
        dropdownCloseTreeAA: false,
        dropdownClose: true,
        dropdownCloseOne: false,
        dropdownCloseTwo: false,
        dropdownCloseTree: false,
      });
    } else {
      this.setState({
        dropdownCloseTreeAA: false,
        dropdownClose: false,
        dropdownCloseOne: false,
        dropdownCloseTwo: false,
        dropdownCloseTree: false,
      });
    }
  };

  dropdownOpenOne = (event) => {
    if (event === true) {
      this.setState({
        dropdownCloseTreeAA: false,
        dropdownCloseOne: true,
        dropdownClose: false,
        dropdownCloseTwo: false,
        dropdownCloseTree: false,
      });
    } else {
      this.setState({
        dropdownCloseTreeAA: false,
        dropdownCloseOne: false,
        dropdownClose: false,
        dropdownCloseTwo: false,
        dropdownCloseTree: false,
      });
    }
  };

  dropdownOpenTwo = (event) => {
    if (event === true) {
      this.setState({
        dropdownCloseTreeAA: false,
        dropdownCloseTwo: true,
        dropdownCloseOne: false,
        dropdownClose: false,
        dropdownCloseTree: false,
      });
    } else {
      this.setState({
        dropdownCloseTreeAA: false,
        dropdownCloseTwo: false,
        dropdownCloseOne: false,
        dropdownClose: false,
        dropdownCloseTree: false,
      });
    }
  };

  dropdownOpenTree = (event) => {
    if (event === true) {
      this.setState({
        dropdownCloseTreeAA: false,
        dropdownCloseTree: true,
        dropdownCloseTwo: false,
        dropdownCloseOne: false,
        dropdownClose: false,
      });
    } else {
      this.setState({
        dropdownCloseTreeAA: false,
        dropdownCloseTree: false,
        dropdownCloseTwo: false,
        dropdownCloseOne: false,
        dropdownClose: false,
      });
    }
  };

  dropdownOpenTreeAA = (event) => {
    if (event === true) {
      this.setState({
        dropdownCloseTreeAA: true,
        dropdownCloseTree: false,
        dropdownCloseTwo: false,
        dropdownCloseOne: false,
        dropdownClose: false,
      });
    } else {
      this.setState({
        dropdownCloseTreeAA: false,
        dropdownCloseTree: false,
        dropdownCloseTwo: false,
        dropdownCloseOne: false,
        dropdownClose: false,
      });
    }
  };

  dropdownOpenDistance = (event) => {
    if (event === true) {
      this.setState({
        dropdownCloseTreeAA: false,
        dropdownClose: false,
        dropdownCloseOne: false,
        dropdownCloseTwo: false,
        dropdownCloseTree: false,
        dropdownCloseDistance: true,
      });
    } else {
      this.setState({
        dropdownCloseTreeAA: false,
        dropdownClose: false,
        dropdownCloseOne: false,
        dropdownCloseTwo: false,
        dropdownCloseTree: false,
        dropdownCloseDistance: false,
      });
    }
  };

  navCloseModal = () => {
    this.setState({ navmodalShow: false });
  };

  navopenModal = () => {
    this.setState({ navmodalShow: true });
  };

  mobileSubmit = (event) => {
    if (event) {
      // this.setState({
      //   dropdownCloseTree: false,
      // });
      this.setState({ navmodalShow: false }, () => this.onButtonclickType());
      // eslint-disable-next-line
      var newurl =
        window.location.protocol +
        "//" +
        window.location.host +
        "/" +
        this.state.searchValue +
        "/?pricemax=" +
        this.state.selectedMaxNuValueInput +
        "&pricemin=" +
        this.state.selectedMinNuValueInput +
        "&beds=" +
        this.state.selectedBedCount +
        "&baths=" +
        this.state.selectedBathCount +
        "&date=" +
        this.state.selectedDate +
        "&cats=" +
        this.state.cats +
        "&dogs=" +
        this.state.dogs;
      const newUrlOne = newurl.replaceAll(" ", "-");
      window.history.pushState({ path: newUrlOne }, "", newUrlOne);
    }
    if (this.state.searchValue === "") {
      <EmptyState />;
    } else {
      if (
        this.state.selectedDistnaceInput != undefined &&
        this.state.selectedDistnaceInput != 0
      ) {
        // this.setState({prevselectedDistnaceInput:this.state.selectedDistnaceInput});
        localStorage.setItem("isItMobile", true);
        this.triggerDistanceExpandEmitter();
      } else {
        // this.sendAllData();
        this.setItemToLocalStorage("isExpanded", false); // uses to handle componendDiUpdate() in index.js
        this.setState({ active: <SearchResult searchValue={this.state} /> });
      }
    }
  };

  handleDropdownToggleaaa = (e) => {
    this.setState({
      dropdownCloseTree: false,
      dropdownCloseTwo: false,
      dropdownCloseOne: false,
      dropdownClose: false,
    });
  };

  onTextBlur = (e, changes, changesbtn) => {
    const path = window.location.pathname;
    const city = path.split("/")[1].replaceAll("-", " ");
    // let swlat = ReactSession.get("sw_lat");
    // let swlon = ReactSession.get("sw_lon");
    // let nelat = ReactSession.get("ne_lat");
    // let nelon = ReactSession.get("ne_lon");
    // if(changesbtn.key === "Backspace"){
    if (e === "" && changes === "updated") {
      this.setState({
        searchValue: "",
      });
      var newurl =
        window.location.origin +
        '/all/?pricemax=null&pricemin=null&beds=null&baths=null&date=""';
      const newUrlOne = newurl.replaceAll(" ", "-");
      window.history.replaceState({ path: newUrlOne }, "", newUrlOne);
      // this.setState({ active: <SearchResult searchValue={this.state} /> })
    }
    // }
  };

  handleDistancePress = (event) => {
    // Handle logic for applying the filter based on 'kilometers' value
    if (
      this.state.selectedDistnaceInput != null &&
      this.state.selectedDistnaceInput != "" &&
      this.state.selectedDistnaceInput != undefined &&
      this.state.selectedDistnaceInput > 0
    ) {
      this.setState({ dropdownCloseDistance: false });
      this.triggerDistanceExpandEmitter();
    }
  };

  triggerDistanceExpandEmitter = () => {
    localStorage.setItem("isExpandedEventEmited", true);
    this.setItemToLocalStorage("isExpanded", true);
    emitter.emit("distanceChangeEvent", {
      payload: this.buildSendDataObject(),
    });
  };

  setItemToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  buildSendDataObject = () => {
    let isExpanded = localStorage.getItem("isExpanded");

    let payload = {
      companyName: "",
      email: "",
      phone: "",
      addressKey: isExpanded == "true" ? "" : this.state.searchValue,
      title: "",
      description: "",
      bedsMin:
        this.state.selectedBedCount !== null
          ? parseFloat(this.state.selectedBedCount)
          : 0,
      bedsMax: 99,
      bathsMin:
        this.state.selectedBathCount !== null
          ? parseFloat(this.state.selectedBathCount)
          : 0,
      bathsMax: 99,
      rentMin:
        this.state.selectedMinNuValueInput !== null
          ? parseInt(this.state.selectedMinNuValueInput)
          : 0,
      rentMax:
        this.state.selectedMaxNuValueInput !== null ||
        this.state.selectedMaxNuValueInput !== "no-max"
          ? parseInt(this.state.selectedMaxNuValueInput)
          : "",
      startDate: "1/1/2017",
      endDate: this.state.selectedDate !== '""' ? this.state.selectedDate : "",
      cats: this.state.cats === true ? this.state.cats : "",
      dogs: this.state.dogs === true ? this.state.dogs : "",
      latTo: "",
      latFrom: "",
      lngTo: "",
      lngFrom: "",
      propertyType:
        this.state.temp !== undefined && this.state.temp.length > 0
          ? this.state.temp
          : "",
      selectedDistnaceInput: Number(this.state.selectedDistnaceInput) * 1.6,
    };

    return payload;
  };

  triggerOnSeachChangeEmitter = () => {
    localStorage.setItem("isOnSeachChangeEventEmited", true);
    // this.setItemToLocalStorage('isExpanded',true);
    emitter.emit("seachChangeEvent", { payload: this.buildSendDataObject() });
  };

  render() {
    return (
      <EventProvider>
        <div className="main-dev">
          <LoadingOverlay
            active={this.state.isActive}
            spinner
            text="Searching for rentals in your area..."
            styles={{
              overlay: (base) => ({
                ...base,
                background: "rgba(22, 105, 180, 0.8)",
              }),
            }}
          >
            <div id="main-divhedar">
              <Header />
            </div>

            <SearchModule
              onSearchChange={this.onSearchChange}
              handleChangeRedioBtn={this.handleChangeRedioBtn}
              handleChangeRedioBtnBat={this.handleChangeRedioBtnBat}
              handleOndateChange={this.handleOndateChange}
              selectedValue={this.state.selectedDate}
              selectedValueInput={this.state.searchValue}
              selectedMinNuValueInput={this.state.selectedMinNuValueInputnew}
              selectedMaxNuValueInput={this.state.selectedMaxNuValueInputnew}
              onSearchMaxNuChange={this.onSearchMaxNuChange}
              onSearchMinNuChange={this.onSearchMinNuChange}
              onButtonclick={this.maxMinDoneButton}
              selectedBedCount={this.state.selectedBedCount}
              onButtonclickBedAndBath={this.onButtonclickBedAndBath}
              onButtonclickDate={this.onButtonclickDate}
              dropdownClose={this.state.dropdownClose}
              dropdownOpen={this.dropdownOpen}
              dropdownCloseOne={this.state.dropdownCloseOne}
              dropdownOpenOne={this.dropdownOpenOne}
              dropdownCloseTwo={this.state.dropdownCloseTwo}
              dropdownOpenTwo={this.dropdownOpenTwo}
              dropdownCloseTree={this.state.dropdownCloseTree}
              dropdownOpenTree={this.dropdownOpenTree}
              handleChangeRedioBtnDogs={this.handleChangeRedioBtnDogs}
              selecteddogs={this.state.dogs}
              handleChangeRedioBtnCats={this.handleChangeRedioBtnCats}
              selectedCats={this.state.cats}
              onButtonclickPets={this.onButtonclickPet}
              navCloseModal={this.navCloseModal}
              navmodalShow={this.state.navmodalShow}
              navopenModal={this.navopenModal}
              mobileSubmit={this.mobileSubmit}
              selectedBathCount={this.state.selectedBathCount}
              handleClickOutside={this.handleClickOutside}
              onSearchBluur={this.onSearchBluur}
              arrayIndex={this.state.arrayIndex}
              onCloseButtonclick={this.onCloseButtonclick}
              onTextChange={this.onTextChange}
              handleDropdownToggleaaa={this.handleDropdownToggleaaa}
              onTextBlur={this.onTextBlur}
              selectedDatetemp={this.state.selectedDatetemp}
              handleChangeAllTypes={this.handleChangeAllTypes}
              handleChangeTypes={this.handleChangeTypes}
              selectedTpyeAll={this.state.selectedTpyeAll}
              selectedTpyeHometype1={this.state.selectedTpyeHometype1}
              selectedTpyeHometype2={this.state.selectedTpyeHometype2}
              selectedTpyeHometype3={this.state.selectedTpyeHometype3}
              selectedTpyeHometype4={this.state.selectedTpyeHometype4}
              selectedTpyeHometype5={this.state.selectedTpyeHometype5}
              dropdownOpenTreeAA={this.dropdownOpenTreeAA}
              dropdownCloseTreeAA={this.state.dropdownCloseTreeAA}
              allChecked={this.state.allChecked}
              renderList={this.renderList()}
              onButtonclickType={this.onButtonclickType}
              handleDistancePress={this.handleDistancePress}
              onDistanceChange={this.onDistanceChange}
              selectedDistnaceInput={this.state.selectedDistnaceInputnew}
              onDistanceCloseButtonclick={this.onDistanceCloseButtonclick}
              dropdownCloseDistance={this.state.dropdownCloseDistance}
              dropdownOpenDistance={this.dropdownOpenDistance}
            />
            <div id="main-div">
              {this.state.active}
              <ReactJsAlert
                status={this.state.error} // true or false
                type="error" // success, warning, error, info
                title={this.state.errorMas} // title you want to display
                Close={() => this.setState({ error: false })} // callback method for hide
                setTimeout={4000}
              />
            </div>
          </LoadingOverlay>
        </div>
      </EventProvider>
    );
  }
}

export default App;
