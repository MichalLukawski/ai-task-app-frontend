# Changelog

## [0.0.3] – 2025-04-17

### Added

- Rozbudowany mechanizm edycji pól `dueDate` i `difficulty`:
  - Edycja odbywa się inline w ramach `TaskCardView`, bez przełączania widoków
  - Zmiany są zapisywane dopiero po kliknięciu w kartę, poza pole edycji lub po wciśnięciu klawisza `Enter`
  - Obsługa stanu `isSaving` i `showSaved` dla lepszego UX
  - Po zapisie następuje automatyczne odświeżenie danych przez `GET` (`refetchAfterSave`)
- Wsparcie dla synchronizacji z backendem:
  - `useTaskCardState` po zapisie pobiera aktualny stan zadania z API
  - Użycie `onTaskUpdated()` do aktualizacji globalnej listy zadań
- Logika fokusowania tylko jednej karty (`focusedCardId`) w `DashboardPage`
- Obsługa zamykania karty poprzez podwójne kliknięcie lub `Enter` bez zmiany stanu
- Detekcja kliknięć poza kartą – domknięcie edycji i zapis stanu
- Refaktoryzacja komponentów:
  - `DueDateEditor`, `DifficultySelector`, `TaskCardView`, `TaskCard.jsx` – uproszczenie logiki interakcji
  - Przeniesienie wszystkich kart zadania do folderu `TaskCard/`
- Komunikaty "Zapisuję..." i "✔ Zapisano" w edytowanych polach
- Animacja `saving` – tymczasowe UI na czas aktualizacji
- Dokumentacja:
  - `components.md`, `task_flow.md`, `hooks.md`, `backend_overview.md`, `pages.md`, `api-integration.md`, `project_roadmap.md`

### Changed

- Hook `useTaskCardState` całkowicie przepisany na logikę zarządzania lokalnym stanem `editedTask`
- `TaskCardView` działa teraz bez udziału `TaskCardEdit` – plik ten oznaczono jako przestarzały
- Zmieniono logikę `DashboardPage`:
  - Umożliwia synchronizację zmian z kartami
  - Obsługuje `Enter` w kontekście aktywnej karty
- Usunięto `auto-save` – zapis zawsze musi być wyraźnie zainicjowany

### Removed

- `TaskCardEdit.jsx` – oznaczony jako nieużywany i możliwy do usunięcia
- Wczesne automatyczne zapisywanie pól edycyjnych

---

# Changelog

## [0.0.2] – 2025-04-14

### Added

- Obsługę AI przy tworzeniu zadań: automatyczne generowanie tytułu, terminu (`dueDate`) i poziomu trudności (`difficulty`) na podstawie opisu użytkownika
- Pasek postępu terminu (`DueDateProgress`) wizualizujący czas do `dueDate`
- Edytowalne karty zadań (`TaskCardEdit`) oraz widok podglądu (`TaskCardView`)
- Hook `useTaskCardState` do zarządzania trybem edycji karty zadania
- Możliwość ręcznej zmiany terminu (`DueDateEditor`) i trudności (`DifficultyStars`)
- Obsługę zamykania zadania na dwa sposoby:
  - manualnie na podstawie innego zadania (`sourceTaskId`)
  - automatycznie z oceną `summary` przez AI
- Obsługę podobnych zadań (`similarTasks`) generowanych na podstawie embeddingów

### Changed

- Stronę `/tasks` zastąpiono `/dashboard`
- Formularz tworzenia zadania wbudowano w `DashboardPage` (brak `/tasks/new`)
- Refaktoryzacja struktury komponentów – wprowadzenie podziału na `View` i `Edit`

---

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
