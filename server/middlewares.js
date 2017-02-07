import session      from 'express-session'
import favicon      from 'serve-favicon'
import logger       from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser   from 'body-parser'
import compression  from 'compression'

export default ( app ) => {

    /*app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'jade')*/
    app.use( logger('dev') )
    app.use( session( {
        secret: 'secret',
        cookie: {},
        resave: true,
        saveUninitialized: true
    }))
    app.use( bodyParser.json() )
    app.use( bodyParser.urlencoded( { extended: false } ) )
    app.use( cookieParser() )
    app.use( compression({}) )

/*
    app.use( (req, res, next) => {
        let err = new Error('Not Found')
        err.status = 404
        next( err )
    })
    if ( app.get( 'env' ) === 'development' ) {
        app.use( ( err, req, res, next) => {
            res.status( err.status || 500 )
            res.render( 'error', {
                message:    err.message,
                error:      err
            })
        })
    }
    app.use( ( err, req, res, next) => {
        res.status( err.status || 500 )
        res.render( 'error', {
            message:    err.message,
            error:      {}
        })
    })*/
}
