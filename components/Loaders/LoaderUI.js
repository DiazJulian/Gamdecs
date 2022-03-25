import React from 'react';
import ContentLoader from "react-content-loader";


const Loader = () => (
    <>
        <div>
            <ContentLoader
                speed={2}
                width={250}
                height={400}
                viewBox="0 0 400 460"
                backgroundColor="#c31432"
                foregroundColor="#00fbff"
            >
                <circle cx="31" cy="31" r="15" />
                <rect x="58" y="34" rx="2" ry="2" width="140" height="10" />
                <rect x="0" y="60" rx="2" ry="2" width="400" height="400" />
            </ContentLoader>
        </div>
        <div>
            <ContentLoader
                speed={2}
                width={250}
                height={400}
                viewBox="0 0 400 460"
                backgroundColor="#c31432"
                foregroundColor="#00fbff"
            >
                <circle cx="31" cy="31" r="15" />
                <rect x="58" y="34" rx="2" ry="2" width="140" height="10" />
                <rect x="0" y="60" rx="2" ry="2" width="400" height="400" />
            </ContentLoader>
        </div>
        <div>
            <ContentLoader
                speed={2}
                width={250}
                height={400}
                viewBox="0 0 400 460"
                backgroundColor="#c31432"
                foregroundColor="#00fbff"
            >
                <circle cx="31" cy="31" r="15" />
                <rect x="58" y="34" rx="2" ry="2" width="140" height="10" />
                <rect x="0" y="60" rx="2" ry="2" width="400" height="400" />
            </ContentLoader>
        </div>

        <style jsx>{`
            div {
                width: 100%;
                height: 100%;
                display: flex;
                padding: 5px;  
                justify-content: center;
            }
        `}</style>
    </>
)

export default Loader;