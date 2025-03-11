const asyncHandeler = require("express-async-handler")
const contact =require("../models/contactModal")
//@desc get all contacts
//@route GET api/contact
//@access private

const getContact = asyncHandeler(async(req, res) => {
    console.log("lodaaaaa",req)
    const contacts = await contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
})

//@desc post  all contacts
//@route post api/contact
//@access private

const createContact = asyncHandeler(async(req, res) => {
    console.log("request body", req.body)

    //here we are handelling a error , because it proceed empty body with 200 status code. so change it to 400 when there are any field missing.
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All field are required");
    }
    console.log("req", req)
    //here we take data from req.body and store it into database.. Basically create use to store data and it is mongoose function.
    const contacts = await contact.create({
        name,
        email,
        phone,
        //we did not assigned user_id at first, but after noticing that every body can do CRUD operation even if they did not authorized.
        //So we simply add user_id, which check later to perform CRUD.
        //If person have valid token then and then only he perform any operation.
        user_id: req.user.id
    });
    res.status(201).json(contacts);
})

//@desc get all contacts
//@route GET api/contact
//@access private

const getIndiContact = asyncHandeler(async(req, res) => {
   const contacts = await contact.findById(req.params.id);
    if (!contacts) {
        res.status(404).json({ message: "Contact Not Found" });
        return; // Stop further execution in this callback
    }

    res.status(200).json(contacts);
});

//@desc put all contacts
//@route PUT api/contact
//@access private

const putContact = asyncHandeler(async(req, res) => {
    const contacts = await contact.findById(req.params.id);
    if (!contacts) {
        res.status(404).json({ message: "Contact Not Found" });
        return; // Stop further execution in this callback
    }

    //As mentioned earlier in creatContact function, this condition is used to varified te customer with valid token.
    //If he has valid token , than surely he can perform any operation.
    //Otherwise it simply throw error.
    //first condition check, if the the contact we find has user_id and is it the same id we received in req paramenter.
    if(contacts.user_id.toString() !== req.user.id){
        res.status(403).json({msg: "Unauthorized access"});
        throw new Error("Unauthorized access")
    }

    const updatedContact = await contact.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.status(200).json(updatedContact);
});

//@desc delete all contacts
//@route DELETE api/contact
//@access private

const deleteContact = asyncHandeler(async(req, res) => {
    // check the contact is exist or not, if yes then we gave him permission to delete by findByIdAndDelete function.
    const deletedContact = await contact.findByIdAndDelete(req.params.id);

    if (!deletedContact) {
        res.status(404).json({ message: "Contact Not Found" });
        return; // Stop further execution in this callback if no contact was found
    }

    //As mentioned earlier in creatContact function, this condition is used to varified te customer with valid token.
    //If he has valid token , than surely he can perform any operation.
    //Otherwise it simply throw error.
    //first condition check, if the the deletedContact we find has user_id and is it the same id we received in req paramenter.
    if(deletedContact.user_id.toString() !== req.user.id){
        res.status(403).json({msg: "Unauthorized access"});
        throw new Error("Unauthorized access")
    }
    // If deletion was successful, return the deleted contact
    res.status(200).json({ message: "Contact deleted successfully", contact: deletedContact });
});

module.exports = { getContact, createContact, getIndiContact, putContact, deleteContact }