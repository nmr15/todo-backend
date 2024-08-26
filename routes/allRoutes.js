const express = require("express");
const multer = require("multer");
let getField = multer();
let allRouter = express.Router();
const { TodoModel, UserModel } = require("../models/allSchemas");

allRouter.get("/todo", async(req, res) =>
{
  const todoData = await TodoModel.find({});
  try
  {
    res.send(todoData);
  }
  catch(error)
  {
    res.status(500).send(error);
  }
});

allRouter.post("/createtodo", async (req, res) =>
{
  const { title, category, status, date } = req.body;

  try
  {
    todo = new TodoModel({ title, category, status, date});
    let newTodo = await todo.save();
    newTodo = newTodo.toObject();
    res.send(newTodo);
    // const newTodo = new TodoModel(req.body);
    // console.log(req.body);
    // let todo = await newTodo.save();
    // todo = todo.toObject();
    // res.send(todo);
  }
  catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

allRouter.put("/editTodo/:id", async (req,res) =>
{
  const { title, category, status, date } = req.body;

  try
  {
    const result = await TodoModel.findByIdAndUpdate(req.params.id, req.body);
    res.json(result);
  }
  catch (error)
  {
    console.log(error);
    res.status(500).send(error);
  }
})

allRouter.delete("/deleteTodo/:id", async (req,res) =>
{
  try
  {
    const result = await TodoModel.findByIdAndDelete(req.params.id);
    res.json(result);
  }
  catch(error)
  {
    console.log(error);
    res.status(500).send(error);
  }
})

allRouter.post("/signup", getField.none(), async (req, res) =>
{
  try
  {
    const newUser = new UserModel(req.body);
    console.log(req.body);
    let user = await newUser.save();
    user = user.toObject();
    res.send(user);
  }
  catch(error)
  {
    console.log(error);
    res.status(500).send(error);
  }
});

allRouter.post("/login", getField.none(), async (req, res) =>
{
  try
  {
    let user = await UserModel.findOne({email:req.body.email, password:req.body.password});
    res.send(user);
    console.log('Log in successfull');
  }
  catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
})

module.exports = { allRouter };