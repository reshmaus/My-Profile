//Boilerplate
// Let's import the dotenv package,configure it so we can use the variables.

require("dotenv").config();
//Now we need to import sequelize

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '0c36509e3fc44b3fa1802e6ee41b95ee',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

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
            let { profileId } = req.params 
             rollbar.info("It's sending all the Info from DB"); 
            sequelize.query(`SELECT pro.first_name, pro.last_name, pro.profile_title, pro.address, abo.description, soc.url, soc.mode 
            FROM profile AS pro, about_me AS abo, social_platform as soc    
            WHERE   pro.profile_id = ${profileId} AND abo.profile_id = ${profileId} AND soc.profile_id = ${profileId}`)
            .then(dbRes => {
                    let profileObj
                    const responseObj = dbRes[0];
                    const responseObjFirst = responseObj[0];
                    let description = [];
                    let socilaPltformArry = [];
                    let socilaPltformObjArry = [];
 
                    for(let i=0; i < responseObj.length; i++){  
                        if(!description.includes(responseObj[i].description)){
                            description.push(responseObj[i].description)
                        }

                        if(!socilaPltformArry.includes(responseObj[i].mode)){
                            socilaPltformArry.push(responseObj[i].mode)
                            socilaPltformObjArry.push({mode: responseObj[i].mode, url: responseObj[i].url })
                        } 
                    }


                    profileObj = {
                        name: `${responseObjFirst.first_name} ${responseObjFirst.last_name}`,
                        profileTitle: responseObjFirst.profile_title,
                        address: responseObjFirst.address,
                        aboutMe: description,
                        socialPlatforms: socilaPltformObjArry
                    }

                    res.status(200).send(profileObj)
                }) 

        } catch (error) {
            console.log('Error Getting ProfileDetails', error)
             rollbar.error("Error getting all the ProfileDetails");
            res.sendStatus(400)
        }
    },

    getPaintings:(req, res) => {
        try {
            let { profileId } = req.params

            sequelize.query(`SELECT * FROM paintings where profile_id=${profileId} ORDER BY id ASC`)
            .then(dbRes => res.status(200).send(dbRes[0])) 
            rollbar.log("sending back all paintings");
        } catch (error) {
            console.log('Error Getting Paintings', error)
             rollbar.error("Error getting all the Paintings");
            res.sendStatus(400)
        }
    },

    addPainting:(req, res) => {
        try { 
            let { profile_id, name, img_url, buy_it_link, price, description } = req.body 

            sequelize.query(`INSERT INTO paintings (profile_id, name, img_url, buy_it_link, price, description)
                VALUES ('${profile_id}', '${name}',  '${img_url}', '${buy_it_link}', '${price}', '${description}');`)
            .then(dbRes => res.status(200).send('New Painitng Added Successfully')) 
            rollbar.info("New Painitng Added Successfully");
        } catch (error) {
            console.log('Error Adding Painting', error)
             rollbar.error("Error adding the Painting");
            res.sendStatus(400)
        }
    },


    updatePainting:(req, res) => {
        try {
            let { id } = req.params
            let { name, img_url, buy_it_link, price, description } = req.body   
            sequelize.query(`UPDATE paintings
                SET name='${name}',
                img_url='${img_url}',
                buy_it_link='${buy_it_link}',
                price='${price}',
                description='${description}'
                WHERE id=${id};`) 
                .then(dbRes => res.status(200).send('Painitng Updated Successfully'))
                .catch(err => console.log(err))  
             rollbar.info("It's updating the Painting in DB");
           
        } catch (error) {
            console.log('ERROR ADDING Painting', error)
             rollbar.error("Error updating the Painting");
            res.sendStatus(400)
        }
    },

    deletePainting: (req, res) => { 
        let { id } = req.params 
        sequelize.query(`delete from paintings where id=${id}`)
            .then(dbRes => res.status(200).send('Painitng Deleted Successfully'))
            .catch(err => console.log(err))  
            rollbar.log("Delete Painting");
    },

    getPaintingById: (req, res) => { 
        let { id } = req.params 
        
        sequelize.query(`SELECT * FROM paintings where id=${id}`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))  
    },
}