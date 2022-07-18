const express=require('express')
const router = express.Router()
const {bookdata,audata}=require('../../config/connection')  ///to connect to db in connection
const {mystore,isloggedin}=require('./../../config/authentication')
const bookfunc=(books)=>{


router.get("/",isloggedin,(req,res)=>{
    bookdata.find().then((books)=>{
        res.render('Books',{books})
    })
    

})

router.get('/addbook',(req,res)=>{                     /////////Add -->router--> connection-->schema
    res.render('addbook')
})


router.post('/addbook',async(req,res)=>{
    const item={
        BookName:req.body.bookname,
        AuthorName:req.body.authorname,
        Genre:req.body.genre,
        Image:req.body.image
    }
    console.log(item);

    let data = bookdata(item)
     await data.save()
   res.redirect('/books')
     //res.send('posted')
})

router.get('/delete/:id',(req,res)=>{
    const key=req.params.id;
    console.log(key);
    bookdata.findByIdAndDelete(key).then((result)=>{
        console.log(result);
        res.redirect('/books')
    })
})

router.get("/edit/:id",(req,res)=>{
    const ed=req.params.id;
    bookdata.findById(ed).then((books)=>{
    console.log(books);
    res.render('edit',{books})
    })
    

})

router.post("/edit/:id" ,(req,res)=>{
    const id =req.params.id;
    const data={
       BookName:req.body.bookname,
       AuthorName:req.body.authorname,
       Genre:req.body.genre,
       Image:req.body.image
}
bookdata.findByIdAndUpdate(id,{$set:{
    BookName:data.BookName,
    AuthorName:data.AuthorName,
    Genre:data.Genre,
    Image:data.Image
}}).then((result)=>{
    console.log(result);
    res.redirect('/books')
})

})

router.get('/:index',(req,res)=>{
    const id=req.params.index;
    console.log(id);
    bookdata.findOne({_id:id}).then((books)=>{
        console.log(books);
        res.render('readmore',{books})
    })
    
})

return router
}


module.exports=bookfunc
