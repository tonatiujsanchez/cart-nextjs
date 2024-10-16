import mongoose from 'mongoose'



/*
CONNECTION STATES:
    0 = disconnected
    1 = connected
    2 = connecting
    3 = disconnecting
*/
const stateConecction = {
    inConected: 0
}


export const connectDB = async() => {

    if( !process.env.MONGO_URL ){
        throw new Error('Variable de entorno MONGO_URL no esta definida')
    }

    if( stateConecction.inConected === 1 ){
        return
    }

    if( mongoose.connections.length > 0 ){
        
        stateConecction.inConected = mongoose.connections[0].readyState

        if( stateConecction.inConected === 1 ){
            return
        }

        await mongoose.disconnect()
    }


    await mongoose.connect( process.env.MONGO_URL )
    stateConecction.inConected = 1
    console.log('Conexión  a la DB exitosa ✅')
}