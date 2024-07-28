<script>
  import { formatDate } from '$lib/helpers'

  const REST_DURATION = 1000 * 60 * 0.1 // 2 minutes

  let now = $state(0) // updated every second to be Date.now()
  let startTime = $state(0) // timestamp the workout was started
  let restStartTime = $state(0) // timestamp this rest was started
  let segmentsComplete = $state(0) // how many sets (including warmup) have been completed
  let running = $state(false) // if the workout has been started
  let weight = $state(0) // total weight

  function start() {
    startTime = Date.now()
    restStartTime = Date.now()
    running = true
  }

  function reset() {
    segmentsComplete = 0
    running = false
    weight = 0
  }

  function completeSegment() {
    restStartTime = Date.now()
    segmentsComplete++
  }

  function getWeight() {
    const input = prompt('Enter weight:')
    if (input) {
      weight = +input
    }
  }

  $effect(() => {
    const interval = setInterval(() => {
      now = Date.now()
    })

    return () => clearInterval(interval)
  })

  const segments = $derived([
    weight / 2,
    (weight * 3) / 4,
    weight,
    weight,
    weight,
    weight,
    weight,
  ])

  const timeElapsed = $derived(now - startTime)
  const restTimeElapsed = $derived(now - restStartTime)
</script>

<h1>
  Lift{#if weight}{weight} lbs{/if}
</h1>

<p>
  {#each segments as segment, index}
    <span
      class:complete={running && index < segmentsComplete}
      class:rest={running &&
        index === segmentsComplete &&
        restTimeElapsed < REST_DURATION}
      class:go={running &&
        index === segmentsComplete &&
        (restTimeElapsed >= REST_DURATION || segmentsComplete === 0)}
      >{segment}</span
    >
  {/each}
</p>

<button onclick={completeSegment} disabled={!running}>Complete Set</button>

<p>Rest time: {running ? formatDate(restTimeElapsed) : '00:00'}</p>
<p>Total time: {running ? formatDate(timeElapsed) : '00:00'}</p>

<button onclick={getWeight}>Set Weight</button>
<button onclick={start} disabled={running || !weight}>Start</button>
<button onclick={reset} disabled={!running}>Reset</button>

<style>
  :root {
    font-family: Inter, sans-serif;
    font-feature-settings:
      'liga' 1,
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
