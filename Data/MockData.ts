export interface DayData {
  id: string;
  date: string;
  categories: { [key: string]: number };
  note: string;
}

export const dayData: DayData[] = [
  { id: '2024-02-01', date: '2024-02-01', categories: { Work: 8, Relationship: 10, Happiness: 7, CalmPeace: 9, Health: 7 }, note: 'Good start to the month.' },
  { id: '2024-02-02', date: '2024-02-02', categories: { Work: 8, Relationship: 10, Happiness: 8, CalmPeace: 9, Health: 8 }, note: 'Very productive day.' },
  { id: '2024-02-03', date: '2024-02-03', categories: { Work: 8, Relationship: 10, Happiness: 7, CalmPeace: 9, Health: 7 }, note: 'Feeling optimistic.' },
  { id: '2024-02-04', date: '2024-02-04', categories: { Work: 8, Relationship: 8, Happiness: 6, CalmPeace: 9, Health: 6 }, note: 'A bit stressful.' },
  { id: '2024-02-05', date: '2024-02-05', categories: { Work: 8, Relationship: 8, Happiness: 8, CalmPeace: 9, Health: 8 }, note: 'Relaxing weekend.' },
  { id: '2024-02-06', date: '2024-02-06', categories: { Work: 8, Relationship: 8, Happiness: 7, CalmPeace: 9, Health: 7 }, note: 'Reflective Sunday.' },
  { id: '2024-02-07', date: '2024-02-07', categories: { Work: 8, Relationship: 8, Happiness: 8, CalmPeace: 9, Health: 8 }, note: 'Positive vibes.' },
  { id: '2024-02-08', date: '2024-02-08', categories: { Work: 8, Relationship: 8, Happiness: 7, CalmPeace: 9, Health: 7 }, note: 'Steady progress.' },
  { id: '2024-02-09', date: '2024-02-09', categories: { Work: 8, Relationship: 8, Happiness: 8, CalmPeace: 8, Health: 8 }, note: 'Meeting went well.' },
  { id: '2024-02-10', date: '2024-02-10', categories: { Work: 6, Relationship: 9, Happiness: 7, CalmPeace: 8, Health: 7 }, note: 'Focused on priorities.' },
  { id: '2024-02-11', date: '2024-02-11', categories: { Work: 5, Relationship: 9, Happiness: 6, CalmPeace: 8, Health: 6 }, note: 'Challenging day.' },
  { id: '2024-02-12', date: '2024-02-12', categories: { Work: 7, Relationship: 9, Happiness: 8, CalmPeace: 8, Health: 8 }, note: 'Feeling accomplished.' },
  { id: '2024-02-13', date: '2024-02-13', categories: { Work: 8, Relationship: 9, Happiness: 7, CalmPeace: 8, Health: 7 }, note: 'Grateful for family.' },
  { id: '2024-02-14', date: '2024-02-14', categories: { Work: 8, Relationship: 10, Happiness: 8, CalmPeace: 8, Health: 8 }, note: 'Valentine\'s Day celebration.' },
  { id: '2024-02-15', date: '2024-02-15', categories: { Work: 8, Relationship: 10, Happiness: 7, CalmPeace: 8, Health: 7 }, note: 'Enjoyed a walk.' },
  { id: '2024-02-16', date: '2024-02-16', categories: { Work: 8, Relationship: 10, Happiness: 8, CalmPeace: 8, Health: 8 }, note: 'Productive meeting.' },
  { id: '2024-02-17', date: '2024-02-17', categories: { Work: 8, Relationship: 6, Happiness: 7, CalmPeace: 6, Health: 7 }, note: 'Feeling inspired.' },
  { id: '2024-02-18', date: '2024-02-18', categories: { Work: 8, Relationship: 6, Happiness: 6, CalmPeace: 5, Health: 6 }, note: 'Need some rest.' },
  { id: '2024-02-19', date: '2024-02-19', categories: { Work: 8, Relationship: 7, Happiness: 8, CalmPeace: 7, Health: 8 }, note: 'Quality time with friends.' },
  { id: '2024-02-20', date: '2024-02-20', categories: { Work: 8, Relationship: 5, Happiness: 7, CalmPeace: 6, Health: 7 }, note: 'Enjoyed a hobby.' },
  { id: '2024-02-21', date: '2024-02-21', categories: { Work: 7, Relationship: 6, Happiness: 8, CalmPeace: 7, Health: 8 }, note: 'Positive outlook.' },
  { id: '2024-02-22', date: '2024-02-22', categories: { Work: 6, Relationship: 5, Happiness: 7, CalmPeace: 6, Health: 7 }, note: 'Handled challenges well.' },
  { id: '2024-02-23', date: '2024-02-23', categories: { Work: 7, Relationship: 7, Happiness: 8, CalmPeace: 7, Health: 8 }, note: 'Feeling accomplished.' },
  { id: '2024-02-24', date: '2024-02-24', categories: { Work: 6, Relationship: 6, Happiness: 7, CalmPeace: 6, Health: 7 }, note: 'Proud of progress.' },
  { id: '2024-02-25', date: '2024-02-25', categories: { Work: 5, Relationship: 6, Happiness: 6, CalmPeace: 5, Health: 6 }, note: 'Reflection day.' },
  { id: '2024-02-26', date: '2024-02-26', categories: { Work: 7, Relationship: 7, Happiness: 8, CalmPeace: 7, Health: 8 }, note: 'Successful presentation.' },
  { id: '2024-02-27', date: '2024-02-27', categories: { Work: 6, Relationship: 5, Happiness: 7, CalmPeace: 6, Health: 7 }, note: 'Ready for the weekend.' },
  { id: '2024-02-28', date: '2024-02-28', categories: { Work: 7, Relationship: 6, Happiness: 8, CalmPeace: 7, Health: 8 }, note: 'Month end review.' },
];
