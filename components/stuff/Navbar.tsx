export default function Navbar() {
  return (
    <>
      <nav
        className={
          'relative flex flex-wrap items-center justify-between px-8 navbar-expand-lg '
        }
      >
        <div className="fixed ml-3 top-0 left-0 mt-3 z-10 flex flex-wrap items-center justify-center">
          <div className="w-full relative flex items-center justify-center">
          <a className={'leading-relaxed shadow-xl inline-block bg-white rounded-full py-2 px-2 whitespace-no-wrap'} href="http://www.bangkok.go.th/">
              <img src="orwo.png"
                style={{ height: '30px' }}
                alt="torch logo"
              />
            </a>
            <a className={'leading-relaxed shadow-xl ml-3 inline-block bg-white rounded-full py-2 px-2 whitespace-no-wrap'} href="http://www.bangkok.go.th/">
              <img src="wocho.jpg"
                style={{ height: '30px' }}
                alt="torch logo"
              />
            </a>
            {/* <a className={'leading-relaxed shadow-xl ml-3 inline-block bg-white rounded-full py-2 px-2 whitespace-no-wrap'} href="http://www.bangkok.go.th/">
              <img src="tu.png"
                style={{ height: '22px' }}
                alt="torch logo"
              />
            </a>
            <a className={'leading-relaxed shadow-xl ml-3 inline-block bg-white rounded-full py-2 px-2 whitespace-no-wrap'} href="http://www.bangkok.go.th/">
              <img src="siit.png"
                style={{ height: '22px' }}
                alt="torch logo"
              />
            </a>
            <a className={'leading-relaxed shadow-xl ml-3 inline-block bg-white rounded-full py-2 px-2 whitespace-no-wrap'} href="http://www.bangkok.go.th/">
              <img src="prime_minister_office.png"
                style={{ height: '30px' }}
                alt="torch logo"
              />
            </a>
            
            <a className={'leading-relaxed shadow-xl ml-3 inline-block bg-white rounded-full py-1 px-1 whitespace-no-wrap'} href="http://www.bangkok.go.th/">
              <img src="bma_logo.png"
                style={{ height: '30px' }}
                alt="torch logo"
              />
            </a>
            <a className={'leading-relaxed shadow-xl ml-3 inline-block bg-white rounded-full py-2 px-2 whitespace-no-wrap'} href="http://www.bangkok.go.th/">
              <img src="cat_logo.jpg"
                style={{ height: '22px' }}
                alt="torch logo"
              />
            </a>
            <a className={'leading-relaxed shadow-xl ml-3 inline-block bg-white rounded-full py-2 px-2 whitespace-no-wrap'} href="http://www.bangkok.go.th/">
              <img src="de.jpg"
                style={{ height: '30px' }}
                alt="torch logo"
              />
            </a>

           
            <a className={'leading-relaxed shadow-xl ml-3 inline-block bg-white rounded-full py-2 px-2 whitespace-no-wrap'} href="http://www.bangkok.go.th/">
              <img src="siit.png"
                style={{ height: '22px' }}
                alt="torch logo"
              />
            </a>
            <a className={'leading-relaxed shadow-xl ml-3 inline-block bg-white rounded-full py-2 px-2 whitespace-no-wrap'} href="https://aiat.or.th">
              <img src="aiat_logo.png"
                style={{ height: '22px' }}
                alt="torch logo"
              />
            </a>
            <a className={'leading-relaxed shadow-xl ml-3 inline-block bg-white rounded-full py-2 px-2 whitespace-no-wrap'} href="https://iapp.co.th">
              <img src="iapp_logo.png"
                style={{ height: '22px' }}
                alt="torch logo"
              />
            </a> */}
          </div>
        </div>
      </nav>
    </>
  )
}
