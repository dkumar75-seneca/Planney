const serverUri = "http://localhost:3000/api";
const exampleJSON = { "name": "John", "age": 25 }

var credentials = { u: null, p: null };
var loginPressed = false, signupPressed = false, userLoggedIn = false;

SignOutFromApplication(); ShowLoginContent();
// SignIntoApplication(0); // RenderDashboard(); renderTable();

async function MakeLoginAttempt() {
  const elem = document.getElementById("login-guide");
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;
  if (user.length > 0 && pass.length > 0) {
    const input = { requestType: 2, userDetails: { username: user, password: pass } };
    elem.innerHTML = "Request Sent. Kindly wait for server response."; elem.style.color = "green";
    const serverResponse = await SendPostRequest(serverUri, input);
    if (serverResponse.data) { SignIntoApplication(serverResponse.data); }
    // { userLoggedIn = true; credentials.u = user; credentials.p = password }
    else if (serverResponse.error) { elem.innerHTML = "Login Failed. Recheck credentials."; elem.style.color = "red"; }
  } else { elem.innerHTML = "Kindly fill all fields before sending request."; elem.style.color = "red"; }
}

async function MakeSignupAttempt() {
  const elem = document.getElementById("login-guide");
  const phone = document.getElementById("phone").value, email = document.getElementById("email").value;
  const fname = document.getElementById("fname").value, lname = document.getElementById("lname").value;
  const user = document.getElementById("user").value, pass = document.getElementById("pass").value;

  let checks = user.length > 0 && pass.length > 0 && fname.length > 0;
  checks = checks && lname.length > 0 && email.length > 0 && phone.length > 0;
  if (checks) {
    const input = {
      requestType: 1, userDetails: {
        username: user, password: pass, "first": fname, "last": lname, "phone": phone, "email": email
      }
    };
    
    elem.innerHTML = "Request Sent. Kindly wait for server response."; elem.style.color = "green";
    if (serverResponse.data) { SignIntoApplication(serverResponse.data); }
    // { userLoggedIn = true; credentials.u = user; credentials.p = password }
    else if (serverResponse.error) { elem.innerHTML = "Sign Up Failed. Recheck user details."; elem.style.color = "red"; }
  } else { elem.innerHTML = "Kindly fill all fields before sending request."; elem.style.color = "red"; }
}
