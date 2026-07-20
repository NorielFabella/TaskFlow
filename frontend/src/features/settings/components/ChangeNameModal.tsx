import { useState } from "react";
import { toast } from "sonner";

import Modal from "../../../components/ui/Modal";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import {
    updateProfileName,
} from "../../auth/services/auth.service";

import {
    useAuth,
} from "../../auth/context/AuthContext";


interface ChangeNameModalProps {

    open: boolean;

    onClose: () => void;

}


export default function ChangeNameModal({
    open,
    onClose,
}: ChangeNameModalProps) {


    const {
        user,
        updateUser,
    } = useAuth();


    const [name, setName] =
        useState(user?.name ?? "");



    async function handleSubmit() {

        if (!name.trim()) {

            toast.error(
                "Name cannot be empty."
            );

            return;

        }


        try {

            const updatedUser =
                await updateProfileName(
                    name
                );


            updateUser(
                updatedUser
            );


            toast.success(
                "Display name updated."
            );


            onClose();


        } catch (error) {

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to update name."
            );

        }

    }



    return (

        <Modal
            open={open}
            title="Change Display Name"
            onClose={onClose}
        >

            <div className="space-y-5">


                <div>

                    <label className="mb-2 block text-sm font-medium text-white">
                        Display Name
                    </label>


                    <Input
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }
                        placeholder="Enter your name..."
                    />

                </div>


                <div className="flex justify-end gap-3">

                    <Button
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>


                    <Button
                        onClick={handleSubmit}
                    >
                        Save Changes
                    </Button>

                </div>


            </div>

        </Modal>

    );

}