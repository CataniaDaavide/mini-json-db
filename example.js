const db = require("./mydb")

// Inizializza database
const database = db("database.json")

// DATABASE CRUD
database.createDatabase()
console.log("Collections:", database.getCollections())

// COLLECTION CRUD
database.createCollection("users")
database.renameCollection("users", "members")
console.log("Collections after rename:", database.getCollections())
database.dropCollection("members")
console.log("Collections after drop:", database.getCollections())

// Document CRUD
database.createCollection("users")
const users = database.collection("users")

// Inserimento
users.insert({ name: "Luca", age: 22 })
users.insert({ name: "Marco", age: 25 })

// Ricerca
console.log("Find Luca:", users.find({ name: "Luca" }))
console.log("FindOne Marco:", users.findOne({ name: "Marco" }))

// Update
users.update({ name: "Luca" }, { age: 23 })
console.log("After update:", users.find({ name: "Luca" }))

// Delete
users.delete({ name: "Marco" })
console.log("After delete:", users.find())