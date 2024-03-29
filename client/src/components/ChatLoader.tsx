// import { IconDots } from "@tabler/icons-react";
import { FC } from "react";
import {EllipsisHorizontalIcon} from "@heroicons/react/24/outline";

interface Props {}

export const ChatLoader: FC<Props> = () => {
  return (
    <div className="flex flex-col flex-start">
      <div
        className={`flex items-center bg-neutral-200 text-neutral-900 rounded-2xl px-4 py-2 w-fit`}
        style={{ overflowWrap: "anywhere" }}
      >
        <EllipsisHorizontalIcon className="h-6 w-6 animate-spin" />
      </div>
    </div>
  );
};
