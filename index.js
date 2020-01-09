const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");

async function generateIt() {
    try {
        const input = await inquirer
            .prompt([
                {
                    message: "What is your favourite color?",
                    name: "color"
                },
                {
                    message: "What is your GitHub username?",
                    name: "username"
                }
            ]);

        const queryURL = `https://api.github.com/users/${input.username}`;
        ///repos?per_page=100
        
        await axios
            .get(queryURL)
            .then(function(response) {
                console.log(response.data);
                const data = response.data;
            });

        // const profile = 
        
    }

    catch(err) {
        console.log(err);
    }
}

generateIt();