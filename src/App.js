import "./App.css";
import ParticlesBg from "particles-bg";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import {trackPromise} from "react-promise-tracker";
import {useState} from "react";

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    setBox(box);
  };

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const onPictureSubmit = () => {
    setImageUrl(input);
    trackPromise(
      fetch("https://smart-brain-backend-b21u.onrender.com/imageurl", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({input}),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result) {
            fetch("https://smart-brain-backend-b21u.onrender.com/image", {
              method: "PUT",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({
                id: user.id,
              }),
            })
              .then((res) => res.json())
              .then((count) => {
                setUser({...user, entries: count});
              })
              .catch((err) => console.log(err));
          }
          displayFaceBox(calculateFaceLocation(result));
        })
        .catch((error) => console.log("error", error))
    );
  };

  const clearState = () => {
    setIsSignedIn(false);
    setImageUrl("");
    setBox({});
    setInput("");
    setUser({
      id: "",
      name: "",
      email: "",
      entries: 0,
      joined: "",
    });
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      clearState();
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  return (
    <div className="App">
      <ParticlesBg type={"cobweb"} color="#FFFFFF" bg={true} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === "home" ? (
        <div>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onPictureSubmit={onPictureSubmit}
          />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </div>
      ) : route === "signin" || route === "signout" ? (
        <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;
