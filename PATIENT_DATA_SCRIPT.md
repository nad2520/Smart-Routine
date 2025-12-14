# ✅ COMPLETE: Sample Patient Data Script

## 📋 What I Created

A comprehensive SQL seed script to populate your database with **realistic patient data** for testing the psychiatrist dashboard.

---

## 📁 Files Created

1. ✅ **`scripts/003-seed-patient-data.sql`**
   - Main seed script with sample data
   - 4 patients with complete profiles
   - Routines, mood logs, analytics, reports

2. ✅ **`scripts/HOW_TO_ADD_PATIENT_DATA.md`**
   - Step-by-step guide
   - Troubleshooting tips
   - Quick start instructions

3. ✅ **`scripts/README.md`** (updated)
   - Added documentation for new script

---

## 👥 Sample Patients Included

### **1. John Doe** (High Performer)
- **Email**: john.doe@example.com
- **Routines**: 5 (4 completed = 80%)
- **Mood Logs**: 5 (mostly happy/excellent)
- **Productivity**: ~87%
- **Reports**: 2 (initial + follow-up)
- **Profile**: Productive, manages stress well

### **2. Sarah Smith** (Excellent Balance)
- **Email**: sarah.smith@example.com
- **Routines**: 5 (5 completed = 100%)
- **Mood Logs**: 6 (very positive)
- **Productivity**: ~95%
- **Reports**: 1
- **Profile**: Excellent self-care, yoga & journaling

### **3. Michael Johnson** (Struggling)
- **Email**: michael.johnson@example.com
- **Routines**: 4 (2 completed = 50%)
- **Mood Logs**: 5 (mixed, some anxiety)
- **Productivity**: ~70%
- **Reports**: 2 (ongoing support)
- **Profile**: Dealing with anxiety, needs support

### **4. Emily Davis** (Wellness Focused)
- **Email**: emily.davis@example.com
- **Routines**: 4 (3 completed = 75%)
- **Mood Logs**: 7 (very positive)
- **Productivity**: ~95%
- **Reports**: 1
- **Profile**: Gratitude practice, creative

---

## 📊 Data Breakdown

### **Total Data Created:**
- 👥 **4 Patients**
- ✅ **18 Routines** (various categories)
- 🧠 **23 Mood Logs** (with notes)
- 📈 **28 Analytics Entries** (7 days × 4 patients)
- 📝 **6 Psychiatrist Reports**

### **Mood Distribution:**
- 😊 Happy/Great/Excellent: 15
- 😐 Neutral: 5
- 😔 Sad/Bad: 3

### **Routine Categories:**
- Wellness (meditation, yoga, gratitude)
- Health (exercise, meals, sleep)
- Work (focus sessions, tasks)
- Learning (reading, creative)
- Social (connections)

---

## 🚀 How to Use

### **Quick Start (3 Steps):**

#### **1. Get Your Psychiatrist ID**
```sql
SELECT id, email FROM profiles WHERE role = 'psychiatrist';
```

#### **2. Edit the Script**
Open `scripts/003-seed-patient-data.sql` and find line ~178:
```sql
psychiatrist_uuid UUID := 'REPLACE_WITH_YOUR_PSYCHIATRIST_ID';
```
Replace with your actual ID:
```sql
psychiatrist_uuid UUID := 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
```

#### **3. Run in Supabase**
1. Go to SQL Editor
2. Copy entire script
3. Paste and Run
4. ✅ Done!

---

## 🎯 What You'll See

After running the script, visit `/psychiatrist/patients`:

### **Aggregate Stats:**
```
┌─────────────────────────────────────┐
│ Total Patients: 4                   │
│ Total Reports: 6                    │
│ Avg Productivity: ~87%              │
│ Mood Entries: 23                    │
└─────────────────────────────────────┘
```

### **Each Patient Card:**
```
┌──────────────────────────────────────┐
│ 👤 John Doe        [Create Report]   │
│    john.doe@example.com              │
├──────────────────────────────────────┤
│ [Overview] [Activity] [Mood] [Reports]│
├──────────────────────────────────────┤
│ Overview:                            │
│ • Joined: Jan 15, 2024              │
│ • Routines: 4/5 (80%)               │
│ • Mood Logs: 5                      │
│ • Productivity: 87%                 │
│ • Last Session: 15 days ago         │
│                                      │
│ Activity:                            │
│ • Planned: 56h                      │
│ • Completed: 48.5h                  │
│ • Efficiency: 87%                   │
│                                      │
│ Mood:                                │
│ 😊 Happy - "Great productive day!"  │
│ 😐 Neutral - "Feeling okay..."      │
│ 😊 Excellent - "Completed goals!"   │
│                                      │
│ Reports:                             │
│ • 2 reports written                 │
│ • Last: 15 days ago                 │
└──────────────────────────────────────┘
```

---

## 💡 Use Cases

### **Perfect For:**
- ✅ Testing psychiatrist dashboard
- ✅ Demonstrating features
- ✅ UI/UX development
- ✅ Screenshots/demos
- ✅ Training/onboarding

### **Shows:**
- ✅ Different patient profiles
- ✅ Varied productivity levels
- ✅ Realistic mood patterns
- ✅ Routine completion diversity
- ✅ Report history

---

## ⚠️ Important Notes

### **Placeholder UUIDs:**
The script uses fake UUIDs like:
- `11111111-1111-1111-1111-111111111111`
- `22222222-2222-2222-2222-222222222222`

These are **NOT real auth users**, just profile entries.

### **For Production:**
Replace with real user IDs from `auth.users` table.

### **For Testing:**
Works as-is! Patients will show in dashboard but can't log in.

---

## 🎨 Data Highlights

### **Realistic Details:**
- ✅ Varied mood notes
- ✅ Different routine types
- ✅ Actual session notes in reports
- ✅ Follow-up dates
- ✅ Productivity trends
- ✅ Time tracking data

### **Diverse Scenarios:**
- High performer (Sarah)
- Struggling patient (Michael)
- Balanced wellness (Emily)
- Work-focused (John)

---

## 🔧 Troubleshooting

### **Error: Foreign key constraint**
→ Run `001-init-database.sql` first

### **Error: Duplicate key**
→ Script already ran, safe to ignore

### **No patients showing**
→ Check psychiatrist ID is correct
→ Verify role = 'psychiatrist' in profiles

### **Can't create reports**
→ Make sure psychiatrist ID matches your account

---

## 📚 Next Steps

1. ✅ Run the script
2. ✅ Visit `/psychiatrist/patients`
3. ✅ Explore patient data
4. ✅ Test report creation
5. ✅ Enjoy the full experience!

---

## 🎉 Result

**You now have:**
- ✅ 4 realistic patients
- ✅ Complete data across all tables
- ✅ Varied scenarios for testing
- ✅ Professional demo-ready data

**Perfect for showcasing your psychiatrist dashboard!** 🩺✨
