const mongoose =require('mongoose')//db
//const uri='mongodb://localhost:27017/LibraryApp'
const uri='mongodb+srv://swathisathyan:June2022@workspace.j58ve.mongodb.net/Libraryapp?retryWrites=true&w=majority'
mongoose.connect(uri)

const schema =mongoose.Schema


const bookschema= new schema({
    BookName:String,
    AuthorName:String,
    Genre:String,
    Image:String
})
const authorschema =new schema({
    Authorname:String,
    Nationality:String,
    Genre:String,
    Image:String
})
const userschema= new schema({
     UserName:String,
     Email:String,
     Password:String
})

const bookdata=mongoose.model('bookdetails',bookschema)/////////bookdetail- collection name
const audata=mongoose.model('Authordetails',authorschema)
const userdata=mongoose.model('Userdetails',userschema)

module.exports={bookdata,audata,userdata}           ///////////bookdata - variable name

