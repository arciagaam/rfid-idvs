import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { createContext, useContext, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type TModalContext = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContext = createContext<ReturnType<typeof useModalProvider> | null>(null);

const useModalProvider = (): TModalContext => {
    const [open, setOpen] = useState(false);

    return {
        open,
        setOpen
    }
}

const useModal = () => {
    const context = useContext(ModalContext);

    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }

    return context;
}

const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const modal = useModalProvider();

    return (
        <ModalContext.Provider value={modal}>
            {children}
        </ModalContext.Provider>
    )
};

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ModalContextProvider>
            {children}
        </ModalContextProvider>
    )
}

type TModalProps = {
    trigger: React.ReactNode;
    title: string;
    description: string;
    body: React.ReactNode;
    footer: React.ReactNode;
    className?: string;
};

const Modal = ({ ...props }: TModalProps) => {
    return (
        <ModalProvider>
            <Root {...props} />
        </ModalProvider>
    )
}

const Root = ({ ...props }: TModalProps) => {
    const { trigger, title, description, body, footer, className } = props;
    const { open, setOpen } = useModal();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger onClick={() => setOpen(!open)} asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent onInteractOutside={(e) => { e.preventDefault() }} className={twMerge("max-w-[80vw] max-h-[80vh] overflow-auto", className)}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>

                {body}

                <DialogFooter>
                    {footer}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export {
    Modal,
    useModal,
}
