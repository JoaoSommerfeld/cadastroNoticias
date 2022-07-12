import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { AuthProvider, AuthContext } from '../contexts/auth';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import NotFound from '../pages/NotFound';
import AddNoticias from '../pages/AddNoticias';
import NavMenu from '../components/NavMenu';
import Footer from '../components/Footer';

const AppRoutes = () => {   
    const Private = ({children}) => {
        const { authenticated, loading } = useContext(AuthContext)

        if (loading) {
            return(
                <div>Carregando...</div>
            )
        }

        if(!authenticated){
            return <Navigate to='/login'/>
        }

        return children
    }    
    
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/' element={
                        <Private>
                            <NavMenu/>
                            <HomePage/>
                            <Footer/>
                        </Private>} 
                    />
                    <Route path='/add' element={
                        <Private>
                            <NavMenu/>
                            <AddNoticias/>
                            <Footer/>
                        </Private>} 
                    />
                    <Route path='*' element={
                    <Private>
                        <NotFound/>
                    </Private>} />
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default AppRoutes;