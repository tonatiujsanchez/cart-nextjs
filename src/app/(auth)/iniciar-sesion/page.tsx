import { LoginForm } from "@/app/components/auth/login-form";
import { Metadata } from "next";

export const metadata:Metadata = {
    title: 'Iniciar Sesión',
    description: 'Inicia sesión y empieza a comprar',
};


export default function LoginPage() {
    return (
        <LoginForm />
    );
}