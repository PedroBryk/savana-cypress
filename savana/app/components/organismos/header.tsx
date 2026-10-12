"use client";

import { Title } from "../atomos/title";
import { Description } from "../atomos/description";
import { LoginButton } from "../moleculas/login";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { logout, getToken } from "../../services/authService";

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    setLogado(!!getToken());
  }, [pathname]);

  const handleLogout = () => {
    logout();
    setLogado(false);
    router.push("/login");
  };

  return (
    <header className="relative bg-header p-6 flex justify-center items-center">
      <div className="absolute left-6">
        {logado ? (
          <button
            data-cy="btn-logout"
            onClick={handleLogout}
            className="text-sm font-medium text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          >
            Sair
          </button>
        ) : (
          <LoginButton title="Log-in" href="/login" />
        )}
      </div>

      <div className="text-center">
        <Link href={"/"}>
          <Title className="text-3xl p-6">Savana</Title>
        </Link>
        <Description className="text-xs">Pet Café</Description>
        <Description className="text-xs">Um café para você um lar para eles</Description>
      </div>
    </header>
  );
};