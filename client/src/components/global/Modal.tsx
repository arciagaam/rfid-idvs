import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

type TModalProps = {
    trigger: React.ReactNode;
    title: string;
    description: string;
    body: React.ReactNode;
    footer: React.ReactNode
};

const Modal = ({ ...props }: TModalProps) => {
    const { trigger, title, description, body, footer } = props;

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent onInteractOutside={(e) => { e.preventDefault() }} className="max-w-[80vw] max-h-[80vh] overflow-auto">
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

export { Modal }
