
import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
    blog_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    },
     user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

});

export const Like = mongoose.model('Like', likeSchema);
export default Like;