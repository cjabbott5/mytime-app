const onboardingCategories = [
  {
    id: "welcome",
    type: "welcome",
    title: "Welcome to Loop",
    description:
      "We're so glad you're here. Loop is a gentle space for organizing memories, exploring your story, and healing in your own time."
  },
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
    description: "Select up to 3 that apply.",
    fields: [
      {
        id: "gender_identity",
        type: "multi",
        label: "How do you identify?",
        max: 3,
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
    description: "You can share up to 3 identities if you'd like.",
    fields: [
      {
        id: "cultural_identity",
        type: "multi",
        label: "How do you identify?",
        max: 3,
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
    description: "Share up to 3 beliefs or traditions.",
    fields: [
      {
        id: "spirituality",
        type: "multi",
        label: "What best describes you?",
        max: 3,
        options: [
          "Spiritual", "Religious", "Atheist", "Agnostic", "Mystic", "Still exploring",
          "Cultural", "Christianity", "Catholicism", "Judaism", "Islam", "Buddhism",
          "Hinduism", "Pagan / Earth-based", "Ancestral traditions", "Indigenous spirituality",
          "Other"
        ]
      }
    ]
  },
  {
    id: "mental_health",
    type: "form",
    title: "Mental Health",
    description: "Diagnoses or traits you identify with (up to 3).",
    fields: [
      {
        id: "mental_health",
        type: "multi",
        label: "Diagnoses or traits you identify with.",
        max: 3,
        options: [
          "Anxiety", "Depression", "PTSD", "CPTSD", "ADHD", "Bipolar", "OCD", "Neurodivergent",
          "Autism", "Dyslexia", "Borderline traits", "Disassociation", "None", "Other"
        ]
      }
    ]
  },
  {
    id: "reflection",
    type: "form",
    title: "What matters most right now?",
    description: "This can be a grounding mantra or reminder to guide your time here.",
    fields: [
      {
        id: "current_reflection",
        type: "text",
        label: "Write something you'd like to remember"
      }
    ]
  },
  {
    id: "goals",
    type: "form",
    title: "Your Goals",
    description: "Select up to 3 goals you'd like to focus on.",
    fields: [
      {
        id: "top_goals",
        type: "multi",
        label: "Top goals for using Loop",
        max: 3,
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
    description: "Pick the top 3 emotional states you often experience.",
    fields: [
      {
        id: "common_moods",
        type: "multi",
        label: "Common moods you experience",
        max: 3,
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
    title: "Your Core Traits",
    description: "Pick up to 3 traits that feel most true to who you are right now.",
    fields: [
      {
        id: "traits",
        type: "multi",
        label: "Choose up to 3",
        max: 3,
        options: [
          "Resilient", "Playful", "Hyperaware", "Loyal", "Empathic", "Independent",
          "Caretaker", "People Pleaser", "Overachiever", "Shy", "Assertive", "Quiet",
          "Sensitive", "Creative"
        ]
      }
    ]
  },
  {
    id: "support_system",
    type: "form",
    title: "Your Support System",
    description: "Who do you lean on when things get tough? Pick up to 3.",
    fields: [
      {
        id: "support_system",
        type: "multi",
        label: "Who's part of your support system?",
        max: 3,
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
    description: "Choose the top 3 tools that support you.",
    fields: [
      {
        id: "coping_tools",
        type: "multi",
        label: "Coping tools you use",
        max: 3,
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
        max: 3,
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
  }
];

export default onboardingCategories;
