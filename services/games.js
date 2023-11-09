import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db("gamejam")

const gameCollection = db.collection('Games')
const voteCollection = db.collection('Votes')

async function getGames() {

    await client.connect()
    const games = await gameCollection.find().toArray()
    return games
}

async function addGame(game) {
    await client.connect()

    const newGame = {...game}
    await gameCollection.insertOne(newGame)

    return newGame
}

async function deleteGame(id) {
    await client.connect()

    const result = await gameCollection.deleteOne({_id: new ObjectId(id)})

    return result.deletedCount
}

async function editGame(id, data) {
    await client.connect()


    const result = await gameCollection.updateOne({_id: new ObjectId(id)}, {$set: data})
    .then(function (result) {
        if(data.name) {
            const game = gameCollection.findOne({_id: new ObjectId(id)})
            voteCollection.updateMany({gameName: game.name}, {$set: {gameName: data.name}})
            return result.modifiedCount
        }
        return result.modifiedCount
    })
    

}

async function gameById(id) {
  await client.connect()

  const votes = await gameCollection.aggregate([
      {
        $match: {
          _id: new ObjectId(id)
        }
      },
      {
          $lookup: {
            from: "Votes",
            localField: "name",
            foreignField: "gameName",
            as: "voteDetails",
          }
      },
      {
          $addFields: {
            totalVotes: {
              $size: "$voteDetails"
            },
            artAvg: {
              $avg: "$voteDetails.art"
            },
            gameplayAvg: {
              $avg: "$voteDetails.gameplay"
            },
            soundAvg: {
              $avg: "$voteDetails.sound"
            },
            themeAvg: {
              $avg: "$voteDetails.theme"
            },
          }
      }
  ]).toArray()

  return votes
}

async function gamesByEdition(editionYear, genre) {
  await client.connect()

  let params = {edition: editionYear}

  if(genre) {
    params = {edition: editionYear, genre: genre}
  }

  const games = await gameCollection.find(params).toArray()

  return games
}

export default {
    getGames,
    addGame,
    deleteGame,
    editGame,
    gameById,
    gamesByEdition
}