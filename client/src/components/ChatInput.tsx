"use client";
import { Message } from "@/app/types";
// import { IconArrowUp } from "@tabler/icons";
import { FC, KeyboardEvent, useEffect, useRef, useState } from "react";
import {
  PaperAirplaneIcon,
  CameraIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
interface Props {
  onSend: (message: Message) => void;
}

export const ChatInput: FC<Props> = ({ onSend }) => {
  const [content, setContent] = useState<string>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`;
    }
  }, [content]);

  const handleOpenCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement("video");

      video.srcObject = stream;
      video.play();

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      video.addEventListener("loadeddata", () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas content to base64 data URL
        const imageDataUrl = canvas.toDataURL("image/png");

        // Set the base64 data URL as the value of the input
        onSend({ role: "user", content: imageDataUrl });

        // Stop the camera stream
        stream.getTracks().forEach((track) => track.stop());
      });
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > 4000) {
      alert("Message limit is 4000 characters");
      return;
    }

    setContent(value);
  };

  const handleSend = () => {
    if (!content) {
      alert("Please enter a message");
      return;
    }
    onSend({ role: "user", content });
    setContent("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`;
    }
  }, [content]);

  return (
    <div className="flex items-center relative mt-2">
      <button
        onClick={handleOpenCamera}
        className="rounded-l-lg p-2 text-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 absolute left-0 z-2"
      >
        <CameraIcon className="h-6 w-6" />
      </button>
      <video ref={videoRef} className="hidden" />
      <input
        ref={textareaRef}
        type="text"
        className="min-h-[44px] rounded-l-lg pl-10 pr-2 py-3 w-full focus:outline-none focus:ring-1 focus:ring-neutral-300 border-2 border-neutral-200"
        placeholder="Type your message..."
        value={content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <button
        onClick={handleSend}
        className="rounded-r-lg px-2 py-3 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <PaperAirplaneIcon className="h-5 w-5" />
      </button>
    </div>
  );
};
