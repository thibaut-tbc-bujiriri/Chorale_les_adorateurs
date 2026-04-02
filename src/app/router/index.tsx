import {
  BookOpen,
  CheckCircle2,
  Music4,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { lazy, Suspense, useMemo, type ReactNode } from "react";
import { Link, Navigate, useRoutes } from "react-router-dom";

import { AdminRoute } from "@/app/router/AdminRoute";
import { AdminSessionLockRoute } from "@/app/router/AdminSessionLockRoute";
import { GuestRoute } from "@/app/router/GuestRoute";
import { ProtectedRoute } from "@/app/router/ProtectedRoute";
import { RoleGuard } from "@/app/router/RoleGuard";
import { useUiStore } from "@/app/store/ui.store";
import { Button } from "@/components/common/Button";
import { Loader } from "@/components/common/Loader";
import { AppLayout } from "@/components/layout/AppLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { APP_NAME } from "@/lib/constants";

const ForgotPasswordPage = lazy(() => import("@/features/auth/pages/ForgotPasswordPage"));
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/features/auth/pages/RegisterPage"));
const ResetPasswordPage = lazy(() => import("@/features/auth/pages/ResetPasswordPage"));
const CategoriesAdminPage = lazy(() => import("@/features/categories/pages/CategoriesAdminPage"));
const AdminDashboardPage = lazy(() => import("@/features/dashboard/pages/AdminDashboardPage"));
const FavoritesPage = lazy(() => import("@/features/favorites/pages/FavoritesPage"));
const ProfilePage = lazy(() => import("@/features/profile/pages/ProfilePage"));
const AdminSongsPage = lazy(() => import("@/features/songs/pages/AdminSongsPage"));
const CreateSongPage = lazy(() => import("@/features/songs/pages/CreateSongPage"));
const EditSongPage = lazy(() => import("@/features/songs/pages/EditSongPage"));
const SongDetailPage = lazy(() => import("@/features/songs/pages/SongDetailPage"));
const SongsPage = lazy(() => import("@/features/songs/pages/SongsPage"));
const UserDetailsPage = lazy(() => import("@/features/users/pages/UserDetailsPage"));
const UsersAdminPage = lazy(() => import("@/features/users/pages/UsersAdminPage"));

function withRouteSuspense(element: ReactNode) {
  return <Suspense fallback={<Loader label="Chargement..." />}>{element}</Suspense>;
}

function IntroGate() {
  const { hasIntroStarted, startIntro } = useUiStore();

  const versionLabel = useMemo(() => import.meta.env.VITE_APP_VERSION ?? "Version 1.0.0", []);

  if (!hasIntroStarted) {
    return (
      <section className="relative flex min-h-[calc(100dvh-73px)] w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/roberts.webp')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-sky-200/70 backdrop-blur-[2px]" />
        <article className="relative z-10 w-full max-w-3xl px-6 py-10 text-center">
          <h1 className="mx-auto block w-[20ch] overflow-hidden whitespace-nowrap border-r-2 border-white text-center text-4xl font-bold text-white [animation:typing_2.6s_steps(20,end),blink_0.9s_step-end_infinite] sm:text-7xl">
            Les vrais adorateurs
          </h1>
          <p className="mt-6 text-sm font-medium uppercase tracking-[0.2em] text-white/90 sm:text-lg">
            {versionLabel}
          </p>
          <Button className="mt-8 min-w-40 border border-white/80 bg-white/10 text-white backdrop-blur hover:bg-white/20" onClick={startIntro}>
            Continuer
          </Button>
        </article>
      </section>
    );
  }

  return <LandingPage />;
}

function LandingPage() {
  const features = [
    {
      title: "Répertoire intelligent",
      text: "Recherche globale par numéro, auteur, titre, catégorie et paroles.",
      icon: BookOpen,
    },
    {
      title: "Gestion collaborative",
      text: "Workflow admin clair pour chants, catégories et utilisateurs.",
      icon: Users,
    },
    {
      title: "Accès sécurisé par rôle",
      text: "Interface adaptée au président, maître de chant, discipline et choristes.",
      icon: ShieldCheck,
    },
  ];

  const benefits = [
    "Unifie le répertoire de chants de l'église",
    "Accélère la préparation des répétitions",
    "Facilite la transmission des paroles",
    "Améliore la coordination entre responsables et choristes",
  ];

  return (
    <div className="space-y-10 pb-8 sm:space-y-16">
      <section className="overflow-hidden rounded-3xl border border-brand-100 bg-halo p-5 shadow-soft dark:border-brand-900/30 sm:p-8 md:p-12">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-brand-700">
              <Sparkles className="h-3.5 w-3.5" /> {APP_NAME}
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl">
              Organisez les chants, unissez les voix, servez avec excellence.
            </h1>
            <p className="mt-4 max-w-xl text-base text-slate-700 dark:text-slate-200">
              Une plateforme simple et élégante pour consulter les chants, collaborer en équipe, et piloter
              l'administration de la chorale avec sérénité.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/login" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto">Se connecter</Button>
              </Link>
              <Link to="/chants" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full sm:w-auto">Voir les chants</Button>
              </Link>
            </div>
          </div>
          <div className="rounded-2xl bg-white/80 p-5 backdrop-blur dark:bg-slate-900/80">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Rôles et usages</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li><strong>Président:</strong> supervision complète et gestion des utilisateurs.</li>
              <li><strong>Maître de chant:</strong> pilotage du contenu musical et des catégories.</li>
              <li><strong>Directeur de discipline:</strong> organisation opérationnelle et suivi.</li>
              <li><strong>Choriste:</strong> consultation des chants et gestion des favoris.</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Fonctionnalités clés</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <Icon className="h-5 w-5 text-brand-600" />
                <h3 className="mt-3 font-semibold text-slate-900 dark:text-slate-100">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2 md:p-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Bénéfices pour la chorale</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Centralisez le patrimoine musical et améliorez la fluidité entre préparation, répétition et service.
          </p>
        </div>
        <ul className="space-y-2">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-brand-600" />
              {benefit}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl bg-brand-700 px-4 py-8 text-center text-white sm:px-6">
        <Music4 className="mx-auto h-6 w-6" />
        <h2 className="mt-2 text-2xl font-semibold">Prêt à harmoniser votre chorale ?</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-brand-100">
          Connectez-vous et explorez immédiatement toutes les fonctionnalités de la chorale.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link to="/login" className="w-full sm:w-auto">
            <Button variant="secondary" className="w-full sm:w-auto">Se connecter</Button>
          </Link>
          <Link to="/chants" className="w-full sm:w-auto">
            <Button className="w-full bg-white text-brand-700 hover:bg-brand-50 sm:w-auto">Voir les chants</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function NotFoundPage() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
      <h1 className="text-2xl font-bold">Page introuvable</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Cette route n'existe pas dans l'application.</p>
      <Link to="/" className="mt-4 inline-block text-sm text-brand-600 hover:underline">
        Retour à l'accueil
      </Link>
    </section>
  );
}

export function AppRouter() {
  return useRoutes([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          element: <AdminSessionLockRoute />,
          children: [
            { index: true, element: <IntroGate /> },
            { path: "chants", element: withRouteSuspense(<SongsPage />) },
            { path: "chants/:id", element: withRouteSuspense(<SongDetailPage />) },
            {
              element: <ProtectedRoute />,
              children: [
                { path: "favoris", element: withRouteSuspense(<FavoritesPage />) },
                { path: "profil", element: withRouteSuspense(<ProfilePage />) },
              ],
            },
          ],
        },
        {
          element: <GuestRoute />,
          children: [
            { path: "login", element: withRouteSuspense(<LoginPage />) },
            { path: "register", element: withRouteSuspense(<RegisterPage />) },
            { path: "forgot-password", element: withRouteSuspense(<ForgotPasswordPage />) },
          ],
        },
        { path: "reset-password", element: withRouteSuspense(<ResetPasswordPage />) },
      ],
    },
    {
      path: "/admin",
      element: <ProtectedRoute />,
      children: [
        {
          element: <AdminRoute />,
          children: [
            {
              element: <AdminLayout />,
              children: [
                { index: true, element: <Navigate to="dashboard" replace /> },
                { path: "dashboard", element: withRouteSuspense(<AdminDashboardPage />) },
                {
                  element: <RoleGuard allowedRoles={["super_admin", "maitre_chant", "discipline_admin"]} />,
                  children: [
                    { path: "chants", element: withRouteSuspense(<AdminSongsPage />) },
                    { path: "chants/new", element: withRouteSuspense(<CreateSongPage />) },
                    { path: "chants/:id/edit", element: withRouteSuspense(<EditSongPage />) },
                  ],
                },
                {
                  element: <RoleGuard allowedRoles={["super_admin", "maitre_chant"]} />,
                  children: [{ path: "categories", element: withRouteSuspense(<CategoriesAdminPage />) }],
                },
                {
                  element: <RoleGuard allowedRoles={["super_admin"]} />,
                  children: [
                    { path: "utilisateurs", element: withRouteSuspense(<UsersAdminPage />) },
                    { path: "utilisateurs/:id", element: withRouteSuspense(<UserDetailsPage />) },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    { path: "*", element: <NotFoundPage /> },
  ]);
}
