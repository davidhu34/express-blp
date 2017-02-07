import ensureLogin from 'connect-ensure-login'
import { Router } from 'express'

const successLog = ( data ) => {
    console.log( 'on query success:\n', data )
}

export default ( io, models ) => {
    const { User, Room, Message } = models
    const authenticated = ensureLogin.ensureLoggedIn('/login')
    const router = Router()
    router.get( '/yo', (req, res, next) => {
        console.log('yo')
        res.send( 'yo' )
    })

    io.on('connection', ( socket ) => {
    	console.log('connect client')
        socket.on( 'INIT_DATA', ( req ) => {
            console.log('init data req')

            User.find( {}, ( err, users ) => {
                io.emit( 'INIT_USER_DATA', {
                    users
                })
            }).then( successLog )
            Room.find( {}, ( err, rooms ) => {
                io.emit( 'INIT_ROOM_DATA', {
                    rooms
                })
            }).then( successLog )
            Message.find( {}, ( err, messages ) => {
                io.emit( 'INIT_MSG_DATA', {
                    messages
                })
            }).then( successLog )

        })
    })
    return router
}
