const router = require("express").Router();
let Contact = require('../models/contact.model');

//Execute a query to get all the data from the contacts table
//http://localhost:4000/contact
router.get("/", async (req, res) => {
  try {
    const contact = await Contact.find()
    res.send(contact)
} catch(err) {
    res.status(500).json({message: err.message})
}
});

//Save new contact from the comment form to database
//http://localhost:4000/api/contacts/new
router.post("/new", async (req, res) => {
        try {
            const contact = await Contact.create(req.body)
            res.send(contact)
        } catch(err) {
            res.status(500).json({message: err.message})
        }
  });

  //Delete contacts based on the contact_id which is sent from the reac-app on click of x button
//http://localhost:4000/api/contact/delete
router.delete("/delete", async (req, res) => {
    const id = req.body.id;
    try {
        const contact = await Contact.deleteOne({"_id": id})
        res.send(contact)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
  });

  //Update contact info based on contact_id
//http://localhost:4000/api/contact/update
router.put("/update", async (req, res) => {
    const id = req.body.id;
    const body = req.body
  
    try {
        const contact = await Contact.update({"_id": id}, {$set: body})
        res.send(contact)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
  });

  module.exports = router; //Export the endpoints to be used in another file