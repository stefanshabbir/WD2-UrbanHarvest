export default function LoadingSpinner() {
    return (
        <div className="flex min-h-[50vh] items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-harvest-green" />
            <span className="sr-only">Loading...</span>
        </div>
    )
}
