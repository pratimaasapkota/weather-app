import express from 'express';

const app=express();

app.use((req,res)=>{
    res.json({message:"This is a server response!"});
});


export default app;