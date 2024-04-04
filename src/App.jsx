import Hero from "./components/Hero.jsx";

const App = () => {
    return (
        <>
            <div className="w-full min-h-screen bg-gray-800 text-white flex flex-col  items-center">
                <Hero />
                <p className="mt-auto text-sm font-light opacity-40 mb-4 hover:underline">
                    Made with ❤ by Nanda
                </p>
            </div>
        </>
    );
};

export default App;
