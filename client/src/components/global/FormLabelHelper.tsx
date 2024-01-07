import { twMerge } from "tailwind-merge";

type TFormLabelHelperProps = {
    isRequired?: boolean;
};

const FormLabelHelper = ({ isRequired }: TFormLabelHelperProps) => {
    return (
        <span className={twMerge("text-xs", isRequired ? "text-red-500" : "text-black/40")}>
            {
                isRequired ? (
                    "*"
                ) : (
                    "(Optional)"
                )
            }
        </span>
    )
}

export { FormLabelHelper }
