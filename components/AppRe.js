import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import Form from "react-bootstrap/esm/Form";
import axios from "axios";
import EmptyState from "./emptystate";
import ReactJsAlert from "reactjs-alert";
import LoadingOverlay from "react-loading-overlay";
import { useRouter } from "next/navigation";

const Loading = ({ path }) => {
  console.log("path", path);
  const router = useRouter();
  useEffect(() => {
    router.push(path);
  }, []);
};

class LoginWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      searchValue: "",
      error: false,
      errorMas: "",
      isActive: false,
    };
  }

  componentDidMount() {
    this.handleSubmit();
    if ("geolocation" in navigator) {
      console.log("Available");
    } else {
      console.log("Not Available");
    }
  }

  handleSubmit = (event) => {
    // event.preventDefault();
    // const form = event.target;
    // const password = form.elements.password.value;
    // const navigate = useNavigate();
    // Check the password against the correct password
    if (!("geolocation" in navigator)) {
      return;
    }

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
            if (response.data.results.length > 0) {
              var filterCity =
                response.data.results[0].address_components.filter((result) =>
                  result.types.includes("locality")
                );
              var filterState =
                response.data.results[0].address_components.filter((result) =>
                  result.types.includes("administrative_area_level_1")
                );

              var total2 =
                filterCity[0].long_name + " " + filterState[0].short_name;

              var maploc = total2.replaceAll(" ", "-");

              this.setState({
                isActive: false,
                isLoggedIn: true,
                searchValue: maploc,
              });
            } else {
              this.setState({
                isActive: false,
                isLoggedIn: false,
                error: true,
                errorMas: response.data.error_message,
              });
            }
          });
      },
      (err) => {
        this.setState({
          isActive: false,
          isLoggedIn: true,
          searchValue: "no-current-location",
        });
      }
    );
    // this.setState({ redirect: "/about" });
    // navigate('/about', { replace: true });
  };

  render() {
    return (
      <>
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
          <div className="password-form-wrapper">
            {/* <Form onSubmit={this.handleSubmit} className="password-form">
              <Form.Label>
                Password:
                <Form.Control type="password" name="password" />
              </Form.Label>
              <Button type="submit">Log in</Button>
            </Form> */}
            <ReactJsAlert
              status={this.state.error} // true or false
              type="error" // success, warning, error, info
              title={this.state.errorMas} // title you want to display
              Close={() => this.setState({ error: false })} // callback method for hide
              setTimeout={4000}
            />
          </div>
        </LoadingOverlay>

        {this.state.searchValue && (
          <Loading path={`/${this.state.searchValue}`} />
        )}
      </>
    );
    // return this.state.isLoggedIn ? (
    //
    // ) : (
    // <LoadingOverlay
    //   active={this.state.isActive}
    //   spinner
    //   text='Searching for rentals in your area...'
    //   styles={{
    //     overlay: (base) => ({
    //       ...base,
    //       background: 'rgba(22, 105, 180, 0.8)'
    //     })
    //   }}
    // >
    //   <div className="password-form-wrapper">

    //     <Form onSubmit={this.handleSubmit} className="password-form">
    //       <Form.Label>
    //         Password:
    //         <Form.Control type="password" name="password" />
    //       </Form.Label>
    //       <Button type="submit">Log in</Button>
    //     </Form>
    //     <ReactJsAlert
    //       status={this.state.error}   // true or false
    //       type="error"   // success, warning, error, info
    //       title={this.state.errorMas}   // title you want to display
    //       Close={() => this.setState({ error: false })}   // callback method for hide
    //       setTimeout={4000}
    //     />
    //   </div>
    // </LoadingOverlay>
    // );
    // }
  }
}

export default LoginWrapper;
