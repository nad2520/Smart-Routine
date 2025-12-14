# Database Scripts

This directory contains SQL scripts for setting up and seeding your Supabase database.

## Scripts Overview

### `001-init-database.sql`
**Purpose**: Complete database initialization script  
**Run**: Once when setting up a new Supabase project  
**Contains**:
- Custom types (user_role enum)
- All table definitions (profiles, routines, mood_logs, analytics_data, psychology_reports, user_reports)
- Indexes for performance optimization
- Row Level Security (RLS) policies
- Helper functions for role-based access
- Auto-profile creation trigger

### `002-seed-psychology-reports.sql`
**Purpose**: Populate sample psychology reports  
**Run**: Optional - for development/testing  
**Contains**: 5 sample psychology articles with realistic content

### `003-seed-patient-data.sql`
**Purpose**: Create sample patient data for psychiatrist dashboard  
**Run**: Optional - for testing psychiatrist features  
**Contains**: 
- 4 sample patient profiles
- Routines for each patient
- Mood logs with notes
- Analytics data (7 days)
- Sample psychiatrist reports
**Note**: Requires updating psychiatrist ID before running. See `HOW_TO_ADD_PATIENT_DATA.md` for instructions.

## How to Use with Supabase

### Option 1: Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Create a new query
4. Copy and paste the contents of `001-init-database.sql`
5. Click **Run** to execute
6. (Optional) Repeat for `002-seed-psychology-reports.sql` to add sample data

### Option 2: Supabase CLI

```bash
# Make sure you're logged in
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Run the initialization script
supabase db push

# Or execute directly
psql -h db.your-project-ref.supabase.co -U postgres -d postgres -f scripts/001-init-database.sql
```

### Option 3: Migration Files

If you want to use Supabase migrations:

```bash
# Create a new migration
supabase migration new init_database

# Copy the content of 001-init-database.sql to the new migration file
# Then apply it
supabase db push
```

## Database Schema

### Tables

- **profiles**: User profile information with role-based access (user, admin, psychiatrist)
- **routines**: Daily routine tasks for users
- **mood_logs**: User mood tracking entries
- **analytics_data**: Productivity analytics (planned vs completed hours)
- **psychology_reports**: General psychology articles (visible to all users)
- **user_reports**: Private psychiatrist reports for specific users

### Security

All tables have Row Level Security (RLS) enabled with policies that:
- Users can only access their own data
- Psychiatrists can view mood logs and create reports
- Admins have full access to all data
- Psychology reports are publicly readable but only psychiatrists can create/edit them

### Auto-Profile Creation

When a new user signs up through Supabase Auth, a profile is automatically created via the `handle_new_user()` trigger function.

## Frontend Integration

Your Next.js app uses Supabase client libraries:
- `@supabase/supabase-js` - Main Supabase client
- `@supabase/ssr` - Server-side rendering support

Make sure your environment variables are set:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Troubleshooting

### RLS Policies Not Working
- Ensure you're authenticated when making queries
- Check that the user's profile exists in the `profiles` table
- Verify the user's role is set correctly

### Functions Not Found
- Make sure `001-init-database.sql` ran completely without errors
- Check that functions have EXECUTE permissions granted

### Duplicate Key Errors
- The scripts use `IF NOT EXISTS` and `ON CONFLICT` to be idempotent
- Safe to run multiple times during development

## Notes

- Scripts are designed to be idempotent (safe to run multiple times)
- RLS policies use helper functions to prevent infinite recursion
- All timestamps use `TIMESTAMPTZ` for proper timezone handling
- Indexes are created for frequently queried columns
