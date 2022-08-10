import React, {useState} from 'react';


function LoginForm( {Login, }) {
    const [details, setDetails] = useState({name: "", password: ""})
    const submitHandler = e => {
        e.preventDefault();
        Login(details)
    }
    return (
        <form onSubmit={submitHandler()}>
            <div className="login-form">
                <div className="row">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" onChange={e => setDetails({...details,name:e.target.value})} value={details.name} />
                </div>
                <div className="row">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" password="password" onChange={e => setDetails({...details,name:e.target.value})} value={details.name}/>
                </div>
                <input type="submit" className="btn btn-primary"/>
            </div>
        </form>
    )
}

export default LoginForm