import React, { Component } from "react";
import axios from "axios";

import { Link, Redirect } from "react-router-dom";
import Navbar from "../static/Navbar";
import Footer from "../../templates/Footer";
import Spinner from "../static/Spinner";

export default class Info extends Component {
  constructor(props) {
    super(props);

    let token = "";
    try {
      token = localStorage.getItem("token");
    } catch (err) {
      token = "";
    }

    this.state = {
      employee_id: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      gender: "",
      date_of_birth: "",
      phone_number: "",
      door_no: "",
      street: "",
      area: "",
      state: "",
      pincode: "",
      department: "",
      token: token,
      isLoading: false,
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  resetHandler = () => {
    this.setState({
      employee_id: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      gender: "",
      date_of_birth: "",
      phone_number: "",
      door_no: "",
      street: "",
      area: "",
      state: "",
      pincode: "",
      department: "",
    })
  }

  submitHandler = (e) => {
    e.preventDefault();
    const { token, employee_id } = this.state;
    console.log(token, employee_id);

    this.setState({ isLoading: true }, () => {
      axios
        .get(`http://127.0.0.1:8000/employee/${employee_id}/`, {
          headers: { Authorization: `Token ${token}` },
        })
        .then((res) => {
          if (res.data.status === "success") {
            console.log("The enty found");
            console.log(res.data.data);
            const data = res.data.data;
            this.setState(data);
          } else if (res.data.status === "failed") {
            console.log("No entry found");
            alert("No entry found");
            this.resetHandler();
          }
        })
        .catch((err) => {
          alert("Network error");
          console.log(err);
        });
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 2000);
    });
  };

  render() {
    const {
      employee_id,
      first_name,
      middle_name,
      last_name,
      email,
      gender,
      date_of_birth ,
      phone_number,
      door_no,
      street,
      area,
      state,
      pincode,
      department
    } = this.state;


    return (
      <div>
        {this.state.isLoading ? <Spinner /> : null}
        <Navbar />
        <div
          className="app"
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "30px",
            marginBottom: "40px",
          }}
        >
          <Link to="/logout"className="sideview">Logout</Link>
          <div className="topnav">
            <input
              type="text"
              placeholder="employee id"
              name="employee_id"
              value={this.state.employee_id}
              style={{ marginBottom: "4px" }}
              onChange={this.onChange}
            ></input>
            <button onClick={this.submitHandler}>Search</button>
          </div>

          <table id="customers">
            <tr>
              <td>Authentication ID</td>
              <td>
                {employee_id}
              </td>
            </tr>
            <tr>
              <td>Employee ID</td>
              <td>
              {employee_id}
              </td>
            </tr>
            <tr>
              <td>First Name</td>
              <td>
              {first_name}
              </td>
            </tr>
            <tr>
              <td>Middle Name</td>
              <td>
              {middle_name}
              </td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td>
              {last_name}
              </td>
            </tr>
            <tr>
              <td>Dob</td>
              <td>
              {date_of_birth}
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
              {email}
              </td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>
              {gender}
              </td>
            </tr>
            <tr>
              <td>Address</td>
              <td>
              { `${door_no}  ${street} ${area} ${state} ${pincode}`}
              </td>
            </tr>
            <tr>
              <td>Phone number</td>
              <td>
              {phone_number}
              </td>
            </tr>
            <tr>
              <td>Department</td>
              <td>
              {department}
              </td>
            </tr>
          </table>
        </div>
        <Footer />
      </div>
    );
  }
}