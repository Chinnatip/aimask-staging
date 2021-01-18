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
                <div className="w-full h-full overflow-y-scroll">
                    <div className="h-20"></div> {/* Padding the top */}
                    <div className="p-4 w-full">
                        <div className="justify-items-between items-center flex flex-col lg:flex-row w-full">
                            <div className="flex-grow lg:flex-grow-0 p-2">
                                <div className="justify-items-between items-center flex flex-col">
                                    <div className="justify-items-between items-center flex flex-row">
                                        {/* <div className="p-2">
                                            {CreateBox("ใส่หน้ากากไม่ถูกต้อง", 99, "text-green-500")}
                                        </div>
                                        <div className="p-2">
                                            {CreateBox("ใส่หน้ากากไม่ถูกต้อง", 99, "text-green-500")}
                                        </div> */}
                                        <div className="text-4xl">
                                            ภาพรวม
                                        </div>
                                    </div>
                                    <div className="justify-items-between items-center flex flex-row">
                                        <div className="p-2">
                                            {CreateBox("จำนวนคนทั้งหมด", 1024, "text-black")}
                                        </div>
                                        <div className="p-2">
                                            {CreateBox("ใส่หน้ากากถูกต้อง", 999, "text-green-500")}
                                        </div>
                                    </div>
                                    <div className="justify-items-between items-center flex flex-row">
                                        <div className="p-2">
                                            {CreateBox("ใส่หน้ากากไม่ถูกต้อง", 22, "text-yellow-500")}
                                        </div>
                                        <div className="p-2">
                                            {CreateBox("ไม่ได้ใส่หน้ากาก", 3, "text-red-500")}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-grow p-2">
                                <div className="bg-gray-900">
                                    <p className="text-white text-center h-48 w-64 lg:w-auto">CharArea<br />Can be as tall/wide as you like!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-64">

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
