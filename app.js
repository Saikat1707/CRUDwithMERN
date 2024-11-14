const express=require('express')
const app=express()
const path=require("path")
const userModel=require('./model/user')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine',"ejs")

app.get("/",function(req,res){
    res.render("index")
})

app.get("/read",async function(req,res){
    let users=await userModel.find()
    res.render("read",{users:users})
})

app.get("/delete/:id",async function(req,res){
    let deletedUser=await userModel.findOneAndDelete({_id:req.params.id})
    res.redirect("/read")
})

app.post("/create",async function(req,res){
    let createdUser=await userModel.create({
        name:req.body.name,
        email:req.body.email,
        image:req.body.imgUrl
    })
    res.redirect("/read")
})
app.get("/edit/:id",async function(req,res){
    let editableUser=await userModel.findById(req.params.id)
    res.render("edit",{editableUser:editableUser})
})
app.post("/edited/:id",async function(req,res) {
    let updatedUser=await userModel.findOneAndUpdate(
        {_id:req.params.id},
        {   name:req.body.name,
            email:req.body.email,
            image:req.body.imgUrl},
        {new:true})
    res.redirect("/read")
})
app.listen(3000)