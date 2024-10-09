import { categories } from "@/constant/categories"
import Link from "next/link"


export const Header = () => {
    return (
        <header className="border-b">
            <div className="container flex justify-between items-center py-4">
                <Link className="font-black uppercase text-orange-500" href="/">LOGO</Link>
                <nav>
                    <ul className="flex gap-5 items-center">
                        {
                            categories.map(category => (
                                <li key={category.slug}>
                                    <Link href={`/category/${category.slug}`}>{category.title}</Link>
                                </li>
                            ))
                        }
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
    )
}
