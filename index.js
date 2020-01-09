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

        const profile = 
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>${data.name}'s Portfolio</title>
        </head>
        <body>
            <div class="container">
                <div class="snapshot">
                    <img src=${data.avatar_url} alt="profilePicture">
                    <h3>Something about being welcomed</h3>
                    <h3>My name is: ${data.name}</h3>
                    <h5>Current job?</h5>
                    <a href=${data.location} alt="location">${data.location}</a>
                    <a href=${data.url} alt="github account">GitHub</a>
                    <a href=${data.blog} alt="other social media">Blog</a>
                </div>
                <div class="cards">
                    <h3>I build things and teach people to code</h3>
                    <div id="publicRepos" style="background-color: ${input.color}";>
                        <h3>Public Repositories</h3>
                        <h3>${data.public_repos}</h3>
                    </div>
                    <div id="followers" style="background-color: ${input.color}";>
                        <h3>Followers</h3>
                        <h3>${data.followers}</h3>
                    </div>
                    <div id="githubStars" style="background-color: ${input.color}";>
                        <h3>GitHub Stars</h3>
                        <h3>${data.followers}</h3> `/*change to starred repos...somehow*/`
                    </div>
                    <div id="following" style="background-color: ${input.color}";>
                        <h3>Following</h3>
                        <h3>${data.following}</h3>
                    </div>
                </div>
            </div>
        </body>
        </html>`;

    }

    catch(err) {
        console.log(err);
    }
}

generateIt();