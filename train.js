const canvas = document.getElementById('myChart')
let myChart
let nn

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

function loadData(){
    Papa.parse("./data/mobilephones.csv", {
        download:true,
        header:true, 
        dynamicTyping:true,
        complete: results => checkData(results.data)
    })
} loadData();

function checkData(data){

    console.table(data)

    // data voorbereiden
    data.sort(() => (Math.random() - 0.5))
    let trainData = data.slice(0, Math.floor(data.length * 0.8))
    let testData = data.slice(Math.floor(data.length * 0.8) + 1)

    // neural network aanmaken
    nn = ml5.neuralNetwork({ task: 'regression', debug: true })

    // data toevoegen aan neural network
    for(let phone of trainData){
        nn.addData({cores: phone.cores, cpu :phone.cores, memory: phone.memory, storage: phone.storage }, {  price: phone.price })
    }

    // normalize
    nn.normalizeData()

    nn.train({ epochs: 60 }, () => console.log("Finished training!"));

    async function makePrediction() {
        for (let phone of testData) {
            const testPhone = { cores: phone.cores, cpu: phone.cpu, memory: phone.memory, storage: phone.storage };
            const pred = await nn.predict(testPhone);
            console.log(`Predicted price for phone with the following details; 
            \n cores: ${phone.cores}
            \n cpu: ${phone.cpu}
            \n memory: ${phone.memory}
            \n storage: ${phone.storage}
            \n price: ${pred[0].price}`);
        }
    }
    makePrediction();
    document.getElementById("save").addEventListener("click", nn.save());
}