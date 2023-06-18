import React, { useState, useEffect } from "react";
import "./index.css";

interface HeaderProps {
  backgroundColor: string;
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
  showHeader: boolean;
  setShowHeader: React.Dispatch<React.SetStateAction<boolean>>;
  textColor: string;
  setTextColor: React.Dispatch<React.SetStateAction<string>>;
  font: string;
  setFont: React.Dispatch<React.SetStateAction<string>>;
  position: string;
  setPosition: React.Dispatch<React.SetStateAction<string>>;
  wrap: boolean;
  setWrap: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = (props: HeaderProps) => {
  const {
    backgroundColor,
    setBackgroundColor,
    showHeader,
    setShowHeader,
    textColor,
    setTextColor,
    font,
    setFont,
    position,
    setPosition,
    wrap,
    setWrap,
  } = props;

  const stateStyles = {
    header: {
      height: "100px",
      width: "100%",
      borderBottom: `1px solid ${textColor}`,
      fontSize: "20px",
      fontWeight: 600,
      zIndex: 1000,
      position: "fixed",
    },
  };

  const handleTextColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextColor(event.target.value);
  };

  const handleBackgroundColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBackgroundColor(event.target.value);
  };

  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFont(event.target.value);
  };

  const handlePositionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPosition(event.target.value);
  };

  const handleWrapChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWrap(!wrap);
  };

  return (
    <div
      style={stateStyles.header}
      className={showHeader ? "header-shown" : "header-hidden"}
    >
      <div style={styles.boundContent}>
        <div>
          TEXT COLOR
          <input
            type="color"
            value={textColor}
            onChange={handleTextColorChange}
            id="textColor"
          />
        </div>
        <div>
          BACKGROUND COLOR
          <input
            type="color"
            value={backgroundColor}
            onChange={handleBackgroundColorChange}
            id="backgroundColor"
          />
        </div>
        <div>
          FONT
          <select
            value={font}
            onChange={handleFontChange}
            style={{ color: textColor }}
            id="font"
          >
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Verdana">Verdana</option>
            {/* Add more font options as needed */}
          </select>
        </div>
        <div>
          POSITION
          <select
            value={position}
            onChange={handlePositionChange}
            style={{ color: textColor }}
            id="position"
          >
            <option value="center">Center</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
            {/* Add more position options as needed */}
          </select>
        </div>
        <div>
          WRAP
          <input
            type="checkbox"
            checked={wrap}
            onChange={handleWrapChange}
            id="wrap"
          />
        </div>
        <div
          onClick={() => setShowHeader(false)}
          style={{ color: textColor, fontWeight: 600, cursor: "pointer" }}
        >
          EXIT
        </div>
      </div>
    </div>
  );
};

const styles = {
  boundContent: {
    height: "100%",
    width: "calc(100% - 50px)",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    display: "flex",
  },
};

export default Header;
