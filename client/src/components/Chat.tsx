import { Message } from "@/app/types";
import { FC, useEffect, useRef } from "react";
import { ChatInput } from "./ChatInput";
import { ChatLoader } from "./ChatLoader";
import { ChatMessage } from "./ChatMessage";

interface Props {
  messages: Message[];
  loading: boolean;
  onSend: (message: Message) => void;
  onReset: () => void;
}

export const Chat: FC<Props> = ({ messages, loading, onSend, onReset }) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Scroll to the bottom when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="relative flex flex-col rounded-lg px-2 sm:p-4 h-[85vh] sm:h-[80vh]">
      <div
        ref={chatContainerRef}
        className="overflow-y-auto no-scrollbar pb-8 flex-1 w-full"
      >
        {messages.map((message, index) => (
          <div key={index} className="my-1 sm:my-1.5">
            <ChatMessage message={message} />
          </div>
        ))}
        {loading && (
        <div className="my-1 sm:my-1.5">
          <ChatLoader />
        </div>
      )}
      </div>
      <div className="mt-4 sm:mt-8 left-0 w-full absolute bottom-0 px-2">
        <ChatInput onSend={onSend} />
      </div>
    </div>
  );
};
