//Boilerplate
// Let's import the dotenv package,configure it so we can use the variables.

require("dotenv").config();
//Now we need to import sequelize
const Sequelize = require ("sequelize");
//Destructure the CONNECTION_STRING from our process.env object.
const{CONNECTION_STRING} = process.env;

//Instantiate a sequelize object from the Sequelize class.
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})


const { profileDetails } = require('./data');

let globalId = 10;

module.exports = {

    getProfileDetails: (req, res) => {
        try {
            res.status(200).send(profileDetails)
            // rollbar.info("It's sending all the Info from DB"); 
        } catch (error) {
            console.log('ERROR GETTING profileDetails', error)
            // rollbar.error("Error getting all the Info");
            res.sendStatus(400)
        }
    },

    getPaintings:(req, res) => {
        try {
            sequelize.query(`SELECT * FROM paintings ORDER BY id ASC`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))   
        } catch (error) {
            console.log('ERROR GETTING Paintings', error)
            // rollbar.error("Error getting all the Paintings");
            res.sendStatus(400)
        }
    },

    addPainting:(req, res) => {
        try { 
            let { name, img_url, buy_it_link, price, description } = req.body 

            sequelize.query(`INSERT INTO paintings (name, img_url, buy_it_link, price, description)
                VALUES ('${name}',  '${img_url}', '${buy_it_link}', '${price}', '${description}');`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))   
        } catch (error) {
            console.log('ERROR ADDING Painting', error)
            // rollbar.error("Error getting all the Paintings");
            res.sendStatus(400)
        }
    },


    updatePainting:(req, res) => {
        try {
            let { id } = req.params
            let { name, img_url, buy_it_link, price, description } = req.body  
          //  name, img_url, buy_it_link, price
            sequelize.query(`UPDATE paintings
                SET name='${name}',
                img_url='${img_url}',
                buy_it_link='${buy_it_link}',
                price='${price}',
                description='${description}'
                WHERE id=${id};`) 
                .then(dbRes => res.status(200).send(dbRes[0]))
                .catch(err => console.log(err))  
            // rollbar.info("It's sending all the Paintings from DB");
           
        } catch (error) {
            console.log('ERROR ADDING Painting', error)
            // rollbar.error("Error getting all the Paintings");
            res.sendStatus(400)
        }
    },

    deletePainting: (req, res) => { 
        let { id } = req.params 
        sequelize.query(`delete from paintings where id=${id}`)
            .then(dbRes => res.status(200).send('deleted successfully'))
            .catch(err => console.log(err))  
    },

    getPaintingById: (req, res) => { 
        let { id } = req.params 
        
        sequelize.query(`SELECT * FROM paintings where id=${id}`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))  
    },
}