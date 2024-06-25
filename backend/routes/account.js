
const express = require("express");
const authMiddleware = require("../middleware");
const { Account, User } = require("../database");
const zod = require("zod");
const { default: mongoose } = require("mongoose");
const accRouter = express.Router();
const transSchema = zod.object({
    to : zod.string(),
    amount : zod.number()
});
accRouter.get('/balance',authMiddleware,async (req,res)=>{
    const id = req.userId;
    const acc = await Account.findOne({
        userId : id
    });
    return res.status(200).json({
        balance : acc.balance
    })
});
accRouter.post('/transfer',authMiddleware,async (req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    const {success} = transSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg : "wrong inputs"
        })
    }
    const {amount,to} = req.body;
    const account = await Account.findOne({userId : req.userId}).session(session);
    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            msg : "Insufficient balance"
        });
    }
    const toAccount = await Account.findOne({userId : to}).session(session);
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            msg:"Invalid account"
        });
    }
    await Account.updateOne({userId : req.userId},{
        $inc : {
            balance : -amount
        }
    }).session(session);
    await Account.updateOne({userId : to},{
        $inc : {balance : amount}
    }).session(session);
    await session.commitTransaction();
    return res.status(200).json({
        msg : "transaction successfull"
    }
    );
})
module.exports = accRouter;