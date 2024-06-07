import { Schema } from "mongoose";
import { model } from "mongoose";

const alertSchema = new Schema (
    {
        message:{
            type: String,
            required: true
        },       
        _userID:{
            type: String,
            required: false
        },
        _agentID:{
            type: String,
            required: false
        } , 
        firstname: {
            type: String,
            required: false
        }  ,
        lastname: {
            type: String,
            required: false
        },
        appointment: {
            type: String,
            required: false
        },
        status: {
            type: String,
            required: false
        } ,
        report: {
            type: String,
            required: false
        }
    },

    {
        collection: "CRMAlerts"
    }
)

export default model("Alerts", alertSchema);
