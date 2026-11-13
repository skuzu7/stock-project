import { Request, Response, NextFunction } from "express";

// The demo schema has no tenant or role relation. Until a durable RBAC model
// exists, writes are restricted to explicit, trusted JWT subject IDs.
// Missing configuration fails closed; never grant write rights to all users.
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const allowed = new Set(
    (process.env.STOCK_ADMIN_USER_IDS ?? "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean)
  );

  if (!req.user_id || !allowed.has(req.user_id)) {
    return res.status(403).json({ error: "forbidden" });
  }
  return next();
}
