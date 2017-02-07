import mongoose from 'mongoose'
import stuctModels from './models'

export default ( uri ) => {
    mongoose.connect(uri)
    return stuctModels( mongoose )
}
