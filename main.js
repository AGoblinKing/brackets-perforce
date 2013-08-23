define(function (require, exports, module) {
    "use strict";
    
    var DocumentManager = brackets.getModule("document/DocumentManager");

    brackets.getModule("utils/AppInit").appReady(function () {
        var p4 = require("p4");

        $(DocumentManager)
            .on("dirtyFlagChange", function (e, doc) {
                var filePath   = doc.file.fullPath;

				if(doc === DocumentManager.getCurrentDocument()) {
					p4.checkout(filePath).fail(p4.add(filePath));
				}
            })
            .on("pathDeleted", function (e, path) {
                p4.delete(path).fail(p4.revert(path));
            });
    });
});