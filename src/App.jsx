import { Tiktoken } from "js-tiktoken/lite";
import o200k_base from "js-tiktoken/ranks/o200k_base";

// Initialize encoder
const enc = new Tiktoken(o200k_base);

// Encode
document.getElementById("encodeBtn").addEventListener("click", () => {
  const text = document.getElementById("encodeInput").value.trim();
  if (!text) {
    document.getElementById("encodeOutput").textContent =
      "⚠️ Please enter text.";
    return;
  }
  const tokens = enc.encode(text);
  document.getElementById("encodeOutput").textContent = tokens.join(", ");
});

// Decode
document.getElementById("decodeBtn").addEventListener("click", () => {
  const tokenStr = document.getElementById("decodeInput").value.trim();
  if (!tokenStr) {
    document.getElementById("decodeOutput").textContent =
      "⚠️ Please enter tokens.";
    return;
  }
  try {
    const tokens = tokenStr
      .replace(/[\[\]]/g, "")
      .split(",")
      .map((t) => parseInt(t.trim()))
      .filter((n) => !isNaN(n));
    const text = enc.decode(tokens);
    document.getElementById("decodeOutput").textContent = text;
  } catch (err) {
    document.getElementById("decodeOutput").textContent =
      "❌ Error: " + err.message;
  }
});

// Vocab Mix
// Vocab Mix
document.getElementById("vocabBtn").addEventListener("click", () => {
  const text = document.getElementById("vocabInput").value.trim();
  if (!text) {
    document.getElementById("vocabOutput").textContent =
      "⚠️ Please enter text.";
    return;
  }

  // Step 1: Tokenize the input
  const tokens = enc.encode(text);

  // Step 2: Create a vocabulary from the tokens
  const uniqueTokens = [...new Set(tokens)];
  const vocabMap = new Map();
  uniqueTokens.forEach((tok, index) => {
    vocabMap.set(tok, `V${index + 1}`); // V1, V2, V3...
  });

  // Step 3: Convert tokens to their vocab codes
  const mix = tokens.map((tok) => vocabMap.get(tok)).join(" ");

  // Step 4: Show output
  document.getElementById(
    "vocabOutput"
  ).textContent = `Vocabulary: ${JSON.stringify([
    ...vocabMap.entries(),
  ])}\nMix: ${mix}`;
});


export default App
