import Layout from '@/layout/Layout'
import { useState } from 'react'
import { exception } from 'react-ga'
import { MaskType } from '../interfaces/marker'

const IndexPage = () => {
    const [maskType] = useState<MaskType>({ red: 0, green: 0, yellow: 0 })

    function CreateSmallBox(txt: string, amount: number, color: string, smallertext = true) {
        return (<div className={`w-40 h-32 bg-white p-2 shadow-md rounded-md border-gray-500 border-2 justify-items-between items-center flex flex-col flex-wrap`}>
            <div className="flex-1" />
            <div className={`flex ${smallertext ? "text-sm" : ""}`}>{txt}</div>
            <div className={`flex text-4xl ${color}`}><strong>{amount}</strong></div>
            <div className="flex-1" />
        </div>)
    }
    function OptionCatagory(text: string) {
        return <option value={text}>{text}</option>
    }
    function CreateList(text: string, percent: string, color: string) {
        return (<div className="p-2 justify-items-between items-center flex flex-col lg:flex-row w-full">
            <div className="flex">{text}</div>
            <div className="flex-1" />
            <div className={`flex ${color}`}>{percent}</div>
        </div>)
    }
    const CorrectWearing = 999;
    const IncorrectWearing = 22;
    const NotWearing = 3;
    const TotalPeople = CorrectWearing + IncorrectWearing + NotWearing; //1024;
    const Map = <img src="Map/Map.png" />
    return (
        // <p>Hi</p>
        <Layout current="home" maskType={maskType} title="DeepCare - Covid Map">
            <>
                <div className="w-full h-full overflow-y-scroll">
                    <div className="h-20"></div> {/* Padding the top */}
                    <div className="p-4 w-full">
                        {/* Top Section */}
                        <div className="justify-items-between items-center flex flex-col lg:flex-row w-full">
                            {/* 2x2 Grid */}
                            <div className="flex-grow lg:flex-grow-0 p-2">
                                <div className="justify-items-between items-center flex flex-col">
                                    <div className="justify-items-between items-center flex flex-row">
                                        <div className="text-4xl">
                                            ภาพรวม
                                        </div>
                                    </div>
                                    <div className="justify-items-between items-center flex flex-row">
                                        <div className="p-2">
                                            {CreateSmallBox("จำนวนคนทั้งหมด", TotalPeople, "text-black")}
                                        </div>
                                        <div className="p-2">
                                            {CreateSmallBox("ใส่หน้ากากถูกต้อง", CorrectWearing, "text-green-500")}
                                        </div>
                                    </div>
                                    <div className="justify-items-between items-center flex flex-row">
                                        <div className="p-2">
                                            {CreateSmallBox("ใส่หน้ากากไม่ถูกต้อง", IncorrectWearing, "text-yellow-500")}
                                        </div>
                                        <div className="p-2">
                                            {CreateSmallBox("ไม่ได้ใส่หน้ากาก", NotWearing, "text-red-500")}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Chart Area */}
                            <div className="flex-grow p-2">
                                <div className="bg-gray-900">
                                    <p className="text-white text-center h-48 w-64 lg:w-auto">CharArea<br />Can be as tall/wide as you like!</p>
                                </div>
                            </div>
                        </div>
                        {/* Bottom Section*/}
                        <div className="justify-items-between items-center flex flex-col lg:flex-row w-full">
                            <div className="flex flex-1 h-1 p-2" />
                            {/* Map Area */}
                            <div className="flex-grow-0 p-2 max-w-screen-sm">
                                {/* <div className="bg-gray-900">
                                    <p className="text-white text-center h-48 w-64 lg:w-auto">CharArea<br />Can be as tall/wide as you like!</p>
                                </div> */}
                                {Map}
                            </div>
                            <div className="flex-grow-0 justify-items-between items-center flex flex-col lg:flex-row w-full">
                                {/* 2x2 Grid */}
                                <div className="flex-grow-0 lg:flex-grow-0 p-2">
                                    <div className="justify-items-between items-center flex flex-col">
                                        <div className="justify-items-between items-center flex flex-row">
                                            <div className="p-2">
                                                {CreateSmallBox("จำนวนเขตทั้งหมด", 50, "text-black")}
                                            </div>
                                            <div className="p-2">
                                                {CreateSmallBox("ใส่หน้ากาก 95-100%", 12, "text-green-500")}
                                            </div>
                                        </div>
                                        <div className="justify-items-between items-center flex flex-row">
                                            <div className="p-2">
                                                {CreateSmallBox("ใส่หน้ากาก 90-95%", 22, "text-yellow-500")}
                                            </div>
                                            <div className="p-2">
                                                {CreateSmallBox("ใส่หน้ากากน้อยกว่า 90%", 3, "text-red-500", true)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-grow lg:flex-1 max-w-screen-lg p-2">
                                    <div className="justify-items-between items-center flex flex-row w-full">
                                        <div className={`w-full p-2 justify-items-between items-center flex flex-col`} style={{ height: "17rem" } /*17rem is not in Tailwind*/}>
                                            <div>
                                                <select>
                                                    {OptionCatagory("พื้นที่สีเขียว")}
                                                    {OptionCatagory("พื้นที่สีเหลือง")}
                                                    {OptionCatagory("พื้นที่สีแดง")}
                                                </select>
                                            </div>
                                            <div className={`w-full bg-white shadow-md rounded-md border-gray-500 border-2 justify-items-between items-center flex flex-col`} style={{ height: "17rem" } /*17rem is not in Tailwind*/}>

                                                {[
                                                    CreateList("ก", "100%", "text-green-500"),
                                                    CreateList("กท", "99%", "text-green-500"),
                                                    CreateList("กทม", "98%", "text-green-500"),
                                                    CreateList("กท", "97%", "text-green-500"),
                                                    CreateList("ก", "96%", "text-green-500")
                                                ]}
                                            </div>
                                        </div>
                                    </div>
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
