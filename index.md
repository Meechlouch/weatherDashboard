<!DOCTYPE html>
<html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Weather DashBoard</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
      <link rel="stylesheet" href="weatherDashboard.css">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
      <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
    </head>
  <body>
    <header class="text-light" style="text-align: center;">
      <h1>Weather Dashboard</h1>
    </header>
    <div class="container-fluid">
                <!---->
      <section class="row" style="height: 100%;">

        <div  class="col-md-3 b">
          <label for="city"><h5>Search for a City:</h5></label>
            <div class="input-group">
              <input type="text" name="SearchForCity" id="city" placeholder="Search City" class="form-control" required />
                <button type="submit" class="btn btn-info" id="searchCities">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                    <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                  </svg>
                </button>
            </div>
            <ul id="searchHistory" class="list-group list-group-flush" style="margin-top: 20px;">
                        
            </ul>
        </div>
                
        <div class="main-content col-md-9" style="height: 600px;">
          <div class="jumbotron bg-transparent" id="currentForecast" style="padding-top: 1.5rem; padding-bottom: 1.5rem">
                    
          </div>
    
          <div class="jumbotron bg-transparent" style="padding-top: 1.5rem; padding-bottom: 1.5rem;">
            <div class="row" id="fiveDayForecast">
                            
            </div>
          </div>
        </div>
      </section>   
    </div>  
    <script src="weatherDashboard.js"></script>    
  </body>
</html>
    