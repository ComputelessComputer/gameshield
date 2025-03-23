import { DEFAULT_ASSETS_PATH as o } from "./index126.js";
function l(e, n) {
  return Math.floor(Math.random() * (n - e + 1)) + e;
}
function u(e) {
  return e[Math.floor(Math.random() * e.length)];
}
function i(e = []) {
  const t = ["puzzle", "breakout", "snake", "pong", "dino-run"].filter((r) => !e.includes(r));
  return t.length === 0 ? "puzzle" : u(t);
}
function s(e) {
  switch (e) {
    case "easy":
      return 0.25;
    case "medium":
      return 0.5;
    case "hard":
      return 0.85;
    default:
      return 0.5;
  }
}
function c(e, n = "png", t = o) {
  return `${t}/${e}.${n}`;
}
export {
  s as difficultyToValue,
  c as getAssetUrl,
  u as randomElement,
  i as randomGameType,
  l as randomInt
};
//# sourceMappingURL=index127.js.map
