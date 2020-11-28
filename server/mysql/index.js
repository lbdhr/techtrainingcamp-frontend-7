const mysql = require("mysql");

var client = mysql.createConnection({
    host:"localhost",
    user:"root", // 默认的
    password:"",
    database:"iwenuser"
})

client.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + client.threadId);
});

function sqlFn(sql,arr,callback){
    client.query(sql,arr,function(error,result){
        if(error){
            console.log(new Error(error));
            return;
        }
        callback(result)
    })
}

module.exports = sqlFn