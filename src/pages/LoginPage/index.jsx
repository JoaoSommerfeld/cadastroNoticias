import React, { useState, useContext } from 'react';
import { TextField, Button }  from '@mui/material';

import './login.css';
import { AuthContext } from '../../contexts/auth';

const LoginPage = () => {
    const { authenticated, login } = useContext(AuthContext);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        login(email, password) // integração com o contexto /// depois api
    }

    return(
        <div id="login">    
            <div className="box-form">                
                <div className="fields"> 
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <TextField 
                            type="email"
                            id="email" 
                            label="E-mail" 
                            variant="standard"
                            margin="normal"
                            fullWidth 
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <TextField 
                            type="password"
                            id="password" 
                            label="Senha" 
                            variant="standard"
                            margin="normal"
                            fullWidth 
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <Button type="submit" variant="contained" color="primary" size="large" className="botao-enviar"> Enviar </Button>
                    </form>
                    
                </div>                
            </div>            
        </div>
    )
}

export default LoginPage;