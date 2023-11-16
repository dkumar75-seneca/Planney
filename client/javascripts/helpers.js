const serverUri = "http://localhost:3000/api";
const exampleJSON = { "name": "John", "age": 25 }

async function SendGetRequest(uri) {
  const response = await fetch(uri, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  const output = await response.json(); //extract JSON from the http response
  console.log(output); return output;
  
}

async function SendPostRequest(uri, input) {
  const response = await fetch(uri, {
    body: JSON.stringify(input),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
  const output = await response.json(); //extract JSON from the http response
  console.log(output); return output;
}

function copyJSON(input) {
  return JSON.parse(JSON.stringify(input));
};

console.log("Client side helper script is integrated and running.");
