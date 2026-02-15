
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const VibeMeter: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const data = [
      { name: 'Energy', value: 95 },
      { name: 'Music', value: 88 },
      { name: 'Drinks', value: 92 },
      { name: 'Crowd', value: 85 }
    ];

    const width = 300;
    const height = 300;
    const margin = 40;
    const radius = Math.min(width, height) / 2 - margin;
    const innerRadius = 50;

    // Clear previous SVG content to avoid duplicates on re-render
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const x = d3.scaleBand()
      .range([0, 2 * Math.PI])
      .align(0)
      .domain(data.map(d => d.name));

    const y = d3.scaleRadial()
      .range([innerRadius, radius])
      .domain([0, 100]);

    svg.append('g')
      .selectAll('path')
      .data(data)
      .enter()
      .append('path')
      .attr('fill', (d, i) => d3.interpolatePurples(0.4 + (i / data.length) * 0.6))
      .attr('d', d3.arc<any>()
        .innerRadius(innerRadius)
        .outerRadius(d => y(d.value))
        .startAngle(d => x(d.name)!)
        .endAngle(d => x(d.name)! + x.bandwidth())
        .padAngle(0.01)
        .padRadius(innerRadius)
      );

    // Labels
    svg.append('g')
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('text-anchor', 'middle')
      .attr('transform', d => `
        rotate(${((x(d.name)! + x.bandwidth() / 2) * 180 / Math.PI - 90)})
        translate(${radius + 20},0)
      `)
      .append('text')
      .text(d => d.name)
      .attr('fill', '#fff')
      .attr('font-size', '10px')
      .attr('transform', d => (x(d.name)! + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI ? 'rotate(90) translate(0,10)' : 'rotate(-90) translate(0,-10)');

  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 glass rounded-2xl">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default VibeMeter;
