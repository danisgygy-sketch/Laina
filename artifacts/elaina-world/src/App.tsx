import React, { useState, useEffect } from "react";
import { Link, Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";

import Home from "@/pages/Home";
import Journey from "@/pages/Journey";
import Gallery from "@/pages/Gallery";
import Grimoire from "@/pages/Grimoire";
import Lore from "@/pages/Lore";
import NotFound from "@/pages/not-found";

import { AudioProvider } from "@/contexts/AudioContext";
import { CursorTrail } from "@/components/CursorTrail";
import { RippleEffect } from "@/components/RippleEffect";
import { Navbar } from "@/components/Navbar";

const queryClient = new QueryClient();

function Router() {
  const [location] = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path="/" component={Home} />
        <Route path="/journey" component={Journey} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/grimoire" component={Grimoire} />
        <Route path="/lore" component={Lore} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AudioProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <CursorTrail />
            <RippleEffect />
            <Navbar />
            <Router />
          </WouterRouter>
        </AudioProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
