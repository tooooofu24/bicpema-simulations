// Function to draw a graph.
function drawGraph() {
  if (typeof graphChart !== "undefined" && graphChart) {
    graphChart.destroy();
  }
  let ctx = document.getElementById("graphCanvas").getContext("2d");
  let data = {};
  let options = {
    animation: false,
    maintainAspectRatio: false,
  };
  graphChart = new Chart(ctx, {
    type: "line",
    data: data,
    options: options,
  });
}
