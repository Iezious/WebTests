// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {NoteItem, IItemProp, IItemState, IListProps, IListState} from "./Model";

export class ListItem extends React.Component<IItemProp, IItemState>
{
    constructor(props : IItemProp, context: any)
    {
        super(props, context);
        this.state = { selected: false, checked: false };
    }

    public selectItem()
    {
        this.setState(state => { return { selected: !state.selected, checked: state.checked } });
        if(this.props.onSelect) this.props.onSelect(this.props.data, this.props.idx);
    }

    public checkItem()
    {
        this.setState(state => { return { selected: state.selected, checked: !state.checked } });
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
        var selected = this.state ? this.state.selected : false;

        return (
            <tr clc={ticks} style={{backgroundColor: !selected ? "transparent" : "#77F"}}>
                <td> <input type="checkbox" onChange={this.checkItem.bind(this) } value={this.state ? this.state.checked : false}/><span onClick={this.selectItem.bind(this) }>{this.props.data.text}</span></td>
                <td onClick={this.incrementItem.bind(this) }>{this.props.data.clicks}</td>
                <td onClick={this.deleteMe.bind(this)}>X</td>
            </tr>
            );
    }
}

export class NotesList extends React.Component<IListProps, IListState>
{
    constructor(props: IListProps, context: any)
    {
        super(props, context);

        this.state = { selected: 0, data: props.initialData, inputText:"" };
    }

    public doDelete(item: NoteItem, idx: number)
    {
        this.setState((state) =>
        {
            state.data.splice(idx, 1);
            return {
                selected: state.selected,
                data: state.data,
                inputText: state.inputText
            }
        });
    }

    public doAdd()
    {
        this.setState((state) =>
        {
            state.data.push(new NoteItem(this.state.inputText));
            return {
                selected: state.selected,
                data: state.data,
                inputText: ""
            }
        });

        this.forceUpdate();
    }

    public setText(event : any)
    {
        var txt = event.target.value;

        this.setState((state) =>
        {
            return {
                selected: state.selected,
                data: state.data,
                inputText: txt
        }});
    }

    public render(): JSX.Element
    {
        var onDelete = this.doDelete.bind(this);
        
        return (
            <table style={ {width: "100%"} }>
                {this.state.data.map((item, i) => <ListItem data={item} idx={i} onDelete={onDelete} />)}
                <tr>
                    <td>
                        <input name="theNewItemBox" value={this.state.inputText} type="text" onChange={this.setText.bind(this)}/>
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

ReactDOM.render(<NotesList initialData={initData}/>, document.getElementById("content"));


