import React from "react";

import CardsLoader from "./CardsLoader.jsx";
import CardCreator from "./CardCreator.jsx";
import constants   from "./constants.js";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
                   message: constants.DEFAULT, 
                   sort: false 
                 }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
  	if (this.state.message != constants.LOAD_CARDS_REQUEST || value == constants.SUCCESS_LOAD)
  	{
  		this.setState({message: value});
  		console.log(`App:// new message registered: ${value}`);
  	}

    if (value == constants.SORT_REQUEST) {
      this.setState({message: value, sort: !this.state.sort});
      }
  }

  render() { 
    return (
          <div className="container" style={{"maxWidth": "960px"}}>
              <div className="jumbotron jumbotron-fluid">
                  <div className="container">
                      <h1 className="display-4 ml-5">Сдаем курсачи, <br/>смотрим сериалы</h1>
                      <p className="lead ml-5">Небольшое SPA-приложение на React для учета любимых фильмов  🚀</p>
                      <p className="ml-5" style={{color: "grey"}}>Куча кода и немного магии</p>
                  </div>
              </div>
              <div className="row">
                   <div className="col-sm">
                      <h6 style={{"color" : "#b3b4b5"}}>НОВАЯ ЗАПИСЬ</h6>
                      <div className="border rounded" style={{"maxWidth": "600px", "minWidth": "100px"}}><div className="p-3 border rounded"><CardCreator message={this.state.message} parentCallback = {this.handleChange}/> </div> </div>
                      <div className="mt-5"><CardsLoader message={this.state.message} sort={this.state.sort} parentCallback = {this.handleChange}/> </div>
                   </div>
                  <div class="col-sm">
                       <div className="card mt-4 mr-3 ml-3" style={{width: "18rem"}} >
                          <div className="card-body">
                              <h2 className="d-inline">👨🏻‍💻</h2><h3 className="card-title d-inline"> Автор</h3>
                              <p className="card-text"><b>Кузнецов Олег</b><br/>группа М3О-307Б-17</p>
                              <p className="card-text">Использованы технологии:</p>
                          </div>
                          <ul className="list-group list-group-flush">
                              <li className="list-group-item">Express, MongoDB, Mongoose, Body-Parser</li>
                              <li className="list-group-item">WebPack, Babel</li>
                              <li className="list-group-item">React, Axios</li>
                              <li className="list-group-item">Bootstrap</li>
                          </ul>
                          <div className="card-body">
                              <a href="https://vk.com/okuznetcov" className="card-link">VK</a>
                              <a href="https://www.behance.net/okuznetcov" className="card-link">Behance</a>
                          </div>
                      </div>
                 </div>
              </div>
          </div>
      );
  }
}

export default App;