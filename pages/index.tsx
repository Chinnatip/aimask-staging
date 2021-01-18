import Layout from '@/layout/Layout'
import { useState } from 'react'
import Chart from './charts'
import { MaskType } from '../interfaces/marker'
import Link from 'next/link'
const IndexPage = () => {
    const [maskType] = useState<MaskType>({ red: 0, green: 0, yellow: 0 })

    function CreateSmallBox(txt: string, amount: number, color: string, colorbox: string = "bg-white", width: string = "w-40", smallertext = true, boldTitle = false, captionText = "") {
        return (<div className={`${width} ${colorbox} h-32 p-2 shadow-md rounded-md border-gray-500 border-2 justify-items-between items-center flex flex-col flex-wrap`}>
            <div className="flex-1" />
            <div className={`flex ${smallertext ? "text-sm" : ""} ${boldTitle ? "font-bold" : ""}`}>{txt}</div>
            <div className={`flex text-4xl ${color}`}><strong>{amount}</strong></div>
            <div className={`${captionText == "" ? "" : "none"} flex text-sm`}>{captionText}</div>
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
    const TotalInfected = 1524;
    const Cured = 127;
    const Curing = 1388;
    const Death = 9;
    const DeltaTotalInfected = 136;
    const DeltaCured = 16;
    const DeltaCuring = 118;
    const DeltaDeath = 2;
    const DataDate = "17 มกราคม 2564";

    const CorrectWearing = 999;
    const IncorrectWearing = 22;
    const NotWearing = 3;
    const TotalPeople = CorrectWearing + IncorrectWearing + NotWearing; //1024;
    const Map = <img src="Map/Map.png" />
    return (
        // <p>Hi</p>
        <Layout current="home" maskType={maskType} title="DeepCare - Covid Map">
            <>
                <div className="h-20"></div> {/* Padding the top */}
                <div className="w-full h-full justify-items-center items-center flex flex-col">
                    <div className="max-w-full md:max-w-screen-lg flex">
                        <div className="p-4 w-full">
                            <div className={`bg-gray-100 p-2 shadow-md rounded-md border-gray-500 border-2 justify-items-center items-center flex flex-col flex-wrap`}
                                style={{ backgroundColor: "#F9F9F9" }}>
                                <h1 className="text-3xl text-left w-full p-2">
                                    <span style={{ color: '#EF802D' }}>DeepCare</span> by AI คืออะไร...
                                </h1>
                                <div className="justify-items-between flex flex-row w-full text-lg items-baseline">
                                    <p className="min-w-min p-1">
                                        DeepCare
                                    </p>
                                    <p className=" p-1">
                                        คือ ระบบปัญญาประดิษฐ์ที่ถูกพัฒนาขึ้นมาเพื่อสนับสนุนการดูแลสุขภาพประชาชนร่วมกัน
                                        ในช่วงโควิด-19 DeepCare จะคอยรายงานสถิติการสวมใส่หน้ากากอนามัยของคนไทยโดย
                                        ตรวจจับจากระบบปัญญาประดิษฐ์
                                    </p>
                                </div>
                            </div>
                            <div className="w-full text-center">
                                <div className="text-4xl">
                                    รายงายสถานการณ์และสถิติในช่วงโควิด-19
                                        </div>
                            </div>
                            <div className="justify-items-between items-center flex flex-row">
                                <div className="pr-2 w-full">
                                    {CreateSmallBox("ติดเชื้อสะสม", TotalInfected, "text-white", "bg-red-300", "w-full", undefined, true, `เพิ่มขึ้น ${DeltaTotalInfected}`)}
                                </div>
                                <div className="p-2">
                                    {CreateSmallBox("หายแล้ว", Cured, "text-white", "bg-green-400", undefined, undefined, true, `เพิ่มขึ้น ${DeltaCured}`)}
                                </div>
                                <div className="p-2">
                                    {CreateSmallBox("รักษาอยู่", Curing, "text-white", "bg-yellow-400", undefined, undefined, true, `เพิ่มขึ้น ${DeltaCuring}`)}
                                </div>
                                <div className="pl-2">
                                    {CreateSmallBox("เสียชีวิต", Death, "text-white", "bg-gray-400", undefined, undefined, true, `เพิ่มขึ้น ${DeltaDeath}`)}
                                </div>
                            </div>
                            <p className="w-full text-right">
                                ข้อมูลอัปเดตเมื่อ: {DataDate} จากกรมควบคุมโรค https://covid19.th-stat.com/
                            </p>
                            {/* Mask Top Section */}
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
                                <div className="flex p-2 max-w-full " style={{ width: "48rem", height: "24rem" }}>
                                    <Chart />
                                </div>
                            </div>
                            {/* Mask Bottom Section*/}
                            <div className="justify-items-between items-center flex flex-col lg:flex-row w-full">
                                <div className="flex flex-1 h-1 p-2" />
                                {/* Map Area */}
                                <div className="flex-grow-0 p-2 max-w-screen-sm">
                                    {/* <div className="bg-gray-900">
                                    <p className="text-white text-center h-48 w-64 lg:w-auto">CharArea<br />Can be as tall/wide as you like!</p>
                                </div> */}
                                    <div id="bordermap" className="bg-white border-gray-900 p-2" onMouseOver={() => {
                                        let a = document.getElementById("bordermap");
                                        if (a == null) return;
                                        a.style.borderWidth = "thick";
                                    }}onMouseLeave={() => {
                                        let a = document.getElementById("bordermap");
                                        if (a == null) return;
                                        a.style.borderWidth = "";
                                    }}>
                                        <Link href="/index_old">
                                            <a>
                                                {Map}
                                            </a>
                                        </Link>
                                    </div>
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
                                                    {CreateSmallBox("ใส่หน้ากากน้อยกว่า 90%", 3, "text-red-500", undefined, undefined, true)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="flex-grow lg:flex-1 max-w-screen-lg p-2">
                                        <div className="justify-items-between items-center flex flex-row">
                                            <div className={`p-2 justify-items-between items-center flex flex-col`} style={{ height: "17rem", width: "17rem" }}>
                                                <div>
                                                    <select>
                                                        {OptionCatagory("พื้นที่สีเขียว")}
                                                        {OptionCatagory("พื้นที่สีเหลือง")}
                                                        {OptionCatagory("พื้นที่สีแดง")}
                                                    </select>
                                                </div>
                                                <div className={`w-full bg-white shadow-md rounded-md border-gray-500 border-2 justify-items-between items-center flex flex-col`} style={{ height: "17rem" }}>

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
                                    </div> */}
                                </div>
                            </div>
                            <div className="h-64" />
                        </div>
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
