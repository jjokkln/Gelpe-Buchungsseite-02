# Projekt-Spezifikation: Pferdetransporter-Vermietung Gelpe

## 1. Seitenstruktur & Features

### A. Landingpage

1. **Hero-Section**
    - Großes Bild (Peugeot-Transporter) mittig
        - Oben leichter Schatten
    - Headline: „Pferdetransporter-Vermietung Gelpe“
    - Subheadline: „Flexibel mieten – 1 bis 7 Tage, inkl. Rückfahrkamera & Klimaanlage“
    - Call-to-Action-Button: „Jetzt buchen!“ (Link zur Buchungsseite)
2. **Features & Ausstattung**
    - Icons + Kurztexte:
        - 2-Pferde-Kapazität
        - Rückfahrkamera
        - Klimaanlage
        - Trennwände & Sattelkammer
        - Großer Stauraum
3. **Preistabelle & Tarife**

| **Tarif** | **Preis (inkl. MwSt.)** | **Inklusive km** | **Zusatz-km** |
| --- | --- | --- | --- |
| Halbtagesmiete | 88 € | 100 km | 0,45 €/km |
| Ganztagesmiete | 169 € | 200 km | 0,45 €/km |
| Wochenendtarif | 290 € | 400 km | 0,45 €/km |
| Wochentarif | 999 € | 1000 km | 0,45 €/km |
| **Zusatzkosten** |  |  |  |
| Kaution | 500 € | – | – |
| Reinigungspauschale | 45 € (bei Bedarf) | – | – |
1.  **Ablauf & Bedingungen**
    - Schritt 1: Online buchen & bezahlen
    - Schritt 2: Einweisung & Schlüsselübergabe in Wuppertal
    - Schritt 3: Rückgabe & Checkliste
    - Hinweis: Stornierungsgebühr pauschal 25 €
2.  **Standort & Kontakt**
    - Adresse: Bergische Reitsport-Akademie Gelpe, Dorner Weg 37, 42349 Wuppertal
    - Kontakt: Telefon, E-Mail, Öffnungszeiten für Abholung
    - Eingebettete google maps Karte
3.  **Footer**
    - Links: AGB, Datenschutz, Impressum
    - Social-Icons

### 3. Header & Footer
- **Global Header**: Konsistent über alle Seiten sichtbar (kein transparent/hidden switch mehr, der Content verdeckt).
- **Sticky**: Immer am oberen Bildschirmrand.

### 4. Visuelles Design (Update)
- **Farben**:
    - Primary: Dark Green (`#0f4a0f`).
    - Accent: Gold/Yellow (`#eab308`).
- **Buttons**:
    - **Primary**: Solid Yellow (Accent), Black Text. (Ersetzt vorherige transparente Styles wo nötig).
    - **Hover**: Helleres Gelb oder leichter Glow.
- **Hintergründe**:
    - **Auth Page**: `public/images/auth/login-bg.jpeg`.

### 5. Buchungsprozess (Wizard)
**Ablauf:**
1.  **Auth (Login/Register)**:
    - Eigene Page oder Step mit Hintergrundbild.
    - **Wichtig**: Email-Verifizierung erforderlich bei Registrierung.
2.  **Date Selection**: Kalender (Date Range).
3.  **Payment**: Stripe Integration (Checkout).
4.  **Confirmation**: Success Page.

**UI-Features**:
- **Statusleiste**: Zeigt aktuellen Schritt (1-4) visuell an.
- **Navigation**: "Zurück"-Buttons in jedem Schritt (außer Schritt 1).

### B. Buchungsseite & Prozess

1.  **Navigation**: Breadcrumb (Startseite → Buchung)
2.  **Buchungs-Wizard (4 Schritte)**
    - **Schritt 1: Login / Registrierung**
        - Auswahl: Anmelden oder Registrieren.
        - Methoden: E-Mail & Passwort oder Magic Link.
        - Wenn bereits eingeloggt -> Direkt weiter zu Schritt 2.
    - **Schritt 2: Mietdauer**
        - Kalender-Datepicker (Start- & Enddatum)
        - Constraints: Max. 7 Tage, mind. 24h Vorlauf
        - Eingabe geschätzte extra-Kilometer
        - Logik: Live-Preisberechnung basierend auf Tarif-Tabelle
    - **Schritt 3: Zahlung**
        - Auswahl: Stripe (Kreditkarte/etc.) / Bar bezahlen
        - Checkboxen: AGB & Mietvertrag akzeptieren
        - Anzeige Stornierungsbedingungen
        - Profil-Daten Bestätigung (ausgelagert aus Schritt 2).
    - **Schritt 4: Bestätigung**
        - Zusammenfassung der Buchung
        - Hinweis auf Einweisung vor Ort
        - Link zum User Dashboard

### D. User Dashboard (/dashboard)
1. **Übersicht**
    - Begrüßung.
    - Nächste anstehende Buchung (Highlight).
2. **Meine Buchungen**
    - Liste aller Vergangenen und Aktiven Buchungen.
    - Status-Anzeige (Reserviert, Bezahlt, Storniert).
    - **Aktion**: Stornieren (falls im erlaubten Zeitraum).
