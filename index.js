const express  = require("express");   // requreing express
const app = express(); ;
const mongoose = require("mongoose")
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override"); //aquaring method-overwriting

app.set("views", path.join(__dirname, "views")); // this line give access index file to inherit the properties of views directory 
app.set("view engine", "ejs"); //seting template eng as (ejs)
app.use(express.static(path.join(__dirname, "public")));  //to use file from public dir
app.use(express.urlencoded({ extended: true }));  // use to encode infomating from req.body 
app.use(methodOverride("_method"));    // use to overwrite method
         


main()                                                 // connection this mongoose
.then(() =>{ 
    console.log("connections is succesfull ");   
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Whatapp');
}
    
// let chat1 = new Chat({
//     from: "neha",
//     to: "priya",
//     msg: "send me your exam sheet",
//     created_at: new Date()  // it a func in js that give random date  
// }); 
// chat1.save().then((res) => {
//     console.log(res);
// }); 


//index route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs", { chats });
});


// new route to creat new chats
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});


//creat route
app.post("/chats", (req, res) => {
    let { from, msg, to } = req.body; 
     //req.body has infomation in his body  we can not read it so we have to use encoder 
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });

    newChat
        .save() // save(), delete(), which are releted to dbs are async func 
        //we dont need to use await bcz we are using  then  
        // save(): save the chat and send a promise 
        .then((res) => {
            console.log("chat was saved");
        })
        .catch((err) => {
            console.log(err);
        });
    res.redirect("/chats");
});


//edit route
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id); // bcz findById is a async func
    res.render("edit.ejs", { chat });
});                     

//Update route
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
        id,
        { msg: newMsg },
        { runValidators: true, new: true }
    );
    console.log(updatedChat);
    res.redirect("/chats");
}); 


//destroy route
app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});



app.get("/",(req,res) => {    // creating route 
    res.send("root is working");
});

app.listen(8080,() => {   // setting the server
    console.log("Server is running on port 8080");
});  
