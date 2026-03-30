import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import { KurimodChatSimulator } from "../components/KurimodChatSimulator";
import { KurimodCodeBox } from "../components/KurimodCodeBox";

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className="hero-banner">
            <div className="container relative z-10">
                <Heading as="h1" className="hero-title">
                    {siteConfig.title}
                </Heading>
                <p className="hero-subtitle">
                    {siteConfig.tagline}
                </p>
                <div className="flex gap-4 justify-center mt-8">
                    <Link
                        className="button button--primary button--lg hover:no-underline"
                        to="/getting-started/intro">
                        Get Started →
                    </Link>
                    <Link
                        className="button button--secondary button--lg hover:no-underline"
                        to="/reference">
                        API Reference
                    </Link>
                </div>
            </div>
        </header>
    );
}

function Feature({ title, description, icon }) {
    return (
        <div className="feature-card">
            <div className="feature-icon">{icon}</div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-slate-600 dark:text-slate-400">{description}</p>
        </div>
    );
}

export default function Home() {
    return (
        <Layout
            title={`Home`}
            description="Powerful add-on that monkeypatches extra useful features on Pyrogram.">
            <HomepageHeader />
            <main className="container py-16">

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    <Feature
                        title="Better Conversation"
                        icon="💬"
                        description="Powerful conversation handling that makes building interactive bots a breeze."
                    />
                    <Feature
                        title="Easy Inputs"
                        icon="⌨️"
                        description="Get user responses or button clicks effortlessly with a single line of code."
                    />
                    <Feature
                        title="Keyboard Interfaces"
                        icon="🎛️"
                        description="Create complex keyboard-based interfaces for your bots with ease and fun."
                    />
                    <Feature
                        title="Userbot Ready"
                        icon="🚀"
                        description="Effortlessly send messages with inline keyboards directly from your userbots."
                    />
                </div>

                {/* Interactive Demo Section */}
                <div className="flex flex-col lg:flex-row gap-12 items-center justify-center mb-16">
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-3xl font-bold mb-6">See it in action</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                            Kurimod simplifies complex interactions. Check out how easy it is to implement a conversation flow compared to raw Pyrogram.
                        </p>
                        <Link
                            className="button button--primary button--lg hover:no-underline"
                            to="/getting-started/intro">
                            Read the Docs
                        </Link>
                    </div>
                    <div className="w-full lg:w-1/2 relative">
                        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full -z-10"></div>
                        <div className="flex flex-col-reverse md:flex-row gap-4 items-center justify-center">
                            <KurimodChatSimulator />
                            <KurimodCodeBox />
                        </div>
                    </div>
                </div>

            </main>
        </Layout>
    );
}
