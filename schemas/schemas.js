import yup from 'yup'
import voteService from '../services/votes.js'

export const voteValidation = yup.object().shape({
    judgeName: yup.string().required(),
    gameName: yup.string().required(),
    art: yup.number().min(1).max(10).required(),
    gameplay: yup.number().min(1).max(10).required(),
    sound: yup.number().min(1).max(10).required(),
    theme: yup.number().min(1).max(10).required(),
}).test('is-unique', 'Hubo un error al subir tu voto', async function(value){
    const { judgeName, gameName } = value
    const result = await voteService.validateVote(judgeName, gameName)
    return !result
})

export const gameValidation = yup.object().shape({
    name: yup.string().min(3).max(50).required(),
    genre: yup.string().required(),
    members: yup.array().of(yup.string()).required(),
    edition: yup.number().min(2012).max(2024).required(),
})
