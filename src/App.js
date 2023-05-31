import "./App.css";
import ParticlesBg from "particles-bg";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import {useState} from "react";

function App() {
  const [input] = useState("");

  const returnRequestOptions = (imageURL) => {
    const PAT = "2ca083bd7a5f47a786f0d591d0d75cdf";
    const USER_ID = "clarifai";
    const APP_ID = "main";
    const MODEL_ID = "general-image-recognition";
    const MODEL_VERSION_ID = "aa7f35c01e0642fda5cf400f543e7c40";
    const IMAGE_URL = imageURL;

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };

    return requestOptions;
  };

  const onInputChange = (e) => {
    console.log(e.target.value);
  };

  const onButtonSubmit = () => {
    fetch(
      `https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`,
      returnRequestOptions(input)
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="App">
      <ParticlesBg type={"cobweb"} color="#FFFFFF" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      {/*
      <FaceRecognition />} */}
    </div>
  );
}

export default App;
