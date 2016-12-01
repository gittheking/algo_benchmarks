const express = require('express');
const path    = require('path');
const logger  = require('morgan');

const app     = express();
const PORT    = process.env.PORT || 3000;

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server listening on port', PORT));
