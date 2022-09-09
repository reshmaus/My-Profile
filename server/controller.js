
const {paintings, profileDetails, addPainting } = require('./data');

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
            res.status(200).send(paintings)
            // rollbar.info("It's sending all the Paintings from DB");
           
        } catch (error) {
            console.log('ERROR GETTING Paintings', error)
            // rollbar.error("Error getting all the Paintings");
            res.sendStatus(400)
        }
    },

    addPainting:(req, res) => {
        try {
            console.log("Post---", req.body);
            let { name, imgUrl, buyItLink, price, description } = req.body 
            paintings.push({ id:globalId++, name, imgUrl, buyItLink, price, description});
            res.status(200).send("Painting successfully added.")
            // rollbar.info("It's sending all the Paintings from DB");
           
        } catch (error) {
            console.log('ERROR ADDING Painting', error)
            // rollbar.error("Error getting all the Paintings");
            res.sendStatus(400)
        }
    },


    updatePainting:(req, res) => {
        try {
            let { id } = req.params
            let { name, imgUrl, buyItLink, price, description } = req.body  
            
            let index = paintings.findIndex(elem => elem.id === +id) 
    
            if(index === -1){
                res.status(400).send("Wrong input, No data match to update");
            } else {
                paintings[index] = { id: +id, name, imgUrl, buyItLink, price, description};  
                res.status(200).send("Painting updated successfully");
            }
            // rollbar.info("It's sending all the Paintings from DB");
           
        } catch (error) {
            console.log('ERROR ADDING Painting', error)
            // rollbar.error("Error getting all the Paintings");
            res.sendStatus(400)
        }
    },

    deletePainting: (req, res) => { 
        let { id } = req.params 
        
        let index = paintings.findIndex(elem => elem.id === +id);
        if(index === -1){
            res.status(400).send("Wrong input, No data match to delete");
        } else {
            let returnVal = paintings[index].name;
            paintings.splice(index, 1);   
            res.status(200).send(`${returnVal} - deleted successfully`);
        }  
    },

    getPaintingById: (req, res) => { 
        let { id } = req.params 
        
        let index = paintings.findIndex(elem => elem.id === +id);
        if(index === -1){
            res.status(400).send("Wrong input, No painting found");
        } else { 
            res.status(200).send(paintings[index]);
        }  
    },
}