const mysql = require("mysql");

var client = mysql.createConnection({
    host:"localhost",
    user:"root", // 默认的
    password:"",
    database:"iwenuser"
});

function handleError() {

    client.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }

        console.log('connected as id ' + client.threadId);
    });

    client.on('error', function(err){
        console.log('db error', err);
        // 如果是自动断开，自动重连
        console.info('如果是连接断开，则自动重连');
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            client.connect(function(err) {
                if (err) {
                    console.error('error connecting: ' + err.stack);
                    return;
                }
                console.log('connected as id ' + client.threadId);
            });
        } else {throw err;}
    });
}

function sqlFn(sql,arr,callback){
    client.query(sql,arr,function(error,result){
        if(error){
            console.log(new Error(error));
            return;
        }
        callback(result)
    })
}

handleError();

module.exports = sqlFn