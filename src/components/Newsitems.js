import React from 'react'

const Newsitems = (props)=>{
    // render() {
        let {title, description, imageUrl, newsUrl, author, date, source} = props;
        return (
            <div className="my-4">
                <div className="card">
                    <div style={{display:"flex", justifyContent:"flex-end", position:"absolute", right:"0"}}>
                        <span className="badge rounder-pill bg-danger" style={{left: '90%', zIndex:'1'}}>{source}</span>
                    </div>
                    <img src={!imageUrl?"https://scitechdaily.com/images/Machine-Learning-Molecular-Shapes-Accelerate-Drug-Discovery.jpg":imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text">
                            <small className="text-muted">By {!author?"unknown":author} on {new Date(date).toGMTString()}</small>
                        </p>
                        <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    // }
}

export default Newsitems
