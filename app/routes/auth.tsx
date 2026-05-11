import { useEffect } from "react";
import { useLocation, useNavigate, type Location, type NavigateFunction } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
    { title: 'ResumeIQ | Auth' },
    { name: 'description', content: 'Log into your account' },
];



const Auth = () => {
    const { isLoading, auth: authStore } = usePuterStore();
    const location : Location<any> = useLocation();
    const next : string = location.search.split("?next=")[1];
    const navigate : NavigateFunction = useNavigate();
    useEffect(() => {
        if (authStore.isAuthenticated) {
        }
    }, [authStore.isAuthenticated, next])


  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
<div className="gradient-border shadow-lg">
    <section className="flex flex-col gap-8 bg-white rounded-2xl p-10 ">
<div className="flex flex-col items-center gap-2 text-center">
    <h1>Welcome</h1>
    <h2>Log In to Continue Your Job Journey</h2>
</div>
   <div>
    {isLoading ? (
        <button className="auth-button animate-pulse">
            <p>Signing you....</p>
        </button>
    ) : (
        <>
        {authStore.isAuthenticated ? (
        <button className="auth-button" onClick={authStore.signOut}>
           <p> Log Out</p>
        </button>
        ) : (
            <button className="auth-button" onClick={authStore.signIn}>
                <p>Log In </p>
            </button>
        )}
        </>
    )}
   </div>
    </section>

</div>
    </main>
  )
}

export default Auth
