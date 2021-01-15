import Layout from '@/layout/Layout'

const corpLinkONE = [
    {domain: 'https://www.thaigov.go.th/', logo: 'prime_minister_office.png'},
    {domain: 'https://www.mhesi.go.th/', logo: 'orwo.png'},
    {domain: 'https://www.mdes.go.th/', logo: 'de.jpg'},
    {domain: 'http://www.moi.go.th/', logo: 'dep.jpg'},
    {domain: 'http://www.bangkok.go.th/', logo: 'bma_logo.png'},
    {domain: 'https://www.nrct.go.th/', logo: 'wocho.jpg'},
]

const corpLinkTWO = [
    {domain: 'https://www.tu.ac.th/', logo: 'tu.png'},
    {domain: 'https://www.siit.tu.ac.th/', logo: 'siit.png'},
    {domain: 'https://www.ntplc.co.th/', logo: 'cat_logo.jpg'},
    {domain: 'https://www.aiat.or.th/', logo: 'aiat_logo.png'},
    {domain: 'https://superai.aiat.or.th/', logo: 'super-ai.png'},
    {domain: 'https://ai.iapp.co.th/', logo: 'iapp_logo.png'},
]

const participant = [
    {role: 'AI DEVELOPER',name: 'Dr. Kobkrit Viriyayudhakorn',domain: ''},
    {role: 'ADMIN',name: 'Suchathit Boonnag', domain: ''},
    {role: 'DESIGN',name: 'Ananya Kuasakunrungroj', domain: ''},
    {role: '',name: 'Atichat Auppakansang', domain: 'https://atichat645.wixsite.com/port'},
    {role: '',name: 'Boonthicha Saejia', domain: ''},
    {role: '',name: 'Suppachai Nuthep', domain: ''},
    {role: 'VISUALIZE',name: 'Athipud Rungsun', domain: ''},
    {role: '',name: 'Chadchavan Rattanasopa', domain: ''},
    {role: '',name: 'Jaral Pitavivadhananon', domain: ''},
    {role: '',name: 'Natthakorn Kasamsumran', domain: 'http://www.nachod.me'},
    {role: '',name: 'Nisit Sirimarnkit', domain: 'https://www.ninenox.com'},
    {role: '',name: 'Rajasurang Wongkrasaemongkol',domain: ''},
    {role: '',name: 'Tatchapong tanomsuk ', domain: ''},
    {role: '',name: 'Varadtha Junburom', domain: ''},
    {role: '',name: 'Wanna Dev', domain: 'https://wannadev.medium.com/'},
    {role: 'WEB DEVELOPER',name: 'Chinnatip Taemkaeo', domain: 'https://www.linkedin.com/in/chinnatip-taemkaeo'},
    {role: '',name: 'Ponnipa Jantawong', domain: ''},
    {role: '',name: 'Pakin Siwatammarat', domain: 'https://ppirch.github.io/'},
    {role: '',name: 'Sirawich Smitsomboon', domain: 'http://photoservicethai.com/index.html?spacial=superai'},
]

const AboutPage = () => {
    return (
        <Layout current="aboutus" title="DeepCare">
            <div className="pt-32 space-y-4">
                <h1 className="text-3xl text-center text-gray-800 font-semibold mb-3">สนับสนุนโดย</h1>
            </div>
            <main className="px-20 mb-20">
                <div className={'text-center'}>
                    <div className="grid grid-cols-6 gap-8 py-5 p-10 flex items-center">
                        { corpLinkONE.map(link => {
                            const { domain , logo } = link
                            return <a className={'ml-5 inline-block'} href={domain}>
                            <img src={logo}
                                alt="torch logo"
                            />
                        </a>
                        }) }
                    </div>
                </div>
                <div className="grid grid-cols-6 gap-4 py-20 p-10 flex items-center">
                    { corpLinkTWO.map(link => {
                        const { domain , logo } = link
                        return <a className={'ml-5 inline-block'} href={domain}>
                        <img src={logo}
                            alt="torch logo"
                        />
                    </a>
                    }) }
                </div>
                <div className="flex justify-content flex-col items-center">
                    { participant.map(partner => {
                        const {role, name, domain} = partner
                        return <div className="flex items-start my-2">
                            <div className="w-32 inline-block text-1xl font-semibold" style={{ color: '#FF9900'}}>{role}</div>
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
