import React from 'react'
import { motion } from 'framer-motion'

const GLoader = () => {
    return(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
        >
            <p>Gamdecs</p>
        
        <style>{`
            div {
                width: 100%;
                min-height: 100vh;
                z-index: 3;
                text-align: center;
                background: #c31432;  /* fallback for old browsers */
                background: -webkit-linear-gradient(to bottom, #240b36, #c31432);  /* Chrome 10-25, Safari 5.1-6 */
                background: linear-gradient(to bottom, #240b36, #c31432); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            }
            p {
                font-size: 50px;
                color: white;
                line-height: 10;
                height: 100%;
            }
        `}</style>
        </motion.div>
    )
}

export default GLoader;