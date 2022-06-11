export {};

declare global {
  namespace Express {
    interface Request {
      session: any; // 👈️ turn off type checking
    }
  }
}
