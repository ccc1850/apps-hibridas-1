import voteService from '../services/votes.js'

function addVote(req, res) {
    const newVote = req.body;
    voteService.addVote(newVote)
        .then(function (newVote) {
            res.status(201).json(newVote);
        })
}

export default {
    addVote
}