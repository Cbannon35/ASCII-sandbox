import React, { useState, useEffect } from "react";
import axios from "axios";

// require("dotenv").config();
// const apiKey = process.env.REACT_APP_FIGLET_API_KEY;

const App = () => {
  const [backgroundColor, setBackgroundColor] = useState("red");
  const [textColor, setTextColor] = useState("white");
  const [text, setText] = useState("heheh");
  const [asciiArt, setAsciiArt] = useState("");
  const [font, setFont] = useState("doom");
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const fetchAsciiArt = async () => {
      try {
        const response = await axios.post("https://figlet-api-endpoint", {
          text: text,
          font: font,
        });

        if (response.data.status === "success") {
          setAsciiArt(response.data.ascii);
        } else {
          console.error("Failed to fetch ASCII art");
        }
      } catch (error) {
        console.error("An error occurred while fetching ASCII art:", error);
      }
    };

    fetchAsciiArt();
  }, [text, font]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setText(text);
  };

  return (
    <div>
      <h1>ASCII Art Generator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <pre style={{ color: textColor, backgroundColor: backgroundColor }}>
        {asciiArt}
      </pre>
    </div>
  );
};

export default App;
