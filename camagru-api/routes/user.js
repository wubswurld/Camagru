const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
var nodemailer = require("nodemailer");
var crypto = require("crypto");
var Token = require("../models/Token");

const User = require("../models/User");

router.post("/Forgot", function(req, res, next) {});

router.post("/confirm", function(req, res, next) {
  // Find a matching token
  //   var token = req.body;
  //   const email = req.body.email;
  Token.findOne({ token: req.body.token }, function(err, token) {
    if (err) {
      return res.status(404).send();
    }
    if (!token)
      return res.status(400).send({
        type: "not-verified",
        msg: "We were unable to find a valid token. Your token my have expired."
      });
    // else return res.send("token found");
    // console.log(token._userId, req.body.email);
    User.findOne({ _id: token._userId }, function(err, user) {
      //   console.log(user.verified + user.email);
      if (!user)
        return res
          .status(400)
          .send({ msg: "We were unable to find a user for this token." });
      //   else res.send("found");
      if (user.verified)
        return res.status(400).send({
          type: "already-verified",
          msg: "This user has already been verified."
        });
      // Verify and save the user
      user.verified = true;
      user.save(function(err) {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
        return res
          .status(200)
          .send("The account has been verified. Please log in.");
      });
      //   res.send("user found");
    });
  });
});

router.post("/register", function(req, res) {
  //goes through request body and checks if each field is valid, if so we set a variable to true
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //checks db for user with the same email address
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({
        email: "Email already exists"
      });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        verified: false,
        avatar
      });
      //hash the password using bcrypt
      bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error("There was an error", err);
        else {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.error("There was an error", err);
            else {
              newUser.password = hash;
              // if brcypt returns successful, save the hashed password and the user in the db, the user model has a id, name, email, password, avatar and dateh
              newUser.save().then(user => {
                console.log("user" + user);
                // res.json(user)
                //payload is an object representing json value, which has id, name and avatar
                // const payload = {
                //   id: user.id,
                //   name: user.name,
                //   avatar: user.avatar
                // };
                var token = new Token({
                  _userId: user._id,
                  token: crypto.randomBytes(16).toString("hex")
                });
                // console.log(token);
                token.save(function(err) {
                  if (err) {
                    return res.status(500).send({ msg: err.message });
                  }
                  // Send the email
                  var transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    auth: {
                      user: "squawfreeskier@gmail.com",
                      pass: "Treetops414!"
                    }
                  });
                  var mailOptions = {
                    from: "no-reply@yourwebapplication.com",
                    to: user.email,
                    subject: "Account Verification Token",
                    text:
                      "Hello,\n\n" +
                      "Please verify your account by clicking the link: \nhttp://localhost:" +
                      "3000" +
                      "/confirm/" +
                      token.token +
                      ".\n"
                  };
                  transporter.sendMail(mailOptions, function(err) {
                    if (err) {
                      return res.status(500).send({ msg: err.message });
                    }
                    res
                      .status(200)
                      .send(
                        "A verification email has been sent to " +
                          user.email +
                          "."
                      );
                  });
                });
                //pass payload into our sign function with user info stored
                // jwt.sign(
                //   payload,
                //   "secret",
                //   {
                //     expiresIn: 2400
                //   },
                //   (err, token) => {
                //     if (err) console.error("There is some error in token", err);
                //     else {
                //       //return token and set success to true
                //         res.json({
                //       success: true,
                //       token: `Bearer ${token}`
                //         });
                //     }
                //   }
                // );
              });
            }
          });
        }
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    if (user.verified === false)
      return res.status(401).send({
        type: "not-verified",
        msg: "Your account has not been verified."
      });
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };
        jwt.sign(
          payload,
          "secret",
          {
            expiresIn: 3600
          },
          (err, token) => {
            if (err) console.error("There is some error in token", err);
            else {
              res.json({
                success: true,
                token: `Bearer ${token}`
              });
            }
          }
        );
      } else {
        errors.password = "Incorrect Password";
        return res.status(400).json(errors);
      }
    });
  });
});

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
