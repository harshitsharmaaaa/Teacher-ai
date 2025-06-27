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


const formSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email(),
    password: z.string().min(1, { message: "Password is required" }),
    confirmPassword: z.string().min(1, { message: "Confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // show error on this field
    message: "Passwords do not match",
  });

export const SignUpView = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                name: "",
                confirmPassword: "",
                email: "",
                password: "",
            },
        });
   
    const onSubmit = async(data:z.infer<typeof formSchema>) => {
        setError(null);
        setPending(true);

        const {error}= await authClient.signUp.email({
            name: data.name,
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
                  <h1 className="text-2xl font-semibold">Let's get started</h1>
                  <p className="text-muted-foreground">Create  your account</p>
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Name" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ConfirmPassword</FormLabel>
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
                    }
                   }
                   className="w-full">
                    <FaGoogle/>
                  </Button>
                  <Button
                   variant="outline" 
                   type="button" 
                   onClick={() => {
                      authClient.signIn.social({
                        provider: "github",
                      });
                    }}
                   disabled={pending}
                    className="w-full">
                    <FaGithub/>
                  </Button>
                </div>
                <div className="text-center text-sm">
                   Already  have an account?
                    <Link href="/sign-in" className="text-indigo-600 hover:underline">Sign in</Link>
                </div>
              </form>
            </Form>
          </div>

          {/* RIGHT SIDE IMAGE/PANEL */}
          <div className="hidden md:flex flex-col items-center justify-center p-10 relative overflow-hidden min-h-[600px]"
  style={{
    background: 'linear-gradient(135deg, #0f766e 0%, #047857 100%)',
  }}
>
  {/* Animated background elements */}
  <div className="absolute inset-0"
    style={{
      background: `radial-gradient(circle at 20% 30%, rgba(110, 231, 183, 0.2) 0%, transparent 40%),
                   radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.3) 0%, transparent 40%)`,
      animation: 'pulse 15s infinite alternate',
    }}
  />
  
  {/* Floating particles */}
  {[...Array(15)].map((_, i) => (
    <div 
      key={i}
      className="absolute rounded-full"
      style={{
        background: `rgba(255,255,255,${0.2 + Math.random() * 0.3})`,
        width: `${Math.random() * 10 + 5}px`,
        height: `${Math.random() * 10 + 5}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animation: `float ${Math.random() * 10 + 10}s infinite ${Math.random() * 5}s`,
        opacity: Math.random() * 0.8 + 0.2,
      }}
    />
  ))}
  
  {/* Content container */}
  <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
    {/* Animated logo container */}
    <div className="p-5 mb-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/20 shadow-xl"
      style={{
        animation: 'pulseScale 8s infinite alternate',
      }}
    >
      <img 
        src="/logo.svg" 
        alt="Meet.AI Logo" 
        className="h-28 w-28 transition-all duration-500 hover:rotate-6 hover:scale-110"
      />
    </div>
    
    {/* Brand name with gradient text */}
    <h2 className="text-4xl font-bold mb-3 bg-clip-text text-transparent"
      style={{
        backgroundImage: 'linear-gradient(to right, #a7f3d0, #5eead4)',
      }}
    >
      Meet.AI
    </h2>
    
    {/* Tagline */}
    <p className="text-emerald-100 text-xl mb-8 font-light tracking-wide">
      Intelligent Meetings, Elevated
    </p>
    
    {/* Feature list */}
    <div className="space-y-4 mb-10 text-left text-emerald-50">
      <div className="flex items-center">
        <div className="mr-3 w-8 h-8 rounded-full bg-emerald-500/30 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-200" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <span>AI-Powered Meeting Notes</span>
      </div>
      
      <div className="flex items-center">
        <div className="mr-3 w-8 h-8 rounded-full bg-emerald-500/30 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-200" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <span>Real-Time Transcription</span>
      </div>
      
      <div className="flex items-center">
        <div className="mr-3 w-8 h-8 rounded-full bg-emerald-500/30 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-200" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <span>Smart Action Items Tracking</span>
      </div>
    </div>
    
    {/* Testimonial */}
    <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/20">
      <div className="flex items-center mb-3">
        <div className="flex -space-x-2 mr-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-emerald-300 border-2 border-emerald-600" />
          ))}
        </div>
        <div className="text-left">
          <p className="font-semibold">Team Collaboration</p>
          <p className="text-emerald-200 text-sm">Loved by teams worldwide</p>
        </div>
      </div>
      <p className="text-emerald-100 italic">
        "Meet.AI transformed how our team runs meetings. We're 40% more productive!"
      </p>
    </div>
  </div>
  
  {/* Decorative corner elements */}
  <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-emerald-400/50 rounded-tr-3xl" />
  <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-emerald-400/50 rounded-bl-3xl" />
  
  {/* Animated styles */}
  <style jsx>{`
    @keyframes float {
      0%, 100% { transform: translateY(0) translateX(0); }
      25% { transform: translateY(-15px) translateX(10px); }
      50% { transform: translateY(-10px) translateX(-10px); }
      75% { transform: translateY(5px) translateX(15px); }
    }
    @keyframes pulse {
      0% { opacity: 0.5; }
      50% { opacity: 0.8; }
      100% { opacity: 0.5; }
    }
    @keyframes pulseScale {
      0% { transform: scale(1); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); }
      100% { transform: scale(1.03); box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3); }
    }
  `}</style>
</div>
        </CardContent>
      </Card>
      
    {/* </div> */}
      </div>
  );


}

