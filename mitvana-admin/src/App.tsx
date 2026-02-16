import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { env } from "@/config/env.ts";
import { page_routes } from "@/utils/routes/page_routes.ts";

import SuspenseOutlet from "@/components/SuspenseOutlet/index.tsx";

//Providers
const DeleteProvider = React.lazy(
  () => import("@/contexts/DeleteProvider.tsx"),
);

//Layouts
const AuthPersistLayout = React.lazy(
  () => import("@/layouts/AuthPersistLayout"),
);
const DashboardLayout = React.lazy(
  () => import("@/layouts/DashboardLayout/index.tsx"),
);
const AuthLayout = React.lazy(() => import("@/layouts/AuthLayout/index.tsx"));
const ProtectedLayout = React.lazy(() => import("@/layouts/ProtectedLayout"));
const VerifiedLayout = React.lazy(() => import("@/layouts/VerifiedLayout"));
const PermittedLayout = React.lazy(() => import("@/layouts/PermittedLayout"));
const BlockedLayout = React.lazy(() => import("@/layouts/BlockedLayout"));
const GuestLayout = React.lazy(() => import("@/layouts/GuestLayout.tsx"));

//Pages
const PageNotFound = React.lazy(() => import("@/pages/PageNotFound/index.tsx"));
const Dashboard = React.lazy(() => import("@/pages/Dashboard/index.tsx"));
const Profile = React.lazy(() => import("@/pages/Profile"));
const Login = React.lazy(() => import("@/pages/Auth/Login"));
const ForgotPassword = React.lazy(() => import("@/pages/Auth/ForgotPassword"));
const ResetPassword = React.lazy(() => import("@/pages/Auth/ResetPassword"));
const User = React.lazy(() => import("@/pages/User/index.tsx"));
const Color = React.lazy(() => import("@/pages/Color/index.tsx"));
const Tag = React.lazy(() => import("@/pages/Tag/index.tsx"));
const Subscription = React.lazy(() => import("@/pages/Subscription/index.tsx"));
const Pincode = React.lazy(() => import("@/pages/Pincode/index.tsx"));
const Category = React.lazy(() => import("@/pages/Category/index.tsx"));
const HeroImage = React.lazy(() => import("@/pages/HeroImage/index.tsx"));
const Ingredient = React.lazy(() => import("@/pages/Ingredient/index.tsx"));
const CouponCode = React.lazy(() => import("@/pages/CouponCode/index.tsx"));
const Offer = React.lazy(() => import("@/pages/Offer/index.tsx"));
const Setting = React.lazy(() => import("@/pages/Setting/index.tsx"));
const Product = React.lazy(() => import("@/pages/Product/index.tsx"));
const ManageProduct = React.lazy(() => import("@/pages/ManageProduct"));

function App() {
  return (
    <BrowserRouter basename={env.BASE_PREFIX}>
      <Routes>
        <Route element={<AuthPersistLayout />}>
          <Route element={<ProtectedLayout />}>
            <Route element={<BlockedLayout />}>
              <Route element={<VerifiedLayout />}>
                <Route element={<DeleteProvider />}>
                  <Route element={<DashboardLayout />}>
                    <Route
                      element={
                        <PermittedLayout
                          outletType="outlet"
                          allowedRoles={"Admin"}
                          allowLoading={true}
                          display403={true}
                        />
                      }
                    >
                      <Route
                        path={page_routes.dashboard.link}
                        element={<Dashboard />}
                      />
                      <Route path={page_routes.users.link} element={<User />} />
                      <Route
                        path={page_routes.colors.link}
                        element={<Color />}
                      />
                      <Route path={page_routes.tags.link} element={<Tag />} />
                      <Route
                        path={page_routes.subscriptions.link}
                        element={<Subscription />}
                      />
                      <Route
                        path={page_routes.pincode.link}
                        element={<Pincode />}
                      />
                      <Route
                        path={page_routes.categories.link}
                        element={<Category />}
                      />
                      <Route
                        path={page_routes.heroImage.link}
                        element={<HeroImage />}
                      />
                      <Route
                        path={page_routes.ingredients.link}
                        element={<Ingredient />}
                      />
                      <Route
                        path={page_routes.couponCodes.link}
                        element={<CouponCode />}
                      />
                      <Route
                        path={page_routes.offers.link}
                        element={<Offer />}
                      />
                      <Route
                        path={page_routes.settings.link}
                        element={<Setting />}
                      />
                      <Route
                        path={page_routes.products.link}
                        element={<Product />}
                      />
                      <Route
                        path={page_routes.add_product.link}
                        element={<ManageProduct type="add" />}
                      />
                      <Route
                        path={`${page_routes.edit_product.link}:id`}
                        element={<ManageProduct type="edit" />}
                      />
                      <Route
                        path={`${page_routes.clone_product.link}:id`}
                        element={<ManageProduct type="clone" />}
                      />
                      <Route
                        path={page_routes.profile.link}
                        element={<Profile />}
                      />
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>

          <Route element={<GuestLayout />}>
            <Route element={<AuthLayout />}>
              <Route path={page_routes.login.link} element={<Login />} />
              <Route
                path={page_routes.forgot_password.link}
                element={<ForgotPassword />}
              />
              <Route
                path={`${page_routes.reset_password.link}/:token`}
                element={<ResetPassword />}
              />
            </Route>
          </Route>
        </Route>

        <Route element={<SuspenseOutlet />}>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
