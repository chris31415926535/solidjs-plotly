import * as Plotly from 'plotly.js-basic-dist' ;
import { createEffect, onMount } from 'solid-js';

interface PlotlyProps {
  // div size in pixels. if not supplied, should fill entire width
  width?: number,
  height?: number,
  
  // Plotly formatted data
  data: any,
  
  // Optional layout parameters
  layout?: {
    autosize?: boolean,
    margin?: {
      l?: number,
      r?: number,
      b?: number,
      t?: number,
      pad?: number
    },
    paper_bgcolor?: string,
    plot_bgcolor?: string
  },
  
  filter?: any
}

// Nice  default layout values
let defaultLayout = {
  autosize: true,
  margin: {
    l: 50,
    r: 20,
    b: 50,
    t: 20,
    pad: 4
  },
  paper_bgcolor: '#fff',
  plot_bgcolor: '#fff'
};

export function PlotlyPlot(props: PlotlyProps) {
  
  let layout = props.layout || defaultLayout;
  console.log (layout)
  
  // give each plot a random id
  let plot_div_id = "plot_div_" + Math.random();
  
  onMount( () => {
    Plotly.newPlot(plot_div_id, props.data, layout);
  });
  
  // Filter here
  // Plotly.update() isn't working--it's supposed to be faster but only Plotly.newPlot() worked
  createEffect (() => {
    console.log("effect fired " + plot_div_id)
    layout = props.layout || defaultLayout;
    console.log(layout)

    Plotly.newPlot(plot_div_id, props.data, layout);
    //Plotly.update(plot_div_id, props.data, layout);
  });
  
  let divstyle = "";
  if (props.width !== null) divstyle += ("width:" + props.width +"px;");
  if (props.width !== null) divstyle += ("height:"+props.height+"px;");
  
  return (<div id={plot_div_id} style={divstyle}/>);
}


