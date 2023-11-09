import express from 'express'
import gamesController from '../controllers/games.js'
import judgeController from '../controllers/judges.js'
import voteController from '../controllers/votes.js'
import midware from '../middlewares/validations.js'

const route = express.Router()


/* GAMES ENDPOINTS */
route.get('/games/:idGame', gamesController.gameById)
route.get('/games/edition/:edition', gamesController.gamesByEdition)
route.get('/games/edition/:edition/:genre', gamesController.gamesByEdition)

/* JUDGE ENDPOINTS */
route.get('/judges', judgeController.getJudges)
route.get('/judges/:idJudge', judgeController.judgeById)

/* VOTES ENDPOINTS */
route.post('/votes', [midware.validateVote], voteController.addVote)

/* GAMES CRUD */
route.route('/games')
    .get(gamesController.getGames)
    .post([midware.validateGame], gamesController.addGame)

route.route('/games/:idGame')
    .delete(gamesController.deleteGame)
    .patch(gamesController.editGame)

export default route
