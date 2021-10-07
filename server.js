require( "dotenv" ).config()

const cors = require( "cors" )
const express = require( "express" )
const cookies = require( "cookie-parser" )

const port = 8000
const app = express()

require( "./server/config/mongoose.config" )

app.use( express.json() )
app.use( express.urlencoded( { extended: true } ) )
app.use( cookies() )

app.use( cors( {

    //accept login credentials coming from frontend origin
    credentials:true,
    origin:"http://localhost:3000"

} ) )

require( "./server/routes/user.routes" )( app )
require( "./server/routes/question.routes" )( app )
require( "./server/routes/answer.routes" )( app )

app.listen( port, () => console.log( `Listening on port:${ port }` ) )