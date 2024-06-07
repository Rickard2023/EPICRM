import { Schema } from "mongoose";
import { model } from "mongoose";

const userSchema = new Schema (
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: false
        },
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },               
        dob: {
            type: String,
            required: false
        },
        pfp: {
            type: String,
            required: false
        },
        usertype:{
            type: String,
            required: true
        },
        _clientID: {
            type: String,
            required: false
        }
    },

    {
        collection: "CRMUsers"
    }
)

export default model("User", userSchema);
