import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './app/App';
import './styles/index.css';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
