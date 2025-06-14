const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get(`/`,(request, response) => {
    // response.send("Hello, Zerry.");
    // console.log(`${__dirname}`);
    response.sendFile(path.join(__dirname,`/public/index.html`), err =>{
        if(err) console.log(err);
    });
})

app.listen(8080, ()=>{
    console.log(`start server in port 8080`);
})