import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

import { connectDb } from "./Db/index.js";
import { server } from './app.js';
connectDb()
    .then(() => {
        const port = process.env.PORT || 3000 ;
        server.listen(port, () => {
            console.log("continue working on port ", port)
        })
    })
    .catch((err) => {
        console.log("error while listening time ", err)
    })
