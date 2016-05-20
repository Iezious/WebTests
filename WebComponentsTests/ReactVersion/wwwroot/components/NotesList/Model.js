System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var NoteItem;
    return {
        setters:[],
        execute: function() {
            NoteItem = (function () {
                function NoteItem(text, clicks) {
                    this.text = text;
                    this.clicks = clicks ? clicks : 0;
                }
                return NoteItem;
            }());
            exports_1("NoteItem", NoteItem);
        }
    }
});
//# sourceMappingURL=Model.js.map