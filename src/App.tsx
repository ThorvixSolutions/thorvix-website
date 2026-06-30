import { SiteContentProvider } from './context/SiteContentContext';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <SiteContentProvider>
      <HomePage />
    </SiteContentProvider>
  );
}

export default App;
