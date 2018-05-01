const path = require('path');
const express = require('express')
const app = express();
require('dotenv').config()

app.use(express.static('public'))

app.get('*', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
})

const port = process.env.PORT

app.listen(port, () => console.log(`Example app listening on port ${port}!`))