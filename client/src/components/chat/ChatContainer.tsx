import { Suspense, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Message, MessageProps } from "../shared/Messages/Message";
import { ChatInput } from "../shared/Inputs/ChatInput";
import { ChatSendButton } from "../shared/Buttons/ChatSendButton";
import { Typing } from "./Typing";
import { Avatar } from "../shared/users/Avatar";
import img from "../../assets/jennie.jpeg";
import { Button } from "../shared/Buttons/GenericButton";
import { Loader } from "../shared/loaders/Loader";
import { CreateChat } from "@components/dialogs/CreateChat";

export const Content = () => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversation, setConversation] = useState<MessageProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setIsTyping(false);
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [isTyping]);

  return (
    <div className="h-full flex flex-col justify-between">
      {loading ? (
        <Loader styles="mx-auto my-auto" />
      ) : (
        <div className="flex flex-col items-start grow overflow-auto mt-12">
          <Message text={"henlo"} id={"asdfasdf"} key={"asdfasdf"} first />
          {conversation.map((messageObj) => (
            <Message
              text={messageObj.text}
              id={messageObj.id}
              key={messageObj.id}
              senderIsMe
              first
            />
          ))}
          {isTyping ? (
            <div className="flex flex-row">
              <Avatar src={img} />
              <Typing />
            </div>
          ) : null}
        </div>
      )}
      <Button
        title={"load"}
        onClick={() => {
          setLoading(false);
        }}
      />
      <form
        className="border-[1px] rounded-[15px] 
         my-2 px-[1rem] py-[4px] 
        border-black flex items-center
        "
        onSubmit={(e: React.KeyboardEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (message.length > 0) {
            setConversation([
              ...conversation,
              { text: message, id: uuidv4(), senderIsMe: true },
            ]);
            setMessage("");
            setIsTyping(false);
          }
        }}
      >
        <ChatInput
          value={message}
          onChange={(e: React.FormEvent<HTMLTextAreaElement>) => {
            setIsTyping(true);
            e.preventDefault();
            setMessage(e.currentTarget.value);
          }}
        />
        <ChatSendButton disabled={message.length === 0} />
      </form>
    </div>
  );
};

export const ChatContainer = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {

  }, [])

  return (
    <Suspense>
      <Content />
      <Button onClick={() => setOpen(true)} title="create chat" />
      <CreateChat open={open} setIsOpen={setOpen} />
    </Suspense>
  )
}