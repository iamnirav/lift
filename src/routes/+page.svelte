<script>
  import { formatDate } from '$lib/helpers'

  const SEGMENT_DURATION = 1000 * 60 * 2 // 2 minutes

  let startTime = $state(0)
  let segmentStartTime = $state(0)
  let totalElapsed = $state(0)
  let segmentElapsed = $state(0)
  let segmentsComplete = $state(0)
  let running = $state(false)
  let weight = $state(0)

  function start() {
    startTime = Date.now()
    running = true
  }

  function reset() {
    startTime = 0
    totalElapsed = 0
    segmentElapsed = 0
    segmentsComplete = 0
    running = false
    weight = 0
  }

  function completeSegment() {
    segmentStartTime = Date.now()
    segmentsComplete++
    console.log(segmentStartTime, segmentsComplete)
  }

  function getWeight() {
    const input = prompt('Enter weight:')
    if (input) {
      weight = +input
    }
  }

  $effect(() => {
    if (!running) return
    const interval = setInterval(() => {
      totalElapsed = Date.now() - startTime
      if (segmentsComplete >= 1) {
        segmentElapsed = Date.now() - segmentStartTime
      }
    }, 1000)

    return () => {
      // if a callback is provided, it will run
      // a) immediately before the effect re-runs
      // b) when the component is destroyed
      clearInterval(interval)
    }
  })

  const segments = $derived.by(() => [
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
  class:wait={running && segmentElapsed < SEGMENT_DURATION}
  class:go={running &&
    (segmentElapsed >= SEGMENT_DURATION || segmentsComplete === 0)}
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

<p>Rest time: {formatDate(segmentElapsed)}</p>
<p>Total time: {formatDate(totalElapsed)}</p>

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
