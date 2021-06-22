import React, {useEffect, useState} from 'react';
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
    placeholder: string;
}

const SearchInput: React.FC<IProps> = ({onSearch, placeholder}) =>  {
    const classes = useStyles();

    const [value, setValue] = useState<string>("");

    useEffect(() => {
        setValue(placeholder);
    }, [placeholder]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        onSearch(event.target.value);
    };
    return (
        <Paper component="form" className={classes.root}>
            <Icon className={classes.icon}>
                <SearchIcon color={"disabled"}/>
            </Icon>
            <InputBase
                className={classes.input}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
            />
        </Paper>
    );
}

export default SearchInput
