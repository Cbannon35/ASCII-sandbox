import React, { useState, useEffect, createRef } from "react";
import axios from "axios";
import Header from "./Header";
import "./index.css";
import ArrowUp from "./assets/Vector";
import "animate.css";
import HiddenInput from "./HiddenInput";
import { ImpulseSpinner } from "react-spinners-kit";
import { Configuration, OpenAIApi } from "openai";

import.meta.env.VITE_GPT_KEY;

import { ChatOpenAI } from "langchain/chat_models/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import {
  RequestsGetTool,
  RequestsPostTool,
  AIPluginTool,
} from "langchain/tools";

// export const run = async () => {
//   const tools = [
//     new RequestsGetTool(),
//     new RequestsPostTool(),
//     await AIPluginTool.fromPluginUrl(
//       "https://www.klarna.com/.well-known/ai-plugin.json"
//     ),
//   ];
//   const agent = await initializeAgentExecutorWithOptions(
//     tools,
//     new ChatOpenAI({ temperature: 0 }),
//     { agentType: "chat-zero-shot-react-description", verbose: true }
//   );

//   const result = await agent.call({
//     input: "what t shirts are available in klarna?",
//   });

//   console.log({ result });
// };

// const configuration = new Configuration({
//   apiKey: import.meta.env.VITE_GPT_KEY || "",
// });
// const openai = new OpenAIApi(configuration);

// dotenv.config();

// const openai = new OpenAI(import.meta.env.VITE_GPT_KEY || "");

// require("dotenv").config();
// const apiKey = process.env.REACT_APP_FIGLET_API_KEY;

const App = () => {
  /* header logic + state passed to header */
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [font, setFont] = useState("doom");
  const [showHeader, setShowHeader] = useState(false);
  const [position, setPosition] = useState("left");
  const [wrap, setWrap] = useState(false);
  const [idle, setIdle] = useState(false);

  /* styles based on state */
  const stateStyle = {
    container: {
      width: "100vw",
      height: "100vh",
      backgroundColor: backgroundColor,
      color: textColor,
    },
    headerHover: {
      width: "100%",
      position: "fixed",
      height: "100px",
    },
  };

  /* input logic */
  const [inputArray, setInputArray] = useState<string[]>([""]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  function isInputArrayEmpty() {
    return inputArray.length === 1 && inputArray[0].length === 0;
  }

  /* ascii art logic */
  const [asciiArt, setAsciiArt] = useState("");
  const [asciiMode, setAsciiMode] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [submit, setSubmit] = useState<boolean>(false);

  useEffect(() => {
    if (isInputArrayEmpty() || !submit) return;
    setFetching(true);
    const fetchAsciiArt = async () => {
      // fetch("	https://api.openai.com/v1/chat/completions", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${import.meta.env.VITE_GPT_KEY}`,
      //   },
      //   body: JSON.stringify({
      //     prompt,
      //     max_tokens: 20,
      //     // Add your plugin here
      //     plugins: [
      //       {
      //         id: "Figlet",
      //         // Add any necessary parameters for the plugin
      //         params: {
      //           text: inputArray[0],
      //           font: font,
      //         },
      //       },
      //     ],
      //   }),
      // })
      //   .then((response) => response.json())
      //   .then((data) => console.log(data))
      //   .catch((error) => {
      //     console.error("Error:", error);
      //   });

      console.log("fetching");
      // run();
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };
      const local_url = "http://127.0.0.1:8000" + "?query=" + inputArray[0];
      try {
        const response = await fetch(local_url, requestOptions);
        const output = await response.json().then((data) => data.response);
        console.log("output", output);
        setAsciiMode(true);
        setFetching(false);
        setSubmit(false);
        setAsciiArt(output);
        return output;
      
      } catch (error) {
        console.log("error:", error);
        return null;
      }
    };
    fetchAsciiArt();
    
  }, [submit]);

  /* if user changes input, reset fetched */
  useEffect(() => {
    if (isInputArrayEmpty()) return;
    setAsciiArt("");
    setAsciiMode(false);
    console.log("user typed");
  }, [inputArray]);

  // const handleSubmit = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   setText(text);
  // };

  /* menu logic */
  const menu = ["M", "E", "N", "U"];
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    // console.log(inputArray);
    if (inputArray[0].length !== 0 || inputArray.length !== 1 || showHeader)
      return;
    const interval = setInterval(() => {
      setShowMenu(true);
      const menuTimeout = setTimeout(() => {
        setShowMenu(false);
      }, 3000);
      return () => clearTimeout(menuTimeout);
    }, 6000);
    return () => clearInterval(interval);
  });

  return (
    <div style={stateStyle.container}>
      <div style={styles.content}>
        <HiddenInput
          inputArray={inputArray}
          setInputArray={setInputArray}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          position={position}
          wrap={wrap}
          setIdle={setIdle}
          fetching={fetching}
          asciiMode={asciiMode}
          asciiArt={asciiArt}
        />
      </div>
      <div
        style={styles.menu}
        className={showMenu ? "menu-shown" : "menu-hidden"}
      >
        <ArrowUp style={styles.menuItem} color={textColor} />
        {menu.map((item, key) => (
          <div key={key} style={styles.menuItem}>
            {item}
          </div>
        ))}
      </div>
      <div
        style={stateStyle.headerHover}
        onMouseEnter={() => setShowHeader(true)}
        className={showHeader ? "header-hover-shown" : "header-hover-hidden"}
      />
      <Header
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
        showHeader={showHeader}
        setShowHeader={setShowHeader}
        textColor={textColor}
        setTextColor={setTextColor}
        font={font}
        setFont={setFont}
        position={position}
        setPosition={setPosition}
        wrap={wrap}
        setWrap={setWrap}
      />
      <button style={styles.submit} onClick={() => setSubmit(true)}>
        Submit
      </button>
    </div>
  );
};

const styles = {
  content: {
    padding: "100px",
    display: "flex",
    height: "calc(100% - 210px)",
    width: "calc(100% - 200px)",
    position: "fixed",
    bottom: "0px",
    flexDirection: "column",
  },
  menuItem: {
    marginRight: "0px",
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "0px",
    alignSelf: "center",
    fontSize: "42px",
  },
  menu: {
    position: "fixed",
    right: "0px",
    width: "75px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    paddingTop: "50px",
    paddingRight: "10px",
  },
  submit: {
    position: "fixed",
    bottom: "0px",
    self: "center",
  },
};

export default App;
