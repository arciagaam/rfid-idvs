import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

const Modal = ({...props}) => {

    const {trigger, title, description, body, footer} = props;

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