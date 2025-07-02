<script lang="ts">
  import { formatDate } from '$lib/helpers'

  function checkLocalStorage() {
    return typeof window !== 'undefined' && window.localStorage
  }

  function read(key: string) {
    if (checkLocalStorage()) {
      return window.localStorage.getItem(key)
    } else {
      return null
    }
  }

  function write(key: string, value: string | number) {
    if (checkLocalStorage()) {
      window.localStorage.setItem(key, value.toString());
    }
  }

  let now = $state<number>(0) // updated every second to be Date.now()
  let startTime = $state<number>(0) // timestamp the workout was started
  let restStartTime = $state<number>(0) // timestamp this rest was started
  let setsComplete = $state<number>(0) // how many sets (including warmup) have been completed
  let running = $state<boolean>(false) // if the workout has been started
  let weight = $state<number>(Number(read('weight')) || 0) // total weight
  let restDuration = $state<number>(Number(read('restDuration')) || 1000 * 60 * 2) // 2 minutes
  let sets = $state<string>(read('sets') || '.5 .75 1 1 1 1 1')

  function start() {
    startTime = Date.now()
    restStartTime = Date.now()
    running = true
  }

  function reset() {
    setsComplete = 0
    running = false
  }

  function completeSet() {
    restStartTime = Date.now()
    setsComplete++
  }

  function getWeight() {
    const input = prompt('Enter weight:', '' + weight)
    if (input) {
      weight = +input
      write('weight', weight)
    }
  }

  function getRest() {
    const input = prompt(
      'Enter rest duration (in minutes):',
      (restDuration / (1000 * 60)).toString(),
    )
    if (input) {
      restDuration = 1000 * 60 * +input
      write('restDuration', restDuration)
    }
  }

  function getSets() {
    const input = prompt(
      'Enter sets (in fractions of total weight, space-separated):',
      '' + sets,
    )
    if (input) {
      sets = input
      write('sets', sets)
    }
  }

  $effect(() => {
    const interval = setInterval(() => {
      now = Date.now()
    })

    return () => clearInterval(interval)
  })

  const derivedSets = $derived(sets.split(' ').map((item) => weight * +item))
  const timeElapsed = $derived(now - startTime)
  const restTimeElapsed = $derived(now - restStartTime)
</script>

<div class="app">
  <div class="container">
    <h1>Lift</h1>

    <div class="sets-container">
      {#each derivedSets as set, index}
        <span
          class="set"
          class:complete={running && index < setsComplete}
          class:rest={running &&
            index === setsComplete &&
            restTimeElapsed < restDuration}
          class:go={running &&
            index === setsComplete &&
            (restTimeElapsed >= restDuration || setsComplete === 0)}
        >
          {set}
        </span>
      {/each}
    </div>

    <div class="action-section">
      <button class="complete-btn" onclick={completeSet} disabled={!running}>
        Complete Set
      </button>
    </div>

    <div class="timer-section">
      <div class="timer-item">
        <span class="timer-label">Rest</span>
        <span class="timer-value">
          {running ? formatDate(restTimeElapsed) : '00:00'} / {formatDate(restDuration)}
        </span>
      </div>
      <div class="timer-item">
        <span class="timer-label">Total</span>
        <span class="timer-value">
          {running ? formatDate(timeElapsed) : '00:00'}
        </span>
      </div>
    </div>

    <div class="controls">
      <div class="control-group">
        <button class="control-btn" onclick={getWeight}>Set Weight</button>
        <button class="control-btn" onclick={getSets}>Set Sets</button>
        <button class="control-btn" onclick={getRest}>Set Rest</button>
      </div>
      <div class="control-group">
        <button class="primary-btn" onclick={start} disabled={running || !weight}>
          Start
        </button>
        <button class="secondary-btn" onclick={reset}>Reset</button>
      </div>
    </div>
  </div>
</div>

<style>
  :root {
    font-family: Inter, sans-serif;
    font-feature-settings:
      'liga' 1,
      'dlig' 1,
      'tnum' 1,
      'ss01' 1,
      'calt' 1;
  }
  
  @supports (font-variation-settings: normal) {
    :root {
      font-family: InterVariable, sans-serif;
    }
  }

  .app {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container {
    background: white;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
    min-height: 500px;
  }

  h1 {
    text-align: center;
    font-size: 3rem;
    font-weight: 700;
    color: #2d3748;
    margin: 0 0 2rem 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  .sets-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .set {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 3px solid #2d3748;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    font-size: 1.5rem;
    font-weight: 600;
    min-width: 80px;
    text-align: center;
    transition: all 0.3s ease;
    background: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .set.complete {
    background: linear-gradient(135deg, #1e3a8a, #3b82f6);
    color: white;
    border-color: #1e3a8a;
    transform: scale(0.95);
  }

  .set.rest {
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
    color: #92400e;
    border-color: #d97706;
    animation: pulse 2s infinite;
  }

  .set.go {
    background: linear-gradient(135deg, #059669, #10b981);
    color: white;
    border-color: #047857;
    animation: bounce 1s infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }

  .action-section {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .complete-btn {
    background: linear-gradient(135deg, #059669, #10b981);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-size: 1.25rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    min-width: 200px;
  }

  .complete-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
  }

  .complete-btn:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  .timer-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .timer-item {
    background: #f8fafc;
    padding: 1.5rem;
    border-radius: 12px;
    text-align: center;
    border: 2px solid #e2e8f0;
  }

  .timer-label {
    display: block;
    font-size: 1rem;
    font-weight: 600;
    color: #64748b;
    margin-bottom: 0.5rem;
  }

  .timer-value {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e293b;
    font-variant-numeric: tabular-nums;
  }

  .controls {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .control-group {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .control-btn, .primary-btn, .secondary-btn {
    flex: 1;
    min-width: 140px;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
  }

  .control-btn {
    background: #f1f5f9;
    color: #475569;
    border-color: #cbd5e1;
  }

  .control-btn:hover {
    background: #e2e8f0;
    transform: translateY(-1px);
  }

  .primary-btn {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  .primary-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
  }

  .primary-btn:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  .secondary-btn {
    background: #ef4444;
    color: white;
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  }

  .secondary-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(239, 68, 68, 0.4);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .app {
      padding: 0.5rem;
      align-items: stretch;
    }

    .container {
      border-radius: 0;
      padding: 1.5rem;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: 1.5rem;
    }

    .sets-container {
      gap: 0.25rem;
      margin-bottom: 1.5rem;
    }

    .set {
      padding: 0.75rem 1rem;
      font-size: 1.25rem;
      min-width: 70px;
    }

    .complete-btn {
      font-size: 1.125rem;
      padding: 0.875rem 1.5rem;
      min-width: 180px;
    }

    .timer-section {
      grid-template-columns: 1fr;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }

    .timer-item {
      padding: 1.25rem;
    }

    .timer-value {
      font-size: 1.25rem;
    }

    .control-group {
      flex-direction: column;
      gap: 0.5rem;
    }

    .control-btn, .primary-btn, .secondary-btn {
      min-width: unset;
      width: 100%;
      padding: 0.875rem 1rem;
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 1rem;
    }

    h1 {
      font-size: 2rem;
    }

    .sets-container {
      gap: 0.125rem;
    }

    .set {
      padding: 0.5rem 0.75rem;
      font-size: 1rem;
      min-width: 60px;
    }

    .timer-item {
      padding: 1rem;
    }

    .timer-label {
      font-size: 0.875rem;
    }

    .timer-value {
      font-size: 1.125rem;
    }
  }
</style>
