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
    }
  }
  faceLocator = (data) => {
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
    if(this.state.route === 'signout'){
      this.setState({isSignedIn: false})
    }else if(this.state.route === 'home'){
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
    console.log(this.state.input);
   

  //applying clarify api
  //   and this is for nodejs its a hastle to find in js pta ni mughy kya shock tha ai use krny ka

  // stub.PostModelOutputs(
  //   {
  //       model_id: "2f4a0fb341744da4b681de01527bea9f",
  //       version_id: "",  // This is optional. Defaults to the latest model version.
  //       inputs: [
  //           {data: {image: {url: "https://samples.clarifai.com/metro-north.jpg"}}}
  //       ]
  //   },
  //   metadata,
  //   (err, response) => {
  //       if (err) {
  //           throw new Error(err);
  //       }

  //       if (response.status.code !== 10000) {
  //           throw new Error("Post model outputs failed, status: " + response.status.description);
  //       }

  //       // Since we have one input, one output will exist here.
  //       const output = response.outputs[0];

  //       console.log("Predicted concepts:");
  //       for (const concept of output.data.concepts) {
  //           console.log(concept.name + " " + concept.value);


//Trying to use in js

app.models.predict(FACE_DETECT_MODEL, this.state.input)
.then(response => this.faceBox( this.faceLocator(response) ) )
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
         <Rank />
         <ImageLinkForm onInputChange={this.onInputChange} onSubmittion={this.onSubmittion}/>
         <FaceRecogination imageURL={this.state.imageURL} box={this.state.box}/>
       </div>
       :(
         this.state.route === 'signin'
         ?<SignIn onRouteChange={this.onRouteChange} />
         :<Registration onRouteChange={this.onRouteChange} />
       )
       
     }
    </div>
  );
  }
 
}

export default App;
