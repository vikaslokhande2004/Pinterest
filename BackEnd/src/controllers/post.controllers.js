import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const uploadpost = asyncHandler(async (req, res) => {
  const { userid } = req.params;
  const { description } = req.body;
  //taking the user form the params the check the userid
  if (!userid) {
    throw new ApiError(400, "user is missing");
  }
  // finding the user from the database
  const user = await User.findOne({ _id: userid });
  if (!user) {
    throw new ApiError(400, "User is misssing");
  }
  if (!description || description.trim() === "") {
    throw new ApiError(400, "Description is required");
  }
  //there we are finding the user form the database using params
  const postLocalPath = req.files?.imgfile?.[0]?.path;
  // console.log(postLocalPath)
  if (!postLocalPath) {
    throw new ApiError(400, "post file is required");
  }
  //upload the file on the cloudinary and geting the link for the cloudinary
  const uploadResult = await uploadOnCloudinary(postLocalPath);
  if (!uploadResult || !uploadResult.secure_url) {
    throw new ApiError(500, "Failed to upload post file");
  }
  //push the data in the database and the this data create in the database
  const post = await Post.create({
    imgfile: uploadResult.url,
    description,
    owner: user.id,
    likes: [],
  });
  //call the data from the database
  const createpost = await Post.findById(post.id);
  if (!createpost) {
    throw new ApiError(500, "Something went wrong while posting");
  }
  //return the data and the send the res
  return res
    .status(201)
    .json(new ApiResponse(200, createpost, "Post registered successfully"));
});

const getpost = asyncHandler(async (req, res) => {
  const userid = req.params.userid;

  if (!userid) {
    throw new ApiError(400, "Not get the userid");
  }
  //get the user post from the database
  const posts = await Post.find({ owner: userid }).populate("owner").exec();

  if (posts.length === 0) {
    console.log("No posts found for this author");
    return [];
  }

  return res.status(201).json(new ApiResponse(200, posts, "user post"));
});

const getallpost = asyncHandler(async (req, res) => {
  const post = await Post.find({});
  //get all post from the database
  if (!post) {
    throw new ApiError(400, "post not get from the database");
  }
  if (post.length === 0) {
    throw new ApiError(400, "no post in the database");
  }

  return res.status(201).json(new ApiResponse(200, post, "all user posts"));
});

const updatepostdescription = asyncHandler(async (req, res) => {
  const postid = req.params.postid;
  const description = req.body;

  if (!postid) {
    throw new ApiError(400, "not get the postid");
  }

  if (!description) {
    throw new ApiError(400, "field are required");
  }

  //update the post description in the database
  const post = await Post.findByIdAndUpdate(
    postid,
    {
      $set: {
        description,
      },
    },
    { new: true }
  );

  return res.status(200).json(new ApiResponse(200, post, "post is update"));
});

const updatepost = asyncHandler(async (req, res) => {
  const postid = req.params.postid;
  const postLoalPath = req.file?.path;

  if (!postid) {
    throw new ApiError(400, "not get the postid");
  }

  if (!postLoalPath) {
    throw new ApiError(400, "post is missing");
  }

  //update the post and upload on cloudinary
  const postimg = await uploadOnCloudinary(postLoalPath);

  if (!postimg.url) {
    throw new ApiError(400, "error while uploading on post");
  }

  const post = await Post.findByIdAndUpdate(
    postid,
    {
      $set: {
        imgfile: postimg.url,
      },
    },
    { new: true }
  );

  return res.status(200).json(new ApiResponse(200, post, "post are update"));
});

const getuserLikes = asyncHandler(async (req, res) => {
  const postid = req.params.postid;

  if (!postid) {
    throw new ApiError(400, "post is missing");
  }

  const post = await Post.findById(postid).populate("owner");

  if (!post) {
    throw new ApiError(400, "post not get form the database");
  }

  //here we add the user id in the database as a like
  post.likes.push(req.user._id);
  await post.save();

  return res.status(200).json(new ApiResponse(200, {}, "likes successfully"));
});

const deletePost = asyncHandler(async (req, res) => {
  const postid = req.params.postid;

  if (!postid) {
    throw new ApiError(400, "can not get the postid");
  }

  //here we delete the post from the database
  const post = await Post.findByIdAndDelete(postid);

  return res.status(200).json(new ApiResponse(200, "post deleted"));
});

export {
  uploadpost,
  getpost,
  getallpost,
  updatepostdescription,
  updatepost,
  getuserLikes,
  deletePost,
};
