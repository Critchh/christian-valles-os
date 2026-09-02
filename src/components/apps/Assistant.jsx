import { useEffect, useRef, useState } from "react";

function Assistant({ initialQuestion = "" }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text:
        "Hi. I’m the Christian Valles OS Portfolio Assistant. Ask me about Christian’s projects, skills, education, certifications, or experience.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);
  const initialQuestionRef = useRef("");

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async (question = input) => {
    const cleanedQuestion = question.trim();

    if (!cleanedQuestion || loading) {
      return;
    }

    const userMessage = {
      role: "user",
      text: cleanedQuestion,
    };

    /*
      IMPORTANT:
      messages currently contains the PREVIOUS conversation.

      We send that old conversation as history,
      then send cleanedQuestion separately as the new message.
    */
    const previousHistory = messages
      .filter((_, index) => index !== 0)
      .slice(-8)
      .map((message) => ({
        role: message.role,
        text: message.text,
      }));

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message: cleanedQuestion,
          history: previousHistory,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Assistant request failed."
        );
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          text: data.reply,
        },
      ]);
    } catch (error) {
      console.error(
        "CVOS Assistant error:",
        error
      );

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          text:
            "I’m having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cleanedQuestion = initialQuestion.trim();
    if (!cleanedQuestion || initialQuestionRef.current === cleanedQuestion) return;
    initialQuestionRef.current = cleanedQuestion;
    sendMessage(cleanedQuestion);
  }, [initialQuestion]);

  const quickQuestions = [
    "What are your best projects?",
    "What Python experience do you have?",
    "What are your technical skills?",
    "Tell me about your education.",
  ];

  return (
    <div className="assistant-app">

      <div className="assistant-header">
        <p className="app-eyebrow">
          PORTFOLIO INTELLIGENCE
        </p>

        <h1>AI Assistant</h1>

        <p>
          Ask about my projects, skills,
          education, certifications, and
          experience.
        </p>
      </div>


      <div className="assistant-quick-actions">
        {quickQuestions.map((question) => (
          <button
            key={question}
            onClick={() =>
              sendMessage(question)
            }
            disabled={loading}
          >
            {question}
          </button>
        ))}
      </div>


      <div className="assistant-chat">

        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={
              message.role === "user"
                ? "assistant-message user-message"
                : "assistant-message ai-message"
            }
          >
            <span>
              {message.role === "user"
                ? "YOU"
                : "CVOS"}
            </span>

            <p>{message.text}</p>
          </div>
        ))}


        {loading && (
          <div className="assistant-message ai-message">
            <span>CVOS</span>

            <div className="typing-indicator">
              <i></i>
              <i></i>
              <i></i>
            </div>
          </div>
        )}


        <div ref={chatEndRef}></div>

      </div>


      <div className="assistant-input-area">

        <input
          type="text"
          value={input}
          disabled={loading}
          placeholder={
            loading
              ? "CVOS is thinking..."
              : "Ask about Christian..."
          }
          onChange={(event) =>
            setInput(event.target.value)
          }
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              !loading
            ) {
              sendMessage();
            }
          }}
        />

        <button
          onClick={() => sendMessage()}
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>

      </div>

    </div>
  );
}

export default Assistant;
