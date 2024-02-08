import { Message } from "@/app/types";
import { FC } from "react";
import { ChatInput } from "./ChatInput";
import { ChatLoader } from "./ChatLoader";
import { ChatMessage } from "./ChatMessage";
import { ResetChat } from "./ResetChat";

interface Props {
  messages: Message[];
  loading: boolean;
  onSend: (message: Message) => void;
  onReset: () => void;
}

export const Chat: FC<Props> = ({ messages, loading, onSend, onReset }) => {
  return (
    <>
      <div className="flex flex-row justify-between items-center mb-4 sm:mb-8">
        <ResetChat onReset={onReset} />
      </div>

      <div className="relative flex flex-col rounded-lg px-2 sm:p-4 h-[80vh] sm:h-[70vh]">
        <div className="overflow-y-scroll no-scrollbar h-full w-full">
          {messages.map((message, index) => (
            <div
              key={index}
              className="my-1 sm:my-1.5"
            >
              <ChatMessage message={message} />
            </div>
          ))}
        </div>

        {loading && (
          <div className="my-1 sm:my-1.5">
            <ChatLoader />
          </div>
        )}

        <div className="mt-4 sm:mt-8 left-0 w-full absolute bottom-2 px-2">
          <ChatInput onSend={onSend} />
        </div>
      </div>
    </>
  );
};
