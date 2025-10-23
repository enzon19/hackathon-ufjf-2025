<script>
  import { enhance } from "$app/forms";
  import Input from "$lib/components/Input.svelte";

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

{isLoading}
{#if history.length > 0}
  <div class="mt-4">
    {#each history as item, i}
      <div class="p-3 bg-white rounded-lg mb-2 shadow-sm">
        <div class="text-xs text-gray-500 mb-1">
          {item.from === "user" ? "Você" : "PecuaristaGPT"}
        </div>
        <div class="text-sm">{item.value}</div>
      </div>
    {/each}
  </div>
{/if}

<form
  method="POST"
  use:enhance={handleSubmit}
  class="bg-neutral-200 p-2 flex flex-row gap-2 shadow-md rounded-xl"
>
  <Input bind:value={inputValue} {isLoading} />
</form>
