const db = require("../db");
class Requests{
  async getBooksToBranches(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","origin, content-type, accept");
    const booksToBranches = await db.query(`
    SELECT public.branch.department_name, public.book.name_book 
    FROM public.book join public.katalog ON public.book.book_code = public.katalog.book_code
    join public.branch ON public.branch.department_code = public.katalog.department_code
    `);
    res.json(booksToBranches.rows);
  }
  async getSubscribersBooks(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","origin, content-type, accept");
    const subscribersBooks = await db.query(`
    SELECT public.subscriber.full_name, public.book.name_book, public.issuing_books.pickup_date, public.issuing_books.return_date
    FROM public.book join public.katalog ON public.book.book_code = public.katalog.book_code
    join public.issuing_books ON public.katalog.book_code_branches = public.issuing_books.book_code_branches
    join public.subscriber ON  public.subscriber.subscriber_code = public.issuing_books.subscriber_code
    `);
    res.json(subscribersBooks.rows);
  }
  async getReturnDateOfBooks(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","origin, content-type, accept");
    const returnDateOfBooks = await db.query(`
    SELECT public.subscriber.full_name, public.book.name_book, public.issuing_books.return_date
    FROM public.book join public.katalog ON public.book.book_code = public.katalog.book_code
    join public.issuing_books ON public.katalog.book_code_branches = public.issuing_books.book_code_branches
    join public.subscriber ON  public.subscriber.subscriber_code = public.issuing_books.subscriber_code
    `);
    res.json(returnDateOfBooks.rows);
  }
  
}

module.exports = new Requests();
