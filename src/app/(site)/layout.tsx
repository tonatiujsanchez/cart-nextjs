import Link from "next/link";

export default function SiteLayout({ children }:Readonly<{
    children: React.ReactNode
}>) {
    
    return (
        <div>
            <header className="border-b">
                <div className="container flex justify-between items-center py-4">
                    <Link className="font-black uppercase text-orange-500" href="/">LOGO</Link>
                    <nav>
                        <ul className="flex gap-5 items-center">
                            <li>
                                <Link href="/hombre">Hombre</Link>
                            </li>
                            <li>
                                <Link href="/mujer">Mujer</Link>
                            </li>
                            <li>
                                <Link href="/nosotros">Nosotros</Link>
                            </li>
                            <li>
                                <Link href="/carrito">Carrito</Link>
                            </li>
                            <li>
                                <Link href="/iniciar-sesion">Ingresar</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            {children}
        </div>
    )
}