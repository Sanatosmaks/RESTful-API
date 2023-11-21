require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const User = require('./src/user/user.modules')
const userRouter = require('./src/user/user.router')

const app = express();
const PORT = process.env.PORT
const MONGO_DB_URL = process.env.MONGO_DB_URL

mongoose.connect(MONGO_DB_URL)

app.use(express.json());
app.use(userRouter)

// // Список
// app.get('/users', async (req, res) => {
//   try {
//     const users = await User.find(); 
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Список по Id коду
// app.get('/users/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Изменение по ID 
// app.put('/users/:id', async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Удаление по ID
// app.delete('/users/:id', async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Запуск
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

module.exports = {closeDatabase, app}
