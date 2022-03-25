import React from 'react';
import ContentLoader from "react-content-loader";


const Loader = () => (
    <div>
        <ContentLoader 
            speed={3}
            width={"100%"}
            height={300}
            viewBox="0 0 400 460"
            backgroundColor="#c31432"
            foregroundColor="orange"
            >
            <rect x="1" y="50" rx="2" ry="2" width="100%" height="3%" /> 
        </ContentLoader>
        

        <style jsx>{`
            div {
                width: 100%;
                height: 100%;
                display: flex;
                padding: 5px;  
                justify-content: center;
            }
        `}</style>
    </div>
)

export default Loader; 