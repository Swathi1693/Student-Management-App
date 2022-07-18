const express=require('express')
const router=express.Router()
const {bookdata,audata}=require('../../config/connection')

const authorfunc=(author)=>{
    
    router.get('/',(req,res)=>{
        audata.find().then((author)=>{
          console.log('DATA:',author);
          res.render('author',{author})
        }) 
        
    })
    router.get('/addauthor',(req,res)=>{   
                         /////////Add -->router--> connection-->schema
        res.render('addauthor')
    })
    router.post('/addauthor',async(req,res)=>{
   
      const item={
        Authorname:req.body.authorname,
        Nationality:req.body.nationality,
        Genre:req.body.genre,
        Image:req.body.image
      }
    let data= audata(item)
    await data.save()

    res.redirect('/author')
    
    })

    router.get('/:a',(req,res)=>{
    const key=req.params.a;
    res.render('knowmore',{author,key})
    })
    return router
}

module.exports=authorfunc