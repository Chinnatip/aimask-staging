export const GridMask = ({ amount , criteria , color, image, text_col='text-gray-500' }:
{text_col?: string, color: string, amount: number, criteria: string, image: string}) => {
  return <div className="flex items-center justify-center">
  <img className="h-8" src={`mask_icon/${image}.png`} alt=""/>
  <div className="ml-2">
    <div className="text-lg">
      <span className={`mr-1 text-${color}`}>{amount}</span>จุด
    </div>
    <span className={`block ${text_col} -mt-1 text-ss`}>ใส่หน้ากากถูกต้อง</span>
    <span className={`block ${text_col} -mt-1 text-ss`}>{criteria}</span>
  </div>
</div>
}
