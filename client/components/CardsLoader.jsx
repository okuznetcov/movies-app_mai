import React from "react";

import API from "../api/index";
import CardBlock from "./CardBlock.jsx";
import regeneratorRuntime from "regenerator-runtime";
import { apiPrefix } from '../../etc/config.json';
import constants   from "./constants.js";
import { callbackController } from "./controller.jsx";

class CardsLoader extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: [],
      sorting: this.props.sort
    };

    console.log(`CardsLoader: firstload / sort: ${this.state.sorting}`);

    this.handleCard = this.handleCard.bind(this);
    this.handleSort= this.handleSort.bind(this);
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.message == constants.LOAD_CARDS_REQUEST) {
        console.log("updateRequest");
        this.getNotes();
      } else if (nextProps.message == constants.SORT_REQUEST) {
        this.setState({sorting: nextProps.sort});
        this.callback(constants.LOAD_CARDS_REQUEST);
      }
  }

  handleCard(value) {
      let action = value.split('/')[0];
      let id =     value.split('/')[1];

      if (action == "DELETE") {
          console.log(id);
          this.deleteCard(id);
      } else if (action == "EDIT") {
          this.callback(constants.LOAD_CARDS_REQUEST);
      }
  } 

  handleSort() {
    console.log("SortButton Pressed. Sending request");
    this.controllerSend(constants.SORT_REQUEST);
    this.callback(constants.SORT_REQUEST);
  }



  deleteCard(id) {
      API.delete(`/notes/${id}`).then(res => {
        console.log(res);
      })
  }

  render() { 

      const {isLoading, data} = this.state;
      let sortClass = "btn btn-outline-";

      const loadingMessage = (
        <center>
          <div>
            <div className="spinner-border mt-5" role="status">
              <span className="sr-only mt-5">Loading...</span>
            </div>
            <p style={{color: "grey"}}>Admins do not drink chocolate</p>
          </div>
        </center>);


      if (this.state.sorting)
            sortClass = sortClass + "warning";
      else 
            sortClass = sortClass + "success";

      let cards = data.map(s => ( <CardBlock data={s} parentCallback={this.handleCard}/> ));

      return (
        <div>
          <div className="text-center">
            <button className={sortClass} onClick={this.handleSort}>
              {this.state.sorting ? 'Сначала старые' : 'Сначала новые'}
            </button>
          </div>
          {isLoading ? loadingMessage : cards}
        </div>
      );
  }

  async componentDidMount() {
      this.getNotes()
  } 


  async getNotes() {

    let url = `/task`;
    
    if (this.state.sorting) {
      url = url + `/sort/reversed`
      console.log(url);  
    }

    let userData = await API.get(url);

        const data = userData.data;
        this.prevQty = data.length;

        this.setState({
          ...this.state, ...{
            isLoading: false,
            data
          }
        });

      this.callback(constants.SUCCESS_LOAD);  

      console.log(`GET COMPLETE / Sorting: ${this.state.sorting} / URL: ${url}`);  
      console.log(userData);  
  } 

  callback(value) {
    this.props.parentCallback(value);
  }

  controllerSend(value) {
    callbackController(value);
  }
}

export default CardsLoader;