type NavigationItem = {
  label: string;
  path: string;
};

type NavigationLinkGroup = {
  label: string;
  path: string;
};

type NavigationDropdownGroup = {
  label: string;
  align?: 'left' | 'right';
  items: readonly NavigationItem[];
};

export type NavigationGroup = NavigationLinkGroup | NavigationDropdownGroup;

export const navigationGroups: readonly NavigationGroup[] = [
  {
    label: 'Campanhas',
    items: [
      { label: 'PopUp', path: '/campanhas/popup/' },
      { label: 'Happiniss Days', path: '/campanhas/happiniss-days/' }
    ]
  },
  { label: 'Modelos', path: '/modelos/' },
  {
    label: 'Usados',
    align: 'right',
    items: [
      { label: 'Juke Usado', path: '/usados/juke/' },
      { label: 'Qashqai Usado', path: '/usados/qashqai/' }
    ]
  }
];
