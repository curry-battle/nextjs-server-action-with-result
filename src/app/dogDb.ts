import { type Dog, DogBreed } from "@/app/types/dog";

export const DogList: Dog[] = [
  {
    id: 1,
    name: "Pochi",
    age: 3,
    breed: DogBreed.Shiba,
    remarks: "Loves to play fetch.",
  },
  {
    id: 2,
    name: "Taro",
    age: 5,
    breed: DogBreed.Beagle,
    remarks: "Enjoys long walks.",
  },
  {
    id: 3,
    name: "Hana",
    age: 2,
    breed: DogBreed.Borzoi,
    remarks: "Very friendly and energetic.",
  },
  {
    id: 4,
    name: "Momo",
    age: 0,
    breed: DogBreed.Borzoi,
  },
] as const;
