# Antilia E-Commerce

A high-fidelity, fully interactive static Single Page Application (SPA) for a luxury perfume and cosmetics brand.

## Features
- **Luxury Aesthetic**: Sophisticated UI using a Champagne Gold, Off-White, and Charcoal color palette.
- **Client Application (`/`)**: 
  - Landing page with auto-playing hero gallery.
  - Interactive catalog with Quick Add hover functionality.
  - Cart sidebar with dynamic subtotal and checkout confetti.
- **Admin Dashboard (`/admin`)**:
  - Simulated authentication (`admin123`).
  - Inventory management (Create, Read product data).
  - Order history and Registered Customers view.
- **State Management**: Built-in React Context with LocalStorage persistence to simulate a backend database without real API calls.
- **Client-Side Routing**: Handled via `react-router-dom` `HashRouter` for GitHub Pages compatibility.

## Tech Stack
- React 18 (Vite)
- Tailwind CSS v4
- Framer Motion
- Lucide-React
- React Router Dom (HashRouter)

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.

## Deployment to GitHub Pages

Since this SPA uses `HashRouter`, it is perfectly suited for static hosting environments like GitHub Pages.

1. Install the `gh-pages` package:
   ```bash
   npm install gh-pages --save-dev
   ```

2. Update `vite.config.js` to set the base path to your repository name:
   ```javascript
   export default defineConfig({
     base: '/repository-name/', // Replace 'repository-name' with your GitHub repo name
     plugins: [react(), tailwindcss()],
   })
   ```

3. Update `package.json`:
   Add the following scripts:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist",
     ...
   }
   ```
   Add a `homepage` field at the top level:
   ```json
   "homepage": "https://<your-username>.github.io/<repository-name>/",
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```
   This will build the app and push the `dist` directory to the `gh-pages` branch on your repository.

5. Configure GitHub Pages:
   Go to your repository settings -> Pages -> Source: select the `gh-pages` branch.
