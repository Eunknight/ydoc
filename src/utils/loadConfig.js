var fs = require('fs'),
    sysPath = require('path'),
    JSON5 = require('json5');

module.exports = function(cwd, callback) {
    var confJSPath = sysPath.join(cwd, 'ydocfile.js'),
        jsonPath = fs.existsSync(sysPath.join(cwd, 'ydoc.json')),
        configPath = fs.existsSync(sysPath.join(cwd, 'ydoc.config')),
        conf, confPath;
    if (configPath) {
        console.log(('v3.1.0版本后不再支持 ydoc.config 配置文件，请将配置文件更换成 ydoc.json!').red);
    }
    if (jsonPath) {
        confPath = sysPath.join(cwd, 'ydoc.json');
    }
    if (fs.existsSync(confPath)) {
        try {
            conf = JSON5.parse(fs.readFileSync(confPath, 'utf-8'));
        } catch (e) {}
        callback(conf);
    } else if (fs.existsSync(confJSPath)) {
        if (require.cache[confJSPath]) {
            delete require.cache[confJSPath];
        }
        var ydocfile = require(confJSPath);
        if (typeof ydocfile == 'function') {
            if (ydocfile.length == 1) {
                ydocfile(callback);
            } else {
                callback(ydocfile());
            }
        } else {
            callback(ydocfile);
        }
    } else {
        callback(conf);
    }
};
