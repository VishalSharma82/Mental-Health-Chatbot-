const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// === Middleware ===
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// === View Engine ===
app.set('view engine', 'ejs');

// === MongoDB Connection ===
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ MongoDB connected");
}).catch(err => {
  console.error("❌ MongoDB connection error:", err);
});
// === Mongoose Schema & Model ===
const ChatSchema = new mongoose.Schema({
  message: String,
  response: String,
  createdAt: { type: Date, default: Date.now }
});
const Chat = mongoose.model('Chat', ChatSchema);

// === Routes ===
app.get('/', async (req, res) => {
  const chats = await Chat.find().sort({ createdAt: -1 }).limit(10);
  res.render('index', { chats });
});

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  // Dummy AI logic (You can replace with OpenAI API if needed)
  let botResponse = "I'm here to listen. Can you tell me more?";

  if (userMessage.toLowerCase().includes('sad')) {
    botResponse = "I'm sorry you're feeling sad. Do you want to talk about it?";
  } else if (userMessage.toLowerCase().includes('depressed')) {
    botResponse = "Depression is tough. You're not alone. Would you like to try some breathing exercises?";
  }

  const newChat = new Chat({
    message: userMessage,
    response: botResponse
  });

  await newChat.save();
  res.redirect('/');
});

// === Start Server ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
