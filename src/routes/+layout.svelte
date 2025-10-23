<script>
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
</script>

<svelte:head>
  <title>AgroChat</title>
  <link rel="icon" href={favicon} />
</svelte:head>

<header class="bg-green-700 flex flex-row items-center justify-center p-2">
  <a href="/">
    <h1 class="text-white font-bold text-center text-xl">AgroChat</h1>
  </a>
</header>

<main class="p-2">
	{@render children?.()}
</main>
