import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { compile } from "@fileforge/react-print";
import "./index.css";
import App from "./App.jsx";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastBar, Toaster } from "react-hot-toast";
// import { Document } from "./pages/Dashboard/InvoicePage.jsx";

const queryClient = new QueryClient();

// import { Document } from "./document";

// const html = await compile(<Document />);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster/>
      </QueryClientProvider>
    </AuthProvider>
  // </StrictMode>
);
