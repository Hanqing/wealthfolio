# Craft refresh: design review

Reviewed the portfolio dashboard, net worth, navigation, appearance preferences
and onboarding with synthetic data. The design-review workflow guided four
focused improvements, with before/after screenshots retained in the local
`.gstack/design-reports` folder.

## Changes

- **Overview hierarchy:** frame the balance, inset chart and period controls as
  one surface; strengthen the balance typography and add restrained horizontal
  references. Controls remain in normal document flow.
- **Navigation and accounts:** clarify selected navigation with a purple accent,
  introduce account-type symbols and align amounts with tabular numerals.
- **Theme consistency:** share the preview renderer between onboarding and
  preferences. Fix saved theme/font selection when preferences load
  asynchronously, with four regression tests.
- **Connect composition:** replace three colored feature cards with a two-column
  introduction and numbered feature list. Preserve content height and scrolling
  in narrow onboarding windows.

No financial calculation or persistence API changes.

## Verification

- 133 frontend test files, 1111 tests passed.
- Frontend TypeScript check and ESLint for changed TSX files passed.
- Web and Tauri-target frontend production builds passed.
- Light/dark desktop, phone and tablet screenshots inspected; no document-level
  horizontal overflow at 390px and 768px.
- Sidebar collapse, dashboard tabs and onboarding navigation exercised.

Native Tauri/Rust execution, real database integration and broker/sync workflows
were not tested. Build output retains sourcemap and large-chunk warnings. The
synthetic preview also logs event-stream/add-on and initial chart-measurement
warnings; no JavaScript errors were observed.
