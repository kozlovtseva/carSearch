import React, {useEffect, useState} from 'react';
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {Box, Container, Grid} from "@material-ui/core";

import SearchInput from "../components/UI/SearchInput";
import {AppState} from "../store/store";
import {getHints} from "../store/actions/hints";
import {IHint} from "../interfaces/hints";
import HintsList from "../components/HintsList/HintsList";
import {getCars} from "../store/actions/cars";
import CarsList from "../components/CarsList/CarsList";
import {ICar} from "../interfaces/cars";


interface IProps {
    getHints: (hint: string) => void;
    getCars: (modelId: number) => void;
    hints: IHint[];
    cars: ICar[];
}

const Main: React.FC<IProps> = ({getHints, getCars, hints, cars}) => {

    const [carsList, setCarsList] = useState<ICar[]>([]);
    const [hintsList, setHintsList] = useState<IHint[]>([])

    useEffect(() => {
        setCarsList(cars);
    }, [cars]);

    useEffect(() => {
        setHintsList(hints);
    }, [hints]);

    const onSearch = (hint: string) => {
        getHints(hint);
        setCarsList([]);
    }

    const handleClick = (modelId: number) => {
        getCars(modelId);
        setHintsList([]);
    }

    return (
        <Container>
            <Box pt={5}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <SearchInput onSearch={onSearch}/>
                        <HintsList list={hintsList} handleClick={handleClick}/>
                        <CarsList list={carsList} />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

const mapStateToProps = ({ hints, cars }: AppState) => ({
    hints: hints.list,
    cars: cars.list
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getHints: (hint: string) => dispatch(getHints(hint)),
    getCars: (modelId: number) => dispatch(getCars(modelId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);