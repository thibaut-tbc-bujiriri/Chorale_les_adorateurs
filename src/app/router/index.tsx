import {
  BookOpen,
  CheckCircle2,
  Music4,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Link, Navigate, useRoutes } from "react-router-dom";

import { AdminRoute } from "@/app/router/AdminRoute";
import { AdminSessionLockRoute } from "@/app/router/AdminSessionLockRoute";
import { GuestRoute } from "@/app/router/GuestRoute";
import { ProtectedRoute } from "@/app/router/ProtectedRoute";
import { RoleGuard } from "@/app/router/RoleGuard";
import { Button } from "@/components/common/Button";
import { AppLayout } from "@/components/layout/AppLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage";
import CategoriesAdminPage from "@/features/categories/pages/CategoriesAdminPage";
import AdminDashboardPage from "@/features/dashboard/pages/AdminDashboardPage";
import FavoritesPage from "@/features/favorites/pages/FavoritesPage";
import ProfilePage from "@/features/profile/pages/ProfilePage";
import AdminSongsPage from "@/features/songs/pages/AdminSongsPage";
import CreateSongPage from "@/features/songs/pages/CreateSongPage";
import EditSongPage from "@/features/songs/pages/EditSongPage";
import SongDetailPage from "@/features/songs/pages/SongDetailPage";
import SongsPage from "@/features/songs/pages/SongsPage";
import UserDetailsPage from "@/features/users/pages/UserDetailsPage";
import UsersAdminPage from "@/features/users/pages/UsersAdminPage";
import { APP_NAME } from "@/lib/constants";

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
            { index: true, element: <LandingPage /> },
            { path: "chants", element: <SongsPage /> },
            { path: "chants/:id", element: <SongDetailPage /> },
            {
              element: <ProtectedRoute />,
              children: [
                { path: "favoris", element: <FavoritesPage /> },
                { path: "profil", element: <ProfilePage /> },
              ],
            },
          ],
        },
        {
          element: <GuestRoute />,
          children: [
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
            { path: "forgot-password", element: <ForgotPasswordPage /> },
          ],
        },
        { path: "reset-password", element: <ResetPasswordPage /> },
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
                { path: "dashboard", element: <AdminDashboardPage /> },
                {
                  element: <RoleGuard allowedRoles={["super_admin", "maitre_chant", "discipline_admin"]} />,
                  children: [
                    { path: "chants", element: <AdminSongsPage /> },
                    { path: "chants/new", element: <CreateSongPage /> },
                    { path: "chants/:id/edit", element: <EditSongPage /> },
                  ],
                },
                {
                  element: <RoleGuard allowedRoles={["super_admin", "maitre_chant"]} />,
                  children: [{ path: "categories", element: <CategoriesAdminPage /> }],
                },
                {
                  element: <RoleGuard allowedRoles={["super_admin"]} />,
                  children: [
                    { path: "utilisateurs", element: <UsersAdminPage /> },
                    { path: "utilisateurs/:id", element: <UserDetailsPage /> },
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

