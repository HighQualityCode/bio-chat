import React, { useEffect, useState } from "react";
import classNames from "classnames";
import "./Message.scss";

export interface MessageProps {
  userId: string;
  text: string;
  isMe?: boolean;
  getUser: (userId: string) => void;
}

const Message: React.FC<MessageProps> = ({ userId, text, isMe, getUser }) => {
  const [userInfo, setUserInfo] = useState<any>(null);

  const getUserInfo = async (userId: string) => {
    const user = await getUser(userId);
    setUserInfo(user);
  };

  useEffect(() => {
    if (userId) {
      getUserInfo(userId);
    }
  }, [userId]);

  return (
    <div className={classNames({ "chat-item": true, "my-item": isMe })}>
      {!isMe && userInfo && (
        <img
          className="profile-image"
          width="32"
          height="32"
          src={userInfo?.user?.profile_image}
        />
      )}

      <div
        className={classNames({ "message-wrapper": true, "my-message": isMe })}
      >
        <div className="username">
          <strong>
            {userInfo?.user?.first_name} {userInfo?.user?.last_name}{" "}
            {isMe && "(You)"}
          </strong>
        </div>
        <div className="message">{text}</div>
      </div>
    </div>
  );
};

export default Message;
