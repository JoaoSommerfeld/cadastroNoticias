import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

import { Container } from '@mui/material';
import ListaNoticias from '../ListaNoticias';
import './homePage.css'

const HomePage = () => {    

    return(
        <div>            
            <Container>
                <div className="homePage">        
                    <h1>Lista de Notícias</h1> 
                    <ListaNoticias/>               
                </div>
            </Container>   
        </div>
    )
}

export default HomePage;