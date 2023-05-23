const express = require("express");
const router = express.Router();
var{Abonne}=require("../models/Abonne")

const { check }= require("../middleware/check")


router.post("/addAbonnee",check, async function (req, res,next ) {
    try {
      const abonne = await new Abonne(req.body).save();
      res.send({ msg: "abonne created successfully", abonne });
    } catch (error) {
      console.log(error);
    }
  });




router.get("/abonnees", async function (req, res) {
    try {
      const abonnes = await Abonne.find();
      res.send({ msg: "abonnes fetched successfully", abonnes });
    } catch (error) {
      console.log(error);
    }
  });
  router.delete("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const abonne = await Abonne.findByIdAndDelete(id);
      if(!abonne){
          res.send({msg:'abonne not found'})
          return
      }
      res.send({ msg: "abonne deleted successfully", abonne });
    } catch (error) {
      console.log(error);
    }
  });
  router.put("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const abonne = await Abonne.findByIdAndUpdate(id, {
        $set: { Nom: req.body.Nom, 
            
          },
      },{new:true});
      res.send({ msg: "abonne upadated successfully", abonne });
    } catch (error) {
      console.log(error);
    }
  });
  router.get("/:nom", async (req, res) => {
    try {
      const nom = req.params.nom;
      const abonne = await Abonne.find({Nom:nom})
      res.send({ msg: "abonne fetched successfully", abonne });
    } catch (error) {
      console.log(error);
    }
  });

  


  module.exports = router;