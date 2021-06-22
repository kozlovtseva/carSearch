import React from 'react';
import {Box, List, ListItem, ListItemText, Typography} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

import {IRecentListItem} from "../../interfaces/recent";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            fontSize: 26,
            fontWeight: 700
        },
        list: {
            padding: 0,
        },
        listItem: {
            padding: 0,
        },
    }),
);

interface IProps {
    removeItem: (id: string) => void;
    list: IRecentListItem[]
}

const HintsList: React.FC<IProps> = ({removeItem, list}) => {
    const classes = useStyles();
    return (
        <Box >
            <Typography variant="h3" gutterBottom className={classes.title}>
                Недавнее
            </Typography>
            <List className={classes.list}>
                {list.map((item: IRecentListItem) =>
                    <ListItem key={item.id} className={classes.listItem}>
                        <ListItemText
                            primary={item.title}
                        />
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => removeItem(item.id)}
                        >
                            <ClearIcon />
                        </IconButton>
                    </ListItem>
                )}
            </List>
        </Box>

    );
}

export default HintsList;