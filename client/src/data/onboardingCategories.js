const onboardingCategories = [
  {
    id: "welcome",
    type: "welcome",
    title: "Welcome to MyTime",
    description:
      "We're so glad you're here. MyTime is a gentle space for organizing memories, exploring your story, and healing in your own time.",
  },

  // ─── Basic Info ─────────────────────────────────────────────────
  {
    id: "basic_info_1",
    type: "form",
    title: "Basic Info",
    description: "Let’s get to know you better. You can skip any question.",
    fields: [
      { id: "name", type: "text", label: "Name (optional)" },
      { id: "age", type: "number", label: "Age (optional)" },
      { id: "pronouns", type: "text", label: "Your pronouns (they/them, she/her, etc.)" }
    ]
  },
  {
    id: "gender_identity",
    type: "form",
    title: "Gender Identity",
    description: "Select all that apply.",
    fields: [
      {
        id: "gender_identity",
        type: "multi",
        label: "How do you identify?",
        options: [
          "Cis Woman", "Cis Man", "Trans Woman", "Trans Man", "Transmasc", "Transfem",
          "Nonbinary", "Agender", "Bigender", "Genderfluid", "Demiboy", "Demigirl",
          "Two-Spirit", "Other", "Prefer not to say"
        ]
      }
    ]
  },
  {
    id: "cultural_identity",
    type: "form",
    title: "Cultural / Ethnic Identity",
    description: "You can share as much or as little as you'd like.",
    fields: [
      {
        id: "cultural_identity",
        type: "multi",
        label: "How do you identify?",
        options: [
          "Black", "Latine/Latinx", "South Asian", "East Asian", "Southeast Asian",
          "Middle Eastern / SWANA", "Pacific Islander", "Indigenous / Native", "White",
          "Multiracial", "Ashkenazi", "Sephardic", "Mizrahi", "Other", "Prefer not to say"
        ]
      }
    ]
  },
  {
    id: "spirituality",
    type: "form",
    title: "Spiritual or Religious Lens",
    description: "Your beliefs or traditions — past or present.",
    fields: [
      {
        id: "spirituality",
        type: "multi",
        label: "What best describes you?",
        options: [
          "Spiritual", "Religious", "Atheist", "Agnostic", "Mystic", "Still exploring",
          "Cultural", "Christianity", "Catholicism", "Judaism", "Islam", "Buddhism",
          "Hinduism", "Pagan / Earth-based", "Ancestral traditions", "Indigenous spirituality",
          "Other"
        ]
      }
    ]
  },

  // ─── Mental Health ─────────────────────────────────────────────
  {
    id: "mental_health",
    type: "multi",
    title: "Mental Health",
    description: "Diagnoses or traits you identify with.",
    options: [
      "Anxiety", "Depression", "PTSD", "CPTSD", "ADHD", "Bipolar", "OCD", "Neurodivergent",
      "Autism", "Dyslexia", "Borderline traits", "Disassociation", "None", "Other"
    ]
  },

  // ─── What Matters Most ─────────────────────────────────────────
  {
    id: "reflection",
    type: "form",
    title: "What matters most right now?",
    description:
      "This can be a grounding mantra or reminder to guide your time here.\n\nExamples: “I’m rebuilding trust with myself.” “I want to feel more present.” “Healing doesn’t have to be linear.”",
    fields: [
      { id: "current_reflection", type: "text", label: "Write something you'd like to remember" }
    ]
  },

  // ─── Self Snapshot (Split in 3 Pages) ──────────────────────────
  {
    id: "goals",
    type: "form",
    title: "Your Goals",
    description: "What are you hoping this space supports you in doing?",
    fields: [
      {
        id: "top_goals",
        type: "multi",
        label: "Top goals for using MyTime",
        options: [
          "Increase memory clarity", "Organize life story", "Track healing journey",
          "Feel grounded in identity", "Reduce dissociation", "Prepare for therapy",
          "Build emotional awareness", "Feel more stable", "Explore gender identity",
          "Reconnect with past selves", "Make peace with my story", "Document milestones",
          "Other"
        ]
      }
    ]
  },
  {
    id: "moods",
    type: "form",
    title: "Common Moods",
    description: "What emotional states do you often notice?",
    fields: [
      {
        id: "common_moods",
        type: "multi",
        label: "Common moods you experience",
        options: [
          "Joyful", "Calm", "Foggy", "Dissociated", "Angry", "Overwhelmed", "Hopeful",
          "Numb", "Tender", "Protective", "Scared", "Grateful", "Disconnected", "Euphoric", "Other"
        ]
      }
    ]
  },
  {
    id: "traits",
    type: "form",
    title: "Words That Describe You",
    description: "There’s no wrong way to answer.",
    fields: [
      {
        id: "traits",
        type: "multi",
        label: "Words that describe you",
        options: [
          "Resilient", "Playful", "Hyperaware", "Loyal", "Empathic", "Independent",
          "Caretaker", "People-pleaser", "Overachiever", "Shy", "Assertive", "Quiet",
          "Sensitive", "Creative", "Other"
        ]
      }
    ]
  },

  // ─── Support & Coping (Split in 2 Pages) ───────────────────────
  {
    id: "support_system",
    type: "form",
    title: "Your Support System",
    description: "Who do you lean on when things get tough?",
    fields: [
      {
        id: "support_system",
        type: "multi",
        label: "Who's part of your support system?",
        options: [
          "Therapist", "Psychiatrist", "Friends", "Partner(s)", "Chosen family",
          "Biological family", "Pet / animal", "Online community", "Peer support group",
          "Spiritual guide", "Coach", "Somatic practitioner", "12-step group", "None", "Other"
        ]
      }
    ]
  },
  {
    id: "coping_tools",
    type: "form",
    title: "Coping Tools",
    description: "What helps you feel supported or grounded?",
    fields: [
      {
        id: "coping_tools",
        type: "multi",
        label: "Coping tools you use",
        options: [
          "Journaling", "Medication", "Meditation", "Breathwork", "Art / Creativity",
          "Exercise / Movement", "Spiritual practice", "Music",
          "Sensory tools (fidgets, weighted blankets)", "Grounding techniques",
          "Inner child work", "Somatic techniques", "Community support",
          "Crisis planning", "Other"
        ]
      }
    ]
  },

  // ─── Safety & Preferences ─────────────────────────────────────
  {
    id: "safety",
    type: "form",
    title: "Safety & Boundaries",
    description: "Help us respect your boundaries. You can skip or update these anytime.",
    fields: [
      {
        id: "triggers",
        type: "multi",
        label: "Sensitive or triggering topics to avoid",
        options: [
          "Abandonment", "Self-harm", "Suicidality", "Sexual trauma", "Emotional abuse",
          "Physical abuse", "Medical trauma", "Psychiatric hospitalization",
          "Religious trauma", "Addiction / substance use", "Eating / body image",
          "Disordered attachment", "Grief", "Other"
        ]
      },
      {
        id: "emotional_depth",
        type: "select",
        label: "Comfort with emotional prompts",
        options: ["Keep it light", "I'm open to going deeper", "Somewhere in between"]
      },
      {
        id: "emergency_contact",
        type: "text",
        label: "Emergency contact (optional)"
      }
    ]
  },

  // ─── Personalization ──────────────────────────────────────────
  {
    id: "personalization",
    type: "form",
    title: "Personalization",
    description: "Help tailor your MyTime experience.",
    fields: [
      {
        id: "prompt_frequency",
        type: "select",
        label: "How often would you like prompts?",
        options: ["Daily gentle check-in", "Weekly reflection", "I'll check in when I want"]
      },
      {
        id: "time_of_day",
        type: "select",
        label: "When do you prefer check-ins?",
        options: ["Morning", "Afternoon", "Evening", "Varies"]
      },
      {
        id: "language_tone",
        type: "select",
        label: "Tone you prefer from the app",
        options: ["Gentle & soothing", "Direct & clear", "Upbeat & encouraging"]
      }
    ]
  },

  {
    id: "accessibility",
    type: "form",
    title: "Accessibility",
    description: "Let’s make MyTime comfortable to use.",
    fields: [
      {
        id: "font_size",
        type: "select",
        label: "Preferred font size",
        options: ["Small", "Medium (default)", "Large"]
      },
      {
        id: "color_mode",
        type: "select",
        label: "Color preferences",
        options: ["Default", "High contrast", "Color-blind friendly"]
      },
      {
        id: "notifications",
        type: "select",
        label: "How should we reach you?",
        options: ["In-app only", "Push notifications", "Email updates", "None"]
      }
    ]
  },

  {
    id: "lifestyle",
    type: "multi",
    title: "Lifestyle",
    description: "Daily rhythms that shape your world.",
    options: [
      "Early riser", "Night owl", "Highly structured",
      "Spontaneous", "Busy schedule", "Frequent breaks"
    ]
  }
];

export default onboardingCategories;
