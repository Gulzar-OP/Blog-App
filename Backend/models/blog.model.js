import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    
    blogImage:{
        public_id:{
            type:String,
            // required:true
        },
        url:{
            type:String,
            // required:true
        }
    },
    category:{
        type:String,
        required:true
    },
    about:{
        type:String,
    },

    writerName:{
        type:String,
        // required:true
    },
    writerPhoto:{
        type:String,
        // required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        // required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    like:{
        type:Number,
        default:0,
        
    }
    

});
export const Blog = mongoose.model('Blog',blogSchema);
export default Blog;