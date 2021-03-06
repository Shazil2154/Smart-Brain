import { Component } from "react";

class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            registerName:'',
            registerEmail:'',
            registerPassword:''
        }
    }
    onNameChange = (event) => {
        this.setState({
            registerName: event.target.value
        })
    }
    onEmailChange = (event) => {
        this.setState({
            registerEmail: event.target.value
        })
    }
    onPasswordChange = (event) => {
        this.setState({
            registerPassword: event.target.value
        })
    }

    onSubmit = () =>{
        fetch('http://localhost:3001/register',{
            method: 'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name: this.state.registerName,
                email: this.state.registerEmail,
                password: this.state.registerPassword
            })
        })
        .then(res => res.json())
        .then(user => {
            if(user){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }else{
                alert('there was an error while signing you up');
            }
        })
    }
    render(){
        const {onRouteChange} = this.props;
        return(
        <div>
         <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f6" for="name">Name</label>
                        <input
                         className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                         type="text" 
                         name="name" 
                         id="name"
                         onChange={this.onNameChange}
                        />
                        </div>

                        <div className="mv3">
                        <label className="db fw6 lh-copy f6" for="email-address">Email</label>
                        <input
                         className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                         type="email" 
                         name="email-address" 
                         id="email-address"
                         onChange={this.onEmailChange}
                        />
                        </div>

                     <div className="mv3">
                        <label className="db fw6 lh-copy f6" for="password">Password</label>
                        <input
                         className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                         type="password" 
                         name="password" 
                         id="password"
                         onChange={this.onPasswordChange}
                        />
                    </div>
                    </fieldset>
                    <div className="">
                    <input
                     className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                     type="submit" 
                     value="Register" 
                     onClick={this.onSubmit} 
                    />
                    </div>
                    <div className="lh-copy mt3">
                    <a
                     href="#0" 
                     className="f6 link dim black db" 
                     onClick = { () => onRouteChange('signin') }
                     >Sign In</a>
                    </div>
                </div>
            </main>
         </article>
        </div>
    );
    }
    
}
export default Register;