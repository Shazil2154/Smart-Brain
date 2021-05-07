import React,{ Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecogination from './components/FaceRecogination/FaceRecogination';
import SignIn from './components/SignIn/SignIn';
import Registration from './components/Registration/Registration';
import Particles from 'react-particles-js';
import 'tachyons';
import Clarifai, { FACE_DETECT_MODEL } from 'clarifai';
const app = new Clarifai.App({
  apiKey: 'b91e5fa7922f41d8807a800f4d819a42'
});

const particleOptions={
particles: {
  number:{
    value:100,
    density:{
      enable:true,
      value_area:800
    }
  }
}
}
class App extends Component {
  constructor(){
    super();
    this.state={
      input:'',
      imageURL:'',
      box:{},
      route: 'signin',
      isSignedIn: false,
      user:{
        id: "",
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

 loadUser = (data) => {
   this.setState({
     user:{
       id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
     }}
   )
 }
  faceLocator = (data) => {
  
    const c = data.outputs[0].data.regions.map(region => {
      return region.region_info.bounding_box
    })
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById('inputImg');
    const width = Number(img.width);
    const height = Number(img.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)

    }
  }
  faceBox = (box) => {
    console.log(box);
    this.setState({
      box: box
    })
  }
  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({isSignedIn: false})
    }else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
  onInputChange= (event) => {
    this.setState({input:event.target.value,})
  }
  onSubmittion= () => {
    this.setState({
      imageURL: this.state.input
    })
    app.models
    .predict(FACE_DETECT_MODEL, this.state.input)
    .then(response => {
      if(response){
        //fetching to upadte the entries
        fetch('http://localhost:3001/image',{
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response=> response.json())
        .then(count =>{
          this.setState(Object.assign(this.state.user, { entries: count}))
          console.log(this.state.user)
        })
      }
      this.faceBox( this.faceLocator(response) )
    })
    .catch(err => console.log(err))
 }   

  render(){
     return (
    <div className="App">
      <Particles className='particles'
              params={particleOptions}
            />
     <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
     {this.state.route === 'home'
       ?<div>
         <Logo />
         <Rank
          name={this.state.user.name} 
          entries={this.state.user.entries}
        />
         <ImageLinkForm onInputChange={this.onInputChange} onSubmittion={this.onSubmittion}/>
         <FaceRecogination imageURL={this.state.imageURL} box={this.state.box}/>
       </div>
       :(
         this.state.route === 'signin'
         ?<SignIn
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
         />
         :<Registration
            onRouteChange={this.onRouteChange}
            loadUser = {this.loadUser}
        />
       )
       
     }
    </div>
  );
  }
 
}

export default App;
