const VAKPipeline = require('../src/pipeline');

const testParagraph = "Knowledge illuminates the intellect and destroys the darkness of ignorance. A wise person who seeks truth with diligence attains lasting peace.";

console.log("Running VAK Pipeline on test paragraph...");
const result = VAKPipeline.run(testParagraph);

console.log("\n--- Phase 1: Summary ---");
console.log(`Sentence Count: ${result.phase1.sentenceCount}`);
console.log(`Token Count: ${result.phase1.tokenCount}`);
console.log("Tokens with UPOS & Head & Deprel:");
result.phase1.tokens.slice(0, 10).forEach(t => {
  console.log(`  [${t.id}] ${t.text} (lemma: ${t.lemma}) -> ${t.upos} [head: ${t.head}, rel: ${t.deprel}]`);
});

console.log("\n--- Phase 2: Sanskrit Translation ---");
console.log("Devanāgarī:\n", result.phase2.devanagari);
console.log("\nIAST:\n", result.phase2.iast);

console.log("\nWord Alignments count:", result.phase2.wordAlignment.length);
console.log("Compounds detected:", result.phase2.compounds.length);
console.log("Sandhi transformations:", result.phase2.sandhiTransformations.length);

console.log("\nExecution time:", result.executionTimeMs, "ms");
