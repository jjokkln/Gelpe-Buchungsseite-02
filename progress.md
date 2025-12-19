# Projekt-Fortschritt & Feature-Audit

Status: **In Entwicklung**
Datum: 16.12.2025

Dieses Dokument listet den Status aller Features pro Seite auf, um offene Punkte (`[ ]`) und abgeschlossene Features (`[x]`) klar zu trennen.

---

## 1. Öffentliche Seiten (Frontend)

### Landing Page (`/`)
- [x] **Hero Section**: Bild, Headline, "Buchen"-CTA.
- [x] **Gallery**: Slideshow mit Einblicken (Mobile Optimized).
- [x] **Features**: Grid-Layout mit Icons (Kamera, Klima, etc.).
- [x] **Preistabelle**: Übersicht der Tarife (Halbtag, Tag, WE, Woche) & Zusatzkosten.
- [x] **Footer**: Links zu Rechtstexten, Socials.
- [x] **SEO**: Meta-Tags & OpenGraph Daten optimieren.

### Buchungsprozess (`/buchen`)
- [x] **Wizard-Layout**: Schritt-für-Schritt Navigation (Zeit -> Zahlung -> Ende).
- [ ] **Step 1: Auth-Check**:
    - [x] Login/Register Tabs für Gäste.
    - [x] Redirect Logik (Nach Login zurück zum Step).
    - [ ] **Email-Verifizierung**: Erzwingen vor der Buchung? (Aktuell: Nein).
- [x] **Step 2: Zeitwahl (`DateStep`)**:
    - [x] Kalender mit Range-Selection (`react-day-picker`).
    - [x] Blockierte Tage (Admin & Buchungen) ausgegraut.
    - [x] Automatische Tarif-Erkennung (Halbtag vs Tag vs WE).
    - [x] Zusatz-Kilometer Eingabe & Berechnung.
- [x] **Step 3: Zahlung (`PaymentStep`)**:
    - [x] Zusammenfassung der Kosten.
    - [x] Checkboxen: AGB & Datenschutz.
    - [x] **Stripe**: Checkout Session Erstellung & Weiterleitung.
    - [x] **Barzahlung**: Direkte Buchungserstellung.
- [x] **Sidebar**: Sticky Zusammenfassung & Preis-Monitor.

### Authentifizierung (`/login`)
- [x] **Login**: Email/Passwort Login via Supabase.
- [x] **Registrierung**: Konto-Erstellung mit Profildaten (Name, Tel, Geburtsdatum Check > 21).
- [x] **Design**: Hintergrundbild & Glassmorphism Card.
- [x] **Passwort vergessen**: Flow implementiert (`/login/forgot` & `/dashboard/profile`).

### Rechtliches & Info
- [x] **FAQ** (`/faq`): Accordion mit Fragen.
- [x] **Impressum** (`/impressum`).
- [x] **Datenschutz** (`/datenschutz`).
- [x] **AGB** (`/agb`).
- [x] **Kontakt** (`/kontakt`): Infos & Karte.

---

## 2. Geschützter Nutzer-Bereich (`/dashboard`)

### Dashboard Übersicht
- [x] **Buchungsliste**: Anzeige aller eigenen Buchungen.
- [x] **Status-Anzeige**: Reserved / Paid / Cancelled.
- [x] **Success-Message**: Rückmeldung nach Stripe-Redirect.
- [x] **Rechnungs-Download**: Client-seitige PDF-Generierung (`jspdf`).

### Profil (`/dashboard/profile`)
- [x] **Daten ändern**: Formular für Adresse/Telefon.
- [x] **Passwort ändern**: Formular implementiert.

---

## 3. Admin Bereich (`/admin`)

### Sicherheit
- [x] **Middleware**: Schutz der `/admin` Routen (Nur Role 'admin').
- [ ] **Audit-Log**: Wer hat was geändert? (Nice-to-have).

### Dashboard (`/admin`)
- [x] **Statistik**: Gesamtumsatz, Anzahl Buchungen, User-Count.

### Buchungs-Verwaltung (`/admin/bookings`)
- [x] **Liste**: Tabelle aller Buchungen mit Filter/Sortierung.
- [x] **Status-Änderung**: Manuelles Setzen auf "Bezahlt" (für Barzahler) oder "Storniert".
- [x] **Export**: CSV-Export Button implementiert.
- [ ] **Detail-Ansicht**: Separate Seite für alle Details einer Buchung? (Aktuell in Tabelle/Dialog).

### Kalender-Verwaltung (`/admin/calendar`)
- [x] **Manager**: Übersicht aller Buchungen im Kalender.
- [x] **Blockieren**: Manuelles Sperren von Zeiträumen (Wartung/Urlaub).
- [x] **Entsperren**: Löschen von manuellen Blocks.

### Nutzer-Verwaltung (`/admin/users`)
- [x] **Liste**: Übersicht aller registrierten Kunden.
- [ ] **Detail-Ansicht**: Buchungshistorie pro User einsehen.

---

## 4. Backend & Infrastruktur

### Database (Supabase)
- [x] **Tabellen**: `bookings`, `profiles`, `blocked_dates`.
- [ ] **RLS Policies**: Review nötig - sind alle Daten sicher? (Nur eigene lesen, Admin alles).
- [ ] **Backups**: Strategie definiert?

### Emails (Transaktional)
- [ ] **Buchungsbestätigung**: Email an Kunden bei Eingang.
- [ ] **Admin-Notification**: Neue Buchung eingegangen.
- [ ] **Storno-Info**: Email bei Stornierung.
*Aktuell gar nicht implementiert (nur DB Updates).*

### Cronjobs / Automation
- [ ] **Unbezahlte Reservierungen**: Auto-Storno nach X Stunden bei Stripe-Abbruch? (Cleanup).

---

## Zusammenfassung der wichtigsten fehlenden Features:
1.  **Email-Versand** (Bestätigungen, Stornos, Passwort-Reset).
2.  **Auto-Cleanup** von abgebrochenen Buchungen.
3.  **RLS Security Review**.
