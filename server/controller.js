
const {paintings, profileDetails} = require('./data');

module.exports = {

    getProfileDetails:('/api/profileDetails', (req, res) => {
        try {
            res.status(200).send(profileDetails)
            // rollbar.info("It's sending all the Info from DB");
           
        } catch (error) {
            console.log('ERROR GETTING profileDetails', error)
            // rollbar.error("Error getting all the Info");
            res.sendStatus(400)
        }
    }),

    getPaintings:('/api/Paintings', (req, res) => {
        try {
            res.status(200).send(paintings)
            // rollbar.info("It's sending all the Paintings from DB");
           
        } catch (error) {
            console.log('ERROR GETTING Paintings', error)
            // rollbar.error("Error getting all the Paintings");
            res.sendStatus(400)
        }
    })
};