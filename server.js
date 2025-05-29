const express = require('express');
const app = express();
const responses = require('./responses');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { messages: [] });
});

app.post('/chat', (req, res) => {
  const userMessage = req.body.message;
  const botReply = responses.getReply(userMessage);

  res.render('index', { messages: [{ from: 'user', text: userMessage }, { from: 'bot', text: botReply }] });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
