import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var title=[],body=[],date=[];


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    
    res.render("index.ejs",{
        titles:title,
        bodies:body,
        dates:date,
        count:title.length,
    });
    console.log("titles:"+title.length);
    console.log("bodies:"+body.length);
    console.log("dates:"+date.length);
})
app.post("/",(req,res)=>{
    if(req.body.postTile||req.body.postBody){
    date.push((new Date()).toLocaleDateString());
    title.push(req.body.postTitle);
    body.push(req.body.postBody);
    }
    res.render("index.ejs",{
        titles:title,
        bodies:body,
        dates:date,
        count:title.length,
    });
})

app.post("/deleted",(req,res)=>{
    console.log(req.body);
    var i=req.body.itemIndex;
    title.splice(i,1);
    body.splice(i,1);
    date.splice(i,1);
    res.render("index.ejs",{
        titles:title,
        bodies:body,
        dates:date,
        count:title.length,
    });
})

app.post("/edit",(req,res)=>{
    console.log(req.body);
    var i=req.body.itemIndex;
    date.splice(i,1);
    res.render("newPost.ejs",{
        titles:title,
        bodies:body,
        dates:date,
        tempTitle:title.splice(i,1),
        tempBody:body.splice(i,1),
        count:title.length,
    });
})

app.get("/newPost",(req,res)=>{
    res.render("newPost.ejs");
})

app.post("/search",(req,res)=>{
    console.log(req.body);
    res.render("index.ejs",{
        searchKey:req.body.searchQuery,
    });
})



app.listen(port,()=>{
    console.log("server is running");
})



title.push("At vero eos et accusamus");
body.push("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.");
date.push(new Date(1999,9,5).toLocaleDateString());

title.push("Nam libero tempore");
body.push("Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.");
date.push(new Date(2024,5,23).toLocaleDateString());