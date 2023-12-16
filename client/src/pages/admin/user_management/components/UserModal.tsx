import { Button } from '@/components/ui/button'
import { AddUserForm } from './AddUserForm'
import { Modal } from '@/components/global/Modal'
import { EditUserForm } from './EditUserForm';


const UserModal = ({ ...props }) => {
    const { isEditing = false, id = null } = props;
    return (
        <Modal
            trigger={isEditing ? <Button className="w-full font-normal items-start justify-start px-2 py-1.5 h-fit" variant={"ghost"}>Edit User</Button> : <Button>Add User</Button>}

            title={`${isEditing ? 'Edit' : 'Add'} User`}

            description={`${isEditing ? 'Edit' : 'Create'} user here. Click save when you're done.`}

            body={isEditing ? <EditUserForm id={id} /> : <AddUserForm />}

            footer={<Button form={isEditing ? 'edit-user-form' : 'add-user-form'} type="submit">Save changes</Button>}
        />
    )
}

export { UserModal }
