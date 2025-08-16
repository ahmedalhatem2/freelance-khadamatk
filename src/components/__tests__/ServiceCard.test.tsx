import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "../../providers/ThemeProvider";
import { AuthProvider } from "../../context/AuthProvider";
import ServiceCard from "../services/ServiceCard";

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

const mockService = {
  id: 1,
  title: "Web Development",
  description: "Professional web development services",
  price: 100,
  category: "Technology",
  provider: {
    id: 1,
    name: "John Doe",
    rating: 4.5,
  },
  rating: 4.5,
  reviews_count: 10,
  image: "test-image.jpg",
};

describe("ServiceCard Component", () => {
  test("renders service information correctly", () => {
    renderWithProviders(<ServiceCard service={mockService} />);

    expect(screen.getByText("Web Development")).toBeInTheDocument();
    expect(
      screen.getByText("Professional web development services")
    ).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("Technology")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  test("displays rating correctly", () => {
    renderWithProviders(<ServiceCard service={mockService} />);
    expect(screen.getByText("4.5")).toBeInTheDocument();
    expect(screen.getByText("(10 reviews)")).toBeInTheDocument();
  });

  test("renders service image", () => {
    renderWithProviders(<ServiceCard service={mockService} />);
    const image = screen.getByAltText("Web Development");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test-image.jpg");
  });

  test("handles click on service card", () => {
    const mockOnClick = jest.fn();
    renderWithProviders(
      <ServiceCard service={mockService} onClick={mockOnClick} />
    );

    const card = screen.getByRole("button");
    fireEvent.click(card);

    expect(mockOnClick).toHaveBeenCalledWith(mockService);
  });

  test("handles missing image gracefully", () => {
    const serviceWithoutImage = { ...mockService, image: undefined };
    renderWithProviders(<ServiceCard service={serviceWithoutImage} />);

    const image = screen.getByAltText("Web Development");
    expect(image).toBeInTheDocument();
  });

  test("displays price in correct format", () => {
    const expensiveService = { ...mockService, price: 1500 };
    renderWithProviders(<ServiceCard service={expensiveService} />);

    expect(screen.getByText("$1,500")).toBeInTheDocument();
  });
});
