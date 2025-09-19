import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Shield, BarChart3, Settings, Users, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual authentication with Supabase
    if (loginForm.username === 'admin' && loginForm.password === 'password') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials. Use admin/password for demo.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ username: '', password: '' });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Jatra Admin Portal</CardTitle>
            <CardDescription>
              Content Management & Analytics Dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <Input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="Enter admin username"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <Input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter password"
                  required
                />
              </div>

              <Button type="submit" className="w-full jatra-button-primary">
                <Lock className="w-4 h-4 mr-2" />
                Login to Admin Panel
              </Button>
            </form>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Demo Credentials:</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                Username: <code>admin</code><br />
                Password: <code>password</code>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link to="/" className="text-sm text-primary hover:underline">
                ← Back to Jatra Website
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-2xl font-bold text-primary">Jatra</Link>
              <span className="text-sm text-muted-foreground">Admin Dashboard</span>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage content, verify artisans, and track analytics for Jatra Jharkhand Tourism
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Analytics</CardTitle>
                  <CardDescription>View performance metrics</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Bookings</span>
                  <span className="font-medium">247</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Revenue</span>
                  <span className="font-medium">₹3,45,600</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Eco Points</span>
                  <span className="font-medium">12,450</span>
                </div>
              </div>
              <Button className="w-full mt-4 jatra-button-secondary">
                View Full Analytics
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Artisan Management</CardTitle>
                  <CardDescription>Verify & manage artisans</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pending Verification</span>
                  <span className="font-medium text-yellow-600">5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Approved Artisans</span>
                  <span className="font-medium text-green-600">34</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Applications</span>
                  <span className="font-medium">42</span>
                </div>
              </div>
              <Button className="w-full mt-4 jatra-button-secondary">
                Manage Artisans
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Content Management</CardTitle>
                  <CardDescription>Manage experiences & products</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active Experiences</span>
                  <span className="font-medium">18</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Marketplace Items</span>
                  <span className="font-medium">156</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Draft Content</span>
                  <span className="font-medium">7</span>
                </div>
              </div>
              <Button className="w-full mt-4 jatra-button-secondary">
                Manage Content
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="jatra-button-primary h-20 flex flex-col gap-2">
                <span className="text-sm">Add New</span>
                <span className="text-xs opacity-80">Experience</span>
              </Button>
              
              <Button className="jatra-button-secondary h-20 flex flex-col gap-2">
                <span className="text-sm">Verify</span>
                <span className="text-xs opacity-80">Artisan</span>
              </Button>
              
              <Button className="jatra-button-secondary h-20 flex flex-col gap-2">
                <span className="text-sm">Upload</span>
                <span className="text-xs opacity-80">Images</span>
              </Button>
              
              <Button className="jatra-button-secondary h-20 flex flex-col gap-2">
                <span className="text-sm">Export</span>
                <span className="text-xs opacity-80">Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Supabase Integration Notice */}
        <Card className="mt-6 border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">Backend Integration Required</h3>
                <p className="text-sm text-yellow-700 mb-4">
                  To enable full CMS functionality, authentication, database operations, and file storage, 
                  you need to connect this project to Supabase using Lovable's native integration.
                </p>
                <p className="text-sm text-yellow-700 mb-4">
                  This will enable:
                </p>
                <ul className="text-sm text-yellow-700 space-y-1 ml-4 mb-4">
                  <li>• Secure admin authentication</li>
                  <li>• Database for experiences, artisans, and bookings</li>
                  <li>• File storage for images</li>
                  <li>• Analytics data collection</li>
                  <li>• AI chatbot integration</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;