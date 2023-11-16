// Order of the below variables should be in sync. Hence, they are kept in the same js file.

exports.collectionNames = [
  "locations", "massages", "employees", "customers", "timeslots",
  "rosters", "reminders", "allocations", "accounts", "systemlogs"
];

exports.collectionFields = [
  [["branchID", "string"], ["state", "string"], ["country", "string"], ["postalCode", "string"], ["streetAddress", "string"]],
  [["massageID", "string"], ["massageName", "string"], ["price", "number"], ["duration", "number"]],
  [["employeeID", "string"], ["personName", "string"], ["employeeTitle", "number"], ["offeredMassages", "Array<string>"]],
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
