import React, { useState } from 'react'
import { Button, Card, TextField, Typography } from '@mui/material';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username.trim() === '' || password.trim() === '') {
            alert("Wrong Username or Password")
            return
        }
        const response = await axios.post(`http://192.168.1.114:3000/signin`, {
            "nom": username,
            "mdp": password
        })
        const data = response.data
        if (data === "Authentification réussie") {
            window.location.href = "/view";
        } else {
            alert("Wrong Username/Password")
        }
    };
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
            }}
        >
            <Card sx={{ maxWidth: 450, padding: 0.5 }}>
                <Typography style={{ display: 'flex', flexDirection: 'column', width: '350px', textAlign: 'center', marginBottom: '10px', padding: '20px', }}>
                    <h2>Login CDR</h2> <br />
                    <TextField size="small" label="Username" type="text" name="username" value={username} onChange={handleUsernameChange} />
                    <TextField style={{ marginTop: '20px' }} size="small" label="Password" type="password" name="password" value={password} onChange={handlePasswordChange} />
                    <Button style={{ marginTop: '20px' }} type="submit" onClick={handleSubmit} variant='contained'>Login</Button>
                </Typography>
            </Card>
        </div>
    )
}

export default Login;