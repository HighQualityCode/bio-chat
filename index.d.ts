import { FC } from "react";

export interface ChatProps {
  server: string;
  accessToken: string;
  roomId: string;
  currentUserId: string;
  getUser: (id: string) => any;
  sendMsg: (text: string) => void;
}

export interface MessageProps {
  userId: string;
  text: string;
  isMe?: boolean;
  getUser: (userId: string) => void;
}

declare const Chat: FC<ChatProps>;
declare module "*.jpg";

export default Chat;
