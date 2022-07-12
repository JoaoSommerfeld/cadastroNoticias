import React, { useContext } from 'react';
import { Button } from '@mui/material';

import './logout.css'
import { AuthContext } from '../../contexts/auth';

const LogOut = () => {

    const user = JSON.parse(localStorage.getItem('user'))
    const { authenticated, logout } = useContext(AuthContext)

    const handleLogout = () => {
        logout()
    }

    return (
        <div className="logout">
            {user.user?.email}
            <Button className="button-logout" variant="outlined" onClick={handleLogout}>Sair</Button>
        </div>    
    )

}

export default LogOut;