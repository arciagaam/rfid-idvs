import { LoginForm } from "./components/LoginForm";

const Login = () => {
    return (
        <div className="relative w-full h-screen flex justify-center items-center lg:bg-blue-50">
            <div id="login-page" className="absolute inset-0 w-full h-full"></div>
            <div className="z-[1] grid grid-cols-1 lg:grid-cols-2 w-full lg:w-4/5 xl:w-3/5 bg-white lg:rounded-lg lg:shadow-lg overflow-clip lg:shadow-blue-700/20">
                <div className="flex justify-center items-center w-full h-full p-12 lg:bg-blue-100">
                    <img className="w-64 lg:w-3/4 object-cover aspect-square rounded-full overflow-clip" src="/images/logo.png" alt="" />
                </div>
                <div className="flex flex-col justify-center w-full h-full p-12 gap-6">
                    <div className="flex flex-col">
                        <strong className="font-bold text-3xl">Login to your account</strong>
                        <p className="text-black/50">Enter your details to login</p>
                    </div>

                    <LoginForm />
                </div>
            </div>
        </div>
    )
};

export { Login };
