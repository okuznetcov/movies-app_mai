import React from 'react';
import PropTypes from "prop-types";
import API from "../api/index";
import regeneratorRuntime from "regenerator-runtime";
import { apiPrefix } from '../../etc/config.json';
import constants   from "./constants.js";
import CardCreator from "./CardCreator.jsx";
import dateFormat from 'dateformat';


dateFormat.i18n = {
    dayNames: [
        'ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ',
        'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'
    ],
    monthNames: [
        'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек',
        'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
    ],
    timeNames: [
        'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
    ]
};


class CardBlock extends React.Component {
  
  constructor(props) {
    super(props);

    this.data = this.props.data;
    this.id = this.data._id;
    this.title = this.data.title;
    this.text = this.data.text;
    this.color = this.data.color;
    this.createdAt = this.data.createdAt;
    this.deleted = false;
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditor = this.handleEditor.bind(this);
    this.editMode = false;
  }

  handleDelete() {
      this.deleted = true;
      this.callback(`DELETE/${this.id}`);
      this.forceUpdate();
  }

  handleEdit() {
      this.editMode = true;
      console.log(this.editMode);
      this.forceUpdate();
  }

  handleEditor(value) { 
      this.editMode = false;
      this.callback(`EDIT/${this.id}`);
      this.forceUpdate();
  } 

  componentDidUpdate(prevProps) {
    if (this.props.data._id != this.id || this.props.editMode != this.editMode || this.props.title != this.title || this.props.text != this.text || this.props.color  != this.color) {
        this.data = this.props.data;
        this.id = this.props.data._id;
        this.title = this.props.data.title;
        this.text = this.props.data.text;
        this.color = this.props.data.color;
        this.createdAt = this.props.data.createdAt;
        this.deleted = this.props.data.deleted;
        this.editMode = this.props.editMode;
    }
  }

  render() {

    let cardClass = " mt-4 mb-4"
    if (this.editMode)
      cardClass = "card bg-warning" + cardClass;
    else 
      cardClass = "card bg-light" + cardClass;

    console.log(cardClass);

    let card = (
        <div className={cardClass} style={{"maxWidth": "600px"}}>
          <div className="card-header">{this.color}</div>
            <div className="card-body">
              <h5 className="card-title">{this.title}</h5>
              <p className="card-text">{this.text}</p>
              <p className="card-text small" style={{color: "grey"}}>{dateFormat(this.createdAt, "dddd, d mmmm / HH:MM")}</p>
              <button className="btn btn-danger" id="delete" onClick={this.handleDelete}>Удалить</button> 
              <button className="btn btn-link" id="edit" onClick={this.handleEdit}>Редактировать</button> 
          </div>
        </div>
    );

    return (
      <div>
        {!this.deleted ? card : null}
        {this.editMode ? <div><h6 style={{"color" : "#b3b4b5"}}>РЕДАКТИРОВАНИЕ</h6><div className=" border rounded" style={{"maxWidth": "600px"}}><div className="p-3 border rounded"><CardCreator id={this.id} title={this.title} text={this.text} color={this.color} parentCallback = {this.handleEditor}/></div></div><br/></div> : null}
      </div>
    );
  }

  callback(value) {
    this.props.parentCallback(value);
  }
}

CardBlock.PropTypes = {
   data: PropTypes.string,
   id: PropTypes.string,
   title: PropTypes.string,
   text: PropTypes.string,
   color: PropTypes.string,
   createdAt: PropTypes.string,
   deleted: PropTypes.string
};

export default CardBlock;