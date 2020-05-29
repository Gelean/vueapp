const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Characters
router.get('/', async (req, res) => {
  const characters = await loadCharactersCollection();
  res.send(await characters.find({}).toArray());
});

// Add Character
router.post('/', async (req, res) => {
  const characters = await loadCharactersCollection();
  await characters.insertOne({
    name: req.body.name,
    role: req.body.role,
    createdAt: new Date()
  });
  res.status(201).send();
});

// Delete Character
router.delete('/:id', async (req, res) => {
  const characters = await loadCharactersCollection();
  await characters.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send({});
});

async function loadCharactersCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb://localhost:27017/akasha', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  return client.db('akasha').collection('characters');
}

module.exports = router;