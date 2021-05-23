$(document).ready(function()
{

  let transition = false;
  let weatherVisible = false;

  $('.subtopic').on('click',function(){

    if(transition)return;

    transition = true;
    const details = $(this).next();
    const icondrop = $(this).find('.expand');
    const iconup = $(this).find('.collapse');

    if(details.is(':visible'))
    {
      details.slideUp(300,()=>{
        transition=false;
      });
      iconup.fadeOut(140,()=>{
        icondrop.fadeIn(140);
      });
    }
    else
    {
      details.slideDown(300,()=>
      {
        transition = false;
      });
      icondrop.fadeOut(140,()=>{
        iconup.fadeIn(140);
      });
    }

  });

  $('.location').on('click',function(){
    getWeatherData();
  });


  function getWeatherData() {
        if(weatherVisible)return;
        weatherVisible=true;

        const URL = 'https://api.openweathermap.org/data/2.5/weather?q=dhaka&appid=1cf66dfcb28b4eb09dc6a030eeac3043'
        axios.get(URL)
        .then(function ({data: {main: mainData,weather: weatherData, name: cityname}}){
          // Getting Data from response
          let{description,icon}=weatherData[0];
          let{temp,feels_like, humidity}=mainData;
          //alert(temp+' '+feels_like+' '+humidity+' '+description);
          $('.cityname').text(cityname);
          $('.weatherDescription').text(description);
          $('.temparature').text((temp-273).toFixed(2)+'℃');
          $('.feels_like').text((feels_like-273).toFixed(2)+'℃');
          $('.humidity').text(humidity+'%');
          $('#wicon').attr("src", "http://openweathermap.org/img/w/"+icon+".png");
        })
        .then(function()
        {
          $('.weather').fadeIn(500).delay(5000).fadeOut(500,()=>{
            weatherVisible = false;
          });
        })
        .catch(function (error){
          console.log(error);
        });
    }
});
