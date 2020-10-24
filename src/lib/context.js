import React, { useState } from 'react';

const AppContext = React.createContext('kata');

const AppContextProvider = (props) => {
    const [user, setUser] = useState('Oscarwa$123');
    const [transactions, setTransactions] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const val = {
        user,
        setUser,
        transactions,
        setTransactions,
        accounts,
        setAccounts
    }
    return (
        <AppContext.Provider value={ val }>
            { props.children }
        </AppContext.Provider>
    );
}

export { 
    AppContext, 
    AppContextProvider
};