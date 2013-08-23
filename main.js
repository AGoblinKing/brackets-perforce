define(function (require, exports, module) {
    "use strict";
    
    var EditorManager   = brackets.getModule("editor/EditorManager"),
        DocumentManager = brackets.getModule("document/DocumentManager");

    brackets.getModule("utils/AppInit").appReady(function () {
        var p4 = require("p4");

        $(DocumentManager)
            .on("dirtyFlagChange", function (e, doc) {
                var filePath     = doc.file.fullPath,
                    activeEditor = EditorManager.getActiveEditor();

                if(activeEditor && doc === activeEditor.document) {
                    p4.checkout(filePath).fail(p4.add(filePath));
                }
            })
            .on("pathDeleted", function (e, path) {
                p4.delete(path).fail(p4.revert(path));
            });
    });
});