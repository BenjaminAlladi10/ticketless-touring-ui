import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/constants/links";
import { useGithubProfile } from '@/hooks/useGithubProfile';
import profile from "@/assets/userImg.jpg";

export default function About() {
    const { data: user, isLoading, isError } = useGithubProfile();
    const [show, setShow] = useState(false);

    const { name, html_url } = user || {};

    if (isLoading) {
        return (
            <div className="flex justify-center items-center">
                <div className="w-4 h-4 border-2 border-t-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                <span className="ml-1 text-lg text-gray-600 dark:text-white">Loading...</span>
            </div>
        );
    }

    return (
        <>
            <div className="flex justify-center mb-4">
                <Button
                    onClick={() => setShow(!show)}
                    variant="outline"
                    className="bg-sky-600 text-white hover:bg-sky-700 hover:text-white dark:bg-sky-600"
                >
                    {show ? "Hide" : "Show"} Profile
                </Button>
            </div>

            {show && user && (
                <div className="w-full max-w-sm bg-white border border-gray-400 rounded-lg mx-auto flex flex-col items-center py-10 shadow-sm shadow-gray-200 dark:bg-gray-800 dark:border-gray-400 dark:shadow-none">
                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={profile} alt="User avatar" />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Web Developer</span>

                    <div className="flex flex-col flex-wrap gap-y-2 md:flex-row mt-4 md:mt-6 gap-x-2">
                        <Button asChild>
                            <a href={html_url} target="_blank" rel="noopener noreferrer">
                                GitHub
                            </a>
                        </Button>
                        <Button variant="secondary" asChild>
                            <a href={SOCIAL_LINKS.LINKEDIN} target="_blank" rel="noopener noreferrer">
                                LinkedIn
                            </a>
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
