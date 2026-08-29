"use client";

import { useEffect, useMemo, useState } from "react";
import {
  animals,
  difficultyIcons,
  difficultyLabels,
  difficultyOrder,
  difficultyTotals,
  type AnimalQuiz,
  type Difficulty,
} from "./animals";

type Screen = "home" | "quiz" | "result" | "book" | "medals";
type Star = 0 | 1 | 2 | 3;
type Progress = Record<string, Star>;
type Result = { animal: AnimalQuiz; correct: boolean; stars: Star };
type Filter = "all" | Difficulty;

const medalNames = [
  "どうぶつビギナー", "どうぶつだいすき", "どうぶつはかせ みならい", "どうぶつものしり", "どうぶつはかせ",
  "どうぶつたんけんか", "どうぶつけんきゅうか", "どうぶつスペシャリスト", "どうぶつエキスパート", "どうぶつマスター",
];

const animalImageSources = animals.map((animal) => `/animals/individual/${animal.imageKey}.webp`);
let animalSheetsLoadPromise: Promise<void> | null = null;

function preloadAnimalSheets(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (animalSheetsLoadPromise) return animalSheetsLoadPromise;

  animalSheetsLoadPromise = Promise.all(animalImageSources.map((source) => new Promise<void>((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      image.decode().catch(() => undefined).finally(resolve);
    };
    image.onerror = () => resolve();
    image.src = source;
  }))).then(() => undefined);

  return animalSheetsLoadPromise;
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function Stars({ count, large = false }: { count: Star; large?: boolean }) {
  return (
    <span className={large ? "stars stars-large" : "stars"} aria-label={`ほし ${count}こ`}>
      <span className={count >= 1 ? "star-on" : "star-off"}>★</span>
      <span className={count >= 2 ? "star-on" : "star-off"}>★</span>
      <span className={count >= 3 ? "star-on" : "star-off"}>★</span>
    </span>
  );
}

