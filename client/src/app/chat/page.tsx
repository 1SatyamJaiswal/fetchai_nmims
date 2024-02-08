'use client';
import { Chat } from '@/components/Chat';
import { Message } from '@/app/types';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { emit } from 'process';
let socket:any = null;

const Home = () => {
  useEffect(() => {
    socket = io('http://localhost:7789');

    
    return () => {
      socket.disconnect()
      // socket = null
    }
  }, []);

  socket?.on('connect', (sid: any) => {
    console.log('connected', sid);
  });

  socket?.on('disconnect',() => {
    console.log('disconnect');
    
  })

  socket?.on('chat_msg', (data:any) => {
    console.log('data received from back',data);
    

  })

  socket?.on('list_msg',(data:any) => {
    console.log('list msg recv',data);
    
  })
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChecklistUpload = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement("video");

      video.srcObject = stream;
      video.play();

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      video.addEventListener("loadeddata", () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas content to base64 data URL
        const imageDataUrl = canvas.toDataURL("image/png");

        // Set the base64 data URL as the value of the input
        setMessages((messages) => [
          ...messages,
          {
            role: "user",
            content: imageDataUrl,
          },
        ]);

        // Stop the camera stream
        stream.getTracks().forEach((track) => track.stop());
        handleSend({role:"user", content: imageDataUrl});
      });
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  }

  const handleSend = async (message: Message) => {
    const updatedMessages = [...messages, message];
    console.log('message',message.content);
    
    socket.emit('chat',message.content)
    socket.emit('list',message.content)

    setMessages(updatedMessages);
    setLoading(true);

    // const response = await fetch("/api/chat", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     messages: updatedMessages,
    //   }),
    // });

    // if (!response.ok) {
    //   setLoading(false);
    //   throw new Error(response.statusText);
    // }

    // const data = response.body;

    // if (!data) {
    //   return;
    // }

    setLoading(false);

    // const reader = data.getReader();
    // const decoder = new TextDecoder();
    // let done = false;
    // let isFirst = true;

    // while (!done) {
    //   const { value, done: doneReading } = await reader.read();
    //   done = doneReading;
    //   const chunkValue = decoder.decode(value);

    //   if (isFirst) {
    //     isFirst = false;
    //     setMessages((messages) => [
    //       ...messages,
    //       {
    //         role: "assistant",
    //         content: chunkValue,
    //       },
    //     ]);
    //   } else {
    //     setMessages((messages) => {
    //       const lastMessage = messages[messages.length - 1];
    //       const updatedMessage = {
    //         ...lastMessage,
    //         content: lastMessage.content + chunkValue,
    //       };
    //       return [...messages.slice(0, -1), updatedMessage];
    //     });
    //   }
    // }
  };

  const handleReset = () => {
    setMessages([
      {
        role: 'assistant',
        content: `Hi there! I'm Chatbot UI, an AI assistant. I can help you with things like answering questions, providing information, and helping with tasks. How can I help you?`,
      },
    ]);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: `Hi there! I'm Chatbot UI, an AI assistant. I can help you with things like answering questions, providing information, and helping with tasks. How can I help you?`,
      },
    ]);
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen w-full relative">
        <div className="flex-1 overflow-auto sm:px-10 pb-4 sm:pb-10">
          <div className="max-w-[1200px] mx-auto mt-4 sm:mt-12">
            <Chat
              messages={messages}
              loading={loading}
              onSend={handleSend}
              onReset={handleReset}
            />
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Floating button for uploading checklist */}
        <button
          onClick={handleChecklistUpload}
          className="fixed top-24 right-10 p-3 bg-green-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Upload Checklist
        </button>
      </div>
    </>
  );
};

export default Home;
