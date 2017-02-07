export default ( mongoose ) => {
    const { Schema } = mongoose

    mongoose.model( 'User', new Schema({
        _id: String,
        name: String,
        rooms: [String]
    }))
    mongoose.model( 'Room', new Schema({
        _id: String,
        name: String,
        users: [String],
        messages: [String]
    }))
    mongoose.model( 'Message', new Schema({
        _id: String,
        time: String,
        room: String,
        user: String,
        message: String
    }))

    return {
        User: mongoose.model('User'),
        Room: mongoose.model('Room'),
        Message: mongoose.model('Message')
    }
}
