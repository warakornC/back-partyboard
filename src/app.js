require('dotenv').config();
const express = require('express');
const cors = require('cors')
const limiter = require('./middleware/rate-limit');
const error = require('./middleware/error');
const notFound = require('./middleware/not-found');
const app = express();
const morgan = require('morgan');
const authRouter = require('./routes/auth-routes')


app.use(cors())
app.use(express.json())
app.use(limiter)
app.use(morgan(`dev`))

app.use('/auth',authRouter)

app.use(error)
app.use(notFound)



const PORT = process.env.PORT || 8000
app.listen(PORT,()=> console.log(`${PORT}`))

