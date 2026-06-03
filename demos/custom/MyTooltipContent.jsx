function MyTooltipContent({ x, y, value }) {
  return (
    <div style={{ padding: '4px 8px', color: '#8df' }}>
      <div>
        <b>Value</b>: {value}
      </div>
      <div>
        <b>X</b>: {x}
      </div>
      <div>
        <b>Y</b>: {y}
      </div>
    </div>
  );
}

export default MyTooltipContent;
