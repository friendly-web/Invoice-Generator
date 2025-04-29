import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import InvoiceDetails from "@/pages/InvoiceDetails";
import InvoiceReview from "@/pages/InvoiceReview";

// Marketing and Info Pages
import MarketingContent from "@/pages/MarketingContent";
import InvoicingGuide from "@/pages/InvoicingGuide";
import HelpCenter from "@/pages/HelpCenter";
import TermsOfService from "@/pages/TermsOfService";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import ContactUs from "@/pages/ContactUs";
import AboutUs from "@/pages/AboutUs";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/invoice/create" component={InvoiceDetails} />
      <Route path="/invoice/review" component={InvoiceReview} />
      
      {/* Marketing and Info Pages */}
      <Route path="/marketing-content" component={MarketingContent} />
      <Route path="/invoicing-guide" component={InvoicingGuide} />
      <Route path="/help-center" component={HelpCenter} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/contact-us" component={ContactUs} />
      <Route path="/about" component={AboutUs} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
