
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeProvider";
import { AuthProvider } from "./providers/AuthProvider";
import PrivateRoute from "./components/auth/PrivateRoute";

import Index from "./pages/Index";
import Login from "./pages/Login";
import RegisterSteps from "./pages/RegisterSteps";
import Services from "./pages/Services";
import Providers from "./pages/Providers";
import ServiceDetails from "./pages/ServiceDetails";
import ProviderProfile from "./pages/ProviderProfile";
import ClientProfile from "./pages/ClientProfile";
import AdminProfile from "./pages/admin/AdminProfile";
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
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegisterSteps />} />
              <Route path="/services" element={<Services />} />
              <Route path="/service/:id" element={<ServiceDetails />} />
              <Route path="/providers" element={<Providers />} />
              <Route path="/provider/:id" element={<ProviderProfile />} />
              
              {/* Protected routes - requires authentication */}
              <Route element={<PrivateRoute />}>
                <Route path="/provider/me" element={<ProviderProfile />} />
                <Route path="/profile" element={<ClientProfile />} />
                <Route path="/provider/:id/edit" element={<EditProviderProfile />} />
              </Route>
              
              {/* Admin routes - requires admin role */}
              <Route element={<PrivateRoute allowedRoles={['admin']} />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="profile" element={<AdminProfile />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="categories" element={<AdminCategories />} />
                  <Route path="roles" element={<AdminRoles />} />
                  <Route path="regions" element={<AdminRegions />} />
                  <Route path="services" element={<AdminServices />} />
                </Route>
              </Route>
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
