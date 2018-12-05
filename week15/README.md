# Penultimate Class!

# Documentation Example

- [How We Act Together](http://lauren-mccarthy.com/How-We-Act-Together) - Lauren McCarthy
- [Terrapatterns](http://www.flong.com/projects/terrapattern/) - Golan Levin
- [3 Degrees of Separation from the Military-Industrial-Prison-Data-Surveillance State](https://linkedd.s3.amazonaws.com/index.html) - Sam Lavigne
- [Radical Love: Chelsea Manning](https://deweyhagborg.com/projects/radical-love) - Heather Dewey-Hagborg
- [Becoming With Fungi](http://www.maggic.ooo/Becoming-with-Fungi-2017) - Mary Maggic

# Host your work on a remote server


### Hosting with Amazon EC2

1. Sign up for Amazon EC2 (an online virtual server space). We are going to create an *instance*, which is a single computer in a *cloud* computing space. We will choose a Ubuntu Linux instance.
2. Create a public and private key pair. Great [tutorial](https://www.youtube.com/watch?v=ZghMPWGXexs) video explaining what this key pair is
4. We can connect to this remote server (computer) in our Terminal with a program called ssh (secure shell), using our key pair. Our remote server will be empty when it is created
5. Using Secure FTP (aka SSH FTP) we will upload our bot, config.js and packages.json files. I recommend the free ftp program Filezilla.
6. We need to install node on our remote server and npm, the node package manager. A package manager is a program that has access to lots of software repositories for different tasks. We do this inside our terminal connected to the remote server instance using ssh.
7. We then use ```npm install``` to install the latest versions of Twit (a Twitter program) and any other needed npm node packages.
8. We test our node file by running it on the server. If it works, quit. If it doesn't, quit and debug.
. If it works, quit. If it doesn't, quit and debug.. If it works, quit. If it doesn't, quit and debug.. If it works, quit. If it doesn't, quit and debug.. If it works, quit. If it doesn't, quit and debug.. If it works, quit. If it doesn't, quit and debug.. If it works, quit. If it doesn't, quit and debug.. If it works, quit. If it doesn't, quit and debug.. If it works, quit. If it doesn't, quit and debug.. If it works, quit. If it doesn't, quit and debug.
9. We use npm to install *forever*, a program that can manage our forever-running bot. We then use forever to start our bot. Our bot is now deployed. Congratulations! Phew!


# Create your own API / Routing and Serving With Express

### Express

### Writing your own webserver
Express is one of the most popular frameworks for Node. It acts as a web server, querying input, directing routing for mobile and web applications. You can use it to create your own API, aka your own interface between programs.

1. Start by creating a directory for your project ```mkdir project-title``` and enter that folder ```cd project-title```
2. Use ```npm init``` which will trigger a guide, asking you some questions, and generating a basic package.json file that will list all of your needed nodejs packages to be installed from npm and any other basic info relating to your project.
3. After this is completed, we need to tell npm to install the Express package. ```npm install express --save```.
4. Now we can create and open up our javascript file. Here I'll name it **main.js**.
5. Inside our main.js file we'll need to *require* Express so we can use it. ```const express = require('express');```.
6. Now that we've pulled in the Express framework, we can use it. We'll create an express *app* with ```const app = express();```
``
7. At this point, we have only added two lines to our file. We've created an app instance of Express and can now add functionality to that instance. Let's listen to connections on a specified port. ```const server = app.listen(3000);```
8. We can easily serve static files. If we have created a website (along with javascript file) we can place it in a sub-directory, eg ```sub/index.html``` and then visit this projec in our browser at ```localhost:3000/sub```.

## Server reloading
* While you are developing you may make lots of changes to your code and it may be annoying to have to stop and restart your server constantly
* There are various npm packages to deal with this. One simple one is *nodemon* which will run a server and watch for changes to your code. If your code changes because you saved updated code in your text editor, nodemon will watch and re-serve the updated page.
* ```npm install nodemon -g``` to install this globally to use in all of your projects
* you can use this to replace the *node* command when running your programs, such as ```nodemon main.js```

### Routing

* Simplified explanation: A REST API stands for a REpresentational State Transfer. This allows you to create an API that accepts GET requests to serve information.
* Using Express, we can serve a *route*. By typing in a url such as *website.com/search/sriracha*, this route *search/sriracha* gets interpreted by our server through its API to search for our object and then send back particular data.
* When a user makes a request, we send back a response

Routing is particularly useful for executing specific code based on the user's specific route.

```
app.get('/this_route', specialFunction);
```

By adding this to our code, we trigger a function as a callback to run when a user hits our domain at *this_route*.

Our created function looks like:

```
function specialFunction(request, response) {
  response.send("Running our special function.");
}
```

We pass the parameters *request* and *response*, which references **http**'s *request-response protocol*. You can also pass html, either inside the send request, or more conveniently, as a passed variable containing your html.

```
function specialFunction(request, response) {
  let message = '<h1>Headline</h1><p>Some information on this topic.</p>';
  response.send(message);
}
```

### Resources
* HTTP Server With Express [tutorial](https://www.youtube.com/watch?v=6oiabY1xpBo&list=PLRqwX-V7Uu6Yyn-fBtGHfN0_xCtBwUkBp&index=2) by Dan Shiffman
* Creating Routes [tutorial](https://www.youtube.com/watch?v=e4qKBkwwkNg&index=3&list=PLRqwX-V7Uu6Yyn-fBtGHfN0_xCtBwUkBp)
