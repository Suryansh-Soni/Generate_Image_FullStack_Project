import mongoose from "mongoose";
const PostSchema=new mongoose.Schema({
    name:{
        required:true,
        type:String,
    },
    prompt:{
        required:true,
        type:String,
    },
    photo:{
        required:true,
        type:String,
    },
})

const Post=mongoose.model("Post",PostSchema);
export default Post;