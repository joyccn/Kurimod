import {on} from "../../utils/event";
import {useState} from "react";
import clsx from "clsx";

export const KurimodCodeBox = () => {
    const [step, setStep] = useState(0);

    on("KurimodCodeStep", (step) => {
        setStep(step);
    });
    
    const codeText = `
@Client.on_message(filters.command("start"))
    def start(client, message):
        chat = message.chat
        response = await chat.ask("Oh hey! What is your name?")
        name = response.text
        response = await chat.ask(f"Hello {name}! Please tell me your age.")
        age = response.text
        response = await chat.ask(f"So you are {age} years old. Now i wanna know your hobby. What do you like to do?")
        hobby = response.text
        await message.reply(f"Oh, i see. Okay, so your name is {name}, you are {age} years old and you like to {hobby}. Nice to meet you!")
    `.trim()

    const codeLines = codeText.split("\n");

    const translateStepToLine = (step) => {
        switch (step) {
            case 1:
                return "4"
            case 2:
                return "6"
            case 3:
                return "8"
            default:
                return ""
        }
    }

    return (
       <div className="bg-[#f4f3ee] py-8 rounded-[2.5rem] border border-[#b1ada1]/30 dark:bg-[#121212] h-[400px] w-[80vw] md:w-[800px] overflow-auto flex flex-col items-start scrollbar-thin scrollbar-thumb-[#b1ada1]/50 shadow-sm hover:shadow-lg transition-shadow text-[13px] font-mono leading-loose relative m-2">
           {codeLines.map((line, index) => {
                const lineNumber = index + 1;
                const stepLine = translateStepToLine(step);
                const highlightLine = stepLine === lineNumber.toString();

                const highlight = "bg-[#c15f3c]/10 text-[#c15f3c] dark:text-[#d78f76] px-4 py-0 border-l-[3px] border-[#c15f3c] w-full font-bold";
                const fade = "text-[#080808]/40 dark:text-white/30 px-4 py-0 border-l-[3px] border-transparent w-full";
                const normal = "text-[#080808] dark:text-[#e5e5e5] px-4 py-0 border-l-[3px] border-transparent w-full";

                const extraClassName = stepLine? (highlightLine? highlight: fade): normal;
                return (
                    <div className={clsx("flex whitespace-pre transition-all duration-300 w-full", extraClassName)} key={index}>
                        <span className="w-8 inline-block text-right opacity-30 select-none mr-6 text-[10px] pb-1">{lineNumber}</span>
                        <code className="bg-transparent text-inherit p-0 font-mono tracking-tight border-none shadow-none">{line}</code>
                    </div>
                )
           })}
       </div>
    )
}