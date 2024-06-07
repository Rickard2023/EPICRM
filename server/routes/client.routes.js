import Router from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
import express from "express";
import cookieParser from "cookie-parser"
import Client from "../models/client.model.js"

export const clientRoute = Router();

let refreshTokens = []

clientRoute.post("/create", async (req, res, next) => {
   
    try {
        const user = await User.findOne({_id: req.body._clientID});
        if(!user){
            return res.sendStatus(404); // if no user, return
        }
        const hashedPassword = await bcrypt.hash(req.body.password,10);
    
        const newClient = await Client.create({
            ... req.body,
            password: hashedPassword,
        });

        user._clientID = newClient._id;
        user.save();
        res.send(newClient).status(201);
    }
    catch (err) {
        return res.send("awa");
    }  
});

// get specific user
clientRoute.get("/:clientID", async (req, res, next) => {
    try {
      let client = await Client.findById(req.params.clientID);
      res.send(client);
      console.log(client);
    } catch (err) {
      next(err);
    }
});