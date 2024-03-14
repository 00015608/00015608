export default function ErrorFormater(error) {
  if (typeof error === "string") {
    return [{ msg: error }];
  } else if (error instanceof Error) {
    return [{ msg: error.message }];
  } else if (Array.isArray(error)) {
    return error.map((err) => ({ msg: err }));
  } else if (typeof error === "object" && error.message) {
    return [{ msg: error.message }];
  }
  return [];
}
