import React from 'react';
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {Box, Container, Grid} from "@material-ui/core";

import SearchInput from "../components/UI/SearchInput";
import {AppState} from "../store/store";
import {getHints} from "../store/actions/hints";


interface IProps {
    getHints: (hint: string) => void;
}

const Main: React.FC<IProps> = ({getHints}) => {

    const onSearch = (hint: string) => {
        getHints (hint)
    }

    return (
        <Container>
            <Box pt={5}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <SearchInput onSearch={onSearch}/>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

const mapStateToProps = ({ hints }: AppState) => ({
    hints: hints.list,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getHints: (hint: string) => dispatch(getHints(hint)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);