
import { LoginForm } from "@/components/auth/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/30 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary">RedditInsight</h1>
          <p className="text-muted-foreground mt-2">
            Advanced Reddit analytics and bot detection
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
