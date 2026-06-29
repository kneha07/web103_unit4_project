# WEB103 Project 4 - BOLT BUCKET 🚗

Submitted by: **Neha Kumari**

**BOLT BUCKET** is a custom car builder where you can design your dream car from scratch. Pick your exterior color, wheels, interior, and engine — the price updates live as you make choices. Once you're happy with your build, save it and come back to view, edit, or delete it anytime. Invalid builds (like Off-Road wheels with a Performance engine) are caught before anything gets saved.

Time spent: **X** hours

---

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses React to display data from the API.**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured `CustomItem` table.**
  - [ ] **NOTE: Walkthrough must show the Render dashboard with the Postgres database available**
  - [ ] **NOTE: Walkthrough must show `SELECT * FROM custom_cars;` output in psql**
- [x] **Users can view multiple features of the custom car to customize (color, wheels, interior, engine)**
- [x] **Each customizable feature has multiple options to choose from**
- [x] **The car's color preview banner updates visually when a different color is selected**
- [x] **The total price updates dynamically as options are selected**
- [x] **The visual interface changes in response to at least one customizable feature**
- [x] **Users can submit their build to save it to the list of custom cars**
- [x] **Impossible feature combos (e.g. Off-Road wheels + Sport engine) show an error and are not saved**
- [x] **Users can view a list of all saved custom cars**
- [x] **Users can edit a saved car from the list view**
- [x] **Users can delete a saved car from the list view**
- [x] **Users can edit or delete a car from its detail page**

---

## Optional Features

- [x] Selecting one option automatically disables incompatible options before submitting

## Bonus Features

- [x] Color preview banner changes background color in real-time as you pick a color
- [x] Combo validation runs on both the frontend (instant feedback) and the backend (API rejects bad data)
- [x] Cars are displayed in a responsive card grid with color swatches, specs summary, and price

---

## Video Walkthrough

Here's a walkthrough of the implemented features:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with [Kap](https://getkap.co/) for macOS

---

## Notes

The trickiest part was making the impossible combo validation work in two places — the frontend catches it instantly so the user gets immediate feedback, and the backend double-checks before saving so no bad data ever reaches the database. Getting the Render PostgreSQL `.env` config exactly right (especially the hostname format) also took some careful matching with Render's connection string.

---

## License

Copyright 2024 Neha Kumari

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
