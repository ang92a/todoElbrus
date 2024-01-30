const express = require('express');
const app = express();
const path = require('path');

const indexRouter = require('./routes/index.routes');

app.use(express.urlencoded({ extended: 'true' }));
app.use(express.json());

app.use('/', indexRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(
    `А мы пашем как буйволы и ныряем как дельфины на ${PORT} порту. Режим: ${process.env.NODE_ENV}`
  );
});
