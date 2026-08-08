const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Favorites']
    try {
        const result = await mongodb.getDatabase().db().collection('favorites').find();
        result.toArray().then((favorites) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(favorites);
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Favorites']
    try {   
        const favoriteId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('favorites').find({ _id: favoriteId });
        result.toArray().then((favorites) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(favorites[0]);
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createFavorite = async (req, res) => {
    //#swagger.tags=['Favorites']
    try {
        const favorite = {
            songTitle: req.body.songTitle,
            artist: req.body.artist
        };
        const response = await mongodb.getDatabase().db().collection('favorites').insertOne(favorite);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the favorite.');
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateFavorite = async (req, res) => {
    //#swagger.tags=['Favorites']
    try {
        const favoriteId = new ObjectId(req.params.id);
        const favorite = {
            songTitle: req.body.songTitle,
            artist: req.body.artist
        };
        const response = await mongodb.getDatabase().db().collection('favorites').replaceOne({ _id: favoriteId }, favorite);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the favorite.');
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteFavorite = async (req, res) => {
    //#swagger.tags=['Favorites']
    try {
        const favoriteId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('favorites').deleteOne({ _id: favoriteId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the favorite.');
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createFavorite,
    updateFavorite,
    deleteFavorite
}