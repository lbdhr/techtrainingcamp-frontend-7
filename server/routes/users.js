const express = require("express");
const isEmpty = require("lodash/isEmpty");
const validator = require("validator");
const sqlFn = require("../mysql")

const router = express.Router();


const validatorInput = (data) =>{
    let errors = {};
    if(validator.isEmpty(data.username)){
        errors.username = "请填写用户名"
    }
    if(!validator.isEmail(data.email)){
        errors.email = "请填写邮箱"
    }
    if(validator.isEmpty(data.password)){
        errors.password = "请填写密码"
    }
    if(validator.isEmpty(data.passwordConfirmation)){
        errors.passwordConfirmation = "请确认密码"
    }
    if(!validator.equals(data.password,data.passwordConfirmation)){
        errors.passwordConfirmation = "两次密码不同"
    }

    return{
        errors,
        isValid:isEmpty(errors)
    }
}


router.post("/",(req,res) =>{
    const { errors,isValid } = validatorInput(req.body);
    // 接受数据库语句
    var sql = "insert into user values (null,?,?,?,?,?,?)";
    var arr = [req.body.email,req.body.username,req.body.password,req.body.passwordConfirmation,0,0];
    if(isValid){
        sqlFn(sql,arr,function(data){
            if(data.affectedRows){
                res.send({success:true})
            }else{
                res.status(400).json({error:'注册失败'});
            }
        })
    }else{
        res.status(400).json(errors);
    }
})

router.get("/:username",(req,res) =>{
    var sql = "select * from user where `username`=?";
    // console.log(sql);
    var arr = [req.params.username];
    sqlFn(sql,arr,function(data){
        if(data){
            res.send(data)
        }else{
            res.send({})
        }
    })
})

router.get("/usercenter/rankings", (req, res) => {
    let sql = "select * from `user`";
    // console.log(sql);
    let arr = [];
    sqlFn(sql, arr, function(data){
        if(data){
            res.send(data);
        } else {
            res.send({});
        }
    })
});

router.post("/usercenter/scoreupload", (req, res) => {
    console.log("/usercenter/scoreupload");
    const {username, score, mode} = req.body;
    // console.log(`username: ${username}`);
    let sql = "select * from user where `username`=?"
    let arr = [username];
    sqlFn(sql, arr, function(data){
        if(data.length>0){
            console.log(data);
            if(mode === "online") {
                if(data[0].scoreOnline < score) {
                    let sql = "update user set `scoreOnline`=? where `username`=?";
                    let arr = [score, username];
                    sqlFn(sql, arr, function(data){
                        if(data) res.send(data);
                        else res.status(401).json({ errors:{from:"分数更新失败"}});
                    })
                }
            } else if(mode === "offline") {
                if(data[0].scoreOffline < score) {
                    let sql = "update user set `scoreOffline`=? where `username`=?";
                    let arr = [score, username];
                    sqlFn(sql, arr, function(data){
                        if(data) res.send(data);
                        else res.status(401).json({ errors:{from:"分数更新失败"}});
                    })
                }
            }
            else res.send(data);
        } else {
            res.status(401).json({ errors:{from:"用户名错误"}})
        }
    })

});

module.exports = router;