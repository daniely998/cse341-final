const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Songs']
    try {
        const result = await mongodb.getDatabase().db().collection('songs').find();
        result.toArray().then((songs) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(songs);
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Songs']
    try {
        const songId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('songs').find({ _id: songId });
        result.toArray().then((songs) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(songs[0]);
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createSong = async (req, res) => {
    //#swagger.tags=['Songs']
    try {
        const song = {
            songTitle: req.body.songTitle,
            artist: req.body.artist,
            releaseDate: req.body.releaseDate,
            length: req.body.length,
            language: req.body.language
        };
        const response = await mongodb.getDatabase().db().collection('songs').insertOne(song);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the song.');
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateSong = async (req, res) => {
    //#swagger.tags=['Songs']
    try {
        const songId = new ObjectId(req.params.id);
        const song = {
            songTitle: req.body.songTitle,
            artist: req.body.artist,
            releaseDate: req.body.releaseDate,
            length: req.body.length,
            language: req.body.language
        };
        const response = await mongodb.getDatabase().db().collection('songs').replaceOne({ _id: songId }, song);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the song.');
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteSong = async (req, res) => {
    //#swagger.tags=['Songs']
    try {
        const songId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('songs').deleteOne({ _id: songId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the song.');
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createSong,
    updateSong,
    deleteSong
}