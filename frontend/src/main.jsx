import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AdminAuthProvider } from './modules/admin/context/AdminAuthContext'
import './index.css'
import App from './App.jsx'

import { LanguageProvider } from './contexts/LanguageContext'

import { PageTranslationProvider } from './contexts/PageTranslationContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AdminAuthProvider>
          <LanguageProvider>
            <PageTranslationProvider>
              <App />
            </PageTranslationProvider>
          </LanguageProvider>
        </AdminAuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
