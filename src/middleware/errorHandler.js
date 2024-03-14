import ErrorFormater from "../helpers/ErrorFormater.js";

export default function errorHandler(err, req, res, next) {
  console.log("----------------------");
  console.log(err);
  res.status(err.code || err.status || 500).send(ErrorFormater(err));
}
