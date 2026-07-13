import Button from "./Button";
import Modal from "./Modal";

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    description: string;

    confirmText?: string;
    cancelText?: string;

    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmDialog({
    open,
    title,
    description,

    confirmText = "Confirm",
    cancelText = "Cancel",

    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    return (
        <Modal
            open={open}
            title={title}
            onClose={onCancel}
        >
            <div className="space-y-6">

                <p className="text-sm leading-relaxed text-zinc-400">
                    {description}
                </p>

                <div className="flex justify-end gap-3">

                    <Button
                        variant="secondary"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </Button>

                    <Button
                        variant="danger"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </Button>

                </div>

            </div>
        </Modal>
    );
}