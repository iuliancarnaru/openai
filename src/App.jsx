import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import "./App.css";

function App() {
  const [textInput, setTextInput] = useState("");
  const [apiData, setApiData] = useState("");

  async function fetchData(textInput) {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SOME_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-instruct",
        prompt: textInput,
        max_tokens: 100,
        temperature: 0,
      }),
      // body: JSON.stringify({
      //   model: "gpt-3.5-turbo",
      //   messages: [{ role: "user", content: "Hello" }],
      //   max_tokens: 100,
      // }),
    };

    try {
      const res = await fetch("https://api.openai.com/v1/completions", options);
      // const res = await fetch(
      //   "https://api.openai.com/v1/chat/completions",
      //   options
      // );

      const data = await res.json();
      setApiData(data.choices[0].text);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    // fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData(textInput);
  };

  return (
    <>
      <h1>OpenAPI example</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <label style={{ display: "block" }} htmlFor="textInput">
          Please enter your prompt:
        </label>
        <textarea
          id="textInput"
          name="textInput"
          rows="4"
          cols="50"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        ></textarea>
        <button style={{ display: "block" }} type="submit">
          Generate
        </button>
      </form>
      <h2>Suggestions:</h2>
      <div style={{ textAlign: "left" }}>
        <Markdown>{apiData}</Markdown>
      </div>
    </>
  );
}

export default App;
