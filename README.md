# WeCare

WeCare is a healthcare web app where a patient can find a doctor or hospital, book an appointment and get a QR code for it, with side tools for finding a nearby pharmacy, checking symptoms, paying and meeting a doctor online. We built it for a hackathon at Chitkara University in January 2024.

The work was done in eleven separate repositories: the main app, a clinic appointment system, seven small feature builds and two early drafts. This repository brings them together.

## What it does

**The main app** ([`app/`](app)) is a React front end with an Express and MongoDB back end:

- **Accounts for patients and doctors**, with registration, login and role-based access using JWT.
- **Doctor listing and profiles**, with reviews and feedback from patients.
- **Hospital listing** with a page for each hospital.
- **Appointment booking** that produces a QR code holding the booking details.
- **Profile pages**: patients see their bookings, doctors manage their profile, and photos upload to Cloudinary.

Its header also links out to four tools that were built and deployed separately:

| Header link | What it opens | Source in this repository |
|---|---|---|
| Nearby | A map that finds your location and lists pharmacies around it, using Leaflet and OpenStreetMap. | [`modules/pharmacy-map`](modules/pharmacy-map) |
| Virtual Assessment | A step-by-step self-check: choose an age group, a category and a reading, and get suggested remedies. | [`modules/virtual-assessment`](modules/virtual-assessment) |
| Payment | A page with a Stripe test-mode payment link. | [`modules/payment`](modules/payment) |
| Meet | A video meeting app for online consultations. | Not in this repository; the same app later became the meetings module of [EdConnect](https://github.com/gundeeps247/EdConnect). |

## Repository layout

| Folder | What it is | Built with | Built by |
|---|---|---|---|
| [`app/`](app) | The main WeCare app, with `frontend/` and `backend/`. | React, Vite, Tailwind, Express, Mongoose, JWT | Sukhmangill977, Gundeep Singh, Sangam Arora, Gurdev Singh |
| [`clinic/`](clinic) | A separate clinic appointment system: patients register, browse doctors and manage appointments. | React, TypeScript, Vite, Tailwind, Express, Mongoose, JWT | [Fadil-Tao](https://github.com/Fadil-Tao/MERN-CLINIC), set up for the team by Gurdev Singh |
| [`modules/pharmacy-map`](modules/pharmacy-map) | The "Nearby" pharmacy finder. | HTML, JavaScript, Leaflet, OpenStreetMap Nominatim | Gundeep Singh |
| [`modules/virtual-assessment`](modules/virtual-assessment) | The "Virtual Assessment" self-check. The remedy data is placeholder text. | React | Gundeep Singh |
| [`modules/qr-server`](modules/qr-server) | First QR experiment: an Express endpoint that turns a name and age into a QR code. | Express, React, qrcode | Gundeep Singh |
| [`modules/qr-appointment`](modules/qr-appointment) | Second QR experiment: an appointment form that generates an appointment number and QR code in the browser. This became the booking page in `app/`. | React, qrcode | Gundeep Singh |
| [`modules/pdf-upload-client`](modules/pdf-upload-client) | Front end for uploading a PDF with a title and viewing uploaded files. | React, react-pdf | Gundeep Singh |
| [`modules/pdf-upload-server`](modules/pdf-upload-server) | Back end that stores uploaded PDFs and their details. | Express, Multer, Mongoose | Gundeep Singh |
| [`modules/payment`](modules/payment) | The "Payment" page. | HTML, Stripe payment link | Gundeep Singh |
| [`early-drafts/hospital-project`](early-drafts/hospital-project) | The first draft of the app, from 29 December 2023. | React, Vite, Tailwind | Sukhmangill977 |
| [`early-drafts/hasptaal`](early-drafts/hasptaal) | A front-end skeleton from 30 December 2023 with the page structure the main app kept. | React | Gundeep Singh, Sukhmangill977 |

`clinic/` is the exception in this repository. It is Fadil-Tao's [MERN-CLINIC](https://github.com/Fadil-Tao/MERN-CLINIC) project, which our teammate Gurdev Singh set up to use the same database as the main app. It is included as a single snapshot; its commit history stays in the original repository, and the code remains its author's.

## How it came together

| When | What happened |
|---|---|
| 29–30 December 2023 | Two early drafts of a hospital site (`early-drafts/`). |
| 6 January 2024 | Work starts on the main app (`app/`). |
| 9–18 January | The clinic appointment system is developed (`clinic/`). |
| 17–18 January | Pharmacy map and both QR experiments. |
| 20–21 January | PDF upload, virtual assessment and payment page; the app is renamed WeCare; final push on the main app. |
| 29 March | The front end is pointed at the deployed back end. |

## Running the main app

You need Node.js 20.6 or newer and a MongoDB connection string.

```bash
git clone https://github.com/gundeeps247/wecare-hackathon.git

# Back end, on port 8000
cd wecare-hackathon/app/backend
npm install
cp .env.example .env        # then fill in your own values
npm start

# Front end, in a second terminal
cd wecare-hackathon/app/frontend
npm install
cp .env.example .env
npm run dev
```

The front end calls the 2024 deployment of the back end. To use your local one, change `BASE_URL` in `app/frontend/src/config.js`.

Most other folders run the same way: `npm install`, then `npm start` or `npm run dev`, in each folder that has a `package.json`. Two have no start script: run `clinic/Backend` with `node api/index.js`, and `modules/qr-server` with `node server.js` after building its `client/` folder, because the server serves `client/build`. `modules/pharmacy-map` and `modules/payment` are plain HTML and open directly in a browser.

### Configuration

No credentials are stored in this repository. Folders that need settings have a `.env.example` listing the variable names:

| Folder | Variables |
|---|---|
| `app/backend` | `MONGO_URL`, `JWT_SECRET_KEY`, `PORT` |
| `app/frontend` | `VITE_CLOUD_NAME`, `VITE_UPLOAD_PRESET` for Cloudinary uploads |
| `clinic/Backend` | `MONGODB_URL`, `JWT_SECRET`, `PORT` |
| `clinic/Frontend` | `VITE_API_KEY`, which despite its name is the back end's base URL, plus the two Cloudinary variables |
| `modules/pdf-upload-server` | `MONGODB_URI` |

`modules/pdf-upload-server` does not load `.env` on its own; start it with `node --env-file=.env index.js`.

## Deployments

This is what still loaded on 8 October 2026.

| Part | Address | Status |
|---|---|---|
| Main app | [hospital-liart-ten.vercel.app](https://hospital-liart-ten.vercel.app/) | Loads |
| Main app back end | `hospital-wgj8.onrender.com` | Not responding, so doctor and hospital data do not load |
| Nearby | [healersquad.netlify.app](https://healersquad.netlify.app/) | Loads |
| Virtual Assessment | [stellular-bombolone-b927da.netlify.app](https://stellular-bombolone-b927da.netlify.app/) | Loads |
| Meet | [curacare.vercel.app](https://curacare.vercel.app/) | Loads |
| Payment | `gundeeps247.github.io/payment` | Offline |

## Team

From the commit history:

- [@Sukhmangill977](https://github.com/Sukhmangill977): most of the main app
- Gundeep Singh ([@gundeeps247](https://github.com/gundeeps247)): main app, deployment, and all seven feature modules
- Sangam Arora: main app
- Gurdev Singh ([@whogurdevil](https://github.com/whogurdevil)): main app and clinic setup

The clinic appointment system in `clinic/` was written by [@Fadil-Tao](https://github.com/Fadil-Tao).

## About this repository

The eleven original repositories were merged here in October 2026:

- **History is kept.** Each folder's commits were imported with their original authors and dates, 69 commits in all. `git log -- app` shows the history of one folder. `clinic/` is the one exception: it was added as a single snapshot.
- **Dependencies and build output were left out**: committed `node_modules`, a compiled `build/` folder and `.DS_Store` files.
- **Test uploads were left out**: the PDF files that had been uploaded to `pdf-upload-server` during testing.
- **Credentials were removed.** `.env` files were dropped and a hard-coded database connection string was replaced with an environment variable, throughout the history.

| Folder | Original repository |
|---|---|
| `app` | hospital |
| `clinic` | chitkaraclinic, a copy of Fadil-Tao/MERN-CLINIC |
| `modules/pharmacy-map` | geoAPI |
| `modules/virtual-assessment` | assessment |
| `modules/qr-server` | backend |
| `modules/qr-appointment` | qrcodemern |
| `modules/pdf-upload-client` | pdf-frontend |
| `modules/pdf-upload-server` | pdf-backend |
| `modules/payment` | payment |
| `early-drafts/hospital-project` | hospital_project |
| `early-drafts/hasptaal` | hasptaal |
