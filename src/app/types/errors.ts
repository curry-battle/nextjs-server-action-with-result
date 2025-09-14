export type ActionError = {
  name: string;
  message: string;
  code: number;
};

export const createActionError = (
  message: string,
  code: number = 500,
): ActionError => {
  return { name: "ActionError", message, code };
};

export class CustomError extends Error {
  // Seerver → Client でシリアライズされる際に code プロパティは落とされる
  code: number;

  constructor(message: string, code: number = 500) {
    super(message);
    this.name = "CustomError";
    this.code = code;
  }
}
