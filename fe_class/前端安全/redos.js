console.time("case-1");
/A(B|C+)+D/.test("ACCCCCCCCCCCCCCCCCCCCCCCD");
console.timeEnd("case-1");

console.time("case-2");
/A(B|C+)+D/.test("ACCCCCCCCCCCCCCCCCCCCCCCX");
console.timeEnd("case-2");

console.time("case-3");
/A(B|C+)+D/.test("ACCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCX");
console.timeEnd("case-3");
