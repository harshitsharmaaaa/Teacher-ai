"use client";
import Link from "next/link";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";


import {Input} from "@/components/ui/input";
import {FaGithub, FaGoogle} from "react-icons/fa";
import {Button} from "@/components/ui/button";
import {  OctagonAlertIcon } from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
    } 
    from "@/components/ui/form";
import { Alert,AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";


const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1,{message:"Password is required"}),
});


export const SignInViews = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                email: "",
                password: "",
            },
        });
  
    const onSubmit = async(data:z.infer<typeof formSchema>) => {
        setError(null);
        setPending(true);

        const {error}= await authClient.signIn.email({
            email: data.email,
            password: data.password,
        },
    {
        onSuccess:()=>{
            router.push("/");
            setPending(false);
        },
        onError: ({error}) => {
            setError(error.message);
        }
    })
        
    };
        return(
           
        <div className="w-full flex items-center justify-center min-h-screen bg-muted px-4">
      <Card className="w-full max-w-4xl overflow-hidden rounded-2xl shadow-lg">
        <CardContent className="grid grid-cols-1 md:grid-cols-2 p-0">
          {/* LEFT SIDE FORM */}
          <div className="flex flex-col justify-center px-6 py-10 md:px-10">
            <Form {...form}>
              <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="text-center">
                  <h1 className="text-2xl font-semibold">Welcome back</h1>
                  <p className="text-muted-foreground">Login to your account</p>
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="********" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {!!error && (
                  <Alert className="bg-destructive/10 border-none rounded-md text-destructive">
                    <OctagonAlertIcon className="h-4 w-4" />
                    <AlertTitle className="text-sm font-medium">{error}</AlertTitle>
                  </Alert>
                )}

                <Button  disabled={pending} type="submit" className="w-full">
                  Sign in
                </Button>

                <div className="relative text-center text-sm text-muted-foreground">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" />
                  </div>
                  <span className="relative bg-background px-2">Or continue with</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button 
                  variant="outline"
                   type="button"
                    disabled={pending}
                    onClick={() => {
                      authClient.signIn.social({
                        provider: "google",
                      });
                    }}
                     className="w-full">
                    <FaGoogle/>
                  </Button>
                  <Button variant="outline" 
                    type="button" 
                    onClick={() => {
                      authClient.signIn.social({
                        provider: "github",
                      });
                    }}
                    disabled={pending}
                    className="w-full"
                    >
                    <FaGithub/>
                  </Button>
                </div>
                <div className="text-center text-sm">
                    Don't have an account?
                    <Link href="/sign-up" className="text-indigo-600 hover:underline">Sign Up</Link>
                </div>
              </form>
            </Form>
          </div>

          {/* RIGHT SIDE IMAGE/PANEL */}
        <div 
  className="hidden md:flex flex-col items-center justify-center p-10 relative overflow-hidden"
  style={{
    background: 'linear-gradient(135deg, #047857 0%, #065f46 30%, #064e3b 100%)',
  }}
>
  {/* Animated gradient overlay */}
  <div 
    className="absolute inset-0"
    style={{
      background: `radial-gradient(circle at 30% 40%, rgba(110, 231, 183, 0.15) 0%, transparent 40%),
                   radial-gradient(circle at 70% 60%, rgba(16, 185, 129, 0.2) 0%, transparent 40%)`,
      animation: 'pulse 12s infinite alternate',
    }}
  />
  
  {/* Grid texture overlay */}
  <div 
    className="absolute inset-0"
    style={{
      backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
      backgroundSize: '20px 20px',
    }}
  />
  
  {/* Floating bubbles */}
  <div 
    className="absolute top-1/4 left-1/4 w-6 h-6 rounded-full"
    style={{
      background: 'rgba(167, 243, 208, 0.3)',
      animation: 'float 8s ease-in-out infinite',
    }}
  />
  <div 
    className="absolute top-1/3 right-1/3 w-4 h-4 rounded-full"
    style={{
      background: 'rgba(110, 231, 183, 0.4)',
      animation: 'float 10s ease-in-out 1s infinite',
    }}
  />
  <div 
    className="absolute bottom-1/4 left-1/3 w-5 h-5 rounded-full"
    style={{
      background: 'rgba(94, 234, 212, 0.3)',
      animation: 'float 9s ease-in-out 2s infinite',
    }}
  />
  
  {/* Content container */}
  <div className="relative z-10 flex flex-col items-center text-center">
    {/* Animated logo container */}
    <div 
      className="p-4 mb-6 rounded-2xl"
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        animation: 'pulseScale 6s infinite alternate',
      }}
    >
      <img 
        src="/logo.svg" 
        alt="Meet.AI Logo" 
        className="h-24 w-24 transition-all duration-500 hover:rotate-6 hover:scale-110"
      />
    </div>
    
    {/* Brand name with gradient text */}
    <h2 
      className="text-3xl font-bold mb-2"
      style={{
        background: 'linear-gradient(to right, #a7f3d0, #5eead4)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      }}
    >
      Meet.AI
    </h2>
    
    {/* Tagline with fade-in effect */}
    <p 
      className="max-w-xs mt-3 text-lg font-light tracking-wide"
      style={{
        color: 'rgba(255, 255, 255, 0.9)',
        animation: 'fadeIn 1.5s ease-out',
      }}
    >
      Intelligent Meetings, Elevated
    </p>
    
    {/* Animated dots */}
    <div className="flex space-x-2 mt-6">
      {[0, 300, 600].map(delay => (
        <div 
          key={delay}
          className="w-2 h-2 rounded-full"
          style={{
            background: '#5eead4',
            animation: `pulse 1.5s ${delay}ms infinite`,
          }}
        />
      ))}
    </div>
  </div>
  
  {/* Inline styles for animations */}
  <style jsx>{`
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-15px); }
    }
    @keyframes pulse {
      0% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.1); }
      100% { opacity: 0.3; transform: scale(1); }
    }
    @keyframes pulseScale {
      0% { transform: scale(1); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2); }
      100% { transform: scale(1.03); box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3); }
    }
    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(10px); }
      100% { opacity: 1; transform: translateY(0); }
    }
  `}</style>
</div>
        </CardContent>
      </Card>
      
    {/* </div> */}
      </div>
  );


}

