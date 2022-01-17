const { redirect } = require("express/lib/response");

const mysql = require('mysql');

const con = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    database: process.env.database,
    password: process.env.password
})

con.connect(err=>{
    {err?console.log(err):console.log('DB connected' )}
})

// Home Page
exports.index = (req,res)=>{
    const sql='SELECT * FROM user_info'
    con.query(sql,(err,result)=>{
        // console.log(result);
    {!err? res.render('../views/index', {userdetails:result, btnName: 'Save' })   : console.log(err)}    
    // res.render('../views/index', {userdetails:userInfo, btnName: 'Save' })  
    console.log("Views all User!");
});
      
}
exports.adduserpost = (req,res)=>{
const {fname, mname, lname, email, phone} = req.body; //store value from adduser
const sql='INSERT INTO user_info(fname,mname,lname,email,phone) VALUES (?,?,?,?,?)'
con.query(sql,[fname, mname, lname, email, phone] ,(err,result)=>{
    if(!err){
        res.redirect('/');  
        console.log("Add New User Successfully!!");
    }  else console.log(err) 
   
});
//    userInfo.push({fname,mname,lname,email,phone});
   
    
}


// Update User
exports.update = (req,res) =>{
    console.log(req.params.id);
    const sql = 'SELECT * FROM user_info WHERE id=?'
    con.query(sql,[req.params.id], (err,result)=>{
        // console.log(result);
        if(!err){
            res.render('updateuser', {userdetails: result[0], id:req.params.id, btnName: 'Update' });
           
        }else{
            console.log(err);
        }
    })

    // console.log('id param:' + req.params.id);
    //     res.render('updateuser', {userdetails:[req.params.id], id: req.params.id, btnName: 'Update' })
   
}
exports.updateUser = (req,res)=>{
   const id = req.params.id
    // console.log(req.params.id);
     const {fname, mname, lname, email, phone} = req.body;
     const sql = 'UPDATE user_info SET fname = ?, mname = ?, lname = ?, email = ?, phone = ? WHERE id=?'
     con.query(sql,[fname, mname, lname, email, phone, id], (err)=>{
         if(!err){
            res.redirect('/')
            console.log("Update User successfully");
         }
      })
   
}


// Delete User
exports.delete = (req,res) =>{  
  const index = req.params.id;   
//   console.log(index);
  const sql = 'DELETE FROM user_info WHERE id=?'
  con.query(sql,[index],err=>{
    if(!err){
        res.redirect('/')
        console.log("User Deleted successfully");
     }else{
     console.log(err);
     }
  })  

//   userInfo.splice(index,1)
//   console.log("User Deleted Successfully!!");
//    res.redirect('/')
}

    