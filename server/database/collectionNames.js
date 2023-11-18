// Order of the below variables should be in sync. Hence, they are kept in the same js file.

exports.collectionNames = [
  "Locations", "Massages", "Employees", "Customers", "Timeslots",
  "Rosters", "Reminders", "Allocations", "Accounts", "SystemLogs"
];

exports.collectionFields = [
  [["branchID", "string"], ["state", "string"], ["country", "string"], ["postalCode", "string"], ["streetAddress", "string"]],
  [["massageID", "string"], ["massageName", "string"], ["price", "number"], ["duration", "number"]],
  [["employeeID", "string"], ["personName", "string"], ["employeeTitle", "string"], ["offeredMassages", "Array<string>"]],
  [["customerID", "string"], ["personName", "string"], ["whitelisted", "boolean"]],
  [["timeslotID", "string"], ["status", "boolean"], ["roomNumber", "number"],
   ["slotNumber", "number"], ["employeeID", "string"], ["personName", "string"]],
  [["rosterID", "string"], ["date", "datetime"], ["branchID", "string"], ["timeslots", "Array<string>"]],
  [["reminderID", "string"], ["title", "string"], ["status", "boolean"], ["alertTime", "datetime"], ["description", "string"]],
  [["allocationID", "string"], ["branchID", "string"], ["rosterID", "string"], ["timeslotID", "string"],
   ["customerID", "string"], ["waitlist", "Array<string>"], ["reminders", "Array<string>"]],
  [["accountID", "string"], ["username", "string"], ["password", "string"],
   ["accessLevel", "number"], ["phone", "string"], ["email", "string"], ["userID", "string"]],
  [["logID", "string"], ["personName", "string"], ["actionType", "number"],
   ["description", "string"], ["accessTime", "datetime"], ["accountID", "string"]]
];

exports.collectionTemplates = [
  { state: null, country: null, postalCode: null, streetAddress: null },
  { massageName: null, price: 0, duration: 0, massageNumber: 0, totalScore: 0, reviewsNumber: 0 },
  { personName: null, employeeTitle: null, offeredMassages: [] },
  { personName: null, whitelisted: null },
  { status: null, personName: null, employeeNum: 0, roomNumber: 0, slotNumber: 0 },
  { date: null, branchNum: 0, timeslots: [] },
  { title: null, status: null, alertTime: null, description: null },
  { branchNum: 0, rosterNum: 0, slotNumber: 0, customerNum: 0, waitlist: [], reminders: [] },
  { accessLevel: 0, userID: 0, password: null, username: null, phone: null, email: null },
  { personName: null, actionType: null, description: null, accessTime: null, accountID: null }
];
