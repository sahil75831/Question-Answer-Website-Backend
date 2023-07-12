const express = require("express");
const mongoose = require("mongoose");
const blogUsersModel = require("../models/users");
const PostModel = require("../models/post");
const PostAnswerModel = require("../models/postAnswer");
const router = new express.Router();
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");

const secretKey = "write your own secret key here";

router.post("/register", async (req, res) => {
  try {
    const result = new blogUsersModel(req.body);
    const addResult = await result.save();
    res.status(201).send(addResult);
  } catch (error) {
    res.status(201).send(error);
  }
});
router.post("/login", async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const findDocByEmail = await blogUsersModel.findOne({ email }, { id: 1 });
    const findDocByPassword = await blogUsersModel.findOne(
      { password },
      { id: 1 }
    );

    if (findDocByPassword && findDocByEmail) {
      if (findDocByEmail.id === findDocByPassword.id) {
        console.log("user found");
        jwt.sign(
          { userName, email, id: findDocByEmail.id },
          secretKey,
          {},
          (err, token) => {
            if (err) console.log(err);
            res.cookie("authToken", token).json("ok");

            res.json(token);
          }
        );
      }
    } else {
      console.log("user not found");
    }
  } catch (error) {
    res.status(201).send(error);
  }
});

router.get("/profile", (req, res) => {
  const { authToken } = req.cookies;
  jwt.verify(authToken, secretKey, {}, (err, info) => {
    if (err) console.log(err);

    res.send(info);
  });
});
router.post("/logout", (req, res) => {
  const { authToken } = req.cookies;
  res.cookie("authToken", "").send("cookies cleared");
});
router.post("/createpost", async (req, res) => {
  try {
    const { email, title, summary, content } = req.body;

    const result = new PostModel(req.body);
    const addPost = await result.save();
  } catch (error) {
    console.log(error);
  }
  res.status(201).json(req.body);
});

router.get("/getpost", async (req, res) => {
  try {
    let email;
    const { authToken } = req.cookies;
    jwt.verify(authToken, secretKey, {}, (err, info) => {
      email = info.email;
    });

    const addPost = await PostModel.find({ email });
    res.json(addPost);
  } catch (error) {
    console.log(error);
  }
});

router.get("/allPost", async (req, res) => {
  try {
    const allPost = await PostModel.find();
    res.send(allPost);
  } catch (error) {
    console.log("error");
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const urlParams = req.params;

    const allPost = await PostModel.findById(urlParams.id);

    res.send(allPost);
  } catch (error) {
    console.log("error", error);
  }
});

router.post("/postAnswer/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const { repliedTo, answer, repliedBy } = req.body;

    const updateResult = new PostAnswerModel({ repliedTo, answer, repliedBy });
    const updateResultSave = await updateResult.save();
    res.status(201).send(updateResult);
  } catch (error) {
    console.log("error ", error);
  }
});

router.get("/showPostAnswer/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const findAnswer = await PostAnswerModel.find({ repliedTo: _id });
    const answerOfPost = findAnswer.answer;
    res.status(201).send(findAnswer);
  } catch (error) {
    console.log("err from show post answer ", error);
  }
});

router.post("/showPostAnswerLikeCount/:id", async (req, res) => {
  try {
    const setLikeCount = await PostAnswerModel.findByIdAndUpdate(
      req.params.id,
      { likeCount: 1 }
    );
    console.log(req.body);
    const setLikeCountResult = ++setLikeCount.likeCount;
    const setLikeCountNumber = await PostAnswerModel.findByIdAndUpdate(
      req.params.id,
      { likeCount: setLikeCountResult }
    );
  } catch (error) {
    console.log("like backe ", error);
  }
});

router.delete("/deletepost/:id", async (req, res) => {
  try {
    const postToDelete = await PostModel.findByIdAndDelete(req.params.id);
    res.status(201).send(postToDelete);
  } catch (error) {
    console.log("error from deleppost api ", error);
    res.status(400).send();
  }
});

router.patch("/updatePost/:id", async (req, res) => {
  try {
    const { email, title, summary, content } = req.body;
    const updatePost = await PostModel.findByIdAndUpdate(req.params.id, {
      title,
      summary,
      content,
    });
    res.status(201).send(updatePost);
  } catch (error) {
    console.log("error from patch request backend ", error);
    res.status(400).send();
  }
});

module.exports = router;
