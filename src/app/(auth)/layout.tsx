import Image from "next/image"
import Link from "next/link"
import { AuthLink } from "../components/auth/auth-link";


export const metadata = {
 title: 'Auth Page',
 description: 'SEO Title',
};

export default function AuthLayout({ children }: Readonly<{
    children: React.ReactNode
}>) {


    return (
        <div className="flex min-h-screen">
            <div className="w-full md:w-3/5 min-h-full flex justify-center items-center p-5">
                <div className="w-full shadow rounded-md px-5 py-7 max-w-[24rem] bg-white">
                    <div className="flex justify-center">
                        <Link
                            href={'/'}
                            className="font-bold text-lg uppercase mb-4"
                        >
                            LOGO
                        </Link>
                    </div>
                    <nav className="flex gap-1 mb-4 rounded-md bg-slate-50 p-2">
                        <AuthLink
                            href={'/iniciar-sesion'}
                        >
                            Iniciar Sesión
                        </AuthLink>
                        <AuthLink
                            href="/crear-cuenta"
                        >
                            Crear Cuenta
                        </AuthLink>
                    </nav>

                    {/* Formularion */}
                    { children }

                </div>
            </div>
            <figure className="hidden md:w-2/5 md:block">
                <Image
                    src={`/products/PROD_17196_1.webp`}
                    alt="Foto"
                    width={1080}
                    height={1080}
                    className="w-full h-full object-cover"
                />
            </figure>
        </div>

    )
}