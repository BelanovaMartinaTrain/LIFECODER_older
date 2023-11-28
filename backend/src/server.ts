import app from "./app"
import mongoose from "mongoose";
import env from "./util/validateEnv";

const port = env.PORT;
const db : string = env.MONGO_CONNECTION_STRING

mongoose.connect(db)
    .then(() => {
        console.log("Mongoose connected")
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(console.error)

