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
  
  // Workout completion tracking
  let showCompletionModal = $state<boolean>(false)
  let workoutName = $state<string>('')
  let workoutRating = $state<'good' | 'bad' | 'medium' | null>(null)
  let showHistory = $state<boolean>(false)
  let workoutHistory = $state<any[]>([])

  // Load workout history on component mount
  $effect(() => {
    const history = read('workoutHistory')
    if (history) {
      try {
        workoutHistory = JSON.parse(history)
      } catch (e) {
        workoutHistory = []
      }
    }
  })

  function start() {
    startTime = Date.now()
    restStartTime = Date.now()
    running = true
  }

  function reset() {
    setsComplete = 0
    running = false
    showCompletionModal = false
    workoutName = ''
    workoutRating = null
  }

  function completeSet() {
    restStartTime = Date.now()
    setsComplete++
    
    // Check if workout is complete
    if (setsComplete >= derivedSets.length) {
      showCompletionModal = true
    }
  }

  function saveWorkout() {
    if (!workoutName.trim() || !workoutRating) {
      alert('Please provide a workout name and rating')
      return
    }

    const workoutData = {
      id: Date.now(),
      name: workoutName.trim(),
      rating: workoutRating,
      weight: weight,
      sets: sets,
      derivedSets: derivedSets,
      totalTime: timeElapsed,
      date: new Date().toISOString(),
      setsComplete: setsComplete
    }

    // Add to history
    const newHistory = [workoutData, ...workoutHistory]
    workoutHistory = newHistory
    write('workoutHistory', JSON.stringify(newHistory))

    // Reset for next workout
    reset()
  }

  function cancelWorkout() {
    reset()
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

  function clearHistory() {
    if (confirm('Are you sure you want to clear all workout history?')) {
      workoutHistory = []
      write('workoutHistory', JSON.stringify([]))
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
      <button onclick={() => showHistory = !showHistory}>History</button>
    </div>
  </div>

  <!-- Workout Completion Modal -->
  {#if showCompletionModal}
    <div 
      class="modal-overlay" 
      onclick={cancelWorkout}
      onkeydown={(e) => e.key === 'Escape' && cancelWorkout()}
      role="dialog"
      aria-modal="true"
      tabindex="-1"
    >
      <div class="modal" onclick={(e) => e.stopPropagation()}>
        <h2>Workout Complete!</h2>
        <p>Great job! Please provide some feedback about your workout.</p>
        
        <div class="form-group">
          <label for="workout-name">Workout Name:</label>
          <input 
            id="workout-name"
            type="text" 
            bind:value={workoutName} 
            placeholder="e.g., Bench Press, Squats, etc."
            onkeydown={(e) => e.key === 'Enter' && saveWorkout()}
          />
        </div>
        
        <div class="form-group">
          <fieldset>
            <legend>How was this workout?</legend>
            <div class="rating-buttons">
            <button 
              class:selected={workoutRating === 'bad'}
              onclick={() => workoutRating = 'bad'}
            >
              😞 Bad
            </button>
            <button 
              class:selected={workoutRating === 'medium'}
              onclick={() => workoutRating = 'medium'}
            >
              😐 Medium
            </button>
            <button 
              class:selected={workoutRating === 'good'}
              onclick={() => workoutRating = 'good'}
            >
              😊 Good
            </button>
          </div>
        </div>
        
        <div class="modal-actions">
          <button onclick={cancelWorkout}>Cancel</button>
          <button onclick={saveWorkout} disabled={!workoutName.trim() || !workoutRating}>
            Save Workout
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Workout History -->
  {#if showHistory}
    <div class="modal-overlay" onclick={() => showHistory = false}>
      <div class="history-modal" onclick={(e) => e.stopPropagation()}>
        <div class="history-header">
          <h2>Workout History</h2>
          <button onclick={() => showHistory = false} class="close-btn">×</button>
        </div>
        
        {#if workoutHistory.length === 0}
          <p class="no-history">No workout history yet. Complete your first workout to see it here!</p>
        {:else}
          <div class="history-list">
            {#each workoutHistory as workout}
              <div class="history-item">
                <div class="history-item-header">
                  <h3>{workout.name}</h3>
                  <span class="rating-badge rating-{workout.rating}">
                    {workout.rating === 'good' ? '😊' : workout.rating === 'medium' ? '😐' : '😞'}
                  </span>
                </div>
                <div class="history-item-details">
                  <p><strong>Weight:</strong> {workout.weight} lbs</p>
                  <p><strong>Sets:</strong> {workout.sets}</p>
                  <p><strong>Duration:</strong> {formatDate(workout.totalTime)}</p>
                  <p><strong>Date:</strong> {new Date(workout.date).toLocaleDateString()}</p>
                </div>
              </div>
            {/each}
          </div>
          <div class="history-actions">
            <button onclick={clearHistory} class="clear-btn">Clear History</button>
          </div>
        {/if}
      </div>
    </div>
  {/if}
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

  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
  }

  .modal {
    background: white;
    border-radius: 8px;
    padding: 2rem;
    max-width: 500px;
    width: 100%;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }

  .modal h2 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #333;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
  }

  .form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    box-sizing: border-box;
  }

  .form-group input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  .rating-buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .rating-buttons button {
    flex: 1;
    min-width: 80px;
    padding: 0.75rem;
    border: 2px solid #ddd;
    background: white;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .rating-buttons button:hover {
    border-color: #007bff;
  }

  .rating-buttons button.selected {
    border-color: #007bff;
    background-color: #007bff;
    color: white;
  }

  .modal-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 2rem;
  }

  .modal-actions button {
    padding: 0.75rem 1.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .modal-actions button:hover:not(:disabled) {
    background-color: #f8f9fa;
  }

  .modal-actions button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* History Modal Styles */
  .history-modal {
    background: white;
    border-radius: 8px;
    max-width: 800px;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }

  .history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid #eee;
    position: sticky;
    top: 0;
    background: white;
    z-index: 1;
  }

  .history-header h2 {
    margin: 0;
    color: #333;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    transition: background-color 0.2s;
  }

  .close-btn:hover {
    background-color: #f8f9fa;
  }

  .no-history {
    padding: 2rem;
    text-align: center;
    color: #666;
    font-style: italic;
  }

  .history-list {
    padding: 0 2rem;
  }

  .history-item {
    border: 1px solid #eee;
    border-radius: 6px;
    margin-bottom: 1rem;
    overflow: hidden;
  }

  .history-item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #f8f9fa;
    border-bottom: 1px solid #eee;
  }

  .history-item-header h3 {
    margin: 0;
    color: #333;
  }

  .rating-badge {
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .rating-good {
    background-color: #d4edda;
    color: #155724;
  }

  .rating-medium {
    background-color: #fff3cd;
    color: #856404;
  }

  .rating-bad {
    background-color: #f8d7da;
    color: #721c24;
  }

  .history-item-details {
    padding: 1rem;
  }

  .history-item-details p {
    margin: 0.5rem 0;
    color: #666;
  }

  .history-actions {
    padding: 1.5rem 2rem;
    border-top: 1px solid #eee;
    text-align: center;
  }

  .clear-btn {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .clear-btn:hover {
    background-color: #c82333;
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

    .modal {
      margin: 1rem;
      padding: 1.5rem;
    }

    .history-modal {
      margin: 1rem;
      max-height: 90vh;
    }

    .history-header {
      padding: 1rem 1.5rem;
    }

    .history-list {
      padding: 0 1.5rem;
    }

    .history-actions {
      padding: 1rem 1.5rem;
    }

    .rating-buttons {
      flex-direction: column;
    }

    .rating-buttons button {
      min-width: auto;
    }

    .modal-actions {
      flex-direction: column;
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

    .modal {
      padding: 1rem;
    }

    .history-modal {
      margin: 0.5rem;
    }

    .history-header {
      padding: 0.75rem 1rem;
    }

    .history-list {
      padding: 0 1rem;
    }

    .history-actions {
      padding: 0.75rem 1rem;
    }
  }
</style>
