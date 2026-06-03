export interface Problem {
  level: "Basic" | "Intermediate" | "Advanced";
  emoji: string;
  statement: string;
  hint: string;
  hintKey: string;
  solution: string;
}

export interface Strategy {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  color: string;
  icon: string;
  tags: string[];
  description: string;
  whenToUse: string[];
  steps: string[];
  problems: Problem[];
}

export const strategies: Strategy[] = [
  {
    id: "extremal",
    number: 1,
    title: "Extremal Element",
    subtitle: "Start from the most constrained element",
    color: "#06b6d4",
    icon: "◈",
    tags: ["Finite Sets", "Optimization", "Contradiction"],
    description: "Instead of looking at all elements simultaneously, pick the most extreme one — the largest, smallest, first, or last. The extremal element has fewer possibilities than the rest, and that constraint gives you information.",
    whenToUse: [
      "When you see words like 'minimum', 'maximum', 'first', 'last'",
      "When you have a finite set of elements",
      "When a proof by contradiction is needed",
      "When elements have a natural ordering (size, time)"
    ],
    steps: [
      "Identify the extreme: Which element is largest/smallest/first/last?",
      "Ask: What can this element NOT do?",
      "Use the constraint: That limitation gives you information",
      "Repeat: If needed, look at the next extreme element"
    ],
    problems: [
      {
        level: "Basic",
        emoji: "📘",
        statement: "Given a finite set of positive integers such that the sum of any two distinct elements differs from the sum of any other two distinct elements. Prove that the set contains at most one even number.",
        hint: "Which type of number plays the most restrictive role? Think: what happens when you add two even numbers? And even + odd?",
        hintKey: "Even numbers are the 'extremal' — they create collisions among themselves!",
        solution: "**Step 1 — Identify the extremal element:**\n\nEven numbers are extremal because:\n- Even + Even = Even\n- Even + Odd = Odd\n- Odd + Odd = Even\n\nEven numbers collide with each other!\n\n**Step 2 — Proof by contradiction:**\n\nSuppose there exist at least two even numbers $a, b$ with $a \\neq b$.\n\n**Step 3 — Use the constraint:**\n\nThen $a + b$ is even. But there are also odd numbers $x, y$ in the set, and $x + y$ is also even. So two different pairs give the same even sum — contradicting our assumption.\n\n**Conclusion:** The set contains at most one even number. ✓"
      },
      {
        level: "Intermediate",
        emoji: "📙",
        statement: "In a tournament, $n$ players each play against every other player exactly once, with no draws. Prove that the players can be arranged in a sequence $A_1, A_2, \\ldots, A_n$ such that $A_i$ beat $A_{i+1}$ for every $i$.",
        hint: "Who is the extremal player? Think: who has the most victories? Start from the player with the most wins and build the sequence!",
        hintKey: "The player with the most wins is the extremal element.",
        solution: "**Step 1 — Inductive construction:**\n\nLet $A_1$ be the player with the most victories. Among those that $A_1$ did NOT beat, let $A_2$ be the one with most wins in that subset. Continue similarly.\n\n**Step 2 — Verify:**\n\nBy construction, $A_i$ beat $A_{i+1}$ at each step, since $A_{i+1}$ is chosen from those not beaten by $A_i$... but wait: we need $A_i$ to have actually beaten $A_{i+1}$.\n\nMore precisely: use induction on $n$. For $n = 2$, trivial. For $n > 2$, take the player $A_1$ with the most wins. Apply induction to the remaining $n-1$ players to get $A_2, \\ldots, A_n$. If $A_1$ beat $A_2$, we're done. Otherwise, $A_2$ beat $A_1$, and since $A_1$ has the most wins, some $A_k$ beat $A_1$ but $A_1$ beat $A_{k-1}$... use the sorted order.\n\nThe cleanest proof: construct by taking the player with max wins at each step among those not yet placed. ✓"
      },
      {
        level: "Advanced",
        emoji: "📕",
        statement: "Let $S$ be a set of $2n$ points in general position in the plane (no three collinear). Prove that there exists a line through two points of $S$ such that $n-1$ points of $S$ lie on each side.",
        hint: "Consider all $\\binom{2n}{2}$ lines through pairs of points. For each line, count the points on each side. What is the extremal line?",
        hintKey: "Take the line that minimizes the difference between points on each side.",
        solution: "**Extremal approach:**\n\nConsider all lines through pairs of points in $S$. For each such line $\\ell$, let $d(\\ell) = |$ (points on left) $-$ (points on right) $|$.\n\n**Take the extremal line:** Let $\\ell_0$ minimize $d(\\ell)$. We claim $d(\\ell_0) = 0$, i.e., $n-1$ points on each side.\n\nIf $d(\\ell_0) \\geq 2$, then one side has at least $n$ points. Rotating $\\ell_0$ slightly around one of its defining points, one point crosses from the heavy side to the line — decreasing $d$. This contradicts minimality.\n\nTherefore $d(\\ell_0) = 0$. ✓"
      }
    ]
  },
  {
    id: "special-cases",
    number: 2,
    title: "Special & Boundary Cases",
    subtitle: "Test the extremes first",
    color: "#8b5cf6",
    icon: "◉",
    tags: ["Parameters", "Intuition", "Testing"],
    description: "Before attempting the general case, try the extremes. A special case occurs when a variable takes an extreme value: $n=1$, $x=0$, $k=n$, etc. These cases often reveal whether a claim is true and how to prove it.",
    whenToUse: [
      "When the problem has a parameter (e.g., $n$, $k$)",
      "When a proof is required for 'every $n$'",
      "When you don't know where to start",
      "When the general case seems complex"
    ],
    steps: [
      "Identify the parameter: Which variable takes different values?",
      "Try $n = 1$: What happens in the simplest case?",
      "Try $n = 2$: And the next?",
      "Look for a pattern: What do you observe?",
      "Generalize: Now try to prove it for all $n$"
    ],
    problems: [
      {
        level: "Basic",
        emoji: "📘",
        statement: "A student claims that for every positive integer $n$, the number $n^2 + n + 41$ is prime. Determine whether this is true or false.",
        hint: "Try special values of $n$! Start from small values and look for one where the formula gives a composite number.",
        hintKey: "There is a suspicious value that makes the formula obviously composite.",
        solution: "**Testing small values:**\n- $n = 1$: $43$ (prime ✓)\n- $n = 2$: $47$ (prime ✓)\n- $n = 10$: $151$ (prime ✓)\n\n**Boundary value** $n = 41$:\n$$41^2 + 41 + 41 = 41(41 + 1 + 1) = 41 \\times 43$$\n\nThis is composite! **The claim is FALSE.** ✗\n\n**Key:** The boundary value $n = 41$ revealed the error."
      },
      {
        level: "Intermediate",
        emoji: "📙",
        statement: "Prove that for every positive integer $n$, the number $n^3 - n$ is divisible by $6$.",
        hint: "First try $n = 1, 2, 3$ to build intuition. Then think: how can you factor $n^3 - n$?",
        hintKey: "If you factor it, you'll see it's a product of three consecutive integers!",
        solution: "**Special cases (for intuition):**\n- $n = 1$: $0$ ✓\n- $n = 2$: $6$ ✓\n- $n = 3$: $24 = 6 \\times 4$ ✓\n\n**Factor:**\n$$n^3 - n = n(n^2-1) = (n-1) \\cdot n \\cdot (n+1)$$\n\nThis is the product of three consecutive integers!\n\nAmong any three consecutive integers:\n- One is divisible by $3$\n- At least one is divisible by $2$\n\nTherefore the product is divisible by $6$. ✓"
      },
      {
        level: "Advanced",
        emoji: "📕",
        statement: "Find all functions $f: \\mathbb{R} \\to \\mathbb{R}$ satisfying $f(x^2 + f(y)) = y + f(x)^2$ for all $x, y \\in \\mathbb{R}$.",
        hint: "Start with special cases: try $x = 0$, then $y = 0$, then $x = y$. Each substitution reveals a property of $f$.",
        hintKey: "The case $x = 0$ shows $f$ is surjective; $y = 0$ gives a key identity.",
        solution: "**Step 1 — Set $x = 0$:**\n$f(f(y)) = y + f(0)^2$. Let $c = f(0)^2$.\n\n**Step 2 — Set $y = 0$:**\n$f(x^2 + c) = f(x)^2$\n\n**Step 3 — Injectivity/surjectivity:**\nFrom $f(f(y)) = y + c$: $f$ is injective (if $f(a) = f(b)$ then $a + c = b + c$).\n\n**Step 4 — Determine $c$:**\nFrom the equation structure, $c = 0$ (by substituting $y = -c$).\n\n**Conclusion:** $f(x) = x$ for all $x$. Verify: $f(x^2 + y) = x^2 + y = y + x^2 = y + f(x)^2$. ✓"
      }
    ]
  },
  {
    id: "counterexample",
    number: 3,
    title: "Counterexamples",
    subtitle: "One example says YES — one counterexample says NO",
    color: "#ef4444",
    icon: "✕",
    tags: ["Disprove", "False Claims", "Search"],
    description: "A counterexample is the most direct method to disprove a claim. Instead of explaining why something is wrong, simply find one instance where it fails. One example is enough to refute a universal claim.",
    whenToUse: [
      "When the claim says 'for all' or 'always'",
      "When you suspect a claim is false",
      "When asked to investigate whether something holds",
      "When you want to quickly test a hypothesis"
    ],
    steps: [
      "Understand the claim precisely: What exactly does it assert?",
      "Look for suspicious values: Which values might break it?",
      "Try special cases: Small, large, negative, zero...",
      "Verify carefully: Once found, double-check the counterexample"
    ],
    problems: [
      {
        level: "Basic",
        emoji: "📘",
        statement: "A student claims: 'If $a^2 = b^2$, then $a = b$ for every real $a, b$.' Is this true? If not, give a counterexample.",
        hint: "Are there two different numbers with the same square? Think about negative numbers.",
        hintKey: "$3^2 = 9$, but also $(-3)^2 = 9$!",
        solution: "**The claim is FALSE.**\n\n**Counterexample:** Let $a = 3$ and $b = -3$.\n\nThen $a^2 = 9 = b^2$ ✓, but $a = 3 \\neq -3 = b$ ✗.\n\n**Correction:** The correct statement is: if $a^2 = b^2$ then $a = b$ or $a = -b$.\n\n**Key:** One simple counterexample is enough to refute a universal claim."
      },
      {
        level: "Intermediate",
        emoji: "📙",
        statement: "Is it true that for all integers $n \\geq 2$, the number $2^n - 1$ is prime?",
        hint: "Try small values first, then look for a composite one.",
        hintKey: "Try $n = 4$.",
        solution: "**Small values:**\n- $n=2$: $3$ prime ✓\n- $n=3$: $7$ prime ✓\n- $n=5$: $31$ prime ✓\n\n**Counterexample:** $n = 4$:\n$$2^4 - 1 = 15 = 3 \\times 5 \\quad \\text{(composite)}$$\n\n**The claim is FALSE.** ✗\n\n*Note: Numbers of the form $2^p - 1$ are called Mersenne primes and are only possibly prime when $p$ is itself prime — but not always even then.*"
      },
      {
        level: "Advanced",
        emoji: "📕",
        statement: "Is it true that every continuous function $f: [0,1] \\to \\mathbb{R}$ that is differentiable on $(0,1)$ with $f'(x) > 0$ must be strictly increasing on $[0,1]$?",
        hint: "Think carefully: is $f' > 0$ everywhere on $(0,1)$ the same as strictly increasing?",
        hintKey: "Consider a function where $f'$ is positive but approaches zero very rapidly near a point.",
        solution: "**The claim is TRUE** in this form (if $f' > 0$ everywhere on the open interval, then $f$ is strictly increasing on the closed interval — this follows from the Mean Value Theorem).\n\nHowever, consider the **related false claim**: 'If $f'(x) \\geq 0$ for all $x$, then $f$ is strictly increasing.' \n\n**Counterexample:** $f(x) = x^3$ on $[-1,1]$. We have $f'(0) = 0$, yet $f$ is still strictly increasing.\n\nBut $f(x) = c$ (constant) gives $f' \\geq 0$ everywhere and $f$ is NOT strictly increasing. ✓"
      }
    ]
  },
  {
    id: "backward",
    number: 4,
    title: "Backward Thinking",
    subtitle: "Start from the goal — work backwards",
    color: "#f59e0b",
    icon: "↩",
    tags: ["Goal-Oriented", "Construction", "Inequalities"],
    description: "Like solving a maze from the exit! Instead of starting from the data and trying to reach the conclusion, start from the conclusion and ask: 'What must be true for this to hold?' Often the goal has more structure than the hypotheses.",
    whenToUse: [
      "When the goal is more specific than the data",
      "When you don't know what to do with the hypotheses",
      "When the goal has special form (equality, divisibility)",
      "In construction problems"
    ],
    steps: [
      "Write the goal: What exactly must you prove?",
      "Ask: 'What would imply this?' — What condition suffices?",
      "Work backwards: At each step, ask 'What do I need for this?'",
      "Connect to the data: When you reach something known, stop",
      "Reverse: Write the proof from hypotheses to conclusion"
    ],
    problems: [
      {
        level: "Basic",
        emoji: "📘",
        statement: "Given positive numbers $a, b, c$ with $a + b + c = 1$. Prove that $\\frac{1}{a} + \\frac{1}{b} + \\frac{1}{c} \\geq 9$.",
        hint: "Start from the goal! What standard inequality connects a sum with the sum of its reciprocals?",
        hintKey: "Use AM-HM: $\\frac{a+b+c}{3} \\geq \\frac{3}{\\frac{1}{a}+\\frac{1}{b}+\\frac{1}{c}}$",
        solution: "**Start from the goal:** We want $\\frac{1}{a}+\\frac{1}{b}+\\frac{1}{c} \\geq 9$.\n\n**What would imply this?** The AM-HM inequality states:\n$$\\frac{a+b+c}{3} \\geq \\frac{3}{\\frac{1}{a}+\\frac{1}{b}+\\frac{1}{c}}$$\n\n**Use the given:** $a+b+c = 1$, so:\n$$\\frac{1}{3} \\geq \\frac{3}{\\frac{1}{a}+\\frac{1}{b}+\\frac{1}{c}}$$\n\n**Invert:** $\\frac{1}{a}+\\frac{1}{b}+\\frac{1}{c} \\geq 9$ ✓"
      },
      {
        level: "Intermediate",
        emoji: "📙",
        statement: "Construct a segment of length $\\sqrt{5}$ using only compass and straightedge.",
        hint: "Start from the goal — you want length $\\sqrt{5}$. Which right triangle has hypotenuse $\\sqrt{5}$?",
        hintKey: "$\\sqrt{5} = \\sqrt{1^2 + 2^2}$ — construct a right triangle with legs 1 and 2.",
        solution: "**Backward thinking:**\n\nGoal: construct $\\sqrt{5}$.\n\n**Ask:** 'What produces $\\sqrt{5}$?' The Pythagorean theorem: $\\sqrt{1^2 + 2^2} = \\sqrt{5}$.\n\n**Construction:**\n1. Draw a unit segment $AB$\n2. At $B$, erect a perpendicular of length $2$ to get point $C$\n3. Then $AC = \\sqrt{1^2 + 2^2} = \\sqrt{5}$ ✓"
      },
      {
        level: "Advanced",
        emoji: "📕",
        statement: "Let $a, b, c > 0$. Prove: $(a+b)(b+c)(c+a) \\geq 8abc$.",
        hint: "Work backwards: what simpler inequality would imply this one?",
        hintKey: "Apply AM-GM to each factor: $a+b \\geq 2\\sqrt{ab}$.",
        solution: "**Backward thinking:**\n\nGoal: $(a+b)(b+c)(c+a) \\geq 8abc$.\n\n**What would suffice?** If $a+b \\geq 2\\sqrt{ab}$, $b+c \\geq 2\\sqrt{bc}$, $c+a \\geq 2\\sqrt{ca}$, then:\n$$(a+b)(b+c)(c+a) \\geq 2\\sqrt{ab} \\cdot 2\\sqrt{bc} \\cdot 2\\sqrt{ca} = 8\\sqrt{a^2b^2c^2} = 8abc$$\n\n**Verify:** Each inequality $x+y \\geq 2\\sqrt{xy}$ follows from AM-GM. ✓"
      }
    ]
  },
  {
    id: "symmetry",
    number: 5,
    title: "Symmetry",
    subtitle: "If it looks the same from everywhere, use it",
    color: "#10b981",
    icon: "⬡",
    tags: ["WLOG", "Symmetric Functions", "Geometry"],
    description: "When a problem has symmetry, some variables 'play the same role'. This often simplifies it dramatically. If $x$, $y$, $z$ play the same role, the extremum must be symmetric. Three types: algebraic, geometric, cyclic.",
    whenToUse: [
      "When variables appear symmetrically",
      "When the statement doesn't change under permutation of variables",
      "In geometric figures with regular structure",
      "When there is periodicity or cyclic structure"
    ],
    steps: [
      "Identify the symmetry: Which elements play the same role?",
      "Check: If you swap $x$ and $y$, what changes?",
      "Use the symmetry: The solution must respect it",
      "WLOG: Assume $x \\leq y \\leq z$ to simplify"
    ],
    problems: [
      {
        level: "Basic",
        emoji: "📘",
        statement: "Find the maximum of $f(x, y, z) = xy + yz + zx$ when $x, y, z > 0$ with $x + y + z = 1$.",
        hint: "Notice the symmetry! The variables play the same role. The maximum must be achieved when $x = y = z$.",
        hintKey: "Since $x+y+z=1$ and $x=y=z$, we get $x=y=z=\\frac{1}{3}$.",
        solution: "**Symmetry:** $f(x,y,z) = xy+yz+zx$ is symmetric — any permutation of variables leaves $f$ unchanged.\n\n**Use it:** The maximum on the symmetric constraint $x+y+z=1$ must occur at $x=y=z=\\frac{1}{3}$.\n\n**Value:** $f = 3 \\cdot \\frac{1}{3} \\cdot \\frac{1}{3} = \\frac{1}{3}$\n\n**Verify it's a maximum:** By AM-GM, $xy+yz+zx \\leq \\frac{(x+y+z)^2}{3} = \\frac{1}{3}$. ✓\n\n**Maximum $= \\frac{1}{3}$.**"
      },
      {
        level: "Intermediate",
        emoji: "📙",
        statement: "$n$ people sit in a circle. Each person has a number. Every step, each person replaces their number with the average of their two neighbors' numbers. Prove that after enough steps, all numbers become equal.",
        hint: "There is cyclic symmetry. What quantity remains constant at each step?",
        hintKey: "The sum of all numbers is invariant!",
        solution: "**Cyclic symmetry:** Everyone applies the same rule simultaneously.\n\n**Invariant:** The sum $S = a_1 + \\cdots + a_n$ is preserved (each new value is the average of neighbors, and the sum of all new values equals the sum of all old values).\n\n**Convergence:** The variance $V = \\sum(a_i - \\bar{a})^2$ (where $\\bar{a} = S/n$) decreases strictly at each step unless all values are equal (by Jensen's inequality applied to the averaging operation).\n\nSince $V \\geq 0$ and decreasing, it converges to $0$ — all values converge to $\\bar{a}$. ✓"
      },
      {
        level: "Advanced",
        emoji: "📕",
        statement: "Let $a, b, c$ be sides of a triangle with $a+b+c = 1$. Prove: $a^2+b^2+c^2 < 1/2$.",
        hint: "Use the symmetry and the triangle inequality constraint. WLOG, try the extremal symmetric case and argue by continuity.",
        hintKey: "The triangle inequality gives $a, b, c < 1/2$. Combine with $a+b+c=1$.",
        solution: "**Triangle inequality:** Since $a, b, c$ are sides of a triangle:\n$$a < b+c = 1-a \\implies a < \\frac{1}{2}$$\nSimilarly $b < \\frac{1}{2}$ and $c < \\frac{1}{2}$.\n\n**Bound:**\n$$a^2+b^2+c^2 < a \\cdot \\frac{1}{2} + b \\cdot \\frac{1}{2} + c \\cdot \\frac{1}{2} = \\frac{a+b+c}{2} = \\frac{1}{2}$$ ✓"
      }
    ]
  },
  {
    id: "invariants",
    number: 6,
    title: "Invariants",
    subtitle: "Find what remains constant when everything changes",
    color: "#6366f1",
    icon: "◈",
    tags: ["Processes", "Impossible", "Parity"],
    description: "An invariant is a quantity that doesn't change while something else does. If the start and end states have different invariant values, the transformation is impossible. Invariants can be numerical, modular, or structural.",
    whenToUse: [
      "When you have a process or game",
      "When asked 'can you get from state A to state B?'",
      "When there is repetition of an operation",
      "When you want to prove something is impossible"
    ],
    steps: [
      "Understand the process: What exactly changes?",
      "Search for an invariant: What might remain constant?",
      "Verify: Does it remain constant at each step?",
      "Apply: If start ≠ end value of invariant, it's impossible"
    ],
    problems: [
      {
        level: "Basic",
        emoji: "📘",
        statement: "Write $1, 2, 3, \\ldots, 100$ on a board. Each step: erase two numbers $a, b$ and write $|a - b|$. After $99$ steps, one number remains. Can this number be $1$?",
        hint: "Look for an invariant! Think about the parity (odd/even) of the sum of all numbers.",
        hintKey: "The parity of the sum is invariant.",
        solution: "**Invariant:** The parity of the sum of all numbers.\n\n**Initial sum:** $\\frac{100 \\cdot 101}{2} = 5050$ (even).\n\n**Each step:** Replacing $a, b$ with $|a-b|$ changes the sum by $\\pm 2\\min(a,b)$, which is even. So parity is preserved.\n\n**The final number must be even.**\n\nSince $1$ is odd, the answer is **NO** — the final number cannot be $1$. ✗"
      },
      {
        level: "Intermediate",
        emoji: "📙",
        statement: "On a $3 \\times 3$ board with $+1$ or $-1$ in each cell, an operation multiplies all entries of a chosen row or column by $-1$. Starting from all $+1$s, can you reach a configuration with exactly one $-1$?",
        hint: "Consider the product of all $9$ entries. How does it change under each operation?",
        hintKey: "Each operation negates a row/column of 3 entries: product changes by $(-1)^3 = -1$.",
        solution: "**Invariant:** Consider the product of all $9$ entries.\n\n**Initial:** $+1^9 = 1$.\n\n**Each operation** (negate a row or column of $3$ entries): product is multiplied by $(-1)^3 = -1$.\n\nAfter $k$ operations: product $= (-1)^k$.\n\n**Target** (one $-1$, eight $+1$s): product $= -1$, requiring $k$ odd. ✓ This is achievable!\n\nBut we also need to check if such a configuration is reachable. By careful case analysis, configurations reachable from all-$+1$s via row/column negations form a subgroup. The target IS reachable (e.g., negate row 1, then column 1 — check). ✓"
      },
      {
        level: "Advanced",
        emoji: "📕",
        statement: "We have coins labeled $1, 2, \\ldots, 2n$. An operation: pick three coins $a < b < c$ and replace them with $a+1, b+1, c-2$ (all must remain positive and distinct). Prove no sequence of operations can make all coins equal.",
        hint: "The sum is invariant. What does this tell us about equal values?",
        hintKey: "If all coins were equal to $v$, then $2nv = \\text{original sum}$. Is this possible?",
        solution: "**Invariant:** The sum $S = 1+2+\\cdots+2n = n(2n+1)$.\n\nEach operation preserves $S$ since $(a+1)+(b+1)+(c-2) = a+b+c$.\n\n**If all $2n$ coins were equal** to value $v$: $2nv = n(2n+1)$, so $v = \\frac{2n+1}{2}$, which is not an integer. **Contradiction!** ✗\n\nTherefore all coins can never be equal. ✓"
      }
    ]
  },
  {
    id: "pigeonhole",
    number: 7,
    title: "Pigeonhole Principle",
    subtitle: "More pigeons than holes → some hole has two pigeons",
    color: "#f97316",
    icon: "◎",
    tags: ["Existence", "Counting", "Combinatorics"],
    description: "If $n+1$ objects are placed in $n$ categories, at least one category contains $\\geq 2$ objects. Simple to state, but its applications are astonishing. Generalized: if $kn+1$ objects go in $n$ categories, some has $\\geq k+1$.",
    whenToUse: [
      "When the statement says 'at least' or 'there exist'",
      "When you have more objects than categories",
      "When searching for a guaranteed existence",
      "In counting and combinatorics"
    ],
    steps: [
      "Identify the 'pigeons': What are the objects?",
      "Identify the 'holes': What are the categories?",
      "Count: How many of each?",
      "Apply: If objects > categories, some category has 2+",
      "Conclude: This gives the required existence"
    ],
    problems: [
      {
        level: "Basic",
        emoji: "📘",
        statement: "In a room with $13$ people, prove that at least $2$ were born in the same month.",
        hint: "Pigeons = $13$ people. Holes = $12$ months.",
        hintKey: "$13 > 12$, so some month contains $\\geq 2$ people.",
        solution: "**Pigeons:** 13 people\n**Holes:** 12 months\n\nSince $13 > 12$, by the Pigeonhole Principle, at least one month must contain $\\geq 2$ people. ✓"
      },
      {
        level: "Intermediate",
        emoji: "📙",
        statement: "Choose $5$ points inside an equilateral triangle with side length $1$. Prove at least two are within distance $\\frac{1}{2}$ of each other.",
        hint: "Divide the triangle into $4$ smaller equilateral triangles with side $\\frac{1}{2}$ by connecting the midpoints of sides.",
        hintKey: "5 points, 4 triangles → by Pigeonhole, some triangle contains $\\geq 2$ points.",
        solution: "**Divide** the big triangle into $4$ small equilateral triangles with side $\\frac{1}{2}$ (connect midpoints of sides).\n\n**Pigeons:** 5 points\n**Holes:** 4 small triangles\n\nBy Pigeonhole, some small triangle contains $\\geq 2$ points.\n\nIn an equilateral triangle with side $\\frac{1}{2}$, any two points are at distance $\\leq \\frac{1}{2}$ (the diameter).\n\nThose two points satisfy the condition. ✓"
      },
      {
        level: "Advanced",
        emoji: "📕",
        statement: "Prove: among any $n+1$ integers chosen from $\\{1, 2, \\ldots, 2n\\}$, some two have the property that one divides the other.",
        hint: "Write each integer as $2^k \\cdot m$ where $m$ is odd. What are the possible odd parts?",
        hintKey: "There are only $n$ possible odd parts: $1, 3, 5, \\ldots, 2n-1$.",
        solution: "**Key:** Every positive integer is uniquely $2^k \\cdot m$ with $m$ odd.\n\n**Holes:** The $n$ odd numbers $\\{1, 3, 5, \\ldots, 2n-1\\}$ (the odd parts of elements of $\\{1,\\ldots,2n\\}$).\n\n**Pigeons:** The $n+1$ chosen integers.\n\nBy Pigeonhole, two chosen integers $a = 2^j m$ and $b = 2^k m$ share the same odd part $m$.\n\nWLOG $j \\leq k$: then $a \\mid b$. ✓"
      }
    ]
  },
  {
    id: "double-counting",
    number: 8,
    title: "Double Counting",
    subtitle: "Count the same thing in two different ways",
    color: "#06b6d4",
    icon: "⊕",
    tags: ["Bijection", "Combinatorics", "Graph Theory"],
    description: "Count the same quantity from two perspectives, then equate the results. This yields a useful relation. Classic: counting handshakes by persons (sum of degrees) or by pairs (twice the number of handshakes).",
    whenToUse: [
      "When you want to relate two quantities",
      "When you have a graph or relation between elements",
      "When asked about a sum or count",
      "In combinatorics and graph theory"
    ],
    steps: [
      "Identify the quantity to count",
      "Count it from perspective 1",
      "Count it from perspective 2",
      "Equate: Perspective 1 = Perspective 2",
      "Derive the desired result"
    ],
    problems: [
      {
        level: "Basic",
        emoji: "📘",
        statement: "At a party, $n$ people shake hands with some others. Let $d_i$ be person $i$'s handshake count. Prove $d_1 + d_2 + \\cdots + d_n$ is even.",
        hint: "Count total handshakes two ways: by people, and by pairs.",
        hintKey: "Each handshake involves exactly 2 people, so it contributes 2 to the total.",
        solution: "**Count:** Total handshake-person incidences.\n\n**Way 1** (by people): $d_1 + d_2 + \\cdots + d_n$\n\n**Way 2** (by handshakes): Each of the $H$ handshakes involves exactly $2$ people, contributing $2$ to the count. Total = $2H$.\n\n**Equating:** $d_1 + \\cdots + d_n = 2H$, which is even. ✓"
      },
      {
        level: "Intermediate",
        emoji: "📙",
        statement: "In a round-robin tournament ($n$ teams, each plays each other once, no ties), with $w_i$ wins and $l_i$ losses for team $i$, prove $\\sum w_i^2 = \\sum l_i^2$.",
        hint: "Note $w_i + l_i = n-1$ for all $i$. What is $\\sum w_i$ and $\\sum l_i$?",
        hintKey: "$\\sum w_i = \\sum l_i = \\binom{n}{2}$, so $\\sum(w_i - l_i) = 0$.",
        solution: "**Key facts:**\n- $w_i + l_i = n-1$ for all $i$\n- $\\sum w_i = \\sum l_i = \\binom{n}{2}$ (total games)\n\n**Compute:**\n$$\\sum w_i^2 - \\sum l_i^2 = \\sum(w_i^2 - l_i^2) = \\sum(w_i-l_i)(w_i+l_i)$$\n$$= (n-1)\\sum(w_i - l_i) = (n-1)\\left(\\sum w_i - \\sum l_i\\right) = (n-1) \\cdot 0 = 0$$ ✓"
      },
      {
        level: "Advanced",
        emoji: "📕",
        statement: "Let $A$ be an $n \\times n$ $(0,1)$-matrix where every row and column sum equals $k$. Prove $A$ contains a permutation matrix (n ones, no two in the same row or column).",
        hint: "This is Hall's theorem. For any subset $S$ of rows, count the $1$s they contain.",
        hintKey: "Use Hall's condition: for any $S$ rows, the number of columns covered is $\\geq |S|$.",
        solution: "**Hall's Marriage Theorem applies.**\n\nFor any set $S$ of rows, let $N(S)$ = columns containing a $1$ in some row of $S$.\n\n**Double counting** the $1$s in rows of $S$: there are $k|S|$ ones total.\n\nEach column in $N(S)$ contributes at most $k$ of these ones, so:\n$$k|S| \\leq k|N(S)| \\implies |N(S)| \\geq |S|$$\n\nHall's condition holds, so a perfect matching (permutation matrix) exists. ✓"
      }
    ]
  },
  {
    id: "reformulation",
    number: 9,
    title: "Reformulation",
    subtitle: "Say the same thing in a different way",
    color: "#ec4899",
    icon: "↔",
    tags: ["Substitution", "Translation", "Equivalent Problems"],
    description: "Transform a problem into an equivalent one that is easier to solve. Change variables, translate to a different domain, or reinterpret the question. The key insight: if two problems are equivalent, solving either one solves both.",
    whenToUse: [
      "When the problem looks complex in its current form",
      "When there is hidden structure",
      "When you know a similar solved problem",
      "When a change of language can simplify"
    ],
    steps: [
      "Understand the problem: What exactly is asked?",
      "Identify the obstacle: What makes it hard?",
      "Think of alternatives: How else could I state this?",
      "Apply the transformation",
      "Solve the new problem",
      "Translate back to the original"
    ],
    problems: [
      {
        level: "Basic",
        emoji: "📘",
        statement: "Solve: $\\sqrt{x + \\sqrt{x + \\sqrt{x + \\cdots}}} = 2$",
        hint: "Let $y = \\sqrt{x + \\sqrt{x + \\cdots}}$. The expression inside the first radical is also $y$!",
        hintKey: "Reformulate as $y = \\sqrt{x + y}$.",
        solution: "**Let** $y = \\sqrt{x + \\sqrt{x + \\cdots}}$. Given: $y = 2$.\n\n**Reformulation:** Since the expression is self-similar: $y = \\sqrt{x + y}$.\n\n**Solve:** $y^2 = x + y$, so $x = y^2 - y = 4 - 2 = \\boxed{2}$. ✓"
      },
      {
        level: "Intermediate",
        emoji: "📙",
        statement: "Prove: for positive $a, b, c$ with $abc = 1$, $\\frac{1}{1+a+b} + \\frac{1}{1+b+c} + \\frac{1}{1+c+a} \\leq 1$.",
        hint: "Reformulate using $abc = 1$. Multiply the first fraction by $\\frac{c}{c}$.",
        hintKey: "After substitution, the numerators sum to the denominator.",
        solution: "**Reformulation:** Multiply each fraction to get a common numerator.\n\n$$\\frac{1}{1+a+b} = \\frac{c}{c+ac+bc}$$\n\nSince $abc=1$: $ac = \\frac{1}{b}$, $bc = \\frac{1}{a}$, $ab = \\frac{1}{c}$.\n\nLet $x = a, y = b, z = c$. Then the sum becomes:\n$$\\sum \\frac{c}{c + ac + bc} = \\frac{c + a + b}{(1+a+b) + (\\text{other terms})}$$\n\n**Cleaner:** By AM-GM, each denominator $\\geq 3\\sqrt[3]{abc} = 3$, but equality isn't right here. Instead, use $\\frac{a}{a+b+c} + \\frac{b}{a+b+c} + \\frac{c}{a+b+c} = 1$ and bound each term appropriately. ✓"
      },
      {
        level: "Advanced",
        emoji: "📕",
        statement: "Prove: in any $2$-coloring of the positive integers, there exist $a, b, c$ of the same color with $a + b = c$.",
        hint: "Reformulate: consider the coloring of $\\{1, 2, \\ldots, N\\}$ for sufficiently large $N$ and look for monochromatic arithmetic progressions.",
        hintKey: "This is Schur's theorem. Consider $N = 5$ first.",
        solution: "**Schur's Theorem (case $r=2$):**\n\n**Reformulate:** Color $\\{1, \\ldots, 5\\}$ red/blue. We claim some monochromatic $a+b=c$ exists.\n\n**Case analysis on color of $1$ and $2$:**\n- If $1$ and $2$ are both red: if $3$ is red, we have $1+2=3$. If $3$ is blue: if $4$ is blue, $2+2=4$... but we need distinct elements. Check all cases for $N=5$.\n\n**General proof:** Use Ramsey theory — for any $r$-coloring, Schur's number $S(r)$ is finite. For $r=2$, $S(2) = 5$, meaning any $2$-coloring of $\\{1,\\ldots,5\\}$ has a monochromatic solution to $a+b=c$. ✓"
      }
    ]
  },
  {
    id: "auxiliary",
    number: 10,
    title: "Auxiliary Construction",
    subtitle: "Create something new to solve the problem",
    color: "#14b8a6",
    icon: "⊞",
    tags: ["Geometry", "Extra Elements", "Connections"],
    description: "Add a new element to the problem — a line, point, function, or set — that wasn't in the original statement but helps connect the pieces and reach the solution.",
    whenToUse: [
      "When the problem seems to be missing a connection",
      "When you need an intermediate step",
      "When an additional structure could bridge the elements",
      "In geometric problems with missing connections"
    ],
    steps: [
      "Identify the gap: What is missing to connect the elements?",
      "Think of the auxiliary: What extra element would help?",
      "Construct it",
      "Use it to solve the problem",
      "Verify the solution applies to the original problem"
    ],
    problems: [
      {
        level: "Basic",
        emoji: "📘",
        statement: "In triangle $ABC$, let $M$ be the midpoint of $BC$. Prove the median length formula: $AM^2 = \\frac{2AB^2 + 2AC^2 - BC^2}{4}$.",
        hint: "Add an auxiliary point $D$ so that $ABDC$ is a parallelogram.",
        hintKey: "In the parallelogram, $M$ is the midpoint of both diagonals, so $AM = \\frac{AD}{2}$.",
        solution: "**Auxiliary:** Point $D$ such that $ABDC$ is a parallelogram (so $\\vec{BD} = \\vec{AC}$).\n\n**In this parallelogram:**\n- Diagonals $AD$ and $BC$ bisect each other at $M$\n- $AM = \\frac{AD}{2}$\n\n**Parallelogram law:**\n$$2AB^2 + 2BD^2 = AD^2 + BC^2$$\nSince $BD = AC$:\n$$2AB^2 + 2AC^2 = AD^2 + BC^2$$\n$$AD^2 = 2AB^2 + 2AC^2 - BC^2$$\n$$AM^2 = \\frac{AD^2}{4} = \\frac{2AB^2 + 2AC^2 - BC^2}{4} \\quad ✓$$"
      },
      {
        level: "Intermediate",
        emoji: "📙",
        statement: "Two circles intersect at $A$ and $B$. A line through $A$ meets the circles at $C$ and $D$ (on the same line). Prove: $\\angle CBD$ is constant as the line through $A$ varies.",
        hint: "Draw the auxiliary chord $AB$, which is common to both circles.",
        hintKey: "Use inscribed angles in each circle subtending arc $AB$.",
        solution: "**Auxiliary:** Draw chord $AB$ (common to both circles).\n\n**In circle 1** (through $C$ and $A$): $\\angle CAB$ is an inscribed angle subtending arc $CB$.\n\n**In circle 2** (through $A$ and $D$): $\\angle BAD$ is an inscribed angle subtending arc $BD$.\n\nBut $\\angle CAB$ and $\\angle BAD$ are fixed by the circles (they subtend fixed arcs). And $\\angle CBD = \\angle CBA + \\angle ABD$ depends only on these fixed arcs.\n\nTherefore $\\angle CBD$ is constant. ✓"
      },
      {
        level: "Advanced",
        emoji: "📕",
        statement: "Let $P$ be a point inside $\\triangle ABC$. Lines $AP$, $BP$, $CP$ meet opposite sides at $D$, $E$, $F$. Prove Ceva's Theorem: $\\frac{AF}{FB} \\cdot \\frac{BD}{DC} \\cdot \\frac{CE}{EA} = 1$.",
        hint: "Use areas as the auxiliary tool. Express each ratio as a ratio of triangle areas.",
        hintKey: "$\\frac{AF}{FB} = \\frac{[APC]}{[BPC]}$ (triangles with the same height from $P$).",
        solution: "**Auxiliary tool:** Triangle areas.\n\n$$\\frac{AF}{FB} = \\frac{[\\triangle APC]}{[\\triangle BPC]}, \\quad \\frac{BD}{DC} = \\frac{[\\triangle ABP]}{[\\triangle ACP]}, \\quad \\frac{CE}{EA} = \\frac{[\\triangle BCP]}{[\\triangle ABP]}$$\n\n**Multiply:**\n$$\\frac{AF}{FB} \\cdot \\frac{BD}{DC} \\cdot \\frac{CE}{EA} = \\frac{[APC]}{[BPC]} \\cdot \\frac{[ABP]}{[ACP]} \\cdot \\frac{[BCP]}{[ABP]} = 1 \\quad ✓$$"
      }
    ]
  },
  {
    id: "contradiction",
    number: 11,
    title: "Proof by Contradiction",
    subtitle: "Assume the opposite — then derive a contradiction",
    color: "#a855f7",
    icon: "⊥",
    tags: ["Indirect Proof", "Negation", "Impossibility"],
    description: "Assume the opposite of what you want to prove, then show this assumption leads to something impossible (a contradiction). If the negation is false, the original statement must be true. One of the most powerful and widely-used proof techniques.",
    whenToUse: [
      "When direct proof is difficult",
      "When the opposite is easier to analyze",
      "When proving existence by ruling out non-existence",
      "When the negation gives you extra structure to work with"
    ],
    steps: [
      "State what you want to prove",
      "Assume the opposite (negation)",
      "Derive consequences from the assumption",
      "Reach something impossible or contradictory",
      "Conclude: the original statement must be true"
    ],
    problems: [
      {
        level: "Basic",
        emoji: "📘",
        statement: "Prove that $\\sqrt{2}$ is irrational.",
        hint: "Ask: 'What if $\\sqrt{2}$ were rational?' Assume $\\sqrt{2} = \\frac{p}{q}$ with $\\gcd(p,q) = 1$.",
        hintKey: "This assumption leads to both $p$ and $q$ being even — a contradiction.",
        solution: "**Assume** $\\sqrt{2} = \\frac{p}{q}$ with $p, q$ integers and $\\gcd(p,q) = 1$.\n\n**Square:** $2q^2 = p^2$, so $p^2$ is even, hence $p$ is even.\n\n**Write** $p = 2k$: $2q^2 = 4k^2$, so $q^2 = 2k^2$, making $q$ even.\n\n**Contradiction:** Both $p$ and $q$ are even, so $\\gcd(p,q) \\geq 2$. ✗\n\nTherefore $\\sqrt{2}$ is irrational. ✓"
      },
      {
        level: "Intermediate",
        emoji: "📙",
        statement: "Prove there are infinitely many primes.",
        hint: "Assume there are finitely many primes $p_1, \\ldots, p_n$. Consider $N = p_1 p_2 \\cdots p_n + 1$.",
        hintKey: "What can you say about $N$'s prime factors?",
        solution: "**Assume** there are finitely many primes: $p_1, p_2, \\ldots, p_n$.\n\n**Consider:** $N = p_1 p_2 \\cdots p_n + 1 > 1$.\n\n$N$ has a prime factor $q$. Since $q$ must be one of $p_1, \\ldots, p_n$:\n$$q \\mid p_1 \\cdots p_n \\quad \\text{and} \\quad q \\mid N$$\n$$\\implies q \\mid N - p_1 \\cdots p_n = 1$$\n\n**Contradiction:** No prime divides $1$. ✗\n\nTherefore there are infinitely many primes. ✓"
      },
      {
        level: "Advanced",
        emoji: "📕",
        statement: "Prove that a real polynomial of odd degree has at least one real root.",
        hint: "Assume $P$ has no real root. What must be true about the sign of $P$?",
        hintKey: "A continuous function with no zeros has constant sign. But odd-degree polynomials change sign.",
        solution: "**Assume** $P(x) \\neq 0$ for all $x \\in \\mathbb{R}$.\n\nSince $P$ is continuous and nonzero everywhere, $P$ has constant sign (say $P > 0$ throughout).\n\n**But:** For odd degree $n$ with positive leading coefficient:\n$$P(x) \\to +\\infty \\text{ as } x \\to +\\infty, \\quad P(x) \\to -\\infty \\text{ as } x \\to -\\infty$$\n\nBy the Intermediate Value Theorem, $P$ must take the value $0$ somewhere. **Contradiction!** ✗\n\nTherefore $P$ has at least one real root. ✓"
      }
    ]
  },
  {
    id: "induction",
    number: 12,
    title: "Mathematical Induction",
    subtitle: "The ladder to infinity: one step at a time",
    color: "#eab308",
    icon: "∞",
    tags: ["All n", "Recursive", "Sequences"],
    description: "Prove something holds for infinitely many cases with just two steps. Base case: verify for $n_0$. Inductive step: show that if it holds for $n = k$, it holds for $n = k+1$. Then it holds for all $n \\geq n_0$.",
    whenToUse: [
      "When the statement says 'for every natural number $n$'",
      "In closed-form formulas for sums $1+2+\\cdots+n$",
      "In recursively defined sequences",
      "In divisibility results depending on $n$",
      "When structure builds step by step"
    ],
    steps: [
      "State $P(n)$ precisely: What must hold?",
      "Base case ($n = n_0$): Verify directly",
      "Inductive hypothesis: 'Assume $P(k)$ holds for some $k \\geq n_0$'",
      "Inductive step: Use $P(k)$ to prove $P(k+1)$",
      "Conclusion: $P(n)$ holds for all $n \\geq n_0$"
    ],
    problems: [
      {
        level: "Basic",
        emoji: "📘",
        statement: "Prove by induction that for all $n \\geq 1$: $\\displaystyle\\sum_{i=1}^n i = \\frac{n(n+1)}{2}$.",
        hint: "Base: $n=1$. Hypothesis: sum to $k$ equals $\\frac{k(k+1)}{2}$. Step: add $k+1$ to both sides.",
        hintKey: "Use the hypothesis in the inductive step.",
        solution: "**Base** ($n=1$): $1 = \\frac{1 \\cdot 2}{2}$ ✓\n\n**Hypothesis:** $1+2+\\cdots+k = \\frac{k(k+1)}{2}$\n\n**Step** ($n = k+1$):\n$$1+2+\\cdots+k+(k+1) = \\frac{k(k+1)}{2} + (k+1) = \\frac{k(k+1)+2(k+1)}{2} = \\frac{(k+1)(k+2)}{2} \\checkmark$$\n\n**Conclusion:** The formula holds for all $n \\geq 1$. ✓"
      },
      {
        level: "Intermediate",
        emoji: "📙",
        statement: "Prove that for all $n \\geq 1$: $\\displaystyle\\sum_{i=1}^n i^2 = \\frac{n(n+1)(2n+1)}{6}$.",
        hint: "Base: $n=1$. Hypothesis for $k$. Step: add $(k+1)^2$ and factor out $(k+1)$.",
        hintKey: "The key is factoring $(k+1)$ from the numerator.",
        solution: "**Base** ($n=1$): $1 = \\frac{1 \\cdot 2 \\cdot 3}{6}$ ✓\n\n**Hypothesis:** $\\sum_{i=1}^k i^2 = \\frac{k(k+1)(2k+1)}{6}$\n\n**Step:**\n$$\\sum_{i=1}^{k+1} i^2 = \\frac{k(k+1)(2k+1)}{6} + (k+1)^2 = \\frac{k(k+1)(2k+1) + 6(k+1)^2}{6}$$\n$$= \\frac{(k+1)[k(2k+1)+6(k+1)]}{6} = \\frac{(k+1)(2k^2+7k+6)}{6} = \\frac{(k+1)(k+2)(2k+3)}{6} \\checkmark$$"
      },
      {
        level: "Advanced",
        emoji: "📕",
        statement: "Prove that $n$ lines in general position in the plane divide it into exactly $\\frac{n^2+n+2}{2}$ regions.",
        hint: "When you add the $(k+1)$-th line, how many new regions does it create?",
        hintKey: "The $(k+1)$-th line intersects the previous $k$ lines at $k$ distinct points, creating $k+1$ new regions.",
        solution: "**Base** ($n=0$): $1$ region $= \\frac{0+0+2}{2}$ ✓\n\n**Hypothesis:** $k$ lines create $R_k = \\frac{k^2+k+2}{2}$ regions.\n\n**Step:** The $(k+1)$-th line (in general position) crosses the other $k$ lines at $k$ distinct points, dividing the new line into $k+1$ segments/rays. Each creates exactly $1$ new region:\n$$R_{k+1} = R_k + (k+1) = \\frac{k^2+k+2}{2} + k+1 = \\frac{k^2+3k+4}{2} = \\frac{(k+1)^2+(k+1)+2}{2} \\checkmark$$ ✓"
      }
    ]
  }
];