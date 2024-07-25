<script>
  import { formatDate } from '$lib/helpers'

  let startTime = $state(0)
  let segmentStartTime = $state(0)
  let totalElapsed = $state(0)
  let segmentElapsed = $state(0)
  let segmentsComplete = $state(0)
  let running = $state(false)
  let weight = $state(0)

  function start() {
    startTime = Date.now()
    segmentStartTime = startTime
    running = true
  }

  function stop() {
    startTime = 0
    totalElapsed = 0
    segmentElapsed = 0
    running = false
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
    if (!running) return
    const interval = setInterval(() => {
      totalElapsed = Date.now() - startTime
      segmentElapsed = Date.now() - segmentStartTime
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
  class:wait={running && segmentElapsed < 1000 * 60 * 2}
  class:go={running && segmentElapsed >= 1000 * 60 * 2}
>
  Lift {#if weight}{weight} lbs{/if}
</h1>

<p>
  {#each segments as segment, index}
    <span class:strike={index < segmentsComplete}>[{segment}]</span>
  {/each}
</p>

<p>Set time: {formatDate(segmentElapsed)}</p>
<p>Total time: {formatDate(totalElapsed)}</p>

<button onclick={getWeight}>Set Weight</button>

<button onclick={start} disabled={running || !weight}>Start</button>
<button onclick={stop} disabled={!running}>Stop</button>
<button onclick={completeSegment} disabled={!running}>Complete Set</button>

<style>
  span {
    margin-right: 10px;
  }

  span.strike {
    text-decoration: line-through;
  }

  h1.wait {
    color: darkblue;
  }

  h1.go {
    color: darkgreen;
  }
</style>
