import { Component, createSignal, on, createEffect } from 'solid-js';

import { PlotlyPlot } from './components/PlotlyPlot';

const App: Component = () => {

  const data = [
    {
      x: ['giraffes', 'orangutans', 'monkeys'],
      y: [20, 14, 23],
      type: 'bar'
    }
  ];


  let [getAnimals, setAnimals] = createSignal({giraffes: true, orangutans: true, monkeys: true});
  let [getFilteredData, setFilteredData] = createSignal(data);


  let [getPlotWidth, setPlotWidth] = createSignal(20);

  // this effect monitors the filter signal (getAnimals()) and updates the filtered data signal (getFilteredData())
  // we can use this to create responsive graphs
  // the process here uses filters in the app, passing changing data to the component. Another option would be
  // to pass the data and filter to the component and handle the logic there--perhaps cleaner?
  createEffect( () => {
    
    let resultx: string[] = [];
    let resulty: number[] = [];

    // TODO: fix this, it still works but I need to sort out the types I think
    data[0].x.forEach((e,i) =>{
      if (getAnimals()[e]) { 
        resultx.push(e);
        resulty.push(data[0].y[i])
      }
    })

    setFilteredData( [
      {
        x: resultx,
        y: resulty,
        type: 'bar'
      }
    ]);
  })


  return (
    <div>
      <h1>Plotly interactive charts in SolidJS</h1>

      <h3> Sizing div with with props</h3>
       <PlotlyPlot data={data} width={500} height={300}/>

      <h3>Demonstrating interactivity with signals</h3>

      <div><p>Select data:</p></div>
       <div><input type = "checkbox" id="check-giraffes" name = "check-giraffes" checked onInput={(e) => setAnimals({...getAnimals(), giraffes: e.currentTarget.checked})}></input>
         <label for="check-giraffes" >Giraffes</label></div>
       <div><input type = "checkbox" id="check-orangutans" name = "check-orangutans" checked onInput={(e) => setAnimals({...getAnimals(), orangutans: e.currentTarget.checked})}></input>
          <label for="check-orangutans">Orangutans</label></div>
       <div><input type = "checkbox" id="check-monkeys" name = "check-monkeys" checked onInput={(e) => setAnimals({...getAnimals(), monkeys: e.currentTarget.checked})}></input>
         <label for="check-monkeys">Monkeys</label></div>

         <div><label for="plot-width">Set left plot margin:</label><select id="plot-width" name="plot-width" onChange={(e) => {setPlotWidth(Number(e.currentTarget.value)); console.log(getPlotWidth());}}>
        <option value={20}>20px</option>
        <option value={100}>100px</option>
        <option value={200}>200px</option>
      </select></div>

      <PlotlyPlot data={getFilteredData()} layout={{margin:{l:getPlotWidth()}}} height={300} />

      <h3> Demonstrating (terrible) layout options </h3>
      <PlotlyPlot data={data} layout={
        {
          margin: {
          l: 300,
          r: 300
        },
        paper_bgcolor: "green",
        plot_bgcolor: "blue"
        }}/>

    </div>
  );
};

export default App;
