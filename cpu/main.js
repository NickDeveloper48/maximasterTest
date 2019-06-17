

const maximumDataPoints = 30;

$(document).ready(()=>{
		
		var config = {
			type: 'line',
			data: {
				labels: new Array(maximumDataPoints),
				datasets: [{
					label: 'Загруженность CPU',					
					data: [										
                    ],
                    backgroundColor: 'rgba(255, 0, 0, 1)',
                    borderColor: 'rgba(255, 0, 0, 0.5)',
					fill: false,
				}]
            },
            
			options: {
				responsive: true,
				title: {
					display: true,
					text: 'График загруженности процессора'
				},
				tooltips: {
					enabled: false
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: false,
						scaleLabel: {
							display: true,
							labelString: 'T'
                        },
                        ticks: {
							min: 0,
							max: 100,							
							stepSize: 5
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: '% загружености'
						},
						ticks: {
							min: 0,
							max: 100,							
							stepSize: 5
						}
					}]
				}
			}
        };
        
        var ctx = document.getElementById('myChart').getContext('2d');
        var myLine = new Chart(ctx, config);
        myLine.update();
      
        const addData = (e)=> {
            if (config.data.datasets.length > 0) {
               if(config.data.datasets[0].data.length >= maximumDataPoints){
                 config.data.labels.shift();
                 config.data.labels.push([]);
                 config.data.datasets[0].data.shift();                               
               }                
               config.data.datasets[0].data.push(e);       
               /* config.data.datasets.forEach(function(dataset) {
                    dataset.data.push(e);
                });*/
        
                myLine.update();
            }
        }

        const UpdateInfo = (errs, points)=>{           
            let percents = (errs/points*100).toFixed(2);
            $('.info').text(`Всего точек выведено: ${points}, процент ошибок: ${percents}%`);
        }

        let prevVal = 0; 
        let errorsCount = 0;
        let pointsCount = 0; 
        const getData = ()=>{                     
            fetch('http://exercise.develop.maximaster.ru/service/cpu/')
                .then(function(response) {
                    return response.json();
                }).then(function(jsonVal) {
                    if(jsonVal == 0){
                        errorsCount++;  
                        jsonVal = prevVal;                                 
                    }
                    else{
                        prevVal = jsonVal;
                    }
                    addData(jsonVal);
                    pointsCount++;
                    UpdateInfo(errorsCount,pointsCount);                     
                }).catch(function(ex) {
                    console.log('parsing failed', ex);
                });
        }
        //console.log(getData);    

    var timeID = setInterval(getData,500);
    /*setTimeout(()=> {
        clearInterval(timeID);
        alert( 'стоп' );
      }, 20000);*/
});

