const mongoose = require('mongoose');
const Chat = require('./models/chat.js');

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

main().then(() => {
    console.log("Connected to MongoDB");
}).catch(err => console.log(err));

let chats = [
    {
        from: "Alice",
        to: "Bob",
        msg: "Hello Bob!",
        createdAt: new Date()
    },
    {
        from: "Bob",
        to: "Alice",
        msg: "Hi Alice! How are you?",
        createdAt: new Date()
    },
    {
        from: "Alice",
        to: "Bob",
        msg: "I'm good, thanks! How about you?",
        createdAt: new Date()
    },
    {
        from: "Bob",
        to: "Alice",
        msg: "I'm doing well, thanks for asking!",
        createdAt: new Date()
    },
    {
        from: "Alice",
        to: "Bob",
        msg: "Great to hear! Let's catch up soon.",
        createdAt: new Date()
    },
    {
        from: "Bob",
        to: "Alice",
        msg: "Definitely! Looking forward to it.",
        createdAt: new Date()
    }

];  

Chat.insertMany(chats);
   