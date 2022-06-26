import React, { useEffect, useState } from 'react'
import Newsitems from './Newsitems'
import Spinner from './Spinner';
import PropTypes from'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props)=>{
    const [articles, setArticles] = useState([])
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(1)
    const [totalResults, settotalResults] = useState(0)
    

    const capitalizeFirstLetter = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    
    const updateNews = async()=>{
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d09d3b8a29b74664af05784cbca8db29&page=${page}&pageSize=${props.pageSize}`;    
        
        setloading(true);
        let data  = await fetch(url);
        props.setProgress(40);
        let parsedData = await data.json()
        props.setProgress(70);
        setArticles(parsedData.articles)
        settotalResults(parsedData.totalResults)
        setloading(false)
        
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
    }, [])

    const fetchMoreData = async () => {
        
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d09d3b8a29b74664af05784cbca8db29&page=${page+1}&pageSize=${props.pageSize}`;    
        
        setpage(page+1);
        let data  = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        settotalResults(parsedData.totalResults)
        
      };    

        return (
            <>
            
                <h1 className="text-center" style={{margin : '35px 0px', marginTop:'90px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                {loading && <Spinner />}
                

                <InfiniteScroll 
                    dataLength={articles.length} 
                    next={fetchMoreData}
                    
                    hasMore={articles.length!==totalResults}
                    loader={<Spinner/>}
                    
                >
                <div className="container">
                <div className="row">
                    {articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <Newsitems title={element.title?element.title.slice(0,100):""} description={element.description?element.description.slice(0,300):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}source={element.source.name} />
                        </div>
                    })}
                </div>
                </div>
                </InfiniteScroll>
              
            </>
        )
    
}


News.defaultProps ={
    country:'in',
    pageSize: 8,
    category:"general"
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News
