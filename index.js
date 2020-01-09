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
        
        const response = await axios
            .get(queryURL)
            .then(function(response) {
                // console.log(response.data);   
                return response;
            });

        const data = response.data;

        const profile = await 
            `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>${data.name}'s Portfolio</title>
            
                <style>
                    .header {
                        background-color: #f0ce41;
                        height: 30px;
                    }
                    .container {
                        background-color: #f0ce41;
                    }
            
                    .snapshot{
                        background-color: #ff5a00;
                        max-width: 800px;
                        margin: 0 auto;
                        box-shadow: 0 0 10px black;
                        border-radius: 2%;
                    }
            
                    .cards {
                        background-color: ${input.color};
                        display: inline-block;
                        text-align: center;
                        margin-top: 30px;
                        margin-bottom: 30px;
                        height: 100px;
                        width: 300px;
                        box-shadow: 0 0 10px black;
                    }
            
                    .profilePic { 
                        display:block; 
                        margin-left:auto; 
                        margin-right:auto; 
                        height:300px; 
                        width:300px; 
                        border-radius: 50%;
                        box-shadow: 0 15px 15px #5a1d57;
                    }
            
                    .center {
                        text-align:center;
                    }
            
                    .infoCards {
                        color:wheat;
                        background-color: #e10044;
                        max-width: 800px;
                        margin: 0 auto;
                        box-shadow: 0 0 10px black;
                        margin-top: 15px;
                        border-radius: 2%;
                    }
            
                    .spaced {
                        display: flex;
                        justify-content: space-evenly;
                    }
            
                    .links {
                        text-decoration: none;
                        color: #f0ce41;
                    }
            
                    .links:visited{
                        color: #5a1d57;
                    }
            
                </style>
            
                <script src="https://kit.fontawesome.com/a076d05399.js"></script>
            
            </head>
            <body style="margin: 0px">
                <div class="container" style="margin: 0 auto; max-width: 900px;">
                    <header class="header">
                        <h3 class="center" style="margin-top:0px;">Welcome to a dynamically generated profile for a GitHub user.</h3>
                    </header>
                    <div class="snapshot">
                        <img src=${data.avatar_url} alt="profilePicture" class="profilePic">
                        <br>
                        <h1 class="center" style="color:wheat;">My name is: ${data.name}</h1>
                        <br>
                        <div class="center">
                            <i class="fas fa-map-marker-alt"></i><a class="links" href="https://www.google.com.au/maps/place/${data.location}" alt="location"></a> ${data.location}, </a>
                            <i class="fab fa-github"></i><a class="links" href=${data.html_url} alt="github account"> GitHub, </a>
                            <i class="fab fa-blogger-b"></i><a class="links" href=${data.blog} alt="other social media"> Blog</a>
                        </div>
                        <br>
                        <br>
                    </div>
                    <div class="center infoCards">
                        <div class="spaced">
                            <div id="publicRepos" class="cards">
                                <h3>Public Repositories</h3>
                                <h3>${data.public_repos}</h3>
                            </div>
                            <div id="followers" class="cards">
                                <h3>Followers</h3>
                                <h3>${data.followers}</h3>
                            </div>
                        </div>
                        <br>
                        <div class="spaced">
                            <div id="githubStars" class="cards">
                                <h3>GitHub Stars</h3>
                                <h3>${data.followers}</h3>
                            </div>
                            <div id="following" class="cards">
                                <h3>Following</h3>
                                <h3>${data.following}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            </html>`;

        await fs.writeFile(input.username + ".html", profile, function(err) {
            if(err) {
                throw err;
            }
            console.log("Success!");
        });
    }

    catch(err) {
        console.log(err);
    }
}

generateIt();