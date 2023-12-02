const { CallDatabase } = require("../src/CRUD.js");
const { GetBookingDetails } = require("../src/requestManagement.js");

const dummyBooking = {
  location: "a", meetingTime: "b", therapistName: "c",
  offeredMassages: "d", status: "Booked", client: "f", reference: "exampleRef"
};

async function SetupTestBooking() {
  const insertRecord = 1, collectionNum = 1;
  const temp = await CallDatabase(insertRecord, { cNum: collectionNum, newData: dummyBooking });
  if (temp) { console.log("Test booking successfully inserted."); }
  else { console.log("Test booking not inserted."); }
}

async function RunRequestManagementTestOne() {
  const bookingDetail = await GetBookingDetails("exampleRef");
  console.log("Expected Output is a Booking Detail: " + bookingDetail);
}

function RunAllRequestManagementTests() {
  // SetupTestBooking()
  console.log("Running request management test (1/1)");
  RunRequestManagementTestOne();
}

console.log("Request management testing module imported.");

module.exports = { RunAllRequestManagementTests };
