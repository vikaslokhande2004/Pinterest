import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

//Post Model 

const postSchema = new Schema(
    {
        imgfile: {
            type: String, // cloudinary url save her
            require:true,
        },
        description: {
            type: String,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "user"
        },
        likes: [{
            type: Schema.Types.ObjectId,
            ref: "user"
        }]
    },
    {
        timestamps:true
    }
)

postSchema.plugin(mongooseAggregatePaginate)

const Post = mongoose.model("post",postSchema)

export {
    Post
}