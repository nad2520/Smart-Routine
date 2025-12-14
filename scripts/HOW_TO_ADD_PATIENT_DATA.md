# ✅ Updated: Easy-to-Use Patient Data Script

## 🎯 What Changed

The script now uses **variables at the top** so you only need to change **2 UUIDs** in one place!

---

## 🚀 How to Use (Super Simple!)

### **Step 1: Get Your IDs**

Run these queries in Supabase SQL Editor:

```sql
-- Get your user ID (the patient)
SELECT id, email FROM auth.users WHERE email = 'your-email@example.com';

-- Get your psychiatrist ID
SELECT id, email FROM profiles WHERE role = 'psychiatrist';
```

### **Step 2 (NEW): Create the Relationship Table**
Run the new script `scripts/004-create-psychiatrist-patients-table.sql` in Supabase to create the table that links psychiatrists to patients.

### **Step 3 (NEW): Assign the Patient**
Run `scripts/005-assign-patient.sql` to explicitly link your patient `ad2f1733...` to your psychiatrist `cbad328b...`.
(Note: Verify that the IDs in this file match yours if they are different).

### **Step 4: Edit the Seed Script (Optional)**
If you haven't run the seed script yet, you can edit `scripts/003-seed-patient-data.sql`. It is already pre-configured with the IDs you provided:

Open `scripts/003-seed-patient-data.sql` and find **lines 16-17**:

```sql
DECLARE
  -- CHANGE THESE TWO IDs:
  user_uuid UUID := 'ad2f1733-926c-4c15-b381-51d2c5b0c0e0';  -- Your user ID
  psychiatrist_uuid UUID := 'cbad328b-d326-4a76-82a5-c269e7242afc';  -- Your psychiatrist ID
```

Replace with your actual IDs:

```sql
DECLARE
  -- CHANGE THESE TWO IDs:
  user_uuid UUID := 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';  -- Your actual user ID
  psychiatrist_uuid UUID := 'f9e8d7c6-b5a4-3210-fedc-ba0987654321';  -- Your actual psychiatrist ID
```

### **Step 5: Run the Script**

1. Copy the **entire script**
2. Paste in Supabase SQL Editor
3. Click **"Run"**
4. ✅ Done!

---

## 📊 What Gets Created

For **ONE patient** (your user):

- ✅ **8 Routines** (meditation, exercise, work, yoga, journaling, etc.)
- ✅ **10 Mood Logs** (happy, excellent, neutral, sad - with notes)
- ✅ **14 Analytics Entries** (2 weeks of productivity data)
- ✅ **14 Analytics Entries** (2 weeks of productivity data)
- ✅ **3 Psychiatrist Reports** (initial, follow-up, progress review)
- ✅ **1 Patient Assignment** (Links you to the psychiatrist)

---

## 🎨 Data Highlights

### **Routines:**
- Morning Meditation ✅
- Exercise ✅
- Work Session ✅
- Lunch Break ✅
- Reading Time ❌
- Yoga Practice ✅
- Journaling ✅
- Evening Walk ✅

**Completion Rate:** 7/8 = 87.5%

### **Mood Logs:**
- 😊 Happy/Great/Excellent: 7
- 😐 Neutral: 2
- 😔 Sad: 1

### **Analytics:**
- **Total Planned:** 109 hours
- **Total Completed:** 98 hours
- **Productivity Rate:** ~90%

### **Reports:**
- Initial Assessment (30 days ago)
- Follow-up Session (15 days ago)
- Progress Review (5 days ago)

---

## ✨ Benefits of This Approach

### **Before (Old Script):**
```sql
-- Had to change UUID in EVERY line:
INSERT INTO routines VALUES ('11111111-1111-...', ...);
INSERT INTO routines VALUES ('11111111-1111-...', ...);
INSERT INTO mood_logs VALUES ('11111111-1111-...', ...);
-- etc... 50+ times! 😫
```

