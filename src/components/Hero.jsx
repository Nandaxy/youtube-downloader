import React, { useState } from "react";
import VideoNotFound from "./VideoNotFound.jsx";
import Result from "./Result.jsx";

const Hero = () => {
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [errorData, setErrorData] = useState("");
    const [resultData, setResultData] = useState("");
    const [noUrl, setNoUrl] = useState(false);

    const handleDownload = async () => {
        setLoading(true);
        setErrorData("");
        setResultData("");
        setNoUrl(false);
        const url = inputValue;

        try {
            if (!url) {
                setTimeout(() => {
                    setNoUrl(true);
                }, 100);
                setLoading(false);
                return;
            }
            const response = await fetch(
                `https://inquisitive-buckle-ant.cyclic.app/downloader/yt?url=${url}`
            );
            const data = await response.json();
            console.log(data);

            if (!data.status) {
                setErrorData(data);
                setLoading(false);
                return;
            }

            setResultData(data);
            console.log("Respon Api :", resultData);
        } catch (error) {
            console.error("Error fetching data:", error);
            setErrorData({ message: "Error saat melakukan fetching data" });
        }
        setLoading(false);
    };

    const handleChange = event => {
        setInputValue(event.target.value);
    };

    return (
        <div className="py-16 max-w-full">
            <h1 className="px-2 font-bold text-4xl pb-6 text-center">
                Youtube Video downloader
            </h1>
            <div className="max-w-96 flex flex-col px-6 mx-auto">
                <input
                    type="text"
                    placeholder="Masukan url"
                    className="px-4 py-2 focus:outline-none rounded text-gray-100 bg-gray-600 shadow font-semibold"
                    value={inputValue}
                    onChange={handleChange}
                />
                <button
                    className={`mt-4 px-4 py-2 rounded text-white transition-all ${
                        isLoading
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-teal-600 hover:bg-teal-700"
                    }`}
                    disabled={isLoading}
                    onClick={handleDownload}
                >
                    {isLoading ? "Downloading..." : "Download"}
                </button>
                <p className="text-center text-gray-500 mt-4">
                    Download video mp4 atau mp3 dengan mudah, cukup tempel link
                    video lalu klik download
                </p>
            </div>
            <div className="flex justify-center py-8">
                {noUrl ? "Harap masukan Url!" : ""}
                {isLoading ? (
                    <div className="flex justify-center items-center">
                        <img
                            className="w-[80%] h-auto"
                            src="https://i.pinimg.com/originals/24/07/b5/2407b512f6f2eec61cd2f3136242a025.gif"
                            alt="loading..."
                        />
                    </div>
                ) : (
                    ""
                )}
                {errorData && <VideoNotFound message={errorData.message} />}
                {resultData && <Result data={resultData} />}
            </div>
        </div>
    );
};

export default Hero;
