import React from "react";
import constants   from "./constants.js";

let state = 1;

class controller extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
                   message: constants.DEFAULT, 
                   sort: false 
                 }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
  		this.setState({message: value});
  		console.log(`Controller: ${value}`);
  }
}

export function callbackController(value)
{
  	console.log(`callback: ${value}`);
  	console.log(`callback: ${state}`);
}