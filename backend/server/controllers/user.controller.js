const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs-extra");
const cloudinary = require("cloudinary");

const userController = {};
let userPath;

userController.getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    res.json(user);
  } catch (err) {
    res.status(400).json({
      ok: false,
      err,
    });
  }
};

userController.createUser = async (req, res) => {
  try {
    let body = req.body;
    const userDb = await User.findOne({ email: body.email });

    if (userDb) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "email it´s already create",
        },
      });
    }
    console.log(req.file);
    console.log(req.file.path);
    const result = await cloudinary.v2.uploader.upload(req.file.path);

    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      imageUrl: result.url,
      public_id: result.public_id
    });

    //userPath = user;
    const saved = await user.save({});
    let token = await jwt.sign(
      {
        user: saved,
      },
      process.env.SEED,
      { expiresIn: process.env.CADUCIDAD_TOKEN }
    );
    await fs.unlink(req.file.path);
    res.json({
      ok: true,
      user: saved,
      token,
    });
  } catch (err) {
    //unlink(path.resolve("./server/libs/public" + userPath.path));
    console.log("entra aqui");
    console.log(err);
    res.status(400).json({
      ok: false,
      err,
    });
  }
};

userController.editUser = async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;

    const userDB = await User.findOne({ _id: id });
    if (!userDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Usuario no encontrado",
        },
      });
    }

    if (req.file) {
      var user = {
        name: body.name,
        filename: req.file.filename,
        path: "/img/uploads/" + req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
      };
      unlink(path.resolve("./server/libs/public" + userDB.path));
    } else {
      var user = {
        name: body.name,
      };
    }

    const userUpdate = await User.findByIdAndUpdate(
      { _id: id },
      { $set: user },
      { new: true }
    );
    console.log(userUpdate);
    res.json({
      ok: true,
      user: userUpdate,
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      err,
    });
  }
};

module.exports = userController;
