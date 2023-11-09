import judgeService from "../services/judges.js"

function getJudges(req, res) {
        judgeService.getJudges().then(function (judges) {
                res.status(200).json(judges);
        })
}

function judgeById(req, res) {
        const { idJudge } = req.params;
        judgeService.judgeById(idJudge)
        .then(function (result) {
                res.status(200).json(result);
        })
        .catch(function (error) {
                res.status(404).json({ msg: "No se encontro el juez" });
        })
}

export default {
        getJudges,
        judgeById,
};
