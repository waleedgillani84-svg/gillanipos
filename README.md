# 🔥 Gillani Gas Point — LPG Billing System

> **Version:** Pro v5.6  
> **App Creator:** Junaid Gillani

---

## 📌 Description

**Gillani Gas Point** ek complete offline billing app hai specially designed for **LPG Gas Suppliers/Dealers**.  
Ismein aap:

- ✅ Naye bills (slips) create kar sakte hain
- ✅ Bill history dekh sakte hain
- ✅ Contacts manage kar sakte hain
- ✅ 5 different slip design presets choose kar sakte hain
- ✅ Custom design bana sakte hain (colors, fonts, borders, etc.)
- ✅ ZIP backup & restore kar sakte hain
- ✅ Full app as **index.html** download kar sakte hain
- ✅ PNG share aur WhatsApp share support
- ✅ Recycle Bin (30-day auto-delete)

---

## 🚀 Features

| Feature | Description |
|---------|-------------|
| **Slip Generation** | Customer name, amount, phone, note ke saath bill banayein |
| **Multiple Presets** | 5 designs — Thermal Mega, Thermal Pro, Modern, Classic, Custom |
| **Custom Editor** | Shop name, subtitle, footer, font, border, colors sab customize karein |
| **History** | Saare bills search karein, dekhein, delete karein |
| **Contacts** | Customer contacts save karein, call/WhatsApp directly |
| **Backup & Restore** | ZIP file mein full data backup aur restore |
| **Standalone HTML Export** | Poora app ek single `index.html` mein download karein |
| **Recycle Bin** | Deleted items 30 days tak restore ho sakte hain |
| **WhatsApp Share** | Bill directly WhatsApp par share karein |
| **PNG Share** | Bill ki image share/download karein |
| **Text Size Control** | Slip ka font size adjust karein |
| **Shop Numbers** | Dukaan ke multiple contact numbers slip par dikhayein |
| **Dark UI** | Modern dark theme with orange accent |
| **Responsive** | Mobile-first design, PWA-ready |

---

## 🛠️ Tech Stack

| Technology | Use |
|------------|-----|
| **HTML5** | Structure |
| **Tailwind CSS (CDN)** | Styling |
| **Vanilla JavaScript** | Logic |
| **IndexedDB** | Offline data storage |
| **LocalStorage** | Primary data persistence |
| **html2canvas** | PNG export |
| **JSZip** | ZIP backup & restore |
| **Fontsource (Outfit)** | Custom font |
| **WhatsApp API** | Text sharing |

---

## 📱 How to Use

### 1. Create a Slip
- **Slip** tab mein:
  - Customer Name
  - Amount (Rs.)
  - Phone (optional)
  - Extra Note (optional)
- **SLIP PRINT KAREN** click karein
- Preview dekhein, **Share PNG** karein

### 2. View History
- **History** tab mein saare bills hain
- Search karein (name, bill #, amount)
- Kisi bhi bill par click karke detail dekhein
- WhatsApp ya PNG share karein
- Delete karein (Recycle Bin mein jaata hai)

### 3. Manage Contacts
- **Contacts** tab mein:
  - Naam aur phone daalein
  - Save karein
  - Call / WhatsApp buttons se direct contact karein
  - Delete karein (Recycle Bin mein jaata hai)

### 4. Settings & Design
- **Settings** tab mein:
  - 5 design presets mein se choose karein
  - **Custom** select karke apna design banayein:
    - Shop Name
    - Subtitle
    - Footer
    - Font family
    - Border style
    - Background & text colors
  - Shop numbers add/remove karein
  - Slip text size adjust karein
  - **Data Management**:
    - `Download Full HTML App` — poora app ek file mein
    - `ZIP Backup Download` — saara data ZIP mein
    - `Backup Restore` — ZIP/JSON se restore
    - `Recycle Bin` — deleted items restore/delete

---

## 💾 Data Storage

- **Primary:** LocalStorage
- **Secondary:** IndexedDB (auto-sync)
- **Backup:** ZIP file export/import

### Auto-Sync Flow:
1. Data localStorage mein save hota hai
2. IndexedDB mein backup automatically save hota hai
3. App launch par IDB se data restore hota hai agar localStorage empty ho

---

## 🗑️ Recycle Bin

- Deleted slips aur contacts **30 days** tak store hote hain
- **Restore** option available
- **Permanent Delete** option available
- **Empty Trash** — sab permanently delete

---

## 📦 Backup & Restore

### Backup (ZIP):
```bash
Settings → Data Management → ZIP Backup Download
