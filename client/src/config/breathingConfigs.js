export const breathingConfigs = {
    paced: {
      label: 'Paced Breathing',
      sequence: ['Inhale', 'Hold', 'Exhale'],
      durations: [4000, 2000, 8000],
    },
    fourSevenEight: {
        label: '4-7-8 Breathing',
        sequence: ['Inhale', 'Hold', 'Exhale'],
        durations: [4000, 7000, 8000], // in milliseconds
      },
    box: {
      label: 'Box Breathing',
      sequence: ['Inhale', 'Hold', 'Exhale', 'Hold'],
      durations: [4000, 4000, 4000, 4000],
    },
    mindful: {
      label: 'Mindful Breathing',
      sequence: ['Inhale', 'Exhale'],
      durations: [4000, 4000],
    },
  };
  