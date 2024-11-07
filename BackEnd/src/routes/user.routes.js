import { Router } from "express";
import { 
    changeCurrentPassword, 
    getCurrentUserr, 
    getUserChannelProfile, 
    loginUser, 
    logoutUser, 
    refereshAccessToken, 
    registerUser, 
    updateAccountDetails, 
    updateUserAvatar, 
    updateUserCoverImage } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js"
import {verifyJWT} from "../middlewares/auth.middlewares.js"

const router = Router()

router.route("/register").post(upload.fields([
    {
        name: "avatar",
        maxCount: 1
    },
    {
        name: "coverImage",
        maxCount: 1
    }
]), registerUser)

router.route("/login").post(loginUser)

//secure route
//verifyjwt is the check the user is the login then run this code that way using the verifyjwt middlewares include in the this code.
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refresh-token").post(refereshAccessToken)
router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/current-user").get(verifyJWT,getCurrentUserr)
router.route("/update-account").patch(verifyJWT,updateAccountDetails)

router.route("/avatar-update").patch(verifyJWT,upload.single("avatar"),updateUserAvatar)
router.route("/coverimg-update").patch(verifyJWT,upload.single("coverImage"),updateUserCoverImage)

router.route("/c/:username").get(verifyJWT,getUserChannelProfile)



export default router;