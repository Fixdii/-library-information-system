const db = require("../db");
class UserController {
  async createBook(req, res) {
    console.log(1);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","X-Requested-With, Content-Type, Accept, Origin, Authorization");
    res.set('Access-Control-Allow-Credentials', 'true')
    // res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    const { name_book, author, rack_number } = req.body;
    const newBook = await db.query(`INSERT INTO book (name_book,author,rack_number) VALUES ($1, $2, $3) RETURNING *`,[name_book, author, rack_number]);
    res.json(newBook.rows[0]);
  }
  async getBooks(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","origin, content-type, accept");
    const books = await db.query(`SELECT * FROM book`);
    res.json(books.rows);
  }
  // async getOneBook(req, res){
  //     const id = req.params.id;
  //     console.log(id);
  //     const user = await db.query(`SELECT * FROM book WHERE book_code = $1`,[id]);
  //     res.json(user.rows[0]);
  // }
  async updateBook(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","origin, content-type, accept");
    const { book_code, name_book, author, rack_number } = req.body;
    const uodate = await db.query(`UPDATE book SET name_book=$1, author=$2, rack_number=$3 WHERE book_code = $4 RETURNING *`,[name_book, author, rack_number, book_code]);
    // const book = await db.query(` select * from book ORDER BY book_code`);
    res.json(uodate.rows);
  }
  async deleteBook(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","origin, content-type, accept");
    const id = req.params.id;
    console.log(id);
    const user = await db.query(`DELETE FROM book WHERE book_code = $1`, [id]);
    res.json(user.rows[0]);
  }
}

module.exports = new UserController();
