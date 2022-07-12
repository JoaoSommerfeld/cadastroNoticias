import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './notFound.css'

const NotFound = () => {
    return(
        <div class="error-box">            
            <div class="error-body text-center">
                <h1>404</h1>
                <h3 class="text-uppercase">Ops... Página não encontrada!</h3>
                <p class="text-muted m-t-30 m-b-30">Você pode ter digitado incorretamente o endereço. Volte para a página inicial. </p>
                <Link to="/">
                    <Button className="btn-back" variant="contained" size="large" color="secondary" endIcon={<ArrowBackIcon />}>
                        Voltar
                    </Button>
                </Link> 
            </div>
            <footer class="footer text-center">Arbtech</footer>
        </div>
    )
}

export default NotFound;