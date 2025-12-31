import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Login =  (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""});
    let navigate=useNavigate();

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const URL='http://localhost:5000/api/auth/login'
        const response=await fetch(URL,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify({email:credentials.email,password:credentials.password}),
        });
        const json=await response.json()
        console.log(json);
        if(json.success){
            //save the auth token
            localStorage.setItem('token',json.authtoken);
            props.showAlert("Logged In Successfully","success");
            navigate("/");
           
        }
        else{
            props.showAlert("Invalid Credentials","danger");        }
    }

    const onChange=(e)=>{
      setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='my-3'>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="email" name='email' aria-describedby="emailHelp" autoComplete="email" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} name='password' id="password" autoComplete="current-password"  onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
