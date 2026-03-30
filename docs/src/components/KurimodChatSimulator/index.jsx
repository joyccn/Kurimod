import {ChatSimulator} from "../ChatSimulator";
import {emit} from "../../utils/event";
import {useEffect} from "react";

const state = {
    "waiting_for": "",
    "name": "",
    "age": "",
    "hobby": "",
}

const updateProcessor = (update) => {
    const text = update.value

    if (state.waiting_for === "name") {
        state.name = text;
        state.waiting_for = "age";
        emit("KurimodCodeStep", 2)

        return `Hello ${state.name}! Please tell me your age.`;
    } else if (state.waiting_for === "age") {
        state.age = text;
        state.waiting_for = "hobby";
        emit("KurimodCodeStep", 3)

        return `So you are ${state.age} years old. Now i wanna know your hobby. What do you like to do?`;
    } else if (state.waiting_for === "hobby") {
        state.hobby = text;
        state.waiting_for = "";
        emit("KurimodCodeStep", 4)
        return `Oh, i see. Okay, so your name is ${state.name}, you are ${state.age} years old and you like to ${state.hobby}. Nice to meet you!`;
    }

    switch (text) {
        case "/start":
            state.waiting_for = "name";
            emit("KurimodCodeStep", 1)
            return "Oh hey! What is your name?"
        default:
            return "Sorry, i don't understand that command. Try the command /start to start the conversation."

    }
}

export const KurimodChatSimulator = ({}) => {
    useEffect(() => {
        return () => {
            state.waiting_for = "";
        }
    }, []);
    return <ChatSimulator updateCallback={updateProcessor} />
}