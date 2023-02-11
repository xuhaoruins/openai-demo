import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [TextInput, setTextInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatMsg: TextInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setTextInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI ChatGPT Demo</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>ChatGPT Demo</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="chatMsg"
            placeholder="请输入..."
            value={TextInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <input type="submit" value="生成内容" />
        </form>
        <h4>内容生成会花费数十秒时间，请耐心等待。</h4>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
