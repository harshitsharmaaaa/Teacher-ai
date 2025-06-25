interface LayoutProps {
    children: React.ReactNode;
}
import Link from "next/link";

const Layout=({children}:LayoutProps)=>{

    return (
        <div className=" min-h-screen w-full flex-col items-center justify-center bg-background ">
            {children}  
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking you agree to our
                <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and
                <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            <br />
      </div> 
        </div>
    )
}
export default Layout;