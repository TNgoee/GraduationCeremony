import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import CoupleGallery from "@/pages/couple-gallery";
import Timeline from "@/pages/timeline";

import { MusicPlayer } from "@/components/music-player";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/couple-gallery" component={CoupleGallery} />
      <Route path="/timeline" component={Timeline} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MusicPlayer />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
