'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
type Screen = 'landing' | 'game' | 'win';

interface BlockDef { dx: number; dy: number; }
interface PieceDef { id: string; name: string; color: string; blocks: BlockDef[]; }
interface PlacedPiece { pieceId: string; col: number; row: number; rot: number; }

interface Level {
  id: number;
  label: string;
  icon: string;
  desc: string;
  cols: number;
  rows: number;
  pieces: string[];
  color: string;
  glow: string;
}

// ─── Piece Definitions ────────────────────────────────────────────────────────
const PIECE_DEFS: PieceDef[] = [
  { id: 'I2', name: 'Domino',    color: '#25c491', blocks: [{dx:0,dy:0},{dx:1,dy:0}] },
  { id: 'I3', name: 'Triomino',  color: '#3b82f6', blocks: [{dx:0,dy:0},{dx:1,dy:0},{dx:2,dy:0}] },
  { id: 'L3', name: 'L-Tri',     color: '#f59e0b', blocks: [{dx:0,dy:0},{dx:0,dy:1},{dx:1,dy:1}] },
  { id: 'S1', name: 'Monomino',  color: '#ec4899', blocks: [{dx:0,dy:0}] },
  { id: 'T4', name: 'T-Tetro',   color: '#8b5cf6', blocks: [{dx:0,dy:0},{dx:1,dy:0},{dx:2,dy:0},{dx:1,dy:1}] },
  { id: 'L4', name: 'L-Tetro',   color: '#ef4444', blocks: [{dx:0,dy:0},{dx:0,dy:1},{dx:0,dy:2},{dx:1,dy:2}] },
  { id: 'O4', name: 'Square',    color: '#06b6d4', blocks: [{dx:0,dy:0},{dx:1,dy:0},{dx:0,dy:1},{dx:1,dy:1}] },
  { id: 'S4', name: 'S-Tetro',   color: '#84cc16', blocks: [{dx:1,dy:0},{dx:2,dy:0},{dx:0,dy:1},{dx:1,dy:1}] },
  { id: 'Z4', name: 'Z-Tetro',   color: '#f97316', blocks: [{dx:0,dy:0},{dx:1,dy:0},{dx:1,dy:1},{dx:2,dy:1}] },
  { id: 'I4', name: 'I-Tetro',   color: '#a78bfa', blocks: [{dx:0,dy:0},{dx:1,dy:0},{dx:2,dy:0},{dx:3,dy:0}] },
];

