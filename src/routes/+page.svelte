<script>
  import { formatDate } from '$lib/helpers'

  let now = $state(0) // updated every second to be Date.now()
  let startTime = $state(0) // timestamp the workout was started
  let restStartTime = $state(0) // timestamp this rest was started
  let setsComplete = $state(0) // how many sets (including warmup) have been completed
  let running = $state(false) // if the workout has been started
  let weight = $state(0) // total weight
  let restDuration = $state(1000 * 60 * 2) // 2 minutes
  let sets = $state('.5 .75 1 1 1 1 1')

  function start() {
    startTime = Date.now()
    restStartTime = Date.now()
    running = true
  }

  function reset() {
    setsComplete = 0
    running = false
    weight = 0
    restDuration = 1000 * 60 * 2
  }

  function completeSet() {
    restStartTime = Date.now()
    setsComplete++
  }

  function getWeight() {
    const input = prompt('Enter weight:', '' + weight)
    if (input) {
      weight = +input
    }
  }

  function getRest() {
    const input = prompt(
      'Enter rest duration (in minutes):',
      '' + restDuration / (1000 * 60),
    )
    if (input) {
      restDuration = 1000 * 60 * +input
    }
  }

  function getSets() {
    const input = prompt(
      'Enter sets (in fractions of total weight, space-separated):',
      '' + sets,
    )
    if (input) {
      sets = input
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

<h1>Lift</h1>

<p>
  {#each derivedSets as set, index}
    <span
      class:complete={running && index < setsComplete}
      class:rest={running &&
        index === setsComplete &&
        restTimeElapsed < restDuration}
      class:go={running &&
        index === setsComplete &&
        (restTimeElapsed >= restDuration || setsComplete === 0)}>{set}</span
    >
  {/each}
</p>

<button onclick={completeSet} disabled={!running}>Complete Set</button>

<p>
  Rest time: {running ? formatDate(restTimeElapsed) : '00:00'} / {formatDate(
    restDuration,
  )}
</p>
<p>Total time: {running ? formatDate(timeElapsed) : '00:00'}</p>

<button onclick={getWeight}>Set Weight</button>
<button onclick={getSets}>Set Sets</button>
<button onclick={getRest}>Set Rest</button>
<button onclick={start} disabled={running || !weight}>Start</button>
<button onclick={reset}>Reset</button>

<style>
  :root {
    font-family: Inter, sans-serif;
    font-feature-settings:
      'liga' 1,
      'dlig' 1,
      'tnum' 1,
      'ss01' 1,
      'calt' 1; /* fix for Chrome */
  }
  @supports (font-variation-settings: normal) {
    :root {
      font-family: InterVariable, sans-serif;
    }
  }

  span {
    display: inline-block;
    border: 1px solid black;
    padding: 5px 10px;
    border-right-width: 0;

    &:first-child {
      border-radius: 2px 0 0 2px;
    }

    &:last-child {
      border-right-width: 1px;
      border-radius: 0 2px 2px 0;
    }
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
</style>
