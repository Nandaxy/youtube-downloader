import React from "react";

const Result = ({ data }) => {
    const dataVideo = data.result;
    // console.log(dataVideo)
    const formatDurasi = detik => {
        if (detik > 0) {
            const jam = Math.floor(detik / 3600);
            const menit = Math.floor((detik % 3600) / 60);
            const detiks = detik % 60;

            if (jam < 1) {
                const formattedDurasi = `${menit
                    .toString()
                    .padStart(2, "0")}:${detiks.toString().padStart(2, "0")}`;
                return formattedDurasi;
            } else {
                const formattedDurasi = `${jam
                    .toString()
                    .padStart(2, "0")}:${menit
                    .toString()
                    .padStart(2, "0")}:${detiks.toString().padStart(2, "0")}`;
                return formattedDurasi;
            }
        } else {
            return "00:00";
        }
    };

    const formatView = view => {
        return view.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const downloadVideo = () => {
        if (dataVideo && dataVideo.videoUrl) {
            window.open(dataVideo.videoUrl, "_blank");
        } else {
            alert("Download URL not available");
        }
    };

    const downloadAudio = () => {
        if (dataVideo && dataVideo.audioUrl) {
            window.open(dataVideo.audioUrl, "_blank");
        } else {
            alert("Download URL not available");
        }
    };

    return (
        <div className="flex justify-center items-center w-full px-8 md:px-32">
            <div className="bg-gray-700 rounded shadow px-6 py-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold pb-4">Result:</h2>
                    <p className="font-semibold pb-4">
                        {dataVideo ? dataVideo.title : ""}
                    </p>
                    <img
                        className="mx-auto"
                        src={dataVideo ? dataVideo.thumbnail : ""}
                        alt={dataVideo ? dataVideo.title : ""}
                    />
                    <div className="flex flex-col space-y-4 pb-6 px-8 font-semibold">
                        <button
                            className="bg-teal-600 px-4 py-2 rounded mt-6 hover:bg-teal-700 transition-all"
                            onClick={downloadVideo}
                        >
                            Download Video 🎥
                        </button>
                        <button
                            className="bg-teal-600 px-4 py-2 rounded mt-6 hover:bg-teal-700 transition-all"
                            onClick={downloadAudio}
                        >
                            Download Audio 🎵
                        </button>
                    </div>
                    <div className="px-3 border border-gray-600 py-2">
                        <p className="py-2 text-xl font-semibold">Video Info</p>
                        <div className="flex justify-between">
                            <p>Views:</p>
                            <p>{formatView(dataVideo ? dataVideo.view : "")}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Durasi:</p>
                            <p>
                                {formatDurasi(
                                    dataVideo ? dataVideo.lengthSeconds : ""
                                )}
                            </p>
                        </div>
                        <div className="pt-4 pb-2 text-sm overflow-x-auto">
                            <p className="text-gray-200">
                                {dataVideo ? dataVideo.description : ""}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Result;
