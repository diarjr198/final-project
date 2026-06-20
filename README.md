# Typing Game Shooter

Typing Game Shooter adalah aplikasi web game mengetik bertema sci-fi shooter. Pemain mengetik kata yang muncul pada musuh untuk menembak, mendapatkan combo, skor, akurasi, WPM, dan menyimpan hasil permainan ke leaderboard.

## Tech Stack

### Frontend
- ReactJS + Vite
- React Router DOM
- Axios
- CSS custom responsive sci-fi UI
- pnpm

### Backend
- Laravel REST API
- Laravel Sanctum token authentication
- Eloquent ORM

### Database
- MySQL via MAMP/XAMPP/native MySQL

## Struktur Project

```text
final-project/
├── backend/          # Laravel API
├── frontend/         # React SPA
├── guide/
│   └── setup.md      # Panduan setup dari nol
└── README.md
```

## Fitur

- Register, login, logout
- Profile user
- Dashboard statistik pemain
- Gameplay typing shooter
- Autosave skor setelah waktu habis
- Data permainan + detail riwayat
- Leaderboard global
- Contact form
- Responsive UI

## Quick Start

Baca panduan lengkap di:

```text
guide/setup.md
```

Ringkas:

```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan serve --host=127.0.0.1 --port=8000
```

Terminal lain:

```bash
cd frontend
pnpm install
pnpm dev
```

Frontend default berjalan di `http://localhost:5173` dan API di `http://127.0.0.1:8000/api`.

## Konfigurasi Database

Default `.env.example` memakai konfigurasi MAMP:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=8889
DB_DATABASE=typing_game_shooter
DB_USERNAME=root
DB_PASSWORD=root
```

Jika memakai XAMPP, biasanya ubah menjadi:

```env
DB_PORT=3306
DB_PASSWORD=
```

## Validasi

Frontend:

```bash
cd frontend
pnpm lint
pnpm build
```

Backend:

```bash
cd backend
php artisan test
php artisan route:list --path=api
```
