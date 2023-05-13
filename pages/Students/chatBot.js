import { useState } from "react";
// import { ThemeProvider } from "styled-components";
import ChatBot from "react-simple-chatbot";

const Chatbot = () => {
  const [name, setName] = useState(" ");
  const [required, setRequired] = useState("");
  const [showChatbot, setShowChatbot] = useState(false);

  const supportSteps = [
    {
      id: "1",
      message: "Hi! I'm here to help you",
      trigger: "required",
    },
    {
      id: "required",
      message: " ",
      trigger: "2",
    },
    {
      id: "2",
      message:
        "Please enter what you want in the format : SubjectName and ModuleNumber",
      user: true,
      validator: (value) => {
        if (!value) {
          return "Please enter your name.";
        }
        setName(value);
        return true;
      },
      trigger: "3",
    },

    // {
    //   id: "required",
    //   message:
    //     "Please enter what you want in the format : SubjectName and ModuleNumber",
    //   trigger: 2,
    // },
    // {
    //   id: "2",
    //   user: true,
    //   validator: (value) => {
    //     if (!value) {
    //       return "Please enter your name.";
    //     }
    //     setName(value);
    //     return true;
    //   },
    //   trigger: "3",
    // },
    {
      id: "3",
      message: `Hi {previousValue}! How can I assist you today?`,
      trigger: "4",
    },
    {
      id: "4",
      user: true,
      validator: (value) => {
        if (!value) {
          return "Thikka muchkond type madu";
        }
        setRequired(value);
        return true;
      },
      trigger: "5",
    },
    {
      id: "5",
      message: `Hi {previousValue}! ninge ${required} beka library hogi hudku LOWDE`,
      end: true,
    },
  ];

  const theme = {
    background: "#f5f8fb",
    fontFamily: "Helvetica Neue",
    headerBgColor: "#3f51b5",
    headerFontColor: "#fff",
    headerFontSize: "15px",
    botBubbleColor: "#3f51b5",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4a4a4a",
  };

  const toggleChatbot = () => {
    setShowChatbot((prevShowChatbot) => !prevShowChatbot);
  };

  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
        onClick={toggleChatbot}
      >
        {showChatbot ? "Close chat" : "Chat with us"}
      </button>
      {showChatbot && (
        <div className="fixed bottom-20  right-24 z-10">
          <button
            className="absolute top-0 right-2 bg-blue-500 text-gray-500 hover:text-gray-700"
            onClick={toggleChatbot}
          >
            X
          </button>
          <ChatBot steps={supportSteps} />
        </div>
      )}
      {/* </ThemeProvider> */}
    </>
  );
};

export default Chatbot;