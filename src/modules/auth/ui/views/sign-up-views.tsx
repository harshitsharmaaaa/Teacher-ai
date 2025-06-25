"use client";
import Link from "next/link";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";


import {Input} from "@/components/ui/input";
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
                  <Button variant="outline" type="button" disabled={pending} className="w-full">
                    Google
                  </Button>
                  <Button variant="outline" type="button" disabled={pending} className="w-full">
                    Github
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
          <div className="hidden md:flex flex-col items-center justify-center bg-green-700 text-white p-10 relative">
            <div className="absolute inset-0 bg-green-700 bg-gradient-radial from-green-700 to-green-900 opacity-80" />
            <div className="relative z-10 flex flex-col items-center">
              <img src="/logo.svg" alt="Logo" className="h-24 w-24 mb-4" />
              <p className="text-xl font-semibold">Meet.AI</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
    {/* </div> */}
      </div>
  );


}

