const mongoose = require('mongoose');
const db_name = "db_fin"

mongoose.connect('mongodb://localhost/db_fin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Established a connection to the database', db_name))
    .catch(err => console.log('Something went wrong when connecting to the database ', err));