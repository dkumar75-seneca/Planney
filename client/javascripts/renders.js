async function SignIntoApplication(serverResponse) {
  RenderDashboard();
  tableChoices = serverResponse.categories; readOnly = serverResponse.readOnly;
  tableHeadings = serverResponse.headings[0]; tableRows = serverResponse.listings[0];
  if (readOnly) { document.getElementById("MyAddButton").style.visibility = "hidden"; }
  else { document.getElementById("MyAddButton").style.visibility = "visible"; }
  if (tableChoices.length > 1) { document.getElementById("firstColumn").style.visibility = "visible"; }
  else { document.getElementById("firstColumn").style.visibility = "hidden"; }
  renderTable();
  let elem = document.getElementById("NotificationLabel");
  elem.innerHTML = tableChoices[0] + " data has been loaded.";
  console.log(readOnly, tableChoices, tableHeadings, tableRows); return;
}

function RenderDashboard() {
  const elem = document.getElementById("content")
  elem.innerHTML = `
  <div id="tableRender">
    <div class="row">
      <div style="text-align: left;" class="col">
        <div id="firstColumn" class="dropdown">
          <button id="myButton" class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            Choose an option
          </button>
          <ul id="firstColDropdown" class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" onclick="updateTable(0)">Accounts</a></li>
            <li><a class="dropdown-item" onclick="updateTable(1)">Schedules</a></li>
          </ul>
        </div>
      </div>
      <div id="NotificationLabel" style="text-align: center; padding-top: 10px;" class="col">
        Choose category to view records. 
      </div>
      <div id="lastColumn" style="text-align: right;" class="col">
        <button id="MyAddButton" class="btn btn-success" onclick="updateRecordNum(-1)" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Record</button>
      </div>
    </div>
    <br>
    <table id="viewTable" class="center"></table>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="MyModalTitle" class="modal-title" id="exampleModalLabel"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div id="MyModalBody" class="modal-body"></div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
            <button id="MyModalButton" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

function SignOutFromApplication() {
  const elem = document.getElementById("content");
  elem.innerHTML = `
    <div id="login-form" class="center">
      <h3>Welcome to Planney</h3>
      <br>
      <div id="input-choices"></div>
      <br>
      <button id="loginButton" onclick="ShowLoginContent();" class="btn btn-secondary" type="button">
        Login
      </button>
      &nbsp;&nbsp;
      <button id="signupButton" onclick="ShowSignUpContent();" class="btn btn-secondary" type="button">
        Create Account
      </button>
      <br><br><label id="login-guide"></label><br>
    </div>
  `;
}

function ShowLoginContent() {
  if (loginPressed) { MakeLoginAttempt(); return; }
  console.log("Show login function was called.");
  loginPressed = true; signupPressed = false;
  const lBtn = document.getElementById("loginButton"); lBtn.innerHTML = "Login";
  const sBtn = document.getElementById("signupButton"); sBtn.innerHTML = "Create An Account";
  const elem = document.getElementById("input-choices");
  elem.innerHTML = `
    <label for="user">Username</label><br>
    <input type="text" id="user" name="user" value=""><br><br>
    <label for="pass">Password</label><br>
    <input type="text" id="pass" name="pass" value=""><br><br>
  `;
}

function ShowSignUpContent() {
  if (signupPressed) { MakeSignupAttempt(); return; }
  console.log("Sign up function was called.");
  loginPressed = false; signupPressed = true;
  const lBtn = document.getElementById("loginButton"); lBtn.innerHTML = "Login Instead";
  const sBtn = document.getElementById("signupButton"); sBtn.innerHTML = "Sign Up";
  const elem = document.getElementById("input-choices");
  elem.innerHTML = `
    <div class="row">
      <div class="col-lg-2"></div>
      <div class="col-lg-2"></div>
      <div class="col-lg-2">
        <label for="fname">First Name</label><br>
        <input type="text" id="fname" name="fname" value=""><br>
      </div>
      <div class="col-lg-2">
        <label for="lname">Last Name</label><br>
        <input type="text" id="lname" name="lname" value=""><br><br>
      </div>
      <div class="col-lg-2"></div>
      <div class="col-lg-2"></div>
    </div>
    <div class="row">
      <div class="col-lg-2"></div>
      <div class="col-lg-2"></div>
      <div class="col-lg-2">
        <label for="phone">Phone Number</label><br>
        <input type="text" id="phone" name="phone" value=""><br>
      </div>
      <div class="col-lg-2">
        <label for="email">Email Address</label><br>
        <input type="text" id="email" name="email" value=""><br><br>
      </div>
      <div class="col-lg-2"></div>
      <div class="col-lg-2"></div>
    </div>
    <div class="row">
      <div class="col-lg-2"></div>
      <div class="col-lg-2"></div>
      <div class="col-lg-2">
        <label for="user">Username</label><br>
        <input type="text" id="user" name="user" value=""><br>
      </div>
      <div class="col-lg-2">
        <label for="pass">Password</label><br>
        <input type="text" id="pass" name="pass" value=""><br><br>
      </div>
      <div class="col-lg-2"></div>
      <div class="col-lg-2"></div>
    </div>
  `;
}
