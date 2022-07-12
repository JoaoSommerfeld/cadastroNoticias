import React from 'react';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';

import logoArb from '../../assets/img/logo_arbtech.png'
import './navMenu.css'
import LogOut from '../logout';

const NavMenu = () => {
    return (
        <div id="navMenu">
            <Container>
                <div className="itens-navMenu">     
                    <div className="logo">
                        <Link to='/'>
                        <img src={logoArb} />
                        </Link>
                    </div>                    
                    <LogOut/>               
                </div>  
            </Container>            
        </div>
    )  
    
}

export default NavMenu;