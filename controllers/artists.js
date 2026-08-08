const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Artists']
    try {
        const result = await mongodb.getDatabase().db().collection('artists').find();
        result.toArray().then((artists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(artists);
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Artists']
    try {   
        const artistId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('artists').find({ _id: artistId });
        result.toArray().then((artists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(artists[0]);
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createArtist = async (req, res) => {
    //#swagger.tags=['Artists']
    try {
        const artist = {
            artistName: req.body.artistName,
            language: req.body.language
        };
        const response = await mongodb.getDatabase().db().collection('artists').insertOne(artist);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the artist.');
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateArtist = async (req, res) => {
    //#swagger.tags=['Artists']
    try {
        const artistId = new ObjectId(req.params.id);
        const artist = {
            artistName: req.body.artistName,
            language: req.body.language
        };
        const response = await mongodb.getDatabase().db().collection('artists').replaceOne({ _id: artistId }, artist);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the artist.');
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteArtist = async (req, res) => {
    //#swagger.tags=['Artists']
    try {
        const artistId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('artists').deleteOne({ _id: artistId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the artist.');
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createArtist,
    updateArtist,
    deleteArtist
}