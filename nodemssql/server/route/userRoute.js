const express = require('express');
const {validate, encrypt, auth} = require('../middlewares/validate')
const { saveUser, updateUser, deleteUser} = require('../db/dbQueries');
const { user } = require('../db/db');

let router = express.Router();

router.post('/sign_up', validate, async( req, res )=>{
   let pass = req.body.password
   console.log(req.body);
   let data = {
    firstName: req.body.fName,
    secondName: req.body.sName,
    projectName: req.body.pName,
    username: req.body.email,
    pass: await encrypt(pass)
}

    try {
        await saveUser(data)
        
    } catch (error) {
        console.log(error.message)
    }
    
    res.send('new user saved')
    
})

router.post('/login', async(req, res)=>{
    let data = {
        username: req.body.email,
        pass: req.body.password
    }
    console.log(req.body);
    let authed = await auth(data)
    if(authed){
        res.send('user logged in successfully')
    }else{
        res.send('wrong credentials please try again')
    }

})

router.put('/update', async(req, res)=>{
    let data = req.body
    //console.log(data);
    try {
        await updateUser(data)
        res.send('user details updated successfully')
        console.log('user details updated successfully')
        
        
    } catch (error) {
        console.log(error.message)
    }
})

router.delete('/delete', async (req, res)=>{
    let id = req.body.email;
    try {
        await deleteUser(id)
        res.send("user deleted successfully")
    } catch (error) {
        console.log(error.message)
    }
})

module.exports = router;