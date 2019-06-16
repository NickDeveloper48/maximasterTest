


$(document).ready(function(){
   // $('.success_message').hide();
    let coords = null;
    ymaps.ready(init);
    function init(){ 
        var geolocation = ymaps.geolocation,
        myMap = new ymaps.Map('map', {
            center: [0, 0],
            zoom: 5
        }, {
            searchControlProvider: 'yandex#search'
        });

        geolocation.get({
            provider: 'yandex',
            mapStateAutoApply: true
        }).then(function (result) { 
            myMap.geoObjects.add(result.geoObjects);
        });

        myMap.events.add('click', function (e) {
            myMap.geoObjects.removeAll();
            var myPlacemark = new ymaps.Placemark(e.get('coords'));
            myMap.geoObjects.add(myPlacemark);
            coords = e.get('coords');
            myMap.hint.open(e.get('coords'), '<p>Местоположения доставки: ' + [
                coords[0].toPrecision(6),
                coords[1].toPrecision(6)
                ].join(', ') + '</p>' );
           
        });
    }

   


    $('.submit_button').on('click', ()=>{        
      
        let nameVoid = new ValidateRule(
            $('#input_name').val(), 
            (str)=>{                
                if(str.length > 0)
                {                  
                    return true;
                }
                else
                {                    
                    return false;
                }
            },
            '',
            'Поле ФИО обязательно для заполнения'
        );

        let phoneVoid = new ValidateRule(
            $('#input_phone').val(), 
            (str)=>{                
                if(str.length > 0)
                {                  
                    return true;
                }
                else
                {                    
                    return false;
                }
            },
            '',
            'Поле Телефон обязательно для заполнения'
        );

        let emailFormatError = new ValidateRule(
            $('#input_email').val(), 
            (str)=>{                
                if(str.match(/@/))
                {                  
                    return true;
                }
                else
                {                    
                    return false;
                }
            },
            '',
            'Неверный формат поля Email'
        );

        let phoneFormatError = new ValidateRule(
            $('.input_comment').val(), 
            (str)=>{                
                if(str.length <= 500)
                {                  
                    return true;
                }
                else
                {                    
                    return false;
                }
            },
            '',
            'Комментарий превысил 500 симвлов'
        );

        let commentsTooBig = new ValidateRule(
            $('#input_phone').val(), 
            (str)=>{                
                if(!str.match(/\D/))
                {                  
                    return true;
                }
                else
                {                    
                    return false;
                }
            },
            '',
            'Неверный формат номера телефона'
        );

        let coordsNotNull = new ValidateRule(
            coords, 
            (coords)=>{                               
                if(coords != null){
                    if(coords.length === 2){
                        return true;
                    }
                }
                return false;
            },
            '',
            'Координаты доставки не выбраны'
        );
        
        var arr = [nameVoid, phoneVoid, emailFormatError, phoneFormatError, commentsTooBig, coordsNotNull];
        
        
        let val = new validator(arr, 'Заказ оформлен!' );
        let msgHelp = new msgHelper($('.success_message'));
        msgHelp.Show(val.GetMsg(), val.GetStatus());
    });

})



class ValidateRule{
    constructor(source, func, successStr, failStr) {      
      this.source = source;
      this.func = func;
      this.successStr = successStr;
      this.failStr = failStr;      
    } 
  }

  class msgHelper{
      constructor(control){
          this.control = control;
          this.successColor = '#008000';
          this.failColor = '#FF0000';          
      }

      SetColors(successColor, failColor){
        this.successColor = successColor;
        this.failColor = failColor;
      }

      Show(message, success){
          
        if(success){
            this.control.css('color', this.successColor);
        }
        else{
            this.control.css('color', this.failColor);
        }
        this.control.text(message);        
      }
  }

  class validator{
    constructor(valArr, successMsg){
        this.arr = valArr;
        this.successMsg = successMsg;
        this.errorMsg = '';
        this.success = false;
        this.validate();
    }

    validate(){ 
        this.errorMsg = '';       
        for(var i in this.arr) {
            if(!this.arr[i].func(this.arr[i].source)){
                this.errorMsg += this.arr[i].failStr + '; ';
            }       
        }
        if(this.errorMsg != ''){
            this.success = false;            
        }    
        else{
            this.success = true;            
        }
    }

    GetStatus(){
        return this.success;
    }

    GetMsg(){
        if(this.success){
            return this.successMsg;
        }
        else{
            return this.errorMsg;
        }
    }
 }
