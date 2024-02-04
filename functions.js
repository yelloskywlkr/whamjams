const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();


function keyListener(){

    var yrbox = document.querySelector('yrbutton');
    yrbox.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
        // code for enter
        console.log("year entered");
        navtoresults();
         }
    });
}

function navtoresults() {
    var year= document.getElementById('yrbox').value;
    localStorage.setItem('year', year);
 
    // queryVidsByYear(year);
    location.href = "/dospage.html?year=" + year;

}


function queryVidsByYear(year) {
    var query = "SELECT * FROM music_videos WHERE year='" + year + "'";
    try {
        const client = new Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT
        })
 
        client.connect()
        const results = client.query(query)
        console.log(client.query(query));
        for(var i = 0; i < results.length ; i++){
            localStorage.setItem('query'+string(i), results.rows)
        }
        client.end()
        return results
    } catch (error) {
        console.log(error)
    }
}

function getResults() {
    var year = localStorage.getItem('year');
    document.getElementById('resultsHeader').innerHTML = "Results For " + year;
    var results = queryVidsByYear(year);
    document.getElementById("showResults").innerHTML = results;
    
    
}