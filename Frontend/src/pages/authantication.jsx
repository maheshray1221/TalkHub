import { TextField, Button, Avatar, Snackbar, Box } from "@mui/material";
import { useContext, useState } from "react";
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import { AuthContext } from "../contexts/AuthContext";
export default function Authentication() {

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [formState, setFormState] = useState(0);
  // snak open
  const [open, setOpen] = useState(false);

  const { handleRegister, handleLogin } = useContext(AuthContext)
  const handleAuth = async () => {
    try {
      if (formState === 0) {
        let result = await handleLogin(username, password)
        console.log("result",result)
      }
      if (formState === 1) {
        let result = await handleRegister(name, username, password)
        console.log("result = ", result)
        setMessage(result)
        setOpen(true)
        setUsername("")
        setError("")
        setFormState(0)
        setPassword("")
      }
    } catch (err) {
      let message = err.message || "somthing went wrong"
      setError(message)
    }
  }


  return (
    <>

      <Box className="flex justify-center mb-4" >
        <Avatar alt="Remy Sharp"  >
          <LockOutlineIcon />
        </Avatar>
      </Box>
      <Box className="flex justify-center ">
        <Button variant={formState === 0 ? "contained" : "outlined"} onClick={() => setFormState(0)}>SIGN IN</Button>
        <Button variant={formState === 1 ? "contained" : "outlined"} onClick={() => setFormState(1)}>SIGN UP</Button>
      </Box>
      <Box component="form"
        className="flex flex-col items-center gap-8">
        {
          formState === 1 ?
            <TextField
              required
              margin="normal"
              id="fullName"
              label="FullName"
              variant="standard"
              name="name"
              value={name}
              autoComplete="name"
              autoFocus
              onChange={(e) => setName(e.target.value)} /> : <></>
        }


        <TextField required
          margin="normal"
          id="Username"
          label="Username"
          variant="standard"
          name="username"
          value={username}
          autoComplete="username"
          autoFocus
          onChange={(e) => setUsername(e.target.value)} />

        <TextField required
          margin="normal"
          id="Password"
          label="Password"
          variant="standard"
          name="password"
          value={password}
          type="password"
          autoComplete="password"
          autoFocus
          onChange={(e) => setPassword(e.target.value)} />
      </Box>
      <p className="flex justify-center text-red-500 ">{error}</p>
      <Box className="flex justify-center ">

        <Button variant="contained"
          type="button"
          onClick={handleAuth}>
          {formState === 0 ? "Log In" : "Register"}</Button>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        message={message}
      />
    </>
  );
}



