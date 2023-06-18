const canvas = document.getElementById('myChart')
let myChart
let nn
nn = ml5.neuralNetwork({ task: 'regression', debug: true })
nn.load('./model/model.json');
// documentatie 
// https://www.chartjs.org/docs/latest/charts/scatter.html

export function createChart(columns, labelx, labely){
    const config = {
        type: 'scatter',
        data: {
            datasets: [{
                label: `${labelx} vs ${labely}`,
                data: columns,
                backgroundColor: 'rgb(185, 185, 255)'
            }]
        },
        options: {
            scales: {
                x: {
                    title: {display: true, text: labelx}
                },
                y: {
                    title: {display: true, text: labely}
                }
            },
            layout: {
                padding: 30
            }
        }
    }

    myChart = new Chart(canvas, config)
}

// update an existing chart
// https://www.chartjs.org/docs/latest/developers/updates.html
export function updateChart(label, data){
    myChart.data.datasets.push({
        label,
        data,
        backgroundColor: 'rgb(255, 44, 44)'
    })
    myChart.update()
}

document.getElementById("btn").addEventListener("click", function() {
    const cores = parseFloat(document.getElementById("cores").value);
    const cpu = parseFloat(document.getElementById("cpu").value);
    const memory = parseFloat(document.getElementById("memory").value);
    const storage = parseFloat(document.getElementById("storage").value);
  
  nn.predict([cores, cpu, memory, storage], (err, results) => {
      if (err) {
          console.error(err);
      } else {
          const resultElement = document.getElementById("result");
          resultElement.innerHTML = `Voorspelling van de prijs is ${results[0].value.toFixed(2)}`
      }
  });
});
