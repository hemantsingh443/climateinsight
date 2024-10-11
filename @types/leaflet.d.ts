
// @types/leaflet.d.ts
import 'leaflet';

declare module 'leaflet' {
  namespace Icon {
    interface Default {
      _getIconUrl?: (name: string) => string;
    }
  }
}
