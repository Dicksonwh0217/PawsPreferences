export function LoadingAnimation() {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 backdrop-blur-sm z-30">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
            <p className="text-xl font-semibold text-slate-300">Fetching adorable cats...</p>
        </div>
    );
}