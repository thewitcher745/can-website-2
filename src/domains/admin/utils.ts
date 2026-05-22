function getAdminToken(): string | null {
  return localStorage.getItem("admin_token") || null;
}
