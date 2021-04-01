import React, { useEffect } from 'react';

const Cruncher = ({ countryDailies }) => {
    // const countryData = useContext(CountryContext);
    // const { getCountryDailies } = useContext(CountryContext);

    console.log('cruncher', countryDailies);

    useEffect(() => {
        okComputer({countryDailies});
        // tester({countryDailies});
    },[]);

    const tester = ({countryDailies}) => {
        // console.log('tester');
      if (countryDailies) { 
          console.log(countryDailies[0]);
      } else {
        console.log('empty');
      }  
    };

    const okComputer = ({ countryDailies }) => {
        const compData = [];
        const listData = [];
        let cases = 0; let recovered = 0; let deaths = 0;
        let start = countryDailies.length - 1;
        let end = countryDailies.length - 61;

        // this.compData.push(['Date', 'Confirmed', 'Change', 'Percent']);
        // this.compData.push(['Date', 'Percent']);
        
        //    0          1          2          3
        // ['Date', 'Confirmed', 'Change', 'Percent']

        for (var i = start; i > end; i--) {

            var rowData = [];    
            rowData.push(countryDailies[i][0], ( countryDailies[i - 1][1] - countryDailies[i][1]) / countryDailies[i - 1][1] * -100);
            compData.push(rowData);

            var d = {};
            d['date'] = countryDailies[i][0];
            d['confirmed'] = countryDailies[i][1];
            d['daily'] = ( countryDailies[i - 1][1] - countryDailies[i][1]) * -1;
            d['dailypercent'] = ( countryDailies[i - 1][1] - countryDailies[i][1]) / countryDailies[i - 1][1] * -100;
            listData.push(d);

            // console.log('date: ', this.stats[i]['date']);
            // console.log(' >> ', this.stats[i]['confirmed']);
            // console.log(' >> ',( this.stats[i - 1]['confirmed'] - this.stats[i]['confirmed']) * -1 );
            // console.log(' >> ',( this.stats[i - 1]['confirmed'] - this.stats[i]['confirmed']) / this.stats[i - 1]['confirmed'] * -100);
        }
        
        compData = this.compData.reverse();
        compData.unshift(['Date', 'Percent']);
        console.log('compData ', compData);

    };

    return (
        <div className='container'>
            okComputer
        </div>
    )
};

export default Cruncher;