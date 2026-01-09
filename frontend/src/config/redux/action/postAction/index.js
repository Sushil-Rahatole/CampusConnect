import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const getAllPosts = createAsyncThunk(
    "post/getAllPosts",
    async(_,thunkAPI)=>{
        try{

            const response = await clientServer.get("/posts");

            return thunkAPI.fulfillWithValue(response.data);

        }catch(e){
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
)

export const createPost = createAsyncThunk(
    "post/createPost",
    async(userData ,thunkAPI)=>{
        const {file,body} = userData;

        try{
            const formData = new FormData();
            formData.append('token',localStorage.getItem('token'));
            formData.append('body',body);
            formData.append('media',file);

            const response = clientServer.post("/post",formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            });

            if(response.status === 200){
                return thunkAPI.fulfillWithValue("Post Uploaded");
            }else{
                return thunkAPI.rejectWithValue("Post not uploaded");
            }
        }catch(e){
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
)

export const deletePost = createAsyncThunk(
    "post/deletePost",
    async(post_id,thunkAPI)=>{
        try{
            const response = await clientServer.delete("/delete_post",{
                data:{
                    token:localStorage.getItem('token'),
                    post_id:post_id.post_id
                }
            });
            return thunkAPI.fulfillWithValue(response.data);
        }catch(e){
            return thunkAPI.rejectWithValue("Something went wrong!!");
        }
    }
)

export const incrementLike = createAsyncThunk(
    "post/incrementLike",
    async(post, thunkAPI)=>{
        try{
            const response = await clientServer.post("/increment_post_like",{
                postId:post.post_id
            });
            return thunkAPI.fulfillWithValue(response.data);

        }catch(e){
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
)

export const getAllComments = createAsyncThunk(
    "post/getAllComments",
    async(postData ,thunkAPI)=>{
        try{
            const response = await clientServer.get("/get_comments",{
                params:{
                    postId: postData.postId
                }
            });

            return thunkAPI.fulfillWithValue({
                comments: response.data,
                postId:postData.postId
            })

        }catch(e){
            return thunkAPI.rejectWithValue("Something went wrong!!");
        }
    }
)

export const postComment = createAsyncThunk(
    "post/postComment",
    async(commentData,thunkAPI)=>{
        try{

            const response = await clientServer.post("/comment",{
                token:localStorage.getItem("token"),
                postId:commentData.postId,
                commentBody :commentData.body
            })

            return thunkAPI.fulfillWithValue(response.data);

        }catch(e){
            return thunkAPI.rejectWithValue("Something went wrong!!");
        }
    }
)