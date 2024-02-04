var http = require('http');
var fs = require('fs');
const { Client } = require("pg");      // created CLient for Postgres
const dotenv = require("dotenv");      //config forpostgres client
const hostname = '127.0.0.1';
const port = 3000;                    //connecting to the node server
dotenv.config();
const express = require("express");
const app = express();
const path = require('path');
app.use(express.static('./public'));  //Express accessing static files


const pg = require('knex')({         //connecting to knex database 
  client: 'pg',
  connection: "postgresql://localhost/mrsm?user=mrsm&password=password",  //user:brenna pswrd: password
  searchPath: ['knex', 'public'],
});

// const pgp = require('pg-promise');    //Postgres promise, postgres connector for Express, did not work
// const db = pgp('postgres://mrsm:password@localhost:5432/mrsm');

// const server = http.createServer((request, response) => {                   //Start server 
//  This begins the routing table                
//    if (request.url === '/' || request.url === '/home' || request.url === '/future.html')  {
//     response.writeHead(200, { 'Content-Type': 'text/html' });
//     fs.createReadStream(__dirname + '/future.html').pipe(response);
//  }
//  if (request.url === '/getData')  {
//     pg.select().table('music_videos').where({year:"1995"}).then(function(data){
//       response.writeHead(200, { 'Content-Type': 'application/json' });
//       response.end(JSON.stringify(data));
//     }).catch(function(error){
//       console.log(error)
//     });
// }
// if (request.url.indexOf('.js') != -1) {
//   response.writeHead(200, { 'Content-Type': 'text/javascript' });
//   fs.createReadStream(__dirname + '/functions.js').pipe(response);
// }
// if (request.url.indexOf('.css') != -1) {
//   response.writeHead(200, { 'Content-Type': 'text/css' });
//   fs.createReadStream(__dirname + '/styles.css').pipe(response);
// }
// if (request.url === '/dospage' || request.url === '/dospage.html') {
//   pg.select().table('music_videos').then(function(data){
//   console.log(data)
//   }).catch(function(error){
//   console.log(error)
//   });
//   response.writeHead(200, { 'Content-Type': 'text/html' });
//   fs.createReadStream(__dirname + '/dospage.html').pipe(response);
// }

// });






app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/future.html'));
});

app.get('/dospage', function(req, res) {
  res.sendFile(path.join(__dirname, '/dospage.html'));
});

app.get("/getData", (req, res) => {
  let year = req.query.year;
  pg.select().table('music_videos').where({year:year}).then(function(data){
    // response.writeHead(200, { 'Content-Type': 'application/json' });
    // response.end(JSON.stringify(data));
    res.send(JSON.stringify(data));
  }).catch(function(error){
    console.log(error)
  });
 
});


app.listen(3000, () => {
  console.log("Node API app is running on port 3000");
});


// server.listen(port, hostname, () => {                                   //initializes server and sets listening
//   console.log(`Server running at http://${hostname}:${port}/`);
// });


// const connectDb =  () => {                                              //This method is proof of concept for database connection
//   try {
//       const client = new Client({
//           user: process.env.PGUSER,
//           host: process.env.PGHOST,
//           database: process.env.PGDATABASE,
//           password: process.env.PGPASSWORD,
//           port: process.env.PGPORT
//       })

//       client.connect()
//       var year = 1993
//       var query = "SELECT * FROM music_videos WHERE year='" + year + "'"       //Query for home page to pull year of song
//       const res = client.query(query)
//       console.log(res)
//       client.end()
//       return res
//   } catch (error) {
//       console.log(error)
//   }
// }

function navtoresults() {                                                  //Externally called method for navigation
  var year = document.getElementById('yrbox').value;
  localStorage.setItem('year', year);

  // queryVidsByYear(year);
  location.href = "/dospage.html";

}

// const queryVidsByYear = async (year) => {                                //Query results for a particular year for homepage that was not successful
//   var query = "SELECT * FROM music_videos WHERE year='" + year + "'";
//   try {
//       const client = new Client({
//           user: process.env.PGUSER,
//           host: process.env.PGHOST,
//           database: process.env.PGDATABASE,
//           password: process.env.PGPASSWORD,
//           port: process.env.PGPORT
//       })

//       client.connect()
//       const results = client.query(query)
//       console.log(results)
//       client.end()
//       return results
//   } catch (error) {
//       console.log(error)
//   }
// }

function getResults() {                                             //After unsuccessful queries, tried another method to show results from db
  var year = localStorage.getItem('year');
  document.getElementById('resultsHeader').innerHTML = "Results For " + year;
  // var results = queryVidsByYear(year);
  // for(r in results){
  //     document.getElementById("showResults").innerHTML = r;
  // }
}

// connectDb()
// queryVidsByYear(1995)

console.log("Ctl + C to quit");


