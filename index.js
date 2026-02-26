const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat.js');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

app.set("views",path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

main().then(() => {
    console.log("Connected to MongoDB");
}).catch(err => console.log(err));

//chat will have => id, from, to, message, createdAt


app.get('/chats', async (req, res) => { //index route
    let chats = await Chat.find();
    console.log(chats);
    res.render("index", {chats});
});

//new Route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
})

//create route
app.post("/chats", (req, res) => {
    let {from, to, msg} = req.body;
    let chat = new Chat({
        from: from,
        to: to,
        msg: msg,
        createdAt: new Date()
    });
    chat.save().then((res) =>{
        console.log("Chat saved to database");  
    }).catch(err => console.log(err));
    res.redirect("/chats");
})

//edit and update route
app.get("/chats/:id/edit", async (req, res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);

    res.render("edit.ejs", {chat});
})

app.put("/chats/:id", async (req, res) => {
    let {id} = req.params;
    let {msg: newmsg} = req.body;
    let updatedchat = await Chat.findByIdAndUpdate(id, {msg: newmsg}, {runValidators: true, new: true});
    console.log(updatedchat);
    res.redirect("/chats");
});

//destroy route
app.delete("/chats/:id", async (req, res) => {
    let {id} = req.params;
    let deletedchat = await Chat.findByIdAndDelete(id);
    console.log(deletedchat);
    res.redirect("/chats");
})

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
