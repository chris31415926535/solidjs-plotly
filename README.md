## Simple examples of Plotly.js working with SolidJS

This is a working example--not an optimized example!

The basic idea:

1. `import * as Plotly from 'plotly.js-basic-dist'`.
1. Call the `<PlotlyPlot />` component with data and layout options. Both can be constants or signals!
1. In `<PlotlyPlot />`, it creates a new div with a random name. We execute Plotly code to create the plot inside `onMount()`, so it happens after the new div exists.
1. In `<PlotlyPlot />`, we use `createEffect()` to update the plot if the data or layout changes.

For the example with filtered data, filtering is done with signals and effects in `App.tsx` and only the data to plot is passed to `<PlotlyPlot />`. It may be preferable to pass `<PlotlyPlot />` the initial data and a filter signal and do the processing in there--to be explored.