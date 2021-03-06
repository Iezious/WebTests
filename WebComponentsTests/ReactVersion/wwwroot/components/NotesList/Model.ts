﻿export class NoteItem
{
    text: string;
    clicks: number;

    constructor(text: string, clicks?:number)
    {
        this.text = text;
        this.clicks = clicks ? clicks : 0;
    }
}

export interface IListState
{
    selected: number;
    data: Array<NoteItem>;
    inputText: string;
}

export interface IListProps
{
    initialData: Array<NoteItem>;
}


export interface IItemState
{
    selected: boolean;
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