import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check for the only valid credential
    if (email === 'admin@admin.com' && password === 'admin@123') {
      toast({
        title: "Login Successful",
        description: "Welcome back, John Doe!"
      });

      // Store admin session in localStorage
      const session = {
        user: {
          email: 'admin@admin.com',
          name: 'John Doe',
          role: 'admin',
          id: 'admin-user-id'
        },
        isAuthenticated: true
      };
      localStorage.setItem('taskloop_session', JSON.stringify(session));

      // Redirect to home after login
      navigate('/home');
      return;
    }

    // For demo purposes, allow any login
    toast({
      title: "Login Successful",
      description: "Welcome to Task Loop!"
    });

    // Store a generic session
    const session = {
      user: {
        email: email || 'user@example.com',
        name: 'Demo User',
        role: 'user',
        id: 'demo-user-id'
      },
      isAuthenticated: true
    };
    localStorage.setItem('taskloop_session', JSON.stringify(session));

    // Redirect to home after login
    navigate('/home');
  };
  return <div className="flex flex-col items-center min-h-screen bg-background">
      <div className="w-full text-center py-12">
        <h1 className="text-5xl font-bold text-primary">TaskLoop</h1>
      </div>
      
      <div className="w-full max-w-md px-4 md:px-0">
        <div className="border-border bg-card p-6 rounded-lg shadow-md space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-accent"></div>
          
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
            <p className="text-center text-muted-foreground text-sm">
              Sign in to continue using TaskLoop
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="name@example.com" className="input-dark" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" className="input-dark" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Remember for 30 days
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>
            
            <Button type="submit" className="w-full">Sign in</Button>
            
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <Link to="/" className="text-sm text-primary hover:underline">
                Back to Home
              </Link>
            </div>
            
            
          </form>
        </div>
      </div>
    </div>;
};
export default Login;