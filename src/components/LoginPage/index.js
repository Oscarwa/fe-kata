import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { AppContext } from '../../lib/context';
import { getTransactions, getUserAccounts } from '../../lib/api-mock';

const LoginPage = (props) => {
    const { setUser, setAccounts } = useContext(AppContext);
    const history = useHistory();

    const [ isLoginValid, setLoginValidity ] = useState({user: false, pwd: false, login: false});
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const validatePwd = () => {
        const regex = /^(?=.{8,20})(?=.*[a-z])(?=.*[A-Z])(?=.*[!$@"%&/]).*$/g;
        const test = regex.test(password)
        const newVal = {...isLoginValid, pwd: test};
        setLoginValidity(newVal);

    }
    const validateUsername = () => {
        const regex = /^[\w!$@"%&/]{8,20}$/g;
        const test = regex.test(username);
        const newVal = {...isLoginValid, user: test};
        setLoginValidity(newVal);
    }

    useEffect(() => {
        const to = setTimeout(checkValidity, 1000);
        return () => {
            clearInterval(to);
        }
    }, [isLoginValid.pwd, isLoginValid.user])

    const checkValidity = () => {
        setLoginValidity({...isLoginValid, login: isLoginValid.user && isLoginValid.pwd});
    }

    const login = async () => {
        setUser(username);
        const res = await fetch('/api/accounts'); 
        const accounts = await res.json();
        setAccounts(accounts)        
        history.push('/home');
    }

    const wrapperStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight:'100vh'
    }

    const loginStyle = {
        border: '2px solid #000',
        borderRadius: '30px',
        padding: '1rem',
        width: '300px',
        height: '300px',
        textAlign: 'center'
    }

    const inputStyle = {
        margin: '1.5rem 0',
        height: '2rem',
        fontSize: '1rem'
    }

    return (
        <div style={ wrapperStyle }>
            <div style={ loginStyle }>
                <h2>Login</h2>
                <div>
                    <input placeholder="username"
                        style={ { width: '90%', ...inputStyle, border: isLoginValid.user || username === '' ? '1px solid black' : '1px solid red'} }
                        value={ username }
                        onChange={(e) => { setUsername(e.target.value)}}
                        onBlur={ validateUsername }></input>
                </div>
                <div>
                    <input placeholder="password"
                        type="password"
                        style={ { width: '90%', ...inputStyle, border: isLoginValid.pwd || password === '' ? '1px solid black' : '1px solid red' } }
                        value={ password }
                        onChange={(e) => { setPassword(e.target.value)}}
                        onBlur={ validatePwd }></input>
                </div>
                <button type="submit"
                    disabled={!isLoginValid.login}
                    style={ {width: '100px', ...inputStyle} }
                    onClick={ (e) => { e.preventDefault(); login(); }}>Enter</button>
            </div>
        </div>
    )
}

export default LoginPage;
