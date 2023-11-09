import { gameValidation, voteValidation } from "../schemas/schemas.js"

function validateGame(req, res, next){
    const { body } = req
    gameValidation.validate(body)
        .then(function(){
            next()
        })
        .catch(function(err){
            res.status(400).json({ msg: err.message })
        })
}


function validateVote(req, res, next){
    const { body } = req
    voteValidation.validate(body)
        .then(function(){
            next()
        })
        .catch(function(err){
            res.status(400).json({ msg: err.message })
        })
}

export default{
    validateGame,
    validateVote
}