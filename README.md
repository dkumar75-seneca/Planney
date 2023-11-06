# Planney

This is the main repository of our scheduling application.

# Application Usage (after cloning repository): 

If node_modules folder is no longer in this repository, enter "npm install" followed by "npm audit fix --force" to fix vulnerabilities.

Once modules have been confirmed to be installed, run the application with "npm start" on the operating system terminal (Bash or PowerShell).

# File Structure:

It is based off standard Express.js project structures as described below:

app.js: where all the high-level logic of the application is situated.

bin: where the application binary (www) is located.

client: where all the front-end code is located (UNDER DEVELOPMENT).

node_modules: forgot to exclude it off the project as with most projects, but I'll let it stay due to its small scale.

package.json: has all the build based instructions for automated deployment and sharing later on.

server: where all the back-end code is located (UNDER DEVELOPMENT).
