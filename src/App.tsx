import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/fakeAuthContext";

import ProtectedRoute from "./pages/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage";

const City = lazy(() => import("./components/City"));
const CityList = lazy(() => import("./components/CityList"));
const CountryList = lazy(() => import("./components/CountryList"));
const Form = lazy(() => import("./components/Form"));

const HomePage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<HomePage />} />

              <Route path="pricing" element={<Pricing />} />

              <Route path="product" element={<Product />} />

              <Route path="login" element={<Login />} />

              <Route path="*" element={<PageNotFound />} />

              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="cities" replace />} />

                <Route path="cities" element={<CityList />} />

                <Route path="cities/:id" element={<City />} />

                <Route path="countries" element={<CountryList />} />

                <Route path="form" element={<Form />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
