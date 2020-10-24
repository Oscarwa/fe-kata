import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import './style.css';
import { AppContext } from '../../lib/context';

const NewTransfer = (props) => {
    const { accounts } = useContext(AppContext);

    const [ orig, setOrig ] = useState('-');
    const [ dest, setDest ] = useState('');
    const [ amount, setAmount ] = useState('');

    const reset = (event) => {
        if(event) event.preventDefault();
        setOrig('-');
        setDest('');
        setAmount('');
    }

    const save = async (event) => {
        event.preventDefault();
        if(orig && orig !== '-' && dest && amount) {
            const model = {
                fromAccount: orig,
                toAccount: dest,
                amount: parseFloat(amount)
            };
            const res = await fetch('/api/transfer', {method: 'POST', body: JSON.stringify(model)});
            const data = await res.json();
            reset();
            if(props.save) {
                props.save();
            }
        }
    }

    return (
        <form>
            <div className="field">
                <label htmlFor="origin">Select origin account</label>
                <select name="origin" onChange={ (e) => { setOrig(e.target.value);} }>
                    <option value="-" selected={ orig === '-'}> -- </option>
                    { accounts.map(a => 
                        <option key={a.account} value={a.account}>
                            { '**** ' + a.account.substring(a.account.length - 4, a.account.length)}
                        </option>
                    )}
                </select>
            </div>
            <div className="field">
                <label htmlFor="dest">Destination account</label>
                <input name="dest" value={ dest } onChange={ (e)=> {setDest(e.target.value)} }></input>
            </div>
            <div className="field">
                <label htmlFor="amount">Amount</label>
                <input type="number" name="amount" value={ amount } onChange={ (e)=> {setAmount(e.target.value)} }></input>
            </div>
            <div className="actions">
                <button type="submit" onClick={ (e) => { save(e) } }>Transfer</button>
                <button type="reset" onClick={ (e) => { reset(e) } }>Cancel</button>
            </div>
        </form>
    )
}

export default NewTransfer

