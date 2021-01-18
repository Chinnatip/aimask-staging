import Layout from '@/layout/Layout'
import { useState } from 'react'
import { MaskType } from '../interfaces/marker'

const IndexPage = () => {
    const [maskType] = useState<MaskType>({ red: 0, green: 0, yellow: 0 })

    function CreateBox(txt: string, amount: number, color: string) {
        return (<div className={`w-40 h-32 bg-white p-2 shadow-md rounded-md border-gray-500 border-2 justify-items-between items-center flex flex-col flex-wrap`}>
            <div className="flex-1" />
            <div className="flex">{txt}</div>
            <div className={`flex text-4xl ${color}`}><strong>{amount}</strong></div>
            <div className="flex-1" />
        </div>)
    }

    return (
        // <p>Hi</p>
        <Layout current="home" maskType={maskType} title="DeepCare - Covid Map">
            <>
                <div className="w-full h-full">
                    <div className="h-20"></div> {/* Padding the top */}
                    <div className="p-4 w-full justify-items-between items-center flex">
                        {CreateBox("ใส่หน้ากากไม่ถูกต้อง",99,"text-green-500")}
                    </div>
                </div>
            </>
        </Layout>
    )
}

export async function getServerSideProps() {
    return {
        props: {},
    }
}

export default IndexPage
