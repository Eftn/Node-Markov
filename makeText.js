/** Command-line tool to generate Markov text. */
const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

/* Make Markov machine text /generate text */

function genText (text){
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

function makeText(path){
    fs.readFile(path, "utf8", function res( err, data){
        if (err){
            console.error(`cannot read file: ${path}: ${err}`);
            process.exit(1);
        } else{
            genText(data);
        }
    });
}

/* Read data from a URL and create text*/
async function makeURLText(url){
    let res;
    try{
        res = await axios.get(url);
    }
    catch(err){
        console.error(`Cannot read URL: ${url}: ${err}`);
        process.exit(1);
    }
genText(res.data)
}

/*** Update cmdline  ****/
let [method, path] = process.argv.slice(2);

if (method === "url"){
    makeURLText(path);

} else if (method === "file"){
    makeText(path);
}
else {
    process.exit(1);
}


