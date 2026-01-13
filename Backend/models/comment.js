
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    blog_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    },
     user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text:{
        type: String,
        required: true,
    }

});

export const Comment = mongoose.model('Comment', commentSchema);
export default Comment;