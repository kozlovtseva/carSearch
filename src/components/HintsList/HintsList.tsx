import React from 'react';
import {List, ListItem, ListItemText} from "@material-ui/core";
import { nanoid } from 'nanoid';


import {IHint} from "../../interfaces/hints";


interface IProps {
    handleClick: (modelId: number, hint: string) => void;
    list: IHint[];
    value: string;
}

const HintsList: React.FC<IProps> = ({handleClick, list, value}) => {
    const highlightText = (text: string) => {
        let index = text.toLowerCase().indexOf(value.toLowerCase());
        let tailIx = index + value.length;
        if (index === -1) {
            return <span>{text}</span>
        }
        return (
            <span>
                {text.slice(0, index)}
                <b style={{color:"#8ae3c2"}}>{text.slice(index, tailIx)}</b>
                {text.slice(tailIx)}
            </span>
        )
    }
    return (
        <List>
            {list.map((item: IHint) =>
                <ListItem button key={nanoid()} onClick={()=> handleClick(item.model_id, item.title)}>
                    {highlightText(item.title)}
                </ListItem>
            )}
        </List>
    );
}

export default HintsList;