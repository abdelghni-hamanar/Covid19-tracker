import './App.css';
import {FormControl, Select, MenuItem} from '@material-ui/core';
import { useState, useEffect } from 'react';
import Cards from './components/Cards';
import {Card, CardContent} from '@material-ui/core';
import LiveCases from './components/LiveCases';
import LineChart from './components/LineChart';
import {sortDatabyCases} from './components/utility';
import Bars from './components/Bars';




function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [lifeCases, setLifeCases] = useState([]);
  

  //fetch all countries by this useEffect

  useEffect(() => {
    const fetchAllCountries = async () => {
       await fetch("https://disease.sh/v3/covid-19/countries")
       .then(response => response.json())
       .then((data) => {
         setCountries(data);
         setLifeCases(sortDatabyCases(data));
       })
    }
    fetchAllCountries();
  },[])



  useEffect(() => {
    const getCountryInfo = async (country) => {
      const url = country === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${country}`;
      await fetch(url)
      .then(response => response.json())
      .then((data) => {
        setCountryInfo(data);
      })
    }
    getCountryInfo(country);
  },[country])


  


  const onCountryChange = (event) => {
    setCountry(event.target.value);
  } 
  


  return (
    <div className="app">
      <div className='app__left'>
        <div className='app__header'>
          {/* Title : Covid-19-By-1BD0*/}
          <h1>Covid-19-By-ABDO</h1>
          {/* input Dropdown Field For Countries */}
          <FormControl className='app__dropdown'>
            <Select variant='outlined' value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide">worldwide</MenuItem>
             {countries.map((country) => (
                <MenuItem value={country.countryInfo.iso2}>{country.country}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className='app__stats'>
            {/* InfoBoxs* title:"Corona Virus Cases" todaycases   total */}
          <Cards title="corona-virus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} type="infected"/>
          {/* InfoBoxs* title:"Corona Recovered Cases" todayRecovered   total */}
          <Cards title="corona-virus Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} type="recovered"/>
          {/* InfoBoxs* title:"Corona Virus Deaths" todayDeaths   total */}
          <Cards title="corona-virus Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} type="deaths"/>
        </div>
        <div className="app__bars">
              <Bars data={countryInfo}/>
        </div>
      </div>
      <div className='app__right'>
              <Card>
                  <CardContent>
                  <h3>Live Cases By Country</h3>
                  {/* Table */}
                  <LiveCases data={lifeCases}/>
                  <h3>Worldwide new cases</h3>
                  {/* Graph*/}
                  <LineChart casesType="cases"/>
                  </CardContent>
              </Card>    
      </div>
    </div>
  );
}
export default App;
