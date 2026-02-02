"use client";

import { useState, useEffect } from "react";
import { Calendar, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function GoogleCalendarButton() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const response = await fetch("/api/calendar/status");
      const data = await response.json();
      setIsConnected(data.connected);
    } catch (error) {
      console.error("Error checking calendar status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const response = await fetch("/api/calendar/auth");
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error connecting to Google Calendar:", error);
      setIsConnecting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-slate-500">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm">Vérification...</span>
      </div>
    );
  }

  if (isConnected) {
    return (
      <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-xl">
        <CheckCircle className="w-5 h-5" />
        <span className="text-sm font-medium">Google Calendar connecté</span>
      </div>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={isConnecting}
      className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
    >
      {isConnecting ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Calendar className="w-4 h-4 mr-2" />
      )}
      Connecter Google Calendar
    </Button>
  );
}
