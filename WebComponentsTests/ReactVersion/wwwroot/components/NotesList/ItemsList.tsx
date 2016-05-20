// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {NoteItem, IItemProp, IItemState, IListProps, IListState} from "./Model";

export class ListItem extends React.Component<IItemProp, IItemState>
{
    public selectItem()
    {
        var selected = !(this.state && this.state.selected);
        this.setState({ selected: selected });

        if(this.props.onSelect) this.props.onSelect(this.props.data, this.props.idx);
    }

    public incrementItem()
    {
        this.props.data.clicks = this.props.data.clicks + 1;
        this.forceUpdate();

        if (this.props.onIncrement) this.props.onIncrement(this.props.data, this.props.idx);
    }

    public deleteMe()
    {
        if (this.props.onDelete) this.props.onDelete(this.props.data, this.props.idx);
    }

    public render() : JSX.Element
    {
        var ticks = (new Date()).getTime();
        return (
            <tr clc={ticks}>
                <td onClick={this.selectItem.bind(this) }>{this.props.data.text}</td>
                <td onClick={this.incrementItem.bind(this) }>{this.props.data.clicks}</td>
                <td onClick={this.deleteMe.bind(this)}>X</td>
            </tr>
            );
    }
}

export class NotesList extends React.Component<IListProps, IListState>
{
    public doDelete(item: NoteItem, idx: number)
    {
        this.props.data.splice(idx, 1);
        this.forceUpdate();
    }

    public doAdd()
    {
        let textbox : any = document.getElementById("theNewItemBox");
        this.props.data.push(new NoteItem(textbox.value));
        this.forceUpdate();
    }

    public render(): JSX.Element
    {
        var onDelete = this.doDelete.bind(this);
        var items = this.props.data.map((item, i) => <ListItem data={item} idx={i} onDelete={onDelete}/>);

        return (
            <table style={ {width: "100%"} }>
                {items}
                <tr>
                    <td>
                        <input id="theNewItemBox" type="text"/>
                        <button onClick={this.doAdd.bind(this) }>Add</button>
                    </td>
                </tr>
            </table>
            );
    }
}


let initData = [
    new NoteItem("Note1"), new NoteItem("This is note2", 10), new NoteItem("Some more note"),
    new NoteItem("lorem ipsum")
];

ReactDOM.render(<NotesList data={initData}/>, document.getElementById("content"));

