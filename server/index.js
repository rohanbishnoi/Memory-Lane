const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const postRouter = require('./routes/posts');

require('dotenv').config();

const PORT = process.env.PORT || 5000;


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`server is running on port ${PORT}`)))
    .catch((error) => console.log(error.message));

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully ");
});

app.use('/posts', postRouter);


// app.listen(PORT, () => {
//     console.log(`server in running on port ${PORT}`);
// });

mongoose.set('useFindAndModify', false);