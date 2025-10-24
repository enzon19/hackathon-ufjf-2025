<script>
  import { Button } from "flowbite-svelte";
  import { Input } from "flowbite-svelte";

  let { value = $bindable(), isLoading } = $props();
</script>

<Input
  id="prompt"
  name="prompt"
  autocomplete="off"
  bind:value
  placeholder="Digite uma pergunta..."
  disabled={isLoading}
  required
/>
<Button
  disabled={isLoading}
  size="sm"
  class="cursor-pointer"
  id="send"
  type="submit"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    ><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path
      fill="currentColor"
      d="M4.4 19.425q-.5.2-.95-.088T3 18.5V14l8-2l-8-2V5.5q0-.55.45-.837t.95-.088l15.4 6.5q.625.275.625.925t-.625.925z"
    /></svg
  >
</Button>
