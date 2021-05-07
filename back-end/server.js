const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'shazil',
    password : 'test',
    database : 'smart-brain'
  }
});

const app = express();

app.use(express.json({extended:true}));
app.use(cors())


app.get('/',(req,res)=>{
    res.write('<h1>Wellcome to the backend of smart-brain by Shazil Sattar</h1>');
    res.write('<h2>SignIN</h2>');
    res.write('<p>Go to /signin to get signin info</p>');
    res.write('<h2>Register</h2>');
    res.write('<p>go to /register to get the register data</p>');
    res.write('<h1>Note:</h1>')
    res.write('<p>Just kidding you are not suposed to get these information </br> Happy Hacking</p>')
    res.send();
});


app.post('/signin',(req,res)=>{ 
    db.select('email','hash').from('login')
    .where('email','=' , req.body.email)
    .then( data => {
        let isValid= false;
        bcrypt.compare(req.body.password, data[0].hash, function(err, result) {
                isValid = result;
                if( isValid ){
                    return db.select('*').from('users')
                    .where('email','=', req.body.email )
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch( err => res.status(400).json('somthing went wrong'))
                }else{
                    res.status(400).json('wrong credentials')
                 }
        });
       
    })
    .catch( err => res.status(400).json('wrong credentials'))
});

app.post('/register',(req,res) => {
    const {name, email, password} = req.body;
    db.transaction(trx => {
        bcrypt.hash(password, saltRounds, function(err, hash) {
        if(!err){
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0],
                    name: name,
                    joined: new Date()
                })
                .then(user => { 
                        res.json(user[0])
                    })

             })
             .then(trx.commit)
             .catch(trx.rollback)
        }
});
    })
      
    .catch(err => res.status(404).json(err.detail))
    
});

app.get('/profile/:id',(req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where({ id }).then(user => {
        if( user.length ){
            res.json(user[0]);
        }else{
            res.status(404).json("User Not Found ☹");
        }
        
    })
});

app.put('/image',(req,res) => {
    const { id } = req.body;
   db('users')
  .where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
      res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries ☹'));
});


app.listen(3001,()=>{
    console.log('server is up and rung at port 3001');
});