import { useState } from "react";
import { toast } from "sonner";

import Modal from "../../../components/ui/Modal";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import {
    updatePassword,
} from "../../auth/services/auth.service";


interface ChangePasswordModalProps {

    open: boolean;

    onClose: () => void;

}


export default function ChangePasswordModal({
    open,
    onClose,
}: ChangePasswordModalProps) {


    const [password, setPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");



    async function handleSubmit() {


        if (
            !password ||
            !confirmPassword
        ) {

            toast.error(
                "Please fill in all fields."
            );

            return;

        }



        if (
            password !== confirmPassword
        ) {

            toast.error(
                "Passwords do not match."
            );

            return;

        }



        if (password.length < 6) {

            toast.error(
                "Password must be at least 6 characters."
            );

            return;

        }



        try {

            await updatePassword(
                password
            );


            toast.success(
                "Password updated successfully."
            );


            setPassword("");

            setConfirmPassword("");

            onClose();


        } catch (error) {

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to update password."
            );

        }

    }



    return (

        <Modal
            open={open}
            title="Change Password"
            onClose={onClose}
        >

            <div className="space-y-5">


                <div>

                    <label className="mb-2 block text-sm font-medium text-white">
                        New Password
                    </label>


                    <Input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        placeholder="••••••••"
                    />

                </div>



                <div>

                    <label className="mb-2 block text-sm font-medium text-white">
                        Confirm Password
                    </label>


                    <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(
                                e.target.value
                            )
                        }
                        placeholder="••••••••"
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
                        Save Password
                    </Button>

                </div>


            </div>


        </Modal>

    );

}