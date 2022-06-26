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
    // document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`

    const capitalizeFirstLetter = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // constructor(props) {
    //     super(props);
    //     // this.state = {
    //     //     articles: [],
    //     //     loading: true,
    //     //     page:1,
    //     //     totalResults: 0
    //     // }
    //     document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
    // }
    
    const updateNews = async()=>{
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d09d3b8a29b74664af05784cbca8db29&page=${page}&pageSize=${props.pageSize}`;    
        // this.setState({loading:true});
        setloading(true);
        let data  = await fetch(url);
        props.setProgress(40);
        let parsedData = await data.json()
        props.setProgress(70);
        setArticles(parsedData.articles)
        settotalResults(parsedData.totalResults)
        setloading(false)
        // this.setState({
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false
        // })
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
    }, [])

    //  async componentDidMount(){
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d09d3b8a29b74664af05784cbca8db29&page=1&pageSize=${this.props.pageSize}`;    
        // this.setState({loading:true});
        // let data  = await fetch(url);
        // let parsedData = await data.json()
        // this.setState({
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false
        // })
        // this.updateNews();
    // }

    // handlePrevClick = async ()=>{
    //     console.log(1);
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d09d3b8a29b74664af05784cbca8db29&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;    
    //     this.setState({loading:true});
    //     let data  = await fetch(url);
    //     let parsedData = await data.json()
    //     this.setState({
    //         page:this.state.page-1,
    //         articles: parsedData.articles,
    //         loading: false
    //     })
    //     // this.setState({page: this.state.page - 1});
    //     // this.updateNews();
    // }
    // handleNextClick = async ()=>{
    //     // console.log(2);
    //     if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    //         let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d09d3b8a29b74664af05784cbca8db29&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;    
    //         this.setState({loading:true});
    //         let data  = await fetch(url);
    //         let parsedData = await data.json()
    //         this.setState({
    //             page:this.state.page+1,
    //             articles: parsedData.articles,
    //             loading: false
    //         })
    //     }
    //     // this.setState({page: this.state.page + 1});
    //     // this.updateNews();
    // }

    const fetchMoreData = async () => {
        // this.setState({page: this.state.page + 1});
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d09d3b8a29b74664af05784cbca8db29&page=${page+1}&pageSize=${props.pageSize}`;    
        // this.setState({loading:true});
        setpage(page+1);
        let data  = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        settotalResults(parsedData.totalResults)
        // this.setState({
        //     articles: articles.concat(parsedData.articles),
        //     totalResults: parsedData.totalResults
        //     // loading: false
        // })
      };    

        return (
            <>
            {/*  <div className="container my-3"> */}
                <h1 className="text-center" style={{margin : '35px 0px', marginTop:'90px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                {loading && <Spinner />}
                {/* This is news component. */}

                <InfiniteScroll 
                    dataLength={articles.length} 
                    next={fetchMoreData}
                    // style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                    // inverse={true} //
                    hasMore={articles.length!==totalResults}
                    loader={<Spinner/>}
                    // scrollableTarget="scrollableDiv"
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
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>next &rarr;</button>
                </div> */}
            {/*  </div> */}
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
