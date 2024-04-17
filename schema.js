
const mongoose=require('mongoose')
const expensedetailschema = new mongoose.Schema({
    amount: {
        type: Number
    },
    category: {
        type: String 
    },
    date: {
        type: String
    }
},{versionKey:false})
const userdetailschema=new mongoose.Schema({
    username: {
        type: String
    },
    password:{
        type: String 
    },
    email:{
        type: String
    }
},{versionKey:false})
// creating a model
const Expense = mongoose.model('expensedetails', expensedetailschema)
const User=mongoose.model('userdetails',userdetailschema)
module.exports = { Expense ,User}