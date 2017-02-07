"use strict"
//var debug = require('debug')('REM:server');
import http     from 'http'
import path     from 'path'
import socketio from 'socket.io'
import express  from 'express'

import { PORT, MONGOURI } from './config'
import { normalizePort, onError, onListening } from './util'
import applyMiddlewares from './middlewares'
import api from './api'
import mongo from './db'


const app = express()
const port = normalizePort( process.env.PORT || PORT )
const models = mongo( MONGOURI )

app.set( 'port', port )
app.use( express.static( path.join( __dirname, '..', 'public' ) ) )

applyMiddlewares( app )
app.get( '*', (req, res, next) => {
    res.sendFile( path.join( __dirname, '..', 'index.html' ) )
})

const server = http.createServer( app )
const io = new socketio(server)
app.use( '/', api( io, models ) )


server.listen( port )
server.on( 'error', onError( port ) )
server.on( 'listening', onListening( server ) )
