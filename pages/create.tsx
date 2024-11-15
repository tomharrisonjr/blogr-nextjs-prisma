import React, { useState } from "react";
import Layout from '../components/Layout';
import Router from "next/router";

const Draft: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            required
          />
          <textarea
            cols={50}
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            required
          />
          <input disabled={!content || !title} type="submit" value="Create"/>
          <a className="back" href="#" onClick={() => Router.push('/')}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        h1 {
          text-align: center;
        }
        form {
          width: 100%;
          max-width: 500px;
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
        }
        input,
        textarea {
          margin-bottom: 1rem;
          padding: 0.5rem;
          border-radius: 0.25rem;
          border: 1px solid #dcdcdc;
          font-size: 1rem;
        }
        input[type="submit"] {
          background: #0070f3;
          color: white;
          cursor: pointer;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;