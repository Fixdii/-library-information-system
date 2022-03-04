const db = require("../db");
class UserController {
  async createBook(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","origin, content-type, accept");
    res.set('Access-Control-Allow-Credentials', 'true');
    const {name_book, author, rack_number, src } = req.body;
    const newBook = await db.query(`INSERT INTO book (name_book,author,rack_number, src) VALUES ($1, $2, $3, $4) RETURNING *`,[name_book, author, rack_number, src]);
    res.json(newBook.rows[0]);
  }
  async getBooks(req,res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","origin, content-type, accept");
    const books = await db.query(`SELECT * FROM book`);
    res.json(books.rows);
  }
  async updateBook(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","origin, content-type, accept");
    const { book_code, name_book, author, rack_number, src} = req.body;
    const uodate = await db.query(`UPDATE book SET name_book=$1, author=$2, rack_number=$3, src = $4 WHERE book_code = $5 RETURNING *`,[name_book, author, rack_number, src,book_code]);
    res.json(uodate.rows);
  }
  async deleteBook(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","origin, content-type, accept");
    const id = req.params.id;
    const user = await db.query(`DELETE FROM book WHERE book_code = $1`, [id]);
    res.json(user.rows[0]);
  }
}

module.exports = new UserController();
