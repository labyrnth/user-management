//const router = require("../routes/user")
const mysql = require('mysql');



const pool = mysql.createPool({
    connectionLimit: 100,
    host           : process.env.DB_HOST,
    user           : process.env.DB_USER,
    password       : process.env.DB_PASS,
    database       : process.env.DB_NAME
});



//creating view
exports.view = (req,res) => {
   // res.render('home');

    //connect to  DB
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        console.log('connected as ID '+ connection.threadId);
        
        //use the connection 
        connection.query('select * from user ',(err,rows)=> {
            //where status="active
            //when done with the connection,release it
            connection.release();

            if(!err) {
                res.render('home',{ rows });
            }
            else {
                console.log(err);
            }
            //console.log("the data user table :\n",rows);
        })
    })
}
//find user by search
exports.find = (req,res) =>{

    //connect to  DB
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        console.log('connected as ID '+ connection.threadId);
        
        let searchTerm = req.body.search;

        //use the connection 
            connection.query('select * from user where first_name like ? or last_name like ?',['%'+searchTerm+'%','%'+searchTerm+'%'],(err,rows)=> {
            //when done with the connection,release it
            connection.release();

            if(!err) {
                res.render('home',{ rows });
            }
            else {
                console.log(err);
            }
            ///console.log("the data user table :\n",rows);
        })
    }) 
}
//add new user

// add new user
exports.create=(req,res)=>{
   // res.render('edituser');
    //res.render("adduser");
       //connect to  DB
       const{first_name,last_name,email,phone,comments }= req.body;
       pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        console.log('connected as ID '+ connection.threadId);
        
        let searchTerm = req.body.search;

        //use the connection 
        connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comment = ?', [first_name, last_name, email, phone, comments], (err, rows) => {
            //when done with the connection,release it
            connection.release();

            if(!err) {
                res.render('adduser',{ alert:'useradded successfully'});
            }
            else {
                console.log(err);
            }
           console.log("the data user table :\n",rows);
        })
    })       
}

exports.edit =(req,res)=> {
    //res.render('edituser');
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        console.log('connected as ID '+ connection.threadId);
        
        //use the connection 
        connection.query('select * from user where id =?',[req.params.id],(err,rows)=> {
            //where status="active
            //when done with the connection,release it
            connection.release();

            if(!err) {
                res.render('edituser',{ rows });
            }
            else {
                console.log(err);
            }
            console.log("the data user table :\n",rows);
        })
    })
}

exports.update = (req,res)=> {
    //res.render('edituser');
    const{first_name,last_name,email,phone,comments }= req.body;
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        console.log('connected as ID '+ connection.threadId);
        //console.log('connected as ID '+ req.params.id);
        
        //use the connection 
        connection.query('update user set first_name = ? ,last_name = ?,email=?,phone=?,comment=? where id=?',[first_name,last_name,email,phone,comments,req.params.id],(err,rows)=> {
            //where status="active
            //when done with the connection,release it
           //     connection.release();

            if(!err) {
                pool.getConnection((err,connection)=>{
                    if(err) console.log(err);
                    console.log('connected as ID '+ connection.threadId);
                    
                    //use the connection 
                    connection.query('select * from user where id =?',[req.params.id],(err,rows)=> {
                        //where status="active
                        //when done with the connection,release it
                        connection.release();
            
                        if(!err) {
                            res.render('edituser',{ rows,alert:`Id -${req.params.id} has been updated.` });
                        }
                        else {
                            console.log(err);
                        }
                        console.log("the data user table :\n",rows);
                    })
                })
            }
            else {
                console.log(err);
            }
            console.log("the data user table :\n",rows);
        })
    })
}
exports.delete =(req,res)=> {
   // res.render('edituser');
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        console.log('connected as ID '+ connection.threadId);
        
        //use the connection 
        connection.query('delete  from user where id =?',[req.params.id],(err,rows)=> {
            //where status="active
            //when done with the connection,release it
            connection.release();

            if(!err) {
                res.redirect('/');
            }
            else {
                console.log(err);
            }
            console.log("the data user table :\n",rows);
        })
    })
    // connection.query('UPDATE user SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
    //     if (!err) {
    //       let removedUser = encodeURIComponent('User successeflly removed.');
    //       res.redirect('/?removed=' + removedUser);
    //     } else {
    //       console.log(err);
    //     }
    //     console.log('The data from beer table are: \n', rows);
    //   });
}
exports.viewall =(req,res)=> {
    pool.getConnection((err,connection)=>{
        if(err) console.log(err);
        console.log('connected as ID '+ connection.threadId);
        connection.query('select * from user where id =?',[req.params.id],(err,rows)=> {
            connection.release();
            if(!err) {
                res.render('view-user',{ rows });
            }
            else {
                console.log(err);
            }
            console.log("the data user table :\n",rows);
        })
    })
}

exports.form =(req,res)=>{
    console.log("clicked");
    res.render('adduser');
}