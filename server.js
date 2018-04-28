const path = require('path');
const express = require('express')
const app = express();
require('dotenv').config()

app.use(express.static('public'))

app.all('*', (req, res) => {
	res.sendFile('index.html');
})

const port = process.env.PORT

app.listen(port, () => console.log(`Example app listening on port ${port}!`))