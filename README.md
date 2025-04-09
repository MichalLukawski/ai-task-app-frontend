# AI Task App – Frontend

Ten folder zawiera frontend aplikacji AI Task App – klienta React wspomaganego przez GPT.  
Umożliwia zarządzanie zadaniami, przeglądanie historii, tworzenie notatek i komunikację z backendem.

## 🎨 Technologie

- React
- TailwindCSS
- React Router DOM
- localStorage (JWT)
- Vite (lub Create React App – do ustalenia)
- Komunikacja z REST API (fetch / axios)

## 📁 Struktura katalogów (planowana)

```
frontend/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
├── public/
├── .env
└── tailwind.config.js
```

## 🚀 Uruchomienie frontendu

1. Skonfiguruj plik `.env`:

```
VITE_API_URL=http://localhost:5000
```

2. Zainstaluj zależności:

```bash
npm install
```

3. Uruchom aplikację:

```bash
npm run dev
```

## 🧠 Integracja z AI

- Tworzenie struktury zadania z opisu
- Ocena trudności i priorytetu
- Proponowanie kolejności wykonania
- Historia podobnych zadań (planowane)

## 📄 Dokumentacja

- [project_overview.md](https://github.com/MichalLukawski/ai_task_app/blob/main/docs/project_overview.md)
- [backend_overview.md](https://github.com/MichalLukawski/ai_task_app/blob/main/docs/backend_overview.md)
- [frontend_overview.md](https://github.com/MichalLukawski/ai_task_app/blob/main/docs/frontend_overview.md)
- [api_spec.md](https://github.com/MichalLukawski/ai_task_app/blob/main/docs/api_spec.md)
- [ai_integration.md](https://github.com/MichalLukawski/ai_task_app/blob/main/docs/ai_integration.md)
- [project_roadmap.md](https://github.com/MichalLukawski/ai_task_app/blob/main/docs/project_roadmap.md)
