import { useState } from 'react'
import { Box } from '@mui/material'                       
import { Stack } from '@mui/material'                      
import { Typography } from '@mui/material'                
import { TextField } from '@mui/material'              
import { Button, IconButton } from '@mui/material'       
import { FormControlLabel, Checkbox, FormControl } from '@mui/material' 
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

const Login = () => {

  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [remember, setRemember] = useState(false)   

  
    const handleRemember = (event) => {
        const idx = remember.indexOf(event.target.value)
       
        if (idx === -1)
            setRemember(false)
        else
            setRemember(true);
    }

    const handleSubmit = () => {
        console.log({ email, password, remember })
        alert(`Logging in as: ${email}`)
    }

    return (
      
        <Box
            component="section"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f5f5f5',
            }}
        >
         
            <Box
                sx={{
                    backgroundColor: 'white',
                    borderRadius: 3,
                    padding: 4,
                    width: '100%',
                    maxWidth: 420,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
            >
               
                <Stack spacing={3}>

               
                    <Typography variant="h4" color="error" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        MOVIES
                    </Typography>

                    <Typography variant="subtitle1" sx={{ textAlign: 'center', color: 'gray' }}>
                        Sign in to your account
                    </Typography>

           
                    <TextField
                        label="Email Address"
                        variant="outlined"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />

                  
                    <TextField
                        label="Password"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                )
                            }
                        }}
                    />

              
                    <FormControl>
                        <FormControlLabel
                            onChange={handleRemember}
                            value="remember"
                            control={<Checkbox color="error" />}
                            label="Remember me"
                        />
                    </FormControl>

                    
                    <Button
                        variant="contained"
                        color="error"
                        size="large"
                        fullWidth
                        onClick={handleSubmit}
                    >
                        Sign In
                    </Button>

                    <Button
                        variant="outlined"
                        color="error"
                        size="large"
                        fullWidth
                        onClick={() => window.location.href = '/register'}
                    >
                        Don't have an account? Register
                    </Button>

                    
                    <Typography variant="body2" sx={{ textAlign: 'center', color: 'gray' }}>
                        By signing in you agree to our Terms of Service
                    </Typography>

                    <Typography variant="caption" sx={{ textAlign: 'center', color: 'gray', display: 'block' }}>
                        © 2025 Movies. All rights reserved.
                    </Typography>

                </Stack>
            </Box>
        </Box>
    )
}



export default Login