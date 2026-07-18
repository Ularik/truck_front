import { redirect } from "next/navigation";


export default function Public() {
    redirect('admin/dashboard')
};