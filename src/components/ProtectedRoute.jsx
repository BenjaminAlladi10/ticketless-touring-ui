import React, { useContext } from 'react';
import userContext from '@/contexts/userContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldAlert, LogIn } from 'lucide-react';

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user } = useContext(userContext);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] px-4 text-center">
        <ShieldAlert className="w-16 h-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          Please log in to access this page. You must be authenticated to view this content.
        </p>
        <Link to="/login">
          <Button className="flex items-center gap-2">
            <LogIn className="w-4 h-4" /> Go to Login
          </Button>
        </Link>
      </div>
    );
  }

  if (requireAdmin && !user.isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] px-4 text-center">
        <ShieldAlert className="w-16 h-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Unauthorized Access</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          You do not have the required administrator privileges to view this page.
        </p>
        <Link to="/">
          <Button variant="outline">
            Return to Home
          </Button>
        </Link>
      </div>
    );
  }

  return children;
}
