const mongoose = require("mongoose");
const { Socket } = require("socket.io");



const userSchema = new mongoose.Schema({
    username:{type:String, required: true, unique:true},
    SocketId: { type:String },
    isOnline: { type: Boolean, default:false}
},
{timestamps:true}
);
module.exports = mongoose.model("User", userSchema);