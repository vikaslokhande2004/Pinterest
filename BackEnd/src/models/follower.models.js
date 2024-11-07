import mongoose, {Schema} from "mongoose";

const followerSchema = new Schema({
    follower: {
        type: Schema.Types.ObjectId,  // taking form the user schema
        ref:"User"
    },
    useraccount:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{timeseries: true})

export const Follower = mongoose.model("Follower",followerSchema)