var p = /iPhone/i, b = /iPod/i, f = /iPad/i, h = /\biOS-universal(?:.+)Mac\b/i, s = /\bAndroid(?:.+)Mobile\b/i, v = /Android/i, r = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i, d = /Silk/i, t = /Windows Phone/i, u = /\bWindows(?:.+)ARM\b/i, c = /BlackBerry/i, m = /BB10/i, w = /Opera Mini/i, y = /\b(CriOS|Chrome)(?:.+)Mobile/i, A = /Mobile(?:.+)Firefox\b/i, P = function(o) {
  return typeof o < "u" && o.platform === "MacIntel" && typeof o.maxTouchPoints == "number" && o.maxTouchPoints > 1 && typeof MSStream > "u";
};
function T(o) {
  return function(n) {
    return n.test(o);
  };
}
function g(o) {
  var n = {
    userAgent: "",
    platform: "",
    maxTouchPoints: 0
  };
  !o && typeof navigator < "u" ? n = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    maxTouchPoints: navigator.maxTouchPoints || 0
  } : typeof o == "string" ? n.userAgent = o : o && o.userAgent && (n = {
    userAgent: o.userAgent,
    platform: o.platform,
    maxTouchPoints: o.maxTouchPoints || 0
  });
  var a = n.userAgent, l = a.split("[FBAN");
  typeof l[1] < "u" && (a = l[0]), l = a.split("Twitter"), typeof l[1] < "u" && (a = l[0]);
  var e = T(a), i = {
    apple: {
      phone: e(p) && !e(t),
      ipod: e(b),
      tablet: !e(p) && (e(f) || P(n)) && !e(t),
      universal: e(h),
      device: (e(p) || e(b) || e(f) || e(h) || P(n)) && !e(t)
    },
    amazon: {
      phone: e(r),
      tablet: !e(r) && e(d),
      device: e(r) || e(d)
    },
    android: {
      phone: !e(t) && e(r) || !e(t) && e(s),
      tablet: !e(t) && !e(r) && !e(s) && (e(d) || e(v)),
      device: !e(t) && (e(r) || e(d) || e(s) || e(v)) || e(/\bokhttp\b/i)
    },
    windows: {
      phone: e(t),
      tablet: e(u),
      device: e(t) || e(u)
    },
    other: {
      blackberry: e(c),
      blackberry10: e(m),
      opera: e(w),
      firefox: e(A),
      chrome: e(y),
      device: e(c) || e(m) || e(w) || e(A) || e(y)
    },
    any: !1,
    phone: !1,
    tablet: !1
  };
  return i.any = i.apple.device || i.android.device || i.windows.device || i.other.device, i.phone = i.apple.phone || i.android.phone || i.windows.phone, i.tablet = i.apple.tablet || i.android.tablet || i.windows.tablet, i;
}
export {
  g as default
};
//# sourceMappingURL=index308.js.map
