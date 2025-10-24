<script>
  import { marked } from "marked";
  import { slide } from "svelte/transition";

  let { content, sql, role } = $props();

  let isSQLInspectorOpen = $state(false);
</script>

<div
  class="p-3 rounded-xl {role === 'system' ? 'bg-green-100' : 'bg-neutral-200'}"
>
  <div class="flex flex-row justify-between items-center">
    <div class="w-full flex-1">
      <div class="text-sm text-neutral-600">
        {role === "system" ? "AgroChat" : "Você"}
      </div>
      <div class="prose min-w-full break-normal">{@html marked(content)}</div>
    </div>
    {#if sql}
      <button
        class="text-green-600 cursor-pointer bg-green-700/20 rounded-full h-10 w-10 p-2"
        onclick={() => (isSQLInspectorOpen = !isSQLInspectorOpen)}
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="my-auto mx-auto"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            ><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path
              fill="currentColor"
              d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm0-2h16V8H4zm4.675-5l-1.9-1.9q-.3-.3-.288-.7t.313-.7q.3-.275.7-.287t.7.287l2.6 2.6q.3.3.3.7t-.3.7l-2.6 2.6q-.275.275-.687.288T6.8 16.3q-.275-.275-.275-.7t.275-.7zM13 17q-.425 0-.712-.288T12 16t.288-.712T13 15h4q.425 0 .713.288T18 16t-.288.713T17 17z"
            /></svg
          >
        </div></button
      >
    {/if}
  </div>
  {#if isSQLInspectorOpen}
    <pre
      transition:slide
      class="p-2 mt-2 bg-neutral-700 w-full rounded-xl text-white">{sql}</pre>
  {/if}
</div>
