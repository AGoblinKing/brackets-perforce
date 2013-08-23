var exec = require("child_process").exec;

var p4checkout = function (filepath, callback) {   
    exec("p4 edit \""+filepath+"\"", function(err, stdout, stderr) {
         callback(stderr, stdout);
    });
};

var p4add = function (filepath, callback) {
    exec("p4 add \""+filepath+"\"", function(err, stdout, stderr) {
         callback(stderr, stdout);
    });
};

var p4delete = function (filepath, callback) {
    exec("p4 delete \""+filepath+"\"", function(err, stdout, stderr) {
         callback(stderr, stdout);
    });
};

var p4revert = function (filepath, callback) {
    exec("p4 revert \""+filepath+"\"", function(err, stdout, stderr) {
         callback(stderr, stdout);
    });   
};

exports.init = function (DomainManager) {
    if(!DomainManager.hasDomain("perforce")) {
      DomainManager.registerDomain("perforce", {major: 0, minor: 1});
    } 
    
    DomainManager.registerCommand(
        "perforce",
        "checkout",
        p4checkout,
        true,
        "Attempts to checkout a file to the user's default changelist",
        [{path: "filepath", type: "string"}],
        []
    );
    
    DomainManager.registerCommand(
        "perforce",
        "delete",
        p4delete,
        true,
        "Attempts to delete a file to the user's default changelist",
        [{path: "filepath", type: "string"}],
        []
    );
    
    DomainManager.registerCommand(
        "perforce",
        "add",
        p4add,
        true,
        "Attempts to add a file to the user's default changelist",
        [{path: "filepath", type: "string"}],
        []
    );
    
    
    DomainManager.registerCommand(
        "perforce",
        "revert",
        p4revert,
        true,
        "Attempts to revert a file to the user's default changelist",
        [{path: "filepath", type: "string"}],
        []
    );
};