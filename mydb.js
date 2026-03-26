const fs = require("fs")
const pathModule = require("path")

function db(path) {
  const fullPath = pathModule.resolve(path)

  // Crea database se non esiste
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, JSON.stringify({}, null, 2))
  }

  function read() {
    const data = fs.readFileSync(fullPath, "utf-8")
    return JSON.parse(data || "{}")
  }

  function write(data) {
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2))
  }

  function generateId() {
    return (
      Date.now().toString(36) +
      Math.random().toString(36).substring(2)
    )
  }

  function matchFilter(doc, filter) {
    return Object.keys(filter).every(key => doc[key] === filter[key])
  }

  return {

    /* =========================
       DATABASE CRUD
    ========================== */

    createDatabase() {
      if (!fs.existsSync(fullPath)) {
        write({})
      }
      return true
    },

    dropDatabase() {
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath)
      }
      return true
    },

    getCollections() {
      const data = read()
      return Object.keys(data)
    },

    /* =========================
       COLLECTION CRUD
    ========================== */

    createCollection(name) {
      const data = read()
      if (!data[name]) {
        data[name] = []
        write(data)
      }
      return true
    },

    dropCollection(name) {
      const data = read()
      if (data[name]) {
        delete data[name]
        write(data)
      }
      return true
    },

    renameCollection(oldName, newName) {
      const data = read()
      if (!data[oldName]) return false
      if (data[newName]) return false

      data[newName] = data[oldName]
      delete data[oldName]
      write(data)
      return true
    },

    collection(name) {
      const data = read()

      if (!data[name]) {
        data[name] = []
        write(data)
      }

      return {

        /* =========================
           DOCUMENT CRUD
        ========================== */

        find(filter = {}) {
          const data = read()
          return data[name].filter(doc => matchFilter(doc, filter))
        },

        findOne(filter = {}) {
          const data = read()
          return data[name].find(doc => matchFilter(doc, filter)) || null
        },

        insert(document) {
          const data = read()
          const newDoc = {
            _id: generateId(),
            ...document
          }

          data[name].push(newDoc)
          write(data)
          return newDoc
        },

        update(filter, updateFields) {
          const data = read()
          let updatedCount = 0

          data[name] = data[name].map(doc => {
            if (matchFilter(doc, filter)) {
              updatedCount++
              return { ...doc, ...updateFields }
            }
            return doc
          })

          write(data)
          return { updatedCount }
        },

        delete(filter) {
          const data = read()
          const originalLength = data[name].length

          data[name] = data[name].filter(
            doc => !matchFilter(doc, filter)
          )

          write(data)
          return {
            deletedCount: originalLength - data[name].length
          }
        }
      }
    }
  }
}

module.exports = db