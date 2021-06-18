import React from 'react';
import SearchInput from "../components/UI/SearchInput";
import {Box, Container, Grid} from "@material-ui/core";


const Main: React.FC<{}> = () => {

    return (
        <Container>
            <Box pt={5}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <SearchInput/>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default Main;