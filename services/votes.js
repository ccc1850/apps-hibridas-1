import { MongoClient } from "mongodb"

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db("gamejam")

const voteCollection = db.collection('Votes')
const gameCollection = db.collection('Games')
const judgeCollection = db.collection('Judges')

async function addVote(vote) {
    await client.connect()

    const newVote = {...vote}
    await voteCollection.insertOne(newVote)

    return newVote
}

async function validateVote(judgeName, gameName) {
    await client.connect()

    const [flagJudge, flagGame, isDuplicate] = await Promise.all([
        judgeCollection.findOne({ name: judgeName }),
        gameCollection.findOne({ name: gameName }),
        voteCollection.findOne({ judgeName, gameName })
    ])

    if (flagJudge === null) {
        return 'El nombre del juez no existe'
    } else if (flagGame === null) {
        return 'El nombre del juego no existe'
    } else if (isDuplicate !== null) {
        return 'Ya has votado por este juego'
    } else {
        return null
    }
}


export default {
    addVote,
    validateVote
}