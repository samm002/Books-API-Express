const express = require('express');
const { app, router } = require('./src/routes');

const port = 3000;

app.use(express.json());
app.use('/', router);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server is running at port ${port}`);
});
