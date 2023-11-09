import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db("gamejam")

const judgeCollection = db.collection('Judges')

async function getJudges() {
    
    await client.connect()
    
    return judgeCollection.find().toArray()
}

async function judgeById(id) {
        
    await client.connect()
        
    return judgeCollection.aggregate([
        {
            $match: {
                _id: new ObjectId(id)
            }
        },
        
        {
            $lookup: {
                from: 'Votes',
                localField: 'name',
                foreignField: 'judgeName',
                as: 'voteDetails'
            }
        }
    ]).toArray()
}

export default {
    getJudges,
    judgeById
}

export {
    getJudges,
    judgeById
}