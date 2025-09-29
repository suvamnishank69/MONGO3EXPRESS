const mongoose = require("mongoose");



// main()                       
// .then(() =>{ 
//     console.log("connections is succesfull ");   
// })
// .catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/Whatapp');
// }

// no need to establist coonection  again bcz we goona require this file in index.js file 
    


const chatSchema = new mongoose.Schema({
    from:{
        type:String,
        required:true,
    },
    to:{
        type:String,
        required:true,
    },
    msg:{
        type:String,
        maxLength:50,
    },
    created_at:{
        type:Date,
        required:true,
    },
}); 

const Chat = mongoose.model("Chat",chatSchema);

module.exports = Chat;1