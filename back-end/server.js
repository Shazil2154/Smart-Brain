const express = require('express');
const cors = require('cors');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'shazil',
    password : 'test',
    database : 'smart-brain'
  }
});
db.select('*').from('users').then(data => {
    console.log(data);
});

const app = express();

app.use(express.json({extended:true}));
app.use(cors())


app.get('/',(req,res)=>{
    res.json(database);
});


app.post('/signin',(req,res)=>{ 
    if(req.body.email===database.users[0].email && req.body.password===database.users[0].password){
        res.json(database.users[0]);
    }else{
        res.json('Request Denied');
    }
});

app.post('/register',(req,res) => {
    const {name, email, password} = req.body;
    db('users')
    .returning('*')
    .insert({
        email: email,
        name: name,
        joined: new Date()
    })
    .then(user =>
        { res.json(user[0])}
        )
    .catch(err => res.status(404).json(err.detail))
    
});

app.get('/profile/:id',(req, res) => {
    const { id } = req.params;
    let found = false;
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
    let found = false;
    database.users.forEach(user => {
        if(id === user.id){
            found = true;
            user.entries++;
            res.json(user.entries);
        }
    });
    if(found !== true){
        res.status(404).json('user not found');
    }
})

app.listen(3001,()=>{
    console.log('server is up and rung at port 3001');
});