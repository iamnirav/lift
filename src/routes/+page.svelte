<script>
  import { formatDate } from '$lib/helpers'

  const REST_DURATION = 1000 * 60 * 0.1 // 2 minutes

  let now = $state(0) // updated every second to be Date.now()
  let startTime = $state(0) // timestamp the workout was started
  let segmentStartTime = $state(0) // timestamp this segment was started
  let segmentsComplete = $state(0) // how many sets (including warmup) have been completed
  let running = $state(false) // if the workout has been started
  let weight = $state(0) // total weight

  function start() {
    startTime = Date.now()
    segmentStartTime = Date.now()
    running = true
  }

  function reset() {
    segmentsComplete = 0
    running = false
    weight = 0
  }

  function completeSegment() {
    segmentStartTime = Date.now()
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
</script>

<h1
  class:wait={running && now - segmentStartTime < REST_DURATION}
  class:go={running &&
    (now - segmentStartTime >= REST_DURATION || segmentsComplete === 0)}
>
  Lift {#if weight}{weight} lbs{/if}
</h1>

<p>
  {#each segments as segment, index}
    <span
      class:complete={running && index < segmentsComplete}
      class:current={running && index === segmentsComplete}>{segment}</span
    >
  {/each}
</p>

<p>Rest time: {running ? formatDate(now - segmentStartTime) : '00:00'}</p>
<p>Total time: {running ? formatDate(now - startTime) : '00:00'}</p>

<button onclick={getWeight}>Set Weight</button>

<button onclick={start} disabled={running || !weight}>Start</button>
<button onclick={reset} disabled={!running}>Reset</button>
<button onclick={completeSegment} disabled={!running}>Complete Set</button>

<style>
  span {
    margin-right: 10px;
    display: inline-block;
    border: 1px solid black;
    padding: 5px 10px;
  }

  span.complete {
    background-color: darkblue;
    color: white;
  }

  span.current {
    background-color: darkgreen;
    color: white;
  }

  h1.wait {
    color: darkblue;
  }

  h1.go {
    background-color: darkgreen;
    color: white;
  }
</style>
