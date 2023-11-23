// Order of the below variables should be in sync. Hence, they are kept in the same js file.

exports.collectionNames = [
  "Locations", "Massages", "Employees", "Customers",
  "Timeslots", "Rosters", "Reminders", "Allocations",
  "Accounts", "SystemLogs", "Availabilities", "AccessLevels"
];

exports.collectionFields = [
  [["reference", "string"], ["state", "string"], ["country", "string"],
   ["postalCode", "string"], ["streetAddress", "string"]],
  [["reference", "string"], ["massageName", "string"], ["price", "number"], ["duration", "number"]],
  [["reference", "string"], ["personName", "string"], ["personPhone", "string"],
   ["employeeTitle", "string"], ["offeredMassages", "Array<string>"]],
  [["reference", "string"], ["personName", "string"], ["personPhone", "string"], ["whitelisted", "boolean"]],
  [["reference", "string"], ["status", "boolean"], ["roomNumber", "number"],
   ["slotNumber", "number"], ["employeeID", "string"], ["personName", "string"]],
  [["reference", "string"], ["rosterDate", "datetime"], ["branchID", "string"], ["timeslots", "Array<string>"]],
  [["reference", "string"], ["title", "string"], ["status", "boolean"],
   ["alertTime", "datetime"], ["description", "string"]],
  [["reference", "string"], ["branchID", "string"], ["rosterID", "string"], ["timeslotID", "string"],
   ["customerID", "string"], ["waitlist", "Array<string>"], ["reminders", "Array<string>"]],
  [["reference", "string"], ["username", "string"], ["password", "string"],
   ["accessLevel", "number"], ["email", "string"], ["userID", "string"]],
  [["logID", "string"], ["username", "string"], ["actionType", "number"],
   ["description", "string"], ["accessTime", "datetime"], ["accountID", "string"]],
  [["reference", "string"], ["employeeID", "string"], ["rosterDate", "datetime"],
   ["startTimeslot", "number"], ["endTimeslot", "number"]],
  [["reference", "string"], ["AccessLevel", "number"]]
];

exports.collectionAccessRequirements = [
  { insert: 1, read: 1, update: 1, delete: 1 }, { insert: 1, read: 1, update: 1, delete: 1 },
  { insert: 1, read: 1, update: 1, delete: 1 }, { insert: 1, read: 1, update: 1, delete: 1 },
  { insert: 1, read: 1, update: 1, delete: 1 }, { insert: 1, read: 1, update: 1, delete: 1 },
  { insert: 1, read: 1, update: 1, delete: 1 }, { insert: 1, read: 1, update: 1, delete: 1 },
  { insert: 1, read: 1, update: 1, delete: 1 }, { insert: 1, read: 1, update: 1, delete: 1 },
  { insert: 1, read: 1, update: 1, delete: 1 }, { insert: 1, read: 1, update: 1, delete: 1 }
];
