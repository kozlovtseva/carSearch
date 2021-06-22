import React from 'react';
import {List, ListItem, ListItemText} from "@material-ui/core";
import { nanoid } from 'nanoid';


import {IHint} from "../../interfaces/hints";


interface IProps {
    handleClick: (modelId: number) => void;
    list: IHint[]
}

const HintsList: React.FC<IProps> = ({handleClick, list}) => {
    return (
        <List>
            {list.map((item: IHint) =>
                <ListItem key={nanoid()} onClick={()=> handleClick(item.model_id)}>
                    <ListItemText
                        primary={item.title}
                    />
                </ListItem>
            )}
        </List>
    );
}

export default HintsList;