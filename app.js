/**
 * Created by sulochana on 5/27/17.
 */

var moment = require("moment");
var fs = require('fs');



var logstream = fs.createWriteStream("log.txt");

function logger(status,code) {
    //set default value
    if (code==undefined){
        code = 0;
    }

    //setup time
    var now = new Date();
    var content = "";
    now = now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();


    //switch
    switch (code){
        case 0:
            content = now + " [INFO] " + status;
            break;
        case 1:
            content = now + " [WARN] " + status;
            break;
        case 2:
            content = now + " [CRIT] " + status;
            break;
        default:
            content = now + " [????] " + status;
            break;
    }

    //log to file
    fs.appendFile('log.txt', content+"\n", function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

