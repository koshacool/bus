
const InitDrawingManager = () => {
  return new window.google.maps.drawing.DrawingManager({
    drawingControlOptions: {
      drawingModes: ['polygon'],
    },
    polygonOptions: {
      fillColor: 'grey',
      editable: true,
      draggable: true,
    },
  });
};

export default InitDrawingManager;
