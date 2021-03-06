﻿// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {NoteItem, IItemProp, ItemState, IListProps, ListState} from "./Model";
import { observable, transaction} from "mobx";
import {observer} from "mobx-react";

@observer
export class ListItem extends React.Component<IItemProp, ItemState>
{
    constructor(props : IItemProp, context: any)
    {
        super(props, context);
        this.state = new ItemState(false, false, props.data);
    }

    public selectItem()
    {
        this.state.selected = !this.state.selected;
        if (this.props.onSelect) this.props.onSelect(this.props.data, this.props.idx);
    }

    public incrementItem()
    {
        this.state.data.clicks = this.props.data.clicks + 1;

        if (this.props.onIncrement) this.props.onIncrement(this.props.data, this.props.idx);
    }

    public deleteMe()
    {
        if (this.props.onDelete) this.props.onDelete(this.state.data, this.props.idx);
    }

    public render() : JSX.Element
    {
        var ticks = (new Date()).getTime();
        var selected = this.state ? this.state.selected : false;

        return (
            <tr clc={ticks} style={{backgroundColor: !selected ? "transparent" : "#77F"}}>
                <td>
                    <input type="checkbox" onChange={() => this.state.checked = !this.state.checked} value={this.state.checked} />
                    <span onClick={this.selectItem.bind(this)}>{this.state.data.text}</span>
                </td>
                <td onClick={this.incrementItem.bind(this) }>{this.props.data.clicks}</td>
                <td onClick={this.deleteMe.bind(this)}>X</td>
            </tr>
            );
    }
}
 
@observer
export class NotesList extends React.Component<IListProps, ListState>
{
    constructor(props: IListProps, context: any)
    {
        super(props, context);

        this.state = new ListState(props.initialData);
    }

    public doDelete(item: NoteItem, idx: number)
    {
        this.state.data.splice(idx, 1);
    }

    public doAdd()
    {
        transaction(() =>
        {
            this.state.data.push(new NoteItem(this.state.inputText));
            this.state.inputText = "";
        });
    }

    public setText(event: any)
    {
        this.state.inputText = event.target.value;
    }

    public render(): JSX.Element
    {
        var onDelete = this.doDelete.bind(this);
        let valid = this.state.inputText !== "22";
        
        return (
            <table style={ { width: "100%" } }>
                <tbody>
                    {this.state.data.map((item, i) => <ListItem data={item} idx={i} onDelete={onDelete} />)}
                    <tr>
                        <td>
                            <input name="theNewItemBox" value={this.state.inputText} type="text" onChange={this.setText.bind(this)} style={{ backgroundColor: valid ? "transparent" : "red"}}/>
                            <button onClick={this.doAdd.bind(this) }>Add</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            );
    }
}


export let initData = [
    new NoteItem("Note1"), new NoteItem("This is note2", 10), new NoteItem("Some more note"),
    new NoteItem("lorem ipsum")
];

ReactDOM.render(<NotesList initialData={initData}/>, document.getElementById("content"));


