const mongoose = require('mongoose');
const Chat = require("./models/chat.js");


main()                                                 // connection this mongoose
.then(() =>{ 
    console.log("connections is succesfull ");   
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Whatapp');
}
    
let chats = [
    {
        from: "neha",
        to: "priya",
        msg: "send me your exam sheet",
        created_at: new Date(),
    },
    {
        from: "rohit",
        to: "mohit",
        msg: "teach me js callbacks",
        created_at: new Date(),
    },
    {
        from: "ammy",
        to: "pooja",
        msg: "bring me some fruits",
        created_at: new Date(),
    },
    {
        from: "priya",
        to: "neha",
        msg: "send me your exam sheet",
        created_at: new Date(),
    },  
]



Chat.insertMany(chats); 
