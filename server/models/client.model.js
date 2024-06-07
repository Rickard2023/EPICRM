import { Schema } from "mongoose";
import { model } from "mongoose";

const clientSchema = new Schema (
    {
        _clientID:{
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        }, 
        address: {
            type: String,
            required: true
        }   ,           
        dob: {
            type: String,
            required: false
        },
        fiscalcode:{
            type: String,
            required: true
        },
        phone:{
            type: String,
            required: false
        },
        mobile:{
            type: String,
            required: false
        },
        pfp: {
            type: String,
            required: false
        },
        companyname: {
            type: String,
            required: false
        },
        vatnumber: {
            type: String,
            required: false
        },
        companyaddress:{
            type: String,
            required: false
        },
        businesstype: {
            type: String,
            required: false
        },
        companyphone:{
            type: String,
            required: false
        },
        companymobile:{
            type: String,
            required: false
        },
        servicetype: {
            type: String,
            required: false
        },
        servicestart: {
            type: String,
            required: false
        },
        serviceend: {
            type: String,
            required: false
        },
        serviceseller: {
            type: String,
            required: false
        },
        servicefirstcost: {
            type: String,
            required: false
        },
        serviceyearlycost: {
            type: String,
            required: false
        }
    },

    {
        collection: "CRMClients"
    }
)

export default model("Client", clientSchema);
