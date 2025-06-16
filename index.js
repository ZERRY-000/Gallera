const express = require(`express`);
const app = express();
const path = require(`path`);
const router = require(`./public/route`);

app.set(`views`, path.join(__dirname,`public`));
app.set(`view engine`,`ejs`);

app.use(express.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(router);



app.listen(8080, ()=>{
    console.log(`start server in port 8080`);
})