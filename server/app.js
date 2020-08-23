import express from 'express';
import BodyParser from 'body-parser';
import cors from 'cors';

import { serverport } from '../etc/config.json';


import * as db from './utils/DataBaseUtils.js';

db.setUpConnection();



const app = express();

app.use(BodyParser.json());
app.use(cors({origin:true,credentials: true}));


app.get('/notes', (req, res) => {
    db.listNotes().then(data => res.send(data));
});

/*app.get('/', (req, res) => {
    res.send("admins don't drink chocolate / Oleg Kuznetsov, 2020");
});*/

app.get('/notes/sort/reversed', (req, res) => {
    db.listNotesReversed().then(data => res.send(data));
});

app.post('/notes', (req, res) => {
    db.createNote(req.body).then(data => res.send(data));
});

app.post('/notes/edit/:id', (req, res) => {
	db.editNote(req.params.id, req.body).then(data => res.send(data));
});

app.post('/notes/edit/withoutDateModify/:id', (req, res) => {
	db.editNoteWithoutDateModify(req.params.id, req.body).then(data => res.send(data));
});

app.delete('/notes/:id', (req, res) => {
    db.deleteNote(req.params.id).then(data => res.send(data));
});

app.get('/notes/filter/date/LowerBound/:date', (req, res) => {
    db.listNotes_dateLowerBound(req.params.date).then(data => res.send(data));
});

app.get('/notes/filter/date/UpperBound/:date', (req, res) => {
    db.listNotes_dateUpperBound(req.params.date).then(data => res.send(data));
});

app.get('/notes/filter/date/range/:startDate/:endDate', (req, res) => {
    db.listNotes_dateRange(req.params.startDate, req.params.endDate).then(data => res.send(data));
});

const server = app.listen(8080, () => {
        console.log('Server ready');
});
