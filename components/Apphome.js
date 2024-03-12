import React, { Component } from "react";
import './App.css';
import Header from './header';
import EmptyState from './emptystate';
import SearchModule from './searchmodule';
import SearchResult from './searchresult';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import DateObject from "react-date-object";
import data from './data.json';
import ReactJsAlert from "reactjs-alert"
import moment from "moment";
import LoadingOverlay from 'react-loading-overlay';

class Apphome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyNameValue: '',
      active: <EmptyState />,
      searchValue: '',
      searchValuenew: [],
      searchValueOld: '',
      selectedDate: "2015-04-14",
      selectedMinNuValueInput: 0,
      selectedMinNuValueInputnew: [],
      selectedMaxNuValueInput: 0,
      selectedMaxNuValueInputnew: [],
      selectedBedCount: 0,
      selectedBathCount: 0,
      cats: false,
      dogs: false,
      dropdownClose: false,
      dropdownCloseOne: false,
      dropdownCloseTwo: false,
      dropdownCloseTree: false,
      swlat: '',
      swlon: '',
      nelat: '',
      nelon: '',
      error: false,
      errorMas: '',
      tempValue: '',
      selectedDatetemp: '',
      isActive: false,
      loctionIDA: '',
    };
    this.handleOndateChange = this.handleOndateChange.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    const path = window.location.pathname;
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    const tempcity = path.split('/')[1].replaceAll(" ", ',');
    const containsCompany = tempcity.includes('company');

    let cityOne = tempcity.replaceAll('-', " ");
    let city = '';
    let company = '';
    if (containsCompany == true) {
      if (cityOne.split(",").length > 2) {
        company = cityOne.replace(',', '');
      } else {
        company = cityOne;
      }

    } else {
      cityOne = this.replaceLastDashWithComma(cityOne);


      if (cityOne.split(",").length > 2) {
        city = cityOne.replace(',', '');
      } else {
        city = cityOne;
      }

    }
    const locationID = params.get('locationID');
    const date = params.get('date');
    const min = params.get('pricemin');
    const max = params.get('pricemax');
    const beds = params.get('beds');
    const baths = params.get('baths');
    const dogs = params.get('dogs');
    const cats = params.get('cats');
    const dateNew = date ? new Date(date) : new Date();

    if (city === "no current location") {
      <EmptyState />
    }
    this.setState({
      companyNameValue: company,
      searchValue: (city === "all" || city === "no current location") ? "" : city,
      tempValue: city,
      searchValuenew: (city) ? [city] : [],
      selectedDate: date,
      selectedMinNuValueInput: min,
      selectedMinNuValueInputnew: (min) ? [min] : [],
      selectedMaxNuValueInput: max,
      selectedMaxNuValueInputnew: (max) ? [max] : [],
      selectedBedCount: beds,
      selectedBathCount: baths,
      dogs: (dogs === 'true') ? true : false,
      cats: (cats === 'true') ? true : false,
      navmodalShow: false,
      arrayIndex: [],
      selectedDatetemp: dateNew,
      loctionIDA: locationID ? locationID : null
    })
    document.getElementById('main-div') && document.getElementById('main-div').addEventListener("click", this.handleClickOutside);
    document.getElementById('main-divhedar') && document.getElementById('main-divhedar').addEventListener("click", this.handleClickOutsidehedare);
    this.getAllindex();
  }





  componentDidUpdate(prevProps, prevState) {

    // if the current page changes, or the search term changes.
    if (prevState.searchValue !== this.state.searchValue ||
      prevState.selectedDate !== this.state.selectedDate) {
      if (this.state.tempValue === "no current location") {
        if (this.state.searchValue === "") {
          <EmptyState />
        } else {

          this.setState({ active: <SearchResult searchValue={this.state} /> })
        }
      } else {
        this.setState({ active: <SearchResult searchValue={this.state} /> })
      }
    }
  }

  componentWillUnmount() {

    document.getElementById('main-div') && document.getElementById('main-div').removeEventListener("mousedown", this.handleClickOutside);
    document.getElementById('main-divhedar') && document.getElementById('main-divhedar').removeEventListener("mousedown", this.handleClickOutsidehedare);
  }

  getAllindex() {
    axios.get(process.env.REACT_APP_BASE_URL + "getAllIndex",
      { headers: { 'content-type': 'application/json' } }).then((response) => {
        let returnArrayIndex = []
        if (response) {
          response.data.forEach(element => {
            if (!returnArrayIndex.includes(element.city + ', ' + element.state)) {
              returnArrayIndex.push(element.city + ', ' + element.state);
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
        })
      })
  }



  onSearchChange = (event, changeBtn) => {
    if (event === 'current_location') {
      this.setState({
        isActive: true,
      })
      navigator.geolocation.getCurrentPosition((position) => {
        var latitudele = position.coords.latitude;
        var longitudele = position.coords.longitude;
        axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + latitudele + ',' + longitudele + '&key=' + 'AIzaSyCGrAFYT6K85SUYIW7C1MVD7dXHm3islmQ')
          .then((response) => {
            // var total2 = response.data.results[0].address_components[3].long_name;

            var filterCity = response.data.results[0].address_components.filter(result => result.types.includes("locality"))
            var filterState = response.data.results[0].address_components.filter(result => result.types.includes("administrative_area_level_1"))

            var total2 = filterCity[0].long_name + ", " + filterState[0].short_name;

            var myString = total2.replace(/\s+/g, '-');
            this.setState({
              isActive: false,
              searchValue: total2,
              searchValuenew: [total2],
              swlat: "",
              swlon: "",
              nelat: "",
              nelon: "",
            })
            this.setUrl(myString);
          })
      }, (err) => {
        this.setState({
          isLoggedIn: false,
          error: true,
          errorMas: 'Error obteniendo localización: ' + err.message,
        });
      });
    } else {
      this.setState({
        searchValuenew: [],
        searchValue: event,
        swlat: "",
        swlon: "",
        nelat: "",
        nelon: "",
      })
      this.setUrl(event);
    }

    // if(event[0] === undefined){
    //     this.setState({
    //       searchValuenew: [],
    //       searchValue: event[0]
    //     })
    //     this.setUrl(event[0]);
    // }else if(event.length > 0 && event[0] !== "current_location"){
    //   this.setState({
    //     searchValuenew: event,
    //     searchValue: event[0]
    //   })
    //   this.setUrl(event[0]);
    // }else  if(event[0] === "current_location"){
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     var latitudele = position.coords.latitude;
    //     var longitudele = position.coords.longitude;
    //     axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + latitudele + ',' + longitudele + '&key=' + 'AIzaSyCGrAFYT6K85SUYIW7C1MVD7dXHm3islmQ' )
    //     .then((response) => {
    //       var total2 = response.data.results[0].address_components[3].long_name;
    //       this.setState({
    //         searchValue: total2,
    //         searchValuenew: [total2],
    //       })
    //       this.setUrl(total2);
    //     })
    //     // this.setUrl(total2);
    //   }); 
    // }else{
    //   this.setState({
    //     searchValuenew: event,
    //     searchValue: event[0]
    //   })
    //   this.setUrl(event[0]);
    // }
  };

  handleBackspace(event) {
    // console.log(event, '');
  }

  setUrl(searchTest) {
    if (searchTest !== undefined) {
      if (this.state.searchValue !== "" && this.state.selectedMinNuValueInput !== "" && this.state.selectedMaxNuValueInput !== "") {
        // eslint-disable-next-line
        var newurl = window.location.origin + '/' + searchTest + '/?pricemax=null&pricemin=null&beds=null&baths=null&date=""';
        const newUrlOne = newurl.replaceAll(", ", "-");
        const newUrlTwo = newUrlOne.replaceAll(" ", "-");
        window.history.pushState({ path: newUrlTwo }, '', newUrlTwo);
        // dispatch(push(newurl));
      } else if (searchTest !== "") {
        // eslint-disable-next-line
        var newurl = window.location.origin + '/' + searchTest;
        const newUrlOne = newurl.replaceAll(", ", "-");
        const newUrlTwo = newUrlOne.replaceAll(" ", "-");
        window.history.pushState({ path: newUrlTwo }, '', newUrlTwo);
      } else {
        // eslint-disable-next-line
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        const newUrlOne = newurl.replaceAll(", ", "-");
        const newUrlTwo = newUrlOne.replaceAll(" ", "-");
        window.history.pushState({ path: newUrlTwo }, '', newUrlTwo);
      }
      this.setState({
        searchValue: searchTest
      })
      if (this.state.searchValue === "") {
        <EmptyState />
      } else {
        // this.sendAllData();
        this.setState({ active: <SearchResult searchValue={this.state} /> })
      }
    } else {
      // eslint-disable-next-line
      var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      const newUrlOne = newurl.replaceAll(", ", "-");
      const newUrlTwo = newUrlOne.replaceAll(" ", "-");
      window.history.pushState({ path: newUrlTwo }, '', newUrlTwo);

      this.setState({
        searchValue: searchTest
      })
      if (this.state.searchValue === "") {
        <EmptyState />
      } else {
        // this.sendAllData();
        this.setState({ active: <SearchResult searchValue={this.state} /> })
      }
    }
  }

  sendAllData() {
    var date = new DateObject(this.state.selectedDate);
    this.setState({
      loading: true
    })
    if (this.state.cats !== null || this.state.dogs !== null) {
      var data = JSON.stringify({
        "companyName": "",
        "email": "",
        "phone": "",
        "propertyType": "",
        "addressKey": (this.state.searchValue !== null) ? this.state.searchValue : "",
        "title": "",
        "description": "",
        "bedsMin": (this.state.selectedBedCount !== null) ? parseFloat(this.state.selectedBedCount) : 0,
        "bedsMax": 99,
        "bathsMin": (this.state.selectedBathCount !== null) ? parseFloat(this.state.selectedBathCount) : 0,
        "bathsMax": 99,
        "rentMin": (this.state.selectedMinNuValueInput !== null) ? parseInt(this.state.selectedMinNuValueInput) : 0,
        "rentMax": (this.state.selectedMaxNuValueInput !== null) ? parseInt(this.state.selectedMaxNuValueInput) : "",
        "startDate": "1/1/2017",
        "endDate": (this.state.selectedDate !== null) ? date.format("MM/DD/YYYY") : "",
        "cats": (this.state.cats !== null) ? this.state.cats : false,
        "dogs": (this.state.dogs !== null) ? this.state.dogs : false,
      });
    } else {
      var data = JSON.stringify({
        "companyName": "",
        "email": "",
        "phone": "",
        "propertyType": "",
        "addressKey": (this.state.searchValue !== null) ? this.state.searchValue : "",
        "title": "",
        "description": "",
        "bedsMin": (this.state.selectedBedCount !== null) ? parseFloat(this.state.selectedBedCount) : 0,
        "bedsMax": 99,
        "bathsMin": (this.state.selectedBathCount !== null) ? parseFloat(this.state.selectedBathCount) : 0,
        "bathsMax": 99,
        "rentMin": (this.state.selectedMinNuValueInput !== null) ? parseInt(this.state.selectedMinNuValueInput) : 0,
        "rentMax": (this.state.selectedMaxNuValueInput !== null) ? parseInt(this.state.selectedMaxNuValueInput) : "",
        "startDate": "1/1/2017",
        "endDate": (this.state.selectedDate !== null) ? date.format("MM/DD/YYYY") : ""
      });
    }

    axios.post(process.env.REACT_APP_BASE_URL + "filterAddress", data,
      { headers: { 'content-type': 'application/json' } })
      .then((response) => {
        this.setState({ active: <SearchResult searchValue={response.data} /> })
      })
  }

  onSearchBluur = (event) => {
    if (this.state.searchValue !== "" && this.state.selectedMinNuValueInput !== "" && this.state.selectedMaxNuValueInput !== "") {
      // eslint-disable-next-line
      var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?searchText=' + event.target.value + '/pricemax=null&pricemin=null&beds=null&baths=null&date=""';
      window.history.pushState({ path: newurl }, '', newurl);
    } else if (event.state.searchValue !== "") {
      // eslint-disable-next-line
      var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?searchText=' + event.target.value;
      window.history.pushState({ path: newurl }, '', newurl);
    } else {
      // eslint-disable-next-line
      var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      window.history.pushState({ path: newurl }, '', newurl);
    }
    // this.setState({
    //   searchValue: event.target.value
    // })
    if (this.state.searchValue === "") {
      <EmptyState />
    } else {
      // this.sendAllData();
    }
  }

  onloadData(city) {
    if (city === "") {
      <EmptyState />
    } else {
      // this.sendAllData();
      // this.setState({ active: <SearchResult searchValue={city} /> })
    }
  }

  handleChangeRedioBtn = (event) => {

    this.setState({
      selectedBedCount: event.target.value
    })
  }

  handleChangeRedioBtnBat = (event) => {
    this.setState({
      selectedBathCount: event.target.value
    })
  }

  handleOndateChange(value) {
    // this.setState({
    //   selectedDate: event.target.value,
    // })
    // console.log(new Date(), 'assssssss');
    var date = new DateObject(value);
    var newValue = date.format('MM/DD/YYYY');
    this.setState({
      selectedDate: newValue,
      selectedDatetemp: value
    })
  }

  onSearchMaxNuChange = (event) => {
    this.setState({
      selectedMaxNuValueInput: event[0],
      selectedMaxNuValueInputnew: event
    })
  }

  onSearchMinNuChange = (event) => {
    this.setState({
      selectedMinNuValueInput: event[0],
      selectedMinNuValueInputnew: event
    })
  }

  handleChangeRedioBtnDogs = (event) => {
    this.setState({
      dogs: event
    })
  }

  handleChangeRedioBtnCats = (event) => {
    this.setState({
      cats: event
    })
  }

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
    });
  }


  maxMinDoneButton = (event) => {
    if (event) {
      if (this.state.searchValue !== "") {
        // eslint-disable-next-line
        var newurl = window.location.protocol + "//" + window.location.host + '/' + this.state.searchValue + '/?pricemax=' + this.state.selectedMaxNuValueInput + '&&pricemin=' + this.state.selectedMinNuValueInput;
        const newUrlOne = newurl.replaceAll(" ", "-");
        window.history.pushState({ path: newUrlOne }, '', newUrlOne);
        this.setState({
          dropdownClose: false,
        });
      } else {
        // eslint-disable-next-line
        var newurl = window.location.protocol + "//" + window.location.host + '/?pricemax=' + this.state.selectedMaxNuValueInput + '&&pricemin=' + this.state.selectedMinNuValueInput;
        const newUrlOne = newurl.replaceAll(" ", "-");
        window.history.pushState({ path: newUrlOne }, '', newUrlOne);
        this.setState({
          dropdownClose: false,
        });
      }

      if (this.state.searchValue === "") {
        <EmptyState />
      } else {
        // this.sendAllData();
        this.setState({ active: <SearchResult searchValue={this.state} /> })
      }
    }
  }

  onButtonclickBedAndBath = (event) => {
    if (event) {
      if (this.state.searchValue !== "") {
        this.setState({
          dropdownCloseOne: false,
        });
        // eslint-disable-next-line
        var newurl = window.location.protocol + "//" + window.location.host + '/' + this.state.searchValue + '/?pricemax=' + this.state.selectedMaxNuValueInput + '&pricemin=' + this.state.selectedMinNuValueInput + '&beds=' + this.state.selectedBedCount + '&baths=' + this.state.selectedBathCount;
        const newUrlOne = newurl.replaceAll(" ", "-");
        window.history.pushState({ path: newUrlOne }, '', newUrlOne);
      } else {
        this.setState({
          dropdownCloseOne: false,
        });
        // eslint-disable-next-line
        var newurl = window.location.protocol + "//" + window.location.host + '/?pricemax=' + this.state.selectedMaxNuValueInput + '&pricemin=' + this.state.selectedMinNuValueInput + '&beds=' + this.state.selectedBedCount + '&baths=' + this.state.selectedBathCount;
        const newUrlOne = newurl.replaceAll(" ", "-");
        window.history.pushState({ path: newUrlOne }, '', newUrlOne);
      }
    }
    if (this.state.searchValue === "") {
      <EmptyState />
    } else {
      // this.sendAllData();
      this.setState({ active: <SearchResult searchValue={this.state} /> })
    }
  }

  onButtonclickDate = (event) => {
    if (event) {
      if (this.state.searchValue !== "") {
        this.setState({
          dropdownCloseTwo: false,
        });
        // eslint-disable-next-line
        var newurl = window.location.protocol + "//" + window.location.host + '/' + this.state.searchValue + '/?pricemax=' + this.state.selectedMaxNuValueInput + '&pricemin=' + this.state.selectedMinNuValueInput + '&beds=' + this.state.selectedBedCount + '&baths=' + this.state.selectedBathCount + '&date=' + this.state.selectedDate;
        const newUrlOne = newurl.replaceAll(" ", "-");
        window.history.pushState({ path: newUrlOne }, '', newUrlOne);
      } else {
        this.setState({
          dropdownCloseTwo: false,
        });
        // eslint-disable-next-line
        var newurl = window.location.protocol + "//" + window.location.host + '/?pricemax=' + this.state.selectedMaxNuValueInput + '&pricemin=' + this.state.selectedMinNuValueInput + '&beds=' + this.state.selectedBedCount + '&baths=' + this.state.selectedBathCount + '&date=' + this.state.selectedDate;
        const newUrlOne = newurl.replaceAll(" ", "-");
        window.history.pushState({ path: newUrlOne }, '', newUrlOne);
      }
    }
    if (this.state.searchValue === "") {
      <EmptyState />
    } else {
      // this.sendAllData();
      this.setState({ active: <SearchResult searchValue={this.state} /> })
    }
  }

  onButtonclickPet = (event) => {
    if (event) {
      if (this.state.searchValue !== "") {
        this.setState({
          dropdownCloseTree: false,
        });
        // eslint-disable-next-line
        var newurl = window.location.protocol + "//" + window.location.host + '/' + this.state.searchValue + '/?pricemax=' + this.state.selectedMaxNuValueInput + '&pricemin=' + this.state.selectedMinNuValueInput + '&beds=' + this.state.selectedBedCount + '&baths=' + this.state.selectedBathCount + '&date=' + this.state.selectedDate + '&cats=' + this.state.cats + '&dogs=' + this.state.dogs;
        const newUrlOne = newurl.replaceAll(" ", "-");
        window.history.pushState({ path: newUrlOne }, '', newUrlOne);
      } else {
        this.setState({
          dropdownCloseTree: false,
        });
        // eslint-disable-next-line
        var newurl = window.location.protocol + "//" + window.location.host + '/?pricemax=' + this.state.selectedMaxNuValueInput + '&pricemin=' + this.state.selectedMinNuValueInput + '&beds=' + this.state.selectedBedCount + '&baths=' + this.state.selectedBathCount + '&date=' + this.state.selectedDate + '&cats=' + this.state.cats + '&dogs=' + this.state.dogs;
        const newUrlOne = newurl.replaceAll(" ", "-");
        window.history.pushState({ path: newUrlOne }, '', newUrlOne);
      }
    }
    if (this.state.searchValue === "") {
      <EmptyState />
    } else {
      // this.sendAllData();
      this.setState({ active: <SearchResult searchValue={this.state} /> })
    }
  }

  dropdownOpen = (event) => {
    if (event === true) {
      this.setState({
        dropdownClose: true,
        dropdownCloseOne: false,
        dropdownCloseTwo: false,
        dropdownCloseTree: false,
      });
    } else {
      this.setState({
        dropdownClose: false,
        dropdownCloseOne: false,
        dropdownCloseTwo: false,
        dropdownCloseTree: false,
      });
    }
  }

  dropdownOpenOne = (event) => {
    if (event === true) {
      this.setState({
        dropdownCloseOne: true,
        dropdownClose: false,
        dropdownCloseTwo: false,
        dropdownCloseTree: false,
      });
    } else {
      this.setState({
        dropdownCloseOne: false,
        dropdownClose: false,
        dropdownCloseTwo: false,
        dropdownCloseTree: false,
      });
    }
  }

  dropdownOpenTwo = (event) => {
    if (event === true) {
      this.setState({
        dropdownCloseTwo: true,
        dropdownCloseOne: false,
        dropdownClose: false,
        dropdownCloseTree: false,
      });
    } else {
      this.setState({
        dropdownCloseTwo: false,
        dropdownCloseOne: false,
        dropdownClose: false,
        dropdownCloseTree: false,
      });
    }
  }

  dropdownOpenTree = (event) => {
    if (event === true) {
      this.setState({
        dropdownCloseTree: true,
        dropdownCloseTwo: false,
        dropdownCloseOne: false,
        dropdownClose: false,
      });
    } else {
      this.setState({
        dropdownCloseTree: false,
        dropdownCloseTwo: false,
        dropdownCloseOne: false,
        dropdownClose: false,
      });
    }
  }

  navCloseModal = () => {
    this.setState({ navmodalShow: false })
  }

  navopenModal = () => {
    this.setState({ navmodalShow: true })
  }



  mobileSubmit = (event) => {
    if (event) {
      // this.setState({
      //   dropdownCloseTree: false,
      // });
      this.setState({ navmodalShow: false })
      // eslint-disable-next-line
      var newurl = window.location.protocol + "//" + window.location.host + '/' + this.state.searchValue + '/?pricemax=' + this.state.selectedMaxNuValueInput + '&pricemin=' + this.state.selectedMinNuValueInput + '&beds=' + this.state.selectedBedCount + '&baths=' + this.state.selectedBathCount + '&date=' + this.state.selectedDate + '&cats=' + this.state.cats + '&dogs=' + this.state.dogs;
      const newUrlOne = newurl.replaceAll(" ", "-");
      window.history.pushState({ path: newUrlOne }, '', newUrlOne);
    }
    if (this.state.searchValue === "") {
      <EmptyState />
    } else {
      // this.sendAllData();
      this.setState({ active: <SearchResult searchValue={this.state} /> })
    }
  }

  handleDropdownToggleaaa = (e) => {
    this.setState({
      dropdownCloseTree: false,
      dropdownCloseTwo: false,
      dropdownCloseOne: false,
      dropdownClose: false,
    });
  }

  onTextBlur = (e, changes, changesbtn) => {
    const path = window.location.pathname;
    const city = path.split('/')[1].replaceAll('-', " ");
    // let swlat = ReactSession.get("sw_lat");
    // let swlon = ReactSession.get("sw_lon");
    // let nelat = ReactSession.get("ne_lat");
    // let nelon = ReactSession.get("ne_lon");
    // if(changesbtn.key === "Backspace"){
    if (e === "" && changes === 'updated') {
      this.setState({
        searchValue: "",
      });
      var newurl = window.location.origin + '/all/?pricemax=null&pricemin=null&beds=null&baths=null&date=""';
      const newUrlOne = newurl.replaceAll(" ", "-");
      window.history.replaceState({ path: newUrlOne }, '', newUrlOne);
      // this.setState({ active: <SearchResult searchValue={this.state} /> })
    }
    // }
  }

  render() {
    return (

      <div className="main-dev">

        <LoadingOverlay
          active={this.state.isActive}
          spinner
          text='Searching for rentals in your area...'
          styles={{
            overlay: (base) => ({
              ...base,
              background: 'rgba(22, 105, 180, 0.8)'
            })
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
          />
          <div id="main-div">
            {this.state.active}
            <ReactJsAlert
              status={this.state.error}   // true or false
              type="error"   // success, warning, error, info
              title={this.state.errorMas}   // title you want to display
              Close={() => this.setState({ error: false })}   // callback method for hide
              setTimeout={4000}
            />

          </div>
        </LoadingOverlay>
      </div>
    );
  }
}

export default Apphome;
