import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "../../providers/ThemeProvider";
import { AuthProvider } from "../../context/AuthProvider";
import Navbar from "../navbar/Navbar";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>{component}</BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe("Navbar Component", () => {
  test("renders navbar with logo", () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText(/KhadamatK/i)).toBeInTheDocument();
  });

  test("renders navigation links", () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText(/Services/i)).toBeInTheDocument();
    expect(screen.getByText(/Providers/i)).toBeInTheDocument();
  });

  test("renders theme toggle button", () => {
    renderWithProviders(<Navbar />);
    const themeToggle = screen.getByRole("button", { name: /toggle theme/i });
    expect(themeToggle).toBeInTheDocument();
  });

  test("theme toggle button is clickable", () => {
    renderWithProviders(<Navbar />);
    const themeToggle = screen.getByRole("button", { name: /toggle theme/i });
    fireEvent.click(themeToggle);
    // Theme toggle should not throw error
    expect(themeToggle).toBeInTheDocument();
  });

  test("renders login/register buttons when not authenticated", () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });
});
