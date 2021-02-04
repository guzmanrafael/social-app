const Post = require("../models/post");
const User = require("../models/user");
const { unlink } = require("fs-extra");
const path = require("path");

let postPath;

const postController = {};

postController.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("idUser");
    res.json(posts);
  } catch (err) {
    res.status(400).json({
      ok: false,
      err,
    });
  }
};

postController.createPost = async (req, res) => {
  try {
    console.log(req.body);
    let post = new Post({
      idUser: req.body.idUser,
      description: req.body.description,
      filename: req.file.filename,
      path: "/img/uploads/" + req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });
    postPath = post;

    const saved = await post.save({});
    res.json({
      ok: true,
      saved: saved,
    });
  } catch (err) {
    unlink(path.resolve("./server/libs/public" + postPath.path));
    res.status(400).json({
      oko: false,
      err,
    });
  }
};

postController.editPost = async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;
    console.log(id, body);
    const postDB = await Post.findOne({ _id: id });
    console.log("sigue");
    if (req.file) {
      var post = {
        description: body.description,
        filename: req.file.filename,
        path: "/img/uploads/" + req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
      };
      console.log("sigue 2");
      unlink(path.resolve("./server/libs/public" + postDB.path));
    } else {
      var post = {
        description: body.description,
      };
    }

    console.log("sigue 4");

    const userDb = await User.findOne({ _id: postDB.idUser });
    console.log("sigue 5");

    if (postDB.idUser == userDb.id) {
      await Post.findByIdAndUpdate({ _id: id }, { $set: post }, { new: true });
      res.json({ status: "post updated" });
    } else {
      res.status(400).json({
        ok: false,
        err: "id´s are not equals",
      });
    }
  } catch (err) {
    res.status(400).json({
      ok: false,
      err,
    });
  }
};

postController.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const postDb = await Post.findOne({ _id: id });
    const userDb = await User.findOne({ _id: postDb.idUser });

    if (postDb.idUser == userDb.id) {
      await Post.findByIdAndDelete(id);
      unlink(path.resolve("./server/libs/public" + postDb.path));

      res.json({
        ok: true,
        msg: "post deleted",
      });
    } else {
      res.status(400).json({
        ok: false,
        err: "id´s are not equals",
      });
    }
  } catch (err) {
    res.status(400).json({
      ok: false,
      err,
    });
  }
};

module.exports = postController;
