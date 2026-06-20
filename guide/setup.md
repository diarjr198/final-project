# Setup Guide Typing Game Shooter

Panduan ini untuk menjalankan project dari nol setelah clone/get source code.

## 1. Prasyarat

Install aplikasi berikut:

- PHP sesuai versi Laravel yang digunakan
- Composer
- Node.js
- pnpm
- MySQL via MAMP, XAMPP, atau native MySQL

Cek versi:

```bash
php -v
composer -V
node -v
pnpm -v
```

Jika pnpm belum ada:

```bash
npm install -g pnpm
```

## 2. Clone Project

```bash
git clone <URL_REPOSITORY>
cd final-project
```

## 3. Setup Database

Buat database MySQL baru:

```text
typing_game_shooter
```

### Jika memakai MAMP

Umumnya konfigurasi MySQL MAMP:

```env
DB_HOST=127.0.0.1
DB_PORT=8889
DB_DATABASE=typing_game_shooter
DB_USERNAME=root
DB_PASSWORD=root
```

### Jika memakai XAMPP

Umumnya konfigurasi MySQL XAMPP:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=typing_game_shooter
DB_USERNAME=root
DB_PASSWORD=
```

Jika konfigurasi MySQL lokal berbeda, sesuaikan `DB_PORT`, `DB_USERNAME`, dan `DB_PASSWORD`.

## 4. Setup Backend Laravel

Masuk folder backend:

```bash
cd backend
```

Install dependency PHP:

```bash
composer install
```

Buat file environment:

```bash
cp .env.example .env
```

Generate app key:

```bash
php artisan key:generate
```

Edit `.env` sesuai database yang dipakai.

Contoh MAMP:

```env
APP_URL=http://127.0.0.1:8000
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=8889
DB_DATABASE=typing_game_shooter
DB_USERNAME=root
DB_PASSWORD=root
```

Contoh XAMPP:

```env
APP_URL=http://127.0.0.1:8000
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=typing_game_shooter
DB_USERNAME=root
DB_PASSWORD=
```

Jalankan migrasi:

```bash
php artisan migrate
```

Jalankan backend API:

```bash
php artisan serve --host=127.0.0.1 --port=8000
```

API akan berjalan di:

```text
http://127.0.0.1:8000/api
```

## 5. Setup Frontend React

Buka terminal baru dari root project:

```bash
cd frontend
```

Install dependency Node:

```bash
pnpm install
```

Jika perlu override URL API, buat file `.env` di folder `frontend`:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

Jalankan frontend:

```bash
pnpm dev
```

Frontend biasanya berjalan di:

```text
http://localhost:5173
```

## 6. Alur Test Manual

1. Buka frontend di browser.
2. Register user baru.
3. Login.
4. Masuk menu Game.
5. Klik Start.
6. Ketik kata musuh lalu Enter.
7. Tunggu waktu habis.
8. Skor akan autosave.
9. Cek Dashboard, Data Permainan, Detail, dan Leaderboard.
10. Coba Contact form.

## 7. Command Validasi

Backend:

```bash
cd backend
php artisan test
php artisan route:list --path=api
```

Frontend:

```bash
cd frontend
pnpm lint
pnpm build
```

## 8. Troubleshooting

### SQLSTATE Connection refused

MySQL belum jalan atau port salah.

- MAMP biasanya `8889`
- XAMPP biasanya `3306`

Cek `.env` backend:

```env
DB_HOST=127.0.0.1
DB_PORT=8889
```

### Unknown database

Database belum dibuat. Buat database:

```text
typing_game_shooter
```

Lalu ulangi:

```bash
php artisan migrate
```

### Frontend gagal akses API

Pastikan backend berjalan:

```text
http://127.0.0.1:8000/api
```

Jika beda host/port, buat `frontend/.env`:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

Restart `pnpm dev` setelah mengubah `.env` frontend.

### Perubahan React tidak muncul

Stop dev server lalu jalankan ulang:

```bash
pnpm dev
```

### Permission/cache Laravel error

Jalankan:

```bash
php artisan config:clear
php artisan cache:clear
```
