import React, { useState } from 'react';
import { Container, TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { getDatabase, ref, set } from "firebase/database";
import { app } from '../../util/firebase';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './Add.css'

const AddNoticias = () => {
    const [id, setId] = useState('')
    const [data, setData] = useState('')
    const [descricao, setDescricao] = useState('')
    const [link, setLink] = useState('')
    const [tipo, setTipo] = useState('')
    const [open, setOpen] = useState(false);
    const navigate = useNavigate() 

    function enviarBanco({id, data, descricao, link, tipo}){
        const db = getDatabase(app);
        set(ref(db, 'noticias/' + id), {
            data: data,
            descricao: descricao,
            link : link,
            tipo: tipo
          })
          handleClickOpen()
    } 

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);     
        retornarHome()  
      };

      function retornarHome(){
        navigate('/')
      }
    
    return(
        <div className="formulario">
            <Container>
                <h1>Cadastrar Notícia</h1>
                <div className="voltar">                    
                    <Link to='/'>
                        <Button className="btn-back" variant="contained" size="large" color="secondary" endIcon={<ArrowBackIcon />}>
                                Voltar
                        </Button>
                    </Link>
                    
                    <hr/>
                </div>

                <form onSubmit={(event) => {
                    event.preventDefault()
                    enviarBanco({id, data, descricao, link, tipo})  
                    setId('')
                    setData('')
                    setDescricao('')
                    setLink('')
                    setTipo('')
                }}>

                <TextField 
                    value={id}
                    onChange={event => {                        
                        setId(event.target.value)
                        }
                    }
                    id="id" 
                    label="Id" 
                    variant="outlined"
                    margin="normal"
                    type="number"
                    fullWidth 
                    required
                />

                <TextField 
                    value={data}
                    onChange={event => {                        
                        setData(event.target.value)
                        }
                    }
                    id="data" 
                    label="Data" 
                    variant="outlined"
                    margin="normal"
                    fullWidth 
                    required
                />

                <TextField 
                    value={descricao}
                    onChange={event => {                        
                        setDescricao(event.target.value)
                        }
                    }
                    id="descricao" 
                    label="Descrição da notícia" 
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth 
                    margin="normal"
                    required
                />

                <TextField 
                    value={link}
                    onChange={event => {                        
                        setLink(event.target.value)
                        }
                    }
                    id="link" 
                    label="Link" 
                    variant="outlined"
                    margin="normal"
                    fullWidth 
                    required
                />

                <TextField 
                    value={tipo}
                    onChange={event => {                        
                        setTipo(event.target.value)
                        let valor = event.target.value
                                if(valor !== 0 || valor == 0 ){
                                    valor = 0
                                }
                                setTipo(valor)
                        }
                    }
                    id="tipo" 
                    label="Tipo" 
                    variant="outlined"
                    margin="normal"
                    fullWidth 
                    required
                />

                <Button type="submit" variant="contained" color="primary" size="large" className="send" >Cadastrar</Button>
                </form>
            </Container>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Notícia Cadastrada."}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        A notícia foi incluida com sucesso. 
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}> OK </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddNoticias;