import Layout from '@/layout/Layout'
import firebase from '../components/strategy/firebase'
import { useMachine } from '@xstate/react'
import { useContent } from '../store/machine'
import { useState } from 'react'
import { CameraDetail, Observation, MaskType } from '../interfaces/marker'
import { maskCounting, camDetails } from '../components/strategy/marker'

let stateParser

const corpLink = [
    {domain: 'https://www.thaigov.go.th/', logo: 'prime_minister_office.png'},
    {domain: 'https://www.thaigov.go.th/', logo: 'CVP-23.png'},
    {domain: 'https://www.mhesi.go.th/', logo: 'orwo.png', custom: '-mr-5'},
    {domain: 'https://www.nrct.go.th/', logo: 'worchor5G.png' , span: 2},
    {domain: 'https://www.moph.go.th/', logo: 'MOPH.png'},
    {domain: 'https://www.mdes.go.th/', logo: 'de.jpg'},
    {domain: 'https://www.tu.ac.th/', logo: 'tu.png'},
    {domain: 'https://www.siit.tu.ac.th/', logo: 'siit.png'},
    {domain: 'http://www.bangkok.go.th/', logo: 'bma_logo.png'},
    {domain: 'https://www.ntplc.co.th/', logo: 'cat_logo.jpg'},
    {domain: 'https://www.nectec.or.th', logo: 'NECTEC-2020.png', custom: '-mr-4 -ml-2'},
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
    {role: '',name: 'Suriya Chayatummagoon', domain: ''},
    {role: 'VISUALIZE',name: 'Athipud Rungsun', domain: ''},
    {role: '',name: 'Chadchavan Rattanasopa', domain: ''},
    {role: '',name: 'Jaral Pitavivadhananon', domain: ''},
    {role: '',name: 'Nisit Sirimarnkit', domain: 'https://www.ninenox.com'},
    {role: '',name: 'Rajasurang Wongkrasaemongkol',domain: ''},
    {role: '',name: 'Tatchapong tanomsuk ', domain: ''},
    {role: '',name: 'Varadtha Junburom', domain: ''},
    {role: '',name: 'Wanna Dev', domain: 'https://wannadev.medium.com/'},
    {role: 'DEVELOPER',name: 'Chinnatip Taemkaeo', domain: ''},
    {role: '',name: 'Ponnipa Jantawong', domain: ''},
    {role: '',name: 'Pakin Siwatammarat', domain: 'https://ppirch.github.io/'},
    {role: '',name: 'Sirawich Smitsomboon', domain: 'http://sirawich.photoservicethai.com/index.html?spacial=superai'},
    {role: 'ADVISOR',name: 'Dr. Thanaruk Theeramunkong', domain: 'https://aiat.or.th/thanaruk/'},
]

const Content = ({setMark}: {setMark: any}) => {
    const [current] = useMachine(useContent, {
      services: {
        fetchData: () =>
        firebase.firestore().collection('hours').get().then(res => {
          const parcel: any = res.docs.map(item => item.data())
          let cameras: Observation[] = parcel
          //
          cameras = cameras.filter(camera => camera.collection)
          //
          const district_lists: string[] = [ ...new Set(cameras.map(cam => cam.district_name))].sort()
          const markers: CameraDetail[] = camDetails(cameras)
          const maskCounter: MaskType = maskCounting(markers)
          setMark(maskCounter)
          return { cameras, markers, district_lists, maskCounter }
        })
      },
    })
    switch (current.value) {
      case 'idle': return <h1>Blank</h1>
      case 'loading': return <h1>Loading</h1>
      case 'success': stateParser = current.context.data;
        console.log(stateParser)
        return (
            <span></span>
        )
      case 'failure': return <h1>Reload</h1>
      default: return null
    }
  }

const AboutPage = () => {
    const [maskType, setMaskType] = useState<MaskType>({red: 0, green: 0, yellow: 0})
    return (
        <Layout maskType={maskType} current="aboutus" title="DeepCare">
            <Content setMark={setMaskType} />
            <div className="text-b pt-32 space-y-4">
                <h1 className="text-3xl text-center text-gray-800 font-semibold mb-3">สนับสนุนโดย</h1>
            </div>
            <main className="text-b px-5 lg:px-20 mb-32">
                <div className={'text-center'}>
                    <div className="grid grid-cols-3 gap-6 lg:grid-cols-5 lg:gap-10 py-10 w-2/3 m-auto flex items-center">
                        { corpLink.map(link => {
                            const { domain , logo, span=1, custom='' } = link
                            return <a target="_blank" className={`col-span-${span} lg:ml-5 ${custom} inline-block text-center`} href={domain}>
                            <img src={logo}
                                alt="torch logo"
                            />
                        </a>
                        })}
                    </div>
                </div>
                <div className="text-b pt-16 space-y-4">
                    <h1 className="text-3xl text-center text-gray-800 font-semibold mb-3">ทีมนักพัฒนา</h1>
                </div>
                <div className="flex mt-8 justify-content flex-col items-center">
                    { participant.map(partner => {
                        const {role, name, domain} = partner
                        return <div className="grid grid-cols-3 gap-6 py-2 px-6 lg:px-2">
                            <div className="w-24 text-sm lg:text-lg lg:w-32 text-md font-semibold" style={{ color: '#FF9900' }}>{role}</div>
                            {domain != '' ?
                                <a target="_blank" href={domain} className="text-gray-800 col-span-2 text-sm lg:text-lg w-64 inline-block text-left lg:ml-20" >{name}</a> :
                                <div className="text-gray-800 col-span-2 text-sm lg:text-lg w-64 text-left lg:ml-20">{name}</div>
                            }
                        </div>
                    })}
                </div>
            </main>
        </Layout>
    )
}
export default AboutPage
