import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import {Icon} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            alignItems: 'center',
            display: 'flex',
            padding: '2px 4px',
        },
        input: {
            flex: 1,
            marginLeft: theme.spacing(1),
        },
        icon: {
            padding: 10,
        },
    }),
);

interface IProps {
    onSearch: (hint: string) => void;
}

const SearchInput: React.FC<IProps> = ({onSearch}) =>  {
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };
    return (
        <Paper component="form" className={classes.root}>
            <Icon className={classes.icon}>
                <SearchIcon />
            </Icon>
            <InputBase
                className={classes.input}
                placeholder="search"
                onChange={handleChange}
            />
        </Paper>
    );
}

export default SearchInput
