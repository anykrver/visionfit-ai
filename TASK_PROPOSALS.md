# Task Proposals from Codebase Review

## 1) Typo Fix Task
**Title:** Correct KPI label typo in enterprise stats card

**Issue found:** In the `ForBrands` page, the first KPI label is `Increase in CV`, which appears to be a typo for `Increase in CVR` (conversion rate). This can confuse readers and weakens trust in business metrics copy.

**Proposed task:**
- Change the label from `Increase in CV` to `Increase in CVR`.
- Do a quick pass for nearby KPI copy consistency (e.g., acronym usage).

**Definition of done:**
- UI shows `Increase in CVR` in the first stats card.

---

## 2) Bug Fix Task
**Title:** Reorder SQL schema so foreign key references are created after parent tables

**Issue found:** `products.merchant_id` references `merchants(id)` before the `merchants` table is created in `database/schema.sql`, which can cause schema execution to fail in PostgreSQL.

**Proposed task:**
- Move `merchants` table creation above `products`, or split foreign key addition into a later `ALTER TABLE` after both tables exist.
- Validate by running schema in a clean database.

**Definition of done:**
- `schema.sql` runs successfully from top to bottom in a clean Supabase/Postgres environment without relation-not-found errors.

---

## 3) Documentation Discrepancy Task
**Title:** Fix database README statement about UUID defaults on all primary keys

**Issue found:** `database/README.md` says all tables use UUID primary keys with `gen_random_uuid()`, but `profiles.id` is a UUID primary key sourced from `auth.users(id)` and does not use `gen_random_uuid()`.

**Proposed task:**
- Update README notes to accurately describe key generation behavior:
  - `products`, `merchants`, `try_ons` use `gen_random_uuid()` defaults.
  - `profiles.id` is inherited from Supabase Auth user IDs.

**Definition of done:**
- README accurately reflects schema behavior with no contradiction.

---

## 4) Test Improvement Task
**Title:** Add regression test for schema execution order and key constraints

**Issue found:** There are currently no automated tests validating SQL schema bootstrapping order/constraints, which allowed the FK ordering issue to exist unnoticed.

**Proposed task:**
- Add a lightweight schema smoke/regression test (e.g., CI step or script) that:
  1. Applies `database/schema.sql` to a fresh Postgres instance.
  2. Verifies expected tables exist.
  3. Verifies critical constraints (e.g., `products.merchant_id -> merchants.id`) are present.

**Definition of done:**
- Test fails on current broken ordering and passes once schema ordering is corrected.
- Test is wired into local validation and/or CI.
