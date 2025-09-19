import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Shield, BarChart3, Settings, Users, Package } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const { user, profile, signIn, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    // Redirect non-admin users
    if (!loading && user && profile && profile.role !== 'admin') {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges.",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [user, profile, loading, navigate, toast]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await signIn(loginForm.email, loginForm.password);
    
    if (!error) {
      // Success handled by auth context
      setLoginForm({ email: '', password: '' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || profile?.role !== 'admin') {
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
                <label className="block text-sm font-medium mb-2">Admin Email</label>
                <Input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter admin email"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <Input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter admin password"
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
                <strong>Admin Access:</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                Use admin@jatra.com with your admin password to access the dashboard.
                <br />
                <small>Note: You need to create an admin account first.</small>
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
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {profile?.name || user?.email}
              </span>
              <Button variant="outline" onClick={signOut}>
                Logout
              </Button>
            </div>
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

        {/* Admin Success Notice */}
        <Card className="mt-6 border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-green-800 mb-2">Admin Dashboard Active</h3>
                <p className="text-sm text-green-700 mb-4">
                  You now have access to the full CMS functionality with Supabase integration:
                </p>
                <ul className="text-sm text-green-700 space-y-1 ml-4">
                  <li>• ✅ Secure admin authentication</li>
                  <li>• ✅ Database for experiences, artisans, and bookings</li>
                  <li>• ✅ File storage for images</li>
                  <li>• ✅ Analytics data collection</li>
                  <li>• ✅ User management system</li>
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