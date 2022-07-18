const express=require('express')
const bcrypt=require('bcrypt')
const router = express.Router()
const {bookdata,audata,userdata}   =require('../../config/connection') 
const res = require('express/lib/response')

router.get('/signup',(req,res)=>{
    res.render('signup')
})


router.post('/signup',async(req,res)=>{
    const hashpw=await bcrypt.hash(req.body.password, 10)
    const item={
        UserName:req.body.username,
        Email:req.body.email,
        Password:hashpw,
        
    }
    console.log(item);

    let data = userdata(item)
     await data.save()
   res.redirect('/a/login')
    
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.post('/login',async(req,res)=>{
  const logindata={
      Email:req.body.email,
      Password:req.body.password
  }
  console.log('logindata',logindata);  
  await userdata.find().then((result)=>{
      let data=result;
      console.log(data);
      data.forEach(async(item)=>{
          if(logindata.Email==item.Email){
            await bcrypt.compare(logindata.Password,item.Password).then((result)=>{
                  console.log(result);
                  if(result){
                       req.session.isAuth=true
                      res.redirect('/books')
                    // res.send('abc')
                    }
                  else{
                      console.log("Incorrect Password");
                  }
              })
          }else{
              console.log('email mismatch');
          }
      })
  })
})

module.exports=router