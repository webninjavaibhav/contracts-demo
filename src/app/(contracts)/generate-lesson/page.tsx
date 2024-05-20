"use client";
import { Button } from "@/components/common/Button";
import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from "react";
import ReactMarkdown from "react-markdown";
import CustomTextArea from "@/components/common/TextArea";
import { Avatar } from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Icons from "@/components/common/Icons";

const GenerateLesson = () => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi there! How can I help?" },
  ]);

  const messageListRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Auto scroll chat to bottom
  useEffect(() => {
    if (messageListRef.current) {
      const messageList = messageListRef.current;
      messageList.scrollTop = messageList.scrollHeight;
    }
  }, [messages]);

  // Focus on input field
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);

  // Handle errors
  const handleError = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: "assistant",
        content: "Oops! There seems to be an error. Please try again.",
      },
    ]);
  };

  // Handle form handlegenerate
  const handleGenerate = async (e: FormEvent) => {
    e.preventDefault();

    if (userInput.trim() === "") {
      return;
    }

    setLoading(true);
    const context = [...messages, { role: "user", content: userInput }];
    setMessages(context);

    const response = await fetch("/api/generate-lesson", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: context }),
    });
    let res = await response.json();
    setLoading(false);
    setUserInput("");

    if (res?.error) handleError();

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "assistant", content: res?.data?.response },
    ]);
  };

  return (
    <>
      <div className="h-full rounded-xl p-5">
        <main className="relative">
          <div className="grid grid-cols-[1.4fr_1fr] w-full place-items-end  items-center mb-4">
            <div className="text-center">
              <div className="font-bold text-lg">
                Empowered Lesson Plan Generator
              </div>
              <div>Empowered Lesson Plan Generator</div>
            </div>
            <div>
              <Button
                variant="text"
                className="rounded-md text-black outline-none px-2 mx-2 shadow-none font-semibold"
              >
                New Session
              </Button>
              <Button
                variant="contained"
                className="rounded-md bg-slate-100 px-2 text-black font-semibold hover:bg-slate-100"
              >
                Remix this app
              </Button>
            </div>
          </div>

          <div className="w-full bg-white rounded-lg p-4 overflow-hidden h-[82vh] pt-2 overflow-y-scroll flex justify-center items-center">
            <div
              ref={messageListRef}
              className="w-full overflow-y-scroll h-full pb-[200px] "
            >
              {messages.map((message, index) => {
                return (
                  <div key={index}>
                    <div className="flex p-2 justify-between">
                      <div className="flex gap-3">
                        {message.role === "assistant" ? (
                          <Avatar
                            sx={{
                              width: 24,
                              height: 24,
                              bgcolor: deepOrange[500],
                            }}
                          >
                            A
                          </Avatar>
                        ) : (
                          <Avatar
                            sx={{
                              width: 24,
                              height: 24,
                              bgcolor: deepPurple[500],
                            }}
                          >
                            OP
                          </Avatar>
                        )}
                        <ReactMarkdown className="mx-2">
                          {message.content}
                        </ReactMarkdown>
                      </div>

                      {message.role === "assistant" ? (
                        <div className="flex flex-col gap-3">
                          <Icons.copyIcon
                            sx={{ fontSize: 20, marginBottom: 0.3 }}
                          />
                          <Icons.flagIcon
                            sx={{ fontSize: 20, marginBottom: 0.3 }}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full bottom-[10px] absolute px-2">
            <form
              onSubmit={handleGenerate}
              className="w-full flex justify-center items-center"
            >
              <Icons.attachFileIcon fontSize="medium" />
              <div className="flex relative items-center w-full border border-[#D4D4D7] mx-2 rounded-[4px]">
                <CustomTextArea
                  value={userInput}
                  placeholder="Enter message"
                  handleInput={(e: React.BaseSyntheticEvent) =>
                    setUserInput(e.target.value)
                  }
                  style="p-0"
                />
              </div>
              <Button
                type="submit"
                variant="contained"
                onClick={handleGenerate}
                className={`${
                  loading
                    ? "bg-red-500  hover:bg-red-500"
                    : "bg-[#00D3AF] hover:bg-[#00D3AF]"
                } cursor-pointer gap-1 min-w-0 w-[36px] h-[34px]`}
              >
                {loading ? (
                  <Icons.stopIcon sx={{ fontSize: 20, marginBottom: 0.3 }} />
                ) : (
                  <Icons.arrowUpIcon sx={{ fontSize: 20, marginBottom: 0.3 }} />
                )}
              </Button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default GenerateLesson;
