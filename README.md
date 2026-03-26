# Mini JSON Database (Mongo-like)

Questo progetto è un piccolo database locale ispirato a MongoDB che utilizza un file `.json` come archivio dati e la libreria nativa `fs` di Node.js.

Permette di gestire collezioni e documenti con una sintassi simile a MongoDB.

---

# 📦 Come Funziona

Il database viene inizializzato tramite:

```js
const db = require("./mydb")
const database = db("database.json")
```

---

# 📁 Struttura del File JSON

Esempio di struttura:

```json
{
  "users": [],
  "cars": []
}
```

---

# 📚 Collections

Per accedere a una collection:

```js
const users = database.collection("users")
```

---

# 🔍 Metodi Disponibili

## Document CRUD
- `find(filter)`
- `findOne(filter)`
- `insert(document)`
- `update(filter, updateFields)`
- `updateOne(filter, updateFields)`
- `delete(filter)`
- `deleteOne(filter)`

### Operatori supportati
- `$gt` → maggiore di
- `$lt` → minore di
- `$set` → imposta valore
- `$inc` → incrementa valore

Esempio:

```js
users.find({ age: { $gt: 18 } })
users.update({ name: "Luca" }, { $inc: { age: 1 } })
```

---

# 🚀 Esempio Completo

```js
const users = database.collection("users")

users.insert({ name: "Luca", age: 22 })
users.insert({ name: "Marco", age: 25 })

users.update({ name: "Luca" }, { $inc: { age: 1 } })
users.updateOne({ age: { $gt: 25 } }, { $set: { senior: true } })

console.log(users.find())
```

---

# 📌 Nota Importante

Non è un database production-ready.

Limiti:

- Nessuna gestione avanzata della concorrenza
- Nessuna indicizzazione
- Performance limitate su file grandi
- Progetto didattico per comprendere i concetti base di un database documentale