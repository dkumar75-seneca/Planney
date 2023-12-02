# Planney

This is the main repository of our scheduling application.

# Application Usage: 

Steps: Install node.js on your machine -> open bash / powershell terminal and enter "git clone (this repository link)" -> delete node_modules folder in downloaded files -> run "npm install" followed by "npm audit fix --force" and "npm start" on terminal.

Note: Since this repository has been made public, I had to remove and replace the mongodb connection uri string from the code for cybersecurity reasons. If you want to run this software on your machine, feel free to message me for the database uri and paste it on line 4 of CRUD.js.

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

    stylesheets and style.css: where most of the styling customisations for this application's user inteface is kept.

    javascripts: all the client side application logic (like submitting user input to the web server) is kept.

      helpers.js: contains code for commonly used client side use cases (like exchanging data with a web server).

      index.js: ties together all of the client side code functionality to make user interface work.

      renders.js: has all of the boilerplate html code for rendering specific web pages like customer side of the user interface.

      tables.js: has all of the main front end code responsible for ensuring that the data seen by user is up to date and accurate.
  
  server: where all the backend code (hosted on a web server) is kept. It consists of the following files with the following use cases:

    index.js: allow the server to import all the modules written by the development team for this project.

    router.js: handles the incoming user request and uses the modules functions written to return an appropriate response to the user.

    src: where all the server side source code / modules have been kept.

      CRUD.js: Handles all of the database connecting logic (e.g. inserting, reading, updating and removing records).

      accountValidator.js: Handles all of the user identity validation procedures (including getting user access level).
      
      accountManagement.js: Handles all of user account management procedures (like signup and login).
      
      requestValidator.js: Handles all of the user input data validation procedures.
      
      requestManagement.js: Formats the user request into a database connector compatible query.

    tests: where all the code written to test the server side modules have been kept. Script names correspond to the script that it is testing (e.g. CRUDTest tests functionality of CRUD.js functions). 

      CRUDTest.js, accountManagementTest.js, accountValidatorTest.js, requestManagementTest.js, requestValidatorTest.js

    extras.js: all of the code that was written but could not be implemented into the main project due to time constraints.
    
