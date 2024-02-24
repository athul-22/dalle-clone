import { useState } from 'react';
import './App.css';

const App = () => {

  const [prompt, setPrompt] = useState('');
  const [imgurl, setImgurl] = useState('');

  const generateImages = async () => {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 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"
        },
        body: JSON.stringify({
          prompt: prompt,
          n: 1,
          size: "512x512"
        }),
      });

      const data = await response.json();
      console.log(data);

      // Assuming data contains the URL of the generated image
      setImgurl(data.data[0].url);

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <section className='search-section'>
        <p>Start with detailed description <span className='magic-prompt'>Magic prompt</span></p>
        <div className='input-container'>
          <input type='text' placeholder='Type something...' value={prompt} onChange={(e) => setPrompt(e.target.value)} />
          <button onClick={generateImages}>Generate</button>
        </div>
      </section>
      <section className='image-section'>
        <img src={imgurl} height="512" width="512" alt="" />
      </section>
    </div>
  );
}

export default App;
