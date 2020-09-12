<script>
  export let key, name, setName, color, setColor, toggleDay, days, month, year;
</script>

<style>
  :root {
    --input-size: 1.8em;
  }

  .row {
    width: 100%;
    margin: 0;
    margin-bottom: 0.25em;
    display: grid;
    grid-template-columns: 1fr;
    place-items: center;
  }

  .checkboxes {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  input[type='text'] {
    min-width: 100%;
    flex: 1 1 100%;
  }

  @media all and (min-width: 1000px) {
    :root {
      --input-size: 1.7em;
    }

    input[type='text'] {
      min-width: 8em;
      flex: 1 1 8em;
    }
  }

  @media all and (min-width: 1500px) {
    input[type='text'] {
      min-width: 12em;
      flex: 1 1 12em;
    }
  }

  input {
    border-radius: 8px;
    border: 1px solid white;
    background: #ffffff;
    box-shadow: 1px 1px 4px #cccccc, -1px -1px 4px #ffffff;
    margin: 0;
    padding: 0;
    margin: 5px;
  }

  input[type='color'] {
    background: white;
    width: var(--input-size);
    height: var(--input-size);
  }

  input[type='text'] {
    color: var(--habit-color);
    font-weight: bold;
    font-size: 0.9em;
    padding: 0 0.2em;
    height: var(--input-size);
  }

  input:hover {
    border: 1px solid var(--habit-color);
  }

  input[type='checkbox'] {
    -webkit-appearance: none;
    appearance: none;
    position: relative;
    width: var(--input-size);
    height: var(--input-size);
    display: flex;
    padding: 0;
  }
  input[type='checkbox']:checked {
    color: var(--habit-color);
    box-shadow: inset -1px -1px 6px #ffffff, inset 1px 1px 6px #cccccc;
  }
  input[type='checkbox']:before {
    display: block;
    color: var(--habit-color);
    content: attr(data-day);
    font-size: 0.9em;
    font-weight: bold;
    display: grid;
    justify-items: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  input[type='checkbox']:checked:before {
    display: block;
    position: absolute;
    top: 4px;
    bottom: 4px;
    left: 4px;
    right: 4px;
    border-radius: 50%;
    background: var(--habit-color);
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    content: '✔️';
    color: white !important;
    font-size: 0.7em;
  }

  input[type='checkbox']:disabled {
    background: #efefef;
  }

  input:focus {
    outline: none;
    border: 1px solid var(--habit-color);
  }

  input[type='text']:focus {
    box-shadow: inset -1px -1px 6px #ffffff, inset 1px 1px 6px #cccccc;
  }
</style>

<div class="list" style="--habit-color: {color}">
  <div class="row">
    <div class="checkboxes">
      <label class="hidden" for={`name-${key}`}>Nome do hábito:</label>
      <input
        id={`name-${key}`}
        type="text"
        placeholder="What is your next new habit?"
        value={name}
        on:input={setName} />
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
      <label class="hidden" for={`${key}-color`}>Cor do hábito {name}</label>
      <input
        id={`${key}-color`}
        type="color"
        value={color}
        on:change={setColor} />
    </div>
  </div>
</div>
