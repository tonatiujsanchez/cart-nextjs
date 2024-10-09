import { Header } from "../components/header";

export default function SiteLayout({ children }:Readonly<{
    children: React.ReactNode
}>) {
    
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}