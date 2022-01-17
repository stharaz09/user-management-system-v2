const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

const userController = require('../controller/userController')

// Home or root
router.get('/', userController.index)

// Add New User
// router.get('/adduser', userController.addUser)
 router.post('/adduser',userController.adduserpost)

//  Update New User
 router.get('/updateuser/:id', userController.update)
 router.post('/updateuser/:id', userController.updateUser)

//  Delete New User
 router.get('/deleteuser/:id',userController.delete)


module.exports = router;