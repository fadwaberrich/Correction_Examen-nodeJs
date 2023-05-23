const { Abonne } = require("../models/Abonne")
module.exports.check = async(req,res,next)=>{
    const {Nom,Prenom,Age,Telephone,Poids} = req.body
     const findTelphone = await Abonne.find({Telephone:Telephone})
   if(!Nom || !Prenom || !Age || !Telephone|| !Poids){

    res.send({msg:'tous les champs sont obligatoires'})
    return
   }
   if(Age<20 || Age>30){
   res.send({msg:"votre age doit etre entre 20 et 30"})
   return
   }
   if(findTelphone.length>0){
    res.send({msg:"this tlfn already exists"})
    return
   }
  /* if(Telephone.length !=8)
   {
    res.send({msg:"this tlf shoulb be  8"})
    return
   }*/

   next()
}