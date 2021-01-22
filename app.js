// const express = require("express");
// const bodyParser = require("body-parser");

// const app = express();

// app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({extended: true}));

// this we have done using a switch statement and using getDay() which gives us only the name of day, if we want to get the date in format Sept 2, 2020 then we will use below way
/* app.get('/', function(req, res){
    var today = new Date();
    var currentDay = today.getDay();

    var day = "";

    switch (currentDay) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
        default:
            console.log("Wrong choice " + currentDay);
            break;
    }
     /* if(currentDay === 6 || currentDay === 0){
         // res.write("<h1>Yay Yay! Its weekend!</h1>");
         res.sendFile(__dirname + "/weekend.html");
     }else{
         res.sendFile(__dirname + "/weekday.html");
         // res.write("<h1>Its a weekday and we need to work!!</h1>");
         // res.write("<h1>Boo!  Get up early!</h1>");
     }
    //res.send();
    //res.send("Hello");*/

/* res.render('list', {kindOfDay : day});
});*/
/* Passing Data from Your Webpage to Your Server, Instead of using the switch statement : 
Task : How to format a javascript date in a specified format by using toLocaleDateString()- (https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date)*/
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const date = require(__dirname + "/date.js");

//console.log(date); // whatever is exported from date.js will be logged here
//console.log(date());

const app = express();

const items = ["Buy food", "Cook food", "Eat Food"];
const workItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  //let day = date();
  // let day = date.getDay();
  const day = date.getDate();
  res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
  // console.log(req.body);
  const item = req.body.newItem;
  if (req.body.list === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

// app.post("/work", function (req, res) {
//   let item = req.body.newItem;
//   workItems.push(item);
//   res.redirect("/work");
// });

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});