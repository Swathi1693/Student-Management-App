const session=require("express-session")
const mongo =require('connect-mongodb-session')(session)

const mystore =new mongo({
    uri:'mongodb+srv://swathisathyan:June2022@workspace.j58ve.mongodb.net/Libraryapp?retryWrites=true&w=majority',
    collection : 'Mysession'
})
const isloggedin=(req,res,next)=>{
    if(req.session.isAuth){
        next()
    }
    else{
        res.redirect('/a/login')
    }
}
module.exports={mystore,isloggedin}
