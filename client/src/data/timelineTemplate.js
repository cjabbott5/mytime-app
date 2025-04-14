export const generateBlankTimeline = () =>
    Array.from({ length: 27 }, (_, age) => ({
      age,
      items: [],
      width: 180,
    }));
  