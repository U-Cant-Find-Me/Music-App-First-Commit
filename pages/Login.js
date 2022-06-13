import React from 'react'
import { getProviders, signIn } from 'next-auth/react'

function Login({ providers }) {
    return (
        <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
            <h1>This is login page</h1>
        </div>
    );
}

export default Login;

export async function getServerSideProps(){
    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    };
}