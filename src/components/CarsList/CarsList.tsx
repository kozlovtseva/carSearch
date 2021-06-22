import React from 'react';
import {List, ListItem, ListItemText} from "@material-ui/core";
import { nanoid } from 'nanoid';

import {ICar} from "../../interfaces/cars";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: '100%',
        },
        price: {
            '& span': {
                fontWeight: 'bold',
                textAlign: 'right'
            }
        }
    }),
);

interface IProps {
    list: ICar[]
}

const CarsList: React.FC<IProps> = ({ list}) => {
    const classes = useStyles();

    return (
        <List className={classes.list}>
            {list.map((item: ICar) =>
                <ListItem key={nanoid()} >
                    <ListItemText
                        primary={item.title}
                    />
                    <ListItemText
                        primary={item.price.toLocaleString() + " ₽"}
                        className={classes.price}
                    />
                </ListItem>
            )}
        </List>
    );
}

export default CarsList;