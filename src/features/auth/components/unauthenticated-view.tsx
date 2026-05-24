
import { SignInButton } from "@clerk/nextjs";

export const UnauthenticatedView = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">You're not signed in</h2>
                <p className="mb-6 text-sm text-muted-foreground">Please sign in to continue.</p>
                <SignInButton>
                    <button className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-white hover:opacity-95">
                        Sign in with Clerk
                    </button>
                </SignInButton>
            </div>
        </div>
    );
};