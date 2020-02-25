import React from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

const SearchBox = (props) => {

    return (
        <div className="search_container">
            <Container component="main" maxWidth="lg">
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    type="text"
                    placeholder="search"
                    onChange={event => props.keywords(event)}
                    autoFocus
                />
            </Container>
        </div>
    )
}

export default SearchBox;