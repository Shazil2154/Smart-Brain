const express = require('express');
const app = express();

const database = {
    users:[
    {
        id:'123',
        name:'John',
        email:'john@gmail.com',
        password:'cookies',
        entries:0,
        joined:new Date()
    },
    {
        id:'124',
        name:'Sally',
        email:'sally@gmail.com',
        password:'bannana',
        entries:0,
        joined:new Date()
    }
]
}
app.use(express.json({extended:true}));


app.get('/',(req,res)=>{
    res.json(database);
});


app.post('/signin',(req,res)=>{
    if(req.body.email===database.users[0].email && req.body.password===database.users[0].password){
        res.json('Access Granted');
    }else{
        res.json('Request Denied');
    }
});

app.post('/register',(req,res) => {
    const {name, email, password} = req.body;
    database.users.push({
        id: "125",
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users);
});

app.get('/profile/:id',(req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if(id === user.id){
            found = true;
            return res.json(user);
        }
    });
    if(found !== true){
        res.status(404).json('user not found');
    }
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