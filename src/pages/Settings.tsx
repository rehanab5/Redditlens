
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Settings() {
  const { user, logout } = useAuth();
  const [email, setEmail] = useState(user?.email || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleAccountUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Account settings updated");
    } catch (error) {
      toast.error("Failed to update account settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiKeyReset = async () => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("API key has been reset");
    } catch (error) {
      toast.error("Failed to reset API key");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        
        <Tabs defaultValue="account" className="space-y-6">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account information
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleAccountUpdate}>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={logout}>
                    Logout
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>API Settings</CardTitle>
                <CardDescription>
                  Manage your API keys and access
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex">
                    <Input
                      id="api-key"
                      value="••••••••••••••••••••••••••••••"
                      readOnly
                      className="rounded-r-none"
                    />
                    <Button 
                      onClick={handleApiKeyReset}
                      className="rounded-l-none"
                      disabled={isLoading}
                    >
                      Reset Key
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    This key provides access to the RedditInsight API
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>Access Permissions</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="bot-detection" className="cursor-pointer">
                        Bot Detection API
                      </Label>
                      <Switch id="bot-detection" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sentiment" className="cursor-pointer">
                        Sentiment Analysis API
                      </Label>
                      <Switch id="sentiment" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="trends" className="cursor-pointer">
                        Trend Forecasting API
                      </Label>
                      <Switch id="trends" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications" className="cursor-pointer">
                      Email Notifications
                    </Label>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="report-ready" className="cursor-pointer">
                      Analysis Reports Ready
                    </Label>
                    <Switch id="report-ready" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="bot-alerts" className="cursor-pointer">
                      Bot Detection Alerts
                    </Label>
                    <Switch id="bot-alerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="trend-updates" className="cursor-pointer">
                      Trend Update Notifications
                    </Label>
                    <Switch id="trend-updates" defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save Notification Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
