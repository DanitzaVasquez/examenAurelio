import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';

const root = document.getElementById('root');
const rootContainer = createRoot(root);
rootContainer.render(<App />);

reportWebVitals();