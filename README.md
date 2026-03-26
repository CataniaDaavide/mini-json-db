# Mini JSON Database (Mongo-like)

Questo progetto è un piccolo database locale ispirato a MongoDB che utilizza un file `.json` come archivio dati e la libreria nativa `fs` di Node.js per leggere e scrivere sul file system.

Permette di gestire collezioni e documenti con una sintassi simile a MongoDB.

---

# 📦 Come Funziona

Il database viene inizializzato tramite:

```js
const db = require("./mydb")
const database = db("database.json")
```

La funzione `db(path)`:

- Crea il file se non esiste
- Legge il contenuto JSON
- Permette di accedere alle collezioni

---

# 📁 Struttura del File JSON

Esempio di struttura:

```json
{
  "users": [],
  "cars": []
}
```

Ogni chiave rappresenta una collection.

---

# 📚 Collections

Per accedere a una collection:

```js
const users = database.collection("users")
```

Se la collection non esiste, viene creata automaticamente come array vuoto.

---

# 🔍 Metodi Disponibili

## `find(filter)`

Restituisce tutti i documenti che matchano il filtro.

```js
users.find({ name: "Luca" })
```

Esempio risultato:

```json
[
  {
    "_id": "abc123",
    "name": "Luca",
    "age": 22
  }
]
```

---

## `insert(document)`

Inserisce un nuovo documento nella collection.

```js
users.insert({ name: "Marco", age: 25 })
```

Ogni documento riceve automaticamente un campo `_id`.

---

## `update(filter, updateFields)`

Aggiorna tutti i documenti che rispettano il filtro.

```js
users.update(
  { name: "Luca" },
  { age: 23 }
)
```

---

## `delete(filter)`

Elimina tutti i documenti che matchano il filtro.

```js
users.delete({ name: "Marco" })
```

---

# 🧠 Struttura Interna

Il database funziona così:

- `read()` → legge il file JSON
- `write(data)` → riscrive il file JSON aggiornato
- Ogni operazione (`insert`, `update`, `delete`) legge e poi salva il file

---

# ⚙️ Possibili Estensioni

Il progetto può essere migliorato aggiungendo:

- `findOne()`
- `updateOne()`
- `deleteOne()`
- Supporto operatori Mongo come:
  - `$gt`
  - `$lt`
  - `$set`
  - `$inc`
- Cache in memoria per migliorare le performance
- Gestione concorrenza scritture

Esempio futuro:

```js
users.find({ age: { $gt: 18 } })

users.update(
  { name: "Luca" },
  { $inc: { age: 1 } }
)
```

---

# 🎯 Obiettivo del Progetto

Questo progetto serve per:

- Capire come funziona un database NoSQL
- Comprendere la gestione dei file con `fs`
- Simulare il comportamento base di MongoDB
- Costruire un layer di astrazione sopra un file JSON

---

# 🚀 Esempio Completo

```js
const db = require("./mydb")

const database = db("database.json")
const users = database.collection("users")

users.insert({ name: "Luca", age: 22 })
users.insert({ name: "Marco", age: 25 })

console.log(users.find({ name: "Luca" }))

users.update({ name: "Luca" }, { age: 23 })

users.delete({ name: "Marco" })
```

---

# 📌 Nota Importante

Questo non è un database production-ready.

Limiti:

- Nessuna gestione delle race condition
- Nessun sistema di lock
- Performance limitate su file grandi
- Nessuna indicizzazione

È un progetto didattico per comprendere i concetti base di un database documentale.

---