import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import SectionHeader from "../../../components/common/SectionHeader";

import { useAuth } from "../../auth/context/AuthContext";
import { useState } from "react";
import ChangeNameModal from "./ChangeNameModal";
import ChangePasswordModal from "./ChangePasswordModal";

export default function AccountSection() {

    const { user } = useAuth();
    const [changeNameOpen, setChangeNameOpen] = useState(false);
    const [changePasswordOpen, setChangePasswordOpen] = useState(false);

    return (

        <Card>

            <SectionHeader
                title="Account"
                subtitle="Manage your account information."
            />

            <div className="space-y-4">

                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">

                    <p className="text-sm text-zinc-400">
                        Display Name
                    </p>

                    <p className="mt-1 text-lg font-semibold text-white">
                        {user?.name}
                    </p>

                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">

                    <p className="text-sm text-zinc-400">
                        Email
                    </p>

                    <p className="mt-1 text-lg font-semibold text-white">
                        {user?.email}
                    </p>

                </div>

                <div className="flex flex-wrap gap-3 pt-2">

                    <Button
                        onClick={() =>
                            setChangeNameOpen(true)
                        }
                    >
                        Change Display Name
                    </Button>

                    <Button
                        onClick={() =>
                            setChangePasswordOpen(true)
                        }
                    >
                        Change Password
                    </Button>

                </div>

            </div>

            <ChangeNameModal
                open={changeNameOpen}
                onClose={() =>
                    setChangeNameOpen(false)
                }
            />

            <ChangePasswordModal
                open={changePasswordOpen}
                onClose={() =>
                    setChangePasswordOpen(false)
                }
            />

        </Card>

    );

}