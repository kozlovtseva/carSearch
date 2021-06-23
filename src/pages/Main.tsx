import React, {useEffect, useState} from 'react';
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {Box, Container, Grid} from "@material-ui/core";
import { nanoid } from 'nanoid';

import SearchInput from "../components/UI/SearchInput";
import {AppState} from "../store/store";
import {getHints} from "../store/actions/hints";
import {IHint} from "../interfaces/hints";
import HintsList from "../components/HintsList/HintsList";
import {getCars} from "../store/actions/cars";
import CarsList from "../components/CarsList/CarsList";
import {ICar} from "../interfaces/cars";
import {IRecentListItem} from "../interfaces/recent";
import RecentList from "../components/RecentList/RecentList";


interface IProps {
    getHints: (hint: string) => void;
    getCars: (modelId: number) => void;
    hints: IHint[];
    cars: ICar[];
}

const Main: React.FC<IProps> = ({getHints, getCars, hints, cars}) => {

    const [carsList, setCarsList] = useState<ICar[]>([]);
    const [hintsList, setHintsList] = useState<IHint[]>([]);
    const [modelId, setModelId] = useState<number | null>(null);
    const [recentList, setRecentList] = useState<IRecentListItem[]>([]);
    const [placeholder, setPlaceholder] = useState<string>("");
    const [value, setValue] = useState<string>("");

    useEffect(() => {
        if (recentList.length > 0) localStorage.setItem("recent", JSON.stringify(recentList));
    }, [recentList]);

    useEffect(() => {
        const list = JSON.parse(localStorage.getItem("recent") as string);
        if (list?.length > 0) setRecentList(list);
    }, []);

    useEffect(() => {
        setCarsList(cars);
    }, [cars]);

    useEffect(() => {
        setHintsList(hints);
    }, [hints]);

    const onSearch = (hint: string) => {
        setCarsList([]);
        setValue(hint);
        getHints(hint);
    }

    const handleClick = (modelId: number, hint: string) => {
        setHintsList([]);
        setModelId(modelId);
        addHintToList(hint);
        getCars(modelId);
    }

    const addHintToList = (title: string) => {
        const newRecentHint = {
            id: nanoid(),
            title: title
        };
        let newList = [...recentList];
        newList.push(newRecentHint);
        if (newList.length > 5) newList.shift();
        setRecentList(newList);
        setPlaceholder(title);
    }

    const removeRecentListItem = (id: string) => {
        let newRecentList = recentList;
        newRecentList = newRecentList.filter(item => item.id !== id);
        setRecentList(newRecentList);
    }

    const loadMore = () => {
        if (modelId) getCars(modelId);
    }

    return (
        <Container>
            <Box pt={5}>
                <Grid container spacing={10}>
                    <Grid item xs={6}>
                        <SearchInput
                            onSearch={onSearch}
                            placeholder={placeholder}
                        />
                        {hintsList.length > 0 &&
                            <HintsList
                                list={hintsList}
                                value={value}
                                handleClick={handleClick}
                            />
                        }
                        {carsList.length > 0 && <CarsList list={carsList} loadMore={loadMore}/>}
                    </Grid>
                    <Grid item xs={5}>
                        <RecentList removeItem={removeRecentListItem} list={recentList}/>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

const mapStateToProps = ({ hints, cars }: AppState) => ({
    hints: hints.list,
    cars: cars.list,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getHints: (hint: string) => dispatch(getHints(hint)),
    getCars: (modelId: number) => dispatch(getCars(modelId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);