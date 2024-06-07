import Router from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
import express from "express";
import cookieParser from "cookie-parser"


export const userRoute = Router();

let refreshTokens = []

// create new user
userRoute.post("/create", async (req, res, next) => {
   
    try {
        const user = await User.findOne({email: req.body.email});
        if(user){
            return res.sendStatus(400);
        }
        const hashedPassword = await bcrypt.hash(req.body.password,10);
    
        const newUser = await User.create({
            ... req.body,
            password: hashedPassword,
        });

        // token
        const accessToken = pkg.sign({_id: newUser._id}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn:"10s"
        });

        res.send(newUser).status(201);
    }
    catch (err) {
        return res.send("awa");
    }  
});

userRoute.post("/login", async (req,res, next) => {

    const {email, password} = req.body;

    try{

        console.log({email,password});
        if(!email || !password) {
            return res.sendStatus(400)
        }
      //  console.log(req.body);
        const user = await User.findOne({email});
        console.log(user);
        if(!user) res.sendStatus(404);

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(password, user.password, isPasswordValid)

        if(isPasswordValid === false)
            return res.sendStatus(401);

        const token = pkg.sign( {id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30s"});

        // cookie
        const time = 3 * 24 * 60 * 60 * 1000; // 3 days in seconds
        const options = {
            expires: new Date(Date.now() + time),
            httpOnly: true
        };
       
        console.log(options);
        res.status(200).cookie("token",token, options).json({
            success: 'true',
            token,
            user
        });

    //   res.send(token);
    }
    catch(err){
        console.log(err);
    }
    //res.send(crypto.randomBytes(64).toString('hex'));
    /*
    const username = req.body.username;
    const user = {name: username};
    const accessToken = pkg.sign(user,process.env.ACCESS_TOKEN_SECRET);
    res.json({accessToken: accessToken});*/
})


function generateAccessToken(user) {
    return pkg.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "2s"})
}

userRoute.post("/token", (req,res) => {

    const refreshToken = req.body.token
    if(refreshToken == null) 
        return res.sendStatus(401)
    if(!refreshTokens.includes(refreshToken)) 
        return res.sendStatus(403)

    pkg.verify(refreshToken, process.env.ACCESS_TOKEN_REFRESH, (err,user) => {
        if(err) 
         return res.sendStatus(403)
        const accessToken = generateAccessToken({name: user.name})
        res.json({accessToken: accessToken})
    })
})

userRoute.delete("/logout", (req,res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

// get users
userRoute.get("/getall", async (req, res, next) => { 
    try {
        let users = await User.find();
        console.log(users);
        res.send(users);
      } catch (err) {
        res.send(404)
    }
});

// get specific user
userRoute.get("/:userID", async (req, res, next) => {
    try {
      let user = await User.findById(req.params.userID);
      res.send(user);
    } catch (err) {
      next(err);
    }
});

// delete user
userRoute.delete("/delete/:id", async (req, res, next) => {
    try {
      await User.deleteOne({
        _id: req.params.id,
      });
      res.send("L'utente è stato eliminato correttamente").status(204);
    } catch (err) {
      next(err);
    }
});

// delete all users
userRoute.delete("/wipedb", async (req, res, next) => {
    try {
      await User.deleteMany();
      res.send("Gli utenti sono stati eliminati correttamente").status(204);
    } catch (err) {
      next(err);
    }
});

// checkAdmin
userRoute.get("/:userID/isAdmin", async (req, res, next) => {

    try {
      let user = await User.findById(req.params.userID);
      let check = true;
      if(!user || user.usertype !== "admin"){
        check = false;
      }
      res.send(check);
    } catch (err) {
      next(err);
    }
});


export default userRoute;