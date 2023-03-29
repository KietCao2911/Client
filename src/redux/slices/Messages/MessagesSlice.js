import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import * as MessageAPI from './MessagesAPI'
export const fetchGetMessages = createAsyncThunk("Messages/fetchGetMessages",async()=>
{
    const res = await MessageAPI.fetchGetMessages();
    return res; 
})

const MessageSlice =createSlice({
    initialState:{
        Messages:[]
    },
    name:"Message",
    extraReducers:builder=>
    {
        builder.addCase(fetchGetMessages.fulfilled,(state,action)=>
        {
            state.Messages = action.payload
        })
    }
})

export default MessageSlice