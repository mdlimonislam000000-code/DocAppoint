import Link from 'next/link';

export const metadata = {
    title: 'Page Not Found | 404',
    description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 px-4 text-center">

            <h1 className="text-9xl font-black text-primary animate-bounce">
                404
            </h1>

            <h2 className="text-3xl font-bold mt-4 text-base-content">
                দুঃখিত, পেজটি খুঁজে পাওয়া যায়নি!
            </h2>

            <p className="text-base-content/70 mt-2 max-w-md">
                আপনি যে লিঙ্কটি খুঁজছেন তা হয়তো ডিলিট করে দেওয়া হয়েছে অথবা আপনি ভুল কোনো ইউআরএল (URL) টাইপ করেছেন।
            </p>

            <div className="mt-8">
                <Link
                    href="/"
                    className="btn btn-primary font-medium shadow-md transition-all hover:scale-105"
                >
                    Back to home
                </Link>
            </div>
        </div>
    );
}