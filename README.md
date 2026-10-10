# VĀK-NLP: Dual-Stage English NLP & Classical Sanskrit Translation Engine

An advanced computational linguistics pipeline and interactive web application that processes English prose through Universal Dependencies and morphological parsing, then compiles it into Classical Sanskrit with strict Pāṇinian vyākaraṇa (Kāraka governance, Subanta/Tiṅanta inflections, Ṣaṣṭhī-Tatpuruṣa compounding, and euphonic Sandhi).

---

## 🏛️ System Architecture

```
                  ┌────────────────────────────────────────┐
                  │       Raw English Paragraph Input      │
                  └───────────────────┬────────────────────┘
                                      │
                                      ▼
             ┌──────────────────────────────────────────────────┐
             │         Phase 1: English NLP Analysis            │
             │                                                  │
             │  • Tokenizer (Offsets & Sentence Segmentation)   │
             │  • Morphology (Lemmatization, UPOS, Penn Tags)   │
             │  • Dependency Parser (Universal Dependencies v2) │
             └────────────────────────┬─────────────────────────┘
                                      │
                                      ▼
             ┌──────────────────────────────────────────────────┐
             │    Phase 2: Classical Sanskrit Translation       │
             │                                                  │
             │  • Kāraka Mapping (Pāṇini Ṣaṭ-kāraka Sūtras)    │
             │  • Samāsa Engine (Tatpuruṣa & Vigraha-vākya)     │
             │  • Subanta & Tiṅanta Inflector                   │
             │  • Classical Sandhi (Mo'nusvāraḥ, Visarga Lopa) │
             │  • Bidirectional IAST <-> Devanāgarī Converter   │
             └────────────────────────┬─────────────────────────┘
                                      │
                                      ▼
     ┌──────────────────────────────────────────────────────────────────┐
     │ Interactive Web Interface (http://localhost:3000) & CLI (cli.js) │
     └──────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### 1. Start the Interactive Web Application
```bash
npm start
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to interact with:
- **Universal Dependencies (UD) Tree Visualizer:** Interactive SVG graph with Bezier dependency arcs and node highlights.
- **Morphology & POS Table:** Searchable table with Penn POS tags, UPOS chips, and morphological feature attributes (`Number`, `Tense`, `Mood`, etc.).
- **Devanāgarī & IAST Output:** High-fidelity classical rendering with speech pronunciation audio.
- **Word-by-Word Alignment Grid:** Complete syntactic mapping between English source tokens and Sanskrit padas, showing Linga, Vacana, Vibhakti, Lakāra, Kāraka role, and Pāṇinian Sūtras.
- **Samāsa & Sandhi Inspector:** Detailed derivation of compounds (*vigraha-vākya*) and euphonic transitions.

### 2. Run Directly from the Command Line (CLI)
```bash
npm run cli
```
Or with custom text:
```bash
node cli.js "Knowledge illuminates the intellect and destroys the darkness of ignorance."
```

### 3. Run Automated Pipeline Test Suite
```bash
npm test
```

### 4. REST API Endpoint
Send a `POST` request to `/api/pipeline`:
```json
POST /api/pipeline
Content-Type: application/json

{
  "text": "Knowledge illuminates the intellect and destroys the darkness of ignorance."
}
```

Response includes the complete Phase 1 parse tree and Phase 2 translation telemetry.

---

## 📜 Key Grammatical Sūtras Implemented
- **Agent (Kartā):** *स्वन्त्रः कर्ता* (१.४.५४) ➔ प्रथमा (२.३.४६)
- **Object (Karma):** *कर्तुरीप्सिततमं कर्म* (१.४.४९) ➔ द्वितीया (२.३.२)
- **Instrument (Karaṇa):** *साधकतमं करणम्* (१.४.४२) ➔ तृतीया (२.३.१८)
- **Tatpuruṣa Compounding:** *सुपो धातुप्रातिपदिकयोः* (२.४.७१)
- **Visarga Elision:** *एतत्तदोः सुलोपोऽकोरनञ्समासे हलि* (६.१.१३२)
- **Anusvāra:** *मोऽनुस्वारः* (८.३.२३)
