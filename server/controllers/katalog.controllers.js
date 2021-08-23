const db = require('../db');

class KatalogController{
    async createKatalog(req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers","origin, content-type, accept");
        const { book_code, department_code, inventory_number,rack_number} = req.body;
        const newKatalog = await db.query(`INSERT INTO katalog (book_code, department_code, inventory_number, rack_number) VALUES ($1, $2, $3, $4) RETURNING *`,[book_code, department_code, inventory_number, rack_number]);
        res.json(newKatalog.rows[0]);
      }
      async getKatalogs(req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers","origin, content-type, accept");
        const katalogs = await db.query(`SELECT * FROM katalog`);
        res.json(katalogs.rows);
      }
      async updateKatalog(req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers","origin, content-type, accept");
        const { book_code_branches, book_code, department_code, inventory_number,rack_number} = req.body;
        const uodate = await db.query(`UPDATE katalog SET book_code=$1, department_code=$2, inventory_number=$3, rack_number=$4 WHERE book_code_branches = $5 RETURNING *`,[book_code, department_code, inventory_number,rack_number, book_code_branches]);
        // const book = await db.query(` select * from book ORDER BY department_code`);
        res.json(uodate.rows);
      }
      async deleteKatalog(req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers","origin, content-type, accept");
        const id = req.params.id;
        console.log(id);
        const katalogs = await db.query(`DELETE FROM katalog WHERE book_code_branches = $1`, [id]);
        res.json(katalogs.rows[0]);
      }
}

module.exports = new KatalogController();