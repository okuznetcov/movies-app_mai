import mongoose from "mongoose";

import '../models/Note';

import config from '../../etc/config.json';


const Note = mongoose.model('Note');

export function setUpConnection() {
	mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`)
}

export function listNotes() {
	return Note.find().sort({createdAt: 'descending'});
}

export function listNotesReversed() {
	return Note.find().sort({createdAt: 'ascending'});
}

export function createNote(data) {
	const note = new Note({
		title:     data.title,
		text:      data.text,
		color:     data.color,
		createdAt: new Date()
	});
	return note.save();
}

export function deleteNote(id) {
	return Note.findById(id).remove();
}

export function editNote(id, data) {
	return Note.findByIdAndUpdate(id, { title:     data.title,
									    text:      data.text,
		                                color:     data.color,
		                                createdAt: new Date()
		                              } );
}

export function editNoteWithoutDateModify(id, data) {
	return Note.findByIdAndUpdate(id, { title:     data.title,
									    text:      data.text,
		                                color:     data.color
		                              } );
}

export function listNotes_dateLowerBound(date) {
	return Note.find({createdAt: { $gte: date }});
}

export function listNotes_dateUpperBound(date) {
	return Note.find({createdAt: { $lte: date }});
}

export function listNotes_dateRange(startDate, endDate) {
	return Note.find
	({
			$and:
			[  
			    	{createdAt: { $gte: startDate }}, 
			    	{createdAt: { $lte: endDate }}
			]
    });
}