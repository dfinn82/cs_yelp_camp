var mongoose = require("mongoose");
var Campground = require("./models/campground");

var data = [
    {name: "Crystal Lake", image: "http://cdn5.ihorror.com/app/uploads/crystal-lake.png", desc: "Ki ki ki ma ma ma"},
    {name: "Camp Arawak", image: "https://static1.squarespace.com/static/53f91163e4b0a085e8d24e89/t/55bb816ee4b00dce923f6334/1438351727828/", desc: "Eat shit and die!"},
    {name: "Haddonfield", image: "http://visitsouthjersey.com/wp-content/uploads/2014/07/haddonfield-3-500x375.jpg", desc: "Not a camp, but still evil"},
]

function seedDB(){
    Campground.remove({}, function(err){
	console.log("removed campgrounds");
	data.forEach(function(seed){
	    Campground.create(seed, function(err,campground){
		console.log("added campground");
		Comment.create({
		    text: "This place is great, but I wish there was internet",
		    author: "Homer",
		},function(err, comment){
		    campground.comments.push(comment);
		    campground.save();
		    console.log("created new comment");
		});
	});
    });
}

module.exports = seedDB;
