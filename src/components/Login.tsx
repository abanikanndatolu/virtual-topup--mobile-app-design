import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Smartphone } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  onNavigateToSignup: () => void;
}

export function Login({ onLogin, onNavigateToSignup }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Login successful!');
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-blue-800 dark:via-purple-800 dark:to-pink-800 flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-md shadow-2xl dark:bg-card/95 backdrop-blur-sm animate-scale-in">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="dark:text-foreground">Welcome to VTU App</CardTitle>
            <CardDescription className="dark:text-muted-foreground">
              Buy airtime, data, virtual cards and more
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="dark:text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="dark:bg-input-background dark:text-foreground dark:border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="dark:text-foreground">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="dark:bg-input-background dark:text-foreground dark:border-border"
              />
            </div>
            <Button type="submit" className="w-full shadow-lg hover:shadow-xl transition-all">
              Login
            </Button>
            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={onNavigateToSignup}
                className="dark:text-blue-400"
              >
                Don't have an account? Sign up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