### **After (New Script):**
```sql
-- Change ONCE at the top:
DECLARE
  user_uuid UUID := 'your-id-here';
  psychiatrist_uuid UUID := 'your-id-here';
BEGIN
  -- Use variables everywhere:
  INSERT INTO routines VALUES (user_uuid, ...);
  INSERT INTO routines VALUES (user_uuid, ...);
  INSERT INTO mood_logs VALUES (user_uuid, ...);
  -- Much easier! 😊
```

---

## 🔍 Verification

After running, check the data was created:

```sql
-- Check routines
SELECT COUNT(*) FROM routines WHERE user_id = 'YOUR_USER_ID';
-- Should return: 8

-- Check mood logs
SELECT COUNT(*) FROM mood_logs WHERE user_id = 'YOUR_USER_ID';
-- Should return: 10

-- Check analytics
SELECT COUNT(*) FROM analytics_data WHERE user_id = 'YOUR_USER_ID';
-- Should return: 14

-- Check reports
SELECT COUNT(*) FROM user_reports WHERE user_id = 'YOUR_USER_ID';
-- Should return: 3
```

---

## 🎯 What You'll See

Go to `/psychiatrist/patients` and you'll see:

```
┌─────────────────────────────────────┐
│ Aggregate Stats:                    │
│ • Total Patients: 1                 │
│ • Total Reports: 3                  │
│ • Avg Productivity: 90%             │
│ • Mood Entries: 10                  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 👤 Your Name      [Create Report]   │
│    your-email@example.com           │
├─────────────────────────────────────┤
│ [Overview] [Activity] [Mood] [Reports]│
├─────────────────────────────────────┤
│ Overview:                           │
│ • Routines: 7/8 (87.5%)            │
│ • Mood Logs: 10                    │
│ • Productivity: 90%                │
│ • Reports: 3                       │
│                                     │
│ Activity:                           │
│ • Planned: 109h                    │
│ • Completed: 98h                   │
│                                     │
│ Mood: (last 10 entries)            │
│ 😊 Happy - "Great productive day!" │
│ 😐 Neutral - "Feeling okay..."     │
│ 😊 Excellent - "Completed goals!"  │
│                                     │
│ Reports:                            │
│ • 3 reports written                │
│ • Last: 5 days ago                 │
└─────────────────────────────────────┘
```

---

## 🧹 Clean Up (If Needed)

To delete the data and start over:

```sql
-- Replace with your actual user ID
DELETE FROM routines WHERE user_id = 'YOUR_USER_ID';
DELETE FROM mood_logs WHERE user_id = 'YOUR_USER_ID';
DELETE FROM analytics_data WHERE user_id = 'YOUR_USER_ID';
DELETE FROM user_reports WHERE user_id = 'YOUR_USER_ID';
```

Then run the seed script again!

---

## 🎉 Summary

**Old Way:** Change 50+ UUIDs manually 😫  
**New Way:** Change 2 UUIDs at the top ✨

**Much easier!** 🚀

---

## 🔧 Troubleshooting: "I'm being redirected to the Patient View"

If you log in as a Psychiatrist but see the Patient Dashboard, your user role might be set incorrectly in the database.

**Fix it by running this script:**

`scripts/fix-psychiatrist-role.sql`

```sql
UPDATE public.profiles
SET role = 'psychiatrist'
WHERE id = '8adda3d9-a621-4d2c-974e-40230304e5fc';  -- Replace with your ID
```

## 🔧 Troubleshooting: "Profiles Table is Empty"

If your `profiles` table is empty but other tables have data, your users were likely created before the database trigger was running.

**Fix it by running this script:**
`scripts/fix-missing-profiles.sql`

This will:
1. Copy all users from `auth.users` to `public.profiles`.
2. Set the psychiatrist role correctly.

## 🔧 Troubleshooting: "I can't see my patients (but they are assigned)"

If you see an empty list even though the data exists in the database, the **Security Policies (RLS)** are likely blocking you from viewing your patients' data.

**Fix it by running this script:**
`scripts/006-enable-psychiatrist-access.sql`

This grants permission for psychiatrists to view:
- Patient Profiles (Names/Emails)
- Routines
- Analytics Data
