import React, { useState,useEffect } from 'react'
import { Grid, Container, Paper, Avatar, Typography, TextField, Button, CssBaseline,Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
//import fondo from './assets/images/fondo'
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'
import axios from 'axios'
import md5 from 'md5'
import Cookies from 'universal-cookie'

const baseurl = 'http://localhost:3001/usuarios'
const cookies = new Cookies()

const useStyles = makeStyles(theme => ({
  root: {
		//backgroundImage: `url(${fondo})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundColor: 'white',
		height: '100vh'
	},
	container: {
		opacity: '0.8',
		height: '60%',
		marginTop: theme.spacing(10),
		[theme.breakpoints.down(400 + theme.spacing(2) + 2)]: {
			marginTop: 0,
			width: '100%',
			height: '100%'
		}
	},
	div: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1)
	},
	button: {
		margin: theme.spacing(3, 0, 2)
	}
}))

function App() {

  const [body, setBody] = useState({ nickname: '', password: '' })
	const classes = useStyles()


	const handleChange = e => {
		setBody({
			...body,
			[e.target.name]: e.target.value
		})
	}
    //Esto se encargará de que si ya se esta logueado se vuelva a entrar y no poder logearse doblemente
   /*  useEffect(() => {
        if(cookies.get('username')){
            window.location.href="./menu";
        }
        
    },[]) */

	const onSubmit = () => {
		console.log(body)
        //aca se verifica si el usuario y contraseña con correctos
        /* axios.get(baseurl, {params: {username: body.nickname, password: md5(body.password)}}).then(response =>{
            console.log(response.data)
            return response.data
        })
        .then(response =>{
            if(response.length > 0){
                var respuesta = response[0];
                cookies.set('id', respuesta.id, {path: "/"});
                cookies.set('apellido_paterno', respuesta.apellido_paterno, {path: "/"});
                cookies.set('apellido_materno', respuesta.apellido_materno, {path: "/"});
                cookies.set('nombre', respuesta.nombre, {path: "/"});
                cookies.set('username', respuesta.username, {path: "/"});
                alert(`Bienvenido ${respuesta.nombre} ${respuesta.apellido_paterno}`);
                window.location.href="./menu";
            }else{
                alert('El usuario y password no son correctos')
            }
        })
        .catch(error =>{
            console.log(error)
        }) */
        window.location.href="./admin/pedidos";
	}

  return (
    <Grid container component = 'main' className={classes.root}>
		<CssBaseline />
		<Container component={Paper} elevation={5} maxWidth='xs' className={classes.container}>
			<div className={classes.div}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>Sign In</Typography>
				<form className={classes.form}>
						<TextField
							fullWidth
							autoFocus
							color='primary'
							margin='normal'
							variant='outlined'
							label='Nickname'
							name='nickname'
							value={body.nickname}
							onChange={handleChange}
						/>
						<TextField
							fullWidth
							type='password'
							color='primary'
							margin='normal'
							variant='outlined'
							label='Password'
							name='password'
							value={body.password}
							onChange={handleChange}
						/>
						<Button
							fullWidth
							variant='contained'
							color='secondary'
							className={classes.button}
							onClick={() => onSubmit()}
						>
							Sign In
						</Button>
					</form>
			</div>
		</Container>
      
    </Grid>
  );
}

export default App;