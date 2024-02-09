import { Message } from "@/app/types";
import { FC } from "react";

interface Props {
  message: Message;
}

export const ChatMessage: FC<Props> = ({ message }) => {
  const isBase64Image = (str: string) => {
    console.log(message.content);
    return str.startsWith("data:image");
  };

  const isImage = (str: string) => {
    return str.startsWith("data:image") || str.startsWith('https://');
  };

  return (
    <div
      className={`flex flex-col ${
        message.role === "assistant" ? "items-start" : "items-end"
      }`}
    >
      {isImage(message.content) ? (
        isBase64Image(message.content) ? (
          <img
            src={message.content}
            alt="Base64 Image"
            className="rounded-2xl max-w-[67%]"
          />
        ) : (
          <img src={message.content} className="rounded-2xl max-w-[67%] max-h-[250px]" />
        )
      ) : (
        <div
          className={`flex items-center ${
            message.role === "assistant"
              ? "bg-neutral-200 text-neutral-900"
              : "bg-blue-500 text-white"
          } rounded-2xl px-3 py-2 max-w-[67%] whitespace-pre-wrap`}
          style={{ overflowWrap: "anywhere" }}
        >
          {message.content}
        </div>
      )}
    </div>
  );
};
