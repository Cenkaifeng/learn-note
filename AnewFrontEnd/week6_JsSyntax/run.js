import { Evaluator } from "./evaluator.js";
import { parse } from "./SyntaxParser.js";

console.log("?????");
document.getElementById("run").addEventListener("click", event => {
  let r = new Evaluator().evaluate(
    parse(document.getElementById("source").value)
  );
  console.log(r);
});

// window.js = window.js || {
//   evaluate,
//   parse,
// };
