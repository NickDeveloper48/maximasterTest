

const maximumDataPoints = 30;

$(document).ready(()=>{
    
		var randomScalingFactor = function() {
			return Math.round(Math.random() * 100);
		};

		var config = {
			type: 'line',
			data: {
				labels: [],
				datasets: [{
					label: 'Загруженность CPU',					
					data: [
						randomScalingFactor()					
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
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'T'
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
               if(config.data.labels.length > maximumDataPoints){
                 config.data.labels.shift();
                 config.data.datasets.forEach(function(dataset) {
                    dataset.data.shift()});                
               }                
                config.data.labels.push('');        
                config.data.datasets.forEach(function(dataset) {
                    dataset.data.push(e);
                });
        
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

    var timeID = setInterval(getData,5000);
    /*setTimeout(()=> {
        clearInterval(timeID);
        alert( 'стоп' );
      }, 20000);*/
});

