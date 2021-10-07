const express = require( "express" )
const cookies = require( "cookie-parser" )

const port = 8000
const app = express()

require( "./server/config/mongoose.config" )

app.use( express.json() )
app.use( express.urlencoded( { extended: true } ) )
app.use( cookies() )

require( "./server/routes/user.routes" )( app )
require( "./server/routes/question.routes" )( app )
require( "./server/routes/answer.routes" )( app )

app.listen( port, () => console.log( `Listening on port:${ port }`) )