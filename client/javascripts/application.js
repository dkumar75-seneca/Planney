const exampleJSON = { "name": "John", "age": 25 }

const serverUri = "http://localhost:3000/api/"

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

SendGetRequest(serverUri)
SendPostRequest(serverUri, exampleJSON)
console.log("Client side script is integrated and running.");