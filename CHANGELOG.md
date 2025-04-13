# Changelog

## [0.0.1] – 2025-04-13

### Added

- Inicjalizacja projektu frontendowego z użyciem Vite (React + SWC)
- Integracja TailwindCSS v4:
  - Instalacja przez `@tailwindcss/vite`
  - Stylowanie przez `@import "tailwindcss"` (bez `tailwind.config.js`)
- Struktura aplikacji:
  - `src/`: `components/`, `pages/`, `context/`, `App.jsx`, `main.jsx`, `index.css`
- Komponenty:
  - `Header` – dynamiczna nawigacja zależna od logowania
  - `ProtectedRoute` – ochrona widoków wymagających JWT
- Widoki:
  - `WelcomePage`, `LoginPage`, `RegisterPage`, `TasksPage`
- Autoryzacja:
  - `AuthContext` z metodami `login`, `logout`, `useAuth`
  - Przechowywanie tokena JWT w `localStorage`
- Routing:
  - Konfiguracja tras w `App.jsx`
  - Ochrona `/tasks`
- Responsywność:
  - Tailwind + layout `flex`, `min-h-screen`, `px-4`, `sm:text-xl`
- Dokumentacja frontendowa:
  - `frontend_README_FULL.md`
  - `src.md`, `components.md`, `context.md`, `pages.md`
  - `services_PLANNED.md`, `routing.md`, `auth_flow_FULL.md`
  - `env_FULL.md`, `vite_setup_UPDATED.md`, `ui_structure_FULL.md`

### Planned

- `TaskFormPage` – formularz tworzenia zadania z pomocą AI
- Komponenty: `TaskCard`, `TaskList`, `FormField`, `Loader`
- Panel administratora do zatwierdzania użytkowników
- Obsługa feedbacku i historii podobnych zadań
