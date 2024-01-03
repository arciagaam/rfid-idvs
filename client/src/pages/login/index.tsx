import { LoginForm } from "./components/LoginForm";

const Login = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="flex flex-col items-center gap-8">
                {/* Insert logo here */}
                <div className="w-32 aspect-square bg-white rounded-full overflow-clip">
                    <img className="object-cover" src="/images/logo.png" alt="" />
                </div>

                <div className="flex flex-col gap-2 text-center">
                    <strong className="font-bold text-3xl">Login to your account</strong>
                    <p className="text-lg">Enter your details to login</p>
                </div>

                <LoginForm />
            </div>
        </div>
    )
};

export { Login };
