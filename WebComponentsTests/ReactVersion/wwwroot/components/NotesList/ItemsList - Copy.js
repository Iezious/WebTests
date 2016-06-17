// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
System.register(['react', 'react-dom', "./Model"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var React, ReactDOM, Model_1;
    var ListItem, NotesList, initData;
    return {
        setters:[
            function (React_1) {
                React = React_1;
            },
            function (ReactDOM_1) {
                ReactDOM = ReactDOM_1;
            },
            function (Model_1_1) {
                Model_1 = Model_1_1;
            }],
        execute: function() {
            ListItem = (function (_super) {
                __extends(ListItem, _super);
                function ListItem(props, context) {
                    _super.call(this, props, context);
                    this.state = { selected: false, checked: false };
                }
                ListItem.prototype.selectItem = function () {
                    this.setState(function (state) { return { selected: !state.selected, checked: state.checked }; });
                    if (this.props.onSelect)
                        this.props.onSelect(this.props.data, this.props.idx);
                };
                ListItem.prototype.checkItem = function () {
                    this.setState(function (state) { return { selected: state.selected, checked: !state.checked }; });
                    if (this.props.onSelect)
                        this.props.onSelect(this.props.data, this.props.idx);
                };
                ListItem.prototype.incrementItem = function () {
                    this.props.data.clicks = this.props.data.clicks + 1;
                    this.forceUpdate();
                    if (this.props.onIncrement)
                        this.props.onIncrement(this.props.data, this.props.idx);
                };
                ListItem.prototype.deleteMe = function () {
                    if (this.props.onDelete)
                        this.props.onDelete(this.props.data, this.props.idx);
                };
                ListItem.prototype.render = function () {
                    var ticks = (new Date()).getTime();
                    var selected = this.state ? this.state.selected : false;
                    return (React.createElement("tr", {clc: ticks, style: { backgroundColor: !selected ? "transparent" : "#77F" }}, React.createElement("td", null, " ", React.createElement("input", {type: "checkbox", onChange: this.checkItem.bind(this), value: this.state ? this.state.checked : false}), React.createElement("span", {onClick: this.selectItem.bind(this)}, this.props.data.text)), React.createElement("td", {onClick: this.incrementItem.bind(this)}, this.props.data.clicks), React.createElement("td", {onClick: this.deleteMe.bind(this)}, "X")));
                };
                return ListItem;
            }(React.Component));
            exports_1("ListItem", ListItem);
            NotesList = (function (_super) {
                __extends(NotesList, _super);
                function NotesList(props, context) {
                    _super.call(this, props, context);
                    this.state = { selected: 0, data: props.initialData, inputText: "" };
                }
                NotesList.prototype.doDelete = function (item, idx) {
                    this.setState(function (state) {
                        state.data.splice(idx, 1);
                        return {
                            selected: state.selected,
                            data: state.data,
                            inputText: state.inputText
                        };
                    });
                };
                NotesList.prototype.doAdd = function () {
                    var _this = this;
                    this.setState(function (state) {
                        state.data.push(new Model_1.NoteItem(_this.state.inputText));
                        return {
                            selected: state.selected,
                            data: state.data,
                            inputText: ""
                        };
                    });
                    this.forceUpdate();
                };
                NotesList.prototype.setText = function (event) {
                    this.setState(function (state) {
                        return {
                            selected: state.selected,
                            data: state.data,
                            inputText: event.data
                        };
                    });
                };
                NotesList.prototype.render = function () {
                    var onDelete = this.doDelete.bind(this);
                    var items = this.state.data.map(function (item, i) { return React.createElement(ListItem, {data: item, idx: i, onDelete: onDelete}); });
                    return (React.createElement("table", {style: { width: "100%" }}, items, React.createElement("tr", null, React.createElement("td", null, React.createElement("input", {ref: "theNewItemBox", value: this.state.inputText, type: "text", onChange: this.setText.bind(this)}), React.createElement("button", {onClick: this.doAdd.bind(this)}, "Add")))));
                };
                return NotesList;
            }(React.Component));
            exports_1("NotesList", NotesList);
            initData = [
                new Model_1.NoteItem("Note1"), new Model_1.NoteItem("This is note2", 10), new Model_1.NoteItem("Some more note"),
                new Model_1.NoteItem("lorem ipsum")
            ];
            ReactDOM.render(React.createElement(NotesList, {initialData: initData}), document.getElementById("content"));
        }
    }
});
//# sourceMappingURL=ItemsList - Copy.js.map