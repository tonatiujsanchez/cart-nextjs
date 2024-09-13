
export default function AuthLayout({ children }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div>
            <p className="text-3xl">AuthLayout</p>
            {children}
        </div>
    )
}