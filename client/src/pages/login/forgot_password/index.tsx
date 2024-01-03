import { ForgotPasswordForm } from "./components/ForgotPasswordForm"

const ForgotPassword = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="flex flex-col items-center gap-8">
                {/* Insert logo here */}
                <div className="w-32 aspect-square bg-neutral-300 rounded-full"></div>

                <div className="flex flex-col gap-2 text-center lg:w-3/4">
                    <strong className="font-bold text-3xl">Reset your password</strong>
                    <p className="text-lg">Enter your account's email address so we can send you a reset code.</p>
                </div>

                <ForgotPasswordForm />
            </div>
        </div>
    )
}

export { ForgotPassword }
