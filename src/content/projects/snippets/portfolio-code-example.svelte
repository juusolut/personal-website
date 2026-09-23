// example-heading-component.svelte

<script lang="ts">
  const { title }: { title: string } = $props();
</script>

<h1 class="heading">{title}</h1>

<style>
  .heading {
    color: blueviolet;
  }
</style>
