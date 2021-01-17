import Layout from '@/layout/Layout'
import { CameraDetail } from '../interfaces/marker'
import { observationPoint, camDetails  } from '../components/static/dataPoint'

const corpLink = [
    {domain: 'https://www.thaigov.go.th/', logo: 'prime_minister_office.png'},
    {domain: 'http://www.moi.go.th/', logo: 'CVP-23.png'},
    {domain: 'https://www.mhesi.go.th/', logo: 'orwor.png'},
    {domain: 'https://www.nrct.go.th/', logo: 'worchor5G.png' , span: 2},
    {domain: 'http://www.moi.go.th/', logo: 'MOPH.png'},
    {domain: 'https://www.mdes.go.th/', logo: 'de.jpg'},
    {domain: 'https://www.tu.ac.th/', logo: 'tu.png'},
    {domain: 'https://www.siit.tu.ac.th/', logo: 'siit.png'},
    {domain: 'http://www.bangkok.go.th/', logo: 'bma_logo.png'},
    {domain: 'https://www.ntplc.co.th/', logo: 'cat_logo.jpg'},
    {domain: 'https://superai.aiat.or.th/', logo: 'NECTEC-2020.png'},
    {domain: 'https://www.aiat.or.th/', logo: 'aiat_logo.png'},
    {domain: 'https://superai.aiat.or.th/', logo: 'super-ai.png'},
    {domain: 'https://ai.iapp.co.th/', logo: 'iapp_logo.png'},
]

const participant = [
    {role: 'AI DEVELOPER',name: 'Dr. Kobkrit Viriyayudhakorn',domain: 'https://kobkrit.com/'},
    {role: 'ADMIN',name: 'Suchathit Boonnag', domain: 'https://www.linkedin.com/in/sboonnag/'},
    {role: '',name: 'Natthakorn Kasamsumran', domain: 'http://www.nachod.me'},
    {role: 'DESIGN',name: 'Ananya Kuasakunrungroj', domain: ''},
    {role: '',name: 'Atichat Auppakansang', domain: 'https://atichat645.wixsite.com/port'},
    {role: '',name: 'Boonthicha Saejia', domain: ''},
    {role: '',name: 'Suppachai Nuthep', domain: ''},
    {role: 'VISUALIZE',name: 'Athipud Rungsun', domain: ''},
    {role: '',name: 'Chadchavan Rattanasopa', domain: ''},
    {role: '',name: 'Jaral Pitavivadhananon', domain: ''},
    {role: '',name: 'Nisit Sirimarnkit', domain: 'https://www.ninenox.com'},
    {role: '',name: 'Rajasurang Wongkrasaemongkol',domain: ''},
    {role: '',name: 'Tatchapong tanomsuk ', domain: ''},
    {role: '',name: 'Varadtha Junburom', domain: ''},
    {role: '',name: 'Wanna Dev', domain: 'https://wannadev.medium.com/'},
    {role: 'WEB DEVELOPER',name: 'Chinnatip Taemkaeo', domain: 'https://www.linkedin.com/in/chinnatip-taemkaeo'},
    {role: '',name: 'Ponnipa Jantawong', domain: ''},
    {role: '',name: 'Pakin Siwatammarat', domain: 'https://ppirch.github.io/'},
    {role: '',name: 'Sirawich Smitsomboon', domain: 'http://photoservicethai.com/index.html?spacial=superai'},
    {role: 'ADVISOR',name: 'Dr. Thanaruk Theeramunkong', domain: 'https://aiat.or.th/thanaruk/'},
]

const AboutPage = () => {
    const markers: CameraDetail[] = camDetails(observationPoint)
    return (
        <Layout current="aboutus" title="DeepCare" markers={markers}>
            <div className="text-b pt-32 space-y-4">
                <h1 className="text-3xl text-center text-gray-800 font-semibold mb-3">สนับสนุนโดย</h1>
            </div>
            <main className="text-b sm:px-5 md:px-10 lg:px-20 mb-32">
                <div className={'text-center'}>
                    <div className="grid xs:grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-10 py-10 w-2/3 m-auto flex items-center">
                        { corpLink.map(link => {
                            const { domain , logo, span=1 } = link
                            return <a className={` col-span-${span} ml-5 inline-block text-center`} href={domain}>
                            <img src={logo}
                                alt="torch logo"
                            />
                        </a>
                        }) }
                    </div>
                </div>
                <div className="text-b pt-16 space-y-4">
                    <h1 className="text-3xl text-center text-gray-800 font-semibold mb-3">ทีมนักพัฒนา</h1>
                </div>
                <div className="flex mt-8 justify-content flex-col items-center">
                    { participant.map(partner => {
                        const {role, name, domain} = partner
                        return <div className="flex items-start my-2">
                            <div className="w-32 text-1xl font-semibold" style={{ color: '#FF9900'}}>{role}</div>
                            { domain != '' ?
                                <a target="_blank" href={domain} className="w-64 block text-left ml-20" >{name}</a> :
                                <div className="w-64 text-left ml-20">{name}</div>
                            }
                        </div>
                    })}
                </div>

            </main>
        </Layout>
    )
}
export default AboutPage
