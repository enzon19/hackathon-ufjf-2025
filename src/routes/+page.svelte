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

    const prompt = formData.get("prompt");

    history.push({
      role: "user",
      content: prompt,
    });

    return async ({ update, result }) => {
      await update();
      if (result.data) {
        history.push(result.data.answer);
        isLoading = false;
      }
    };
  }
</script>

<div class="h-full flex flex-col min-h-0">
  <div class="flex-1 overflow-y-auto mb-2 min-h-0">
    {#if history.length > 0}
      <div class="flex flex-col gap-1.5">
        {#each history as { content, role, sql }}
          <Message {content} {role} {sql} />
        {/each}
        {#if isLoading}
          <Spinner class="text-center mx-auto" size="8" />
        {/if}
      </div>
    {:else}
      <h2 class="text-center font-medium text-lg mb-2">
        Sugestões
      </h2>
      {#snippet suggestion(name)}
        <button
          class="bg-neutral-200 rounded-xl p-4 cursor-pointer"
          onclick={() => {
            document.querySelector("#prompt").value = name;
            document.querySelector("#send").click();
          }}
        >
          {name}
        </button>
      {/snippet}
      <div class="grid gap-2" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
        {@render suggestion(
          'Forneça a genealogia até a terceira geração do animal "19081502"'
        )}
        {@render suggestion(
          "Identifique o touro que possui a maior média de lactação de suas filhas ao primeiro parto"
        )}
        {@render suggestion(
          'Pode me fornecer as lactações encerradas, números de partos, da vaca "Vaca100000" e a sua produção vitalícia?'
        )}
        {@render suggestion(
          'qual o touro que possui seus descendentes com a maior media de produção?'
        )}
      </div>
    {/if}
  </div>

  <form
    method="POST"
    use:enhance={handleSubmit}
    class="bg-neutral-200 p-2 flex flex-row gap-2 shadow-md rounded-xl shrink-0"
  >
    <Input bind:value={inputValue} {isLoading} />
    <input type="hidden" name="history" value={JSON.stringify(history)} />
  </form>
</div>