// ─── Levels ───────────────────────────────────────────────────────────────────
const LEVELS: Level[] = [
  {
    id: 1, label: 'Level 1', icon: '🌱', desc: 'Fill the 2×3 grid',
    cols: 3, rows: 2,
    pieces: ['I2', 'I2', 'I2'],
    color: '#25c491', glow: 'rgba(37,196,145,0.3)',
  },
  {
    id: 2, label: 'Level 2', icon: '⚡', desc: 'Fill the 3×3 grid',
    cols: 3, rows: 3,
    pieces: ['I3', 'L3', 'L3'],
    color: '#3b82f6', glow: 'rgba(59,130,246,0.3)',
  },
  {
    id: 3, label: 'Level 3', icon: '🔥', desc: 'Fill the 4×3 grid',
    cols: 4, rows: 3,
    pieces: ['T4', 'L4', 'S1', 'S1', 'I2'],
    color: '#f59e0b', glow: 'rgba(245,158,11,0.3)',
  },
  {
    id: 4, label: 'Level 4', icon: '💀', desc: 'Fill the 4×4 grid',
    cols: 4, rows: 4,
    pieces: ['O4', 'S4', 'Z4', 'L4', 'I2', 'S1', 'S1'],
    color: '#ef4444', glow: 'rgba(239,68,68,0.35)',
  },
  {
    id: 5, label: 'Level 5', icon: '🏆', desc: 'Fill the 5×4 grid — Master',
    cols: 5, rows: 4,
    pieces: ['I4', 'T4', 'L4', 'O4', 'S4', 'S1', 'S1', 'S1'],
    color: '#a78bfa', glow: 'rgba(167,139,250,0.35)',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getPieceDef(id: string): PieceDef {
  return PIECE_DEFS.find(p => p.id === id)!;
}

function rotateBlock(dx: number, dy: number, rot: number): [number, number] {
  if (rot === 0) return [dx, dy];
  if (rot === 1) return [-dy, dx];
  if (rot === 2) return [-dx, -dy];
  return [dy, -dx];
}

function normalizeBlocks(blocks: BlockDef[], rot: number): BlockDef[] {
  const rotated = blocks.map(b => {
    const [nx, ny] = rotateBlock(b.dx, b.dy, rot);
    return { dx: nx, dy: ny };
  });
  const minX = Math.min(...rotated.map(b => b.dx));
  const minY = Math.min(...rotated.map(b => b.dy));
  return rotated.map(b => ({ dx: b.dx - minX, dy: b.dy - minY }));
}

function getOccupied(placed: PlacedPiece[]): Set<string> {
  const s = new Set<string>();
  for (const p of placed) {
    const def = getPieceDef(p.pieceId);
    const blocks = normalizeBlocks(def.blocks, p.rot);
    for (const b of blocks) {
      s.add(`${p.col + b.dx},${p.row + b.dy}`);
    }
  }
  return s;
}

function canPlace(
  pieceId: string, col: number, row: number, rot: number,
  placed: PlacedPiece[], cols: number, rows: number
): boolean {
  const def = getPieceDef(pieceId);
  const blocks = normalizeBlocks(def.blocks, rot);
  const occupied = getOccupied(placed);
  for (const b of blocks) {
    const nc = col + b.dx;
    const nr = row + b.dy;
    if (nc < 0 || nr < 0 || nc >= cols || nr >= rows) return false;
    if (occupied.has(`${nc},${nr}`)) return false;
  }
  return true;
}

function isGridFull(placed: PlacedPiece[], cols: number, rows: number): boolean {
  const occupied = getOccupied(placed);
  return occupied.size === cols * rows;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TilingPage() {
  const [screen, setScreen]       = useState<Screen>('landing');
  const [level, setLevel]         = useState<Level>(LEVELS[0]);
  const [placed, setPlaced]       = useState<PlacedPiece[]>([]);
  const [remaining, setRemaining] = useState<string[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [rot, setRot]             = useState(0);
  const [won, setWon]             = useState(false);
  const [moves, setMoves]         = useState(0);
  const [hoverCell, setHoverCell] = useState<{col:number;row:number}|null>(null);
  const [bestScores, setBestScores] = useState<Record<number,number>>({});

  // Load best scores
  useEffect(() => {
    try {
      const s = localStorage.getItem('tiling_bests');
      if (s) setBestScores(JSON.parse(s));
    } catch { /**/ }
  }, []);

  const saveBest = useCallback((levelId: number, m: number) => {
    setBestScores(prev => {
      const next = { ...prev };
      if (!next[levelId] || m < next[levelId]) next[levelId] = m;
      try { localStorage.setItem('tiling_bests', JSON.stringify(next)); } catch { /**/ }
      return next;
    });
  }, []);

  const startLevel = useCallback((lv: Level) => {
    setLevel(lv);
    setPlaced([]);
    setRemaining([...lv.pieces]);
    setSelectedIdx(null);
    setRot(0);
    setMoves(0);
    setWon(false);
    setHoverCell(null);
    setScreen('game');
  }, []);

  // Place piece on cell tap
  const handleCellTap = useCallback((col: number, row: number) => {
    if (won || selectedIdx === null) return;
    const pieceId = remaining[selectedIdx];
    if (!pieceId) return;
    if (!canPlace(pieceId, col, row, rot, placed, level.cols, level.rows)) return;

    const newPlaced = [...placed, { pieceId, col, row, rot }];
    const newRemaining = remaining.filter((_, i) => i !== selectedIdx);
    setPlaced(newPlaced);
    setRemaining(newRemaining);
    setSelectedIdx(newRemaining.length > 0 ? 0 : null);
    setRot(0);
    setMoves(m => m + 1);

    if (isGridFull(newPlaced, level.cols, level.rows)) {
      setWon(true);
      saveBest(level.id, moves + 1);
      setTimeout(() => setScreen('win'), 400);
    }
  }, [won, selectedIdx, remaining, rot, placed, level, moves, saveBest]);

  const handleUndo = useCallback(() => {
    if (placed.length === 0) return;
    const last = placed[placed.length - 1];
    setPlaced(p => p.slice(0, -1));
    setRemaining(r => [last.pieceId, ...r]);
    setSelectedIdx(0);
    setMoves(m => Math.max(0, m - 1));
    setWon(false);
  }, [placed]);

  const CELL = 64; // px per cell

  // Preview blocks for hover
  const previewBlocks = useCallback(() => {
    if (selectedIdx === null || !hoverCell) return [];
    const pieceId = remaining[selectedIdx];
    if (!pieceId) return [];
    const def = getPieceDef(pieceId);
    const blocks = normalizeBlocks(def.blocks, rot);
    const valid = canPlace(pieceId, hoverCell.col, hoverCell.row, rot, placed, level.cols, level.rows);
    return blocks.map(b => ({
      col: hoverCell.col + b.dx,
      row: hoverCell.row + b.dy,
      valid,
      color: getPieceDef(pieceId).color,
    }));
  }, [selectedIdx, hoverCell, remaining, rot, placed, level]);

  const preview = previewBlocks();
  const occupied = getOccupied(placed);

  const lv = level;
  const lvCfg = LEVELS.find(l => l.id === lv.id)!;

  return (
    <div style={{ minHeight: '100vh', background: '#050810', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 16px 32px', fontFamily: "'DM Sans', system-ui, sans-serif", color: '#e2e8f0', position: 'relative', overflowX: 'hidden' }}>

      {/* Bg orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: lvCfg.color, filter: 'blur(140px)', opacity: 0.06, top: -80, right: -80, transition: 'background 0.5s' }} />
        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: '#3b82f6', filter: 'blur(120px)', opacity: 0.05, bottom: -60, left: -60 }} />
      </div>

      {/* ── LANDING ── */}
      {screen === 'landing' && (
        <div style={{ width: '100%', maxWidth: 540, position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{ fontSize: '3.5rem', marginBottom: 8 }}>◈</div>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(3rem,10vw,5rem)', letterSpacing: 2, color: '#f5f1e8', lineHeight: 1, marginBottom: 8 }}>TILING</h1>
            <p style={{ color: 'rgba(245,241,232,0.5)', fontSize: '0.9rem', letterSpacing: 2, textTransform: 'uppercase' }}>Scaling Puzzle · 5 Levels</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
            {LEVELS.map(lv => (
              <button key={lv.id} onClick={() => startLevel(lv)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderRadius: 16, border: `0.5px solid ${lv.color}33`, background: `${lv.color}0d`, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s', color: '#f5f1e8' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: '1.5rem' }}>{lv.icon}</span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 700, color: lv.color, fontSize: '0.95rem' }}>{lv.label}</div>
                    <div style={{ fontSize: '0.78rem', color: 'rgba(245,241,232,0.5)', marginTop: 2 }}>{lv.desc}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  {bestScores[lv.id] ? (
                    <div style={{ fontSize: '0.72rem', color: lv.color, fontWeight: 700 }}>Best: {bestScores[lv.id]} moves</div>
                  ) : (
                    <div style={{ fontSize: '0.72rem', color: 'rgba(245,241,232,0.3)' }}>Not played</div>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '14px 18px', fontSize: '0.82rem', color: 'rgba(245,241,232,0.55)', lineHeight: 1.7 }}>
            <strong style={{ color: '#f5f1e8' }}>How to play:</strong> Select a piece from the tray → tap a grid cell to place it. Use Rotate to change orientation. Fill the entire grid to win.
          </div>
        </div>
      )}

      {/* ── GAME ── */}
      {screen === 'game' && (
        <div style={{ width: '100%', maxWidth: 600, position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: lvCfg.color, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 2 }}>{lv.label}</div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(245,241,232,0.5)' }}>{lv.desc}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '6px 14px' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fbbf24' }}>{moves}</div>
                <div style={{ fontSize: '0.6rem', color: 'rgba(245,241,232,0.4)', textTransform: 'uppercase', letterSpacing: 1 }}>Moves</div>
              </div>
              <button onClick={() => setScreen('landing')} style={{ background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '8px 12px', color: '#475569', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.8rem' }}>✕</button>
            </div>
          </div>

          {/* Grid */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${lv.cols}, ${CELL}px)`, gridTemplateRows: `repeat(${lv.rows}, ${CELL}px)`, gap: 3, background: 'rgba(255,255,255,0.04)', border: `1px solid ${lvCfg.color}22`, borderRadius: 16, padding: 12 }}>
              {Array.from({ length: lv.rows }, (_, row) =>
                Array.from({ length: lv.cols }, (_, col) => {
                  const key = `${col},${row}`;
                  const isOccupied = occupied.has(key);
                  const previewCell = preview.find(p => p.col === col && p.row === row);

                  // Find color of placed piece at this cell
                  let placedColor = '';
                  if (isOccupied) {
                    for (const p of placed) {
                      const def = getPieceDef(p.pieceId);
                      const blocks = normalizeBlocks(def.blocks, p.rot);
                      if (blocks.some(b => p.col + b.dx === col && p.row + b.dy === row)) {
                        placedColor = def.color;
                        break;
                      }
                    }
                  }

                  return (
                    <div key={key}
                      onClick={() => !isOccupied && handleCellTap(col, row)}
                      onMouseEnter={() => setHoverCell({ col, row })}
                      onMouseLeave={() => setHoverCell(null)}
                      style={{
                        width: CELL, height: CELL,
                        borderRadius: 8,
                        background: isOccupied
                          ? placedColor
                          : previewCell
                            ? previewCell.valid ? `${previewCell.color}66` : 'rgba(239,68,68,0.3)'
                            : 'rgba(255,255,255,0.03)',
                        border: isOccupied
                          ? `2px solid ${placedColor}88`
                          : previewCell
                            ? `2px solid ${previewCell.valid ? previewCell.color : '#ef4444'}`
                            : '1px solid rgba(255,255,255,0.06)',
                        cursor: isOccupied ? 'default' : 'pointer',
                        transition: 'all 0.12s',
                        boxShadow: isOccupied ? `0 0 12px ${placedColor}44` : 'none',
                      }}
                    />
                  );
                })
              )}
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, justifyContent: 'center' }}>
            <button onClick={() => setRot(r => (r + 1) % 4)}
              style={{ flex: 1, maxWidth: 140, padding: '11px', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: 12, background: 'rgba(255,255,255,0.05)', color: '#94a3b8', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.85rem' }}>
              ↻ Rotate
            </button>
            <button onClick={handleUndo} disabled={placed.length === 0}
              style={{ flex: 1, maxWidth: 140, padding: '11px', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: 12, background: 'rgba(255,255,255,0.05)', color: placed.length === 0 ? '#1e293b' : '#94a3b8', cursor: placed.length === 0 ? 'default' : 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.85rem' }}>
              ↩ Undo
            </button>
            <button onClick={() => startLevel(lv)}
              style={{ flex: 1, maxWidth: 140, padding: '11px', border: '0.5px solid rgba(239,68,68,0.3)', borderRadius: 12, background: 'rgba(239,68,68,0.08)', color: '#ef4444', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.85rem' }}>
              ↺ Reset
            </button>
          </div>

          {/* Piece Tray */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '14px' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(245,241,232,0.3)', marginBottom: 10 }}>
              Pieces ({remaining.length} remaining) — tap to select
            </div>
            {remaining.length === 0 && !won ? (
              <div style={{ textAlign: 'center', color: '#ef4444', fontSize: '0.85rem', padding: '8px 0' }}>No pieces left — grid not full. Use Undo.</div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {remaining.map((pieceId, idx) => {
                  const def = getPieceDef(pieceId);
                  const isSelected = selectedIdx === idx;
                  const blocks = normalizeBlocks(def.blocks, isSelected ? rot : 0);
                  const maxX = Math.max(...blocks.map(b => b.dx));
                  const maxY = Math.max(...blocks.map(b => b.dy));
                  const previewSize = 18;

                  return (
                    <button key={`${pieceId}-${idx}`} onClick={() => { setSelectedIdx(idx); setRot(0); }}
                      style={{ padding: '10px 12px', borderRadius: 12, border: `1.5px solid ${isSelected ? def.color : 'rgba(255,255,255,0.08)'}`, background: isSelected ? `${def.color}1a` : 'rgba(255,255,255,0.03)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, transition: 'all 0.15s', outline: 'none' }}>
                      {/* Mini piece preview */}
                      <div style={{ position: 'relative', width: (maxX + 1) * previewSize, height: (maxY + 1) * previewSize }}>
                        {blocks.map((b, bi) => (
                          <div key={bi} style={{ position: 'absolute', left: b.dx * previewSize, top: b.dy * previewSize, width: previewSize - 2, height: previewSize - 2, background: def.color, borderRadius: 3, opacity: isSelected ? 1 : 0.7 }} />
                        ))}
                      </div>
                      <div style={{ fontSize: '0.6rem', fontWeight: 700, color: isSelected ? def.color : 'rgba(245,241,232,0.4)', letterSpacing: 1 }}>{def.name}</div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Rotation indicator */}
          {selectedIdx !== null && (
            <div style={{ textAlign: 'center', marginTop: 10, fontSize: '0.72rem', color: 'rgba(245,241,232,0.3)', letterSpacing: 1 }}>
              Rotation: {rot * 90}° · Tap grid to place
            </div>
          )}
        </div>
      )}

      {/* ── WIN SCREEN ── */}
      {screen === 'win' && (
        <div style={{ width: '100%', maxWidth: 420, textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '5rem', marginBottom: 16 }}>{lvCfg.icon}</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '3rem', letterSpacing: 2, color: lvCfg.color, marginBottom: 8 }}>SOLVED!</h2>
          <p style={{ color: 'rgba(245,241,232,0.6)', marginBottom: 28, fontSize: '0.95rem' }}>{lv.label} — {lv.desc}</p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 28 }}>
            <div style={{ flex: 1, padding: 20, borderRadius: 16, background: `${lvCfg.color}1a`, border: `0.5px solid ${lvCfg.color}44` }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fbbf24', fontFamily: "'Bebas Neue', sans-serif" }}>{moves}</div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(245,241,232,0.5)', textTransform: 'uppercase', letterSpacing: 1 }}>Moves</div>
            </div>
            <div style={{ flex: 1, padding: 20, borderRadius: 16, background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: lvCfg.color, fontFamily: "'Bebas Neue', sans-serif" }}>{bestScores[lv.id] || moves}</div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(245,241,232,0.5)', textTransform: 'uppercase', letterSpacing: 1 }}>Best</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {lv.id < 5 && (
              <button onClick={() => startLevel(LEVELS[lv.id])}
                style={{ width: '100%', padding: '16px', border: 'none', borderRadius: 14, background: `linear-gradient(135deg, ${lvCfg.color}, ${LEVELS[lv.id].color})`, color: '#fff', fontSize: '1rem', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: 1 }}>
                Next Level →
              </button>
            )}
            <button onClick={() => startLevel(lv)}
              style={{ width: '100%', padding: '13px', border: `0.5px solid ${lvCfg.color}44`, borderRadius: 14, background: 'transparent', color: lvCfg.color, fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              ↺ Play Again
            </button>
            <button onClick={() => setScreen('landing')}
              style={{ width: '100%', padding: '13px', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 14, background: 'transparent', color: 'rgba(245,241,232,0.5)', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              ← All Levels
            </button>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button:active { transform: scale(0.97); }
      `}</style>
    </div>
  );
}