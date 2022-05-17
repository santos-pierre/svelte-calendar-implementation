<script lang="ts">
  import {Icon} from '@steeze-ui/svelte-icon';
  import { Calendar, ChevronLeft, ChevronRight, Pencil } from "@steeze-ui/heroicons";
  import { eachDayOfTheMonth, isEqual, isSameMonth, isToday } from './lib/calendar';

  const today = new Date();

  let selected = today;

  $: newDays = eachDayOfTheMonth(selected);

  const gridClasses = ['col-start-1','col-start-2','col-start-3','col-start-4','col-start-5','col-start-6','col-start-7']

</script>

<main>
    <div class="max-w-md mx-auto mt-10 px-5">
        <div class="flex items-center">
          <h2 class="flex-auto font-semibold text-gray-900">{ selected.toLocaleDateString('default', { month: 'long' }) } { selected.getFullYear() }</h2>
          {#if !isSameMonth(selected, today)}
            <span>
              <button
                on:click={() => selected = today}
                type="button"
                class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-xs text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Icon src={Calendar} theme='solid' class="-ml-1 mr-2 h-4 w-4 text-gray-500" />
                Today
              </button>
            </span>
          {/if}
          <button
            on:click={() => selected = new Date(new Date(selected).setMonth(new Date(selected).getMonth() - 1))}
            type="button"
            class="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span class="sr-only">Previous month</span>
            <Icon src={ChevronLeft} theme='solid' class="h-5 w-5" />
          </button>
          <button
            on:click={() => selected = new Date(new Date(selected).setMonth(new Date(selected).getMonth() + 1))}
            type="button"
            class="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span class="sr-only">Next month</span>
            <Icon src={ChevronRight} theme='solid' class="h-5 w-5" />
          </button>
        </div>
        <div class="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
            <div>S</div>
        </div>
        <div class="mt-2 grid grid-cols-7 text-sm">
            {#each newDays as day, dayIdx}
              <div class="{dayIdx > 6 && 'border-t border-gray-200'}, {dayIdx === 0 && gridClasses[(day.getDay() || 7) -1 ]} py-2">
                <button
                  on:click={() => selected = day}
                  type="button"
                  class='mx-auto flex h-8 w-8 items-center justify-center rounded-full
                    {isEqual(selected, day) && 'text-white'}
                    {(!isEqual(selected, day) && isToday(day)) && 'text-indigo-600'}
                    {!isEqual(selected, day) && 'hover:bg-gray-200'}
                    {(!isEqual(selected, day) && !isToday(day) && isSameMonth(selected ,day)) && 'text-gray-900'}
                    {(!isEqual(selected, day) && !isToday(day) && !isSameMonth(selected, day)) && 'text-gray-400'}
                    {isEqual(selected, day) && isToday(day) && 'bg-indigo-600'}
                    {isEqual(selected, day) && !isToday(day) && 'bg-gray-900'}
                    {(isEqual(selected, day) || isToday(day)) && 'font-medium'}
                    '

                >
                  <time dateTime={day.toLocaleDateString('fr-BE').replaceAll('/','-')}>{day.getDate()}</time>
                </button>
              </div>
            {/each}
          </div>
    </div>
</main>
