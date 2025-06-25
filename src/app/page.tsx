"use client";
import {Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const {
    data: session,
    isPending,
    error,
    refetch
  }= authClient.useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmit = async () => {
    authClient.signUp.email({
      email,
      password,
      name,
    },{
      onError: (error) => {
        window.alert(`something went wrong: `);
      },
      onSuccess: () => {
        window.alert('User created successfully!');
      }
    })
  
  }

  if(session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-400 p-4">
        <h1 className="text-2xl mb-4">Welcome, {session.user.name}!</h1>
        <p className="mb-2">Email: {session.user.email}</p>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-300 to-gray-500">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
      <div className="flex justify-center mb-6">
        <button
        className={`px-4 py-2 rounded-l ${!name ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        onClick={() => setName('')}
        >
        Login
        </button>
        <button
        className={`px-4 py-2 rounded-r ${name ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        onClick={() => setName('signup')}
        >
        Sign Up
        </button>
      </div>
      {name ? (
        <>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
        <div className="space-y-4">
          <Input
          type="text"
          placeholder="Name"
          value={name === 'signup' ? '' : name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
          />
          <Input
          type="email"
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
          />
          <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full"
          />
        </div>
        <Button 
          onClick={onSubmit}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
        >
          Create User
        </Button>
        </>
      ) : (
        <>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <div className="space-y-4">
          <Input
          type="email"
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
          />
          <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full"
          />
        </div>
        <Button 
          onClick={async () => {
          authClient.signIn.email(
            { email, password },
            {
            onError: () => window.alert('Login failed'),
            onSuccess: () => window.alert('Logged in!')
            }
          );
          }}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
        >
          Login
        </Button>
        </>
      )}
      </div>
    </div>
  )
  
};
