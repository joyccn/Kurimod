import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { KurimodChatSimulator } from "../components/KurimodChatSimulator";
import { KurimodCodeBox } from "../components/KurimodCodeBox";
import { motion } from 'framer-motion';

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className="hero-banner flex flex-col items-center justify-center min-h-[70vh]">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="container relative z-10 max-w-5xl mx-auto px-6 text-center"
            >
                {/* Minimalist Badge */}
                <span className="inline-block py-1.5 px-4 rounded-full bg-[#b1ada1]/10 text-[#c15f3c] border border-[#c15f3c]/20 text-sm font-semibold tracking-wide mb-8">
                    Kurimod v3.0 is out
                </span>

                <h1 className="hero-title leading-tight mb-8">
                    Smart Conversations <br />
                    <span className="text-[#c15f3c]">Made Simple.</span>
                </h1>
                
                <p className="hero-subtitle">
                    A powerful python monkeypatching add-on for Kurigram & Pyrogram. Built for handling complex step-by-step states flawlessly.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                    <Link
                        className="button button--primary button--lg hover:no-underline px-8 min-w-[200px]"
                        to="/getting-started/intro">
                        Start Building
                    </Link>
                    <Link
                        className="button button--secondary button--lg hover:no-underline px-8 min-w-[200px]"
                        to="/reference">
                        API Reference
                    </Link>
                </div>
            </motion.div>
        </header>
    );
}

function Feature({ title, description, icon }) {
    return (
        <div className="feature-card">
            <div className="feature-icon bg-[#f4f3ee] dark:bg-[#1f1f1f] rounded-[1rem] p-3 text-center border border-[#b1ada1]/20 shadow-sm w-[4.5rem] h-[4.5rem] flex items-center justify-center text-3xl">
                {icon}
            </div>
            <h3 className="text-2xl font-bold mb-3 tracking-tight text-[#080808] dark:text-white">{title}</h3>
            <p className="text-lg text-[#b1ada1] font-medium leading-relaxed">{description}</p>
        </div>
    );
}

export default function Home() {
    return (
        <Layout
            title={`Home`}
            description="Powerful add-on that monkeypatches extra useful features on Pyrogram.">
            
            <HomepageHeader />
            
            <main className="container max-w-7xl mx-auto px-6 py-24">
                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
                    <Feature
                        title="Continuous Flow"
                        icon={<span className="font-mono text-xl tracking-tighter">01</span>}
                        description="Seamlessly await user inputs step-by-step using Python's async functions."
                    />
                    <Feature
                        title="Drop-in Inputs"
                        icon={<span className="font-mono text-xl tracking-tighter">02</span>}
                        description="Retrieve messages, answers, and clicks organically without messy routers."
                    />
                    <Feature
                        title="UI Components"
                        icon={<span className="font-mono text-xl tracking-tighter">03</span>}
                        description="Rapidly spin up inline keyboards and complex layout callbacks."
                    />
                    <Feature
                        title="Userbot Ready"
                        icon={<span className="font-mono text-xl tracking-tighter">04</span>}
                        description="Perfect for userbot and bot development, compatible out of the box."
                    />
                </div>

                {/* Interactive Demo Section */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col lg:flex-row gap-16 items-center justify-center rounded-[3rem] bg-[#f4f3ee] dark:bg-[#121212] p-12 lg:p-24 border border-[#b1ada1]/30"
                >
                    <div className="w-full lg:w-5/12 text-left">
                        <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tighter mb-6 text-[#080808] dark:text-white leading-tight">
                            The future of MTProto.
                        </h2>
                        <p className="text-xl text-[#080808]/70 dark:text-[#b1ada1] mb-10 leading-relaxed font-medium">
                            Strip away the boilerplate. Say goodbye to state machines. Handle complex forms and conversational logic as effortlessly as reading a book.
                        </p>
                        <Link
                            className="button button--secondary button--lg hover:no-underline font-medium px-8 border-2"
                            to="/getting-started/intro">
                            View Documentation →
                        </Link>
                    </div>
                    <div className="w-full lg:w-7/12 relative">
                        <div className="flex flex-col-reverse md:flex-row gap-6 items-center justify-center">
                            <KurimodChatSimulator />
                            <KurimodCodeBox />
                        </div>
                    </div>
                </motion.div>

            </main>
        </Layout>
    );
}
