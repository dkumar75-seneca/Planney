# Planney

This is the main repository of our scheduling application.

# Application Usage: 

If node_modules folder is no longer in this repository, enter "npm install" followed by "npm audit fix --force" to fix vulnerabilities.

Once modules have been confirmed to be installed, run the application with "npm start" on the operating system terminal (Bash or PowerShell).

# File Structure:

Standard Express.js Framework Files:

app.js: where all the high-level logic of the application is situated.

bin: where the application binary (www) is located.

node_modules: where all the libraries used by the application is kept.

package.json and package-lock.json: have all the build based instructions for automated deployment and sharing later on.

Folders specifically developed for this project:

  client: where all the browser side side of the application code is kept. It consists of the following files with the following use cases:

    index.html: main application file that the browser will run and render on the screen.

    favicon.ico: icon file for the webpage tab.

    icons: same functionality as the favicon.ico file.

    stylesheets: where all the styling customisations for this application's user inteface is kept.

    javascripts: all the client side application logic (like submitting user input to the web server) is kept. 
  
  server: where all the backend code (hosted on a web server) is kept. It consists of the following files with the following use cases:

    
