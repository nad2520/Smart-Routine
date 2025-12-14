# 🚀 QUICK START: Run Your Database Scripts

## ⚡ FASTEST METHOD (2 minutes)

### Step 1: Open Supabase SQL Editor
1. Click this link: https://supabase.com/dashboard/project/lvrktzqctespghnfhuwk/sql/new
2. You'll be taken directly to the SQL Editor

### Step 2: Run Initialization Script
1. Open the file: `scripts/001-init-database.sql` in VS Code
2. Press `Ctrl+A` to select all
3. Press `Ctrl+C` to copy
4. Go back to Supabase SQL Editor
5. Press `Ctrl+V` to paste
6. Click the **"Run"** button (or press `Ctrl+Enter`)
7. ✅ Wait for "Success. No rows returned" message

### Step 3: Run Seed Data (Optional but Recommended)
1. Click "New Query" in Supabase
2. Open the file: `scripts/002-seed-psychology-reports.sql` in VS Code
3. Press `Ctrl+A` to select all
4. Press `Ctrl+C` to copy
5. Go back to Supabase SQL Editor
6. Press `Ctrl+V` to paste
7. Click the **"Run"** button
8. ✅ You should see "Success. 5 rows returned"

### Step 4: Verify It Worked
1. In Supabase Dashboard, go to: Table Editor
2. You should see these tables:
   - ✅ profiles
   - ✅ routines
   - ✅ mood_logs
   - ✅ analytics_data
   - ✅ psychology_reports
   - ✅ user_reports ← **This fixes your error!**

---

## 🎯 What This Fixes

After running these scripts:
- ✅ The `/psychiatrist` page will work (no more PGRST200 error)
- ✅ User reports functionality will be available
- ✅ All RLS policies will be in place
- ✅ Role-based access will work properly

---

## ⏱️ Total Time: ~2 minutes

**DO THIS NOW before continuing with the app!**
