System.register(["mobx"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var mobx_1;
    var NoteItem, ListState, ItemState;
    return {
        setters:[
            function (mobx_1_1) {
                mobx_1 = mobx_1_1;
            }],
        execute: function() {
            NoteItem = (function () {
                function NoteItem(text, clicks) {
                    this.text = text;
                    this.clicks = clicks ? clicks : 0;
                }
                __decorate([
                    mobx_1.observable
                ], NoteItem.prototype, "text", void 0);
                __decorate([
                    mobx_1.observable
                ], NoteItem.prototype, "clicks", void 0);
                return NoteItem;
            }());
            exports_1("NoteItem", NoteItem);
            ListState = (function () {
                function ListState(data) {
                    this.data = data;
                    this.inputText = "";
                }
                __decorate([
                    mobx_1.observable
                ], ListState.prototype, "selected", void 0);
                __decorate([
                    mobx_1.observable
                ], ListState.prototype, "data", void 0);
                __decorate([
                    mobx_1.observable
                ], ListState.prototype, "inputText", void 0);
                return ListState;
            }());
            exports_1("ListState", ListState);
            ItemState = (function () {
                function ItemState(selected, checked, data) {
                    this.selected = selected;
                    this.checked = checked;
                    this.data = data;
                }
                __decorate([
                    mobx_1.observable
                ], ItemState.prototype, "data", void 0);
                __decorate([
                    mobx_1.observable
                ], ItemState.prototype, "selected", void 0);
                __decorate([
                    mobx_1.observable
                ], ItemState.prototype, "checked", void 0);
                return ItemState;
            }());
            exports_1("ItemState", ItemState);
        }
    }
});
//# sourceMappingURL=Model.js.map