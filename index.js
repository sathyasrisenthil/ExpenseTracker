const express=require("express")
const mongoose =require("mongoose")
const bodyparser=require("body-parser")
const cors=require("cors")
const { Expense , User} = require('./schema.js')
const app=express()
app.use(bodyparser.json())
app.use(cors())
//connect to node
async function connecttoDB()
{
    try{
 await mongoose.connect('mongodb+srv://sathyasri:sathyasri@cluster0.qbturml.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Cluster0')
 console.log("connection done")
 const port=process.env.PORT || 3000
 app.listen(port,function()
{
    console.log("running.....")
})
    }
    catch(error)
    {
        console.log(error)
        console.log("sorry cannot do it ")
    }
}
connecttoDB()
app.post('/addexpense', async function(req,res)
{
    try{
       await Expense.create(
            {
               "amount":req.body.amount,
                "category":req.body.category,
                "date":req.body.date
            }
        )
        res.status(201).json(
            {
                "status": "success",
                "message":"successfully recevied"
            }
        )
    }
    catch(error)
    {
        res.status(500).json(
            {
                "status": "failure",
                "message":"cannot create data",
                "error":error
            }
        )
    }
})

app.get('/getexpense', async function(req,res)
{
    try{
        const expensedetails= await Expense.find()
        res.status(200).json(expensedetails)
    }
    catch(error)
    {
        res.status(500).json(
            {
                "status": "failure",
                "message":"cannot create data",
                "error":error
            }
        )
    }
})


app.delete('/deleteexpense/:id', async function(req,res)
{
    try{
  await Expense.findByIdAndDelete(req.params.id)
  res.status(200).json(
    {
        "status": "success",
        "message":"successfully deleted"
    }
)
    }
    catch(error)
    {
        res.status(500).json(
            {
                "status": "failure",
                "message":"cannot delete data",
                "error":error
            }
        )
    }
})

app.patch('/editexpense/:id', async function(req,res)
{
    try{
  await Expense.findByIdAndUpdate(req.params.id , 
    { "amount":req.body.amount,
  "category":req.body.category,
  "date":req.body.date}
)
  res.status(200).json(
    {
        "status": "success",
        "message":"successfully deleted"
    }
)
    }
    catch(error)
    {
        res.status(500).json(
            {
                "status": "failure",
                "message":"cannot delete data",
                "error":error
            }
        )
    }
})
/*
//connect to compass 
async function connecttoDB()
{
 await mongoose.connect('mongodb+srv://sathyasri:sathyasri@cluster0.qbturml.mongodb.net/')
 app.listen(3000,function()
{
    console.log("running.....")
})
}
connecttoDB()
*/


