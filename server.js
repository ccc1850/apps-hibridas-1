import express from 'express'
import GamejamRoute from './routes/gamejamRoutes.js'

const app = express()
app.use(express.json()) 

app.use(GamejamRoute)

app.listen(2023, function () {
  console.log("Servidor activo en: http://localhost:2023")
})