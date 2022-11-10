const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.set('port', PORT);

const server = app.listen(app.get('port'), () => {
    console.log('Listening on port ', server.address().port);
});
