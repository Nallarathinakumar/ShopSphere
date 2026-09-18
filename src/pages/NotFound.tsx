import { Link } from "react-router-dom";
import { usePageTracking } from "../hooks/usePageTracking";

export default function NotFound() {
  usePageTracking("Not Found", "error-404");
  return (
    <div className="page">
      <h1>Page not found</h1>
      <p className="muted">The page you are looking for does not exist in this store.</p>
      <Link className="btn-primary" to="/">Back to home</Link>
    </div>
  );
}
