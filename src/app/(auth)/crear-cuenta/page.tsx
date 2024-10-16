import { RegisterForm } from "@/app/components/auth/register-form";

export const metadata = {
  title: 'Crear cuenta',
  description: 'Registrare y empieza a realizar tus compras',
};


export default function RegisterPage() {
  return (
    <RegisterForm />
  );
}