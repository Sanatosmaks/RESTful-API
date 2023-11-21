const express = require('express')
const {createUser, getUsers, getUserbyId, changeById, deleteById, sortedByAge} = require('./user.controller')

const router = express.Router()

router.post('/users', createUser) 
router.get('/users', getUsers)
router.get('/users/:id', getUserbyId)
router.put('/users/:id', changeById)
router.delete('/users/:id', deleteById)
router.get('/sortedusers/ByAge', sortedByAge)

module.exports = router