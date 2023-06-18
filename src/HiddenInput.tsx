import React, { useState, useEffect } from "react";
import "./index.css";

interface HiddenInputProps {
  inputArray: string[];
  setInputArray: React.Dispatch<React.SetStateAction<string[]>>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  position: string;
  wrap: boolean;
  setIdle: React.Dispatch<React.SetStateAction<boolean>>;
  fetching: boolean;
  asciiMode: boolean;
  ascii: string;
}

const HiddenInput = (props: HiddenInputProps) => {
  const {
    inputArray,
    setInputArray,
    currentIndex,
    setCurrentIndex,
    position,
    wrap,
    setIdle,
    fetching,
    asciiMode,
    ascii,
  } = props;

  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());

  const handleInteraction = () => {
    setLastInteractionTime(Date.now());
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      handleInteraction();

      if (key === "Backspace") {
        event.preventDefault();
        handleBackspace();
      } else if (key === "Enter") {
        event.preventDefault();
        handleEnter();
      } else if (key === "Shift") {
        event.preventDefault();
      } else if (key === "Meta") {
        event.preventDefault();
      } else {
        setInputArray((prevArray) => {
          const currentString = prevArray[currentIndex] || "";
          const updatedString = currentString + key;
          return [...prevArray.slice(0, currentIndex), updatedString];
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex]);

  // useEffect(() => {
  //   const checkIdleTime = setInterval(() => {
  //     const currentTime = Date.now();
  //     const idleTime = currentTime - lastInteractionTime;
  //     const idleThreshold = 5000; // 5 seconds

  //     if (idleTime > idleThreshold) {
  //       // User is idle
  //       console.log("User is idle");
  //       setIdle(true);
  //     }
  //   }, 1000); // Check every second

  //   const resetTimer = () => {
  //     setLastInteractionTime(Date.now());
  //   };

  //   window.addEventListener("keydown", resetTimer);
  //   window.addEventListener("mousedown", resetTimer);

  //   return () => {
  //     clearInterval(checkIdleTime);
  //     window.removeEventListener("keydown", resetTimer);
  //     window.removeEventListener("mousedown", resetTimer);
  //   };
  // }, [lastInteractionTime]);

  const handleBackspace = () => {
    setInputArray((prevArray) => {
      const currentString = prevArray[currentIndex] || "";
      if (currentString.length > 0) {
        const updatedString = currentString.slice(0, -1);
        return [...prevArray.slice(0, currentIndex), updatedString];
      } else if (currentIndex > 0) {
        setCurrentIndex((prevIndex) => prevIndex - 1);
        return prevArray.slice(0, -1);
      } else {
        return prevArray;
      }
    });
  };

  const handleEnter = () => {
    setInputArray((prevArray) => {
      const currentString = prevArray[currentIndex] || "";
      if (currentString.length > 0) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        return [...prevArray, ""];
      } else {
        return prevArray;
      }
    });
  };

  useEffect(() => {
    console.log(wrap);
  }, [wrap]);

  function render() {
    if (inputArray.length === 1 && inputArray[0].length === 0) {
      console.log("empty array render");
      return <span className="prompt">Type something...</span>;
    }
    if (fetching) {
      console.log("fetching render");
      return <span className="prompt">Fetching...</span>;
    }
    if (asciiMode) {
      console.log("ascii render");
      return <pre>I will be ascii</pre>;
    } else {
      console.log("normal render");
      return inputArray.map((item, key) => (
        <div
          key={key}
          style={{
            display: "flex",
            justifyContent: position,
            flexWrap: wrap ? "wrap" : "nowrap",
          }}
        >
          {item}
          {/* {key === currentIndex && (
              <span className="blinking-cursor"></span>
            )} */}
          <br />
        </div>
      ));
    }
  }

  return <>{render()}</>;
};

export default HiddenInput;
