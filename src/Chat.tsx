import { FC, Fragment, useState, useEffect, useCallback, useRef } from "react";
import { List, AutoSizer } from "react-virtualized";
import { io } from "socket.io-client";
import { useMediaQuery } from "react-responsive";
import classNames from "classnames";

import Message from "./Message";
import SmileIcon from "./icons/SmileIcon";
import NextArrowIcon from "./icons/NextArrowIcon";
import MessageIcon from "./icons/MessageIcon";
import QuestionIcon from "./icons/QuestionIcon";
import CloseIcon from "./icons/CloseIcon";

import { ChatProps } from "../index";

import "react-virtualized/styles.css";
import "./Chat.scss";

const Chat: FC<ChatProps> = ({
  server,
  accessToken,
  roomId,
  currentUserId,
  getUser,
  sendMsg,
}) => {
  const [socket, setSocket] = useState<any>(null);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [showMobileInput, setShowMobileInput] = useState(false);

  const msgInput = useRef() as any;

  const toggleChat = useCallback(() => {
    if (showMobileChat) {
      setShowMobileInput(false);
    }
    setShowMobileChat(!showMobileChat);
  }, [setShowMobileChat, showMobileChat]);

  const sendMessage = useCallback(async () => {
    if (!showMobileInput) {
      setShowMobileInput(true);
    }

    if (msgInput && msgInput.current) {
      msgInput.current.focus();
    }

    if (msgInput?.current?.value) {
      sendMsg(msgInput.current.value);
      msgInput.current.value = "";
    }
  }, [showMobileInput, setShowMobileInput, msgInput, roomId]);

  const handleMessageSent = useCallback(
    (data) => {
      setChatHistory([...chatHistory, data.message]);
    },
    [chatHistory]
  );

  const handleMessageList = (data) => {
    setChatHistory(data);
  };

  useEffect(() => {
    const socket = io(server, {
      reconnection: true,
      transports: ["websocket"],
      query: {
        token: accessToken,
      },
    });

    setSocket(socket);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.off("message.sent", handleMessageSent);
      socket.off("messages.list", handleMessageList);
      socket.offAny();
      socket.on("message.sent", handleMessageSent);
      socket.on("messages.list", handleMessageList);

      socket.onAny((event, ...args) => {
        console.log("Socket event:", event, args);
      });
    }
  }, [socket, handleMessageList, handleMessageSent]);

  const isMobile = useMediaQuery({
    query: "(max-device-width: 767px)",
  });

  if (!chatHistory) return null;

  const rowRenderer = ({
    // key, // Unique key within array of rows
    index, // Index of row within collection
    // isScrolling, // The List is currently being scrolled
    // isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style,
  }) => {
    return (
      <div key={index} style={style}>
        <Message
          key={index}
          text={chatHistory[index]?.payload?.text}
          userId={chatHistory[index]?.from_user}
          isMe={currentUserId === chatHistory[index].from_user}
          getUser={getUser}
        />
      </div>
    );
  };

  const handleRowHight = useCallback(
    ({ index: number }) => {
      const text = chatHistory[number]?.payload?.text;
      let length = 48;
      if (text) {
        length = Math.ceil(String(text).length / 40) * 16 + 48;
      }
      return length;
    },
    [chatHistory]
  );

  return (
    <Fragment>
      <div
        className={classNames({
          "chat-container": true,
          "mobile-chat": showMobileChat,
        })}
      >
        <div className="chat-header">
          <div className="chat-title">Lesson name</div>
          <div className="notifications">
            <div className="question-mark">
              <QuestionIcon />
            </div>
            <div className="reads">2</div>
            <div className="un-reads">8</div>
            <div className="label">Help</div>
          </div>
        </div>

        <div onClick={toggleChat} className="close-wrapper">
          <CloseIcon />
        </div>

        <div className="chats">
          <AutoSizer className="auto-sizer">
            {({ height, width }) => (
              <List
                width={width}
                height={height - 30}
                rowHeight={handleRowHight}
                rowCount={chatHistory?.length || 0}
                rowRenderer={rowRenderer}
                scrollToIndex={chatHistory.length - 1}
              />
            )}
          </AutoSizer>

          {showMobileInput || !isMobile ? (
            <div className="input-wrapper">
              <input
                autoFocus
                ref={msgInput}
                placeholder="Type your message"
                className="message-input"
              />

              <div onClick={sendMessage} className="send-button">
                <NextArrowIcon />
              </div>

              <div className="emoji-open">
                <SmileIcon />
              </div>
            </div>
          ) : (
            <div onClick={sendMessage} className="send-toggle">
              <NextArrowIcon />
            </div>
          )}
        </div>
      </div>

      {!showMobileChat && (
        <div className="mobile-actions">
          <div onClick={toggleChat} className="message-container">
            <MessageIcon />
          </div>

          <div className="question-container">
            <QuestionIcon />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Chat;
