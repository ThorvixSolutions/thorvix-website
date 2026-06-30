import { useContext } from 'react';
import { SiteContentContext } from '../context/SiteContentContext';

export function useSiteContent() {
  return useContext(SiteContentContext);
}
