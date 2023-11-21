const User = require('./user.modules');

const createUser = async (req, res) => {   
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        if (error.code == 11000) return res.status(400).json({error: 'email already exist'})
        res.status(400).json({ error: error.message });
    }  
}
//if (error.code == 11000) return res.status(400).json({error: 'email already exist'}) обработка ошибки (Запомнить)
const getUsers = async (req, res) => {
    try {
        const sort = req.query.sort? req.query.sort: 1
        const users = await User.find().sort({age:Number(sort)}); 
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUserbyId = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
      } catch (error) {
    
        res.status(500).json({ error: error.message });
      }
};

const changeById = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

const deleteById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

const sortedByAgeGt = async (req, res) => {
    try {
        const gt = req.query.gt
        if (!gt) throw Error ('Specify parameters')
        const users = await User.find({age:{$gt:gt}})
        if (!users) {
          return res.status(200).json([]);
        }
        res.json(users)
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
const sortedByAgeLt = async (req, res) => {
    try { 
        const lt = req.query.lt
        if (!lt) throw Error ('Specify parameters')
        const users = await User.find({age:{$lt:lt}})
        if (!users) {
            return res.status(200).json([]);
        }
        res.json(users)
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    }
    

    
const sortedByAge = async (req, res) => {
    if (req.query.gt) return await sortedByAgeGt(req, res)
    if (req.query.lt) return await sortedByAgeLt(req, res)
}



module.exports = {createUser, getUsers, getUserbyId, changeById, deleteById, sortedByAge}
