"use client";

import { useState, useEffect } from "react";
import { Calendar, CheckCircle, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function GoogleCalendarButton() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);

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

  const handleDisconnect = async () => {
    setIsDisconnecting(true);
    try {
      const response = await fetch("/api/calendar/disconnect", {
        method: "POST",
      });
      if (response.ok) {
        setIsConnected(false);
      }
    } catch (error) {
      console.error("Error disconnecting from Google Calendar:", error);
    } finally {
      setIsDisconnecting(false);
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
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-xl">
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Google Calendar connecté</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDisconnect}
          disabled={isDisconnecting}
          className="text-slate-500 hover:text-red-500"
          title="Déconnecter Google Calendar"
        >
          {isDisconnecting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <X className="w-4 h-4" />
          )}
        </Button>
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
