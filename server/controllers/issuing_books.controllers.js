const db = require('../db');

class issuingBooksController{
    async createissuingBooks(req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers","origin, content-type, accept");
        const { subscriber_code, book_code_branches, pickup_date,return_date} = req.body;
        const newIssuingBooks = await db.query(`INSERT INTO issuing_books (subscriber_code, book_code_branches, pickup_date, return_date) VALUES ($1, $2, $3, $4) RETURNING *`,[subscriber_code, book_code_branches, pickup_date, return_date]);
        res.json(newIssuingBooks.rows[0]);
      }
      async getissuingBooks(req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers","origin, content-type, accept");
        const issuingBooks = await db.query(`SELECT * FROM issuing_books`);
        res.json(issuingBooks.rows);
      }
      async updateissuingBooks(req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers","origin, content-type, accept");
        const { issue_code, subscriber_code, book_code_branches, pickup_date,return_date} = req.body;
        const uodate = await db.query(`UPDATE issuing_books SET subscriber_code=$1, book_code_branches=$2, pickup_date=$3, return_date=$4 WHERE issue_code = $5 RETURNING *`,[subscriber_code, book_code_branches, pickup_date,return_date, issue_code]);
        // const book = await db.query(` select * from book ORDER BY book_code_branches`);
        res.json(uodate.rows);
      }
      async deleteissuingBooks(req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers","origin, content-type, accept");
        const id = req.params.id;
        console.log(id);
        const issuingBooks = await db.query(`DELETE FROM issuing_books WHERE issue_code = $1`, [id]);
        res.json(issuingBooks.rows[0]);
      }
}

module.exports = new issuingBooksController();