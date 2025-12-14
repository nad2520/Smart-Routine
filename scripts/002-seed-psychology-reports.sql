-- ============================================
-- Seed Data: Psychology Reports
-- ============================================
-- OPTIONAL: Run this to populate sample psychology reports for testing
-- 
-- This adds 5 sample psychology articles to help you:
-- - Test the psychology reports feature
-- - See example content structure
-- - Develop the frontend UI with realistic data
--
-- Safe to run multiple times (uses ON CONFLICT DO NOTHING)

INSERT INTO public.psychology_reports (title, author, author_credentials, category, content, summary, read_time, published_date, image_url) VALUES
(
  'Understanding Productivity Burnout: Signs and Solutions',
  'Dr. Sarah Martinez',
  'Ph.D. Clinical Psychology, Licensed Psychotherapist',
  'Productivity & Stress',
  E'# Understanding Productivity Burnout: Signs and Solutions\n\n## Introduction\n\nProductivity burnout is a state of emotional, physical, and mental exhaustion caused by prolonged stress and overwork. Unlike general fatigue, burnout specifically affects your ability to function effectively in work and personal life.\n\n## Key Signs of Burnout\n\n### 1. Emotional Exhaustion\nFeeling drained and unable to cope with daily demands. You may experience:\n- Constant fatigue even after rest\n- Difficulty concentrating\n- Increased irritability\n- Loss of motivation\n\n### 2. Reduced Performance\nA noticeable decline in productivity despite increased effort:\n- Missing deadlines\n- Decreased quality of work\n- Procrastination patterns\n- Difficulty making decisions\n\n### 3. Detachment\nFeeling disconnected from your work and relationships:\n- Cynicism about work tasks\n- Loss of enjoyment in previously satisfying activities\n- Social withdrawal\n- Emotional numbness\n\n## Root Causes\n\n**Overcommitment**: Taking on more than you can reasonably handle\n**Lack of Control**: Feeling powerless over your schedule or workload\n**Unclear Expectations**: Not knowing what is expected of you\n**Poor Work-Life Balance**: Insufficient time for rest and personal life\n\n## Evidence-Based Solutions\n\n### Immediate Interventions\n\n1. **Schedule Recovery Time**: Block out non-negotiable rest periods in your calendar\n2. **Practice Micro-Breaks**: Take 5-minute breaks every hour to reset\n3. **Set Boundaries**: Learn to say no to non-essential commitments\n4. **Prioritize Sleep**: Aim for 7-9 hours of quality sleep\n\n### Long-Term Strategies\n\n1. **Restructure Your Routine**: Design your day around your natural energy patterns\n2. **Build Support Systems**: Connect with colleagues, friends, or a therapist\n3. **Develop Coping Skills**: Practice mindfulness, meditation, or journaling\n4. **Reassess Goals**: Ensure your objectives align with your values and capacity\n\n## When to Seek Professional Help\n\nConsider consulting a mental health professional if:\n- Symptoms persist for more than two weeks\n- You experience thoughts of self-harm\n- Burnout significantly impacts your relationships\n- You turn to unhealthy coping mechanisms',
  'Learn to identify the warning signs of productivity burnout and discover evidence-based strategies to recover and prevent future episodes.',
  8,
  '2024-11-15',
  '/placeholder.svg?height=400&width=600'
),
(
  'The Science of Building Sustainable Habits',
  'Dr. Michael Chen',
  'Ph.D. Behavioral Psychology, Certified Habit Coach',
  'Habit Formation',
  E'# The Science of Building Sustainable Habits\n\n## The Habit Loop\n\nEvery habit follows a predictable pattern:\n\n**Cue → Routine → Reward**\n\nUnderstanding this loop is essential for creating lasting behavioral change.\n\n## Why Most Habits Fail\n\n### 1. Unrealistic Expectations\nPeople often try to change too much too quickly. Research shows that attempting multiple major habit changes simultaneously reduces success rates by 65%.\n\n### 2. Lack of Environmental Design\nYour environment has more influence on your behavior than willpower. If your surroundings do not support your desired habit, maintaining it becomes exponentially harder.\n\n### 3. All-or-Nothing Thinking\nMissing one day often leads to complete abandonment. This cognitive distortion ignores the overall trend and focuses on isolated failures.\n\n## The Science of Success\n\n### Start Ridiculously Small\n\nResearch on atomic habits demonstrates that habits should be:\n- Easy to start (2 minutes or less)\n- Specific and measurable\n- Attached to existing routines\n\n**Example**: Instead of "exercise daily," start with "put on workout clothes at 7 AM."\n\n### Use Implementation Intentions\n\nStudies show that people who use if-then planning are 2-3x more likely to follow through:\n\n"If [situation], then I will [behavior]"\n\n### Habit Stacking\n\nAttach new habits to established ones:\n\n"After I [current habit], I will [new habit]"\n\n## The 4 Laws of Behavior Change\n\n### 1. Make It Obvious\n- Use visual cues in your environment\n- Design your space to support your goals\n- Track your behavior to increase awareness\n\n### 2. Make It Attractive\n- Pair habits with activities you enjoy\n- Join communities with shared goals\n- Reframe your mindset about the habit\n\n### 3. Make It Easy\n- Reduce friction for good habits\n- Increase friction for bad habits\n- Use the 2-minute rule for starting\n\n### 4. Make It Satisfying\n- Celebrate small wins immediately\n- Use visual progress tracking\n- Never miss twice in a row',
  'Discover the psychological principles behind successful habit formation and learn practical strategies to build routines that actually stick.',
  10,
  '2024-11-20',
  '/placeholder.svg?height=400&width=600'
),
(
  'Managing Anxiety Through Routine and Structure',
  'Dr. Emily Roberts',
  'Psy.D. Clinical Psychology, Anxiety Disorders Specialist',
  'Mental Health',
  E'# Managing Anxiety Through Routine and Structure\n\n## Understanding Anxiety and Predictability\n\nAnxiety thrives in uncertainty. When we cannot predict what will happen next, our brain interprets this ambiguity as potential danger, triggering the fight-or-flight response.\n\n**Key Insight**: Structure and routine provide the predictability that anxious brains crave.\n\n## The Anxiety-Routine Connection\n\n### How Routines Reduce Anxiety\n\n1. **Decision Fatigue Reduction**: Pre-planned routines eliminate constant decision-making\n2. **Sense of Control**: Predictable patterns create feelings of agency\n3. **Cognitive Load Management**: Automated behaviors free mental resources\n4. **Stress Hormone Regulation**: Consistent schedules help regulate cortisol\n\n## Building an Anxiety-Reducing Routine\n\n### Morning Structure\n\nYour morning sets the tone for your entire day. Create a consistent sequence:\n\n1. **Wake at the same time** (within 30 minutes)\n2. **Grounding practice** (5 minutes of breathing or meditation)\n3. **Gentle movement** (stretching or light exercise)\n4. **Nourishing breakfast**\n5. **Review daily intentions** (not overwhelming task lists)\n\n### Throughout the Day\n\n**Anchor Points**: Establish 3-4 consistent activities at the same time daily:\n- Lunch break ritual\n- Afternoon walk\n- End-of-work transition\n- Evening wind-down\n\n### Evening Wind-Down\n\nYour pre-sleep routine is crucial for anxiety management:\n\n1. **Digital sunset** (1 hour before bed)\n2. **Calming activity** (reading, gentle yoga, journaling)\n3. **Preparation for tomorrow** (lay out clothes, review schedule)\n4. **Consistent sleep time**\n\n## Flexibility Within Structure\n\n**Important**: Rigid routines can increase anxiety if disrupted. Build in flexibility:\n\n- Have backup plans for disrupted routines\n- Practice self-compassion when schedules change\n- Distinguish between helpful structure and compulsive rigidity',
  'Explore how structured routines can significantly reduce anxiety symptoms and learn to build schedules that provide comfort without rigidity.',
  9,
  '2024-11-25',
  '/placeholder.svg?height=400&width=600'
),
(
  'Sleep Optimization: A Psychologists Guide',
  'Dr. James Wilson',
  'Ph.D. Sleep Psychology, Board Certified Sleep Specialist',
  'Sleep & Recovery',
  E'# Sleep Optimization: A Psychologists Guide\n\n## Why Sleep Matters for Mental Health\n\nSleep is not just physical rest—it is when your brain processes emotions, consolidates memories, and clears metabolic waste. Poor sleep is both a symptom and a cause of mental health challenges.\n\n## The Sleep-Performance Connection\n\n**Impact of Sleep Deprivation**:\n- 30% decrease in cognitive performance after one night of poor sleep\n- 2x increased risk of anxiety and depression\n- Reduced emotional regulation capacity\n- Impaired decision-making and impulse control\n\n## Understanding Your Sleep Architecture\n\n### Sleep Stages\n\n**Light Sleep (N1, N2)**: 50% of night\n- Transition and light restoration\n\n**Deep Sleep (N3)**: 20% of night\n- Physical restoration\n- Memory consolidation\n- Immune function\n\n**REM Sleep**: 25% of night\n- Emotional processing\n- Creativity\n- Problem-solving\n\n## Building a Sleep-Optimized Routine\n\n### The 10-3-2-1-0 Method\n\n**10 hours before bed**: No more caffeine\n**3 hours before bed**: No more food or alcohol\n**2 hours before bed**: No more work\n**1 hour before bed**: No more screens\n**0**: The number of times you hit snooze\n\n### Your Sleep Environment\n\n**Temperature**: 65-68°F (18-20°C) is optimal\n**Darkness**: Use blackout curtains or a sleep mask\n**Sound**: White noise or silence\n**Comfort**: Invest in quality bedding\n\n### Pre-Sleep Routine (60-90 minutes)\n\nCreate a consistent wind-down ritual:\n\n1. **Transition ritual** (10 min): Change into sleep clothes, dim lights\n2. **Calming activity** (30-40 min): Reading, gentle stretching, listening to calm music\n3. **Mindfulness practice** (10-15 min): Progressive muscle relaxation, meditation\n4. **Gratitude reflection** (5 min): Write three positive moments from the day',
  'Master the science-backed strategies for improving sleep quality and learn how better rest transforms mental performance and emotional resilience.',
  11,
  '2024-12-01',
  '/placeholder.svg?height=400&width=600'
),
(
  'Work-Life Integration in the Modern Age',
  'Dr. Lisa Thompson',
  'Ph.D. Organizational Psychology, Executive Coach',
  'Work-Life Balance',
  E'# Work-Life Integration in the Modern Age\n\n## From Balance to Integration\n\nThe concept of "work-life balance" implies a zero-sum game—time spent on work subtracts from personal life. Modern psychology suggests a better framework: **work-life integration**.\n\n**Integration**: Creating synergy between professional and personal domains rather than strict separation.\n\n## The Remote Work Paradox\n\nRemote work promised flexibility but often delivered:\n- Blurred boundaries between work and home\n- "Always-on" culture\n- Increased burnout rates\n- Difficulty disconnecting\n\n**The solution is not more separation but smarter integration.**\n\n## Designing Integrated Days\n\n### Energy Management Over Time Management\n\nInstead of scheduling by hours, schedule by energy:\n\n**High Energy Blocks**: \n- Deep focus work\n- Creative tasks\n- Important meetings\n\n**Medium Energy Blocks**:\n- Email responses\n- Administrative tasks\n- Team collaboration\n\n**Low Energy Blocks**:\n- Passive learning\n- Planning\n- Routine tasks\n\n### The Ideal Day Structure\n\n**Morning (7 AM - 12 PM)**:\n- Peak cognitive performance\n- Focus on most important work\n- Minimize meetings\n\n**Midday (12 PM - 2 PM)**:\n- Natural energy dip\n- Lunch, movement, social connection\n- Avoid critical decisions\n\n**Afternoon (2 PM - 6 PM)**:\n- Collaborative work\n- Meetings and communication\n- Planning for next day\n\n**Evening (6 PM - 10 PM)**:\n- Personal time\n- Family, hobbies, rest\n- No work-related screens\n\n## Creating Boundaries in Boundless Space\n\n### Physical Boundaries\n\n**Workspace ritual**:\n1. Designated work area (even in small spaces)\n2. "Commute" replacement (5-minute walk before/after work)\n3. Physical transition cues (change clothes, close laptop)\n\n### Temporal Boundaries\n\n**Work hours policy**:\n- Define core hours\n- Communicate your availability\n- Set email/message boundaries\n- Use auto-responders after hours',
  'Learn to move beyond traditional work-life balance toward meaningful integration that supports both career success and personal fulfillment.',
  12,
  '2024-12-05',
  '/placeholder.svg?height=400&width=600'
)
ON CONFLICT DO NOTHING;
