import mongoose, { model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//User Modell

const userSchema = new Schema(
    {
        username: {
            type: String,
            require: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            require: true,
            trim: true,
        },
        fullname: {
            type: String,
            require: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,  // cloudinary url save her
            require: true,
        },
        coverImage: {
            type: String, // cloudinary url save her
        },
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: "post"
            }
        ],
        password: {
            type: String,
            require: [true, 'Password is required']
        },
        refreshToken: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

//Before we store the data in the database this is the middlewares we create here
//Password convert into the hash and store

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

//Here we compare the user password and database password we get the true and false

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken = function() {
    try {
        const secret = process.env.ACCESS_TOKEN_SECRET || 'defaultAccessTokenSecret';
        //  console.log("Access Token Secret:", secret);
        return jwt.sign(
            {
                _id: this._id,
                email: this.email,
                username: this.username,
                fullName: this.fullName
            },
            // 
            secret,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        );
    } catch (error) {
        console.error("Error generating access token:", error);
        throw new Error("Failed to generate access token");
    }
};

userSchema.methods.generateRefreshToken = function() {
    try {
        const secret = process.env.REFRSH_TOKEN_SECRET || 'defaultRefreshTokenSecret';
        return jwt.sign(
            {
                _id: this._id
            },
            // process.env.REFRESH_TOKEN_SECRET,
            secret,
            {
                expiresIn: process.env.REFRSH_TOKEN_EXPIRY
            }
        );
    } catch (error) {
        console.error("Error generating refresh token:", error);
        throw new Error("Failed to generate refresh token");
    }
};



const User = mongoose.model("user", userSchema)

export {
    User
}