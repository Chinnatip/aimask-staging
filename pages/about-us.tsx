import Layout from '@/layout/Layout'
import { CameraDetail } from '../interfaces/marker'
import { observationPoint, camDetails } from '../components/static/dataPoint'

const corpLinkONE = [
    { domain: '', logo: 'ศบค.jpg' },
    { domain: 'https://www.thaigov.go.th/', logo: 'prime_minister_office.png' },
    { domain: 'https://www.mhesi.go.th/', logo: 'orwo.png' },
    { domain: 'https://www.nrct.go.th/', logo: 'wocho.jpg' },
]

const corpLinkTWO = [
    { domain: '', logo: 'วช.jpg' },
    { domain: 'https://www.tu.ac.th/', logo: 'tu.png' },
    { domain: 'https://www.siit.tu.ac.th/', logo: 'siit.png' },
    { domain: 'https://www.mdes.go.th/', logo: 'de.jpg' },
    { domain: 'https://www.aiat.or.th/', logo: 'aiat_logo.png' },
]

const corpLinkTHREE = [
    { domain: 'https://superai.aiat.or.th/', logo: 'super-ai.png' },
    { domain: 'http://www.bangkok.go.th/', logo: 'bma_logo.png' },
    { domain: 'https://www.ntplc.co.th/', logo: 'cat_logo.jpg' },
    { domain: 'https://ai.iapp.co.th/', logo: 'iapp_logo.png' },
]


const participant = [
    { role: 'AI DEVELOPER', name: 'Dr. Kobkrit Viriyayudhakorn', domain: 'https://kobkrit.com/' },
    { role: 'ADMIN', name: 'Suchathit Boonnag', domain: 'https://www.linkedin.com/in/sboonnag/' },
    { role: 'ADVISOR', name: 'Dr. Thanaruk Theeramunkong', domain: 'https://aiat.or.th/thanaruk/' },
    { role: 'DESIGN', name: 'Ananya Kuasakunrungroj', domain: '' },
    { role: '', name: 'Atichat Auppakansang', domain: 'https://atichat645.wixsite.com/port' },
    { role: '', name: 'Boonthicha Saejia', domain: '' },
    { role: '', name: 'Suppachai Nuthep', domain: '' },
    { role: 'VISUALIZE', name: 'Athipud Rungsun', domain: '' },
    { role: '', name: 'Chadchavan Rattanasopa', domain: '' },
    { role: '', name: 'Jaral Pitavivadhananon', domain: '' },
    { role: '', name: 'Natthakorn Kasamsumran', domain: 'http://www.nachod.me' },
    { role: '', name: 'Nisit Sirimarnkit', domain: 'https://www.ninenox.com' },
    { role: '', name: 'Rajasurang Wongkrasaemongkol', domain: '' },
    { role: '', name: 'Tatchapong tanomsuk ', domain: '' },
    { role: '', name: 'Varadtha Junburom', domain: '' },
    { role: '', name: 'Wanna Dev', domain: 'https://wannadev.medium.com/' },
    { role: 'WEB DEVELOPER', name: 'Chinnatip Taemkaeo', domain: 'https://www.linkedin.com/in/chinnatip-taemkaeo' },
    { role: '', name: 'Ponnipa Jantawong', domain: '' },
    { role: '', name: 'Sirawich Smitsomboon', domain: 'http://photoservicethai.com/index.html?spacial=superai' },
    { role: '', name: 'Pakin Siwatammarat', domain: 'https://ppirch.github.io/' },
]

const AboutPage = () => {
    const markers: CameraDetail[] = camDetails(observationPoint)
    return (
        <Layout current="aboutus" title="DeepCare" markers={markers}>
            <div className="text-b pt-32 space-y-4">
                <h1 className="text-3xl text-center text-gray-800 font-semibold mb-3">สนับสนุนโดย</h1>
            </div>
            <main className="text-b sm:px-5 md:px-10 lg:px-5 mb-5">
                <div className={'text-center'}>
                    <div className="grid xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8 py-5 p-5 items-center">
                        {corpLinkONE.map(link => {
                            const { domain, logo } = link
                            return <a className={'ml-5 inline-block text-center'} href={domain}>
                                <img src={logo}
                                    alt="torch logo"
                                />
                            </a>
                        })}
                    </div>
                </div>
                <div className="grid sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4 py-20 p-10 items-center">
                    {corpLinkTWO.map(link => {
                        const { domain, logo } = link
                        return <a className={'ml-5 inline-block'} href={domain}>
                            <img src={logo}
                                alt="torch logo"
                            />
                        </a>
                    })}
                </div>
                <div className="ml-5 grid xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5 p-5 items-center">
                    {corpLinkTHREE.map(link => {
                        const { domain, logo } = link
                        return <a className={'ml-5 inline-block text-center'} href={domain}>
                            <img src={logo}
                                alt="torch logo"
                            />
                        </a>
                    })}
                </div>
                {/* <div className="flex justify-content flex-col items-center">
                    {participant.map(partner => {
                        const { role, name, domain } = partner
                        return <div className="flex items-start my-2">
                            <div className="w-32 text-1xl font-semibold sm:col-span-12 md:col-span-2 lg:col-span-2" style={{ color: '#FF9900' }}>{role}</div>
                            {domain != '' ?
                                <a target="_blank" href={domain} className="w-64 inline-block text-left ml-20" >{name}</a> :
                                <div className="w-64 text-left ml-20 sm:col-span-12 md:col-span-2 lg:col-span-2">{name}</div>
                            }
                        </div>
                    })}
                </div> */}
                <div className="justify-content sm:ml-5 md:ml-20 sm:text-center md:text-center lg:text-left">
                    {participant.map(partner => {
                        const { role, name, domain } = partner
                        return <div className=" justify-content grid sm:grid-cols-12 md:grid-cols-3 md:grid-cols-3 px-20 sm:ml-5 md:ml-20 lg:ml-20 my-10">
                            <div className="text-1xl font-semibold md:ml-5 lg:ml-20 sm:text-center md:text-left lg:text-left" style={{ color: '#FF9900' }}>{role}</div>
                            {domain != '' ?
                                <div className="sm:col-span-12 md:col-span-2 lg:col-span-2 sm:text-center md:text-left lg:text-left my-0">
                                    <a target="_blank" href={domain}>{name}</a>
                                </div> :
                                <div className="sm:col-span-12 md:col-span-2 lg:col-span-2 sm:text-center md:text-left lg:text-left my-0">{name}</div>
                            }
                        </div>
                    })}
                </div>
            </main>
        </Layout>
    )
}
export default AboutPage
