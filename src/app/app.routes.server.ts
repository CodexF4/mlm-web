import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Static marketing pages can be prerendered.
  // { path: '', renderMode: RenderMode.Prerender },
  { path: 'community', renderMode: RenderMode.Prerender },
  { path: 'earn', renderMode: RenderMode.Prerender },
  // Auth/data routes depend on the auth cookie and per-user data — render on the client.
  { path: '**', renderMode: RenderMode.Client }
];
