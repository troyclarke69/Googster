import React, { useContext, useEffect } from 'react';
import { CountryContext } from '../context/api'; 
import NumberFormat from 'react-number-format';
import { newsApi } from '../helpers/constants';

const CountryNews = ({ alpha2Code }) => {
    const countryData = useContext(CountryContext);
    const { getCountryNews, countryNews, countryNewsLoading, countryNewsError } = useContext(CountryContext);

    useEffect(() => {
        getCountryNews(alpha2Code);
    },[]);

    // const { title, source, publishedAt, author, description, url, urlToImage} = countryNews['articles'];
    let news = [];
    // console.log('newsResults', countryNews.totalResults)
    if (countryNews.totalResults > 0) {
        news = countryNews.articles;
        // console.log(news);
    };

    return (
        <>
        {/* News */}
        { news.length > 0 && <div className='container-fluid'>
            <p></p><p></p>
            <h4>Latest Headlines</h4>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th colspan='8'></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {news.map( (c, index) => {
                        return (
                        <tr key={index}>
                            <td><a href={c.url}>{c.title}</a></td>
                            <td>{c.description}</td>
                        </tr> 
                        )
                    })}
                </tbody>
            </table>
        </div>
        }
       </> 
    )
};

export default CountryNews;