import React, { useState } from "react";

export default function App() {
  const [checked, setChecked] = useState({});

  const toggle = (key) => {
    setChecked((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const checklist = [
    "Drone shot",
    "Phone shot",
    "Talking clip",
    "Before/after angle",
    "Script used",
    "Edited",
    "Posted",
  ];

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "Arial, sans-serif",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <h1>S&S Marketing Tracker</h1>
      <p>Use this to plan what to shoot today and check off what got done.</p>

      <div
        style={{
          marginTop: 24,
          padding: 16,
          border: "1px solid #ddd",
          borderRadius: 12,
        }}
      >
        <h2>Today's Plan</h2>
        <ul>
          <li>Drone pull-away reveal</li>
          <li>Walkthrough video with phone gimbal</li>
          <li>Close-up detail shots</li>
          <li>Talking clip explaining the project</li>
        </ul>
      </div>

      <div
        style={{
          marginTop: 24,
          padding: 16,
          border: "1px solid #ddd",
          borderRadius: 12,
        }}
      >
        <h2>Checklist</h2>
        {checklist.map((item) => (
          <button
            key={item}
            onClick={() => toggle(item)}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              marginBottom: 10,
              padding: 12,
              borderRadius: 10,
              border: "1px solid #222",
              background: checked[item] ? "#111" : "#fff",
              color: checked[item] ? "#fff" : "#111",
              cursor: "pointer",
            }}
          >
            {item}
          </button>
        ))}
      </div>

      <div
        style={{
          marginTop: 24,
          padding: 16,
          border: "1px solid #ddd",
          borderRadius: 12,
        }}
      >
        <h2>Script for Today</h2>
        <p>
          “Alright, so today we’re working on [project]. Right now we’re doing
          [task], and this matters because [reason]. Let me show you what’s
          going on.”
        </p>
      </div>
    </div>
  );
}