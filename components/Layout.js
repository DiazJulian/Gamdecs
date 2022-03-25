
export default function Layout ({ children }) {
  return (
    <div className='container'>
      {children}

      <style jsx>{`
            .container {
                box-sizing: border-box;
                display: flex;
                flex-wrap: wrap;
                margin: auto;
                padding: 10px;
            }
        `}
      </style>

      <style jsx global>{`
            body {
                margin: 0;
                padding: 0;
                min-height: 100vh; 
                background: #c31432;  /* fallback for old browsers */
                background: -webkit-linear-gradient(to bottom, #240b36, #c31432);  /* Chrome 10-25, Safari 5.1-6 */
                background: linear-gradient(to bottom, #240b36, #c31432); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            }
            body::-webkit-scrollbar {
                display: none;
            }

        `}
      </style>
    </div>
  )
}
