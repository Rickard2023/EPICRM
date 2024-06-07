import Router from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
import express from "express";
import cookieParser from "cookie-parser"
import Alerts from "../models/alert.model.js"

export const alertRoute = Router();

// create alert from user
alertRoute.post("/:userID/create", async (req, res, next) => {
   
    try {

        const newAlert = await Alerts.create({
            ... req.body,
        });

    
        res.send(newAlert).status(201);
    }
    catch (err) {
        return res.send("awa");
    }  
});

// get alerts
alertRoute.get("/getall", async (req, res, next) => {
    try {
      let alerts = await Alerts.find();
      let users = [];
      let c = 0;
      for(let a of alerts){
        let user = await User.findById(a._userID);
        if(user){
            users.push(user);
            c++;
        }
      }

    const result = {alerts: alerts, users: users, count: c};

      res.send(result);
    //  console.log(alerts);
    //  res.send(alerts);
    } catch (err) {
      next(err);
    }
});

// get client from alert
alertRoute.get("/:alertID/getclient", async (req, res, next) => {
    try {
      let alert = await Alerts.findById(req.params.alertID);
      if(!alert){
        return res.sendStatus(404); // if no user, return
      }

      let user = await User.findById(alert._userID);
      if(!user){
        return res.sendStatus(404); // if no user, return
      }

      res.send(user);
    } catch (err) {
      next(err);
    }
});

// get specific alert 
alertRoute.get("/:alertID/", async (req, res, next) => {
  try {

    let alert = await Alerts.findById(req.params.alertID);
    console.log(req.params.alertID);
    if(!alert){
      return res.sendStatus(404); // if no user, return
    }

    res.send(alert);
  } catch (err) {
    next(err);
  }
});

alertRoute.put("/:alertID/:par/:val", async(req,res,next) => {
  
  const id = req.params.alertID;
  let alert = await Alerts.findById(id);
  console.log(id, req.params.par, req.params.val )
  if(!alert) return res.status(404).send("alert not found");

  try {
    const par = req.params.par;
    const val = req.params.val;
    alert = await Alerts.findByIdAndUpdate(id, {
        [par]: val,
        status: par == 'appointment' ? "scheduled" : alert.status,
        report: par == 'appointment' ? req.body.report : ""
      },
      {new: true}
    )
    res.send(alert);
  }
  catch(err){
    res.status(404).send(err);
  }
}) ;

alertRoute.patch("/:alertID/set/completed", async(req,res,next) => {
  
  const id = req.params.alertID;
  console.log(id);
  let alert = await Alerts.findById(id);
  console.log(alert);
  if(!alert) return res.status(404).send("alert not found");

  try {
    alert = await Alerts.findByIdAndUpdate(id, {
        status: "completed"
      },
      {new: true}
    )
    res.send(alert);
  }
  catch(err){
    res.status(404).send(err);
  }
}) ; 

// delete all users
alertRoute.delete("/wipedb", async (req, res, next) => {
  try {
    await Alerts.deleteMany();
    res.send("Gli alerts sono stati eliminati correttamente").status(204);
  } catch (err) {
    next(err);
  }
});