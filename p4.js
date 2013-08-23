define(function (require, exports, module) {
    "use strict";

    var nodeConnection = new (brackets.getModule("utils/NodeConnection"))(),
        extUtils       = brackets.getModule("utils/ExtensionUtils"),
        p4Path         = extUtils.getModulePath(module, "node-p4.js"),
        init           = nodeConnection.connect(true)
            .pipe(function () {
                return nodeConnection.loadDomains([p4Path], true);
            });
    
    module.exports = {
        checkout: function (filepath) {
            return init.pipe(function () { 
               return nodeConnection.domains.perforce.checkout(filepath); 
            });
        },
        add: function (filepath) {
            return init.pipe(function () { 
               return nodeConnection.domains.perforce.add(filepath); 
            });
        },
        "delete": function (filepath) {
            return init.pipe(function () { 
               return nodeConnection.domains.perforce.delete(filepath); 
            });
        }, 
        revert: function (filepath) {
            return init.pipe(function () { 
               return nodeConnection.domains.perforce.revert(filepath); 
            });
        }
    };
   
});