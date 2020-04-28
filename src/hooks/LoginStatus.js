import { useState, useEffect } from 'react';
import { hash } from '../functions/utils';

export const useLoginStatus = (props) => {
    const [token, setToken] = useState(null);
    const [state, setState] = useState(null);
    const [storedState, setStoredState] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const stateKey = props.stateKey;

    useEffect(() => {
        // if there is no token and state hasn't been set
        // then check for token and setLogin
        if (token === null && state === null && storedState === null && isLoggedIn === false){
            // Check for token
            let _token = hash.access_token;
            let _state = hash.state;
            let _storedState = localStorage.getItem(stateKey);
                // If there is a token in the hash then 
                // update state with token, state, storedState, and isLoggedin
                if (_token && _state) {
                    // Update state
                        setToken(_token);
                        setState(_state);
                        setStoredState(_storedState);
                        setIsLoggedIn(true);
                }
        }
    }, [token, state, storedState, stateKey, isLoggedIn, ]);
    return (
        setIsLoggedIn,
        isLoggedIn
    );
}



