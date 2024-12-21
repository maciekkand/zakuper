const url = 'https://todos-nabu.turso.io/v2/pipeline'
const authToken = import.meta.env.VITE_TURSO_AUTH_TOKEN

const headers = {
  Authorization: `Bearer ${authToken}`,
  "Content-Type": "application/json",
}

function query(sql) {
  return fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      requests: [
        { type: "execute", stmt: { sql }},
        { type: "close" },
      ],
    }),
  })
  .then((res) => res.json())
}

export function fetchTodos(bought=false) {
  const sql = `SELECT * FROM todos WHERE bought = ${bought} ORDER BY name ASC`
  return query(sql)
}

export function fetchTodosBoughtQty() {
  const sql = 'SELECT COUNT(*) FROM todos WHERE bought=true'
  return query(sql)
}

export function fetchShop(shop) {
  if (shop) return query(`SELECT * FROM todos WHERE bought = 0 AND shop = "${shop}" ORDER BY name ASC`)
  return query('SELECT * FROM todos WHERE bought = 0 ORDER BY name ASC')
}

export function insertTodo(name, shop='bazar') {
  const sql = `INSERT OR IGNORE INTO todos (name, qty, bought, shop) VALUES ('${name}', 1, false, '${shop}')`
  return query(sql)
}

export function updateAsBoughtTodo(id) {
  const sql = `UPDATE todos SET bought = 1 WHERE id = ${id};`
  return query(sql)
}

export function updateAsNotBoughtTodo(id) {
  const sql = `UPDATE todos SET bought = 0 WHERE id = ${id};`
  return query(sql)
}

export function updateQty(id, qty) {
  const sql = `UPDATE todos SET qty = ${qty} WHERE id = ${id};`
  return query(sql)
}

export function deleteItem(id) {
  const sql = `DELETE FROM todos WHERE id = ${id};`
  return query(sql)
}

export function deleteItemByName(itemName) {
  const sql = `DELETE FROM todos WHERE name = "${itemName}";`

  return query(sql)
}

export function resetTodos() {
  const sql = 'UPDATE todos SET bought = 0;'
  return query(sql)
}

export function dropTable() {
  console.log('dropTable')
  let sql = 'DROP TABLE IF EXISTS todos;'
  return query(sql)
}

export function createTable() {
  console.log('createTable')

  let sql = `CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    qty TEXT,
    bought BOOLEAN,
    shop TEXT
  );`
  return query(sql)
}

export function insertAll() {
  // turso table todos > download csv table > paste below
  console.log('insertAll')

  let sql = `INSERT INTO todos (id, name, qty, bought, shop) VALUES
             ("1","Pomidory","1","0","bazar"),
             ("2","Kartofle Irysy","3","0","bazar"),
             ("3","Jajka","20","0","bazar"),
             ("4","Kiszona kapusta","1","0","bazar"),
             ("5","Japka Ligole","2","0","bazar"),
             ("6","Japka Kobzy","2","0","bazar"),
             ("7","Śmietana 18","1","0","bazar"),
             ("8","Grzyby","1","0","bazar"),
             ("9","Wołowina bez kości","1","0","bazar"),
             ("10","Nóżki wieprzowe","1","0","bazar"),
             ("11","Szponder","1","0","bazar"),
             ("12","Rozbratel","1","0","bazar"),
             ("13","Wątróbki drobiowe","1","0","bazar"),
             ("14","Kiełbasa wieprzowa","1","0","bazar"),
             ("15","Ser z Człuchowa","1","0","bazar"),
             ("16","Sałata","1","0","bazar"),
             ("17","Papier toaletowy","1","0","biedra"),
             ("18","Mleko","1","0","biedra"),
             ("19","Murzynianka","1","0","żant"),
             ("20","Płyn do naczyń","1","0","biedra"),
             ("21","Ręczniki","1","0","biedra"),
             ("22","Baterie","1","0","inny"),
             ("23","Żarówki","1","0","inny"),
             ("24","Papier ścierny","1","0","inny"),
             ("31","Pasztet","1","0","bazar"),
             ("33","Cebula","1","0","inny"),
             ("34","Ryba tilapia","1","0","bazar"),
             ("35","Buraki","1","0","bazar"),
             ("38","Maliniak","1","0","żant"),
             ("39","Kurkuma","1","0","inny"),
             ("40","Imbir","1","0","inny"),
             ("41","Cynamon","1","0","inny"),
             ("42","Kurczak","1","0","bazar"),
             ("43","Serki","1","0","bazar"),
             ("44","Ogórki","1","0","bazar"),
             ("45","Inka","1","0","żant"),
             ("46","Mleko do kawy","1","0","żant"),
             ("47","Kapusta","1","0","bazar"),
             ("48","Flaki","1","0","bazar"),
             ("49","Mięso rosołowe","1","0","bazar"),
             ("50","Woda","1","0","inny"),
             ("52","Włoszczyzna","1","0","bazar"),
             ("53","Por","1","0","bazar"),
             ("54","Pietruszka","1","0","bazar"),
             ("55","Marchew","1","0","bazar"),
             ("56","Gruszki","1","0","bazar"),
             ("57","Morele","1","0","bazar"),
             ("58","Brukselka","1","0","bazar"),
             ("59","Ogórki kiszone","1","0","bazar"),
             ("60","Śliwki","1","0","bazar")
           `


  return query(sql)
}
