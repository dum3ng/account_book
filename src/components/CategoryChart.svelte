<script lang="ts">
  import * as HighCharts from 'highcharts'
  import { onMount } from 'svelte'

  export let data
  export let serie: string
  export let title: string
  let container: HTMLDivElement
  let mounted

  $: {
    console.log(data)
    if (data && mounted) render()
  }

  const render = () =>
    HighCharts.chart({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        renderTo: container,
        height: 300,
        width: 300,
      },
      title: {
        text: title,
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
        },
      },
      series: [
        // @ts-ignore
        {
          name: serie,
          colorByPoint: true,
          data: data,
        },
      ],
    })
  onMount(() => {
    mounted = true
    render()
  })
</script>

<div>
  <div class="container" bind:this={container} />
</div>

<style></style>
