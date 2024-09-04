import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-8nrvr6avytdaccuu.us.auth0.com"
    clientId="oe2pGpZPt2hBfNQKFQGMnTmGBPStKs4b"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
  <StrictMode>
    <App />
  </StrictMode>,
  </Auth0Provider>
)
