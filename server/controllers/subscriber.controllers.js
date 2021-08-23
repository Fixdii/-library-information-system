const db = require("../db");
class SubscriberController {
  async createSubscriber(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","origin, content-type, accept");
    const { full_name, library_card} = req.body;
    const newSubscriber = await db.query(`INSERT INTO subscriber (full_name, library_card) VALUES ($1, $2) RETURNING *`,[full_name, library_card]);
    res.json(newSubscriber.rows[0]);
  }
  async getSubscribers(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","origin, content-type, accept");
    const subscribers = await db.query(`SELECT * FROM subscriber`);
    res.json(subscribers.rows);
  }
  async updateSubscriber(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","origin, content-type, accept");
    const { subscriber_code, full_name, library_card} = req.body;
    const uodate = await db.query(`UPDATE subscriber SET full_name=$1, library_card=$2 WHERE subscriber_code = $3 RETURNING *`,[full_name, library_card, subscriber_code]);
    // const book = await db.query(` select * from book ORDER BY subscriber_code`);
    res.json(uodate.rows);
  }
  async deleteSubscriber(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","origin, content-type, accept");
    const id = req.params.id;
    console.log(id);
    const subscriber = await db.query(`DELETE FROM subscriber WHERE subscriber_code = $1`, [id]);
    res.json(subscriber.rows[0]);
  }
}

module.exports = new SubscriberController();
