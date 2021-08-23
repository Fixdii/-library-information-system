const express = require('express');
const userRouter = require('./routes/book.routes');
const katalogRouter = require('./routes/katalog.routes');
const deportamentRouter = require('./routes/deportament.routes');
const subscriberRouter = require('./routes/subscriber.routes');
const issuingBooksRouter = require('./routes/issuing_books.routes');
const requestRouter = require('./routes/request.routes');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(
    express.urlencoded({
      extended: true
    })
  )
app.use('/api',userRouter);
app.use('/api',katalogRouter);
app.use('/api',deportamentRouter);
app.use('/api',subscriberRouter);
app.use('/api',issuingBooksRouter);
app.use('/api',requestRouter);

app.get("/", function(request, response){
        response.send("ок");
});

app.listen(PORT,()=>{console.log(`server started on port ${PORT}`);})