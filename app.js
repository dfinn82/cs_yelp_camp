var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seeds");

seedDB();

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("landing");
});

app.get("/campgrounds", function(req,res){
    //get from db
    Campground.find({}, function(err, allCampgrounds){
	if(err){
	    console.log(err);
	}else{
	    res.render("index", {campgrounds:allCampgrounds});
	}
    });

});

app.post("/campgrounds", function(req,res){
    //get data from form and add to campgrounds array
    //redirect back to campgrounds page
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    var newCampground = {name: name, image: image, desc: desc};
    //campgrounds.push(newCampground);

    Campground.create(newCampground, function(err, campground){
	if(err){
	    console.log(err);
	} else {
	    res.redirect("/campgrounds");
	}
    });//end create

});

app.get("/campgrounds/new", function(req,res){
    res.render("new");
});

//SHOW
app.get("/campgrounds/:id", function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
	if(err){console.log(err);}
	else{res.render("show", {campground: foundCampground});}
    });

});

app.listen(80,function(){
    console.log("the yelp camp server has started");
});
