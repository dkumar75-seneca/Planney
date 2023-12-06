var credentials = { username: null, password: null };
var loginPressed = false, signupPressed = false, userLoggedIn = false;

async function SendGetRequest(uri) {
  try {
    const response = await fetch(uri, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const output = await response.json(); return output;
  } catch (e) { return "Server Not Responding As Expected"; }
}

async function SendPostRequest(uri, input) {
  try {
    const response = await fetch(uri, {
      body: JSON.stringify(input),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const output = await response.json(); return output;
  } catch (e) { return "Server Not Responding As Expected"; }
}

SendPostRequest("https://planneynew.azurewebsites.net/", {requestType: 5});

function copyObject(input) { return JSON.parse(JSON.stringify(input)); };
