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
    <h1>Lift <span class="test-badge">🧪 Test Deploy</span></h1>

    <p class="sets">
      {#each derivedSets as set, index}
        <span
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
    </p>

    <button onclick={completeSet} disabled={!running}>Complete Set</button>

    <p>
      Rest: {running ? formatDate(restTimeElapsed) : '00:00'} / {formatDate(restDuration)}
    </p>
    <p>Total: {running ? formatDate(timeElapsed) : '00:00'}</p>

    <div class="controls">
      <button onclick={getWeight}>Set Weight</button>
      <button onclick={getSets}>Set Sets</button>
      <button onclick={getRest}>Set Rest</button>
      <button onclick={start} disabled={running || !weight}>Start</button>
      <button onclick={reset}>Reset</button>
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
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .container {
    max-width: 600px;
    width: 100%;
    text-align: center;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  .sets {
    margin-bottom: 2rem;
  }

  span {
    display: inline-block;
    border: 1px solid black;
    padding: 10px 15px;
    border-right-width: 0;
    font-size: 1.2rem;
    font-weight: 500;
  }

  span:first-child {
    border-radius: 4px 0 0 4px;
  }

  span:last-child {
    border-right-width: 1px;
    border-radius: 0 4px 4px 0;
  }

  span.complete {
    background-color: darkblue;
    color: white;
  }

  span.rest {
    background-color: yellow;
  }

  span.go {
    background-color: darkgreen;
    color: white;
  }

  button {
    padding: 10px 20px;
    margin: 5px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
    cursor: pointer;
  }

  button:hover:not(:disabled) {
    background-color: #f0f0f0;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  p {
    font-size: 1.1rem;
    margin: 1rem 0;
  }

  .controls {
    margin-top: 2rem;
  }

  .test-badge {
    font-size: 0.6em;
    background-color: #007acc;
    color: white;
    padding: 4px 8px;
    border-radius: 12px;
    font-weight: normal;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .app {
      padding: 0.5rem;
    }

    h1 {
      font-size: 2rem;
    }

    span {
      padding: 8px 12px;
      font-size: 1rem;
    }

    button {
      padding: 8px 15px;
      font-size: 0.9rem;
      display: block;
      width: 100%;
      margin: 5px 0;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 1.5rem;
    }

    span {
      padding: 6px 10px;
      font-size: 0.9rem;
    }
  }
</style>
