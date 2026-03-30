import { useEffect, useRef, useState } from "react";

const controller = {
    setMessages: () => {
    },
    updateCallback: () => {
    }
}

const sendMessage = (message) => {
    if (message) {
        const msgObj = {
            "type": "text",
            "value": message,
            "outgoing": true
        }
        controller.setMessages((messages) => [msgObj, ...messages]);

        const response = controller.updateCallback(msgObj);
        if (response) {
            const responseObj = {
                "type": "text",
                "value": response,
                "outgoing": false
            }
            setTimeout(() => {
                controller.setMessages((messages) => [responseObj, ...messages]);
            }, 300);
        }
    }
}

const Command = ({ command }) => {
    return (
        <div className={"text-blue-500 inline cursor-pointer"} onClick={() => sendMessage(command)}>
            {command}
        </div>
    )
}


const ChatMessage = ({ message, outgoing }) => {
    let innerBubble = [message];

    // replace all texts that start with slash for Command instance instead
    const commandRegex = /\/[a-zA-Z0-9]+/g;
    const commands = message.match(commandRegex);

    if (commands) {
        const split = message.split(commandRegex);
        innerBubble = [];
        for (let i = 0; i < split.length; i++) {
            innerBubble.push(split[i]);
            if (i < commands.length) {
                innerBubble.push(<Command key={i} command={commands[i]} />);
            }
        }


    }
    if (!outgoing) {
        return (
            <div className="chat chat-start mb-2">
                <div className="chat-image avatar">
                    <div className="w-8 rounded-full ring-1 ring-[#c15f3c]/20 ring-offset-1 dark:ring-offset-[#121212]">
                        <div className={"bg-gradient-to-br from-[#c15f3c] to-[#a35033] h-full w-full font-bold text-white justify-center flex items-center text-[10px]"}>BOT</div>
                    </div>
                </div>
                <div className="chat-bubble bg-[#f4f3ee] dark:bg-[#1f1f1f] text-[#080808] dark:text-white rounded-[1.25rem] rounded-tl-sm shadow-sm text-sm">{innerBubble}</div>
            </div>
        )
    }

    return (
        <div className="chat chat-end mb-2">
            <div className="chat-bubble bg-[#c15f3c] text-white rounded-[1.25rem] rounded-tr-sm shadow-sm text-sm">{innerBubble}</div>
        </div>
    )
}


export const ChatSimulator = ({ updateCallback }) => {
    const inputRef = useRef(null);
    const [messages, setMessages] = useState([]);
    controller.setMessages = setMessages;
    controller.updateCallback = updateCallback;

    const onSubmit = (e) => {
        e.preventDefault();
        sendMessage(inputRef.current.value);
        inputRef.current.value = "";
        inputRef.current.focus();
    }

    useEffect(() => {
        inputRef.current.focus();
        sendMessage("/start")
    }, []);

    return (
        <div className="flex flex-col h-[400px] w-[80vw] md:w-96 bg-white dark:bg-[#121212] border border-[#b1ada1]/30 rounded-[2.5rem] shadow-sm hover:shadow-lg transition-shadow overflow-hidden m-2 text-base relative">
            <div className="flex flex-row justify-center items-center h-14 w-full bg-[#f4f3ee]/50 dark:bg-[#1f1f1f]/50 border-b border-[#b1ada1]/10 backdrop-blur-md select-none sticky top-0 z-10">
                <div className="text-[11px] tracking-widest font-bold text-[#b1ada1] uppercase">Chat Simulator</div>
            </div>
            <div className="flex flex-grow h-full max-h-full w-full bg-transparent overflow-auto scrollbar-thin scrollbar-thumb-[#b1ada1]/50">
                <div className="flex flex-col-reverse flex-grow h-full max-h-full w-full bg-transparent p-4 overflow-auto scrollbar-thin">
                    {messages.map((message, index) => {
                        return (
                            <ChatMessage key={index} message={message.value} outgoing={message.outgoing} />
                        )
                    })}
                </div>
            </div>
            <form onSubmit={onSubmit} className="flex flex-row justify-center items-center h-[72px] w-full bg-transparent border-t border-[#b1ada1]/10 gap-2 px-4 pb-2">
                <input className="input h-10 w-full max-w-xs flex-grow bg-[#f4f3ee] dark:bg-[#1f1f1f] text-[#080808] dark:text-white border-transparent rounded-[1rem] px-5 focus:outline-none focus:ring-2 focus:ring-[#c15f3c]/30 text-sm transition-all shadow-inner" ref={inputRef} type="text" placeholder="Message..." />
                <button type="submit" className="h-10 px-6 bg-[#c15f3c] text-white font-medium rounded-[1rem] hover:bg-[#a35033] transition-colors text-sm shadow-sm hover:shadow transition-all">Send</button>
            </form>
        </div>

    )
}