3. **Mein Profil**
    - Persönliche Daten ändern (Adresse, Telefon).
    - Passwort ändern (falls PW-Login genutzt).
3. **Sidebar (Sticky)**
    - Live-Anzeige „Dein Tarif“
    - Anzeige Kaution (500 €)
    - Info zur Stornierungsgebühr und Reinigungspauschale

---

## 2. Visuelles Design-System

### Farbwelt

- **Primär**: Dunkles Grün (`#1a5d1a`) – Buttons & Header
- **Primär Dark**: Sehr dunkles Grün (`#0f4a0f`) – Navigation
- **Sekundär**: Weißer Text auf grünem Grund
- **Akzent**: Gold (`#eab308`) – Hervorhebungen & CTA-Buttons

### Typografie

- **Headings**: Inter Sans-Serif (2xl+), fett/klar
- **Display**: Antic Didone (für große Headlines)
- **Fließtext**: Inter (base)

### Layout & UI-Komponenten

- **Formulare**:
    - Progress Bar am oberen Rand
    - Große Input-Felder mit klaren Labels
    - Mobile-First Ansatz
    - Buttons: Primär (Gold/Grün), Sekundär (Dezent/Outline)

---

## 3. Technische Architektur & Stack

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Sprache**: TypeScript
- **Styling**: TailwindCSS

### Backend & Datenbank

- **Service**: Supabase
- **Tabellen**:
    - `profiles` (User-Daten)
    - `bookings` (Buchungsdetails, Status, Preise)
    - `blocked_dates` (Gesperrte Zeiträume/Wartung)
- **Sicherheit**: Row Level Security (RLS) aktiv, Admin-Zugriff via Service Role

### Zahlungsabwicklung (Stripe)

- **Setup**: Stripe Checkout Session
- **Logik**:
    - Line Items: Tarif + Extra-km + Kaution
    - Capture Method: `manual` (Autorisierung bei Buchung, Capture durch Admin)
    - Future Usage: `off_session` (für Nachbelastungen)
- **Webhooks**:
    - `checkout.session.completed` → Status `reserved` (da manual capture) oder `paid`
    - `payment_intent.succeeded` → Status `paid` + Trigger n8n Webhook
### A. Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS.
- **Backend / Database**: **Supabase** (PostgreSQL, Auth, Realtime).
- **Payment**: Stripe (Checkout Sessions).
- **Automation**: n8n (Webhooks).

### B. Datenbank-Schema (Supabase public schema)
1.  `bookings` Table
    - `id`: uuid (PK)
    - `user_id`: uuid (FK -> auth.users)
    - `start_date`: timestamp with time zone
    - `end_date`: timestamp with time zone
    - `status`: text ('reserved', 'paid', 'cancelled')
    - `total_price`: numeric
    - `stripe_session_id`: text
    - `created_at`: timestamp with time zone
2.  `profiles` Table (User Data)
    - `id`: uuid (PK, FK -> auth.users)
    - `first_name`: text
    - `last_name`: text
    - `phone`: text
    - `address_street`: text
    - `address_city`: text
    - `address_zip`: text
    - `role`: text ('user', 'admin')
3.  `blocked_dates` Table
    - `id`: uuid (PK)
    - `date`: date
    - `booking_id`: uuid (FK, nullable)
    - `reason`: text ('manual', 'maintenance', 'booking')

### C. API-Struktur (Next.js Server Actions / API Routes)
- `POST /api/bookings/create` (Initiiert Buchung & Stripe)
- `POST /api/webhooks/stripe` (Empfängt Payment-Success -> Update Booking Status)
- `GET /api/bookings` (User History)
- `POST /api/bookings/cancel` (Storno)

### D. Environment Variables (`.env.local`)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### Technische Richtlinien

- **Sicherheit**: Admin-Client darf niemals in Client-Komponenten importiert werden.
- **Default-Verhalten**: Buchungen starten mit Status `reserved`, Wechsel auf `paid` erst nach erfolgreichem Capture/Zahlungseingang.
### C. Admin Dashboard (Dashboard)

1. **Zugriffssteuerung**
    - Geschützter Bereich (z.B. `/admin`), nur zugänglich via Passwort oder Admin-Authentifizierung.
    - Security: Middleware-Check oder Serverseitige Session-Prüfung.

2. **Features**
    - **User-Verwaltung**:
        - Liste aller registrierten Nutzer.
        - Ansicht der User-Details (Kontakt, Historie).
    - **Buchungs-Übersicht**:
        - Tabellarische Liste aller Buchungen (Neu, Reserviert, Bezahlt, Storniert).
        - Filter-Möglichkeiten (Status, Datum).
    - **Buchungs-Details & Aktionen**:
        - Detailansicht einer Buchung.
        - **Stornieren**: Möglichkeit, eine Buchung zu stornieren (Status-Update + ggf. Release Blocked Date).
    - **Kalender-Management**:
        - Übersicht belegter Tage.
        - **Blockieren**: Manuelles Sperren von Zeiträumen (Wartung/Urlaub).
        - Entsperren von manuellen Blocks.
