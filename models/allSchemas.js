const mongoose = require("mongoose");

const date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();
let currentDate = `${year}-${month + 1}-${day}`;

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      default: false
    },
    date: {
      type: String,
      default: currentDate
    },
  }
);

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      index: {unique: true}
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    }
  }
);

const TodoModel = mongoose.model('Todo', TodoSchema);
const UserModel = mongoose.model('User', UserSchema);
module.exports = {TodoModel, UserModel};