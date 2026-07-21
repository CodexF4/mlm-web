import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Static landing page can be prerendered.
  { path: '', renderMode: RenderMode.Prerender },
  // Auth/data routes depend on the auth cookie and per-user data — render on the client.
  { path: '**', renderMode: RenderMode.Client }
];
