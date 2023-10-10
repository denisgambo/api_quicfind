const express = require("express");
const path = require('path');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

const dotenv = require("dotenv").config();

//Definir un port
const port = 3000;

//Connexion à la base de données
const connectDB = require("./config/db");
connectDB();



const cors = require('cors')
const corsOptions = {
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    allowedHeaders: 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
};


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// ...

app.use(cors(corsOptions));

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ...

app.use("/user", require("./routes/user.route"));
app.use("/annonces", require('./routes/annonce.route'))
app.use("/categorie", require('./routes/categorie.route'))
app.use("/pays", require('./routes/pays.route'))
app.use("/messages", require('./routes/message.route'))
app.use("/avis", require('./routes/avi.route'))
app.use("/testmess", require('./routes/testmessage.route'))
app.use("/signaler", require('./routes/signalement.route'))




// ...









//Lancer le serveur
app.listen(port, () => console.log("Le serveur a démarré au port " + port));