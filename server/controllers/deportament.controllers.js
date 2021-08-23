const db = require("../db");
class DeportamentController {
  async createDeportament(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","origin, content-type, accept");
    const { department_name, department_address} = req.body;
    const newdepartment = await db.query(`INSERT INTO branch (department_name,department_address) VALUES ($1, $2) RETURNING *`,[department_name, department_address]);
    res.json(newdepartment.rows[0]);
  }
  async getDeportaments(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","origin, content-type, accept");
    const deportaments = await db.query(`SELECT * FROM branch`);
    res.json(deportaments.rows);
  }
  async updateDeportament(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","origin, content-type, accept");
    const { department_code, department_name, department_address} = req.body;
    const uodate = await db.query(`UPDATE branch SET department_name=$1, department_address=$2 WHERE department_code = $3 RETURNING *`,[department_name, department_address, department_code]);
    // const book = await db.query(` select * from book ORDER BY department_code`);
    res.json(uodate.rows);
  }
  async deleteDeportament(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","origin, content-type, accept");
    const id = req.params.id;
    console.log(id);
    const deportament = await db.query(`DELETE FROM branch WHERE department_code = $1`, [id]);
    res.json(deportament.rows[0]);
  }
}

module.exports = new DeportamentController();
