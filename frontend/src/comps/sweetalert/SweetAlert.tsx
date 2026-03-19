import Swal, { type SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

type AlertProps = {
    icon?: SweetAlertIcon; // "success" | "error" | "warning" | "info" | "question"
    title?: string;
    text?: string;
    html?: string;
    confirmText?: string;
    showCancel?: boolean;
    cancelText?: string;
    onConfirm?: () => void;
};

export const showAlert = ({
    icon = "success",
    title = "",
    text = "",
    html,
    confirmText = "OK",
    showCancel = false,
    cancelText = "Batal",
    onConfirm,
}: AlertProps) => {
    MySwal.fire({
        icon,
        title,
        text: html ? undefined : text,
        html: html,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        showCancelButton: showCancel,
        confirmButtonColor: "#0d6efd",
        cancelButtonColor: "#6c757d",
    }).then((result) => {
        if (result.isConfirmed && onConfirm) {
            onConfirm();
        }
    });
};