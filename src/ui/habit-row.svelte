<script>
  export let key, name, setName, color, setColor, toggleDay, days, month, year;
</script>

<style>
  input {
    border: 1px solid #777;
    border-right: 0;
    border-radius: 0;
    margin: 0;
    padding: 0;
  }

  input:focus {
    outline: 2px dotted var(--habit-color);
  }

  input[type='color'] {
    width: 1.3rem;
    height: 1.3rem;
  }

  input[type='text'] {
    color: var(--habit-color);
    font-weight: bold;
    font-size: 0.9em;
    width: 15em;
    padding: 0 0.2em;
    height: 1.3rem;
  }

  input[type='checkbox'] {
    -webkit-appearance: none;
    appearance: none;
    position: relative;
    width: 1.3rem;
    height: 1.3rem;
    display: flex;
  }
  input[type='checkbox']:checked {
    background-color: var(--habit-color);
  }
  input[type='checkbox']:before {
    display: block;
    content: attr(data-day);
    font-size: 0.8em;
    display: grid;
    justify-items: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  input[type='checkbox']:checked:before {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    content: '✔️';
    color: white !important;
    font-size: 1em;
  }

  input[type='checkbox']:disabled {
    background: #efefef;
  }

  .row {
    width: auto;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    margin: 0;
    border-right: 1px solid #777;
    margin-bottom: 0.25em;
  }

  .checkboxes {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>

<div class="list" style="--habit-color: {color}">
  <div class="row">
    <label class="hidden" for={`name-${key}`}>Nome do hábito:</label>
    <input
      id={`name-${key}`}
      type="text"
      placeholder="What is your next new habit?"
      value={name}
      on:input={setName} />
    <div class="checkboxes">
      {#each days as value, day}
        <label class="hidden" for={`${day}-${key}`}>
          {name} - {day}/{month}/{year}
        </label>
        <input
          data-day={day + 1}
          id={`${day}-${key}`}
          type="checkbox"
          checked={value}
          on:change={() => toggleDay(day)} />
      {/each}
    </div>
    <label class="hidden" for={`${key}-color`}>Cor do hábito {name}</label>
    <input
      id={`${key}-color`}
      type="color"
      value={color}
      on:change={setColor} />
  </div>
</div>
