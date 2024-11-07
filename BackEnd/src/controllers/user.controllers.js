import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken"

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
    // console.log("Generated Access Token:", accessToken);
    // console.log("Generated Refresh Token:", refreshToken);

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }

  } catch (error) {
    throw new ApiError(500, "Something with wrong while generating referesh annd access token")
  }
}

const registerUser = asyncHandler(async (req, res) => {
  //get user deatils from frontend
  const { username, fullname, email, password } = req.body
  //validation is not empty
  if (
    [fullname, email, password, username].some((field) =>
      field?.trim() === "")
  ) {
    throw new ApiError(400, "all fields are required")
  }
  //check if user is existed
  const existedUser = await User.findOne({
    $or: [{ username }, { email }]
  })
  if (existedUser) {
    throw new ApiError(409, "user is existed");
  }
  // console.log(req.files)
  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;
  let coverImageLocalPath;
  if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }
  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar file is required")
  }
  //uploadoncoludinary
  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)
  if (!avatar) {
    throw new ApiError(400, "avatar file is required")
  }
  //add the data of the user on the database
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username,
  })
  const createduser = await User.findById(user._id).select(
    "-password -refreshToken"
  )
  if (!createduser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  return res.status(201).json(
    new ApiResponse(200, createduser, "user registered ")
  )
})

const loginUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "username or email and password is required")
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new ApiError(404, "user does not exist")
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

  const options = {
    httpOnly: true,
    secure: true
  }

  return res.status(200).cookie("accessToken", accessToken, options).cookie("refereshToken", refreshToken, options).json(
    new ApiResponse(200, {
      user: loggedInUser,
      accessToken,
      refreshToken
    }, "User logged in successfully")
  );

})

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1 // this removes the field from document
      }
    },
    {
      new: true
    }
  )

  const options = {
    httpOnly: true,
    secure: true
  }

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))

})

const refereshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request")
  }
  try {
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRSH_TOKEN_SECRET)
    const user = await User.findById(decodedToken?._id)

    if (!user) {
      throw new ApiError(401, "invalid refresh tokenn")
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "refresh token is expired or used")
    }

    const options = {
      httpOnly: true,
      secure: true
    }

    const { accessToken, newrefreshToken } = await generateAccessAndRefereshTokens(user._id)

    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", newrefreshToken, options).json(new ApiResponse(200, { accessToken, newrefreshToken }, "Access token refreshed"))

  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token")
  }
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id)
  const isPosswordCorrect = await user.isPasswordCorrect(oldPassword)
  if (!isPosswordCorrect) {
    throw new ApiError(400, "invalid old password")
  }
  user.password = newPassword
  await user.save({ validateBeforeSave: false })

  return res.status(200).json(new ApiResponse(200, {}, "password changed successfuly"))

})

const getCurrentUserr = asyncHandler(async (req, res) => {
  return res.status(200).json(200, req.user, "Current user fetched successfully")
})

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullname, email } = req.body

  if (!fullname || !email) {
    throw new ApiError(400, "all field are required")
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullname,
        email: email
      }
    },
    { new: true }
  ).select("-password")

  return res.status(200).json(new ApiResponse(200, user, "Account detalis update successfully"))

})

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLoalPath = req.file?.path

  if (!avatarLoalPath) {
    throw new ApiError(400, "Avatar is missing")
  }

  const avatar = await uploadOnCloudinary(avatarLoalPath)

  if (!avatar.url) {
    throw new ApiError(400, "error while uploading on avatar")
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url
      }
    },
    { new: true })
  return res.status(200).json(new ApiResponse(200, user, "avatar is update"))
})

const updateUserCoverImage = asyncHandler(async (req, res) => {
  const coverimgLoalPath = req.file?.path

  if (!coverimgLoalPath) {
    throw new ApiError(400, "cover is missing")
  }

  const cover = await uploadOnCloudinary(coverimgLoalPath)

  if (!cover.url) {
    throw new ApiError(400, "error while uploading on cover")
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        coverImage: cover.url
      }
    },
    { new: true })

  return res.status(200).json(new ApiResponse(200, user, "cover is update"))
})

const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params

  if (!username?.trim()) {
    throw new ApiError(400, "username is missing")
  }

  const Channel = await User.aggregate([
    {
      $match: {
        username: username?.toLowerCase()
      }
    },
    {
      $lookup: {
        from: "follower",
        localField: "_id",
        foreignField: "useraccount",
        as: "follower"
      }
    },
    {
      $lookup: {
        from: "follower", // Corrected from "form" to "from"
        localField: "_id",
        foreignField: "follower",
        as: "following"
      }
    },
    {
      $addFields: {
        followerCount: { $size: "$follower" },
        followingCount: { $size: "$following" },
        isFollowing: {
          $cond: {
            if: { $in: [req.user?._id, "$follower.follower"] },
            then: true,
            else: false // Changed from FileSystemWritableFileStream to false
          }
        }
      }
    },
    {
      $project: {
        fullname: 1,
        username: 1,
        followerCount: 1,
        followingCount: 1,
        isFollowing: 1,
        avatar: 1,
        coverImage: 1,
        email: 1
      }
    }
  ]);

  if (!Channel?.length) {
    throw new ApiError(404, "channel does not exists")
  }

  return res.status(200).json(new ApiResponse(200, Channel[0], "user channel fetched successfully"))

})


export {
  registerUser,
  loginUser,
  logoutUser,
  refereshAccessToken,
  changeCurrentPassword,
  getCurrentUserr,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelProfile
}