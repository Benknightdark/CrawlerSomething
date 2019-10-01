import * as mongoose from "mongoose";


export const dbConnect = async () => {
    const uri: string = "mongodb://root:example@localhost:1769/";
    await mongoose.connect(uri, { useNewUrlParser: true, db: 'News', dbName: 'News' });
    console.log('connect')
    return mongoose;
}