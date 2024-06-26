
const express = require("express");
const authMiddleware = require("../middleware");
const { User,Account } = require("../database");
const zod = require("zod");
const jwt = require('jsonwebtoken');
const userRouter = express.Router();
const {JWT_SECRET} = require("../config");
const updateBody = zod.object({
    firstName : zod.string().optional(),
    lastName : zod.string().optional(),
    password : zod.string().optional()
});
const signupSchema = zod.object({
    username : zod.string().email().min(5).max(30),
    password : zod.string().min(6),
    firstName : zod.string().max(30),
    lastName : zod.string().max(30)
})
const signinSchema = zod.object({
    username : zod.string().email(),
    password : zod.string()
})

userRouter.post('/signup',async (req,res)=>{
    const body = req.body;
    const {success} = signupSchema.safeParse(body);
    if(!success){
        return res.status(403).json({
            msg : "Incorrect inputs"
        })
    }
    const user = await User.findOne({
        username : body.username
    });
    if(user){
        return res.status(403).json({
            msg : "email already taken"
        })
    }
    const cuser = await User.create({
        username : body.username,
        password : body.password,
        firstName : body.firstName,
        lastName : body.lastName
    });
    const userId = cuser._id;
    const bal = 1 + Math.random()*10000;
    await Account.create({
        userId : userId,
        balance : bal
    });
    const token = jwt.sign({userId},JWT_SECRET);
    res.status(200).json({
        msg : "user created successfully",
        token : token
    })

})

userRouter.post('/signin',async (req,res)=>{
    const body = req.body;
    const {success} = signinSchema.safeParse(body);
    if(!success){
        return res.status(411).json({
            msg : "Incorrect Inputs"
        })
    }
    const user = await User.findOne({
        username : body.username,
        password : body.password
    });
    if(!user){
        return res.status(411).json({
            msg : "Error while logging in"
        })
    }
    const userId = user._id;
    const token = jwt.sign({
        userId
    },JWT_SECRET);
    return res.status(200).json({
        token : token
    })
})
userRouter.put('/',authMiddleware,async (req,res)=>{
    const {success} = updateBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg:"error while updating information"
        })
    }
    await User.updateOne({
        _id : req.userId
    },req.body);
    return res.status(200).json({
        message : "Updated successfully"
    })
})
userRouter.get('/bulk',authMiddleware,async (req,res)=>{
    const filter = req.query.filter || "";
    const users = await User.find({
        $or:[{
            firstName : {
            "$regex": filter
            }
            },{
                lastName : {
                    "$regex" : filter
                }
            }]
    });
    return res.status(200).json({
        users : users.map((user)=>{
            return {
            firstName : user.firstName,
            lastName: user.lastName,
            _id: user._id
            }
        })
    });
})

module.exports = userRouter;