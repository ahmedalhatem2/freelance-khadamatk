
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterSteps from "./pages/RegisterSteps";
import Services from "./pages/Services";
import Providers from "./pages/Providers";
import ServiceDetails from "./pages/ServiceDetails";
import ProviderProfile from "./pages/ProviderProfile";
import EditProviderProfile from "./pages/EditProviderProfile";
import NotFound from "./pages/NotFound";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminRoles from "./pages/admin/AdminRoles";
import AdminRegions from "./pages/admin/AdminRegions";
import AdminServices from "./pages/admin/AdminServices";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-steps" element={<RegisterSteps />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service/:id" element={<ServiceDetails />} />
          <Route path="/providers" element={<Providers />} />
          <Route path="/provider/:id" element={<ProviderProfile />} />
          <Route path="/provider/:id/edit" element={<EditProviderProfile />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="roles" element={<AdminRoles />} />
            <Route path="regions" element={<AdminRegions />} />
            <Route path="services" element={<AdminServices />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
