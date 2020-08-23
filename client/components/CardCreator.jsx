import React from 'react';
import API from "../api/index";
import regeneratorRuntime from "regenerator-runtime";
import { apiPrefix } from '../../etc/config.json';
import CardsLoader from "./CardsLoader.jsx";
import constants   from "./constants.js";

class CardCreator extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
       title: this.props.title,
       text: this.props.text, 
       color: this.props.color
    };

    this.inEditMode = false;
    this.id = this.props.id;
    this.сhangeHandler = this.сhangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.changeDate = false;

    if (this.id != null)
      this.inEditMode = true;
    else
      this.state = {color: '📹 Фильм'};
  }

  submitHandler(event) {
    event.preventDefault();
    this.saveNote();
    this.setState({ title: '', text: '', color: ''});
  }

  сhangeHandler(event) {
    let nam = event.target.name;
    let val = event.target.value;
    console.log(nam);
    console.log(val);
    this.setState({
      [nam]: val
    });

    if (nam == "changeDate")
      this.changeDate = !this.changeDate;
  }

  render() {

    let now = new Date();

    const editorCheckbox = <div className="text-right form-check mt-2"><input name="changeDate" type="checkbox" onChange={this.сhangeHandler} className="form-check-input"></input><label className="form-check-label">Не изменять дату</label><br/><small id="passwordHelpInline" class="text-muted">Если изменить дату, записи будет присвоена текущая дата</small></div>;
    const checkboxHelper = <small id="passwordHelpInline" class="text-muted">Must be 8-20 characters long.</small>

    return (
      <div>
          <form onSubmit={this.submitHandler}>
              {this.inEditMode ? <h1>⚒ {this.state.title}</h1> : <h1>🍿 Я посмотрел {this.state.title}</h1>}
              <input
                  className="form-control form-control-lg"
                  type='text'
                  name='title'
                  onChange={this.сhangeHandler}
                  placeholder='Название'
                  value={this.state.title}
              />

              <div className="input-group mt-2" style={{'minHeight': "100px"}}>
                  <div className="input-group-prepend">
                      <span className="input-group-text" style={{"minWidth": "110px"}}>Описание</span>
                  </div>
                  <textarea className="form-control" aria-label="With textarea"
                      type='text'
                      name='text'
                      onChange={this.сhangeHandler}
                      placeholder='Напишите пару слов о картине...'
                      value={this.state.text}
                  />
              </div>
              <div className="input-group mt-2">
                  <div className="input-group-prepend">
                        <p className="input-group-text" style={{"minWidth": "110px"}}>Категория</p>
                  </div>
                  <select name='color' className="custom-select" value={this.state.color} onChange={this.сhangeHandler}>
                        <option value='📹 Фильм'>📹 Фильм</option>
                        <option value='🎞 Сериал'>🎞 Сериал</option>
                        <option value='📺 Короткометражка'>📺 Короткометражка</option>
                        <option value='🖥 YouTube / Vimeo'>🖥 YouTube / Vimeo</option>
                  </select>
              </div>
              {this.inEditMode ? editorCheckbox : null}
              <div className="text-right">
                  <input type='submit' className="btn btn-primary mt-2" value="Сохранить"/>
              </div>
          </form>
      </div>
    );
  }

  saveNote() {

    let url = "/notes";

    console.log(url);
    
    if (this.inEditMode)
        url = `/notes/edit/${this.props.id}`;
    
    if (this.inEditMode && this.changeDate)
        url = `/notes/edit/withoutDateModify/${this.id}`;
    
    var code = 0;

    API.post(url, {
        title: this.state.title,
        text: this.state.text,
        color: this.state.color
    })
    .then(response => {
      this.callback(constants.LOAD_CARDS_REQUEST)
    })
    .catch(error => {
      this.callback(constants.SEND_CARD_ERR)
    });
  }

  callback(value) {
      this.props.parentCallback(value);
  }
}

export default CardCreator;