const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));//specifies a static folder
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
 res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

 const firstName = req.body.fName;
 const surname = req.body.lName;
 const email = req.body.email;

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

 const jsonData = JSON.stringify(data);

 const url = "https://us7.api.mailchimp.com/3.0/lists/7376336139";

 const options = {
   method: "post",
   auth: "Willis:615d17ecd56290c5ad0ea4b8cf49b69b-us7" //cant have spaces
 };

 const request = https.request(url, options, function(response){
   response.on("data", function(data){
     console.log(JSON.parse(data));
   })
 })

 request.write(jsonData);
 request.end();

});

app.listen(3000, function(){
  console.log("Server is running on port 3000...");
})





//Mailchimp endpoint
//https://server.api.mailchimp.com/3.0/lists/{list_id}

//API Key
//615d17ecd56290c5ad0ea4b8cf49b69b-us7

//List ID
//7376336139
