type DogBreedItem = {
  value: string;
  english: string;
  japanese: string;
};

export const DogBreed = {
  Beagle: {
    value: "beagle",
    english: "Beagle",
    japanese: "ビーグル",
  },
  Borzoi: {
    value: "borzoi",
    english: "Borzoi",
    japanese: "ボルゾイ",
  },
  Shiba: {
    value: "shiba",
    english: "Shiba Inu",
    japanese: "柴犬",
  },
  // see about using 'satisfies' with 'as const':
  // https://zenn.dev/tonkotsuboy_com/articles/typescript-as-const-satisfies
} as const satisfies Record<string, DogBreedItem>;

export type DogBreed = (typeof DogBreed)[keyof typeof DogBreed];

export type Dog = {
  id: number;
  name: string;
  age: number;
  breed: DogBreed;
  remarks?: string;
};
