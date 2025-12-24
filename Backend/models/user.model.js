import mongoose from "mongoose";
const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        // validate:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please fill a valid email address"],
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    photo:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }

    },
    education:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    password:{
        type:String,
        selecct:false,
        required:true
    },
    
    createdAt:{
        type:Date,
        default:Date.now
    },
    token:{
        type:String
    }

});
export const User = mongoose.model('User',userSchema);
export default User;