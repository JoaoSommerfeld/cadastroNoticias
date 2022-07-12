import React, { useEffect, useState } from 'react';
import { app } from '../../util/firebase';
import { getDatabase, get, ref, child, remove  } from "firebase/database";
import { Card, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import {Stack, Snackbar, Alert} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';

import './lista.css';

const ListaNoticias = () => { 
    const db = getDatabase(app);
    const dbRef = ref(getDatabase(app));
    const [listaNoticias, setListaNoticias] = useState('')
    const noticiasObjeto = Object.values(listaNoticias);
    const chave = Object.keys(listaNoticias);    
    const [valor, setValor] = useState('');
    const [abrirDialogo, setAbrirDialogo] = React.useState(false); 
    const [openAlert, setOpenAlert] = React.useState(false);
    const contador = chave.length

    console.log('cont')

    useEffect(() => {
        dadosBanco()        
    }, [])

    const dadosBanco = () => {
        get(child(dbRef, `${process.env.REACT_APP_bancoDados}`)).then((snapshot) => {
        if (snapshot.exists()) {
            const dados = snapshot.val()
            setListaNoticias(dados)
        } else {
            alert("Sem registros no banco. Para adicionar uma nova notícia, clique no botão 'Novo'. ");
        }
        }).catch((error) => {
            console.error(error);
            alert("Erro ao conectar com o banco de dados. ");
        
        })
    }

    const handleAbrirDialogo = (chave) => {
        setValor(chave);
        setAbrirDialogo(true);
    }
    
    const handleFecharDialogo = (value) => {
        if(value.target.id == "sim"){
            remove(ref(db, `${process.env.REACT_APP_bancoDados}/` + valor))                        
            .then(() => {
                dadosBanco()
                handleAlert()       
            })
            .catch((error) => {
                console.log("Erro ao excluir o conteúdo. Erro:" + error)
            }); 
            return setAbrirDialogo(false);
        }
        setAbrirDialogo(false);
    }

    const handleAlert = () => {
        setOpenAlert(true);
    };
    
    const handleCloseAlert = (event, reason) => {
        setOpenAlert(false);
    };

    return (
        <div className="listaNoticias"> 
            <div className="cadastrar"> 
                <div className="itens-lista">
                    <p className="num-noticias">Quantidade: <strong> { contador } </strong></p>
                    <Link to="/add">
                        <Button className="btn-add" variant="contained" size="large" color="success" endIcon={<AddCircleOutlineIcon />}>
                                Novo  
                        </Button>
                    </Link>
                </div>
                <hr/>
            </div>
            <ul>
                {
                    noticiasObjeto.map((item, indice) => (
                        <Card className="card" key={indice}>
                            <li key={indice}>
                                <Button className="btn-remove"  onClick={handleAbrirDialogo.bind(this, chave[indice])} >
                                    <DeleteOutlineIcon/>
                                </Button>
                                <p><strong>IdBanco: </strong>{chave[indice]}</p>
                                <p><strong>Data:</strong> {item.data}</p>
                                <p><strong>Descrição:</strong> {item.descricao}</p>
                                <p><strong>Link:</strong><a href={item.link} target="_blank"> {item.link} </a></p>
                            </li>
                        </Card>
                    ))
                }
            </ul>

            <Dialog key={0}
                open={abrirDialogo}
                onClose={handleFecharDialogo}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className="dialog-header">
                    {"Atenção!"}
                </DialogTitle>

                <DialogContent className="dialog-body">
                    <DialogContentText id="alert-dialog-description">
                        Você gostaria de apagar esse registro no banco de dados?

                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleFecharDialogo}>Cancela</Button>
                    <Button onClick={handleFecharDialogo} autoFocus id="sim"  > Sim </Button>
                </DialogActions>
            </Dialog> 

            <Stack spacing={2} sx={{ width: '100%' }} >
                <Snackbar open={openAlert} autoHideDuration={2000}  onClose={handleCloseAlert} >
                    <Alert variant="filled" onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }} >
                        Menssagem removida. 
                    </Alert>
                </Snackbar>
            </Stack>

        </div>
    )

}

export default ListaNoticias;