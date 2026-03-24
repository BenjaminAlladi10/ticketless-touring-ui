import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col justify-center items-center text-white text-lg bg-gray-800">
      <h1 className="mb-4">Page Not Found</h1>
      <Button variant="outline" onClick={() => navigate(-1)}>
        Back
      </Button>
    </div>
  );
}
