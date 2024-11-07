import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { uploadpost, getpost, getallpost, updatepostdescription, updatepost, getuserLikes, deletePost } from "../controllers/post.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
const router = Router()

router.route("/postupload/:userid").post(upload.fields([
    {
        name: "imgfile",
        maxCount: 1
    }
]),verifyJWT,uploadpost)

router.route("/userpost/:userid").get(verifyJWT,getpost)

router.route("/getallpost").get(verifyJWT,getallpost)

router.route("/updatepostdec/:postid").patch(verifyJWT,updatepostdescription)

router.route("/updatepost/:postid").patch(verifyJWT,upload.single("imgfile"),updatepost)

router.route('/userlike/:postid').post(verifyJWT,getuserLikes)

router.route("/delet/:postid").post(verifyJWT,deletePost)

export default router;