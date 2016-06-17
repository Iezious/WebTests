import * as React from "react";
import * as ReactDOM from "react-dom";
import {observable} from "mobx";

export class NoteItem
{
    @observable
    text: string;

    @observable
    clicks: number;

    constructor(text: string, clicks?:number)
    {
        this.text = text;
        this.clicks = clicks ? clicks : 0;
    }
}

export class ListState
{
    constructor(data: NoteItem[])
    {
        this.data = data;
        this.inputText = "";
    }

    @observable
    selected: number;

    @observable
    data: Array<NoteItem>;

    @observable
    inputText: string;
}

export interface IListProps
{
    initialData: Array<NoteItem>;
}


export class ItemState
{
    constructor(selected: boolean, checked: boolean)
    {
        this.selected = selected;
        this.checked = checked;
    }

    @observable
    selected: boolean;

    @observable
    checked: boolean;
}

export interface IItemProp
{
    data: NoteItem;
    idx: number;
    onSelect?: (item: NoteItem, idx: number) => void;
    onIncrement?: (item: NoteItem, idx: number) => void;
    onDelete?: (item: NoteItem, idx: number) => void;
}