import { useState } from "react";

let authed = false;
let listeners = [];

function notify() {
  listeners.forEach((fn) => fn(authed));
}

export function login() {
  authed = true;
  notify();
}

export function logout() {
  authed = false;
  notify();
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(authed);

  if (!listeners.includes(setIsAuthenticated)) {
    listeners.push(setIsAuthenticated);
  }

  return { isAuthenticated, login, logout };
}
