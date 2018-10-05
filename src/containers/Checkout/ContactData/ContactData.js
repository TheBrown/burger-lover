import React, { Component } from "react";

import axios from "../../../axios-orders";

import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postCode: ""
    },
    loading: false
  };

  orderHandler = e => {
    e.preventDefault();
    // console.log(this.props.ingredients);

    this.setState({ loading: true });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "test",
        email: "test@test.com",
        address: {
          country: "laos",
          street: "Sokpaluang Road",
          zipcode: "01000"
        }
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(res => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(err => this.setState({ loading: false }));
  };

  render() {
    let form = (
      <form action="">
        <input
          type="text"
          className={classes.Input}
          name="name"
          placeholder="Your Name"
        />
        <input
          type="text"
          className={classes.Input}
          name="email"
          placeholder="Your Email"
        />
        <input
          type="text"
          className={classes.Input}
          name="street"
          placeholder="Street"
        />
        <input
          type="text"
          className={classes.Input}
          name="postal"
          placeholder="Postal Code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4> {form}
      </div>
    );
  }
}

export default ContactData;
