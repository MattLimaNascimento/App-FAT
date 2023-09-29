const express = require('express');
const cors = require('cors'); // Importe o pacote cors


const app = express();
const image = require('./image');

app.use(cors()); 

app.use('/image_upload', image);

const port = +process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`server is running in http://localhost:${port}`);
})