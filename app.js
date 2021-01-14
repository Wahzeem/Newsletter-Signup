// Required packages
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

// Creating new instance of express
const app = express();

// Port number of server
const serverPort = 3000;

// Specifies a static folder (css, img folder)
app.use(express.static("public"));
// Allows access to html body
app.use(bodyParser.urlencoded({extended: true}));

// GET requests
app.get("/", function(req, res){
// Send the html file as a https response
 res.sendFile(__dirname + "/signup.html");
});

//POST requests
app.post("/", function(req, res){
 const firstName = req.body.fName;
 const surname = req.body.lName;
 const email = req.body.email;

// JSON object for data structure
 const data = {
   members:[
     {
       email_address: email,
       status: "subscribed",
       merge_fields: {
         FNAME: firstName,
         LNAME: surname
       }
     }
 ]
}

//stringify the data to compact it
 const jsonData = JSON.stringify(data);

//Mailchimp url endpoint with list ID
 const url = "https://us7.api.mailchimp.com/3.0/lists/7376336139";

//options for https request...specifies that its for the post request along with api key
 const options = {
   method: "post",
   auth: "..." //reminder = cant have spaces
 };

//Make the https request a const
 const request = https.request(url, options, function(response){ //callback only requires a response
   response.on("data", function(data){
     console.log(JSON.parse(data)); //show data in JSON form
   })
 })

 //send the JSON data to Mailchimp
 request.write(jsonData);
 //Specifies that we are done with the request
 request.end();

}); // End of Post request

//
app.listen(serverPort, function(){
  //Console message that notifies what port the server is on
  console.log("Server is running on port " + serverPort + "...");
})





//Mailchimp endpoint
//https://server.api.mailchimp.com/3.0/lists/{list_id}



//List ID
//7376336139
