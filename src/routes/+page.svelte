<script>
  import { enhance } from "$app/forms";
  import Input from "$lib/components/Input.svelte";
  import Message from "$lib/components/Message.svelte";
  import { Spinner } from "flowbite-svelte";

  let history = $state([]);
  let inputValue = $state("");
  let isLoading = $state(false);

  function handleSubmit({ formElement, formData, action, cancel }) {
    inputValue = "";
    isLoading = true;

    const value = formData.get("question");

    history.push({
      from: "user",
      value: value,
      timestamp: new Date().toISOString(),
    });

    return async ({ update, result }) => {
      await update();
      if (result.type === "success" && result.data) {
        history.push(result.data.answer);
        isLoading = false;
      }
    };
  }
</script>

<div class="h-full flex flex-col">
  <div class="flex-1 overflow-y-auto mb-2">
    {#if history.length > 0}
      <div class="flex flex-col gap-1.5">
        {#each history as item}
          <Message value={item.value} from={item.from} sql={item.sql} />
        {/each}
        {#if isLoading}
          <Spinner class="text-center mx-auto" size="8" />
        {/if}
      </div>
    {:else}
      <h2 class="text-center font-medium text-lg">Sugestões de Perguntas</h2>
      {#snippet suggestion(name)}
        <button
          class="bg-neutral-200 rounded-xl p-4 cursor-pointer"
          onclick={() => {
            document.querySelector("#question").value = name;
            document.querySelector("#send").click();
          }}
        >
          {name}
        </button>
      {/snippet}
      <div class="grid grid-flow-col gap-2 max-w-md mx-auto">
        {@render suggestion("Teste")}
        {@render suggestion("Teste2")}
        {@render suggestion("Teste3")}
        {@render suggestion("Teste4")}
      </div>
    {/if}
  </div>

  <form
    method="POST"
    use:enhance={handleSubmit}
    class="bg-neutral-200 p-2 flex flex-row gap-2 shadow-md rounded-xl shrink-0"
  >
    <Input bind:value={inputValue} {isLoading} />
  </form>
</div>
