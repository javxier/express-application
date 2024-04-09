const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;


app.use(bodyParser.json());


let items = [{ id: 1, name: 'Item 1' }];

// GET endpoint to retrieve items
app.get('/items', (req, res) => {
  res.json(items);
});

// POST endpoint to create a new item
app.post('/items', (req, res) => {
  const item = { id: items.length + 1, ...req.body };
  items.push(item);
  res.status(201).json(item);
});

// PUT endpoint to update an item
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let index = items.findIndex(item => item.id === id);

  if (index >= 0) {
    items[index] = { ...items[index], ...req.body };
    res.json(items[index]);
  } else {
    res.status(404).send('Item not found');
  }
});

// DELETE endpoint to delete an item
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter(item => item.id !== id);
  res.status(200).send("Item is Deleted");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
