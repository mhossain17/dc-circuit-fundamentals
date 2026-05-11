"use client";

import { useState, useCallback, useEffect, useRef } from "react";

// Safe math evaluator — converts calculator expression to JS and evaluates
function evaluate(expr: string): string {
  if (!expr.trim()) return "0";
  try {
    // Replace calculator notation with JS equivalents
    let js = expr
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/\^/g, "**")
      .replace(/π/g, String(Math.PI))
      .replace(/e(?![0-9+\-])/g, String(Math.E))
      .replace(/sin\(/g, "Math.sin(DEG2RAD*(")
      .replace(/cos\(/g, "Math.cos(DEG2RAD*(")
      .replace(/tan\(/g, "Math.tan(DEG2RAD*(")
      .replace(/asin\(/g, "(180/Math.PI)*Math.asin(")
      .replace(/acos\(/g, "(180/Math.PI)*Math.acos(")
      .replace(/atan\(/g, "(180/Math.PI)*Math.atan(")
      .replace(/log\(/g, "Math.log10(")
      .replace(/ln\(/g, "Math.log(")
      .replace(/√\(/g, "Math.sqrt(")
      .replace(/√(\d+(?:\.\d+)?)/g, "Math.sqrt($1)");

    // Close any auto-opened parentheses from trig/log wrapping
    const openParens = (js.match(/\(/g) || []).length;
    const closeParens = (js.match(/\)/g) || []).length;
    js += ")".repeat(Math.max(0, openParens - closeParens));

    // Add DEG2RAD constant
    const DEG2RAD = Math.PI / 180; // eslint-disable-line @typescript-eslint/no-unused-vars
    // eslint-disable-next-line no-new-func
    const result = new Function("DEG2RAD", `"use strict"; return (${js})`)(DEG2RAD);

    if (typeof result !== "number" || !isFinite(result)) return isNaN(result as number) ? "Error" : result > 0 ? "Overflow" : "-Overflow";
    // Format: avoid floating point noise
    const formatted = parseFloat(result.toPrecision(10));
    return String(formatted);
  } catch {
    return "Error";
  }
}

type CalcKey = {
  label: string;
  second?: string;
  wide?: boolean;
  action?: string;
  color?: "red" | "blue" | "dark" | "op" | "eq";
};

const KEYS: CalcKey[][] = [
  [
    { label: "2nd", color: "blue", action: "shift" },
    { label: "sin", second: "sin⁻¹", action: "fn:sin(" },
    { label: "cos", second: "cos⁻¹", action: "fn:cos(" },
    { label: "tan", second: "tan⁻¹", action: "fn:tan(" },
    { label: "^", action: "^" },
  ],
  [
    { label: "√", second: "x²", action: "fn:√(" },
    { label: "log", second: "10^x", action: "fn:log(" },
    { label: "ln", second: "e^x", action: "fn:ln(" },
    { label: "π", action: "π" },
    { label: "EE", second: "ee", action: "×10^" },
  ],
  [
    { label: "MC", color: "dark", action: "mc" },
    { label: "MR", color: "dark", action: "mr" },
    { label: "M+", color: "dark", action: "m+" },
    { label: "M-", color: "dark", action: "m-" },
    { label: "(", action: "(" },
  ],
  [
    { label: "7" }, { label: "8" }, { label: "9" },
    { label: "DEL", color: "dark", action: "del" },
    { label: ")", action: ")" },
  ],
  [
    { label: "4" }, { label: "5" }, { label: "6" },
    { label: "×", color: "op", action: "×" },
    { label: "÷", color: "op", action: "÷" },
  ],
  [
    { label: "1" }, { label: "2" }, { label: "3" },
    { label: "+", color: "op", action: "+" },
    { label: "−", color: "op", action: "-" },
  ],
  [
    { label: "0", wide: false }, { label: ".", },
    { label: "(−)", action: "neg" },
    { label: "AC", color: "red", action: "ac" },
    { label: "=", color: "eq", action: "=" },
  ],
];

const keyColor: Record<string, string> = {
  red: "bg-redhawks-red hover:bg-redhawks-red-dark text-white",
  blue: "bg-blue-600 hover:bg-blue-700 text-white",
  dark: "bg-gray-600 hover:bg-gray-500 text-white",
  op: "bg-gray-700 hover:bg-gray-600 text-amber-300 font-bold",
  eq: "bg-redhawks-red hover:bg-redhawks-red-dark text-white font-bold",
};

export function TI30XSCalculator() {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState("0");
  const [memory, setMemory] = useState(0);
  const [shift, setShift] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const exprRef = useRef(expr);
  exprRef.current = expr;

  const pressKey = useCallback((key: CalcKey) => {
    const action = key.action ?? key.label;
    const shiftAction = key.second;

    if (action === "shift") { setShift(s => !s); return; }

    setShift(false);

    // Handle shift variants
    const effectiveAction = (shift && shiftAction)
      ? `fn:${shiftAction.replace("⁻¹", "a").toLowerCase()}(`
      : action;

    if (effectiveAction === "ac") {
      setExpr(""); setResult("0"); setHasResult(false); return;
    }
    if (effectiveAction === "del") {
      setExpr(e => e.slice(0, -1)); setHasResult(false); return;
    }
    if (effectiveAction === "=") {
      const res = evaluate(exprRef.current);
      setResult(res);
      setHasResult(true);
      return;
    }
    if (effectiveAction === "neg") {
      setExpr(e => e ? (e.startsWith("-") ? e.slice(1) : "-" + e) : "");
      setHasResult(false);
      return;
    }
    if (effectiveAction === "mc") { setMemory(0); return; }
    if (effectiveAction === "mr") {
      const val = String(memory);
      setExpr(e => hasResult ? val : e + val);
      setHasResult(false);
      return;
    }
    if (effectiveAction === "m+") {
      const r = parseFloat(hasResult ? result : evaluate(exprRef.current));
      if (!isNaN(r)) setMemory(m => m + r);
      return;
    }
    if (effectiveAction === "m-") {
      const r = parseFloat(hasResult ? result : evaluate(exprRef.current));
      if (!isNaN(r)) setMemory(m => m - r);
      return;
    }

    // If just computed and pressing a digit, start fresh; otherwise continue building
    const append = hasResult && /^\d|\./.test(effectiveAction.replace("fn:", ""))
      ? effectiveAction.replace("fn:", "")
      : (exprRef.current + (effectiveAction.startsWith("fn:") ? effectiveAction.slice(3) : effectiveAction));

    setExpr(append);
    setHasResult(false);
  }, [shift, hasResult, result, memory]);

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") pressKey({ label: "=", action: "=" });
      else if (e.key === "Backspace") pressKey({ label: "DEL", action: "del" });
      else if (e.key === "Escape") pressKey({ label: "AC", action: "ac" });
      else if (/^[0-9]$/.test(e.key)) pressKey({ label: e.key });
      else if (e.key === ".") pressKey({ label: "." });
      else if (e.key === "+") pressKey({ label: "+", action: "+" });
      else if (e.key === "-") pressKey({ label: "−", action: "-" });
      else if (e.key === "*") pressKey({ label: "×", action: "×" });
      else if (e.key === "/") { e.preventDefault(); pressKey({ label: "÷", action: "÷" }); }
      else if (e.key === "^") pressKey({ label: "^", action: "^" });
      else if (e.key === "(") pressKey({ label: "(" });
      else if (e.key === ")") pressKey({ label: ")" });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [pressKey]);

  return (
    <div className="w-72 select-none" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      {/* Calculator body */}
      <div className="rounded-2xl bg-gray-200 dark:bg-gray-300 p-3 shadow-2xl border-2 border-gray-400">
        {/* Brand strip */}
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[9px] font-bold text-gray-700 tracking-wider">TI-30XS MultiView™</span>
          {memory !== 0 && <span className="text-[8px] text-blue-700 font-bold">M</span>}
          {shift && <span className="text-[8px] text-blue-700 font-bold">2nd</span>}
        </div>

        {/* Display */}
        <div className="rounded-lg bg-gray-900 border-2 border-gray-600 p-2 mb-3 min-h-[52px]">
          {/* Expression line */}
          <div className="text-right text-[10px] text-gray-400 min-h-[14px] overflow-hidden">
            {expr || " "}
          </div>
          {/* Result line */}
          <div className="text-right text-lg font-bold text-green-300 leading-tight overflow-hidden">
            {result}
          </div>
        </div>

        {/* Keys */}
        <div className="space-y-1.5">
          {KEYS.map((row, ri) => (
            <div key={ri} className="flex gap-1.5">
              {row.map((key, ki) => {
                const cls = key.color ? keyColor[key.color] : "bg-gray-700 hover:bg-gray-600 text-white";
                return (
                  <button
                    key={ki}
                    onClick={() => pressKey(key)}
                    className={`flex-1 h-8 rounded text-[11px] font-semibold transition-colors active:scale-95 ${cls} ${key.wide ? "flex-[2]" : ""}`}
                    title={shift && key.second ? key.second : undefined}
                  >
                    <span className="block leading-none">
                      {shift && key.second ? key.second : key.label}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-2 text-center text-[7px] text-gray-500">TEXAS INSTRUMENTS</div>
      </div>
    </div>
  );
}
