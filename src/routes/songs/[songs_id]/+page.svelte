<script>
  import SongDetail from "$lib/components/SongDetail.svelte";

  export let data;
</script>

<SongDetail song={data.song} />