function AnimalArt({ animal, className = "", silhouette = false }: { animal: AnimalQuiz; className?: string; silhouette?: boolean }) {
  return (
    <span
      className={`animal-art ${silhouette ? "animal-silhouette" : ""} ${className}`}
      style={{
        backgroundImage: `url(/animals/individual/${animal.imageKey}.webp)`,
      }}
      role={silhouette ? undefined : "img"}
      aria-label={silhouette ? undefined : animal.name}
      aria-hidden={silhouette ? true : undefined}
    />
  );
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [progress, setProgress] = useState<Progress>({});
  const [current, setCurrent] = useState<AnimalQuiz | null>(null);
  const [choices, setChoices] = useState<string[]>([]);
  const [attempt, setAttempt] = useState<1 | 2 | 3>(1);
  const [wrongChoice, setWrongChoice] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalQuiz | null>(null);
  const [newMedal, setNewMedal] = useState<number | null>(null);
  const [pendingMedal, setPendingMedal] = useState<number | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [animalArtReady, setAnimalArtReady] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = window.localStorage.getItem("animal-quiz-progress-v1");
        if (saved) setProgress(JSON.parse(saved) as Progress);
      } catch {}
      setReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem("animal-quiz-progress-v1", JSON.stringify(progress));
  }, [progress, ready]);

  useEffect(() => {
    let active = true;
    void preloadAnimalSheets().then(() => {
      if (active) setAnimalArtReady(true);
    });
    return () => { active = false; };
  }, []);

  const discoveredCount = useMemo(() => animals.filter((animal) => (progress[animal.id] ?? 0) > 0).length, [progress]);
  const totalStars = useMemo(() => Object.values(progress).reduce<number>((sum, value) => sum + value, 0), [progress]);

  const countsByDifficulty = useMemo(() => {
    const output: Record<Difficulty, number> = { easy: 0, normal: 0, medium: 0, hard: 0 };
    animals.forEach((animal) => { if ((progress[animal.id] ?? 0) > 0) output[animal.difficulty] += 1; });
    return output;
  }, [progress]);

  const pickQuestion = () => {
    const pool = animals.filter((animal) => animal.id !== current?.id);
    const next = pool[Math.floor(Math.random() * pool.length)] ?? animals[0];
    setCurrent(next);
    setChoices(shuffle(next.choices));
    setAttempt(1);
    setWrongChoice(null);
    setResult(null);
    setPendingMedal(null);
    setScreen("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const answerQuestion = (answer: string) => {
    if (!current) return;
    if (answer === current.answer) {
      const stars: Star = attempt === 1 ? 3 : attempt === 2 ? 2 : 1;
      const oldStars = progress[current.id] ?? 0;
      const wasNew = oldStars === 0;
      const nextStars = Math.max(oldStars, stars) as Star;
      if (nextStars !== oldStars) setProgress((old) => ({ ...old, [current.id]: nextStars }));
      if (wasNew) {
        const nextCount = discoveredCount + 1;
        setPendingMedal(nextCount % 10 === 0 ? nextCount / 10 : null);
      } else {
        setPendingMedal(null);
      }
      setResult({ animal: current, correct: true, stars });
      setScreen("result");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (attempt < 3) {
      setWrongChoice(answer);
      setAttempt((attempt + 1) as 2 | 3);
      window.setTimeout(() => setWrongChoice(null), 650);
      return;
    }
    setResult({ animal: current, correct: false, stars: 0 });
    setScreen("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const continueFromResult = () => {
    if (pendingMedal !== null) {
      setNewMedal(pendingMedal);
      setPendingMedal(null);
      return;
    }
    pickQuestion();
  };

  const openBook = () => { setSelectedAnimal(null); setScreen("book"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const goHome = () => { setSelectedAnimal(null); setScreen("home"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const resetProgress = () => {
    window.localStorage.removeItem("animal-quiz-progress-v1");
    setProgress({});
    setNewMedal(null);
    setPendingMedal(null);
    setSelectedAnimal(null);
    setResult(null);
    setShowResetConfirm(false);
  };

  return (
    <main className={`app screen-${screen}`}>
      <div className="sky-decor" aria-hidden="true"><span>☁️</span><span>☁️</span><span>☁️</span></div>

      {screen !== "home" && (
        <header className="topbar">
          <button className="icon-button" onClick={goHome} aria-label="おうちへ もどる">⌂</button>
          <button className="mini-brand" onClick={goHome}>どうぶつクイズ</button>
          <div className="top-stats" aria-label={`はっけん ${discoveredCount}、ほし ${totalStars}`}><span>🐾 {discoveredCount}</span><span>⭐ {totalStars}</span></div>
        </header>
      )}

      {screen === "home" && (
        <section className="home-screen">
          <div className="home-badge">あそんで おぼえる！</div>
          <h1><span>どうぶつ</span><strong>クイズ</strong></h1>
          <p className="home-lead">ヒントを よんで<br className="mobile-only" /> どうぶつを あてよう！</p>
          <div className="animal-parade" aria-hidden="true">
            <AnimalArt animal={animals[2]} className="parade-edge-left" /><AnimalArt animal={animals[1]} /><AnimalArt animal={animals[0]} className="parade-main" /><AnimalArt animal={animals[4]} /><AnimalArt animal={animals[40]} />
          </div>
          <button className="primary-button start-button" onClick={pickQuestion}><span className="play-icon">▶</span> クイズを はじめる</button>
          <div className="home-actions">
            <button className="menu-card book-card" onClick={openBook}><span className="menu-icon">📖</span><span><strong>どうぶつずかん</strong><small>{discoveredCount} / 100 みつけたよ</small></span><span className="menu-arrow">›</span></button>
            <button className="menu-card medal-card" onClick={() => setScreen("medals")}><span className="menu-icon">🏅</span><span><strong>メダル</strong><small>{Math.floor(discoveredCount / 10)} / 10 ゲット</small></span><span className="menu-arrow">›</span></button>
          </div>
          <div className="home-score"><span>あつめた ほし</span><strong>⭐ {totalStars}</strong><span>/ 300</span></div>
          <p className="save-note">この たんまつに きろくが のこるよ</p>
          <button className="reset-link" onClick={() => setShowResetConfirm(true)} disabled={discoveredCount === 0 && totalStars === 0}>↻ きろくを リセット</button>
        </section>
      )}

      {screen === "quiz" && current && (
        <section className="game-shell quiz-screen">
          <div className={`difficulty-pill ${current.difficulty}`}>{difficultyIcons[current.difficulty]} {difficultyLabels[current.difficulty]}</div>
          <div className="question-number">この どうぶつは だ〜れ？</div>
          <div className="hint-card">
            <div className="hint-title"><span>💡</span> 3つの ヒント</div>
            <ol>{current.hints.map((hint, index) => <li key={hint}><span>{index + 1}</span><p>{hint}</p></li>)}</ol>
            {attempt >= 2 && (
              <div className="extra-hints" role="status">
                <div className="special-hint extra-hint-one">
                  <div className="special-hint-title"><span aria-hidden="true">💡</span><b>もうひとつ ヒント！</b></div>
                  <strong>{current.extraHint}</strong>
                </div>
                {attempt === 3 && (
                  <div className="special-hint extra-hint-two">
                    <div className="special-hint-title"><span aria-hidden="true">🔍</span><b>さいごの ヒント！</b></div>
                    <strong>「{current.initial}」から はじまる どうぶつだよ！</strong>
                  </div>
                )}
              </div>
            )}
          </div>
          <p className="choose-label">こたえを えらんでね</p>
          <div className="choice-grid">
            {choices.map((choice, index) => (
              <button key={choice} className={`choice-button choice-${index + 1} ${wrongChoice === choice ? "choice-wrong" : ""}`} onClick={() => answerQuestion(choice)}>
                <span className="choice-mark">{["A", "B", "C", "D"][index]}</span>{choice}
              </button>
            ))}
          </div>
          {attempt > 1 && <p className="try-again">{attempt === 2 ? "ヒントを よんで、もう いちど！" : "さいごの チャレンジ！ ゆっくり かんがえよう"}</p>}
        </section>
      )}

      {screen === "result" && result && (
        <section className={`game-shell result-screen ${result.correct ? "is-correct" : "is-wrong"}`}>
          <div className="result-burst" aria-hidden="true">{result.correct ? "✨" : "☁️"}</div>
          <p className="result-kicker">{result.correct ? "やったね！" : "おしかったね！"}</p>
          <h2>{result.correct ? "せいかい！" : "ざんねん！"}</h2>
          <div className="result-animal"><div className="animal-glow"></div><AnimalArt animal={result.animal} /></div>
          <p className="answer-caption">この どうぶつは…</p><h3>{result.animal.name}</h3>
          {result.correct ? <Stars count={result.stars} large /> : <p className="no-star">つぎは きっと わかるよ！</p>}
          <div className="fact-card"><span>🌱</span><div><strong>どうぶつ まめちしき</strong><p>{result.animal.fact}</p></div></div>
          <button className="primary-button next-button" onClick={continueFromResult}>つぎの もんだい <span>›</span></button>
          <button className="secondary-button" onClick={openBook}>📖 ずかんを みる</button>
        </section>
      )}

      {screen === "book" && (
        <section className="collection-screen">
          <div className="section-heading"><span className="heading-icon">📖</span><div><h2>どうぶつずかん</h2><p>みつけた どうぶつを みてみよう！</p></div></div>
          <div className="progress-card">
            <div className="progress-main"><span>みつけた どうぶつ</span><strong>{discoveredCount}<small> / 100</small></strong></div>
            <div className="progress-track"><span style={{ width: `${discoveredCount}%` }} /></div>
            <div className="difficulty-progress">
              {difficultyOrder.map((difficulty) => <span key={difficulty}>{difficultyIcons[difficulty]} {countsByDifficulty[difficulty]}/{difficultyTotals[difficulty]}</span>)}
            </div>
          </div>
          <div className="filters" aria-label="なんいどで しぼりこむ">
            {(["all", ...difficultyOrder] as Filter[]).map((value) => (
              <button key={value} className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>
                {value === "all" ? "ぜんぶ" : `${difficultyIcons[value]} ${difficultyLabels[value]}`}
              </button>
            ))}
          </div>
          {animalArtReady ? (
            <div className="animal-grid">
              {animals.filter((animal) => filter === "all" || animal.difficulty === filter).map((animal) => {
                const star = progress[animal.id] ?? 0;
                const found = star > 0;
                return (
                  <button className={`animal-card ${found ? "found" : "unknown"}`} key={animal.id} onClick={() => found && setSelectedAnimal(animal)} aria-label={found ? animal.name : "まだ みつけていない どうぶつ"}>
                    <span className="animal-card-difficulty">{difficultyIcons[animal.difficulty]}</span>
                    <span className="animal-card-image">{found ? <AnimalArt animal={animal} /> : <AnimalArt animal={animal} silhouette />}</span>
                    <strong>{found ? animal.name : "？？？"}</strong>
                    {found ? <Stars count={star} /> : <span className="lock">🔒</span>}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="book-loading" role="status" aria-live="polite"><span>🐾</span><strong>ずかんを じゅんびちゅう…</strong></div>
          )}
        </section>
      )}

      {screen === "medals" && (
        <section className="collection-screen medals-screen">
          <div className="section-heading"><span className="heading-icon">🏅</span><div><h2>メダル</h2><p>どうぶつを みつけて メダルを あつめよう！</p></div></div>
          <div className="medal-summary"><strong>{Math.floor(discoveredCount / 10)}</strong><span> / 10 ゲット！</span></div>
          <div className="medal-grid">
            {medalNames.map((name, index) => {
              const target = (index + 1) * 10;
              const unlocked = discoveredCount >= target;
              return (
                <article className={`medal-item ${unlocked ? "unlocked" : "locked"}`} key={name}>
                  <div className="medal-art"><span>{index === 9 ? "👑" : index === 4 ? "🏆" : "🏅"}</span></div>
                  <div><small>{target}ぴき たっせい</small><strong>{unlocked ? name : "？？？？？"}</strong></div>
                  <span className="medal-state">{unlocked ? "ゲット！" : `あと ${target - discoveredCount}ぴき`}</span>
                </article>
              );
            })}
          </div>
          <button className="primary-button medals-play" onClick={pickQuestion}>クイズで どうぶつを みつける</button>
        </section>
      )}

      {selectedAnimal && (
        <div className="modal-backdrop" role="presentation" onClick={() => setSelectedAnimal(null)}>
          <article className="animal-modal" role="dialog" aria-modal="true" aria-label={`${selectedAnimal.name}の ずかん`} onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedAnimal(null)} aria-label="とじる">×</button>
            <div className={`difficulty-pill ${selectedAnimal.difficulty}`}>{difficultyIcons[selectedAnimal.difficulty]} {difficultyLabels[selectedAnimal.difficulty]}</div>
            <AnimalArt animal={selectedAnimal} className="modal-animal" />
            <h2>{selectedAnimal.name}</h2><Stars count={progress[selectedAnimal.id] ?? 0} large />
            <div className="fact-card"><span>🌱</span><div><strong>どうぶつ まめちしき</strong><p>{selectedAnimal.fact}</p></div></div>
            <button className="primary-button" onClick={() => setSelectedAnimal(null)}>ずかんに もどる</button>
          </article>
        </div>
      )}

      {newMedal !== null && (
        <div className={`modal-backdrop celebration ${newMedal === 5 ? "celebration-50" : ""} ${newMedal === 10 ? "celebration-100" : ""}`}>
          <div className="confetti" aria-hidden="true">🎊 ✨ 🎉 ⭐ 🎊</div>
          <article className="medal-popup" role="dialog" aria-modal="true" aria-label="あたらしい メダル">
            <p>{newMedal === 10 ? "おめでとう！" : newMedal === 5 ? "すごい！" : "あたらしい メダルを ゲット！"}</p>
            <div className="big-medal">{newMedal === 10 ? "👑" : newMedal === 5 ? "🏆" : "🏅"}</div>
            <h2>{medalNames[newMedal - 1]}</h2><span>{newMedal * 10}ぴきの どうぶつを みつけたよ！</span>
            {newMedal === 10 && <div className="complete-animals" aria-hidden="true"><AnimalArt animal={animals[0]} /><AnimalArt animal={animals[1]} /><AnimalArt animal={animals[2]} /><AnimalArt animal={animals[4]} /><AnimalArt animal={animals[40]} /></div>}
            <button className="primary-button" onClick={() => { setNewMedal(null); pickQuestion(); }}>やったー！</button>
          </article>
        </div>
      )}

      {showResetConfirm && (
        <div className="modal-backdrop reset-backdrop" role="presentation" onClick={() => setShowResetConfirm(false)}>
          <article className="reset-modal" role="dialog" aria-modal="true" aria-labelledby="reset-title" onClick={(event) => event.stopPropagation()}>
            <div className="reset-icon" aria-hidden="true">🗑️</div>
            <h2 id="reset-title">きろくを リセットする？</h2>
            <p>ずかん・ほし・メダルが<br /><strong>ぜんぶ 0に もどるよ。</strong></p>
            <p className="reset-warning">もとには もどせません</p>
            <div className="reset-actions">
              <button className="reset-cancel" onClick={() => setShowResetConfirm(false)}>やめる</button>
              <button className="reset-confirm" onClick={resetProgress}>ぜんぶ けす</button>
            </div>
          </article>
        </div>
      )}

      <footer className="grass-footer" aria-hidden="true"><span>🌿</span><span>🌼</span><span>🌿</span><span>🌷</span><span>🌿</span></footer>
    </main>
  );
}
