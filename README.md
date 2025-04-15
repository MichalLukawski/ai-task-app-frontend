# 🧩 Frontend – AI Task App

Frontend projektu AI Task App to aplikacja zbudowana w oparciu o **React**, **Vite** i **TailwindCSS**, stanowiąca interfejs użytkownika dla systemu zarządzania zadaniami wspieranego przez sztuczną inteligencję. Umożliwia tworzenie, przeglądanie, edycję i zamykanie zadań technicznych, z integracją modelu GPT oraz embeddingów semantycznych.

---

## ⚙️ Technologie

- **React 18** – biblioteka komponentowa do budowy interfejsu
- **Vite** – szybki bundler do lokalnego developmentu
- **TailwindCSS** – utility-first framework CSS
- **Axios** – komunikacja z backendem
- **React Router v6** – obsługa routingu
- **Context API** – zarządzanie sesją i autoryzacją
- **Custom Hooks** – obsługa stanu kart zadań i formularzy

---

## 🧠 Funkcje frontendu

- Tworzenie zadania na podstawie opisu użytkownika
- Prezentacja poziomu trudności (skala 1–5 w formie gwiazdek)
- Wizualizacja terminu (`DueDateProgress`)
- Edycja danych zadania (termin, trudność)
- Zamykanie zadania ręcznie lub z pomocą AI
- Pasek nawigacyjny z dynamicznymi opcjami logowania/rejestracji

---

## 🗂️ Struktura katalogu `src/`

```
src/
├── api/              # Konfiguracja klienta Axios
├── assets/           # Zasoby statyczne
├── components/       # Komponenty UI (TaskCard, Stars, Editor...)
├── context/          # Kontekst autoryzacji (AuthContext)
├── hooks/            # Własne hooki (np. useTaskCardState)
├── pages/            # Widoki (Welcome, Login, Dashboard)
├── utils/            # Funkcje pomocnicze (formatowanie dat itp.)
├── App.jsx           # Routing, Layout aplikacji
└── main.jsx          # Punkt wejściowy (ReactDOM.createRoot)
```

---

## 🚀 Uruchomienie aplikacji

1. Przejdź do folderu frontend:

```bash
cd frontend
```

2. Zainstaluj zależności:

```bash
npm install
```

3. Uruchom aplikację:

```bash
npm run dev
```

4. Aplikacja dostępna będzie pod adresem:

```
http://localhost:5173
```

---

## 🧪 Zmienne środowiskowe

Plik `.env` zawiera kluczowe ustawienia połączeń (np. `VITE_API_URL`). Szczegóły w `docs/frontend/env.md`.

---

## 📄 Dokumentacja frontendowa

Wszystkie aspekty frontendu zostały opisane w dokumentacji technicznej:

- `components.md` – opis komponentów UI
- `hooks.md` – własne hooki
- `utils.md` – funkcje pomocnicze
- `task_components.md` – moduł zadań
- `pages.md`, `routing.md`, `ui_structure.md`, `src.md`
- `task_flow.md` – pełny przebieg pracy z zadaniami

---

## 📌 Uwagi końcowe

- Kod napisany z myślą o modularności i możliwości rozbudowy
- Wszystkie funkcje AI i interakcji zadaniowych obsługiwane przez backend
- Dokumentacja służy jako podstawa dla pracy dyplomowej – zachowana pełna szczegółowość
