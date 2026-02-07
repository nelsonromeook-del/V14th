import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Valentine from './Valentine.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Valentine />
  </StrictMode>,
);
