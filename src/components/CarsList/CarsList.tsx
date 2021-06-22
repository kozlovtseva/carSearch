import React, {useCallback, useEffect, useRef} from 'react';
import {List, ListItem, ListItemText} from "@material-ui/core";

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
    list: ICar[];
    loadMore: () => void;
}

const CarsList: React.FC<IProps> = ({ list, loadMore}) => {
    const classes = useStyles();

    const loader = useRef<HTMLDivElement>(null);
    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            loadMore();
        }
    }, [loadMore]);

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: "20px",
            threshold: 0
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (loader.current) observer.observe(loader.current);
    }, [handleObserver]);

    return (
        <List className={classes.list}>
            {list.map((item: ICar) =>
                <ListItem key={item.id}>
                    <ListItemText
                        primary={item.title}
                    />
                    <ListItemText
                        primary={item.price.toLocaleString() + " ₽"}
                        className={classes.price}
                    />
                </ListItem>
            )}
            <div ref={loader} />
        </List>
    );
}

export default CarsList;