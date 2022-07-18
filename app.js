const express=require('express')
const session=require("express-session")
const {mystore}=require('./config/authentication')

const app= express()



app.use(express.static('./public'))
app.set('view engine', 'ejs')
app.set('views','./src/views/')
app.use(express.urlencoded({extended:true})) ////middleware for post method to get datas from body
app.use(express.json())
const port=
app.use(session({
    secret :"secret key",
    resave : false,
    saveUninitialized: false,
    store: mystore
}))

const {books, author} =require ('./src/files/data')
const bookfunc= require('./src/routes/booksrouter')(books)
const authorfunc=require("./src/routes/authorrouter")(author)
const user=require('./src/routes/userrouter')
const log=require('./src/routes/userrouter')

app.use('/books', bookfunc)
app.use('/author', authorfunc)
app.use('/detail',user)
app.use('/a',log)
////////////////////////////////////////////////////
app.get('/',( req,res)=>{
    res.render('index')
});





app.get('/login/:name',(req,res)=>{
    const data=req.params.name;
    console.log("Name :",data);  
    res.render('welcome',{data})
    
})


app.get("/logout",(req,res)=>{
    req.session.destroy()
    res.redirect('/a/login')
})
app.listen(8003,()=>{
    console.log('server connected');
})

//////////////////////////////////////
// const express=require('express')
// const app=new express()


// app.set('view engine','ejs')
// app.set("views","./src/views")

// app.get('/',(req,res)=>{
//     let username="john";
//     res.render("index",{username})
// })



// app.listen(8000)
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
// </head>
// <body style="color: white; background-color: blue;">

//     <h1>WELCOME <span style="color: black;"><%=username%></span></h1>
    
// </body>
// </html>