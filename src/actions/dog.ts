"use server";

import { DogList } from "@/app/dogDb";
import type { Dog } from "@/app/types/dog";
import {
  type ActionError,
  CustomError,
  createActionError,
} from "@/app/types/errors";
import { Err, Ok, type Result } from "@/app/types/result";

export async function getDog(
  id: number,
): Promise<Result<Dog, ActionError | CustomError>> {
  const list = DogList;
  const dog = list.find((dog) => dog.id === id);

  if (id === 666) {
    const err = new CustomError("Number of the Beast!!");
    return Err(err);
  }

  if (!dog) {
    const err = createActionError(`Dog not found id: ${id}`, 404);
    return Err(err);
  }

  return Ok(dog);
}
