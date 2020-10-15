var express =  require('express'),
methodOverride =require('method-override'),
bodyParser  =  require('body-parser'),
expressSanitizer = require('express-sanitizer'),
mysql       =  require('mysql'),
app         =  express();


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root', //your username
  password : 'root',
  database : 'blog'  //the name of your db
});
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//RESTful ROUTES 
app.get("/",function(req,res){
    res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs",function(req,res){
    var q="SELECT * FROM blogSchema";
    connection.query(q,function(err,results){
        if(err) 
        {
            throw err;
        }
        else
        {
            res.render("index",{blogs: results});
        }
    });
});
 
//NEW ROUTE
   app.get("/blogs/new",function(req,res){
     res.render("new");
});

// CREATE ROUTE
   app.post("/blogs",function(req,res){
     //create blog
     req.body.blog.body= req.sanitize(req.body.blog.body);
     var text={
       title : req.body.blog.title,
       image : req.body.blog.image,
       body : req.body.blog.body
     };
      connection.query('INSERT INTO blogSchema SET?',text,function(err,results){
        if(err) 
        {
        res.render("new");
        }
        // redirect into index
        else
        {
        res.redirect("/blogs");
        }
    });
});
 
//SHOW ROUTE
  app.get("/blogs/:id",function(req,res){
  var blogId =req.params.id;
  var q= 'SELECT * FROM blogSchema WHERE id= ' + blogId;
  
  connection.query(q, function(error,results,fields){
      if(error)
      {
          res.redirect("/blogs");
      }
      else 
      {
         res.render("show", {blog: results});
      }
  });
});

//EDIT ROUTE
  app.get("/blogs/:id/edit",function(req,res){
     var blogId =req.params.id;
     var q= 'SELECT * FROM blogSchema WHERE id= ' + blogId;
  
  connection.query(q, function(error,results,fields){
      if(error)
      {
          res.redirect("/blogs");
      }
      else 
      {
          res.render("edit", {blog: results});
      }
  });
});
 
//UPDATE ROUTE
  app.put("/blogs/:id",function(req,res){
     req.body.blog.body = req.sanitize(req.body.blog.body);
       var blogId = req.params.id;
       var title  = req.body.blog.title;
       var image  = req.body.blog.image;
       var body   = req.body.blog.body;
     
       var q  = "UPDATE blogSchema SET title= ?,image=?,body=? WHERE id=?";
    
     connection.query(q,[title,image,body,blogId],function(error,results){
         if(error)
         {
            throw(error);
         }
         else 
         {
             res.redirect("/blogs/" + blogId);
         }
     });
});
 
//DELETE ROUTE
   //destroy route
   app.delete("/blogs/:id",function(req,res){
       var blogId=req.params.id;
       var q="DELETE FROM blogSchema WHERE id=?";
       connection.query(q,[blogId],function(err){
           if(err)
           {
               res.redirect("/blogs");
           }
           else
           {
               //redirect to somewhere
                res.redirect("/blogs");
           }
       });
   
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("server is listening");
});
