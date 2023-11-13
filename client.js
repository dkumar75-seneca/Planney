// a test file to simulate REST api requests to server from the client side.

const exampleJSON = { "name": "John", "age": 25 }

const serverUri = "http://localhost:3000/api/employees";

async function SendGetRequest(uri) {
  const response = await fetch(uri, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  const output = await response.json(); //extract JSON from the http response
  console.log(output);
}

async function SendPostRequest(uri, input) {
  const response = await fetch(uri, {
    body: JSON.stringify(input),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
  const output = await response.json(); //extract JSON from the http response
  console.log(output);
}

function copyJSON(input) {
  return JSON.parse(JSON.stringify(input));
};

SendPostRequest(serverUri, exampleJSON);

const apiEndpoints = [
  "/locations", "/massages", "/employees", "/customers", "/timeslots",
  "/rosters", "/reminders", "/allocations", "/accounts", "/systemlogs"
]

for (let i = 0; i < apiEndpoints.length; i++) { SendGetRequest("http://localhost:3000/api" + apiEndpoints[i]); }

console.log("Client side helper script is integrated and running.");
